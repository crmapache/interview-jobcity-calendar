import './styles.scss'

export const TaskListElement = ({ i, taskClickHandler, task }) => {
  return (
    <div className="task" key={i} onClick={taskClickHandler(task)}>
      <div className="taskTime">{task.time}</div>
      <div className="taskTitle">{task.title}</div>
    </div>
  )
}
