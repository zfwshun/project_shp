import { v4 as uuidv4 } from 'uuid'
// 获取uuid
export const getUUID = function () {
  const token = localStorage.getItem('UUIDTOKEN')
  if (token) {
    return token
  } else {
    localStorage.setItem('UUIDTOKEN', uuidv4())
    return localStorage.getItem('UUIDTOKEN')
  }
}
