import { InvalidParamsError } from '@/presentation/errors'
import type { Validation } from '@/presentation/protocols/validation'
import type { EmailValidator } from '../protocols/email-validator'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamsError(this.fieldName)
    }
  }
}
