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

export interface ILoginResponse {
  _id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  __v: number
  token: string
}

export interface IRegisterResponse {
  name: string
  email: string
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
  token: string
}

export interface IIsAuth {
  data: {
    _id: string
    name: string
    email: string
    createdAt: string
    updatedAt: string
    __v: number
  } | null
  status: Status
}
