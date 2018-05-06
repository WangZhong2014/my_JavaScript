- 在全局执行上下文中，无论是不是严格模式，this指向全局对象。

### 在函数体内，this取决于函数被调用的方式

### 简单调用
```js
function a() {
    return this
};
```
在浏览器中，a() === window。
在nodejs中，a() === global。

在严格模式下， this的值为它进入时的值，通常是undefined。

- 在Function.prototype的apply,call和bind方法中，this的值被绑定到传入的参数对象中。
```js
function a() {
    return this.x;
}
var o = {x:1};
var d= a.aplly(o);
var b= a.bind(o); // b是一个绑定了this值的函数对象。
var c= a.call(o);
```
- 作为对象的方法，它们的this是调用该函数的对象。
此时，应该是就近原则，this绑定距离调用它最近的那个对象。

- 在全局上下文中声明的变量。
`var a= 0;console.log(this.a)`// 在nodejs环境中=>undefined。在浏览器环境中才是0;
也就是在nodejs环境中，全局上下文，this全局是global，但var a 的声明，并不会把a绑定到global上。而在浏览器环境中，全局声明的var a，会变成全局对象Window的属性。