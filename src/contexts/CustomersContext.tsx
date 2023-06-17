import { PropsWithChildren, createContext, useState } from 'react'
import { DatabaseTables, supabase } from '../supabase/config/supabaseClient'

interface CustomersContextProps {
  isLoading: boolean
  getCustomers: () => void
  createCustomer: () => void
  //   setAccessToken: Dispatch<SetStateAction<string | undefined>>
}

const CustomersContext = createContext<CustomersContextProps>({
  getCustomers: () => null,
  createCustomer: () => null,
  isLoading: true
  //   setAccessToken: () => null
})

const CustomersProvider = (props: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false)
  const [customers, setCustomers] = useState([])

  const getCustomers = async () => {
    const { data, error } = await supabase
      .from(DatabaseTables.Customers)
      .select()
    if (data) {
      //   console.log(data)
    }
  }

  const createCustomer = async () => {
    const { error } = await supabase
      .from(DatabaseTables.Customers)
      .insert({
        // user_id: '69bf68e2-55b6-47d3-af31-b25ac2c14498',
        name: 'Nisa',
        phone: '+95648422',
        group: 'hiphop',
        last_payment_date: 'yesterday',
        next_payment_date: 'tomorrow',
        payment: '300'
      })
      .select()

    console.log(error)
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
