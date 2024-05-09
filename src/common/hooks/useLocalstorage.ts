export const getData = (key: string, defaultValue = null) => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key)
    if (!data) {
      return null
    } else {
      return data
    }
  }
}

export const setData = (key: string, data: any) => {
  localStorage.setItem(key, data)
}

export const removeData = (key: string) => {
  return new Promise((resolve: any) => {
    localStorage.removeItem(key)
    resolve()
  })
}
