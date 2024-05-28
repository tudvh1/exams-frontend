import { TSortOrder } from '../table'

export type TExam = {
  id: number | null
  status: string | null
  question_id: string | null
  start_date: string | null
  end_date: string | null
  show_result: boolean | null
}

export type QuestionSearchParams = {
  question: string | null
  status: string | null
  type: string | null
  is_testing: boolean | null
  page?: number | null
} & TSortOrder

export type QuestionSearchFormProps = {
  dataSearch?: QuestionSearchParams
  setDataSearch: (value: any) => void
  onReset?: () => void
  onSearch?: () => void
  className?: string | null
}
