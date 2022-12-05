export default {
  isUrl(url: string): boolean {
    const strregex =
      '^((https|http|ftp|rtsp|mms)?://)' +
      "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + //ftp的user@
      '(([0-9]{1,3}.){3}[0-9]{1,3}' + // ip形式的url- 199.194.52.184
      '|' + // 允许ip和domain（域名）
      "([0-9a-z_!~*'()-]+.)*" + // 域名- www.
      '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' + // 二级域名
      '[a-z]{2,6})' + // first level domain- .com or .museum
      '(:[0-9]{1,4})?' + // 端口- :80
      '((/?)|' + // a slash isn't required if there is no file name
      "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    const re = new RegExp(strregex);
    //re.test()
    console.log(url, re.test(url));

    return re.test(url);
  },

  isPhone(value: string) {
    return /^1[3456789]\d{9}$/.test(value);
  },
};
