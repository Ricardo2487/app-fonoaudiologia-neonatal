import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { api } from '../utils/api';
import { toast } from 'sonner';

export default function CreateTherapyPlan({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  
  const [formData, setFormData] = useState({
    patient_id: '',
    title: '',
    objectives: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [patientsRes, exercisesRes] = await Promise.all([
        api.getPatients(),
        api.getExercises()
      ]);
      setPatients(patientsRes.data);
      setExercises(exercisesRes.data);
    } catch (error) {
      toast.error('Erro ao carregar dados');
    }
  };

  const addExercise = (exerciseId) => {
    const exercise = exercises.find(ex => ex.id === exerciseId);
    if (exercise && !selectedExercises.find(ex => ex.id === exerciseId)) {
      setSelectedExercises([...selectedExercises, {
        ...exercise,
        schedule: '',
        frequency: exercise.frequency || ''
      }]);
    }
  };

  const removeExercise = (exerciseId) => {
    setSelectedExercises(selectedExercises.filter(ex => ex.id !== exerciseId));
  };

  const updateExerciseSchedule = (exerciseId, field, value) => {
    setSelectedExercises(selectedExercises.map(ex => 
      ex.id === exerciseId ? { ...ex, [field]: value } : ex
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.patient_id) {
      toast.error('Selecione um paciente');
      return;
    }
    if (selectedExercises.length === 0) {
      toast.error('Adicione pelo menos um exercício');
      return;
    }

    setLoading(true);
    try {
      // Create therapy plan
      const planData = {
        ...formData,
        therapist_id: user.id,
        start_date: new Date(formData.start_date).toISOString(),
        end_date: formData.end_date ? new Date(formData.end_date).toISOString() : null
      };
      
      const planResponse = await api.createTherapyPlan(planData);
      const planId = planResponse.data.id;

      // Add exercises to plan
      for (const exercise of selectedExercises) {
        await api.addExerciseToPlan(planId, {
          plan_id: planId,
          exercise_id: exercise.id,
          schedule: exercise.schedule,
          frequency: exercise.frequency,
          notes: ''
        });
      }

      toast.success('Plano de terapia criado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Erro ao criar plano de terapia');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold">Criar Plano de Terapia</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="patient">Paciente *</Label>
              <Select value={formData.patient_id} onValueChange={(value) => setFormData({...formData, patient_id: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um paciente" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map(patient => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="title">Título do Plano *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Ex: Plano de Articulação - Fonema /R/"
                required
              />
            </div>

            <div>
              <Label htmlFor="objectives">Objetivos *</Label>
              <Textarea
                id="objectives"
                value={formData.objectives}
                onChange={(e) => setFormData({...formData, objectives: e.target.value})}
                placeholder="Descreva os objetivos terapêuticos..."
                rows={4}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start_date">Data de Início *</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="end_date">Data de Término (Opcional)</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exercícios do Plano</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Adicionar Exercício</Label>
              <Select onValueChange={addExercise}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um exercício" />
                </SelectTrigger>
                <SelectContent>
                  {exercises.map(exercise => (
                    <SelectItem key={exercise.id} value={exercise.id}>
                      {exercise.title} ({exercise.category})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedExercises.length > 0 && (
              <div className="space-y-3">
                <Label>Exercícios Selecionados ({selectedExercises.length})</Label>
                {selectedExercises.map((exercise) => (
                  <div key={exercise.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{exercise.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{exercise.category}</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeExercise(exercise.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm">Cronograma</Label>
                        <Input
                          placeholder="Ex: Segunda, Quarta, Sexta"
                          value={exercise.schedule}
                          onChange={(e) => updateExerciseSchedule(exercise.id, 'schedule', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Frequência</Label>
                        <Input
                          placeholder="Ex: 3x por semana"
                          value={exercise.frequency}
                          onChange={(e) => updateExerciseSchedule(exercise.id, 'frequency', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedExercises.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Plus className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Nenhum exercício adicionado ainda</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? 'Criando...' : 'Criar Plano de Terapia'}
          </Button>
        </div>
      </form>
    </div>
  );
}
