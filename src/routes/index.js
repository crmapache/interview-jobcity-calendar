import App from '../pages/App'
import { CalendarPage } from '../pages/CalendarPage'

const Routes = [
  {
    path: '/',
    component: App,
    exact: true,
  },
  {
    path: '/calendar',
    component: CalendarPage,
    exact: true,
  },
]

export default Routes
