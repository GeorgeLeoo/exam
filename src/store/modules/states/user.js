import { getToken, getUid } from '@/utils/cookies'

export default {
  token: getToken() || '',
  uid: getUid() || '',
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  email: ''
}
