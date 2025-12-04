import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Activity, BookOpen, TrendingUp, Video } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { api } from '../utils/api';
import { toast } from 'sonner';

export default function PatientDashboard({ user }) {
  const [exercises, setExercises] = useState([]);
  const [plans, setPlans] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [exResponse, plansResponse, apptResponse, progResponse] = await Promise.all([
        api.getExercises(),
        api.getTherapyPlans(),
        api.getAppointments(),
        api.getProgress()
      ]);
      
      setExercises(exResponse.data.slice(0, 3));
      setPlans(plansResponse.data);
      setAppointments(apptResponse.data.slice(0, 3));
      setProgress(progResponse.data.slice(0, 5));
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

  const activePlan = plans.find(p => p.status === 'active');

  return (
    <div data-testid="patient-dashboard" className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Olá, {user.name}! 👋</h1>
        <p className="text-white/90 text-lg">
          Bem-vindo ao seu painel pessoal de fonoaudiologia
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard 
          icon={<BookOpen className="w-6 h-6" />}
          title="Exercícios"
          value={exercises.length}
          subtitle="disponíveis"
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
          icon={<Activity className="w-6 h-6" />}
          title="Progresso"
          value={progress.length}
          subtitle="registros"
          color="bg-purple-500"
        />
        <StatCard 
          icon={<TrendingUp className="w-6 h-6" />}
          title="Planos Ativos"
          value={plans.filter(p => p.status === 'active').length}
          subtitle="em andamento"
          color="bg-orange-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Current Plan */}
        <div className="lg:col-span-2 space-y-6">
          <Card data-testid="current-plan-card">
            <CardHeader>
              <CardTitle>Plano de Terapia Atual</CardTitle>
              <CardDescription>Seu plano personalizado de exercícios</CardDescription>
            </CardHeader>
            <CardContent>
              {activePlan ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{activePlan.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{activePlan.objectives}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>Início: {new Date(activePlan.start_date).toLocaleDateString('pt-BR')}</span>
                    {activePlan.end_date && (
                      <span>Término: {new Date(activePlan.end_date).toLocaleDateString('pt-BR')}</span>
                    )}
                  </div>
                  <Button data-testid="view-plan-btn" className="w-full sm:w-auto">
                    Ver Detalhes do Plano
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Você ainda não possui um plano de terapia ativo
                  </p>
                  <Button variant="outline">Solicitar Plano</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Exercises */}
          <Card data-testid="exercises-card">
            <CardHeader>
              <CardTitle>Exercícios Recomendados</CardTitle>
              <CardDescription>Pratique hoje</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {exercises.length > 0 ? (
                exercises.map((exercise) => (
                  <div 
                    key={exercise.id} 
                    data-testid={`exercise-item-${exercise.id}`}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{exercise.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {exercise.category} • {exercise.difficulty_level}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">Iniciar</Button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-400 py-4">
                  Nenhum exercício disponível no momento
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Appointments */}
          <Card data-testid="appointments-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Próximas Consultas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {appointments.length > 0 ? (
                appointments.map((appt) => (
                  <div 
                    key={appt.id}
                    data-testid={`appointment-${appt.id}`}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {appt.appointment_type === 'online' && <Video className="w-4 h-4 text-primary" />}
                      <span className="font-medium text-sm">
                        {new Date(appt.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {new Date(appt.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {appt.appointment_type === 'online' && appt.meeting_url && (
                      <Button size="sm" variant="link" className="p-0 h-auto mt-2">
                        Entrar na Sala
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center py-4">
                  Nenhuma consulta agendada
                </p>
              )}
              <Button data-testid="schedule-btn" variant="outline" className="w-full mt-4">
                Agendar Consulta
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button data-testid="add-progress-btn" variant="outline" className="w-full justify-start" onClick={() => window.location.href = '/progress'}>
                <Activity className="w-4 h-4 mr-2" />
                Registrar Progresso
              </Button>
              <Button data-testid="browse-exercises-btn" variant="outline" className="w-full justify-start" onClick={() => window.location.href = '/exercises'}>
                <BookOpen className="w-4 h-4 mr-2" />
                Biblioteca de Exercícios
              </Button>
              <Button data-testid="view-history-btn" variant="outline" className="w-full justify-start" onClick={() => window.location.href = '/progress'}>
                <TrendingUp className="w-4 h-4 mr-2" />
                Meu Progresso
              </Button>
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
        <div className={`w-12 h-12 rounded-lg ${color} bg-opacity-10 flex items-center justify-center text-white`}>
          <div className={`${color.replace('bg-', 'text-')}`}>{icon}</div>
        </div>
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
      <div className="text-xs text-gray-500 dark:text-gray-500">{subtitle}</div>
    </motion.div>
  );
}
