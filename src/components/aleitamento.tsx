"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, CheckCircle2, AlertCircle, Baby } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Aleitamento() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-r from-pink-600 to-pink-700 text-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8" />
            <div>
              <CardTitle className="text-2xl">Aleitamento Materno</CardTitle>
              <CardDescription className="text-pink-100">
                Suporte completo para amamentação de recém-nascidos
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Benefícios do Aleitamento */}
      <Card>
        <CardHeader>
          <CardTitle>Benefícios do Aleitamento Materno</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-pink-50 rounded-lg">
              <h4 className="font-semibold text-pink-900 mb-2">Para o Bebê</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Nutrição completa e balanceada</li>
                <li>• Proteção imunológica</li>
                <li>• Desenvolvimento orofacial adequado</li>
                <li>• Vínculo afetivo com a mãe</li>
                <li>• Prevenção de alergias</li>
                <li>• Melhor desenvolvimento cognitivo</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Para a Mãe</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Recuperação pós-parto mais rápida</li>
                <li>• Redução do risco de hemorragia</li>
                <li>• Prevenção de câncer de mama e ovário</li>
                <li>• Fortalecimento do vínculo mãe-bebê</li>
                <li>• Economia financeira</li>
                <li>• Praticidade e disponibilidade</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Técnicas de Amamentação */}
      <Card>
        <CardHeader>
          <CardTitle>Técnicas para Amamentação Eficaz</CardTitle>
          <CardDescription>Orientações práticas para uma boa pega e posicionamento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Posicionamento Correto</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Posição da Mãe</p>
                  <p className="text-sm text-gray-700">Sente-se confortavelmente com as costas apoiadas. Use travesseiros para apoiar os braços e o bebê.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Posição do Bebê</p>
                  <p className="text-sm text-gray-700">Barriga do bebê encostada na barriga da mãe. Cabeça e corpo alinhados. Nariz na altura do mamilo.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Pega Adequada</p>
                  <p className="text-sm text-gray-700">Boca bem aberta, lábios virados para fora, queixo tocando a mama, mais aréola visível acima da boca.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Posições de Amamentação</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-2">Tradicional (Berço)</h5>
                <p className="text-sm text-gray-700">Bebê deitado de lado no colo, com a cabeça apoiada no antebraço da mãe.</p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-2">Invertida (Futebol)</h5>
                <p className="text-sm text-gray-700">Bebê posicionado ao lado do corpo da mãe, com os pés apontando para trás. Ideal após cesárea.</p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-2">Deitada</h5>
                <p className="text-sm text-gray-700">Mãe e bebê deitados de lado, frente a frente. Confortável para mamadas noturnas.</p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-2">Cavalinho</h5>
                <p className="text-sm text-gray-700">Bebê sentado de frente para a mãe. Útil para bebês com refluxo ou prematuros.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sinais de Boa Amamentação */}
      <Card className="border-green-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <CardTitle className="text-green-900">Sinais de que a Amamentação está Indo Bem</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Bebê mama com calma e ritmo regular</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Você ouve o bebê deglutindo</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Bebê solta a mama espontaneamente quando satisfeito</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Bebê fica tranquilo após mamar</span>
              </li>
            </ul>

            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Mamas ficam mais macias após a mamada</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Bebê ganha peso adequadamente</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Fraldas molhadas (6-8 por dia)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Sem dor ou desconforto para a mãe</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Problemas Comuns */}
      <Card className="border-orange-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <CardTitle className="text-orange-900">Problemas Comuns e Soluções</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-orange-50 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-2">Dificuldade de Pega</h4>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Solução:</strong> Estimule o reflexo de busca tocando o lábio do bebê com o mamilo. 
              Espere a boca abrir bem antes de aproximar o bebê da mama.
            </p>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-2">Mamilos Doloridos ou Rachados</h4>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Solução:</strong> Verifique a pega. Aplique leite materno nos mamilos após mamadas. 
              Use conchas de amamentação. Procure ajuda profissional se persistir.
            </p>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-2">Ingurgitamento Mamário</h4>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Solução:</strong> Amamente com frequência. Faça massagem suave antes de mamar. 
              Aplique compressas frias após as mamadas. Ordenhe um pouco de leite se necessário.
            </p>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-2">Bebê com Sono Excessivo</h4>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Solução:</strong> Estimule o bebê antes de mamar (troca de fralda, conversar). 
              Ofereça a mama a cada 2-3 horas. Mantenha o ambiente iluminado durante o dia.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quando Procurar Ajuda */}
      <Alert className="border-red-200 bg-red-50">
        <AlertCircle className="h-4 w-4 text-red-600" />
        <AlertTitle className="text-red-900">Quando Procurar Ajuda Profissional</AlertTitle>
        <AlertDescription className="text-red-800">
          <ul className="mt-2 space-y-1 text-sm">
            <li>• Dor intensa durante ou após as mamadas</li>
            <li>• Bebê não ganha peso adequadamente</li>
            <li>• Menos de 6 fraldas molhadas por dia após o 5º dia</li>
            <li>• Febre, vermelhidão ou nódulos nas mamas</li>
            <li>• Bebê muito sonolento ou recusa mamar</li>
            <li>• Sinais de desidratação no bebê</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  )
}
