import { User } from '@supabase/supabase-js'
import { PropsWithChildren, createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { supabase } from '../supabase/config/supabaseClient'

interface AuthContextProps {
  isLoading: boolean
  user: User | null
  signOut: () => void
  signIn: (email: string, password: string) => void
  signUp: (email: string, password: string, companyName: string) => void
}

const AuthContext = createContext<AuthContextProps>({
  signOut: async () => null,
  signIn: async () => null,
  signUp: async () => null,
  user: null,
  isLoading: true
})

const AuthProvider = (props: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const signUp = async (
    email: string,
    password: string,
    companyName: string
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          company_name: companyName
        }
      }
    })

    if (error) {
      toast.error('Signup Error')
    }

    if (data) {
      toast.success('Confirm your email and login')
    }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      toast.error('Sign In Error')
    }

    if (data) {
      toast.success('Login successful')
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      toast.error('Signout failed')
      return
    }

    toast.success('Signout successful')
  }

  const getSession = async () => {
    const {
      data: { user: currentUser }
    } = await supabase.auth.getUser()

    setIsLoading(false)
    setUser(currentUser ?? null)
  }

  useEffect(() => {
    getSession()

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user ?? null)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
      }
    })
    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signOut,
        signIn,
        signUp
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
