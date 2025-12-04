import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Baby, Plus, Calendar, AlertCircle, CheckCircle2, FileText } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import axios from 'axios';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function NeonatalList({ user }) {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    try {
      const response = await axios.get(`${API}/neonatal-assessments`, {
        withCredentials: true
      });
      setAssessments(response.data);
    } catch (error) {
      toast.error('Erro ao carregar avaliações');
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Baby className="w-10 h-10 text-primary" />
            Fonoaudiologia Neonatal
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
            Avaliação, reabilitação e orientação para recém-nascidos prematuros
          </p>
        </div>
        {(user.role === 'therapist' || user.role === 'admin') && (
          <Button onClick={() => navigate('/neonatal/create')} size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Nova Avaliação
          </Button>
        )}
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-2 border-blue-200 dark:border-blue-900">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Baby className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-lg">Prematuros</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Bebês nascidos antes de 37 semanas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-amber-200 dark:border-amber-900">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-8 h-8 text-amber-600" />
              <div>
                <h3 className="font-semibold text-lg">UTI Neonatal</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Acompanhamento intensivo especializado
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 dark:border-green-900">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-lg">Follow-up</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Acompanhamento após alta hospitalar
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assessments List */}
      <Card>
        <CardHeader>
          <CardTitle>Avaliações Realizadas ({assessments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {assessments.length > 0 ? (
            <div className="space-y-4">
              {assessments.map((assessment, index) => (
                <motion.div
                  key={assessment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Baby className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-lg">Paciente #{assessment.patient_id.slice(0, 8)}</h3>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Idade Gestacional:</span>
                          <span className="ml-2 font-medium">{assessment.gestational_age}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Peso:</span>
                          <span className="ml-2 font-medium">{assessment.birth_weight}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Apgar:</span>
                          <span className="ml-2 font-medium">{assessment.apgar_score}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Amamentação:</span>
                          <span className="ml-2 font-medium">{assessment.breastfeeding_status || 'N/A'}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {assessment.nicu_stay && (
                          <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950">
                            UTI: {assessment.nicu_days} dias
                          </Badge>
                        )}
                        {assessment.feeding_tube && (
                          <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950">
                            Sonda
                          </Badge>
                        )}
                        {assessment.hearing_test_done && (
                          <Badge variant="outline" className="bg-green-50 dark:bg-green-950">
                            ✓ Teste Orelhinha
                          </Badge>
                        )}
                        {assessment.tongue_tie_test_done && (
                          <Badge variant="outline" className="bg-green-50 dark:bg-green-950">
                            ✓ Teste Linguinha
                          </Badge>
                        )}
                        {assessment.aspiration_risk && (
                          <Badge variant="outline" className="bg-red-50 dark:bg-red-950 text-red-700">
                            ⚠ Risco Aspiração
                          </Badge>
                        )}
                      </div>

                      <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        {new Date(assessment.assessment_date || assessment.created_at).toLocaleDateString('pt-BR')}
                      </div>
                    </div>

                    <Button size="sm" variant="outline">
                      <FileText className="w-4 h-4 mr-1" />
                      Ver Detalhes
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Baby className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Nenhuma avaliação neonatal registrada ainda
              </p>
              {(user.role === 'therapist' || user.role === 'admin') && (
                <Button onClick={() => navigate('/neonatal/create')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Primeira Avaliação
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Orientações */}
      <Card className="border-2 border-purple-200 dark:border-purple-900">
        <CardHeader>
          <CardTitle>Áreas de Atuação da Fonoaudiologia Neonatal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <InfoBox 
              title="Triagem e Avaliação"
              description="Prevenção de problemas na amamentação e funções orais. Testes da orelhinha e linguinha."
            />
            <InfoBox 
              title="Aleitamento Materno"
              description="Suporte do pré-natal à alta hospitalar, auxiliando bebês com dificuldades de sucção."
            />
            <InfoBox 
              title="Disfagia Neonatal"
              description="Avaliação e tratamento de dificuldades de deglutição, prevenindo pneumonia aspirativa."
            />
            <InfoBox 
              title="Follow-up"
              description="Acompanhamento após alta, monitorando desenvolvimento oral, motor e prevenindo complicações futuras."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InfoBox({ title, description }) {
  return (
    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
