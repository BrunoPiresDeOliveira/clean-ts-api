export type AuthenticationParam = {
  email: string
  password: string
}

export interface Authentication {
  auth: (authentication: AuthenticationParam) => Promise<string | null>
}
