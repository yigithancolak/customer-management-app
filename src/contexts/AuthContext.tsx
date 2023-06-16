import { PropsWithChildren, createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { supabase } from '../supabase/config/supabaseClient'

interface AccountContextProps {
  isLoading: boolean
  accessToken: string | undefined
  getSession: () => void
  signOut: () => void
  signIn: (email: string, password: string) => void
  //   setAccessToken: Dispatch<SetStateAction<string | undefined>>
}

const AuthContext = createContext<AccountContextProps>({
  getSession: async () => null,
  signOut: async () => null,
  signIn: async () => null,
  accessToken: '',
  isLoading: true
  //   setAccessToken: () => null
})

const AuthProvider = (props: PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState<string | undefined>('')
  const [isLoading, setIsLoading] = useState(true)

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      toast.error('Sign In Error')
    }

    if (data) {
      setAccessToken(data.session?.access_token)
      toast.success('Login successful')
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      toast.error('Signout failed')
      return
    }

    toast.error('Signout successfull')
    setAccessToken('')
  }

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    setIsLoading(true)

    if (error) {
      setIsLoading(false)
      setAccessToken('')
      return
    }

    console.log(data?.session?.user.user_metadata.company_name)

    setAccessToken(data?.session?.access_token)
    setIsLoading(false)
  }

  useEffect(() => {
    getSession()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        getSession,
        isLoading,
        signOut,
        signIn
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
