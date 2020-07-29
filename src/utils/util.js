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
}
