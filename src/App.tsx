import { Fragment } from 'react/jsx-runtime'
import { RootProvider } from '@/providers'
import { ApplicationRoutes } from './routes'
import './App.css'

function App() {
  return (
    <Fragment>
      <RootProvider>
      <ApplicationRoutes />
      </RootProvider>
    </Fragment>
  )
}

export default App
