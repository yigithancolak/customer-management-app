import { useContext } from 'react'
import { CustomersContext } from '../../contexts/CustomersContext'

export const useCustomers = () => {
  return useContext(CustomersContext)
}
