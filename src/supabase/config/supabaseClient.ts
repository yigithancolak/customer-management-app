import { createClient } from '@supabase/supabase-js'
import { Database } from '../types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export enum DatabaseTables {
  Customers = 'Customers'
}
