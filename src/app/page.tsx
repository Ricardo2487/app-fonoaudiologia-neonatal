"use client"

import { useState } from "react"
import { Baby, ClipboardList, Heart, Stethoscope, Calendar, BookOpen, Home, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Anamnese from "@/components/anamnese"
import Triagem from "@/components/triagem"
import Aleitamento from "@/components/aleitamento"
import AcompanhamentoIntensivo from "@/components/acompanhamento-intensivo"
import Disfagia from "@/components/disfagia"
import FollowUp from "@/components/follow-up"
import Orientacoes from "@/components/orientacoes"

export default function Home() {
  const [activeTab, setActiveTab] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [anamneseData, setAnamneseData] = useState<any>(null)

  const handleAnamneseComplete = (data: any) => {
    setAnamneseData(data)
    setActiveTab("triagem")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-green-500 p-2 rounded-xl">
                <Baby className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FonoNeo</h1>
                <p className="text-xs text-gray-600">Fonoaudiologia Neonatal</p>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-2">
              <Button
                variant={activeTab === "home" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("home")}
              >
                <Home className="w-4 h-4 mr-2" />
                Início
              </Button>
              <Button
                variant={activeTab === "anamnese" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("anamnese")}
              >
                <ClipboardList className="w-4 h-4 mr-2" />
                Anamnese
              </Button>
              <Button
                variant={activeTab === "orientacoes" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("orientacoes")}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Orientações
              </Button>
            </nav>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-2 flex flex-col gap-2">
              <Button
                variant={activeTab === "home" ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  setActiveTab("home")
                  setMobileMenuOpen(false)
                }}
                className="justify-start"
              >
                <Home className="w-4 h-4 mr-2" />
                Início
              </Button>
              <Button
                variant={activeTab === "anamnese" ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  setActiveTab("anamnese")
                  setMobileMenuOpen(false)
                }}
                className="justify-start"
              >
                <ClipboardList className="w-4 h-4 mr-2" />
                Anamnese
              </Button>
              <Button
                variant={activeTab === "orientacoes" ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  setActiveTab("orientacoes")
                  setMobileMenuOpen(false)
                }}
                className="justify-start"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Orientações
              </Button>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        {activeTab === "home" && (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Bem-vindo ao FonoNeo
              </h2>
              <p className="text-blue-50 text-sm md:text-base mb-6 max-w-2xl">
                Sistema completo de avaliação, reabilitação e orientação para recém-nascidos prematuros 
                e com problemas gestacionais. Acompanhamento especializado em audição, sucção, deglutição e respiração.
              </p>
              <Button
                onClick={() => setActiveTab("anamnese")}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
              >
                Iniciar Nova Avaliação
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab("anamnese")}>
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <ClipboardList className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Anamnese Completa</CardTitle>
                  <CardDescription>
                    Coleta detalhada de informações sobre o bebê, histórico gestacional e testes obrigatórios
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <Stethoscope className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Triagem e Avaliação</CardTitle>
                  <CardDescription>
                    Prevenção de problemas na amamentação e avaliação das funções orais do bebê
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-3">
                    <Heart className="w-6 h-6 text-pink-600" />
                  </div>
                  <CardTitle className="text-lg">Aleitamento Materno</CardTitle>
                  <CardDescription>
                    Suporte completo do pré-natal até a alta, auxiliando bebês com dificuldades de sucção
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <Baby className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Acompanhamento Intensivo</CardTitle>
                  <CardDescription>
                    Auxílio especializado para prematuros, bebês com sonda e outras complexidades
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                    <Stethoscope className="w-6 h-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg">Disfagia Neonatal</CardTitle>
                  <CardDescription>
                    Avaliação e tratamento de dificuldades de deglutição e transição alimentar
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-3">
                    <Calendar className="w-6 h-6 text-cyan-600" />
                  </div>
                  <CardTitle className="text-lg">Follow-up Pós-Alta</CardTitle>
                  <CardDescription>
                    Monitoramento do desenvolvimento oral e motor após alta hospitalar
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Info Section */}
            <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Sobre o FonoNeo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-700">
                <p>
                  <strong>Público-alvo:</strong> Recém-nascidos prematuros, bebês com problemas gestacionais, 
                  que passaram por UTIs neonatais e suas famílias.
                </p>
                <p>
                  <strong>Foco principal:</strong> Audição, sucção, deglutição, respiração e desenvolvimento 
                  das funções orais essenciais para um crescimento saudável.
                </p>
                <p>
                  <strong>Testes obrigatórios:</strong> Verificação do Teste da Orelhinha (triagem auditiva) 
                  e Teste da Linguinha (avaliação do frênulo lingual) para garantir amamentação adequada.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "anamnese" && (
          <Anamnese onComplete={handleAnamneseComplete} />
        )}

        {activeTab === "triagem" && anamneseData && (
          <Triagem anamneseData={anamneseData} />
        )}

        {activeTab === "aleitamento" && (
          <Aleitamento />
        )}

        {activeTab === "acompanhamento" && (
          <AcompanhamentoIntensivo />
        )}

        {activeTab === "disfagia" && (
          <Disfagia />
        )}

        {activeTab === "followup" && (
          <FollowUp />
        )}

        {activeTab === "orientacoes" && (
          <Orientacoes />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p>FonoNeo - Sistema de Fonoaudiologia Neonatal</p>
          <p className="mt-1 text-xs">Desenvolvido para profissionais da saúde e famílias</p>
        </div>
      </footer>
    </div>
  )
}
