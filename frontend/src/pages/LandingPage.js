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
                  style={{ backgroundColor: '#6366F1', color: 'white' }}
                  className="hover:opacity-90 rounded-lg px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transforme Vidas com Tecnologia</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Cada palavra que uma criança consegue pronunciar, cada som que se torna mais claro, 
              é uma vitória compartilhada. Nossa plataforma está aqui para tornar essa jornada mais eficaz e acolhedora.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Brain className="w-8 h-8" />}
              title="IA que Entende Cada Paciente"
              description="Nossa inteligência artificial analisa o histórico, diagnóstico e progresso para sugerir exercícios personalizados. Como ter um assistente especializado disponível 24/7."
              highlight="Recomendações em tempo real"
            />
            <FeatureCard 
              icon={<Activity className="w-8 h-8" />}
              title="Exercícios que Engajam"
              description="Vídeos demonstrativos, áudios guiados e instruções passo a passo. Cada exercício foi pensado para ser claro, motivador e efetivo."
              highlight="6+ exercícios prontos"
            />
            <FeatureCard 
              icon={<Calendar className="w-8 h-8" />}
              title="Nunca Perca uma Consulta"
              description="Agende presencialmente ou online com confirmação automática. Receba lembretes e tenha acesso direto à sala de teleconsulta com um clique."
              highlight="Lembretes automáticos"
            />
            <FeatureCard 
              icon={<TrendingUp className="w-8 h-8" />}
              title="Veja a Evolução Acontecendo"
              description="Registre áudios, vídeos e observações diárias. Gráficos visuais mostram o progresso ao longo do tempo, celebrando cada conquista."
              highlight="Gráficos e relatórios"
            />
            <FeatureCard 
              icon={<Video className="w-8 h-8" />}
              title="Atendimento de Onde Estiver"
              description="Teleconsultas com qualidade profissional. Perfeito para quem tem agenda corrida ou mora longe do consultório."
              highlight="Sala de vídeo integrada"
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8" />}
              title="Todos Conectados"
              description="Pacientes acompanham seu progresso, fonoaudiólogos criam planos personalizados, administradores gerenciam a clínica. Tudo sincronizado."
              highlight="3 perfis diferentes"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Planos para Todos</h2>
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
      <section style={{ backgroundColor: '#6366F1' }} className="py-24 text-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'white' }}>
            Pronto para Começar?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.95)' }}>
            Junte-se a centenas de profissionais e pacientes que já transformaram sua terapia fonoaudiológica
          </p>
          <Button 
            data-testid="cta-start-btn"
            size="lg" 
            style={{ backgroundColor: 'white', color: '#6366F1' }}
            className="hover:opacity-90 rounded-lg px-8 py-6 text-lg font-bold shadow-2xl hover:scale-105 transition-all"
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
      style={featured ? { backgroundColor: '#6366F1', color: 'white' } : {}}
      className={`p-8 rounded-2xl relative shadow-2xl ${
        featured 
          ? 'transform scale-105 border-2 border-primary' 
          : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'
      }`}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div style={{ backgroundColor: '#10B981', color: 'white' }} className="text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
            MAIS POPULAR
          </div>
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2 mt-2" style={featured ? { color: 'white' } : {}}>{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold" style={featured ? { color: 'white' } : {}}>{price}</span>
        <span style={featured ? { color: 'rgba(255,255,255,0.9)' } : {}} className={featured ? '' : 'text-gray-600 dark:text-gray-400'}>
          {period}
        </span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <svg 
              className={`w-5 h-5 mt-0.5 flex-shrink-0 ${featured ? '' : 'text-green-500'}`}
              style={featured ? { color: 'white' } : {}}
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span style={featured ? { color: 'white' } : {}} className={featured ? '' : 'text-gray-700 dark:text-gray-300'}>{feature}</span>
          </li>
        ))}
      </ul>
      <Button 
        data-testid={`pricing-${title.toLowerCase()}-btn`}
        style={featured ? { backgroundColor: 'white', color: '#6366F1' } : { backgroundColor: '#6366F1', color: 'white' }}
        className="w-full rounded-lg py-6 font-semibold text-base shadow-lg hover:opacity-90 hover:scale-105 transition-all"
      >
        Começar
      </Button>
    </motion.div>
  );
}
