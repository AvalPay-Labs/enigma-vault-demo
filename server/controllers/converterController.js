import { successResponse, errorResponse } from '../utils/response.js'
import { measureExecution } from '../utils/timing.js'
import { deployBasicsService } from '../services/deployBasicsService.js'

export const deployBasics = async (req, res) => {
  const { time, end } = measureExecution()
  try {
    const result = await deployBasicsService(req.body)
    const executionTime = end()
    return res.status(200).json(
      successResponse(
        'Converter basic components deployed successfully',
        result,
        executionTime,
      ),
    )
  } catch (err) {
    const executionTime = time()
    const status = err.status || 500
    return res
      .status(status)
      .json(
        errorResponse(
          err.message || 'Failed to deploy basic components',
          executionTime,
          err.code,
          err.details,
        ),
      )
  }
}
