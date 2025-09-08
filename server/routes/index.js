import { Router } from 'express'
import converterRouter from './modules/converter.js'
import docsEmbedRouter from './modules/docsEmbed.js'

const router = Router()

router.use('/converter', converterRouter)
router.use('/docs-embed', docsEmbedRouter)

export default router
