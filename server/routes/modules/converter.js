import { Router } from 'express'
import { deployBasics } from '../../controllers/converterController.js'

const router = Router()

// POST /api/converter/deploy-basics
router.post('/deploy-basics', deployBasics)

export default router

