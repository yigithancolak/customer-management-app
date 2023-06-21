import { PropsWithChildren, createContext, useState } from 'react'
import { CreateCustomerFormProps } from '../pages/CreateCustomer/CreateCustomer'
import { DatabaseTables, supabase } from '../supabase/config/supabaseClient'
import { Database } from '../supabase/types'
import { useAuth } from '../utils/hooks/useAuth'

interface CustomersContextProps {
  isLoading: boolean
  getCustomers: () => Promise<Customers[]>
  getFilteredCustomers: (group: string) => Promise<Customers[]>
  createCustomer: (payload: CreateCustomerFormProps) => void
  deleteCustomer: (id: number) => void
  updateCustomer: (
    id: string | undefined,
    payload: CreateCustomerFormProps
  ) => void
  getCustomerData: (id: string | undefined) => Promise<Customers>
  getGroups: () => Promise<GroupsTypes[]>
  createGroup: (group_name: string) => void
  deleteGroup: (id: string) => void
  //   setAccessToken: Dispatch<SetStateAction<string | undefined>>
}

export type Customers = Database['public']['Tables']['Customers']['Row']
export type GroupsTypes = Database['public']['Tables']['Groups']['Row']

const CustomersContext = createContext<CustomersContextProps>({
  getCustomers: () => Promise.resolve([]),
  getFilteredCustomers: () => Promise.resolve([]),
  createCustomer: () => null,
  deleteCustomer: () => null,
  updateCustomer: () => null,
  getCustomerData: () =>
    Promise.resolve({
      created_at: '',
      group: null,
      id: 0,
      last_payment_date: null,
      name: '',
      next_payment_date: null,
      payment: null,
      phone: '',
      user_id: ''
    }),
  getGroups: () => Promise.resolve([]),
  createGroup: () => null,
  deleteGroup: () => null,
  isLoading: true
  //   setAccessToken: () => null
})

const CustomersProvider = (props: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false)
  // const [customers, setCustomers] = useState([])

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

  const getFilteredCustomers = async (group: string) => {
    const { data, error } = await supabase
      .from(DatabaseTables.Customers)
      .select()
      .eq('group', group)

    if (error) {
      throw error
    }

    return data
  }

  const createCustomer = async (payload: CreateCustomerFormProps) => {
    const { error } = await supabase
      .from(DatabaseTables.Customers)
      .insert({
        user_id: user?.id ?? '',
        ...payload
      })
      .select()

    if (error) {
      console.log(error)
    }
  }

  const deleteCustomer = async (id: number) => {
    const { error, data } = await supabase
      .from(DatabaseTables.Customers)
      .delete()
      .eq('id', id)

    if (error) {
      console.log(error)
    }
  }

  const updateCustomer = async (
    id: string | undefined,
    payload: CreateCustomerFormProps
  ) => {
    const { error } = await supabase
      .from(DatabaseTables.Customers)
      .update({ ...payload, user_id: user?.id ?? '' })
      .eq('id', id)

    if (error) {
      console.log(error)
    }
  }

  const getCustomerData = async (id: string | undefined) => {
    const { data, error } = await supabase
      .from(DatabaseTables.Customers)
      .select()
      .eq('id', Number(id))

    if (error) {
      throw error
    }
    console.log(data[0])

    return data[0]
  }

  //GROUPS

  const getGroups = async () => {
    const { data, error } = await supabase.from(DatabaseTables.Groups).select()
    if (error) {
      throw error
    }

    console.log(data)

    return data
  }

  const createGroup = async (group_name: string) => {
    const { error } = await supabase
      .from(DatabaseTables.Groups)
      .insert({
        user_id: user?.id ?? '',
        group_name
      })
      .select()

    if (error) {
      console.log(error)
    }
  }

  const deleteGroup = async (groupName: string) => {
    const { error } = await supabase
      .from(DatabaseTables.Groups)
      .delete()
      .eq('group_name', groupName)

    if (error) {
      console.log(error)
    }
  }

  return (
    <CustomersContext.Provider
      value={{
        getCustomers,
        getFilteredCustomers,
        isLoading,
        createCustomer,
        deleteCustomer,
        updateCustomer,
        getCustomerData,
        getGroups,
        createGroup,
        deleteGroup
      }}
    >
      {props.children}
    </CustomersContext.Provider>
  )
}

export { CustomersContext, CustomersProvider }
