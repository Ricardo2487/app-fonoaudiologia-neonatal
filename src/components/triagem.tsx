"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, AlertTriangle, Stethoscope, Baby } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface TriagemProps {
  anamneseData: any
}

export default function Triagem({ anamneseData }: TriagemProps) {
  const [avaliacaoCompleta, setAvaliacaoCompleta] = useState(false)

  // Análise automática baseada na anamnese
  const analisarRiscos = () => {
    const riscos = []
    const alertas = []
    const recomendacoes = []

    // Prematuridade
    if (parseInt(anamneseData.idadeGestacional) < 37) {
      riscos.push({
        tipo: "alto",
        titulo: "Prematuridade",
        descricao: `Bebê nasceu com ${anamneseData.idadeGestacional} semanas (prematuro)`,
        impacto: "Maior risco de dificuldades na sucção, deglutição e coordenação respiratória"
      })
      recomendacoes.push("Acompanhamento fonoaudiológico intensivo para desenvolvimento das funções orais")
    }

    // Baixo peso
    if (parseInt(anamneseData.pesoNascimento) < 2500) {
      riscos.push({
        tipo: "alto",
        titulo: "Baixo Peso ao Nascer",
        descricao: `Peso: ${anamneseData.pesoNascimento}g (abaixo de 2500g)`,
        impacto: "Pode apresentar dificuldades na amamentação e sucção fraca"
      })
      recomendacoes.push("Monitoramento do ganho de peso e efetividade da mamada")
    }

    // APGAR baixo
    if (parseInt(anamneseData.apgar1) < 7 || parseInt(anamneseData.apgar5) < 7) {
      alertas.push({
        tipo: "medio",
        titulo: "APGAR Baixo",
        descricao: `APGAR 1': ${anamneseData.apgar1}, 5': ${anamneseData.apgar5}`,
        impacto: "Possível comprometimento neurológico que pode afetar funções orais"
      })
    }

    // UTI Neonatal
    if (anamneseData.internadoUTI === "sim") {
      riscos.push({
        tipo: "alto",
        titulo: "Internação em UTI Neonatal",
        descricao: `Tempo de internação: ${anamneseData.tempoUTI || "não informado"} dias`,
        impacto: "Risco de aversão oral, dificuldades alimentares e atraso no desenvolvimento"
      })
      recomendacoes.push("Estimulação oral precoce e acompanhamento do desenvolvimento neuropsicomotor")
    }

    // Ventilação Mecânica
    if (anamneseData.usouVentilacaoMecanica === "sim") {
      riscos.push({
        tipo: "alto",
        titulo: "Uso de Ventilação Mecânica",
        descricao: `Tempo: ${anamneseData.tempoVentilacao || "não informado"} dias`,
        impacto: "Alto risco de disfagia, aversão oral e dificuldades respiratórias"
      })
      recomendacoes.push("Avaliação detalhada da deglutição e coordenação sucção-deglutição-respiração")
    }

    // Uso de Sonda
    if (anamneseData.usouSonda === "sim") {
      riscos.push({
        tipo: "alto",
        titulo: "Alimentação por Sonda",
        descricao: `Tipo: ${anamneseData.tipoSonda || "não informado"}`,
        impacto: "Risco de aversão oral e dificuldade na transição para via oral"
      })
      recomendacoes.push("Protocolo de transição gradual da sonda para via oral com estimulação sensorial")
    }

    // Teste da Orelhinha
    if (anamneseData.testeOrelhinha === "nao" || anamneseData.resultadoOrelhinha === "falhou") {
      riscos.push({
        tipo: "alto",
        titulo: "Triagem Auditiva Alterada",
        descricao: anamneseData.testeOrelhinha === "nao" ? "Teste não realizado" : "Resultado: Falhou",
        impacto: "Possível comprometimento auditivo que afeta desenvolvimento da linguagem"
      })
      recomendacoes.push("Encaminhamento urgente para avaliação audiológica completa")
    }

    // Teste da Linguinha
    if (anamneseData.testeLinguinha === "nao" || anamneseData.resultadoLinguinha === "alterado") {
      alertas.push({
        tipo: "medio",
        titulo: "Avaliação do Frênulo Lingual",
        descricao: anamneseData.testeLinguinha === "nao" ? "Teste não realizado" : "Resultado: Alterado",
        impacto: "Pode comprometer a amamentação e desenvolvimento da fala"
      })
      recomendacoes.push("Avaliação fonoaudiológica do frênulo e possível indicação de frenotomia")
    }

    // Dificuldades na Amamentação
    if (anamneseData.dificuldadesAmamentacao && anamneseData.dificuldadesAmamentacao.length > 0) {
      alertas.push({
        tipo: "medio",
        titulo: "Dificuldades na Amamentação",
        descricao: anamneseData.dificuldadesAmamentacao.join(", "),
        impacto: "Comprometimento do aleitamento materno e nutrição adequada"
      })
      recomendacoes.push("Intervenção fonoaudiológica para manejo das dificuldades de amamentação")
    }

    return { riscos, alertas, recomendacoes }
  }

  const { riscos, alertas, recomendacoes } = analisarRiscos()

  const gerarPlanoAcao = () => {
    setAvaliacaoCompleta(true)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Resumo do Paciente */}
      <Card className="bg-gradient-to-br from-blue-50 to-green-50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Baby className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle>{anamneseData.nomeBebe}</CardTitle>
              <CardDescription>
                {anamneseData.idadeGestacional} semanas • {anamneseData.pesoNascimento}g • {anamneseData.sexo}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-600">Data Nascimento</p>
              <p className="font-semibold">{new Date(anamneseData.dataNascimento).toLocaleDateString('pt-BR')}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Tipo Parto</p>
              <p className="font-semibold capitalize">{anamneseData.tipoNascimento}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">APGAR</p>
              <p className="font-semibold">{anamneseData.apgar1}' / {anamneseData.apgar5}'</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Alimentação</p>
              <p className="font-semibold text-xs">{anamneseData.tipoAlimentacao?.replace("-", " ")}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Análise de Riscos - Alto Risco */}
      {riscos.length > 0 && (
        <Card className="border-red-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <CardTitle className="text-red-900">Fatores de Alto Risco Identificados</CardTitle>
            </div>
            <CardDescription>Situações que requerem atenção imediata e acompanhamento intensivo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {riscos.map((risco, index) => (
              <Alert key={index} className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-900">{risco.titulo}</AlertTitle>
                <AlertDescription className="text-red-800">
                  <p className="font-medium">{risco.descricao}</p>
                  <p className="mt-1 text-sm">{risco.impacto}</p>
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Análise de Riscos - Risco Médio */}
      {alertas.length > 0 && (
        <Card className="border-orange-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <CardTitle className="text-orange-900">Pontos de Atenção</CardTitle>
            </div>
            <CardDescription>Situações que necessitam monitoramento e intervenção</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alertas.map((alerta, index) => (
              <Alert key={index} className="border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertTitle className="text-orange-900">{alerta.titulo}</AlertTitle>
                <AlertDescription className="text-orange-800">
                  <p className="font-medium">{alerta.descricao}</p>
                  <p className="mt-1 text-sm">{alerta.impacto}</p>
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recomendações */}
      <Card className="border-green-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <CardTitle className="text-green-900">Plano de Ação Recomendado</CardTitle>
          </CardHeader>
          <CardDescription>Intervenções fonoaudiológicas necessárias</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recomendacoes.map((rec, index) => (
              <li key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-green-900">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Áreas de Avaliação */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-blue-600" />
            <CardTitle>Áreas que Necessitam Avaliação Detalhada</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Funções Orais</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Sucção (força e coordenação)</li>
                <li>• Deglutição (segurança e eficiência)</li>
                <li>• Respiração (padrão e coordenação)</li>
                <li>• Reflexos orais</li>
              </ul>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Amamentação</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Pega e posicionamento</li>
                <li>• Efetividade da mamada</li>
                <li>• Sinais de estresse</li>
                <li>• Ganho de peso</li>
              </ul>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Desenvolvimento</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Tônus muscular orofacial</li>
                <li>• Mobilidade de estruturas</li>
                <li>• Sensibilidade oral</li>
                <li>• Marcos do desenvolvimento</li>
              </ul>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Audição e Comunicação</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Resposta a sons</li>
                <li>• Vocalização</li>
                <li>• Contato visual</li>
                <li>• Interação social</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Próximos Passos */}
      <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-4">Próximos Passos</h3>
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">1</div>
              <p>Realizar avaliação fonoaudiológica completa das funções orais</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">2</div>
              <p>Iniciar protocolo de intervenção baseado nos riscos identificados</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">3</div>
              <p>Orientar família sobre estimulação e cuidados em casa</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">4</div>
              <p>Agendar reavaliações periódicas para monitoramento</p>
            </div>
          </div>
          <Button 
            onClick={gerarPlanoAcao}
            className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold"
          >
            Gerar Plano de Intervenção Completo
          </Button>
        </CardContent>
      </Card>

      {avaliacaoCompleta && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-900">Avaliação Concluída</AlertTitle>
          <AlertDescription className="text-green-800">
            Plano de intervenção gerado com sucesso. Continue para os módulos específicos de tratamento.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
