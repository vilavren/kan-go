import { Link, Navigate } from 'react-router-dom'
import { Box, Button, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { fetchLogin } from '../store/auth/auth.slice'
import { ILogin } from '../store/auth/auth.types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isAuth = useSelector((s: RootState) => Boolean(s.auth.data))

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILogin>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<ILogin> = async (values) => {
    const data = await dispatch(fetchLogin(values))
    console.log(data)
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
          label="Email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите email' })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
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
