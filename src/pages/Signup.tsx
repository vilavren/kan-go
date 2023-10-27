import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Button, TextField } from '@mui/material'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { fetchRegister } from '../store/auth/auth.asyncActions'
import { authActions } from '../store/auth/auth.slice'
import { IRegister } from '../store/auth/auth.types'
import { AppDispatch, RootState } from '../store/store'

export const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { jwt, registerErrorMessage } = useSelector(
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
  } = useForm<IRegister>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<IRegister> = async (values) => {
    dispatch(authActions.clearRegisterError())
    await dispatch(fetchRegister(values))
  }

  setTimeout(() => {
    dispatch(authActions.clearRegisterError())
  }, 2000)

  return (
    <>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Имя пользователя"
          error={Boolean(registerErrorMessage) || Boolean(errors.name)}
          helperText={errors.name?.message || registerErrorMessage}
          {...register('name', { required: 'Укажите имя пользователя' })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          type="email"
          id="email"
          label="Email"
          error={Boolean(registerErrorMessage) || Boolean(errors.email)}
          helperText={errors.email?.message || registerErrorMessage}
          {...register('email', { required: 'Укажите почту' })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          type="password"
          id="password"
          label="Пароль"
          error={Boolean(registerErrorMessage) || Boolean(errors.password)}
          helperText={errors.password?.message || registerErrorMessage}
          {...register('password', { required: 'Минимум 5 символов' })}
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
          Зарегистрироваться
        </LoadingButton>
      </Box>
      <Button
        sx={{ textTransform: 'none' }}
        component={Link}
        to="/login"
        variant="text"
        size="small"
      >
        Есть аккаунт?
      </Button>
    </>
  )
}
