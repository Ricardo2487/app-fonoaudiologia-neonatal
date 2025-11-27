"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, TrendingUp, Baby, MessageSquare, CheckCircle2 } from "lucide-react"

export default function FollowUp() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8" />
            <div>
              <CardTitle className="text-2xl">Follow-up Pós-Alta</CardTitle>
              <CardDescription className="text-cyan-100">
                Acompanhamento do desenvolvimento após alta hospitalar
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Importância do Follow-up */}
      <Card>
        <CardHeader>
          <CardTitle>Por que o Follow-up é Essencial?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Bebês prematuros e com complicações neonatais têm maior risco de atrasos no desenvolvimento. 
            O acompanhamento regular permite identificar precocemente alterações e intervir no momento adequado.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-cyan-50 rounded-lg">
              <h4 className="font-semibold text-cyan-900 mb-2">Detecção Precoce</h4>
              <p className="text-sm text-gray-700">
                Identificar atrasos ou alterações no desenvolvimento antes que se tornem mais graves
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Intervenção Oportuna</h4>
              <p className="text-sm text-gray-700">
                Iniciar tratamento no período de maior plasticidade cerebral e potencial de recuperação
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Orientação Familiar</h4>
              <p className="text-sm text-gray-700">
                Apoiar e orientar a família sobre estimulação e cuidados adequados em casa
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cronograma de Avaliações */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <CardTitle>Cronograma de Avaliações Recomendado</CardTitle>
          </div>
          <CardDescription>Frequência de acompanhamento baseada em idade corrigida</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border-l-4 border-cyan-500 bg-cyan-50">
            <h4 className="font-semibold text-cyan-900 mb-2">0-3 meses (idade corrigida)</h4>
            <p className="text-sm text-gray-700 mb-2"><strong>Frequência:</strong> Mensal</p>
            <p className="text-sm text-gray-700"><strong>Foco:</strong> Alimentação, ganho de peso, reflexos orais, vínculo mãe-bebê</p>
          </div>

          <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
            <h4 className="font-semibold text-blue-900 mb-2">3-6 meses (idade corrigida)</h4>
            <p className="text-sm text-gray-700 mb-2"><strong>Frequência:</strong> Bimensal</p>
            <p className="text-sm text-gray-700"><strong>Foco:</strong> Controle cervical, vocalização, introdução alimentar, interação social</p>
          </div>

          <div className="p-4 border-l-4 border-green-500 bg-green-50">
            <h4 className="font-semibold text-green-900 mb-2">6-12 meses (idade corrigida)</h4>
            <p className="text-sm text-gray-700 mb-2"><strong>Frequência:</strong> Trimestral</p>
            <p className="text-sm text-gray-700"><strong>Foco:</strong> Balbucio, mastigação, primeiras palavras, desenvolvimento motor oral</p>
          </div>

          <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
            <h4 className="font-semibold text-purple-900 mb-2">12-24 meses (idade corrigida)</h4>
            <p className="text-sm text-gray-700 mb-2"><strong>Frequência:</strong> Semestral</p>
            <p className="text-sm text-gray-700"><strong>Foco:</strong> Linguagem expressiva e receptiva, alimentação variada, desenvolvimento da fala</p>
          </div>

          <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
            <h4 className="font-semibold text-orange-900 mb-2">24-36 meses</h4>
            <p className="text-sm text-gray-700 mb-2"><strong>Frequência:</strong> Anual ou conforme necessidade</p>
            <p className="text-sm text-gray-700"><strong>Foco:</strong> Linguagem complexa, articulação, fluência, preparação para escola</p>
          </div>
        </CardContent>
      </Card>

      {/* Áreas de Desenvolvimento */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <CardTitle>Áreas de Desenvolvimento Monitoradas</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Baby className="w-5 h-5 text-blue-600" />
                Funções Orais
              </h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Sucção e deglutição</li>
                <li>• Mastigação (após 6 meses)</li>
                <li>• Controle de saliva</li>
                <li>• Respiração (padrão nasal)</li>
                <li>• Transição alimentar</li>
              </ul>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-green-600" />
                Comunicação e Linguagem
              </h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Vocalização e balbucio</li>
                <li>• Compreensão de ordens simples</li>
                <li>• Primeiras palavras</li>
                <li>• Expansão do vocabulário</li>
                <li>• Formação de frases</li>
              </ul>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Audição</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Resposta a sons</li>
                <li>• Localização sonora</li>
                <li>• Discriminação auditiva</li>
                <li>• Atenção auditiva</li>
                <li>• Processamento auditivo</li>
              </ul>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Desenvolvimento Motor Oral</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Tônus muscular orofacial</li>
                <li>• Mobilidade de língua e lábios</li>
                <li>• Coordenação motora oral</li>
                <li>• Articulação dos sons</li>
                <li>• Precisão dos movimentos</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marcos do Desenvolvimento */}
      <Card>
        <CardHeader>
          <CardTitle>Marcos do Desenvolvimento da Comunicação</CardTitle>
          <CardDescription>Referências para acompanhamento (idade corrigida para prematuros)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">0-3 meses</h4>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• Choro diferenciado</li>
                <li>• Sorri em resposta a estímulos</li>
                <li>• Vocaliza sons guturais</li>
                <li>• Reage a sons altos</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">4-6 meses</h4>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• Balbucio (ba-ba, ma-ma)</li>
                <li>• Vira a cabeça para sons</li>
                <li>• Ri e grita de alegria</li>
                <li>• Imita alguns sons</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">7-12 meses</h4>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• Balbucio variado</li>
                <li>• Compreende "não"</li>
                <li>• Primeiras palavras (mamã, papá)</li>
                <li>• Aponta para objetos</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">12-18 meses</h4>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• 5-20 palavras</li>
                <li>• Compreende ordens simples</li>
                <li>• Aponta partes do corpo</li>
                <li>• Imita palavras novas</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">18-24 meses</h4>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• 50+ palavras</li>
                <li>• Frases de 2 palavras</li>
                <li>• Nomeia figuras</li>
                <li>• Segue instruções de 2 etapas</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">24-36 meses</h4>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• Frases de 3-4 palavras</li>
                <li>• Conta experiências simples</li>
                <li>• Faz perguntas</li>
                <li>• Fala inteligível para estranhos</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orientações para Família */}
      <Card className="border-green-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <CardTitle className="text-green-900">Como a Família Pode Contribuir</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Converse com o bebê</p>
                <p className="text-sm text-gray-700">Fale durante as atividades diárias, narre o que está fazendo, use entonação variada</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Leia e cante</p>
                <p className="text-sm text-gray-700">Livros com figuras, músicas infantis, rimas e cantigas estimulam a linguagem</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Responda às vocalizações</p>
                <p className="text-sm text-gray-700">Quando o bebê vocalizar, responda como se fosse uma conversa, incentive a comunicação</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Estimule a alimentação variada</p>
                <p className="text-sm text-gray-700">Introduza texturas e sabores gradualmente, respeitando o ritmo do bebê</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Observe e registre</p>
                <p className="text-sm text-gray-700">Anote marcos importantes, dúvidas e preocupações para discutir nas consultas</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Compareça às consultas</p>
                <p className="text-sm text-gray-700">Mantenha o acompanhamento regular, mesmo que o bebê pareça estar bem</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
