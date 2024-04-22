import { StudentSearchParams } from '@/types/admin'
import apiClient from './index'

const studentService = {
  path: '/admin/students',
  async getList(params: StudentSearchParams) {
    const { data } = await apiClient.get(this.path, { params })
    return data
  },
}

export default studentService
