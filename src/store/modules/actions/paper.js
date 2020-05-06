/**
 * 通过 mutation 间接更新 state 对象
 */
import {
  SET_PAPER_ID
} from './../mutation-types'

export default {
  async SetPaperId ({ commit }, paperId) {
    localStorage.setItem('PAPER_ID', paperId)
    commit(SET_PAPER_ID, { paperId })
  }
}
