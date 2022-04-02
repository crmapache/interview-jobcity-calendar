import { useDispatch } from 'react-redux'

import { TaskListElement } from './TaskListElement'
import { setOpenedOverlayType, setOverlayProps } from '../../../../store/slices/appSlice'

import './styles.scss'

export const List = props => {
  const dispatch = useDispatch()

  const taskClickHandler = task => () => {
    dispatch(setOpenedOverlayType('showTask'))
    dispatch(setOverlayProps({ task, date: props.date }))
  }

  return (
    <div className="list">
      {props.tasks.map((task, i) => (
        <TaskListElement i={i} task={task} taskClickHandler={taskClickHandler} key={task.id} />
      ))}
    </div>
  )
}
