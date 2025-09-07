import { useMemo, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useDeployBasics } from '@/hooks/useDeployBasics'
import { getLastDeploymentData, getLastSystemData, getLastRegisteredUser, getLastDeposit } from '@/store/deployments'
import type { DeploymentBasics } from '@/types/deploy'
import { useTranslation } from '@/i18n/LanguageContext'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useDeploySystem } from '@/hooks/useDeploySystem'
import type { DeploymentSystem } from '@/types/deploy'
import { useRegisterUser } from '@/hooks/useRegisterUser'
import { useDeposit } from '@/hooks/useDeposit'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type Step = {
  id: number
  title: string
  description: string
}

const steps = (t: (k: string) => string): Step[] => ([
  { id: 1, title: t('converter.step1.title'), description: t('converter.step1.desc') },
  { id: 2, title: t('converter.step2.title'), description: t('converter.step2.desc') },
  { id: 3, title: t('converter.step3.title'), description: t('converter.step3.desc') },
  { id: 4, title: t('converter.step4.title'), description: t('converter.step4.desc') },
  { id: 5, title: t('converter.step5.title'), description: t('converter.step5.desc') },
])

export const ConverterFlow = ({ open, onOpenChange }: Props) => {
  const [active, setActive] = useState<number>(1)
  const { mutate: runDeployBasics, isPending, isSuccess, data, error } = useDeployBasics()
  const { mutate: runDeploySystem, isPending: isPendingSys, isSuccess: isSuccessSys, data: dataSys, error: errorSys } = useDeploySystem()
  const { mutate: runRegisterUser, isPending: isPendingReg, isSuccess: isSuccessReg, data: dataReg, error: errorReg } = useRegisterUser()
  const { mutate: runDeposit, isPending: isPendingDep, isSuccess: isSuccessDep, data: dataDep, error: errorDep } = useDeposit()
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
    return done
  }, [isSuccess, persisted, isSuccessSys, persistedSys, isSuccessReg, isSuccessDep])

  const _steps = steps(t)
  const progress = Math.round((completed.size / _steps.length) * 100)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-[var(--radius-lg)] bg-white border border-glass-border shadow-lg">
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

          <div className="space-y-3">
            {_steps.map((s) => (
              <div key={s.id} className={`p-4 rounded-lg border ${active === s.id ? 'border-primary' : 'border-glass-border'} bg-muted/20`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{s.id}. {s.title}</h3>
                      {completed.has(s.id) && <Badge className="bg-accent-success text-success-foreground">{t('converter.done')}</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{s.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant={active === s.id ? 'default' : 'outline'} size="sm" onClick={() => setActive(s.id)}>
                      {active === s.id ? t('converter.active') : t('converter.goToStep')}
                    </Button>
                  </div>
                </div>

                {s.id === 1 && active === 1 && (
                  <div className="mt-4 space-y-3">
                    <div className="flex flex-col gap-3">
                      <Alert>
                        <AlertTitle>{t('converter.step1.cta')}</AlertTitle>
                        <AlertDescription>
                          {t('converter.step1.longRunning')}
                        </AlertDescription>
                      </Alert>
                      <div className="flex items-center gap-2">
                        <Button onClick={() => runDeployBasics()} disabled={isPending} className="glass-button cta-start-button">
                          {isPending ? '...' : t('converter.step1.cta')}
                        </Button>
                        {error && <span className="text-sm text-red-600">{error.message}</span>}
                      </div>
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
                        <div className="flex items-center gap-2">
                          <Button onClick={() => runDeploySystem()} disabled={isPendingSys} className="glass-button cta-start-button">
                            {isPendingSys ? '...' : t('converter.step2.cta')}
                          </Button>
                          {errorSys && <span className="text-sm text-red-600">{errorSys.message}</span>}
                        </div>
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
                        <div className="flex items-center gap-2">
                          <Button onClick={() => runRegisterUser()} disabled={isPendingReg} className="glass-button cta-start-button">
                            {isPendingReg ? '...' : t('converter.step3.cta')}
                          </Button>
                          {errorReg && <span className="text-sm text-red-600">{errorReg.message}</span>}
                        </div>
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
                        <div className="flex items-center gap-2">
                          <Button onClick={() => runDeposit()} disabled={isPendingDep} className="glass-button cta-start-button">
                            {isPendingDep ? '...' : t('converter.step4.cta')}
                          </Button>
                          {errorDep && <span className="text-sm text-red-600">{errorDep.message}</span>}
                        </div>
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

                {s.id > 4 && active === s.id && (
                  <div className="mt-4 text-sm text-muted-foreground">{t('converter.comingSoon')}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ConverterFlow
