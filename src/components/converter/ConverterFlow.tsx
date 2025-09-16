import { useMemo, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, Loader2, AlertCircle, Circle } from 'lucide-react'
import { useDeployBasics } from '@/hooks/useDeployBasics'
import { getLastDeploymentData, getLastSystemData, getLastRegisteredUser, getLastDeposit, getLastWithdraw } from '@/store/deployments'
import type { DeploymentBasics } from '@/types/deploy'
import { useTranslation } from '@/i18n/LanguageContext'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useDeploySystem } from '@/hooks/useDeploySystem'
import type { DeploymentSystem } from '@/types/deploy'
import { useRegisterUser } from '@/hooks/useRegisterUser'
import { useDeposit } from '@/hooks/useDeposit'
import { useWithdraw } from '@/hooks/useWithdraw'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type Step = {
  id: number
  title: string
  description: string
  endpoint: string
}

const steps = (t: (k: string) => string): Step[] => ([
  { id: 1, title: t('converter.step1.title'), description: t('converter.step1.desc'), endpoint: '/api/converter/deploy-basics' },
  { id: 2, title: t('converter.step2.title'), description: t('converter.step2.desc'), endpoint: '/api/converter/deploy-system' },
  { id: 3, title: t('converter.step3.title'), description: t('converter.step3.desc'), endpoint: '/api/converter/register-user' },
  { id: 4, title: t('converter.step4.title'), description: t('converter.step4.desc'), endpoint: '/api/converter/deposit' },
  { id: 5, title: t('converter.step5.title'), description: t('converter.step5.desc'), endpoint: '/api/converter/withdraw' },
])

export const ConverterFlow = ({ open, onOpenChange }: Props) => {
  const [active, setActive] = useState<number>(1)
  const [isDeploying, setIsDeploying] = useState(false)
  const { mutate: runDeployBasics, mutateAsync: runDeployBasicsAsync, reset: resetBasics, isPending, isSuccess, data, error } = useDeployBasics()
  const { mutate: runDeploySystem, mutateAsync: runDeploySystemAsync, reset: resetSystem, isPending: isPendingSys, isSuccess: isSuccessSys, data: dataSys, error: errorSys } = useDeploySystem()
  const { mutate: runRegisterUser, mutateAsync: runRegisterUserAsync, reset: resetRegister, isPending: isPendingReg, isSuccess: isSuccessReg, data: dataReg, error: errorReg } = useRegisterUser()
  const { mutate: runDeposit, mutateAsync: runDepositAsync, reset: resetDeposit, isPending: isPendingDep, isSuccess: isSuccessDep, data: dataDep, error: errorDep } = useDeposit()
  const { mutate: runWithdraw, mutateAsync: runWithdrawAsync, reset: resetWithdraw, isPending: isPendingWit, isSuccess: isSuccessWit, data: dataWit, error: errorWit } = useWithdraw()
  const { t } = useTranslation()

  const [persisted, setPersisted] = useState<DeploymentBasics | null>(null)
  const [persistedSys, setPersistedSys] = useState<DeploymentSystem | null>(null)
  // Wallet config is now taken from env in the service; no inputs here
  useEffect(() => {
    setPersisted(getLastDeploymentData())
    setPersistedSys(getLastSystemData())
    // no-op; values loaded inside service from env
  }, [isSuccess, data, isSuccessSys, dataSys, open])

  const completed = useMemo(() => {
    const done = new Set<number>()
    if (isSuccess || persisted) done.add(1)
    if (isSuccessSys || persistedSys) done.add(2)
    if (isSuccessReg || getLastRegisteredUser()) done.add(3)
    if (isSuccessDep || getLastDeposit()) done.add(4)
    if (isSuccessWit || getLastWithdraw()) done.add(5)
    return done
  }, [isSuccess, persisted, isSuccessSys, persistedSys, isSuccessReg, isSuccessDep, isSuccessWit])

  const _steps = steps(t)
  const progress = Math.round((completed.size / _steps.length) * 100)

  type StepStatus = 'pending' | 'loading' | 'completed' | 'error'
  const getStepStatus = (id: number): StepStatus => {
    switch (id) {
      case 1:
        if (isPending) return 'loading'
        if (error) return 'error'
        return (isSuccess || !!persisted) ? 'completed' : 'pending'
      case 2:
        if (isPendingSys) return 'loading'
        if (errorSys) return 'error'
        return (isSuccessSys || !!persistedSys) ? 'completed' : 'pending'
      case 3:
        if (isPendingReg) return 'loading'
        if (errorReg) return 'error'
        return (isSuccessReg || !!getLastRegisteredUser()) ? 'completed' : 'pending'
      case 4:
        if (isPendingDep) return 'loading'
        if (errorDep) return 'error'
        return (isSuccessDep || !!getLastDeposit()) ? 'completed' : 'pending'
      case 5:
        if (isPendingWit) return 'loading'
        if (errorWit) return 'error'
        return (isSuccessWit || !!getLastWithdraw()) ? 'completed' : 'pending'
      default:
        return 'pending'
    }
  }

  const getStepIcon = (id: number) => {
    const status = getStepStatus(id)
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

  const getStepBadge = (id: number) => {
    const status = getStepStatus(id)
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

  // Reset minimal UI state when dialog opens
  useEffect(() => {
    if (open) setActive(1)
  }, [open])

  const resetFlow = () => {
    setActive(1)
    setPersisted(null)
    setPersistedSys(null)
    try {
      localStorage.removeItem('deployments:last')
      localStorage.removeItem('deployments:system:last')
      localStorage.removeItem('converter:register:last')
      localStorage.removeItem('converter:deposit:last')
      localStorage.removeItem('converter:withdraw:last')
    } catch {}
    // Reset mutation states
    resetBasics()
    resetSystem()
    resetRegister()
    resetDeposit()
    resetWithdraw()
  }

  const executeAllSteps = async () => {
    if (isDeploying) return
    setIsDeploying(true)
    try {
      await runDeployBasicsAsync()
      await new Promise(r => setTimeout(r, 500))
      await runDeploySystemAsync()
      await new Promise(r => setTimeout(r, 500))
      await runRegisterUserAsync()
      await new Promise(r => setTimeout(r, 500))
      await runDepositAsync()
      await new Promise(r => setTimeout(r, 500))
      await runWithdrawAsync()
    } finally {
      setIsDeploying(false)
    }
  }

  const executeStep = async (id: number) => {
    try {
      switch (id) {
        case 1:
          await runDeployBasicsAsync()
          break
        case 2:
          await runDeploySystemAsync()
          break
        case 3:
          await runRegisterUserAsync()
          break
        case 4:
          await runDepositAsync()
          break
        case 5:
          await runWithdrawAsync()
          break
      }
      if (id < 5) setActive(id + 1)
    } catch {
      // errors ya se muestran en la UI por step
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[var(--radius-lg)] bg-white border border-glass-border shadow-lg">
        <DialogHeader>
          <DialogTitle>{t('converter.title')}</DialogTitle>
          <DialogDescription>
            {t('converter.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Progress value={progress} className="h-2 w-full" />
            <Badge variant="outline">{progress}%</Badge>
          </div>

          <Separator />

          <div className="grid gap-4">
            {_steps.map((s) => (
              <Card key={s.id} className={`transition-all duration-200 ${s.id === active ? 'ring-2 ring-blue-500' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStepIcon(s.id)}
                      <div>
                        <CardTitle className="text-lg">{s.id}. {s.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{s.description}</p>
                        <p className="text-xs text-muted-foreground font-mono mt-1">{s.endpoint}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStepBadge(s.id)}
                      {getStepStatus(s.id) === 'pending' && s.id === active && (
                        <Button size="sm" onClick={() => executeStep(s.id)} disabled={isDeploying}>
                          {t('standalone.execute')}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>

                {s.id === 1 && active === 1 && (
                  <div className="mt-4 space-y-3">
                    <div className="flex flex-col gap-3">
                      <Alert>
                        <AlertTitle>{t('converter.step1.cta')}</AlertTitle>
                        <AlertDescription>
                          {t('converter.step1.longRunning')}
                        </AlertDescription>
                      </Alert>
                      {error && <span className="text-sm text-red-600">{error.message}</span>}
                    </div>
                    {(isSuccess || persisted) && (
                      <div className="text-xs grid grid-cols-1 md:grid-cols-2 gap-2 bg-white border border-glass-border rounded-md p-3">
                        {Object.entries((data?.data || persisted) as DeploymentBasics).map(([k, v]) => (
                          <div key={k} className="flex justify-between gap-2">
                            <span className="font-medium capitalize">{k}</span>
                            <span className="font-mono text-muted-foreground break-all">{String(v)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {s.id === 2 && active === 2 && (
                  <div className="mt-4 space-y-3">
                    {!(isSuccess || persisted) ? (
                      <div className="text-sm text-muted-foreground">{t('converter.needStep1')}</div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <Alert>
                          <AlertTitle>{t('converter.step2.cta')}</AlertTitle>
                          <AlertDescription>
                            {t('converter.step2.longRunning')}
                          </AlertDescription>
                        </Alert>
                        {errorSys && <span className="text-sm text-red-600">{errorSys.message}</span>}
                      </div>
                    )}

                    {(isSuccessSys || persistedSys) && (
                      <div className="text-xs grid grid-cols-1 md:grid-cols-2 gap-2 bg-white border border-glass-border rounded-md p-3">
                        {Object.entries((dataSys?.data || persistedSys) as DeploymentSystem).map(([k, v]) => (
                          <div key={k} className="flex justify-between gap-2">
                            <span className="font-medium capitalize">{k}</span>
                            <span className="font-mono text-muted-foreground break-all">{String(v)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {s.id === 3 && active === 3 && (
                  <div className="mt-4 space-y-3">
                    {!(isSuccessSys || persistedSys) ? (
                      <div className="text-sm text-muted-foreground">{t('converter.needStep2')}</div>
                    ) : (
                      <div className="space-y-3">
                        {errorReg && <span className="text-sm text-red-600">{errorReg.message}</span>}
                        {(isSuccessReg || getLastRegisteredUser()) && (
                          <div className="text-xs grid grid-cols-1 md:grid-cols-2 gap-2 bg-white border border-glass-border rounded-md p-3">
                            {Object.entries((dataReg?.data || getLastRegisteredUser()?.data || {}) as any).map(([k, v]) => (
                              <div key={k} className="flex justify-between gap-2">
                                <span className="font-medium capitalize">{k}</span>
                                <span className="font-mono text-muted-foreground break-all">{String(v)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {s.id === 4 && active === 4 && (
                  <div className="mt-4 space-y-3">
                    {!((isSuccessReg || getLastRegisteredUser()) && (isSuccessSys || persistedSys)) ? (
                      <div className="flex items-center justify-between bg-muted/20 border border-glass-border rounded-md p-3">
                        <span className="text-sm text-muted-foreground">{t('converter.needStep3')}</span>
                        <Button variant="outline" size="sm" onClick={() => setActive(3)}>
                          {t('converter.goToStep3')}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <Alert>
                          <AlertTitle>{t('converter.step4.cta')}</AlertTitle>
                          <AlertDescription>
                            {t('converter.step4.longRunning')}
                          </AlertDescription>
                        </Alert>
                        {errorDep && <span className="text-sm text-red-600">{errorDep.message}</span>}
                      </div>
                    )}

                    {(isSuccessDep || getLastDeposit()) && (
                      <div className="text-xs grid grid-cols-1 md:grid-cols-2 gap-2 bg-white border border-glass-border rounded-md p-3">
                        {Object.entries((dataDep?.data || getLastDeposit()?.data || {}) as any).map(([k, v]) => (
                          <div key={k} className="flex justify-between gap-2">
                            <span className="font-medium capitalize">{k}</span>
                            <span className="font-mono text-muted-foreground break-all">{String(v)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {s.id === 5 && active === 5 && (
                  <div className="mt-4 space-y-3">
                    {!((isSuccessDep || getLastDeposit()) && (isSuccessSys || persistedSys)) ? (
                      <div className="flex items-center justify-between bg-muted/20 border border-glass-border rounded-md p-3">
                        <span className="text-sm text-muted-foreground">{t('converter.needStep4')}</span>
                        <Button variant="outline" size="sm" onClick={() => setActive(4)}>
                          {t('converter.goToStep4')}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <Alert>
                          <AlertTitle>{t('converter.step5.cta')}</AlertTitle>
                          <AlertDescription>
                            {t('converter.step5.longRunning')}
                          </AlertDescription>
                        </Alert>
                        {errorWit && <span className="text-sm text-red-600">{errorWit.message}</span>}
                      </div>
                    )}

                    {(isSuccessWit || getLastWithdraw()) && (
                      <div className="text-xs grid grid-cols-1 md:grid-cols-2 gap-2 bg-white border border-glass-border rounded-md p-3">
                        {Object.entries((dataWit?.data || getLastWithdraw()?.data || {}) as any).map(([k, v]) => (
                          <div key={k} className="flex justify-between gap-2">
                            <span className="font-medium capitalize">{k}</span>
                            <span className="font-mono text-muted-foreground break-all">{String(v)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
          {/* Actions: mimic StandaloneFlow, keep visible */}
          <div className="sticky bottom-0 bg-white pt-2 border-t border-glass-border flex justify-between">
            <Button variant="outline" onClick={resetFlow} disabled={isDeploying}>
              {t('standalone.reset')}
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isDeploying}>
                {t('standalone.close')}
              </Button>
              {progress < 100 && (
                <Button onClick={executeAllSteps} disabled={isDeploying} className="glass-button cta-start-button">
                  {isDeploying ? t('standalone.deploying') : t('standalone.deployAll')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ConverterFlow
