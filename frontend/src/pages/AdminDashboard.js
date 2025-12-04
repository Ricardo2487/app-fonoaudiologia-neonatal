import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, BookOpen, TrendingUp, UserPlus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { api } from '../utils/api';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, usersRes] = await Promise.all([
        api.getStats(),
        api.getAllUsers()
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.updateUserRole(userId, newRole);
      setUsers(users.map(u => u.id === userId ? {...u, role: newRole} : u));
      toast.success('Role atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar role');
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
    <div data-testid="admin-dashboard" className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Painel do Administrador</h1>
        <p className="text-white/90 text-lg">
          Gerencie usuários, estatísticas e configurações da plataforma
        </p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid md:grid-cols-5 gap-6">
          <StatCard 
            icon={<Users className="w-6 h-6" />}
            title="Usuários Totais"
            value={stats.total_users}
            color="bg-blue-500"
          />
          <StatCard 
            icon={<Activity className="w-6 h-6" />}
            title="Pacientes"
            value={stats.total_patients}
            color="bg-green-500"
          />
          <StatCard 
            icon={<UserPlus className="w-6 h-6" />}
            title="Fonoaudiólogos"
            value={stats.total_therapists}
            color="bg-purple-500"
          />
          <StatCard 
            icon={<BookOpen className="w-6 h-6" />}
            title="Exercícios"
            value={stats.total_exercises}
            color="bg-orange-500"
          />
          <StatCard 
            icon={<TrendingUp className="w-6 h-6" />}
            title="Planos Ativos"
            value={stats.total_plans}
            color="bg-pink-500"
          />
        </div>
      )}

      {/* Users Management */}
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div 
                key={user.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-semibold">{user.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Select value={user.role} onValueChange={(value) => handleRoleChange(user.id, value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient">Paciente</SelectItem>
                      <SelectItem value="therapist">Fonoaudiólogo</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ icon, title, value, color }) {
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
    </motion.div>
  );
}
