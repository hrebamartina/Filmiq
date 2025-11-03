import { createFileRoute } from '@tanstack/react-router'
import LoginForm from '../components/Auth/LoginForm'

export const Route = createFileRoute('/login')({
  component: LoginForm,
})


