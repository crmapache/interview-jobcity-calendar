export const isPast = date => {
  const currentDate = new Date()

  return date < new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
}

export const isToday = date => {
  const currentDate = new Date()

  return (
    new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() ===
    new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime()
  )
}

export const addLeadZero = n => {
  return n < 10 ? `0${n}` : `${n}`
}
