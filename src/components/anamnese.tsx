"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle2, Baby, Calendar, Stethoscope } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AnamneseProps {
  onComplete: (data: any) => void
}

export default function Anamnese({ onComplete }: AnamneseProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Dados do Bebê
    nomeBebe: "",
    dataNascimento: "",
    sexo: "",
    pesoNascimento: "",
    comprimentoNascimento: "",
    perimetroCefalico: "",
    idadeGestacional: "",
    tipoNascimento: "",
    apgar1: "",
    apgar5: "",
    
    // Histórico Gestacional
    idadeMae: "",
    numeroGestacoes: "",
    numeroPartos: "",
    numeroAbortos: "",
    prenatalRealizado: "",
    numeroConsultas: "",
    complicacoesGestacao: [] as string[],
    outrasComplicacoes: "",
    usoMedicamentos: "",
    quaisMedicamentos: "",
    
    // Histórico Neonatal
    internadoUTI: "",
    tempoUTI: "",
    usouVentilacaoMecanica: "",
    tempoVentilacao: "",
    usouSonda: "",
    tipoSonda: "",
    tempoSonda: "",
    diagnosticosNeonatais: [] as string[],
    outrosDiagnosticos: "",
    
    // Testes Obrigatórios
    testeOrelhinha: "",
    dataTesteOrelhinha: "",
    resultadoOrelhinha: "",
    observacoesOrelhinha: "",
    testeLinguinha: "",
    dataTesteLinguinha: "",
    resultadoLinguinha: "",
    observacoesLinguinha: "",
    testeOlhinho: "",
    testeCoracaozinho: "",
    testePezinho: "",
    
    // Alimentação Atual
    tipoAlimentacao: "",
    dificuldadesAmamentacao: [] as string[],
    outrasDificuldades: "",
    tempoMamada: "",
    frequenciaMamadas: "",
    
    // Observações Gerais
    observacoesGerais: "",
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }))
  }

  const handleSubmit = () => {
    onComplete(formData)
  }

  const nextStep = () => {
    if (step < 5) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Etapa {step} de 5</span>
            <span className="text-sm text-gray-600">{Math.round((step / 5) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Dados do Bebê */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Baby className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>Dados do Bebê</CardTitle>
                <CardDescription>Informações básicas sobre o recém-nascido</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nomeBebe">Nome do Bebê *</Label>
                <Input
                  id="nomeBebe"
                  value={formData.nomeBebe}
                  onChange={(e) => handleInputChange("nomeBebe", e.target.value)}
                  placeholder="Nome completo"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
                <Input
                  id="dataNascimento"
                  type="date"
                  value={formData.dataNascimento}
                  onChange={(e) => handleInputChange("dataNascimento", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Sexo *</Label>
              <RadioGroup value={formData.sexo} onValueChange={(value) => handleInputChange("sexo", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="masculino" id="masculino" />
                  <Label htmlFor="masculino" className="font-normal">Masculino</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="feminino" id="feminino" />
                  <Label htmlFor="feminino" className="font-normal">Feminino</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pesoNascimento">Peso ao Nascer (g) *</Label>
                <Input
                  id="pesoNascimento"
                  type="number"
                  value={formData.pesoNascimento}
                  onChange={(e) => handleInputChange("pesoNascimento", e.target.value)}
                  placeholder="Ex: 2500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="comprimentoNascimento">Comprimento (cm) *</Label>
                <Input
                  id="comprimentoNascimento"
                  type="number"
                  value={formData.comprimentoNascimento}
                  onChange={(e) => handleInputChange("comprimentoNascimento", e.target.value)}
                  placeholder="Ex: 48"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="perimetroCefalico">Perímetro Cefálico (cm)</Label>
                <Input
                  id="perimetroCefalico"
                  type="number"
                  value={formData.perimetroCefalico}
                  onChange={(e) => handleInputChange("perimetroCefalico", e.target.value)}
                  placeholder="Ex: 33"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="idadeGestacional">Idade Gestacional (semanas) *</Label>
                <Input
                  id="idadeGestacional"
                  type="number"
                  value={formData.idadeGestacional}
                  onChange={(e) => handleInputChange("idadeGestacional", e.target.value)}
                  placeholder="Ex: 37"
                />
                {formData.idadeGestacional && parseInt(formData.idadeGestacional) < 37 && (
                  <Alert className="mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Bebê prematuro (menos de 37 semanas)
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tipoNascimento">Tipo de Nascimento *</Label>
                <Select value={formData.tipoNascimento} onValueChange={(value) => handleInputChange("tipoNascimento", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Parto Normal</SelectItem>
                    <SelectItem value="cesarea">Cesárea</SelectItem>
                    <SelectItem value="forceps">Fórceps</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="apgar1">APGAR 1º minuto *</Label>
                <Input
                  id="apgar1"
                  type="number"
                  min="0"
                  max="10"
                  value={formData.apgar1}
                  onChange={(e) => handleInputChange("apgar1", e.target.value)}
                  placeholder="0-10"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="apgar5">APGAR 5º minuto *</Label>
                <Input
                  id="apgar5"
                  type="number"
                  min="0"
                  max="10"
                  value={formData.apgar5}
                  onChange={(e) => handleInputChange("apgar5", e.target.value)}
                  placeholder="0-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Histórico Gestacional */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <CardTitle>Histórico Gestacional</CardTitle>
                <CardDescription>Informações sobre a gestação e pré-natal</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="idadeMae">Idade da Mãe *</Label>
                <Input
                  id="idadeMae"
                  type="number"
                  value={formData.idadeMae}
                  onChange={(e) => handleInputChange("idadeMae", e.target.value)}
                  placeholder="Anos"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="numeroGestacoes">Número de Gestações *</Label>
                <Input
                  id="numeroGestacoes"
                  type="number"
                  value={formData.numeroGestacoes}
                  onChange={(e) => handleInputChange("numeroGestacoes", e.target.value)}
                  placeholder="Incluindo a atual"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numeroPartos">Número de Partos</Label>
                <Input
                  id="numeroPartos"
                  type="number"
                  value={formData.numeroPartos}
                  onChange={(e) => handleInputChange("numeroPartos", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="numeroAbortos">Número de Abortos</Label>
                <Input
                  id="numeroAbortos"
                  type="number"
                  value={formData.numeroAbortos}
                  onChange={(e) => handleInputChange("numeroAbortos", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Pré-natal Realizado? *</Label>
              <RadioGroup value={formData.prenatalRealizado} onValueChange={(value) => handleInputChange("prenatalRealizado", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="prenatal-sim" />
                  <Label htmlFor="prenatal-sim" className="font-normal">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="prenatal-nao" />
                  <Label htmlFor="prenatal-nao" className="font-normal">Não</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.prenatalRealizado === "sim" && (
              <div className="space-y-2">
                <Label htmlFor="numeroConsultas">Número de Consultas Pré-natal</Label>
                <Input
                  id="numeroConsultas"
                  type="number"
                  value={formData.numeroConsultas}
                  onChange={(e) => handleInputChange("numeroConsultas", e.target.value)}
                  placeholder="Quantidade"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Complicações na Gestação</Label>
              <div className="space-y-2">
                {[
                  "Diabetes Gestacional",
                  "Hipertensão/Pré-eclâmpsia",
                  "Infecções (TORCH, ITU, etc)",
                  "Sangramento",
                  "Trabalho de Parto Prematuro",
                  "Ruptura Prematura de Membranas",
                  "Oligodrâmnio/Polidrâmnio",
                  "Restrição de Crescimento Intrauterino"
                ].map((complicacao) => (
                  <div key={complicacao} className="flex items-center space-x-2">
                    <Checkbox
                      id={complicacao}
                      checked={formData.complicacoesGestacao.includes(complicacao)}
                      onCheckedChange={(checked) => handleCheckboxChange("complicacoesGestacao", complicacao, checked as boolean)}
                    />
                    <Label htmlFor={complicacao} className="font-normal">{complicacao}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="outrasComplicacoes">Outras Complicações</Label>
              <Textarea
                id="outrasComplicacoes"
                value={formData.outrasComplicacoes}
                onChange={(e) => handleInputChange("outrasComplicacoes", e.target.value)}
                placeholder="Descreva outras complicações..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Uso de Medicamentos na Gestação?</Label>
              <RadioGroup value={formData.usoMedicamentos} onValueChange={(value) => handleInputChange("usoMedicamentos", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="med-sim" />
                  <Label htmlFor="med-sim" className="font-normal">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="med-nao" />
                  <Label htmlFor="med-nao" className="font-normal">Não</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.usoMedicamentos === "sim" && (
              <div className="space-y-2">
                <Label htmlFor="quaisMedicamentos">Quais Medicamentos?</Label>
                <Textarea
                  id="quaisMedicamentos"
                  value={formData.quaisMedicamentos}
                  onChange={(e) => handleInputChange("quaisMedicamentos", e.target.value)}
                  placeholder="Liste os medicamentos utilizados..."
                  rows={3}
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 3: Histórico Neonatal */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <CardTitle>Histórico Neonatal</CardTitle>
                <CardDescription>Informações sobre internação e cuidados neonatais</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Bebê foi internado em UTI Neonatal? *</Label>
              <RadioGroup value={formData.internadoUTI} onValueChange={(value) => handleInputChange("internadoUTI", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="uti-sim" />
                  <Label htmlFor="uti-sim" className="font-normal">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="uti-nao" />
                  <Label htmlFor="uti-nao" className="font-normal">Não</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.internadoUTI === "sim" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="tempoUTI">Tempo de Internação na UTI (dias)</Label>
                  <Input
                    id="tempoUTI"
                    type="number"
                    value={formData.tempoUTI}
                    onChange={(e) => handleInputChange("tempoUTI", e.target.value)}
                    placeholder="Dias"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Usou Ventilação Mecânica?</Label>
                  <RadioGroup value={formData.usouVentilacaoMecanica} onValueChange={(value) => handleInputChange("usouVentilacaoMecanica", value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sim" id="vm-sim" />
                      <Label htmlFor="vm-sim" className="font-normal">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nao" id="vm-nao" />
                      <Label htmlFor="vm-nao" className="font-normal">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.usouVentilacaoMecanica === "sim" && (
                  <div className="space-y-2">
                    <Label htmlFor="tempoVentilacao">Tempo de Ventilação (dias)</Label>
                    <Input
                      id="tempoVentilacao"
                      type="number"
                      value={formData.tempoVentilacao}
                      onChange={(e) => handleInputChange("tempoVentilacao", e.target.value)}
                      placeholder="Dias"
                    />
                  </div>
                )}
              </>
            )}

            <div className="space-y-2">
              <Label>Usou ou Usa Sonda para Alimentação?</Label>
              <RadioGroup value={formData.usouSonda} onValueChange={(value) => handleInputChange("usouSonda", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="sonda-sim" />
                  <Label htmlFor="sonda-sim" className="font-normal">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="sonda-nao" />
                  <Label htmlFor="sonda-nao" className="font-normal">Não</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.usouSonda === "sim" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="tipoSonda">Tipo de Sonda</Label>
                  <Select value={formData.tipoSonda} onValueChange={(value) => handleInputChange("tipoSonda", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="orogastrica">Orogástrica</SelectItem>
                      <SelectItem value="nasogastrica">Nasogástrica</SelectItem>
                      <SelectItem value="gastrostomia">Gastrostomia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tempoSonda">Tempo de Uso da Sonda (dias)</Label>
                  <Input
                    id="tempoSonda"
                    type="number"
                    value={formData.tempoSonda}
                    onChange={(e) => handleInputChange("tempoSonda", e.target.value)}
                    placeholder="Dias"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label>Diagnósticos Neonatais</Label>
              <div className="space-y-2">
                {[
                  "Síndrome do Desconforto Respiratório",
                  "Displasia Broncopulmonar",
                  "Hemorragia Intracraniana",
                  "Leucomalácia Periventricular",
                  "Sepse Neonatal",
                  "Icterícia/Hiperbilirrubinemia",
                  "Hipoglicemia",
                  "Cardiopatia Congênita",
                  "Síndromes Genéticas"
                ].map((diagnostico) => (
                  <div key={diagnostico} className="flex items-center space-x-2">
                    <Checkbox
                      id={diagnostico}
                      checked={formData.diagnosticosNeonatais.includes(diagnostico)}
                      onCheckedChange={(checked) => handleCheckboxChange("diagnosticosNeonatais", diagnostico, checked as boolean)}
                    />
                    <Label htmlFor={diagnostico} className="font-normal">{diagnostico}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="outrosDiagnosticos">Outros Diagnósticos</Label>
              <Textarea
                id="outrosDiagnosticos"
                value={formData.outrosDiagnosticos}
                onChange={(e) => handleInputChange("outrosDiagnosticos", e.target.value)}
                placeholder="Descreva outros diagnósticos..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Testes Obrigatórios */}
      {step === 4 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <CardTitle>Testes Obrigatórios</CardTitle>
                <CardDescription>Triagens neonatais essenciais</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Teste da Orelhinha */}
            <div className="p-4 bg-blue-50 rounded-lg space-y-4">
              <h3 className="font-semibold text-blue-900">Teste da Orelhinha (Triagem Auditiva Neonatal)</h3>
              
              <div className="space-y-2">
                <Label>Foi realizado? *</Label>
                <RadioGroup value={formData.testeOrelhinha} onValueChange={(value) => handleInputChange("testeOrelhinha", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="orelhinha-sim" />
                    <Label htmlFor="orelhinha-sim" className="font-normal">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="orelhinha-nao" />
                    <Label htmlFor="orelhinha-nao" className="font-normal">Não</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="aguardando" id="orelhinha-aguardando" />
                    <Label htmlFor="orelhinha-aguardando" className="font-normal">Aguardando Realização</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.testeOrelhinha === "sim" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="dataTesteOrelhinha">Data do Teste</Label>
                    <Input
                      id="dataTesteOrelhinha"
                      type="date"
                      value={formData.dataTesteOrelhinha}
                      onChange={(e) => handleInputChange("dataTesteOrelhinha", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resultadoOrelhinha">Resultado</Label>
                    <Select value={formData.resultadoOrelhinha} onValueChange={(value) => handleInputChange("resultadoOrelhinha", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="passou">Passou</SelectItem>
                        <SelectItem value="falhou">Falhou</SelectItem>
                        <SelectItem value="reteste">Necessita Reteste</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="observacoesOrelhinha">Observações</Label>
                    <Textarea
                      id="observacoesOrelhinha"
                      value={formData.observacoesOrelhinha}
                      onChange={(e) => handleInputChange("observacoesOrelhinha", e.target.value)}
                      placeholder="Detalhes adicionais..."
                      rows={2}
                    />
                  </div>
                </>
              )}

              {formData.testeOrelhinha === "nao" && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    O Teste da Orelhinha é obrigatório e deve ser realizado até o primeiro mês de vida.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Teste da Linguinha */}
            <div className="p-4 bg-pink-50 rounded-lg space-y-4">
              <h3 className="font-semibold text-pink-900">Teste da Linguinha (Protocolo de Avaliação do Frênulo Lingual)</h3>
              
              <div className="space-y-2">
                <Label>Foi realizado? *</Label>
                <RadioGroup value={formData.testeLinguinha} onValueChange={(value) => handleInputChange("testeLinguinha", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="linguinha-sim" />
                    <Label htmlFor="linguinha-sim" className="font-normal">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="linguinha-nao" />
                    <Label htmlFor="linguinha-nao" className="font-normal">Não</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="aguardando" id="linguinha-aguardando" />
                    <Label htmlFor="linguinha-aguardando" className="font-normal">Aguardando Realização</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.testeLinguinha === "sim" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="dataTesteLinguinha">Data do Teste</Label>
                    <Input
                      id="dataTesteLinguinha"
                      type="date"
                      value={formData.dataTesteLinguinha}
                      onChange={(e) => handleInputChange("dataTesteLinguinha", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resultadoLinguinha">Resultado</Label>
                    <Select value={formData.resultadoLinguinha} onValueChange={(value) => handleInputChange("resultadoLinguinha", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="alterado">Alterado (Frênulo Curto)</SelectItem>
                        <SelectItem value="cirurgia">Indicação de Frenotomia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="observacoesLinguinha">Observações</Label>
                    <Textarea
                      id="observacoesLinguinha"
                      value={formData.observacoesLinguinha}
                      onChange={(e) => handleInputChange("observacoesLinguinha", e.target.value)}
                      placeholder="Detalhes adicionais..."
                      rows={2}
                    />
                  </div>
                </>
              )}

              {formData.testeLinguinha === "nao" && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    O Teste da Linguinha é obrigatório e auxilia na identificação precoce de problemas na amamentação.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Outros Testes */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Outros Testes de Triagem Neonatal</h3>
              
              <div className="space-y-2">
                <Label>Teste do Olhinho (Reflexo Vermelho)</Label>
                <RadioGroup value={formData.testeOlhinho} onValueChange={(value) => handleInputChange("testeOlhinho", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="olhinho-sim" />
                    <Label htmlFor="olhinho-sim" className="font-normal">Realizado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="olhinho-nao" />
                    <Label htmlFor="olhinho-nao" className="font-normal">Não Realizado</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Teste do Coraçãozinho (Oximetria de Pulso)</Label>
                <RadioGroup value={formData.testeCoracaozinho} onValueChange={(value) => handleInputChange("testeCoracaozinho", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="coracaozinho-sim" />
                    <Label htmlFor="coracaozinho-sim" className="font-normal">Realizado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="coracaozinho-nao" />
                    <Label htmlFor="coracaozinho-nao" className="font-normal">Não Realizado</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Teste do Pezinho (Triagem Neonatal)</Label>
                <RadioGroup value={formData.testePezinho} onValueChange={(value) => handleInputChange("testePezinho", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="pezinho-sim" />
                    <Label htmlFor="pezinho-sim" className="font-normal">Realizado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="pezinho-nao" />
                    <Label htmlFor="pezinho-nao" className="font-normal">Não Realizado</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Alimentação e Observações */}
      {step === 5 && (
        <Card>
          <CardHeader>
            <CardTitle>Alimentação Atual e Observações</CardTitle>
            <CardDescription>Informações sobre a alimentação do bebê</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de Alimentação Atual *</Label>
              <RadioGroup value={formData.tipoAlimentacao} onValueChange={(value) => handleInputChange("tipoAlimentacao", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="aleitamento-exclusivo" id="aleitamento-exclusivo" />
                  <Label htmlFor="aleitamento-exclusivo" className="font-normal">Aleitamento Materno Exclusivo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="aleitamento-misto" id="aleitamento-misto" />
                  <Label htmlFor="aleitamento-misto" className="font-normal">Aleitamento Misto (Leite Materno + Fórmula)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="formula" id="formula" />
                  <Label htmlFor="formula" className="font-normal">Fórmula Infantil</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sonda" id="sonda" />
                  <Label htmlFor="sonda" className="font-normal">Alimentação por Sonda</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Dificuldades na Amamentação</Label>
              <div className="space-y-2">
                {[
                  "Dificuldade de Pega",
                  "Sucção Fraca",
                  "Cansaço ao Mamar",
                  "Engasgos Frequentes",
                  "Refluxo",
                  "Baixo Ganho de Peso",
                  "Dor/Fissuras nos Mamilos",
                  "Baixa Produção de Leite"
                ].map((dificuldade) => (
                  <div key={dificuldade} className="flex items-center space-x-2">
                    <Checkbox
                      id={dificuldade}
                      checked={formData.dificuldadesAmamentacao.includes(dificuldade)}
                      onCheckedChange={(checked) => handleCheckboxChange("dificuldadesAmamentacao", dificuldade, checked as boolean)}
                    />
                    <Label htmlFor={dificuldade} className="font-normal">{dificuldade}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="outrasDificuldades">Outras Dificuldades</Label>
              <Textarea
                id="outrasDificuldades"
                value={formData.outrasDificuldades}
                onChange={(e) => handleInputChange("outrasDificuldades", e.target.value)}
                placeholder="Descreva outras dificuldades..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tempoMamada">Tempo Médio de Mamada (minutos)</Label>
                <Input
                  id="tempoMamada"
                  type="number"
                  value={formData.tempoMamada}
                  onChange={(e) => handleInputChange("tempoMamada", e.target.value)}
                  placeholder="Ex: 20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="frequenciaMamadas">Frequência de Mamadas (por dia)</Label>
                <Input
                  id="frequenciaMamadas"
                  type="number"
                  value={formData.frequenciaMamadas}
                  onChange={(e) => handleInputChange("frequenciaMamadas", e.target.value)}
                  placeholder="Ex: 8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoesGerais">Observações Gerais</Label>
              <Textarea
                id="observacoesGerais"
                value={formData.observacoesGerais}
                onChange={(e) => handleInputChange("observacoesGerais", e.target.value)}
                placeholder="Informações adicionais relevantes sobre o bebê..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
            >
              Voltar
            </Button>
            
            {step < 5 ? (
              <Button onClick={nextStep}>
                Próxima Etapa
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-gradient-to-r from-green-600 to-green-700">
                Concluir Anamnese
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
