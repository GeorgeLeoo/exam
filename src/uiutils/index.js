import { Message } from 'element-ui'
import { messageDuration, messageType } from '@/config'

export const uiutils = {
  Message: {
    error: function (message) {
      Message({
        message: message || 'Error',
        type: messageType.error,
        duration: messageDuration.short
      })
    },
    success: function (message) {
      Message({
        message: message || 'Success',
        type: messageType.success,
        duration: messageDuration.short
      })
    },
    warning: function (message) {
      Message({
        message: message || 'Success',
        type: messageType.warning,
        duration: messageDuration.short
      })
    },
    info: function (message) {
      Message({
        message: message || 'Success',
        type: messageType.info,
        duration: messageDuration.short
      })
    },
    custom: function ({ message, type, duration }) {
      Message({
        message,
        type,
        duration
      })
    }
  }
}

export default uiutils
