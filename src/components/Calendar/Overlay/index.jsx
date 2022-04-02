import { useDispatch, useSelector } from 'react-redux'
import { MdClose } from 'react-icons/md'

import { setOpenedOverlayType } from '../../../store/slices/appSlice'
import { EditTask } from './EditTask'
import { Task } from './Task'
import { List } from './List'

import './styles.scss'

export const Overlay = () => {
  const dispatch = useDispatch()

  const type = useSelector(state => state.app.openedOverlayType)
  const props = useSelector(state => state.app.overlayProps)

  const closeOverlay = () => {
    dispatch(setOpenedOverlayType(null))
  }

  return (
    <div className="overlay">
      <div className="overlayInner">
        <button className="closeButton button" onClick={closeOverlay}>
          <MdClose />
        </button>
        {type === 'task' && <EditTask {...props} />}
        {type === 'list' && <List {...props} />}
        {type === 'showTask' && <Task {...props} />}
      </div>
    </div>
  )
}
