
// 字符串包含空格空格
function kongge(d) {
    var kongge = /\s/g;
    return d.search(kongge)
}
// 匹配开始空格
function ksgg(d) {
    var ks = /^\s/;
    return d.search(ks)
}

// 匹配日期
function regDate(d) {
    var reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    var regExp = new RegExp(reg);
    return regExp.test(d);
}

// 身份证
function shenfen(d) {
    var shenfen = /\d{18}|\d{15}/
    return shenfen.test(d)
}
// 手机号
function phone(d) {
    var phone = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|161|166|198|199|(147))\d{8}$/
    return phone.test(d)
}

// 中国标准时间修改
function formatDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    function formatTen(num) {
        return num > 9 ? (num + "") : ("0" + num);
    }
    return year + "-" + formatTen(month) + "-" + formatTen(day);
}

//  邮箱
function email(d) {
    var email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    return email.test(d)
}

// ip
function ipp(d) {
    var ips = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    return ips.test(d)
}

export default {
    kongge,
    ksgg,
    regDate,
    shenfen,
    phone,
    formatDate,
    email,
    ipp
}
