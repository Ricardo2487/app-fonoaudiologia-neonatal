"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Activity, Shield, Stethoscope, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Disfagia() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8" />
            <div>
              <CardTitle className="text-2xl">Disfagia Neonatal</CardTitle>
              <CardDescription className="text-orange-100">
                Avaliação e tratamento de dificuldades de deglutição
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* O que é Disfagia */}
      <Card>
        <CardHeader>
          <CardTitle>O que é Disfagia Neonatal?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Disfagia é a dificuldade ou incapacidade de deglutir de forma segura e eficiente. 
            Em recém-nascidos, especialmente prematuros, pode comprometer a nutrição e causar complicações graves.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-semibold text-red-900 mb-2">Riscos da Disfagia</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Pneumonia aspirativa</li>
                <li>• Desnutrição e desidratação</li>
                <li>• Baixo ganho de peso</li>
                <li>• Comprometimento do desenvolvimento</li>
                <li>• Aversão oral</li>
              </ul>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-2">Causas Comuns</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Prematuridade</li>
                <li>• Imaturidade neurológica</li>
                <li>• Alterações anatômicas</li>
                <li>• Doenças respiratórias</li>
                <li>• Refluxo gastroesofágico</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sinais de Alerta */}
      <Alert className="border-red-200 bg-red-50">
        <AlertCircle className="h-4 w-4 text-red-600" />
        <AlertTitle className="text-red-900">Sinais de Alerta para Disfagia</AlertTitle>
        <AlertDescription className="text-red-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <p className="font-semibold mb-2">Durante a Alimentação:</p>
              <ul className="space-y-1 text-sm">
                <li>• Tosse ou engasgos frequentes</li>
                <li>• Mudança na coloração (cianose)</li>
                <li>• Pausas respiratórias (apneia)</li>
                <li>• Refluxo nasal de leite</li>
                <li>• Recusa alimentar</li>
                <li>• Tempo de mamada muito longo (&gt;30min)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Após a Alimentação:</p>
              <ul className="space-y-1 text-sm">
                <li>• Voz molhada ou gorgolejo</li>
                <li>• Respiração ruidosa</li>
                <li>• Regurgitação frequente</li>
                <li>• Irritabilidade excessiva</li>
                <li>• Baixo ganho de peso</li>
                <li>• Infecções respiratórias recorrentes</li>
              </ul>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Avaliação Clínica */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-blue-600" />
            <CardTitle>Avaliação Clínica da Deglutição</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
            <h4 className="font-semibold text-blue-900 mb-2">1. Avaliação Estrutural</h4>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• Inspeção de lábios, língua, palato</li>
              <li>• Avaliação do tônus muscular</li>
              <li>• Mobilidade das estruturas orais</li>
              <li>• Presença de malformações</li>
            </ul>
          </div>

          <div className="p-4 border-l-4 border-green-500 bg-green-50">
            <h4 className="font-semibold text-green-900 mb-2">2. Avaliação Funcional</h4>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• Reflexos orais (busca, sucção, deglutição)</li>
              <li>• Coordenação sucção-deglutição-respiração</li>
              <li>• Força e ritmo da sucção</li>
              <li>• Eficiência da deglutição</li>
            </ul>
          </div>

          <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
            <h4 className="font-semibold text-purple-900 mb-2">3. Observação Durante Alimentação</h4>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• Posicionamento e pega</li>
              <li>• Sinais de aspiração ou penetração</li>
              <li>• Saturação de oxigênio</li>
              <li>• Sinais de fadiga ou estresse</li>
            </ul>
          </div>

          <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
            <h4 className="font-semibold text-orange-900 mb-2">4. Exames Complementares (quando indicado)</h4>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• Videofluoroscopia da deglutição</li>
              <li>• Videoendoscopia da deglutição (FEES)</li>
              <li>• Ultrassonografia da deglutição</li>
              <li>• Avaliação otorrinolaringológica</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Estratégias Terapêuticas */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            <CardTitle>Estratégias Terapêuticas</CardTitle>
          </div>
          <CardDescription>Intervenções para manejo da disfagia neonatal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Modificações Posturais</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Posicionamento em 45-60 graus</li>
                <li>• Suporte adequado de cabeça e pescoço</li>
                <li>• Alinhamento corporal</li>
                <li>• Pausas durante alimentação</li>
              </ul>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Estimulação Sensorial</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Massagem orofacial</li>
                <li>• Estimulação intra-oral</li>
                <li>• Variação de temperatura</li>
                <li>• Estimulação gustativa</li>
              </ul>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Manobras Facilitadoras</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Controle de fluxo</li>
                <li>• Ritmo de mamada adequado</li>
                <li>• Pausas programadas</li>
                <li>• Suporte de mandíbula</li>
              </ul>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Adaptações</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Bicos especiais (fluxo controlado)</li>
                <li>• Espessamento de líquidos (se indicado)</li>
                <li>• Volumes menores e mais frequentes</li>
                <li>• Ambiente tranquilo</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Protocolo de Segurança */}
      <Card className="border-green-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            <CardTitle className="text-green-900">Protocolo de Alimentação Segura</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
              <div>
                <p className="font-medium text-gray-900">Preparação</p>
                <p className="text-sm text-gray-700">Bebê em estado de alerta, ambiente calmo, posicionamento adequado</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
              <div>
                <p className="font-medium text-gray-900">Monitoramento Contínuo</p>
                <p className="text-sm text-gray-700">Observar saturação, frequência respiratória, sinais de estresse</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
              <div>
                <p className="font-medium text-gray-900">Pausas Programadas</p>
                <p className="text-sm text-gray-700">Permitir descanso e recuperação durante a mamada</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
              <div>
                <p className="font-medium text-gray-900">Pós-Alimentação</p>
                <p className="text-sm text-gray-700">Manter elevado por 20-30 minutos, observar sinais de desconforto</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
              <div>
                <p className="font-medium text-gray-900">Registro</p>
                <p className="text-sm text-gray-700">Documentar volume ingerido, tempo, intercorrências</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quando Encaminhar */}
      <Alert className="border-purple-200 bg-purple-50">
        <AlertCircle className="h-4 w-4 text-purple-600" />
        <AlertTitle className="text-purple-900">Quando Encaminhar para Avaliação Especializada</AlertTitle>
        <AlertDescription className="text-purple-800">
          <ul className="mt-2 space-y-1 text-sm">
            <li>• Suspeita de aspiração (tosse, engasgos, cianose)</li>
            <li>• Pneumonias de repetição</li>
            <li>• Recusa alimentar persistente</li>
            <li>• Baixo ganho de peso apesar das intervenções</li>
            <li>• Necessidade de via alternativa de alimentação</li>
            <li>• Malformações craniofaciais</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  )
}
