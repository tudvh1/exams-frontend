import { useEffect, useMemo, useState } from 'react'
import { AuthContext } from '@/contexts/authAdmin'
import authService from '@/services/admin/authService'
import state from '@/utils/localStorage'
import apiClient from '@/services/admin'
import { AuthProviderProps, LoginPayloads } from '@/types'

const AuthAdminProvider = (props: AuthProviderProps) => {
  const { children } = props
  const [authToken, setAuthToken] = useState(state.getState('access_token_admin'))
  const [authProfile, setAuthProfile] = useState(state.getState('user_profile_admin'))

  // Login
  const authLogin = async (data: LoginPayloads) => {
    try {
      const response = await authService.login(data)
      setAuthToken(response.access_token)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  // Logout
  const authLogout = async () => {
    try {
      await authService.logout()
      authRemove()
    } catch (err) {
      return Promise.reject(err)
    }
  }

  // Get profile
  const getProfile = async () => {
    try {
      const response = await authService.getProfile()
      setAuthProfile(response)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  // Remove token
  const authRemove = () => {
    setAuthToken(null)
    setAuthProfile(null)
  }

  // Auto remove authToken when authToken invalid
  useEffect(() => {
    const interceptor = apiClient.interceptors.response.use(
      response => response,
      error => {
        const errorStatus = error.status ?? error.response?.status
        if (errorStatus === 401) {
          authRemove()
        }
        return Promise.reject(error)
      },
    )

    return () => {
      apiClient.interceptors.response.eject(interceptor)
    }
  }, [])

  useEffect(() => {
    if (authToken) {
      state.setState('access_token_admin', authToken)
      getProfile()
    } else {
      state.removeState('access_token_admin')
    }
  }, [authToken])

  useEffect(() => {
    if (authProfile) {
      state.setState('user_profile_admin', authProfile)
    } else {
      state.removeState('user_profile_admin')
    }
  }, [authProfile])

  const contextValue = useMemo(
    () => ({
      authToken,
      authProfile,
      authLogin,
      authLogout,
      authRemove,
    }),
    [authToken],
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export default AuthAdminProvider
