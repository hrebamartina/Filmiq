import { createFileRoute } from '@tanstack/react-router'
// Update the path below to match the actual location and filename of your Home component
import Home from '../pages/Home/Home';

export const Route = createFileRoute('/')({
  component: Home,
})


