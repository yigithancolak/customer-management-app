import * as dayjs from 'dayjs'

export const calculateIsAfter = (nextPayment: string | null) => {
  const isAfter = dayjs(new Date()).isAfter(dayjs(nextPayment))
  return isAfter
}
