import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, MapPin, Plus, Check, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { api } from '../utils/api';
import { toast } from 'sonner';

export default function AppointmentsPage({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    patient_id: '',
    date: '',
    time: '',
    appointment_type: 'presencial',
    notes: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [apptsRes, patientsRes] = await Promise.all([
        api.getAppointments(),
        user.role === 'therapist' || user.role === 'admin' ? api.getPatients() : Promise.resolve({ data: [] })
      ]);
      setAppointments(apptsRes.data);
      setPatients(patientsRes.data);
    } catch (error) {
      toast.error('Erro ao carregar consultas');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dateTime = new Date(`${formData.date}T${formData.time}`);
      const newAppt = {
        patient_id: formData.patient_id,
        therapist_id: user.id,
        date: dateTime.toISOString(),
        appointment_type: formData.appointment_type,
        status: 'scheduled',
        meeting_url: formData.appointment_type === 'online' ? `https://meet.fonomed.com/${Date.now()}` : null,
        notes: formData.notes
      };

      const response = await api.createAppointment(newAppt);
      setAppointments([response.data, ...appointments]);
      setShowDialog(false);
      setFormData({ patient_id: '', date: '', time: '', appointment_type: 'presencial', notes: '' });
      toast.success('Consulta agendada com sucesso!');
    } catch (error) {
      toast.error('Erro ao agendar consulta');
    }
  };

  const updateStatus = async (appointmentId, newStatus) => {
    try {
      await api.updateAppointment(appointmentId, { status: newStatus });
      setAppointments(appointments.map(a => 
        a.id === appointmentId ? { ...a, status: newStatus } : a
      ));
      toast.success('Status atualizado!');
    } catch (error) {
      toast.error('Erro ao atualizar status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const upcomingAppointments = appointments.filter(a => 
    new Date(a.date) >= new Date() && a.status === 'scheduled'
  ).sort((a, b) => new Date(a.date) - new Date(b.date));

  const pastAppointments = appointments.filter(a => 
    new Date(a.date) < new Date() || a.status === 'completed'
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Minhas Consultas</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Gerencie seus atendimentos presenciais e online
          </p>
        </div>
        {(user.role === 'therapist' || user.role === 'admin') && (
          <Button onClick={() => setShowDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Agendar Consulta
          </Button>
        )}
      </div>

      {/* Upcoming */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Próximas Consultas</h2>
        {upcomingAppointments.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {upcomingAppointments.map((appt) => (
              <AppointmentCard 
                key={appt.id} 
                appointment={appt}
                onUpdateStatus={updateStatus}
                userRole={user.role}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400">
                Nenhuma consulta agendada
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Past */}
      {pastAppointments.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Histórico</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {pastAppointments.map((appt) => (
              <AppointmentCard 
                key={appt.id} 
                appointment={appt}
                onUpdateStatus={updateStatus}
                userRole={user.role}
                isPast
              />
            ))}
          </div>
        </div>
      )}

      {/* Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Agendar Nova Consulta</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Label>Paciente</Label>
              <Select value={formData.patient_id} onValueChange={(v) => setFormData({...formData, patient_id: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um paciente" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.full_name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Data</Label>
                <Input 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label>Horário</Label>
                <Input 
                  type="time" 
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Tipo</Label>
              <Select value={formData.appointment_type} onValueChange={(v) => setFormData({...formData, appointment_type: v})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="presencial">Presencial</SelectItem>
                  <SelectItem value="online">Online (Teleconsulta)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Observações</Label>
              <Textarea 
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                Agendar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AppointmentCard({ appointment, onUpdateStatus, userRole, isPast }) {
  const date = new Date(appointment.date);
  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
  };

  const statusLabels = {
    scheduled: 'Agendada',
    completed: 'Realizada',
    cancelled: 'Cancelada'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className={isPast ? 'opacity-75' : ''}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">
                {date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                {date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <Badge className={statusColors[appointment.status]}>
              {statusLabels[appointment.status]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {appointment.appointment_type === 'online' ? (
                <Video className="w-4 h-4 text-primary" />
              ) : (
                <MapPin className="w-4 h-4 text-primary" />
              )}
              <span className="text-sm font-medium">
                {appointment.appointment_type === 'online' ? 'Teleconsulta' : 'Presencial'}
              </span>
            </div>

            {appointment.notes && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {appointment.notes}
              </p>
            )}

            {appointment.appointment_type === 'online' && appointment.meeting_url && !isPast && (
              <Button 
                size="sm" 
                className="w-full"
                onClick={() => window.open(appointment.meeting_url, '_blank')}
              >
                <Video className="w-4 h-4 mr-2" />
                Entrar na Sala
              </Button>
            )}

            {!isPast && userRole !== 'patient' && (
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onUpdateStatus(appointment.id, 'completed')}
                >
                  <Check className="w-4 h-4 mr-1" />
                  Concluir
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onUpdateStatus(appointment.id, 'cancelled')}
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
