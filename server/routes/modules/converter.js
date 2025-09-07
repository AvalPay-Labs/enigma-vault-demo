import { Router } from 'express'
import { deployBasics, deploySystem } from '../../controllers/converterController.js'

const router = Router()

// POST /api/converter/deploy-basics
router.post('/deploy-basics', deployBasics)
router.post('/deploy-system', deploySystem)

export default router
