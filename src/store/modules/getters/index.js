export const getToken = state => state.user.token
export const getPhone = state => state.user.phone
export const getUsername = state => state.user.username
export const getUID = state => state.user.uid
export const getPaperId = state => state.paper.paperId

export default {
  getToken,
  getPhone,
  getUsername,
  getUID,
  getPaperId
}
