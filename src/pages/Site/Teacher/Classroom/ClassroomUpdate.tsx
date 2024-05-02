import { useEffect } from 'react'
import { ROUTES_SITE } from '@/config/routes'
import { useLoading } from '@/contexts/loading'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import useHandleError from '@/hooks/useHandleError'
import classroomService from '@/services/site/teacher/classroomService'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, Toast } from '@/components/ui'
import { CLASSROOM_STATUS_LIST_OPTIONS } from '@/config/define'
import Header from './Header'

function ClassroomUpdate() {
  const { id } = useParams()
  const { setSidebarActive } = useSidebarActive()
  const { showLoading, hideLoading } = useLoading()
  const { handleResponseError } = useHandleError()
  const statusList = CLASSROOM_STATUS_LIST_OPTIONS
  const { control, reset, handleSubmit } = useForm({
    defaultValues: {},
  })

  const fetchClassroom = () => {
    showLoading()
    classroomService
      .show(id)
      .then(({ data }) => {
        reset(data)
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const fetchUpdateClassroom = (data: any) => {
    showLoading()
    classroomService
      .update(id, data)
      .then(() => {
        Toast.success('Cập nhật thành công')
        debouncedFetchClassroom()
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const hanldSubmitUpdate = handleSubmit((data: any) => {
    const dataUpdate = {
      name: data.name,
      status: data.status,
      description: data.description,
    }
    fetchUpdateClassroom(dataUpdate)
  })

  const debouncedFetchClassroom = useDebouncedCallback(fetchClassroom)

  useEffect(() => {
    setSidebarActive(ROUTES_SITE.TEACHER.CLASSROOM.INDEX)
    debouncedFetchClassroom()
  }, [])

  return (
    <div className="space-y-8">
      <Header />
      <h1 className="text-3xl text-foreground">Chỉnh sửa thông tin lớp học</h1>
      <div className="bg-card rounded p-5 shadow space-y-6">
        <form onSubmit={hanldSubmitUpdate}>
          <div className="mt-4">
            <label className="text-black">Tên</label>
            <Input
              className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1 mt-1"
              placeholder="Tên"
              type="text"
              name="name"
              control={control}
            />
          </div>
          <div className="mt-4">
            <label className="text-black">Trạng thái</label>
            <Select options={statusList} name="status" control={control} />
          </div>
          <div className="mt-4">
            <label className="text-black">Mô tả</label>
            <Input
              className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1 mt-1"
              placeholder="Mô tả"
              type="text"
              name="description"
              control={control}
            />
          </div>
          <div className="mt-4">
            <Button type="submit">Cập nhật</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ClassroomUpdate
