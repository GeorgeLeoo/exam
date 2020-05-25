/**
 * 通过 mutation 间接更新 state 对象
 */
import {
  SET_TOKEN,
  SET_UID,
  SET_PHONE,
  SET_EMAIL,
  SET_USERNAME
} from './../mutation-types'
import { setToken, setUid, getUid } from '@/utils/cookies'
import { login, getUserInfo } from '../../../api/user'
import uiutils from '@/uiutils'
import store from '@/store'
import router from '@/router'

export default {
  async Login ({ commit }, userInfo) {
    let { username, password } = userInfo
    username = username.trim()
    const { data } = await login({
      username,
      password
    })
    setToken(data.token)
    setUid(data.uid)
    commit(SET_TOKEN, { token: data.token })
    commit(SET_UID, { uid: data.uid })
  },
  async GetUserInfo ({ commit }) {
    const uid = getUid()
    if (!uid) {
      // throw Error('GetUserInfo: uid is undefined!')
      uiutils.Message.error('您还未登录')
      store.dispatch('RestToken')
      router.replace({ path: '/sign-in' })
    }
    const { data } = await getUserInfo({ uid })
    if (!data) {
      throw Error('Verification failed, please Login again.')
    }
    const { phone, email, username } = data.user
    commit(SET_PHONE, { phone })
    commit(SET_EMAIL, { email })
    commit(SET_USERNAME, { username })
  },
  async RestToken ({ commit }) {
    setToken('')
    commit(SET_TOKEN, { token: '' })
  }
}
