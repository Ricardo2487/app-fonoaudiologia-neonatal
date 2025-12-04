import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Calendar, TrendingUp, Users, Video } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function LandingPage({ onShowAuth }) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-32">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Fonoaudiologia Digital Inteligente
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
                Plataforma completa para profissionais e pacientes. Exercícios personalizados, teleconsultas e acompanhamento com IA.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  data-testid="get-started-btn"
                  size="lg" 
                  className="bg-primary text-white hover:bg-primary/90 rounded-lg px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  onClick={onShowAuth}
                >
                  Começar Agora
                </Button>
                <Button 
                  data-testid="learn-more-btn"
                  size="lg" 
                  variant="outline" 
                  className="rounded-lg px-8 py-6 text-lg border-2 border-gray-800 dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold"
                >
                  Saiba Mais
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-6"
            >
              <img 
                src="https://images.unsplash.com/photo-1750508720320-efd342adf07f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHw0fHxzcGVlY2glMjB0aGVyYXBpc3QlMjBjaGlsZCUyMHNlc3Npb24lMjBoYXBweXxlbnwwfHx8fDE3NjQ3OTQzODJ8MA&ixlib=rb-4.1.0&q=85"
                alt="Happy child in speech therapy session"
                className="rounded-2xl shadow-2xl w-full h-auto max-h-[600px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recursos Poderosos</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Tudo que você precisa para uma terapia fonoaudiológica moderna e eficaz
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Brain className="w-8 h-8" />}
              title="IA Inteligente"
              description="Recomendações personalizadas de exercícios baseadas em IA"
            />
            <FeatureCard 
              icon={<Activity className="w-8 h-8" />}
              title="Exercícios Multimídia"
              description="Biblioteca completa com vídeos, áudios e materiais didáticos"
            />
            <FeatureCard 
              icon={<Calendar className="w-8 h-8" />}
              title="Agenda Integrada"
              description="Gerencie consultas e teleconsultas em um só lugar"
            />
            <FeatureCard 
              icon={<TrendingUp className="w-8 h-8" />}
              title="Acompanhamento"
              description="Diário de progresso detalhado com análise de evolução"
            />
            <FeatureCard 
              icon={<Video className="w-8 h-8" />}
              title="Teleconsultas"
              description="Atendimento online com qualidade profissional"
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8" />}
              title="Multi-perfil"
              description="Pacientes, fonoaudiólogos e administradores em uma plataforma"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 gradient-mesh">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Planos para Todos</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Escolha o plano ideal para você
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard 
              title="Paciente"
              price="R$ 49"
              period="/mês"
              features={[
                "Acesso à biblioteca de exercícios",
                "Diário de progresso",
                "Agenda de consultas",
                "Suporte básico"
              ]}
            />
            <PricingCard 
              title="Profissional"
              price="R$ 149"
              period="/mês"
              featured
              features={[
                "Gestão ilimitada de pacientes",
                "IA para recomendações",
                "Teleconsultas integradas",
                "Biblioteca completa",
                "Suporte prioritário"
              ]}
            />
            <PricingCard 
              title="Clínica"
              price="R$ 399"
              period="/mês"
              features={[
                "Múltiplos profissionais",
                "Dashboard administrativo",
                "Relatórios avançados",
                "API personalizada",
                "Suporte dedicado"
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para Começar?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Junte-se a centenas de profissionais e pacientes que já transformaram sua terapia fonoaudiológica
          </p>
          <Button 
            data-testid="cta-start-btn"
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100 rounded-lg px-8 py-6 text-lg"
            onClick={onShowAuth}
          >
            Criar Conta Grátis
          </Button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 card-hover bg-white dark:bg-gray-800"
    >
      <div className="w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  );
}

function PricingCard({ title, price, period, features, featured }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`p-8 rounded-2xl relative ${
        featured 
          ? 'bg-gradient-to-br from-primary to-primary/90 text-white shadow-2xl transform scale-105 border-2 border-white/20' 
          : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'
      }`}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-secondary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
            MAIS POPULAR
          </div>
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2 mt-2">{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">{price}</span>
        <span className={featured ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}>
          {period}
        </span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${featured ? 'text-white' : 'text-green-500'}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className={featured ? 'text-white/95' : 'text-gray-700 dark:text-gray-300'}>{feature}</span>
          </li>
        ))}
      </ul>
      <Button 
        data-testid={`pricing-${title.toLowerCase()}-btn`}
        className={`w-full rounded-lg py-6 font-semibold text-base shadow-lg hover:shadow-xl transition-all ${
          featured 
            ? 'bg-white text-primary hover:bg-gray-50 hover:scale-105' 
            : 'bg-primary text-white hover:bg-primary/90'
        }`}
      >
        Começar
      </Button>
    </motion.div>
  );
}
