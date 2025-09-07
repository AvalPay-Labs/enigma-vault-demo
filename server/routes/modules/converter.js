import { Router } from 'express'
import { deployBasics, deploySystem, registerUser, deposit, withdraw } from '../../controllers/converterController.js'

const router = Router()

// POST /api/converter/deploy-basics
router.post('/deploy-basics', deployBasics)
router.post('/deploy-system', deploySystem)
router.post('/register-user', registerUser)
router.post('/deposit', deposit)
router.post('/withdraw', withdraw)

export default router
