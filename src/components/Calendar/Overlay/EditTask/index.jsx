import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'

import { CITIES, MONTHS } from '../../constants'
import { addLeadZero } from '../../utils'
import { addNewTask, updateTask } from '../../../../store/slices/appSlice'

import './styles.scss'

export const EditTask = props => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState(props.title || '')
  const [city, setCity] = useState(props.city || CITIES[0])
  const [hours, setHours] = useState(props.time?.split(':')[0] || '00')
  const [minutes, setMinutes] = useState(props.time?.split(':')[1] || '00')

  const titleInputHandler = event => {
    setTitle(event.target.value)
  }

  const cityInputHandler = event => {
    setCity(event.target.value)
  }

  const hoursInputHandler = event => {
    setHours(event.target.value)
  }

  const minutesInputHandler = event => {
    setMinutes(event.target.value)
  }

  const saveButtonHandler = () => {
    if (props.id) {
      dispatch(
        updateTask({
          key: `${props.date}-${props.month}-${props.year}`,
          task: { id: props.id, time: `${hours}:${minutes}`, title, city },
        }),
      )
    } else {
      dispatch(
        addNewTask({
          key: `${props.date}-${props.month}-${props.year}`,
          task: { id: Date.now(), time: `${hours}:${minutes}`, title, city },
        }),
      )
    }
  }

  return (
    <div className="newTask">
      <div>
        <div className="header">
          {MONTHS[props.month]} {props.date}
        </div>
        <div className="content">
          <div className="inputWrapper">
            <TextField
              label="Title"
              variant="outlined"
              size="small"
              fullWidth
              value={title}
              onChange={titleInputHandler}
              inputProps={{ maxLength: 30 }}
            />
          </div>
          <div className="inputWrapper">
            <FormControl size="small" fullWidth>
              <InputLabel>City</InputLabel>
              <Select value={city} label="City" onChange={cityInputHandler}>
                {CITIES.map(city => (
                  <MenuItem value={city} key={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="inputWrapper">
            <FormControl size="small">
              <InputLabel>Hours</InputLabel>
              <Select value={hours} label="Hours" onChange={hoursInputHandler}>
                {[...Array(24)].map((__, i) => (
                  <MenuItem value={addLeadZero(i)} key={i}>
                    {addLeadZero(i)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small">
              <InputLabel>Minutes</InputLabel>
              <Select value={minutes} label="Minutes" onChange={minutesInputHandler}>
                {[...Array(60)].map((__, i) => (
                  <MenuItem value={addLeadZero(i)} key={i}>
                    {addLeadZero(i)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>

      <div className="footer">
        <Button variant="contained" onClick={saveButtonHandler} disabled={title.trim() === ''}>
          Save
        </Button>
      </div>
    </div>
  )
}
