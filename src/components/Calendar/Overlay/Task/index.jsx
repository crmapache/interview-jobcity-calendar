import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BiLoader } from 'react-icons/bi'
import { Button } from '@mui/material'

import { addLeadZero } from '../../utils'

import {
  deleteTask,
  setOpenedOverlayType,
  setOverlayProps,
} from '../../../../store/slices/appSlice'

import './styles.scss'

export const Task = props => {
  const dispatch = useDispatch()

  const [weatherIconName, setWeatherIconName] = useState(null)

  const date = new Date(...props.date)

  const dateTimeTitle = `${addLeadZero(date.getDate())}.${addLeadZero(
    date.getMonth() + 1,
  )}.${addLeadZero(date.getFullYear())}`

  const editButtonHandler = () => {
    dispatch(
      setOverlayProps({
        key: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
        month: date.getMonth(),
        date: date.getDate(),
        year: date.getFullYear(),
        ...props.task,
      }),
    )
    dispatch(setOpenedOverlayType('task'))
  }

  const deleteButtonHandler = () => {
    dispatch(
      deleteTask({
        key: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
        id: props.task.id,
      }),
    )
  }

  useEffect(async () => {
    const dateForRequest = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${props.task.city}/${dateForRequest}/${dateForRequest}?unitGroup=metric&key=3ACJZXXBMHNFWLLT4N2TSF7VG&contentType=json`,
    )
      .then(response => response.json())
      .then(data => setWeatherIconName(data.days[0].icon))
      .catch(() => {
        setWeatherIconName('clear-day')
      })
  }, [])

  return (
    <div className="taskCard">
      <div className="content">
        <div className="dateTimeTitle">
          {dateTimeTitle} in {props.task.time}
        </div>
        <div className="city">{props.task.city}</div>
        <div className="title">{props.task.title}</div>
        <div className="weatherIconWrap">
          {weatherIconName ? (
            <img src={`/icons/${weatherIconName}.png`} alt="icon" />
          ) : (
            <BiLoader className="weatherPreloader" />
          )}
        </div>
      </div>
      <div className="footer">
        <Button variant="contained" onClick={editButtonHandler}>
          Edit
        </Button>
        <Button variant="contained" onClick={deleteButtonHandler} color="error">
          Delete
        </Button>
      </div>
    </div>
  )
}
