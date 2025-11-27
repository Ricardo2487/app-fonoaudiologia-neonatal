"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Home, Baby, Heart, Lightbulb, Phone } from "lucide-react"

export default function Orientacoes() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8" />
            <div>
              <CardTitle className="text-2xl">Orientações para Família</CardTitle>
              <CardDescription className="text-indigo-100">
                Guia completo para cuidados e estimulação em casa
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Cuidados Diários */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-blue-600" />
            <CardTitle>Cuidados Diários com o Bebê</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-3">Higiene Oral</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Limpe a boca do bebê após cada mamada com gaze úmida</li>
                <li>• Massageie suavemente as gengivas</li>
                <li>• Não use mel ou açúcar na chupeta</li>
                <li>• Mantenha chupetas e bicos sempre limpos</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-3">Posicionamento</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Alterne a posição da cabeça durante o sono (previne plagiocefalia)</li>
                <li>• Evite deixar o bebê muito tempo na mesma posição</li>
                <li>• Faça "tummy time" (tempo de barriga) quando acordado e supervisionado</li>
                <li>• Mantenha o bebê elevado após mamadas (previne refluxo)</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-3">Ambiente</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Mantenha o ambiente tranquilo durante alimentação</li>
                <li>• Evite excesso de estímulos (luzes, sons) quando o bebê estiver cansado</li>
                <li>• Crie rotinas previsíveis (horários de sono, banho, mamadas)</li>
                <li>• Garanta temperatura confortável (não muito quente ou frio)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estimulação em Casa */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <CardTitle>Atividades de Estimulação</CardTitle>
          </div>
          <CardDescription>Exercícios simples para fazer em casa</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Estimulação Oral (0-6 meses)</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Massagem suave nas bochechas, lábios e gengivas</li>
                <li>• Deixe o bebê explorar as próprias mãos</li>
                <li>• Ofereça mordedores apropriados</li>
                <li>• Faça caretas e sons variados</li>
              </ul>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Linguagem (0-12 meses)</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Converse olhando nos olhos do bebê</li>
                <li>• Narre suas ações ("Agora vamos trocar a fralda")</li>
                <li>• Cante músicas e cantigas</li>
                <li>• Imite os sons que o bebê faz</li>
              </ul>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Audição (0-12 meses)</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Faça sons de diferentes lados</li>
                <li>• Use brinquedos sonoros variados</li>
                <li>• Cante em diferentes tons</li>
                <li>• Chame o bebê pelo nome</li>
              </ul>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Alimentação (6+ meses)</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Introduza texturas gradualmente</li>
                <li>• Deixe o bebê explorar os alimentos</li>
                <li>• Ofereça alimentos que estimulem mastigação</li>
                <li>• Faça refeições em família</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sinais de Alerta */}
      <Card className="border-red-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-red-600" />
            <CardTitle className="text-red-900">Quando Procurar Ajuda Imediatamente</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Alimentação</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Recusa total de alimentos</li>
                <li>• Engasgos frequentes</li>
                <li>• Vômitos em jato</li>
                <li>• Perda de peso</li>
                <li>• Menos de 6 fraldas molhadas/dia</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Respiração</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Dificuldade para respirar</li>
                <li>• Coloração azulada (cianose)</li>
                <li>• Pausas respiratórias longas</li>
                <li>• Respiração muito rápida</li>
                <li>• Chiado persistente</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Desenvolvimento</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Não responde a sons altos</li>
                <li>• Não vocaliza aos 6 meses</li>
                <li>• Perda de habilidades adquiridas</li>
                <li>• Muito mole ou muito rígido</li>
                <li>• Sem contato visual</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Comportamento</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Choro inconsolável</li>
                <li>• Muito sonolento ou irritado</li>
                <li>• Febre persistente</li>
                <li>• Convulsões</li>
                <li>• Mudança súbita de comportamento</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dicas para Pais */}
      <Card className="border-green-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-green-600" />
            <CardTitle className="text-green-900">Dicas Importantes para os Pais</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Seja Paciente</h4>
              <p className="text-sm text-gray-700">
                Cada bebê tem seu próprio ritmo de desenvolvimento. Prematuros podem levar mais tempo 
                para alcançar marcos, mas isso é normal. Use sempre a idade corrigida para avaliar.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Confie no Seu Instinto</h4>
              <p className="text-sm text-gray-700">
                Você conhece seu bebê melhor que ninguém. Se algo não parece certo, procure orientação 
                profissional. É melhor tirar uma dúvida do que deixar passar algo importante.
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Cuide de Você Também</h4>
              <p className="text-sm text-gray-700">
                Pais descansados e saudáveis cuidam melhor dos bebês. Aceite ajuda, descanse quando 
                possível e não hesite em pedir apoio quando precisar.
              </p>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-2">Celebre Pequenas Conquistas</h4>
              <p className="text-sm text-gray-700">
                Cada sorriso, cada som novo, cada mamada bem-sucedida é uma vitória. Reconheça e 
                comemore o progresso do seu bebê, por menor que pareça.
              </p>
            </div>

            <div className="p-4 bg-pink-50 rounded-lg">
              <h4 className="font-semibold text-pink-900 mb-2">Mantenha o Acompanhamento</h4>
              <p className="text-sm text-gray-700">
                Consultas regulares são essenciais, mesmo quando tudo parece bem. A prevenção e 
                detecção precoce fazem toda a diferença no desenvolvimento do bebê.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recursos Úteis */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Baby className="w-5 h-5 text-indigo-600" />
            <CardTitle>Recursos e Apoio</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>Grupos de Apoio:</strong> Procure grupos de pais de prematuros em sua região. 
              Compartilhar experiências com quem passa pela mesma situação pode ser muito reconfortante.
            </p>
            <p>
              <strong>Profissionais Especializados:</strong> Além do fonoaudiólogo, seu bebê pode 
              se beneficiar de acompanhamento com pediatra, fisioterapeuta, terapeuta ocupacional e outros.
            </p>
            <p>
              <strong>Estimulação Precoce:</strong> Programas de estimulação precoce são fundamentais 
              para bebês de risco. Informe-se sobre serviços disponíveis em sua cidade.
            </p>
            <p>
              <strong>Direitos:</strong> Bebês prematuros e com necessidades especiais têm direitos 
              garantidos por lei. Informe-se sobre benefícios e apoios disponíveis.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
