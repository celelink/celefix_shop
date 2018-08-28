/**
 * Created by lqy on 2017/4/24.
 */

export const errorMsgHandle = (message) => {
  var msg = ''
  // 处理返回信息是校验错误数组的情况
  if (typeof (message) !== 'object') {
    msg = message
  } else {
    for (var msgObj in message) {
      msg = message[msgObj][0]
      break // 只取第一条
    }
  }
  return msg
}
