# Checklist de Implementación – Consumo de Endpoints Enigma API

Este checklist guía la implementación y validación del consumo de todos los endpoints descritos en:
- `src/docs/DETAILED_API_TESTING_REPORT.md`
- `src/docs/backend-api-analisis.md`

Estado actual: base URL y versionado configurables; tipos, servicios, hooks y ejemplos añadidos. Falta integrar algunos pasos en UI y documentar validación.

## 1) Configuración y Versionado
- [x] Base URL parametrizable: `VITE_DEPLOY_SERVICE_URL`
- [x] Versionado opcional: `VITE_API_VERSION_MODE=legacy|versioned`, `VITE_API_VERSION=v1`
- [x] Interceptor Axios inserta `/api/vX` cuando `versioned`
- [x] Timeouts auth/health/info en `.env.example`

## 2) Tipos (Zod)
- [x] Converter: Transfer (`ConverterTransferResponse`), Balance (`ConverterBalanceResponse`)
- [x] Converter: SetAuditor, GetFaucet
- [x] Reusar existentes: Deploy, Register, Deposit, Withdraw
- [x] Standalone: definidos (deploy, register, set-auditor, mint, balance, transfer, burn)

## 3) Servicios (HTTP)
- [x] Info: `getHealth()`, `getApiInfo()` – `src/services/info.ts`
- [x] Auth: `login()`, `getProfile()` – `src/services/auth.ts`
- [x] Converter: `transfer()`, `getBalance()` – `src/services/converter.ts`
- [x] Converter existentes: deploy-basics/system, register-user, set-auditor, get-faucet, deposit, withdraw
- [x] Standalone existentes: deploy, register, set-auditor, mint, balance, transfer, burn

## 4) Hooks (React Query)
- [x] Info: `useHealth`, `useApiInfo`
- [x] Auth: `useLogin`, `useProfile`
- [x] Converter: `useConverterTransfer`, `useConverterBalance`
- [x] Ya existentes: deploy/register/deposit/withdraw, set-auditor/get-faucet

## 5) Ejemplos listos para usar
- [x] Auth: `src/examples/authExample.tsx`
- [x] Converter: `src/examples/converterTransferExample.tsx`, `src/examples/converterBalanceExample.tsx`
- [x] Standalone: `src/examples/standaloneMintExample.tsx`, `src/examples/standaloneBalanceExample.tsx`

## 6) Integración UI (pendiente)
- [ ] ConverterFlow: añadir pasos visibles para “Set Auditor” y “Get Faucet”
- [ ] ConverterFlow: agregar acciones “Transfer” y “Balance” con estado/errores
- [ ] StandaloneFlow: opcional, botones rápidos para mint/transfer/burn/balance

## 7) Documentación y Validación (pendiente)
- [ ] Documentar uso/versionado en README o `src/docs/USAGE_GUIDE.md` (envs, ejemplos)
- [ ] Validación manual en `legacy` y `versioned`
- [ ] Nota: si `versioned`, confirmar backend acepte `/api/v1/*` o configurar proxy

## 8) Alineación backend (pendiente)
- [ ] Confirmar endpoints: `/api/converter/transfer` y `/api/converter/balance/:walletNumber`
- [ ] Confirmar soporte a rutas versionadas si se activa `versioned`

## Variables de entorno clave
- `VITE_DEPLOY_SERVICE_URL` (dev: `http://localhost:8080`, prod: URL backend)
- `VITE_API_VERSION_MODE` (`legacy` | `versioned`), `VITE_API_VERSION` (ej: `v1`)
- Timeouts: `VITE_HTTP_TIMEOUT_MS`, `VITE_*_TIMEOUT_MS` específicos
- Wallets demo: `VITE_STANDALONE_WALLET_ADDRESS`, `VITE_CONVERTER_WALLET_ADDRESS`

## Comandos útiles
- `npm run dev` – Vite (proxy `/api` → `:3000`)
- `node server/index.js` – Express `:3000`

Para continuar: marca las casillas del bloque 6–8 y te implemento lo siguiente de la lista.
