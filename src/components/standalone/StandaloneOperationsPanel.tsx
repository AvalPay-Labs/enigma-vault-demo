import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Coins, 
  ArrowRightLeft, 
  Flame, 
  Eye, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Copy,
  ExternalLink
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useTranslation } from '@/i18n/LanguageContext'
import {
  mintStandaloneTokens,
  transferStandaloneTokens,
  burnStandaloneTokens,
  getStandaloneBalance,
} from '@/services/standalone'
import {
  StandaloneDeploySystemResponse,
  StandaloneMintResponse,
  StandaloneTransferResponse,
  StandaloneBurnResponse,
  StandaloneBalanceResponse,
} from '@/types/standalone'

type Props = {
  systemData: StandaloneDeploySystemResponse
  onClose?: () => void
}

export const StandaloneOperationsPanel = ({ systemData, onClose }: Props) => {
  const [activeTab, setActiveTab] = useState('mint')
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [results, setResults] = useState<Record<string, any>>({})
  const [error, setError] = useState<string | null>(null)
  
  const { toast } = useToast()
  const { t } = useTranslation()

  // Form states
  const [mintForm, setMintForm] = useState({
    ownerWalletNumber: 1,
    userWalletNumber: 2,
    amount: 50,
  })
  
  const [transferForm, setTransferForm] = useState({
    senderWalletNumber: 1,
    receiverWalletNumber: 2,
    amount: 30,
  })
  
  const [burnForm, setBurnForm] = useState({
    walletNumber: 2,
    amount: 20,
  })
  
  const [balanceForm, setBalanceForm] = useState({
    walletNumber: 1,
  })

  const setLoadingState = (operation: string, isLoading: boolean) => {
    setLoading(prev => ({ ...prev, [operation]: isLoading }))
  }

  const setResult = (operation: string, result: any) => {
    setResults(prev => ({ ...prev, [operation]: result }))
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: t('standalone.copied'),
      description: `${label} ${t('standalone.copiedToClipboard')}`,
    })
  }

  const handleMint = async () => {
    try {
      setError(null)
      setLoadingState('mint', true)
      
      const response = await mintStandaloneTokens(mintForm)
      setResult('mint', response)
      
      toast({
        title: t('standalone.mintSuccess'),
        description: `${response.data.amount} tokens minted successfully`,
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      toast({
        title: t('standalone.error'),
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setLoadingState('mint', false)
    }
  }

  const handleTransfer = async () => {
    try {
      setError(null)
      setLoadingState('transfer', true)
      
      const response = await transferStandaloneTokens(transferForm)
      setResult('transfer', response)
      
      toast({
        title: t('standalone.transferSuccess'),
        description: `${response.data.amount} tokens transferred successfully`,
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      toast({
        title: t('standalone.error'),
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setLoadingState('transfer', false)
    }
  }

  const handleBurn = async () => {
    try {
      setError(null)
      setLoadingState('burn', true)
      
      const response = await burnStandaloneTokens(burnForm)
      setResult('burn', response)
      
      toast({
        title: t('standalone.burnSuccess'),
        description: `${response.data.burnedAmount} tokens burned successfully`,
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      toast({
        title: t('standalone.error'),
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setLoadingState('burn', false)
    }
  }

  const handleCheckBalance = async () => {
    try {
      setError(null)
      setLoadingState('balance', true)
      
      const response = await getStandaloneBalance(balanceForm.walletNumber)
      setResult('balance', response)
      
      toast({
        title: t('standalone.balanceSuccess'),
        description: `Balance: ${response.data.encryptedBalance} tokens`,
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      toast({
        title: t('standalone.error'),
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setLoadingState('balance', false)
    }
  }

  const renderResult = (operation: string, result: any) => {
    if (!result) return null

    return (
      <Card className="mt-4 border-green-200 bg-green-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-green-800 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            {t(`standalone.${operation}Result`)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {result.data && (
            <div className="space-y-2 text-sm">
              {Object.entries(result.data).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-green-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <div className="flex items-center gap-1">
                    <code className="text-xs bg-green-100 px-2 py-1 rounded">
                      {typeof value === 'string' && value.length > 20 
                        ? `${value.slice(0, 10)}...${value.slice(-10)}`
                        : String(value)
                      }
                    </code>
                    {typeof value === 'string' && value.length > 20 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(value, key)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="pt-2 border-t border-green-200 text-xs text-green-600">
            {t('standalone.executionTime')}: {result.executionTime}ms
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* System Info */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            {t('standalone.systemDeployed')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">{t('standalone.mainContracts')}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Registrar:</span>
                  <div className="flex items-center gap-1">
                    <code className="text-xs bg-blue-100 px-2 py-1 rounded">
                      {systemData.data.registrar.slice(0, 10)}...
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(systemData.data.registrar, 'Registrar')}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">EncryptedERC:</span>
                  <div className="flex items-center gap-1">
                    <code className="text-xs bg-blue-100 px-2 py-1 rounded">
                      {systemData.data.encryptedERC.slice(0, 10)}...
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(systemData.data.encryptedERC, 'EncryptedERC')}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">{t('standalone.verifiers')}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Mint:</span>
                  <code className="text-xs bg-blue-100 px-2 py-1 rounded">
                    {systemData.data.mintVerifier.slice(0, 10)}...
                  </code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Transfer:</span>
                  <code className="text-xs bg-blue-100 px-2 py-1 rounded">
                    {systemData.data.transferVerifier.slice(0, 10)}...
                  </code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Burn:</span>
                  <code className="text-xs bg-blue-100 px-2 py-1 rounded">
                    {systemData.data.burnVerifier.slice(0, 10)}...
                  </code>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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

      {/* Operations Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="mint" className="flex items-center gap-2">
            <Coins className="w-4 h-4" />
            {t('standalone.mint')}
          </TabsTrigger>
          <TabsTrigger value="transfer" className="flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4" />
            {t('standalone.transfer')}
          </TabsTrigger>
          <TabsTrigger value="burn" className="flex items-center gap-2">
            <Flame className="w-4 h-4" />
            {t('standalone.burn')}
          </TabsTrigger>
          <TabsTrigger value="balance" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            {t('standalone.balance')}
          </TabsTrigger>
        </TabsList>

        {/* Mint Tab */}
        <TabsContent value="mint" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="w-5 h-5" />
                {t('standalone.mintTokens')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ownerWallet">{t('standalone.ownerWallet')}</Label>
                  <Input
                    id="ownerWallet"
                    type="number"
                    value={mintForm.ownerWalletNumber}
                    onChange={(e) => setMintForm(prev => ({ 
                      ...prev, 
                      ownerWalletNumber: parseInt(e.target.value) || 1 
                    }))}
                    min="1"
                    max="2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userWallet">{t('standalone.userWallet')}</Label>
                  <Input
                    id="userWallet"
                    type="number"
                    value={mintForm.userWalletNumber}
                    onChange={(e) => setMintForm(prev => ({ 
                      ...prev, 
                      userWalletNumber: parseInt(e.target.value) || 2 
                    }))}
                    min="1"
                    max="2"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mintAmount">{t('standalone.amount')}</Label>
                <Input
                  id="mintAmount"
                  type="number"
                  value={mintForm.amount}
                  onChange={(e) => setMintForm(prev => ({ 
                    ...prev, 
                    amount: parseInt(e.target.value) || 50 
                  }))}
                  min="1"
                />
              </div>
              <Button
                onClick={handleMint}
                disabled={loading.mint}
                className="w-full glass-button cta-start-button"
              >
                {loading.mint ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('standalone.minting')}
                  </>
                ) : (
                  <>
                    <Coins className="w-4 h-4 mr-2" />
                    {t('standalone.mintTokens')}
                  </>
                )}
              </Button>
              {renderResult('mint', results.mint)}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transfer Tab */}
        <TabsContent value="transfer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5" />
                {t('standalone.transferTokens')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="senderWallet">{t('standalone.senderWallet')}</Label>
                  <Input
                    id="senderWallet"
                    type="number"
                    value={transferForm.senderWalletNumber}
                    onChange={(e) => setTransferForm(prev => ({ 
                      ...prev, 
                      senderWalletNumber: parseInt(e.target.value) || 1 
                    }))}
                    min="1"
                    max="2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receiverWallet">{t('standalone.receiverWallet')}</Label>
                  <Input
                    id="receiverWallet"
                    type="number"
                    value={transferForm.receiverWalletNumber}
                    onChange={(e) => setTransferForm(prev => ({ 
                      ...prev, 
                      receiverWalletNumber: parseInt(e.target.value) || 2 
                    }))}
                    min="1"
                    max="2"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="transferAmount">{t('standalone.amount')}</Label>
                <Input
                  id="transferAmount"
                  type="number"
                  value={transferForm.amount}
                  onChange={(e) => setTransferForm(prev => ({ 
                    ...prev, 
                    amount: parseInt(e.target.value) || 30 
                  }))}
                  min="1"
                />
              </div>
              <Button
                onClick={handleTransfer}
                disabled={loading.transfer}
                className="w-full glass-button cta-start-button"
              >
                {loading.transfer ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('standalone.transferring')}
                  </>
                ) : (
                  <>
                    <ArrowRightLeft className="w-4 h-4 mr-2" />
                    {t('standalone.transferTokens')}
                  </>
                )}
              </Button>
              {renderResult('transfer', results.transfer)}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Burn Tab */}
        <TabsContent value="burn" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="w-5 h-5" />
                {t('standalone.burnTokens')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="burnWallet">{t('standalone.walletNumber')}</Label>
                <Input
                  id="burnWallet"
                  type="number"
                  value={burnForm.walletNumber}
                  onChange={(e) => setBurnForm(prev => ({ 
                    ...prev, 
                    walletNumber: parseInt(e.target.value) || 2 
                  }))}
                  min="1"
                  max="2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="burnAmount">{t('standalone.amount')}</Label>
                <Input
                  id="burnAmount"
                  type="number"
                  value={burnForm.amount}
                  onChange={(e) => setBurnForm(prev => ({ 
                    ...prev, 
                    amount: parseInt(e.target.value) || 20 
                  }))}
                  min="1"
                />
              </div>
              <Button
                onClick={handleBurn}
                disabled={loading.burn}
                className="w-full glass-button cta-start-button"
              >
                {loading.burn ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('standalone.burning')}
                  </>
                ) : (
                  <>
                    <Flame className="w-4 h-4 mr-2" />
                    {t('standalone.burnTokens')}
                  </>
                )}
              </Button>
              {renderResult('burn', results.burn)}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Balance Tab */}
        <TabsContent value="balance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                {t('standalone.checkBalance')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="balanceWallet">{t('standalone.walletNumber')}</Label>
                <Input
                  id="balanceWallet"
                  type="number"
                  value={balanceForm.walletNumber}
                  onChange={(e) => setBalanceForm(prev => ({ 
                    ...prev, 
                    walletNumber: parseInt(e.target.value) || 1 
                  }))}
                  min="1"
                  max="2"
                />
              </div>
              <Button
                onClick={handleCheckBalance}
                disabled={loading.balance}
                className="w-full glass-button cta-start-button"
              >
                {loading.balance ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('standalone.checking')}
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    {t('standalone.checkBalance')}
                  </>
                )}
              </Button>
              {renderResult('balance', results.balance)}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Close Button */}
      {onClose && (
        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            {t('standalone.close')}
          </Button>
        </div>
      )}
    </div>
  )
}
