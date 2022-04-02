import { useDispatch } from 'react-redux'
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from 'react-icons/bs'

import { MONTHS } from '../constants'
import { setMonth, setYear } from '../../../store/slices/appSlice'

import './styles.scss'

export const Header = ({ month, year }) => {
  const dispatch = useDispatch()

  const prevYear = () => {
    dispatch(setYear(year - 1))
  }

  const nextYear = () => {
    dispatch(setYear(year + 1))
  }

  const prevMonth = () => {
    let newValue = month - 1

    if (newValue < 0) {
      newValue = 11
      dispatch(setYear(year - 1))
    }

    dispatch(setMonth(newValue))
  }

  const nextMonth = () => {
    let newValue = month + 1

    if (newValue > 11) {
      newValue = 0
      dispatch(setYear(year + 1))
    }

    dispatch(setMonth(newValue))
  }

  return (
    <div className="headerWrap">
      <div>
        <button className="button" onClick={prevYear}>
          <BsChevronDoubleLeft />
        </button>
        <button className="button" onClick={prevMonth}>
          <BsChevronLeft />
        </button>
      </div>
      <div className="dateTitleWrap">
        <div className="year">{year}</div>
        <div className="month">{MONTHS[month]}</div>
      </div>
      <div>
        <button className="button" onClick={nextMonth}>
          <BsChevronRight />
        </button>
        <button className="button" onClick={nextYear}>
          <BsChevronDoubleRight />
        </button>
      </div>
    </div>
  )
}
