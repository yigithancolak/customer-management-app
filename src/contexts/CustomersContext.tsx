import { PropsWithChildren, createContext, useState } from 'react'
import { CreateCustomerFormProps } from '../pages/CreateCustomer/CreateCustomer'
import { DatabaseTables, supabase } from '../supabase/config/supabaseClient'
import { Database } from '../supabase/types'
import { useAuth } from '../utils/hooks/useAuth'

interface CustomersContextProps {
  isLoading: boolean
  getCustomers: () => Promise<Customers[]>
  createCustomer: (payload: CreateCustomerFormProps) => void
  //   setAccessToken: Dispatch<SetStateAction<string | undefined>>
}

export type Customers = Database['public']['Tables']['Customers']['Row']

const CustomersContext = createContext<CustomersContextProps>({
  getCustomers: () => Promise.resolve([]),
  createCustomer: () => null,
  isLoading: true
  //   setAccessToken: () => null
})

const CustomersProvider = (props: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false)
  const [customers, setCustomers] = useState([])

  const { user } = useAuth()

  const getCustomers = async () => {
    const { data, error } = await supabase
      .from(DatabaseTables.Customers)
      .select()
    if (error) {
      throw error
    }

    return data
  }

  const createCustomer = async (payload: CreateCustomerFormProps) => {
    const {
      name,
      phone,
      group,
      last_payment_date,
      next_payment_date,
      payment
    } = payload
    const { error } = await supabase
      .from(DatabaseTables.Customers)
      .insert({
        user_id: user?.id ?? '',
        name,
        phone,
        group,
        last_payment_date,
        next_payment_date,
        payment
      })
      .select()

    if (error) {
      console.log(error)
    }
  }

  return (
    <CustomersContext.Provider
      value={{
        getCustomers,
        isLoading,
        createCustomer
      }}
    >
      {props.children}
    </CustomersContext.Provider>
  )
}

export { CustomersContext, CustomersProvider }
