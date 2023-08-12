export class EmailInUseError extends Error {
  constructor () {
    super('The received email id already in use')
    this.name = 'EmailInUseError'
  }
}
