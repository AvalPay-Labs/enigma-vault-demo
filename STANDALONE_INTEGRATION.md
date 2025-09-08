# Integración Standalone - Frontend Enigma

Esta documentación describe la integración completa del módulo standalone en el frontend de Enigma Protocol.

## 🚀 Funcionalidades Implementadas

### 1. Tipos TypeScript (`src/types/standalone.ts`)
- Esquemas Zod para validación de datos
- Tipos para todas las respuestas de la API standalone
- Tipos para requests de operaciones (mint, transfer, burn, etc.)

### 2. Servicio de API (`src/services/standalone.ts`)
- Funciones para todos los endpoints de standalone
- Manejo de errores y timeouts
- Soporte para modo mock (cuando no hay backend configurado)
- Validación de respuestas con Zod

### 3. Componentes de UI

#### StandaloneFlow (`src/components/standalone/StandaloneFlow.tsx`)
- Modal paso a paso para el despliegue del sistema
- 4 pasos: Deploy Basics → Deploy System → Register Auditor → Set Auditor
- Barra de progreso visual
- Manejo de errores y estados de carga
- Ejecución individual o completa de pasos

#### StandaloneOperationsPanel (`src/components/standalone/StandaloneOperationsPanel.tsx`)
- Panel de operaciones después del despliegue exitoso
- 4 pestañas: Mint, Transfer, Burn, Balance
- Formularios para cada operación
- Visualización de resultados
- Información del sistema desplegado

### 4. Integración en Dashboard
- Botón "Crear Token" ahora abre el flujo standalone
- Panel de operaciones se muestra después del despliegue
- Integración completa con el sistema de notificaciones

## 🔧 Configuración

### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto:

```env
# Backend Configuration
VITE_DEPLOY_SERVICE_URL=https://enigma-backend.aiforworld.xyz

# Timeout Configuration (in milliseconds)
VITE_HTTP_TIMEOUT_MS=120000
VITE_DEPLOY_BASICS_TIMEOUT_MS=120000
VITE_DEPLOY_SYSTEM_TIMEOUT_MS=180000
VITE_REGISTER_USER_TIMEOUT_MS=60000
VITE_REGISTER_AUDITOR_TIMEOUT_MS=60000
VITE_SET_AUDITOR_TIMEOUT_MS=60000
VITE_MINT_TIMEOUT_MS=120000
VITE_TRANSFER_TIMEOUT_MS=120000
VITE_BURN_TIMEOUT_MS=120000
VITE_BALANCE_TIMEOUT_MS=30000

# Wallet Configuration (optional - for testing)
VITE_STANDALONE_WALLET_ADDRESS=0x0db58fFf8F2872c43785bb884397eDaD474b0ede
VITE_CONVERTER_WALLET_ADDRESS=0x5E4aC881cCa68eB9D39D7ca55223EbD181204c0f
```

### Configuración del Backend (`src/config/backend.ts`)
- Configuración centralizada de URLs y timeouts
- Endpoints de la API
- Direcciones de wallet para testing

## 📋 Flujo de Uso

### 1. Despliegue del Sistema
1. Usuario hace clic en "Crear Token" en el Dashboard
2. Se abre el modal `StandaloneFlow`
3. Usuario puede ejecutar pasos individualmente o todos a la vez
4. Cada paso muestra su estado (pending, loading, completed, error)
5. Al completar todos los pasos, se muestra el panel de operaciones

### 2. Operaciones con Tokens
1. Panel `StandaloneOperationsPanel` se muestra automáticamente
2. Usuario puede navegar entre pestañas: Mint, Transfer, Burn, Balance
3. Cada operación tiene su formulario específico
4. Resultados se muestran en tiempo real
5. Información del sistema desplegado siempre visible

## 🎯 Endpoints Integrados

### Despliegue
- `POST /api/standalone/deploy-basics` - Componentes básicos
- `POST /api/standalone/deploy-system` - Sistema completo
- `POST /api/standalone/register-auditor` - Registrar auditor
- `POST /api/standalone/set-auditor` - Configurar auditor

### Operaciones
- `POST /api/standalone/mint` - Mint tokens
- `POST /api/standalone/transfer` - Transferir tokens
- `POST /api/standalone/burn` - Quemar tokens
- `GET /api/standalone/balance/:walletNumber` - Verificar balance

## 🎨 Características de UI/UX

### Diseño Consistente
- Mantiene el estilo glass-card del resto de la aplicación
- Colores y gradientes coherentes
- Iconos de Lucide React
- Animaciones suaves

### Experiencia de Usuario
- Feedback visual inmediato
- Estados de carga claros
- Manejo de errores amigable
- Copia al portapapeles de direcciones de contratos
- Notificaciones toast para todas las acciones

### Responsive Design
- Funciona en desktop y móvil
- Grids adaptativos
- Botones y formularios optimizados para touch

## 🔍 Validación y Seguridad

### Validación de Datos
- Esquemas Zod para todas las respuestas
- Validación de direcciones Ethereum
- Validación de números de wallet
- Sanitización de inputs

### Manejo de Errores
- Try-catch en todas las operaciones
- Mensajes de error descriptivos
- Fallback a modo mock si no hay backend
- Timeouts configurables

## 🧪 Testing

### Modo Mock
- Si no hay `VITE_DEPLOY_SERVICE_URL` configurado, se usan datos mock
- Permite desarrollo y testing sin backend
- Datos realistas para todas las operaciones

### Datos de Prueba
- Direcciones de wallet generadas aleatoriamente
- Hashes de transacción simulados
- Tiempos de ejecución realistas

## 📱 Traducciones

Todas las cadenas de texto están traducidas y disponibles en:
- `src/i18n/translations.ts`
- Claves bajo el namespace `standalone.*`

## 🚀 Próximos Pasos

1. **Testing en Producción**: Probar con el backend real
2. **Optimizaciones**: Mejorar timeouts y manejo de errores
3. **Funcionalidades Adicionales**: Agregar más operaciones si es necesario
4. **Documentación**: Expandir documentación de API

## 🐛 Troubleshooting

### Problemas Comunes

1. **Error de CORS**: Verificar que el backend tenga CORS habilitado
2. **Timeouts**: Ajustar `VITE_*_TIMEOUT_MS` según la red
3. **Direcciones de Wallet**: Verificar que las direcciones sean válidas
4. **Modo Mock**: Si no funciona, verificar que `VITE_DEPLOY_SERVICE_URL` esté configurado

### Logs de Debug
- Abrir DevTools del navegador
- Verificar Network tab para requests
- Revisar Console para errores de JavaScript
