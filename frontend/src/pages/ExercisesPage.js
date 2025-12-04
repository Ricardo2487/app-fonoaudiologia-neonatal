import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen, Clock, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { api } from '../utils/api';
import { toast } from 'sonner';

export default function ExercisesPage({ user }) {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    loadExercises();
  }, []);

  useEffect(() => {
    filterExercises();
  }, [searchTerm, categoryFilter, difficultyFilter, exercises]);

  const loadExercises = async () => {
    try {
      const response = await api.getExercises();
      setExercises(response.data);
      setFilteredExercises(response.data);
    } catch (error) {
      toast.error('Erro ao carregar exercícios');
    } finally {
      setLoading(false);
    }
  };

  const filterExercises = () => {
    let filtered = exercises;

    if (searchTerm) {
      filtered = filtered.filter(ex => 
        ex.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(ex => ex.category === categoryFilter);
    }

    if (difficultyFilter !== 'all') {
      filtered = filtered.filter(ex => ex.difficulty_level === difficultyFilter);
    }

    setFilteredExercises(filtered);
  };

  const openExerciseDetail = (exercise) => {
    setSelectedExercise(exercise);
    setShowDialog(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const categories = [...new Set(exercises.map(ex => ex.category))];
  const difficulties = ['fácil', 'médio', 'difícil'];

  return (
    <div data-testid="exercises-page" className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Biblioteca de Exercícios</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Explore nossa coleção completa de exercícios de fonoaudiologia
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  data-testid="search-input"
                  placeholder="Buscar exercícios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger data-testid="category-filter">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas Categorias</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger data-testid="difficulty-filter">
                <SelectValue placeholder="Dificuldade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas Dificuldades</SelectItem>
                {difficulties.map(diff => (
                  <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600 dark:text-gray-400">
          {filteredExercises.length} exercício(s) encontrado(s)
        </p>
      </div>

      {/* Exercise Grid */}
      {filteredExercises.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise, index) => (
            <ExerciseCard 
              key={exercise.id}
              exercise={exercise}
              index={index}
              onClick={() => openExerciseDetail(exercise)}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
              Nenhum exercício encontrado
            </p>
            <p className="text-sm text-gray-500">
              Tente ajustar os filtros de busca
            </p>
          </CardContent>
        </Card>
      )}

      {/* Exercise Detail Dialog */}
      {selectedExercise && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedExercise.title}</DialogTitle>
              <DialogDescription>{selectedExercise.description}</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{selectedExercise.category}</Badge>
                <Badge variant="outline">{selectedExercise.difficulty_level}</Badge>
                {selectedExercise.estimated_time && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {selectedExercise.estimated_time} min
                  </Badge>
                )}
              </div>

              <div>
                <h3 className="font-semibold mb-2">Instruções:</h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap font-sans text-sm">{selectedExercise.instructions}</pre>
                </div>
              </div>

              {selectedExercise.frequency && (
                <div>
                  <h3 className="font-semibold mb-2">Frequência Recomendada:</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedExercise.frequency}</p>
                </div>
              )}

              {selectedExercise.media_urls && selectedExercise.media_urls.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Material de Apoio:</h3>
                  <div className="space-y-4">
                    {selectedExercise.media_urls.map((url, i) => {
                      // Check if it's a YouTube video
                      if (url.includes('youtube.com') || url.includes('youtu.be')) {
                        return (
                          <div key={i} className="aspect-video w-full rounded-lg overflow-hidden">
                            <iframe
                              width="100%"
                              height="100%"
                              src={url}
                              title={`Vídeo ${i + 1}`}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                            ></iframe>
                          </div>
                        );
                      } else {
                        return (
                          <img 
                            key={i} 
                            src={url} 
                            alt={`Media ${i + 1}`} 
                            className="rounded-lg w-full h-48 object-cover" 
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button data-testid="start-exercise-btn" className="flex-1">
                  Iniciar Exercício
                </Button>
                <Button data-testid="add-to-plan-btn" variant="outline" className="flex-1">
                  Adicionar ao Plano
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function ExerciseCard({ exercise, index, onClick }) {
  const difficultyColors = {
    'fácil': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'médio': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'difícil': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card 
        data-testid={`exercise-card-${exercise.id}`}
        className="card-hover cursor-pointer h-full" 
        onClick={onClick}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-2">
            <CardTitle className="text-lg line-clamp-2">{exercise.title}</CardTitle>
          </div>
          <CardDescription className="line-clamp-2">{exercise.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="capitalize">{exercise.category}</Badge>
            <Badge className={difficultyColors[exercise.difficulty_level] || ''}>
              {exercise.difficulty_level}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            {exercise.estimated_time && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {exercise.estimated_time} min
              </div>
            )}
            {exercise.frequency && (
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {exercise.frequency}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
