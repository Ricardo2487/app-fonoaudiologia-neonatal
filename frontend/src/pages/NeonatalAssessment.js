import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Baby, Heart, Stethoscope, Activity, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { api } from '../utils/api';
import axios from 'axios';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function NeonatalAssessment({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  
  const [formData, setFormData] = useState({
    patient_id: '',
    gestational_age: '',
    birth_weight: '',
    apgar_score: '',
    nicu_stay: false,
    nicu_days: '',
    ventilation_support: '',
    feeding_tube: false,
    hearing_test_done: false,
    hearing_test_result: '',
    tongue_tie_test_done: false,
    tongue_tie_result: '',
    sucking_ability: '',
    swallowing_ability: '',
    breathing_pattern: '',
    breastfeeding_status: '',
    aspiration_risk: false,
    feeding_difficulties: '',
    oral_motor_issues: '',
    treatment_plan: '',
    family_guidance: '',
    followup_schedule: '',
    notes: ''
  });

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const response = await api.getPatients();
      setPatients(response.data);
    } catch (error) {
      toast.error('Erro ao carregar pacientes');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        therapist_id: user.id,
        nicu_days: formData.nicu_days ? parseInt(formData.nicu_days) : null
      };

      await axios.post(`${API}/neonatal-assessments`, payload, {
        withCredentials: true
      });

      toast.success('Avaliação neonatal criada com sucesso!');
      navigate('/neonatal');
    } catch (error) {
      toast.error('Erro ao criar avaliação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Baby className="w-8 h-8 text-primary" />
            Anamnese de Fonoaudiologia Neonatal
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Avaliação completa para recém-nascidos prematuros e com necessidades especiais
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Seleção de Paciente */}
        <Card>
          <CardHeader>
            <CardTitle>Paciente</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={formData.patient_id} onValueChange={(v) => setFormData({...formData, patient_id: v})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o bebê" />
              </SelectTrigger>
              <SelectContent>
                {patients.map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.full_name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Dados do Nascimento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Dados do Nascimento
            </CardTitle>
            <CardDescription>Informações sobre gestação e parto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Idade Gestacional *</Label>
                <Input
                  placeholder="Ex: 32 semanas"
                  value={formData.gestational_age}
                  onChange={(e) => setFormData({...formData, gestational_age: e.target.value})}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Prematuros: {'<'}37 semanas</p>
              </div>
              <div>
                <Label>Peso ao Nascer *</Label>
                <Input
                  placeholder="Ex: 1.8kg"
                  value={formData.birth_weight}
                  onChange={(e) => setFormData({...formData, birth_weight: e.target.value})}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Baixo peso: {'<'}2.5kg</p>
              </div>
              <div>
                <Label>Apgar *</Label>
                <Input
                  placeholder="Ex: 7/9"
                  value={formData.apgar_score}
                  onChange={(e) => setFormData({...formData, apgar_score: e.target.value})}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">1º e 5º minuto</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* UTI Neonatal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5" />
              Internação em UTI Neonatal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={formData.nicu_stay}
                onCheckedChange={(checked) => setFormData({...formData, nicu_stay: checked})}
              />
              <Label>Bebê ficou internado em UTI Neonatal</Label>
            </div>

            {formData.nicu_stay && (
              <div className="grid md:grid-cols-2 gap-4 pl-6">
                <div>
                  <Label>Dias de internação</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 15"
                    value={formData.nicu_days}
                    onChange={(e) => setFormData({...formData, nicu_days: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Suporte Ventilatório</Label>
                  <Select value={formData.ventilation_support} onValueChange={(v) => setFormData({...formData, ventilation_support: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Nenhum</SelectItem>
                      <SelectItem value="nasal">Cateter Nasal</SelectItem>
                      <SelectItem value="cpap">CPAP</SelectItem>
                      <SelectItem value="intubation">Intubação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                checked={formData.feeding_tube}
                onCheckedChange={(checked) => setFormData({...formData, feeding_tube: checked})}
              />
              <Label>Uso de Sonda para Alimentação</Label>
            </div>
          </CardContent>
        </Card>

        {/* Testes Obrigatórios */}
        <Card className="border-2 border-amber-200 dark:border-amber-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              Testes Obrigatórios (Triagem Neonatal)
            </CardTitle>
            <CardDescription>Fundamentais para detectar problemas precocemente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
              <div className="flex items-start space-x-2 mb-3">
                <Checkbox
                  checked={formData.hearing_test_done}
                  onCheckedChange={(checked) => setFormData({...formData, hearing_test_done: checked})}
                />
                <div className="flex-1">
                  <Label className="font-semibold">Teste da Orelhinha (Triagem Auditiva Neonatal)</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Detecta problemas auditivos que podem afetar o desenvolvimento da fala
                  </p>
                </div>
              </div>
              {formData.hearing_test_done && (
                <Input
                  placeholder="Resultado do teste (Ex: Passou / Reteste / Encaminhar)"
                  value={formData.hearing_test_result}
                  onChange={(e) => setFormData({...formData, hearing_test_result: e.target.value})}
                  className="ml-6"
                />
              )}
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="flex items-start space-x-2 mb-3">
                <Checkbox
                  checked={formData.tongue_tie_test_done}
                  onCheckedChange={(checked) => setFormData({...formData, tongue_tie_test_done: checked})}
                />
                <div className="flex-1">
                  <Label className="font-semibold">Teste da Linguinha (Protocolo de Anquiloglossia)</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Identifica língua presa que dificulta amamentação e fala
                  </p>
                </div>
              </div>
              {formData.tongue_tie_test_done && (
                <Input
                  placeholder="Resultado do teste (Ex: Normal / Anquiloglossia leve/moderada/severa)"
                  value={formData.tongue_tie_result}
                  onChange={(e) => setFormData({...formData, tongue_tie_result: e.target.value})}
                  className="ml-6"
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Avaliação de Funções Orais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Avaliação de Funções Orais
            </CardTitle>
            <CardDescription>Sucção, deglutição, respiração e amamentação</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Capacidade de Sucção</Label>
                <Select value={formData.sucking_ability} onValueChange={(v) => setFormData({...formData, sucking_ability: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Avalie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strong">Forte e coordenada</SelectItem>
                    <SelectItem value="weak">Fraca</SelectItem>
                    <SelectItem value="inconsistent">Inconsistente</SelectItem>
                    <SelectItem value="absent">Ausente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Deglutição</Label>
                <Select value={formData.swallowing_ability} onValueChange={(v) => setFormData({...formData, swallowing_ability: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Avalie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="difficulty">Com dificuldade</SelectItem>
                    <SelectItem value="dysphagia">Disfagia</SelectItem>
                    <SelectItem value="aspiration">Risco de aspiração</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Padrão Respiratório</Label>
                <Select value={formData.breathing_pattern} onValueChange={(v) => setFormData({...formData, breathing_pattern: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Avalie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="irregular">Irregular</SelectItem>
                    <SelectItem value="difficulty">Dificuldade</SelectItem>
                    <SelectItem value="apnea">Episódios de apneia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Aleitamento Materno</Label>
                <Select value={formData.breastfeeding_status} onValueChange={(v) => setFormData({...formData, breastfeeding_status: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status atual" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exclusive">Exclusivo</SelectItem>
                    <SelectItem value="mixed">Misto (LM + fórmula)</SelectItem>
                    <SelectItem value="formula">Fórmula</SelectItem>
                    <SelectItem value="tube">Sonda</SelectItem>
                    <SelectItem value="difficulty">Tentando, com dificuldade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-950 rounded">
              <Checkbox
                checked={formData.aspiration_risk}
                onCheckedChange={(checked) => setFormData({...formData, aspiration_risk: checked})}
              />
              <Label className="text-red-800 dark:text-red-200">Risco de Aspiração (Pneumonia Aspirativa)</Label>
            </div>

            <div>
              <Label>Dificuldades Alimentares Observadas</Label>
              <Textarea
                placeholder="Descreva dificuldades como: recusa, engasgos, tempo prolongado, cansaço..."
                value={formData.feeding_difficulties}
                onChange={(e) => setFormData({...formData, feeding_difficulties: e.target.value})}
                rows={3}
              />
            </div>

            <div>
              <Label>Alterações Motoras Orais</Label>
              <Textarea
                placeholder="Ex: hipotonia, hipertonia, reflexos alterados, movimentos descoordenados..."
                value={formData.oral_motor_issues}
                onChange={(e) => setFormData({...formData, oral_motor_issues: e.target.value})}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Conduta e Orientações */}
        <Card className="border-2 border-green-200 dark:border-green-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Plano de Tratamento e Orientações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Plano de Tratamento *</Label>
              <Textarea
                placeholder="Descreva intervenções: estimulação oral, técnicas de sucção, posicionamento, exercícios..."
                value={formData.treatment_plan}
                onChange={(e) => setFormData({...formData, treatment_plan: e.target.value})}
                rows={4}
                required
              />
            </div>

            <div>
              <Label>Orientações para a Família *</Label>
              <Textarea
                placeholder="Orientações sobre: posicionamento durante amamentação, sinais de alerta, estimulação em casa, cuidados..."
                value={formData.family_guidance}
                onChange={(e) => setFormData({...formData, family_guidance: e.target.value})}
                rows={4}
                required
              />
            </div>

            <div>
              <Label>Cronograma de Follow-up *</Label>
              <Input
                placeholder="Ex: Retorno em 7 dias, reavaliação mensal, alta após 3 meses"
                value={formData.followup_schedule}
                onChange={(e) => setFormData({...formData, followup_schedule: e.target.value})}
                required
              />
            </div>

            <div>
              <Label>Observações Adicionais</Label>
              <Textarea
                placeholder="Outras informações relevantes..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Botões */}
        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? 'Salvando...' : 'Salvar Avaliação Neonatal'}
          </Button>
        </div>
      </form>
    </div>
  );
}
