export const successResponse = (message, data, executionTimeMs) => ({
  success: true,
  message,
  data,
  timestamp: new Date().toISOString(),
  executionTime: executionTimeMs,
})

export const errorResponse = (message, executionTimeMs, code, details) => ({
  success: false,
  message,
  code,
  details,
  timestamp: new Date().toISOString(),
  executionTime: executionTimeMs,
})

