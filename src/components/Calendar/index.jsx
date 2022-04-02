import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Header } from './Header'
import { DAYS } from './constants'
import { Cell } from './Cell'
import { Overlay } from './Overlay'
import { setTasks } from '../../store/slices/appSlice'

import './styles.scss'

export const Calendar = () => {
  const dispatch = useDispatch()

  const month = useSelector(state => state.app.month)
  const year = useSelector(state => state.app.year)
  const isOverlayOpen = !!useSelector(state => state.app.openedOverlayType)

  const tasks = useSelector(state => state.app.tasks)

  useEffect(() => {
    const loadedTasks = JSON.parse(window.localStorage.getItem('tasks')) || {}
    dispatch(setTasks(loadedTasks))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <div className="calendarWrap">
      <Header month={month} year={year} />
      <div className="dayTitlesWrap">
        {DAYS.map(dayTitle => (
          <div className="dayTitle" key={dayTitle}>
            {dayTitle}
          </div>
        ))}
      </div>
      <div className="calendar">
        {[...Array(42)].map((__, i) => (
          <Cell n={i} year={year} month={month} key={i} />
        ))}
        {isOverlayOpen && <Overlay />}
      </div>
    </div>
  )
}
