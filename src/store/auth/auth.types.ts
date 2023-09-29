export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IAuthState {
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
