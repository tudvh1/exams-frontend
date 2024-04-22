import { Button, Input, Modal, Toast } from '@/components/ui'
import { TeacherStatus } from '@/config/define'
import { useLoading } from '@/contexts/loading'
import teacherService from '@/services/admin/teacherService'
import useHandleError from '@/hooks/useHandleError'
import { useState } from 'react'
import { UpdateTeacherStatusPayloads } from '@/types/admin'
import { SubmitHandler, useForm } from 'react-hook-form'
import { setErrorForInput } from '@/utils/handleErrors'

const defaultValues: UpdateTeacherStatusPayloads = {
  reason: '',
}

const TeacherAction = (props: any) => {
  const {
    buttonClassName,
    buttonText,
    modalTitle,
    modalDescription,
    showModal,
    setShowModal,
    onSubmit,
    reset,
    defaultValues,
    control,
    reasonError,
  } = props

  return (
    <>
      <Button className={buttonClassName} onClick={() => setShowModal(true)}>
        {buttonText}
      </Button>
      <Modal
        show={showModal}
        close={() => {
          setShowModal(false)
        }}
        afterLeave={() => {
          reset(defaultValues)
        }}
      >
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="mb-8">
            <h1 className="text-3xl font-medium text-center text-foreground">{modalTitle}</h1>
            <p className="!mt-0 text-center text-sm font-light text-foreground">
              {modalDescription}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Input
              placeholder="Lý do"
              label="Lý do"
              name="reason"
              control={control}
              error={reasonError}
              autoComplete="off"
            />
            <Button>Xác nhận</Button>
          </div>
        </form>
      </Modal>
    </>
  )
}

function UpdateStatus(props: any) {
  const { teacher, currentPage, fetchTeachers } = props
  const { showLoading, hideLoading } = useLoading()
  const { handleResponseError } = useHandleError()
  const [isShowConfirmBanTeacherModal, setIsShowConfirmBanTeacherModal] = useState(false)
  const [isShowConfirmUnBanTeacherModal, setIsShowConfirmUnBanTeacherModal] = useState(false)

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  })
  const { reason: reasonError } = errors

  const banTeacher: SubmitHandler<UpdateTeacherStatusPayloads> = fields => {
    showLoading()
    teacherService
      .ban(teacher.id, fields)
      .then(() => {
        Toast.success('Cấm giáo viên thành công')
        fetchTeachers({ page: currentPage })
        setIsShowConfirmBanTeacherModal(false)
        reset(defaultValues)
      })
      .catch((err: any) => {
        setErrorForInput(err, setError)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const unBanTeacher: SubmitHandler<UpdateTeacherStatusPayloads> = fields => {
    showLoading()
    teacherService
      .unBan(teacher.id, fields)
      .then(() => {
        Toast.success('Ân xá giáo viên thành công')
        fetchTeachers({ page: currentPage })
        setIsShowConfirmUnBanTeacherModal(false)
        reset(defaultValues)
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  switch (teacher.status) {
    case TeacherStatus.Active:
      return (
        <TeacherAction
          buttonClassName="bg-red-600 hover:bg-red-600/90"
          buttonText={<i className="fa-solid fa-ban"></i>}
          modalTitle="Bạn có chắc muốn cấm giáo viên này?"
          modalDescription="Nếu bạn muốn cấm giáo viên này. Vui lòng ghi lý do ở dưới"
          showModal={isShowConfirmBanTeacherModal}
          setShowModal={setIsShowConfirmBanTeacherModal}
          onSubmit={handleSubmit(banTeacher)}
          reset={reset}
          defaultValues={defaultValues}
          control={control}
          reasonError={reasonError}
        />
      )
    case TeacherStatus.AdminBlock:
      return (
        <TeacherAction
          buttonText={<i className="fa-solid fa-unlock"></i>}
          modalTitle="Bạn có chắc muốn ân xá giáo viên này?"
          modalDescription="Nếu bạn muốn ân xá giáo viên này. Vui lòng ghi lý do ở dưới"
          showModal={isShowConfirmUnBanTeacherModal}
          setShowModal={setIsShowConfirmUnBanTeacherModal}
          onSubmit={handleSubmit(unBanTeacher)}
          reset={reset}
          defaultValues={defaultValues}
          control={control}
          reasonError={reasonError}
        />
      )
  }
}

export default UpdateStatus
