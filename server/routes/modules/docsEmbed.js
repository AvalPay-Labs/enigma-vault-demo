import { Router } from 'express'
import axios from 'axios'

const router = Router()

// Helper to build a safe URL from query parameters
const sanitizeUrl = (value = '') => {
  try {
    const u = new URL(value)
    if (!['http:', 'https:'].includes(u.protocol)) return null
    return u.toString()
  } catch {
    return null
  }
}

const computeSpecUrl = (query) => {
  // Priority: explicit spec URL, else docs URL -> openapi.json, else env default
  const qSpec = typeof query.spec === 'string' ? sanitizeUrl(query.spec) : null
  const qDocs = typeof query.docs === 'string' ? sanitizeUrl(query.docs) : null
  if (qSpec) return qSpec
  if (qDocs) {
    try {
      const d = new URL(qDocs)
      // Common FastAPI path: /docs -> /openapi.json
      const spec = qDocs.replace(/\/?docs\/?$/, '/openapi.json')
      return sanitizeUrl(spec) || `${d.origin}/openapi.json`
    } catch {
      /* ignore */
    }
  }
  const base = process.env.ENIGMA_BACKEND_BASE || 'https://enigma-backend.aiforworld.xyz'
  return `${base.replace(/\/$/, '')}/openapi.json`
}

// Simple HTML page embedding Swagger UI from CDN and pointing to our proxied spec
router.get('/', (req, res) => {
  const qs = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : ''
  const html = `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Enigma API Docs</title>
      <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
      <style>
        html, body { margin: 0; padding: 0; height: 100%; }
        #swagger-ui { height: 100vh; }
      </style>
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
      <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-standalone-preset.js"></script>
      <script>
        window.ui = SwaggerUIBundle({
          url: '/api/docs-embed/spec${qs}',
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
          layout: 'BaseLayout'
        })
      </script>
    </body>
  </html>`
  res.setHeader('X-Frame-Options', '') // do not block iframe
  res.setHeader('Content-Security-Policy', "frame-ancestors *")
  res.type('html').send(html)
})

// Proxy the OpenAPI spec to avoid CORS issues when loading the JSON
router.get('/spec', async (req, res) => {
  try {
    const specUrl = computeSpecUrl(req.query)
    const response = await axios.get(specUrl, { responseType: 'json' })
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.type('application/json').send(response.data)
  } catch (err) {
    const status = err?.response?.status || 502
    res.status(status).json({
      success: false,
      message: 'Failed to load OpenAPI spec',
      target: computeSpecUrl(req.query),
    })
  }
})

export default router
