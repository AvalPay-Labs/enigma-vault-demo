export const randomHexAddress = () =>
  '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')

export const randomHex = (length = 64) =>
  '0x' + Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16)).join('')
