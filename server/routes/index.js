import { Router } from 'express'
import converterRouter from './modules/converter.js'

const router = Router()

router.use('/converter', converterRouter)

export default router

