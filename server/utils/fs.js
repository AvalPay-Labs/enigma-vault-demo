import { promises as fs } from 'fs'
import path from 'path'

export const ensureDirAndFile = async (filePath, contents) => {
  const dir = path.dirname(filePath)
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(filePath, contents, 'utf8')
}

