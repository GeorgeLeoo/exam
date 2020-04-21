/**
 * 通过 mutation 间接更新 state 对象
 */
import {
  SET_TOKEN,
  SET_UID
} from './../mutation-types'
import { setToken, setUid } from '@/utils/cookies'
import { login } from '../../../api/user'

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
  }
}
