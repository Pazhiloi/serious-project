import { UserRole, getUserAuthData, getUserRoles } from '@/entities/User'
import { useSelector } from 'react-redux'
import { useLocation, Navigate } from 'react-router-dom'
import { useMemo } from 'react'
import { getRouteMain, getRouteForbidden } from '@/shared/const/router'
interface RequireAuthProps {
  children: JSX.Element
  roles?: UserRole[]
}

function RequireAuth({ children, roles }: RequireAuthProps) {
  const auth = useSelector(getUserAuthData)
  const location = useLocation()
  const userRoles = useSelector(getUserRoles)

  const hasRequiredRoles = useMemo(() => {
    if (!roles) {
      return true
    }

    return roles.some((requiredRole) => {
      const hasRole = userRoles?.includes(requiredRole)
      return hasRole
    })
  }, [roles, userRoles])

  if (!auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={getRouteMain()} state={{ from: location }} replace />
  }

  if (!hasRequiredRoles) {
    return <Navigate to={getRouteForbidden()} state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth