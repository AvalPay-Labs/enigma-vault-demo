import express from 'express'
import morgan from 'morgan'
import routes from './routes/index.js'

// Basic Express app setup
const app = express()

app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))

// Mount API routes
app.use('/api', routes)

// 404 handler for unknown API routes
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({
      success: false,
      message: 'API route not found',
      timestamp: new Date().toISOString(),
    })
  }
  next()
})

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    details: process.env.NODE_ENV === 'production' ? undefined : err.details,
    timestamp: new Date().toISOString(),
  })
})

export default app

