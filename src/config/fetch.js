import { baseUrl } from './env'
let Base64 = require('js-base64').Base64;

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
  type = type.toUpperCase();
  url = baseUrl + url;
  // console.log(Base64.decode('ewogICJtc2ciOiAi5pON5L2c5oiQ5Yqf77yBIiwKICAibXNnQ29kZSI6ICIwMDAwIiwKICAiZGF0YSI6IHsKICAgICJpZCI6IDEsCiAgICAiY29weXJpZ2h0IjogIkNvcHlyaWdodCDCqSAyMDE3IiwKICAgICJhYm91dFR5cGUiOiAxLAogICAgImVkaXRpb24iOiAi5oKo55qE6ZyA5rGC5bCx5piv5oiR5pyN5Yqh55qE5a6X5peo5peo5Zyo57K+55uK5rGC57K+IiwKICAgICJjcmVhdGVVc2VyIjogInBzc2lvbiIsCiAgICAiY3JlYXRlVGltZSI6ICIyMDE3LTA5LTEwIDE1OjA4OjE0IiwKICAgICJ1cGRhdGVVc2VyIjogInBzc2lvbiIsCiAgICAidXBkYXRlVGltZSI6ICIyMDE3LTA5LTEyIDE5OjQyOjMxIiwKICAgICJpc0RlbGV0ZWQiOiBmYWxzZQogIH0KfQ=='))

  let dataStr = '';
  /*
   * 数据拼接字符串
   */
  Object.keys(data).forEach(key => {
    dataStr += key + '=' + data[key] + '&';
  })
  if (dataStr !== '') {
    dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
    if (type === 'GET') {
      url = url + '?' + dataStr;
    }
  }

  if (window.fetch && method === 'fetch') {
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      mode: 'cors',
      cache: 'force-cache'
    }

    if (type === 'POST') {
      requestConfig.body = dataStr
    }

    try {
      const response = await fetch(url, requestConfig);
      if (response.status === 200) {
        const responseJson = await response.text();
        return JSON.parse(Base64.decode(responseJson))
      } else {
        return response.status
      }
    } catch (error) {
      throw new Error(error)
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        requestObj = new ActiveXObject;
      }

      let sendData = '';
      if (type === 'POST') {
        sendData = JSON.stringify(data);
      }

      requestObj.open(type, url, true);
      requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      requestObj.send(sendData);

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState === 4) {
          if (requestObj.status === 200) {
            let obj = requestObj.response
              // if (typeof obj !== 'object') {
              //   obj = JSON.parse(obj);
              // }
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}
