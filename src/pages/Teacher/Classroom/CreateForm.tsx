import { Button, Input, Select, Toast } from '@/components/ui'
import {
  CLASSROOM_STATUS_LIST_OPTIONS,
  CLASSROOM_STATUS_TEACHER_CREATE_LIST_OPTIONS,
} from '@/config/define'
import useHandleError from '@/hooks/useHandleError'
import classroomService from '@/services/teacher/classroomService'
import { SubmitHandler, useForm } from 'react-hook-form'
import { setErrorForInput } from '@/utils/handleErrors'

const defaultValue = {
  name: '',
  status: CLASSROOM_STATUS_LIST_OPTIONS[0],
  description: '',
}
const CreateForm = (props: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    defaultValues: defaultValue,
  })
  const { showLoading, hideLoading, debouncedFetchClassrooms, setOpenFormAdd, dataSearch } = props
  const { handleResponseError } = useHandleError()
  const createClassroom: SubmitHandler<any> = data => {
    data = {
      ...data,
      status: data.status.value,
    }
    showLoading()
    classroomService
      .create(data)
      .then(() => {
        Toast.success('Tạo lớp học thành công')
        reset(defaultValue)
        debouncedFetchClassrooms(dataSearch)
        setOpenFormAdd(false)
      })
      .catch((err: any) => {
        if (err.response.status == 422) {
          setErrorForInput(err, setError)
        }
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }
  const { name: nameError, status: statusError, description: descriptionError } = errors
  return (
    <form onSubmit={handleSubmit(createClassroom)}>
      <div className="mt-4">
        <label className="text-black">Tên lớp</label>
        <Input
          className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1 mt-1"
          placeholder="Tên lớp"
          type="text"
          name="name"
          control={control}
          error={nameError}
        />
      </div>
      <div className="mt-4">
        <Select
          label="Trạng thái"
          name="status"
          options={CLASSROOM_STATUS_TEACHER_CREATE_LIST_OPTIONS}
          error={statusError}
        />
      </div>
      <div className="mt-4">
        <label className="text-black">Mô tả</label>
        <Input
          className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1 mt-1"
          placeholder="Mô tả"
          type="text"
          name="description"
          control={control}
          error={descriptionError}
        />
      </div>
      <div className="mt-4">
        <Button type="submit">Tạo mới</Button>
      </div>
    </form>
  )
}

export default CreateForm
