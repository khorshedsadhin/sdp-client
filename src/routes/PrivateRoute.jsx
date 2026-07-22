import { Navigate } from 'react-router'
import useAuth from '../hooks/useAuth'
import LoadingSpinner from '../components/Shared/LoadingSpinner'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) return <LoadingSpinner />
  if (user) return children
  return <Navigate to='/login' replace />
}

export default PrivateRoute