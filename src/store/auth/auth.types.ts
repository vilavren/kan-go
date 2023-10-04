import { Status } from '../../interfaces/status.enum'

export interface IAuthPersistentState {
  jwt: string | undefined
}

export interface IAuthState {
  jwt: string | undefined
  status: Status
}

export interface IRegister {
  name: string
  email: string
  password: string
}

export interface ILogin {
  email: string
  password: string
}

export interface IProfile {
  _id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  __v: number
  token?: string
}

export interface IAuthState {
  jwt: string | undefined
  data?: IProfile | undefined
  status: Status
  loginErrorMessage?: string
  registerErrorMessage?: string
}
