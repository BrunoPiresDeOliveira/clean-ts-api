import { MissingParamsError } from '@/presentation/errors'
import type { Validation } from '@/presentation/protocols/validation'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamsError(this.fieldName)
    }
  }
}
