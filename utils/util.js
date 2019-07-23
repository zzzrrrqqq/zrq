const formatTime = function (date) {
  //date: 日期对象
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  var ymd = [year, month, day].map(function (n) {
    n = n.toString();
    return n.length >= 2 ? n : '0' + n;
  })

  ymd = ymd.join('-');

  var hms = [hour, minute, second].map(function (n) {
    n = n.toString();
    return n.length >= 2 ? n : '0' + n;
  })

  hms = hms.join(':');

  return ymd + ' ' + hms;

}


module.exports = formatTime;
