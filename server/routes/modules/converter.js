import { Router } from 'express'
import { deployBasics, deploySystem, registerUser } from '../../controllers/converterController.js'

const router = Router()

// POST /api/converter/deploy-basics
router.post('/deploy-basics', deployBasics)
router.post('/deploy-system', deploySystem)
router.post('/register-user', registerUser)

export default router
