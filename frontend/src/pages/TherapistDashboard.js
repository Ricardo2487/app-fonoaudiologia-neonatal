import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Calendar, Activity, Brain } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { api } from '../utils/api';
import { toast } from 'sonner';

export default function TherapistDashboard({ user }) {
  const [patients, setPatients] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [patientsRes, exercisesRes, appointmentsRes] = await Promise.all([
        api.getPatients().catch(() => ({ data: [] })),
        api.getExercises(),
        api.getAppointments()
      ]);
      
      setPatients(patientsRes.data);
      setExercises(exercisesRes.data);
      setAppointments(appointmentsRes.data);
    } catch (error) {
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div data-testid="therapist-dashboard" className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Painel do Fonoaudiólogo</h1>
        <p className="text-white/90 text-lg">
          Gerencie seus pacientes e planos de terapia
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard 
          icon={<Users className="w-6 h-6" />}
          title="Pacientes"
          value={patients.length}
          subtitle="ativos"
          color="bg-blue-500"
        />
        <StatCard 
          icon={<Calendar className="w-6 h-6" />}
          title="Consultas"
          value={appointments.length}
          subtitle="agendadas"
          color="bg-green-500"
        />
        <StatCard 
          icon={<BookOpen className="w-6 h-6" />}
          title="Exercícios"
          value={exercises.length}
          subtitle="biblioteca"
          color="bg-purple-500"
        />
        <StatCard 
          icon={<Activity className="w-6 h-6" />}
          title="Planos"
          value="0"
          subtitle="ativos"
          color="bg-orange-500"
        />
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Patients List */}
        <div className="lg:col-span-2">
          <Card data-testid="patients-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Meus Pacientes</CardTitle>
                  <CardDescription>Lista de pacientes ativos</CardDescription>
                </div>
                <Button data-testid="add-patient-btn">+ Novo Paciente</Button>
              </div>
            </CardHeader>
            <CardContent>
              {patients.length > 0 ? (
                <div className="space-y-4">
                  {patients.map((patient) => (
                    <div 
                      key={patient.id}
                      data-testid={`patient-item-${patient.id}`}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold">{patient.full_name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {patient.diagnosis || 'Sem diagnóstico'}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">Ver Detalhes</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Nenhum paciente cadastrado
                  </p>
                  <Button variant="outline">Adicionar Primeiro Paciente</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card data-testid="quick-actions-card">
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button data-testid="create-plan-btn" variant="outline" className="w-full justify-start">
                <Activity className="w-4 h-4 mr-2" />
                Criar Plano de Terapia
              </Button>
              <Button data-testid="create-exercise-btn" variant="outline" className="w-full justify-start">
                <BookOpen className="w-4 h-4 mr-2" />
                Criar Exercício
              </Button>
              <Button data-testid="schedule-appointment-btn" variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Consulta
              </Button>
              <Button data-testid="ai-recommendations-btn" variant="outline" className="w-full justify-start">
                <Brain className="w-4 h-4 mr-2" />
                Recomendações IA
              </Button>
            </CardContent>
          </Card>

          {/* Recent Appointments */}
          <Card>
            <CardHeader>
              <CardTitle>Próximas Consultas</CardTitle>
            </CardHeader>
            <CardContent>
              {appointments.length > 0 ? (
                <div className="space-y-3">
                  {appointments.slice(0, 3).map((appt) => (
                    <div key={appt.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="font-medium text-sm">
                        {new Date(appt.date).toLocaleDateString('pt-BR')}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(appt.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center py-4">
                  Nenhuma consulta agendada
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, subtitle, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${color} bg-opacity-10 flex items-center justify-center`}>
          <div className={`${color.replace('bg-', 'text-')}`}>{icon}</div>
        </div>
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
      <div className="text-xs text-gray-500 dark:text-gray-500">{subtitle}</div>
    </motion.div>
  );
}
