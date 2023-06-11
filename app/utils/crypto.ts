import crypto from 'crypto'

const charset =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz+/'

export function randomString(length: number) {
  let result = ''
  while (length > 0) {
    const bytes = new Uint8Array(16)
    const random = crypto.webcrypto.getRandomValues(bytes)

    random.forEach((c) => {
      if (length == 0) {
        return
      }
      if (c < charset.length) {
        result += charset[c]
        length--
      }
    })
  }
  return result
}
