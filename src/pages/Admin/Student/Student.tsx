import { useEffect, useState } from 'react'
import { DEFAULT_PAGINATION_OBJECT, TEACHER_STATUS_LIST_OPTIONS } from '@/config/define'
import { useLoading } from '@/contexts/loading'
import { useSidebarActive } from '@/contexts/sidebarActive'
import useHandleError from '@/hooks/useHandleError'
import { TSetPagination, TTableColumn } from '@/types'
import { TStudent } from '@/types/admin'
import { getValueFromObjectByKey } from '@/utils/helper'
import studentService from '@/services/admin/studentService'
import { setPaginationData } from '@/utils/pagination'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import { ROUTES_ADMIN } from '@/config/routes'
import { Table } from '@/components/ui'

// const defaultValueDataSearch: StudentSearchParams = {
//   id: null,
//   name: '',
//   email: '',
//   status: '',
//   sort_column: 'id',
//   sort_type: SORT_TYPE.DESC,
// }

function Student() {
  const { setSidebarActive } = useSidebarActive()
  const { showLoading, hideLoading } = useLoading()
  const { handleResponseError } = useHandleError()
  const [students, setStudents] = useState<TStudent[]>([])
  const [pagination, setPagination] = useState<TSetPagination>(DEFAULT_PAGINATION_OBJECT)
  //   const [dataSearch, setDataSearch] = useState(defaultValueDataSearch)

  const columns: TTableColumn[] = [
    {
      headerName: 'ID',
      field: 'id',
    },
    {
      headerName: 'Họ và tên lót',
      field: 'last_name',
    },
    {
      headerName: 'Tên',
      field: 'first_name',
    },
    {
      headerName: 'Ngày sinh',
      field: 'dob',
    },
    {
      headerName: 'Email',
      field: 'email',
    },
    {
      headerName: 'Trạng thái',
      field: 'status',
      valueGetter: row => {
        return getValueFromObjectByKey(TEACHER_STATUS_LIST_OPTIONS, 'value', row.status, 'name')
      },
    },
    {
      headerName: 'Hành động',
      field: 'action',
    },
  ]

  const fetchStudents = (params?: any) => {
    showLoading()
    studentService
      .getList(params)
      .then(({ data, meta }) => {
        setStudents(data)
        setPagination(setPaginationData(meta ?? DEFAULT_PAGINATION_OBJECT))
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }
  const debouncedFetchStudents = useDebouncedCallback(fetchStudents)

  const handleChangePage = (selected: number) => {
    setPagination({ ...pagination, currentPage: selected })
    fetchStudents({ page: selected })
  }

  //   const search = () => {
  //     debouncedFetchStudents({ ...dataSearch, page: 1 })
  //   }

  //   const resetDataSearch = () => {
  //     setDataSearch(defaultValueDataSearch)
  //     debouncedFetchStudents()
  //   }

  useEffect(() => {
    setSidebarActive(ROUTES_ADMIN.STUDENT)
    debouncedFetchStudents()
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl text-foreground">Danh sách học sinh</h1>
      <div className="bg-card rounded p-5 shadow space-y-6">
        <Table
          columns={columns}
          rows={students}
          pagination={pagination}
          handleChangePage={selected => handleChangePage(selected)}
        />
      </div>
    </div>
  )
}

export default Student
