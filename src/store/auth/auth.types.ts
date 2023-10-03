export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IAuthState {}

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
