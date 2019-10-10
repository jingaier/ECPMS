/* * @Author: jingaier  
* @Date: 2019-09-26 17:50:40  
 * @Last Modified by: jingaier
 * @Last Modified time: 2019-09-26 18:25:48
 */
//实现一个new 操作符首先要明白 new 都帮我们做了什么事儿。
/**
 * 1、新创建了一个对象；2、链接到原型；3、绑定this；4、返回这个对象
 */
function _new(){
    var o = Object.create();//创建一个空对象；
    var con = [].shift.call(arguments);
    o.__proto__ = con.prototype;
    let result = con.apply(o,arguments);
    return typeof result === 'object'? result:o;
}
function Foo(name){
    this.name = name;
}
_new(Foo('123'))
// function Foo(name){
//     this.name = name;
// }
// var foo = new Foo('123');
// foo();