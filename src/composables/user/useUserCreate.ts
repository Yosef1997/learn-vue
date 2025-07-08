import { useMutation } from '@tanstack/vue-query'
import Cookies from 'js-cookie'
import Api from '../../services/api'

interface UserRequest {
  name: string
  username: string
  email: string
  password: string
}

export const useUserCreate = () => {
  return useMutation({
    mutationFn: async (data: UserRequest) => {
      const token = Cookies.get('token')
      const response = await Api.post('/api/users', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    },
  })
}
