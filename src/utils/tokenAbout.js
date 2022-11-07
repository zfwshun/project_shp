export const tokenAbout = function (token) {
  localStorage.setItem('TOKEN', token)
}
export const getToken = function () {
  return localStorage.getItem('TOKEN')
}
export const removeToken = function () {
  localStorage.removeItem('TOKEN')
}
