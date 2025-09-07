import { successResponse, errorResponse } from '../utils/response.js'
import { measureExecution } from '../utils/timing.js'
import { deployBasicsService } from '../services/deployBasicsService.js'
import { deploySystemService } from '../services/deploySystemService.js'
import { registerUserService } from '../services/registerUserService.js'
import { depositService } from '../services/depositService.js'

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

export const deploySystem = async (req, res) => {
  const { time, end } = measureExecution()
  try {
    const result = await deploySystemService(req.body)
    const executionTime = end()
    return res.status(200).json(
      successResponse('Sistema desplegado exitosamente', result, executionTime),
    )
  } catch (err) {
    const executionTime = time()
    const status = err.status || 500
    return res
      .status(status)
      .json(
        errorResponse(
          err.message || 'Error al desplegar el sistema',
          executionTime,
          err.code,
          err.details,
        ),
      )
  }
}

export const registerUser = async (req, res) => {
  const { time, end } = measureExecution()
  try {
    const result = await registerUserService(req.body)
    const executionTime = end()
    return res
      .status(200)
      .json(successResponse('Usuario registrado exitosamente', result, executionTime))
  } catch (err) {
    const executionTime = time()
    const status = err.status || 500
    return res
      .status(status)
      .json(
        errorResponse(
          err.message || 'Error al registrar el usuario',
          executionTime,
          err.code,
          err.details,
        ),
      )
  }
}

export const deposit = async (req, res) => {
  const { time, end } = measureExecution()
  try {
    const result = await depositService(req.body)
    const executionTime = end()
    return res
      .status(200)
      .json(successResponse('Tokens depositados exitosamente', result, executionTime))
  } catch (err) {
    const executionTime = time()
    const status = err.status || 500
    return res
      .status(status)
      .json(
        errorResponse(
          err.message || 'Error al depositar tokens',
          executionTime,
          err.code,
          err.details,
        ),
      )
  }
}
