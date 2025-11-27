"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Baby, Activity, Heart, Stethoscope, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AcompanhamentoIntensivo() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Baby className="w-8 h-8" />
            <div>
              <CardTitle className="text-2xl">Acompanhamento Intensivo</CardTitle>
              <CardDescription className="text-purple-100">
                Cuidados especializados para bebês prematuros e com complexidades
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Público-Alvo */}
      <Card>
        <CardHeader>
          <CardTitle>Bebês que Necessitam Acompanhamento Intensivo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-3">Prematuros</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Nascidos antes de 37 semanas</li>
                <li>• Extremo baixo peso (&lt;1500g)</li>
                <li>• Muito baixo peso (&lt;1000g)</li>
                <li>• Imaturidade dos sistemas</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-3">Alimentação por Sonda</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Sonda orogástrica</li>
                <li>• Sonda nasogástrica</li>
                <li>• Gastrostomia</li>
                <li>• Transição para via oral</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-3">Complicações Respiratórias</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Displasia broncopulmonar</li>
                <li>• Uso de ventilação mecânica</li>
                <li>• Oxigenoterapia prolongada</li>
                <li>• Apneia da prematuridade</li>
              </ul>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-3">Outras Condições</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Cardiopatias congênitas</li>
                <li>• Síndromes genéticas</li>
                <li>• Malformações craniofaciais</li>
                <li>• Encefalopatia hipóxico-isquêmica</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Protocolo de Transição */}
      <Card>
        <CardHeader>
          <CardTitle>Protocolo de Transição da Sonda para Via Oral</CardTitle>
          <CardDescription>Etapas graduais para alimentação oral segura</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
            <h4 className="font-semibold text-purple-900 mb-2">Fase 1: Estimulação Sensorial</h4>
            <p className="text-sm text-gray-700 mb-2">
              Preparação das estruturas orais para alimentação
            </p>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• Massagem orofacial suave</li>
              <li>• Estimulação intra e extra-oral</li>
              <li>• Sucção não-nutritiva (chupeta)</li>
              <li>• Exposição a sabores (leite materno)</li>
            </ul>
          </div>

          <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
            <h4 className="font-semibold text-blue-900 mb-2">Fase 2: Sucção Não-Nutritiva</h4>
            <p className="text-sm text-gray-700 mb-2">
              Desenvolvimento do padrão de sucção
            </p>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• Oferecer chupeta durante gavagem</li>
              <li>• Avaliar força e coordenação da sucção</li>
              <li>• Monitorar sinais de estresse</li>
              <li>• Aumentar gradualmente o tempo</li>
            </ul>
          </div>

          <div className="p-4 border-l-4 border-green-500 bg-green-50">
            <h4 className="font-semibold text-green-900 mb-2">Fase 3: Primeiras Tentativas Orais</h4>
            <p className="text-sm text-gray-700 mb-2">
              Introdução gradual da alimentação oral
            </p>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• Iniciar com pequenos volumes</li>
              <li>• Avaliar coordenação sucção-deglutição-respiração</li>
              <li>• Monitorar saturação de oxigênio</li>
              <li>• Complementar com sonda se necessário</li>
            </ul>
          </div>

          <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
            <h4 className="font-semibold text-orange-900 mb-2">Fase 4: Transição Completa</h4>
            <p className="text-sm text-gray-700 mb-2">
              Alimentação oral exclusiva
            </p>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• Aumentar progressivamente volume oral</li>
              <li>• Reduzir gradualmente volume por sonda</li>
              <li>• Monitorar ganho de peso</li>
              <li>• Avaliar eficiência e segurança</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Sinais de Prontidão */}
      <Card className="border-green-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            <CardTitle className="text-green-900">Sinais de Prontidão para Alimentação Oral</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Critérios Fisiológicos</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Idade gestacional corrigida ≥ 32-34 semanas</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Estabilidade respiratória (sem apneia)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Saturação de O₂ estável (≥ 90%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Frequência cardíaca estável</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Critérios Comportamentais</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Estado de alerta adequado</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Reflexo de busca presente</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Sucção não-nutritiva coordenada</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Sinais de fome (levar mão à boca)</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sinais de Estresse */}
      <Alert className="border-red-200 bg-red-50">
        <AlertCircle className="h-4 w-4 text-red-600" />
        <AlertTitle className="text-red-900">Sinais de Estresse Durante Alimentação</AlertTitle>
        <AlertDescription className="text-red-800">
          <p className="mb-2">Interrompa a alimentação se observar:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <ul className="space-y-1 text-sm">
              <li>• Dessaturação de oxigênio (&lt;90%)</li>
              <li>• Bradicardia ou taquicardia</li>
              <li>• Apneia ou pausas respiratórias</li>
              <li>• Cianose perioral ou generalizada</li>
            </ul>
            <ul className="space-y-1 text-sm">
              <li>• Tosse ou engasgos frequentes</li>
              <li>• Refluxo nasal de leite</li>
              <li>• Agitação ou choro excessivo</li>
              <li>• Sonolência ou hipotonia</li>
            </ul>
          </div>
        </AlertDescription>
      </Alert>

      {/* Monitoramento */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-blue-600" />
            <CardTitle>Parâmetros de Monitoramento</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Durante a Alimentação</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Saturação de oxigênio contínua</li>
                <li>• Frequência cardíaca e respiratória</li>
                <li>• Tempo de mamada</li>
                <li>• Volume ingerido</li>
                <li>• Sinais de fadiga ou estresse</li>
              </ul>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Evolução Geral</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Ganho de peso diário/semanal</li>
                <li>• Número de mamadas por dia</li>
                <li>• Progressão do volume oral</li>
                <li>• Redução da dependência da sonda</li>
                <li>• Desenvolvimento neuropsicomotor</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
