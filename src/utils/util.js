export default {
  // 生存随机字符串
  randomString(len) {
    len = len || 32;
    /** 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1 */
    let chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
    let maxPos = chars.length;
    let pwd = "";
    for (let i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },
  // 数据格式校验 string / array / object / number /
  dataTypeDetection(data) {
    const dataObj = Object.prototype.toString.call(data);
    const type = dataObj.slice(8, dataObj.length - 1).toLowerCase();
    return type;
  },
  // 合并对象属性
  merge(target) {
    for (let i = 1, j = arguments.length; i < j; i++) {
      let source = arguments[i] || {};
      for (let prop in source) {
        if (source.hasOwnProperty(prop)) {
          let value = source[prop];
          if (value !== undefined) {
            target[prop] = value;
          }
        }
      }
    }
    return target;
  },
}
