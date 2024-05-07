import { Button, Input, Select } from '@/components/ui'
import { SET_QUESTION_LIST_OPTIONS } from '@/config/define'
import { SetQuestionSearchFormProps } from '@/types/teacher/setQuestion'
import { cx } from 'class-variance-authority'
import { ChangeEvent } from 'react'

const SearchForm = (props: SetQuestionSearchFormProps) => {
  const { dataSearch, setDataSearch, onReset, onSearch, className } = props

  const changeDataSearch = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setDataSearch({
      ...dataSearch,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form className={cx('space-y-4', className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 text-sm">
        <Input
          label="Tên"
          placeholder="Tên"
          name="title"
          value={dataSearch?.title ?? ''}
          onChange={changeDataSearch}
          autoComplete="off"
        />
        <Select
          label="Trạng thái"
          name="status"
          zeroValueText="Tất cả trạng thái"
          options={SET_QUESTION_LIST_OPTIONS}
          value={dataSearch?.status ?? ''}
          onChange={changeDataSearch}
        />
      </div>
      <div className="flex justify-center gap-4">
        <Button type="button" onClick={onReset}>
          <i className="fa-regular fa-rotate-right"></i>
          <span>Làm mới</span>
        </Button>
        <Button type="button" onClick={onSearch}>
          <i className="fa-regular fa-magnifying-glass"></i>
          <span>Tìm kiếm</span>
        </Button>
      </div>
    </form>
  )
}

export default SearchForm
