import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

export const useLogout = (): (() => void) => {
  const router = useRouter()
  const logout = (): void => {
    Cookies.remove('token')
    Cookies.remove('user')

    router.push({ name: 'login' })
  }
  return logout
}
