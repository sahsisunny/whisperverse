import { fetchSelfData } from "@/utils/fetchSelfData"

export const useIsAuthenticated =async  () => {
   const data = await fetchSelfData()
   const isLoggedin = data?.username ? true : false
   return { isLoggedin, data }
}
