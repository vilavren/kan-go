import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Button, TextField } from '@mui/material'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { clearLoginError, fetchLogin } from '../store/auth/auth.slice'
import { ILogin } from '../store/auth/auth.types'
import { AppDispatch, RootState } from '../store/store'

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { jwt, loginErrorMessage } = useSelector(
    (state: RootState) => state.auth
  )

  useEffect(() => {
    if (jwt) {
      navigate('/')
    }
  }, [jwt, navigate])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ILogin>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<ILogin> = async (values) => {
    dispatch(clearLoginError())
    await dispatch(fetchLogin(values))
  }

  setTimeout(() => {
    dispatch(clearLoginError())
  }, 2000)

  console.log('render')
  return (
    <>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Email"
          error={Boolean(loginErrorMessage) || Boolean(errors.email)}
          helperText={errors.email?.message || loginErrorMessage}
          {...register('email', {
            required: 'Укажите email',
          })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Пароль"
          error={
            Boolean(loginErrorMessage) || Boolean(errors.password?.message)
          }
          helperText={
            loginErrorMessage ? loginErrorMessage : errors.password?.message
          }
          {...register('password', { required: 'Укажите пароль' })}
        />
        <LoadingButton
          sx={{
            mt: 3,
            mb: 2,
          }}
          variant="outlined"
          fullWidth
          color="success"
          type="submit"
          disabled={!isValid}
          loading={isSubmitting}
        >
          Войти
        </LoadingButton>
      </Box>
      <Button
        sx={{ textTransform: 'none' }}
        component={Link}
        to="/signup"
        variant="text"
        size="small"
      >
        Нет аккаунта?
      </Button>
    </>
  )
}
