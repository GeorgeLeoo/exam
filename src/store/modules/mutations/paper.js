/**
 * 直接更新 state 的多个方法的对象
 */
import {
  SET_PAPER_ID
} from './../mutation-types'

export default {
  [SET_PAPER_ID] (state, { paperId }) {
    state.paper.paperId = paperId
  }
}
