export const measureExecution = () => {
  const start = Date.now()
  return {
    time: () => Date.now() - start,
    end: () => Date.now() - start,
  }
}

