import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'app',
  initialState: {
    month: 0,
    year: 0,
    tasks: {},
    openedOverlayType: null,
    overlayProps: {},
  },
  reducers: {
    setMonth: (state, { payload }) => {
      state.month = payload
    },
    setYear: (state, { payload }) => {
      state.year = payload
    },
    setTasks: (state, { payload }) => {
      state.tasks = payload
    },
    addNewTask: (state, { payload }) => {
      const tasks = state.tasks

      if (tasks[payload.key]) {
        tasks[payload.key].push(payload.task)
      } else {
        tasks[payload.key] = [payload.task]
      }

      state.tasks = tasks
      state.openedOverlayType = null
    },
    deleteTask: (state, { payload }) => {
      const tasks = state.tasks

      tasks[payload.key] = tasks[payload.key].filter(task => task.id !== payload.id)

      state.tasks = tasks
      state.openedOverlayType = null
    },
    updateTask: (state, { payload }) => {
      const tasks = state.tasks

      tasks[payload.key] = tasks[payload.key].map(task =>
        task.id === payload.task.id ? payload.task : task,
      )

      state.tasks = tasks
      state.openedOverlayType = null
    },
    setOpenedOverlayType: (state, { payload }) => {
      state.openedOverlayType = payload
    },
    setOverlayProps: (state, { payload }) => {
      state.overlayProps = payload
    },
  },
})

export const {
  setMonth,
  setYear,
  addNewTask,
  setOpenedOverlayType,
  setOverlayProps,
  deleteTask,
  updateTask,
  setTasks,
} = counterSlice.actions

export const appReducer = counterSlice.reducer
