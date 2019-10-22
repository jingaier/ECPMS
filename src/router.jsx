/* * @Author: jingaier  * @Date: 2019-10-10 21:39:23  * @Last Modified by: jingaier  * @Last Modified time: 2019-10-10 21:39:23  */
//页面路由
window.location.href = 'http://www.baidu.com';
history.back();

// hash 路由
window.location = '#hash';
window.onhashchange = function(){
    console.log('current hash:',window.location.hash);
}
// H5 路由
// 推进一个状态
history.pushState('name','title','/path');
// 替换一个状态
history.replaceState('name','title','/path');
// 回退一个状态
window.onpopstate = function(){
    console.log(window.location.href)
    console.log(window.location.pathname)
    console.log(window.location.hash)
    console.log(window.location.search)
}