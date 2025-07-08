import { useMutation } from '@tanstack/vue-query'
import Cookies from 'js-cookie'
import Api from '../../services/api'

interface UserRequest {
  name: string
  username: string
  email: string
  password?: string
}

export const useUserUpdate = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: Number; data: UserRequest }) => {
      const token = Cookies.get('token')
      const response = await Api.put(`/api/users/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    },
  })
}
