import { rootPath, errHandler } from './config'

var xhr = function(){
  var defer = $.Deferred();
  var wait = function(){
　　　　var tasks = function(){
　　　　　　alert("执行完毕！");
      defer.resolve();
　　　　};
　　　　setTimeout(tasks,5000);
　　};

  return defer.promise(wait());

  // $.ajax({
  //   type: method,
  //   url: rootPath + url,
  //   data: body
  //   // xhrFields: { // 跨域允许带上 cookie
  //   //   withCredentials: [域名]
  //   // },
  //   // crossDomain: true
  // })
  // .done(defer.resolve)
  // .fail(errHandler)

  // return defer.promise()
}

export default xhr
