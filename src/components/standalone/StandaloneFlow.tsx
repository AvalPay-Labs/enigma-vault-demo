import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CheckCircle, Circle, Loader2, AlertCircle, Copy, ExternalLink } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useTranslation } from '@/i18n/LanguageContext'
import {
  deployStandaloneBasics,
  deployStandaloneSystem,
  registerStandaloneAuditor,
  setStandaloneAuditor,
} from '@/services/standalone'
import {
  StandaloneDeployBasicsResponse,
  StandaloneDeploySystemResponse,
  StandaloneRegisterUserResponse,
  StandaloneSetAuditorResponse,
} from '@/types/standalone'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDeploymentComplete?: (systemData: StandaloneDeploySystemResponse) => void
}

type Step = {
  id: number
  title: string
  description: string
  endpoint: string
}

const steps = (t: (k: string) => string): Step[] => [
  {
    id: 1,
    title: t('standalone.steps.deployBasics.title'),
    description: t('standalone.steps.deployBasics.description'),
    endpoint: '/api/standalone/deploy-basics',
  },
  {
    id: 2,
    title: t('standalone.steps.deploySystem.title'),
    description: t('standalone.steps.deploySystem.description'),
    endpoint: '/api/standalone/deploy-system',
  },
  {
    id: 3,
    title: t('standalone.steps.registerAuditor.title'),
    description: t('standalone.steps.registerAuditor.description'),
    endpoint: '/api/standalone/register-auditor',
  },
  {
    id: 4,
    title: t('standalone.steps.setAuditor.title'),
    description: t('standalone.steps.setAuditor.description'),
    endpoint: '/api/standalone/set-auditor',
  },
]

type StepStatus = 'pending' | 'loading' | 'completed' | 'error'

export const StandaloneFlow = ({ open, onOpenChange, onDeploymentComplete }: Props) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [stepStatuses, setStepStatuses] = useState<Record<number, StepStatus>>({
    1: 'pending',
    2: 'pending',
    3: 'pending',
    4: 'pending',
  })
  const [deploymentData, setDeploymentData] = useState<{
    basics?: StandaloneDeployBasicsResponse
    system?: StandaloneDeploySystemResponse
    auditor?: StandaloneRegisterUserResponse
    setAuditor?: StandaloneSetAuditorResponse
  }>({})
  const [error, setError] = useState<string | null>(null)
  const [isDeploying, setIsDeploying] = useState(false)
  const [hasNotifiedComplete, setHasNotifiedComplete] = useState(false)
  
  const { toast } = useToast()
  const { t } = useTranslation()

  const updateStepStatus = (step: number, status: StepStatus) => {
    setStepStatuses(prev => ({ ...prev, [step]: status }))
  }

  // Check if deployment is complete and call onDeploymentComplete
  useEffect(() => {
    const allStepsCompleted = stepStatuses[1] === 'completed' && 
                             stepStatuses[2] === 'completed' && 
                             stepStatuses[3] === 'completed' && 
                             stepStatuses[4] === 'completed'
    
    if (!hasNotifiedComplete && allStepsCompleted && deploymentData.system && onDeploymentComplete) {
      console.log('All steps completed, calling onDeploymentComplete with:', deploymentData.system);
      setHasNotifiedComplete(true)
      onDeploymentComplete(deploymentData.system)
    }
  }, [stepStatuses, deploymentData.system, onDeploymentComplete, hasNotifiedComplete])

  // Reset the internal wizard state each time the dialog is opened
  useEffect(() => {
    if (open) {
      setCurrentStep(1)
      setStepStatuses({ 1: 'pending', 2: 'pending', 3: 'pending', 4: 'pending' })
      setDeploymentData({})
      setError(null)
      setIsDeploying(false)
      setHasNotifiedComplete(false)
    }
  }, [open])

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: t('standalone.copied'),
      description: `${label} ${t('standalone.copiedToClipboard')}`,
    })
  }

  const executeStep = async (step: number) => {
    try {
      setError(null)
      updateStepStatus(step, 'loading')

      switch (step) {
        case 1: {
          const response = await deployStandaloneBasics()
          setDeploymentData(prev => ({ ...prev, basics: response }))
          break
        }
        case 2: {
          const response = await deployStandaloneSystem()
          setDeploymentData(prev => ({ ...prev, system: response }))
          break
        }
        case 3: {
          const response = await registerStandaloneAuditor({ walletNumber: 2 })
          setDeploymentData(prev => ({ ...prev, auditor: response }))
          break
        }
        case 4: {
          const response = await setStandaloneAuditor({ walletNumber: 1 })
          setDeploymentData(prev => ({ ...prev, setAuditor: response }))
          break
        }
      }

      updateStepStatus(step, 'completed')
      
      if (step < 4) {
        setCurrentStep(step + 1)
      } else {
        // Deployment completed
        toast({
          title: t('standalone.deploymentComplete'),
          description: t('standalone.deploymentCompleteDesc'),
        })
      }
    } catch (err) {
      updateStepStatus(step, 'error')
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      toast({
        title: t('standalone.error'),
        description: errorMessage,
        variant: 'destructive',
      })
    }
  }

  const executeAllSteps = async () => {
    setIsDeploying(true)
    setError(null)
    
    try {
      for (let step = 1; step <= 4; step++) {
        await executeStep(step)
        // Small delay between steps for better UX
        if (step < 4) {
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      }
    } finally {
      setIsDeploying(false)
    }
  }

  const resetFlow = () => {
    setCurrentStep(1)
    setStepStatuses({
      1: 'pending',
      2: 'pending',
      3: 'pending',
      4: 'pending',
    })
    setDeploymentData({})
    setError(null)
  }

  const getStepIcon = (step: number) => {
    const status = stepStatuses[step]
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'loading':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Circle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStepBadge = (step: number) => {
    const status = stepStatuses[step]
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-500">{t('standalone.completed')}</Badge>
      case 'loading':
        return <Badge variant="secondary">{t('standalone.loading')}</Badge>
      case 'error':
        return <Badge variant="destructive">{t('standalone.error')}</Badge>
      default:
        return <Badge variant="outline">{t('standalone.pending')}</Badge>
    }
  }

  const progress = (Object.values(stepStatuses).filter(status => status === 'completed').length / 4) * 100

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            {t('standalone.title')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{t('standalone.progress')}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Steps */}
          <div className="grid gap-4">
            {steps(t).map((step) => (
              <Card key={step.id} className={`transition-all duration-200 ${
                step.id === currentStep ? 'ring-2 ring-blue-500' : ''
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStepIcon(step.id)}
                      <div>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                        <p className="text-xs text-muted-foreground font-mono mt-1">
                          {step.endpoint}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStepBadge(step.id)}
                      {stepStatuses[step.id] === 'pending' && step.id === currentStep && (
                        <Button
                          size="sm"
                          onClick={() => executeStep(step.id)}
                          disabled={isDeploying}
                        >
                          {t('standalone.execute')}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Error Display */}
          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">{t('standalone.error')}</span>
                </div>
                <p className="text-red-600 mt-2">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Deployment Data Display */}
          {deploymentData.system && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  {t('standalone.deploymentSuccess')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-green-800 mb-2">{t('standalone.contracts')}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-green-700">Registrar:</span>
                        <div className="flex items-center gap-1">
                          <code className="text-xs bg-green-100 px-2 py-1 rounded">
                            {deploymentData.system.data.registrar.slice(0, 10)}...
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(deploymentData.system!.data.registrar, 'Registrar')}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-green-700">EncryptedERC:</span>
                        <div className="flex items-center gap-1">
                          <code className="text-xs bg-green-100 px-2 py-1 rounded">
                            {deploymentData.system.data.encryptedERC.slice(0, 10)}...
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(deploymentData.system!.data.encryptedERC, 'EncryptedERC')}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-800 mb-2">{t('standalone.verifiers')}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-green-700">Mint Verifier:</span>
                        <div className="flex items-center gap-1">
                          <code className="text-xs bg-green-100 px-2 py-1 rounded">
                            {deploymentData.system.data.mintVerifier.slice(0, 10)}...
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(deploymentData.system!.data.mintVerifier, 'Mint Verifier')}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-green-700">Transfer Verifier:</span>
                        <div className="flex items-center gap-1">
                          <code className="text-xs bg-green-100 px-2 py-1 rounded">
                            {deploymentData.system.data.transferVerifier.slice(0, 10)}...
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(deploymentData.system!.data.transferVerifier, 'Transfer Verifier')}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-green-200">
                  <div className="flex items-center justify-between text-sm text-green-700">
                    <span>{t('standalone.deploymentFile')}: {deploymentData.system.data.deploymentFile}</span>
                    <span>{t('standalone.executionTime')}: {deploymentData.system.executionTime}ms</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={resetFlow}
              disabled={isDeploying}
            >
              {t('standalone.reset')}
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isDeploying}
              >
                {t('standalone.close')}
              </Button>
              <Button
                onClick={executeAllSteps}
                disabled={isDeploying || progress === 100}
                className="glass-button cta-start-button"
              >
                {isDeploying ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('standalone.deploying')}
                  </>
                ) : (
                  t('standalone.deployAll')
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
