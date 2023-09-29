import { Link, Navigate } from 'react-router-dom'
import { Box, Button, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useDispatch } from 'react-redux'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AppDispatch, RootState } from '../store/store'
import { fetchRegister } from '../store/auth/auth.slice'
import { useSelector } from 'react-redux'
import { IRegister } from '../store/auth/auth.types'

export const Signup = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isAuth = useSelector((s: RootState) => Boolean(s.auth.data))

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IRegister>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<IRegister> = async (values) => {
    const data = await dispatch(fetchRegister(values))

    if (!data.payload) {
      return alert('Не удалось зарегистрироваться!')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Имя пользователя"
          error={Boolean(errors.name?.message)}
          helperText={errors.name?.message}
          {...register('name', { required: 'Укажите имя пользователя' })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
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
