import React, { useEffect } from 'react'
import { Calendar } from '../components/Calendar'
import { useDispatch } from 'react-redux'
import { setMonth, setYear } from '../store/slices/appSlice'

export function CalendarPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    const date = new Date()
    dispatch(setMonth(date.getMonth()))
    dispatch(setYear(date.getFullYear()))
  }, [])

  return (
    <div className="calendar-page">
      <Calendar />
    </div>
  )
}
