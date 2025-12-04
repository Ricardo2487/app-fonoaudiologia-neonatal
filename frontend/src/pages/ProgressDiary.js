import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Video, FileText, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { api } from '../utils/api';
import { toast } from 'sonner';

export default function ProgressDiary({ user }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newEntry, setNewEntry] = useState({
    text_notes: '',
    exercise_id: null,
    plan_id: null
  });
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const response = await api.getProgress();
      setEntries(response.data);
    } catch (error) {
      toast.error('Erro ao carregar diário');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newEntry.text_notes.trim()) {
      toast.error('Digite suas observações');
      return;
    }

    try {
      const response = await api.createProgress({
        patient_id: user.id,
        text_notes: newEntry.text_notes,
        date: new Date().toISOString()
      });
      
      setEntries([response.data, ...entries]);
      setNewEntry({ text_notes: '', exercise_id: null, plan_id: null });
      toast.success('Registro adicionado com sucesso!');
    } catch (error) {
      toast.error('Erro ao adicionar registro');
    }
  };

  const startRecording = () => {
    toast.info('Funcionalidade de gravação em desenvolvimento');
    setRecording(true);
    setTimeout(() => setRecording(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Diário de Progresso</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Registre sua evolução e compartilhe com seu fonoaudiólogo
        </p>
      </div>

      {/* New Entry Form */}
      <Card>
        <CardHeader>
          <CardTitle>Novo Registro</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Como foi sua prática hoje? Teve alguma dificuldade?"
              value={newEntry.text_notes}
              onChange={(e) => setNewEntry({...newEntry, text_notes: e.target.value})}
              rows={4}
            />
            
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={startRecording} disabled={recording}>
                <Mic className="w-4 h-4 mr-2" />
                {recording ? 'Gravando...' : 'Gravar Áudio'}
              </Button>
              <Button type="button" variant="outline">
                <Video className="w-4 h-4 mr-2" />
                Upload Vídeo
              </Button>
            </div>

            <Button type="submit" className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Salvar Registro
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Entries List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Histórico</h2>
        {entries.length > 0 ? (
          entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">
                        {new Date(entry.date || entry.created_at).toLocaleDateString('pt-BR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </CardTitle>
                      <p className="text-sm text-gray-500">
                        {new Date(entry.date || entry.created_at).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {entry.text_notes}
                  </p>
                  {entry.therapist_comment && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                      <p className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-1">
                        Comentário do Fonoaudiólogo:
                      </p>
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        {entry.therapist_comment}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400">
                Nenhum registro ainda. Comece a documentar seu progresso!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
