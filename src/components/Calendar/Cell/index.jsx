import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdPlaylistAdd } from 'react-icons/md'

import { isPast, isToday } from '../utils'
import { setOpenedOverlayType, setOverlayProps } from '../../../store/slices/appSlice'
import { TaskListElement } from '../Overlay/List/TaskListElement'

import './styles.scss'

export const Cell = ({ n, month, year }) => {
  const dispatch = useDispatch()

  const startDay = new Date(year, month, 1).getDay()
  const calculatedDate = n + 2 - startDay
  const lastDateInMonth = new Date(year, month + 1, 0).getDate()
  const dateForTargetDate = new Date(year, month, calculatedDate)
  const date = new Date(year, month, calculatedDate).getDate()

  const taskKey = `${dateForTargetDate.getDate()}-${dateForTargetDate.getMonth()}-${dateForTargetDate.getFullYear()}`
  const tasks = useSelector(state => state.app.tasks[taskKey]) || []

  const classes = useMemo(() => {
    const newClasses = ['cell']

    const isWeekend = [6, 0].includes(new Date(year, month, calculatedDate).getDay())

    if (calculatedDate > 0 && calculatedDate <= lastDateInMonth) {
      newClasses.push('active')
    }

    if (isWeekend) {
      newClasses.push('weekend')
    }

    if (isToday(new Date(year, month, calculatedDate))) {
      newClasses.push('current')
    }

    return newClasses.join(' ')
  }, [year, month, startDay, lastDateInMonth])

  const sortedTasks = useMemo(() => {
    return tasks
      .slice()
      .sort((a, b) => new Date(`${taskKey} ${a.time}`) - new Date(`${taskKey} ${b.time}`))
  }, [tasks, taskKey])

  const tasksToShowInCell = sortedTasks.slice(0, 3)
  const tasksLeftToShow = sortedTasks.slice(3).length

  const isThePastDate = isPast(new Date(year, month, calculatedDate))

  const addNewTaskButtonHandler = () => {
    const date = new Date(year, month, calculatedDate)

    dispatch(
      setOverlayProps({ month: date.getMonth(), date: date.getDate(), year: date.getFullYear() }),
    )
    dispatch(setOpenedOverlayType('task'))
  }

  const showMoreTasksButtonHandler = () => {
    dispatch(setOpenedOverlayType('list'))
    dispatch(setOverlayProps({ tasks, date: [year, month, calculatedDate] }))
  }

  const taskClickHandler = task => () => {
    dispatch(setOpenedOverlayType('showTask'))
    dispatch(setOverlayProps({ task, date: [year, month, calculatedDate] }))
  }

  return (
    <div className={classes}>
      <div className="dateTitle">{date}</div>
      <div className="tasksWrap">
        {tasksToShowInCell.map((task, i) => (
          <TaskListElement i={i} task={task} taskClickHandler={taskClickHandler} key={task.id} />
        ))}
      </div>
      {!!tasksLeftToShow && (
        <button className="showMoreTasksButton button" onClick={showMoreTasksButtonHandler}>
          Show more {tasksLeftToShow}
        </button>
      )}
      {!isThePastDate && (
        <button className="addNewTaskButton button" onClick={addNewTaskButtonHandler}>
          <MdPlaylistAdd />
        </button>
      )}
    </div>
  )
}
