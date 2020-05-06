/**
 * 直接更新 state 的多个方法的对象
 */
import {
  SET_TOKEN,
  SET_AVATAR,
  SET_EMAIL,
  SET_INTRODUCTION,
  SET_NAME,
  SET_ROLES,
  SET_UID,
  SET_PHONE,
  SET_USERNAME
} from './../mutation-types'

export default {
  [SET_TOKEN] (state, { token }) {
    state.user.token = token
  },
  [SET_AVATAR] (state, { avatar }) {
    state.user.avatar = avatar
  },
  [SET_EMAIL] (state, { email }) {
    state.user.email = email
  },
  [SET_INTRODUCTION] (state, { introduction }) {
    state.user.introduction = introduction
  },
  [SET_NAME] (state, { name }) {
    state.user.name = name
  },
  [SET_PHONE] (state, { phone }) {
    state.user.phone = phone
  },
  [SET_ROLES] (state, { roles }) {
    state.user.roles = roles
  },
  [SET_UID] (state, { uid }) {
    state.user.uid = uid
  },
  [SET_USERNAME] (state, { username }) {
    state.user.username = username
  }
}
