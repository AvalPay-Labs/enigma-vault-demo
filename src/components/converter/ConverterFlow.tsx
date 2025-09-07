import { useMemo, useState } from 'react'
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
import { getLastDeploymentData } from '@/store/deployments'
import type { DeploymentBasics } from '@/types/deploy'
import { useTranslation } from '@/i18n/LanguageContext'

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
  const { t } = useTranslation()

  const stored: DeploymentBasics | null = useMemo(() => getLastDeploymentData(), [isSuccess, data])

  const completed = useMemo(() => {
    const done = new Set<number>()
    if (isSuccess || stored) done.add(1)
    return done
  }, [isSuccess, stored])

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
                    <div className="flex items-center gap-2">
                      <Button onClick={() => runDeployBasics()} disabled={isPending} className="glass-button cta-start-button">
                        {isPending ? '...' : t('converter.step1.cta')}
                      </Button>
                      {error && <span className="text-sm text-red-600">{error.message}</span>}
                    </div>
                    {(isSuccess || stored) && (
                      <div className="text-xs grid grid-cols-1 md:grid-cols-2 gap-2 bg-white border border-glass-border rounded-md p-3">
                        {Object.entries((data?.data || stored) as DeploymentBasics).map(([k, v]) => (
                          <div key={k} className="flex justify-between gap-2">
                            <span className="font-medium capitalize">{k}</span>
                            <span className="font-mono text-muted-foreground break-all">{String(v)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {s.id !== 1 && active === s.id && (
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
