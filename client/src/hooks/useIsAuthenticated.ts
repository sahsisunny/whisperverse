import { useGetSelfQuery } from '@/app/services/userApi'

export const useIsAuthenticated = () => {
   const { data, isLoading, isError } = useGetSelfQuery()
   const isLoggedin = !isLoading && !isError
   return { isLoggedin, data, isLoading, isError }
}
