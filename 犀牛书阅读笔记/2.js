// var a = {}
// Object.defineProperties(a,{
//     x:{
//         value: 1,
//         writable:false,
//         enumerable: true,
//         configurable: false,
//     },
//     y:{
//         value: 2,
//         writable: true,
//         enumerable:true,
//         configurable:true
//     },
//     z: {
//         value:3,
//         writable:true,
//         configurable:false
//     }
// })

// Object.defineProperty(a,'z',{
//     value:4
// }),

// console.log(a.z);
// Object.defineProperty(a,'y',{
//     configurable:false,
//     enumerable:true
// })

// var xDescribeProp = Object.getOwnPropertyDescriptor(a,'x');
// console.log(xDescribeProp);

// var yDescribeProp = Object.getOwnPropertyDescriptor(a,'y');
// console.log(yDescribeProp);


// Object.defineProperty(a,'y',{
//     configurable:true,
//     enumerable:true

// })

// var yDescribeProp = Object.getOwnPropertyDescriptor(a,'y');
// console.log(yDescribeProp);























// var preferences = {
//     max_width : 0
// }
// var max_width = 0;
// var max = max_width || preferences.max_width || 500;
// console.log(max);

// var a = '0';
// console.log(a == false);

// var b = 1;
// console.log((a = b) ==1);

// var b = 2;
// var a=0;
// a ^= b;
// console.log(a);

// var geval = eval;
// var x = 'global', y = 'global';
// function f() {
//     var x = 'local';
//     eval("x += 'changed';");
//     return x;
// }

// function g() {
//     var y = 'local';
//     geval("var y;y =123 + 'changed';");
//     return y;
// }

// console.log(f(),x);
// console.log(g(),y);

// var a = ['a','b','c'];
// var b = [];
// for (var i = 0;i<a.length;i++) {
//     b[i] = a[i];
// }

// console.log(b);
// console.log(a);
// console.log(a == b);

// var obj = { a:1, arr: [2,3] };
// var shallowObj = shallowCopy(obj);

// function shallowCopy(src) {
//   var dst = {};
//   for (var prop in src) {
//     if (src.hasOwnProperty(prop)) {
//       dst[prop] = src[prop];
//     }
//   }
//   return dst;
// }

// shallowObj.a = 5; 
// shallowObj.arr[1] = 5;
// console.log(shallowObj);
// console.log(obj);

// var obj = [1,2,[3,4]];
// var shallowObj = [];
// function shallowCopy(src) {
//     var dist = [];
//     for (prop in src) {
//         if(src.hasOwnProperty(prop)) {
//             dist[prop] = src[prop];
//         }
//     }
//     return dist;
// }

// shallowObj = shallowCopy(obj);
// shallowObj[1] = 5;
// shallowObj[2][1] = 22;
// console.log(shallowObj,obj);


// s = 'global';
// function b() {
//     var s = 'local';
//     mys = 'local';
//     return [s,mys];
// } 

// b();
// console.log(s,mys);

// 1 + null // => 1
// 1 + undefined  // => NaN

// var i = 1;
// console.log(i++);
// console.log(++i);

// switch (3) {
//     case 1:
//     console.log(1 + 'statment');
//         break;// 这里也可以使用return语句
    
//     case 2:
//     console.log(2 + 'statment');
//         break;

//     case 3:
//     console.log(3 + 'statment');
//         break;
//     case 4:
//     console.log(4 + 'statment');
//     break;

//     case 5:
//     console.log(5 + 'statment');
//     break;
    
//     default:
//         break;
// // }

// var o = {x:1,y:2,z:3};
// var a = [], i=0;
// for(a[i++] in o) ;
// for(i in a) {console.log(i)};
// console.log(a);

// var a = [[1,3],[1,5]];
// var sum = 0, success = false;
// compute_sum: if(a) {
//     for (var x = 0;x < a.length; x++) {
//         var row = a[x];
//         if(!row) break compute_sum;
//         console.log(row);
//         for (var y = 0; y<row.length; y++) {
//             var cell = row[y];
//             if(isNaN(cell)) break compute_sum;
//             console.log(cell);
//             sum+=cell;
//         } 
//     }
//     console.log(sum);
// }


// var a = [[1,23],[1,3]];
// console.log(a.length);
// var b = a[1];
// console.log(b);
// console.log(b.length);


// try{
//     var n = Number(prompt("请输入一个正整数",''));
//     var factorial = function (n) {
//     alert(n + '! = ' + factorial)
//   }
// }
// catch(ex) {
//     alert(ex);
// }

// 变量作用域联系
// var scope = 'global';
// function checksope() {
//     var scope = 'local';
//     console.log(scope);
//     return scope;
    
// }

// scope = checksope();
// console.log(scope);

// // 对象的属性
// var empty = {};
// var point = {x:0,y:0};
// var book = {
//     '': 'js',  // 空字符串也可以做属性名，但必须用引号包起来
//     'sub-title': 'theiekd', // 中间有连字符-，需要用连字符抱起来
//     author: {
//         firstname : 'wang',
//         surname: 'goo'
//     },
//     'for': 1 // 保留字也必须用引号包起来
// }
// console.log(book['author']);


// // 对象的原型
// var o1 = Object.create({a:1,b:2});
// console.log(o1);
// for(prop in o1) {console.log(prop)};
// console.log(o1.a);
// function inherit(p) {
//     if(p === null) throw TypeError();
//     if(Object.create) {
//         return Object.create(p);
//     }

//     var t = typeof p;
//     if(t !== 'object' && t !== 'function' ) throw TypeError();
//     function f() {};
//     f.prototype = p;
//     return new f();
// };

// var a = inherit({x:1,y:2});
// console.log(a);

// function inherit(p) {
//     if(p === null) throw TypeError();
//     if(Object.create) {
//         return Object.create(p);
//     }

//     var t = typeof p;
//     if(t !== 'object' && t !== 'function' ) throw TypeError();
//     function f() {};
//     f.prototype = p;
//     return new f();
// };

// var a = inherit({x:1,y:2});
// console.log(a);

// function inherit(p) {
//     if(p === null) throw TypeError();
//     if(Object.create) {
//         return Object.create(p);
//     }

//     var t = typeof p;
//     if(t !== 'object' && t !== 'function' ) throw TypeError();
//     function f() {};
//     f.prototype = p;
//     return new f();
// };

// var a = inherit({x:1,y:2});
// console.log(a);

// 对象的查询
// var addr='';
// var customer = {
//     address0: 1,
//     address1: 2,
//     address2: 1111,
//     address3: 'dkdkd',
//     address4: 13
// }

// for (i = 0; i< 4; i++) {
//     addr += customer['address' + i] + '\n';
// }
// console.log(addr);

// 对象的继承

// var o = {};
// o.x = 1;
// var p = Object.create(o);
// p.y =  2;
// var q = Object.create(p);
// q.z = 3;
// var a = Object.keys(o);
// var b = Object.keys(p);
// var c = Object.keys(q);

// var d = Object.getOwnPropertyNames(o);
// var e = Object.getOwnPropertyNames(p);
// var f = Object.getOwnPropertyNames(q);


// console.log(a,b,c);
// console.log(d,e,f);


// 对象的检测
// var o = {x:1};
// console.log('x' in o);

// var o = Object.create({x:1});
// o.y = 2;
// x= o.hasOwnProperty('x'); 
// y= o.hasOwnProperty('y');
// z= o.hasOwnProperty('toString');
// console.log(x,y,z);

// propertyIsEnumerable()
// var o = Object.create({y:2});
// o.x = 1;
// var a = o.propertyIsEnumerable('x');
// var b = o.propertyIsEnumerable('y');
// var c = Object.prototype.propertyIsEnumerable('toString');
// console.log(a,b,c);


// getter 和 setter

// var p = {
//     x:1.0,
//     y:1.0,

//     get r() { return 1); },
//     set r(newValue) {
//         var oldvalue = Math.sqrt(this.x*this.x + this.y*this.y);
//         var ratio = newValue/oldvalue;
//         this.x *= ratio;
//         this.y *= ratio;
//     },
//     get theta() { return Math.atan2(this.y,this.x)}
// };

// // console.log(p.theta);
// p.r = 12;
// console.log(p.r);
// // console.log(p.x,p.y);

// var gf = {
//     get age() { 
//         if (value) {return value}
//         else { return 18 }
//     },
//     set age(value) {}
// }
// gf.boyFriend = 'zhili';
// console.log(gf.age);
// console.log(gf.boyFriend);
// gf.age = 122;
// console.log(gf.age);

// var a = {
//     $n:0,

//     get next() { return this.$n++;
//     },

//     set next(n) { 
//         if (n >= this.$n) this.$n = n;
//         else throw '不能比之前的值小';
//     } 
// };

// a.next = 10;
// console.log(a.next);
// console.log(a.$n);
// a.next = 1;
// console.log(a.$n);


// // 属性参数
// var a = {x:1};
// var c = Object.getOwnPropertyDescriptor(a,'x');
// var b = Object.create(a);
// console.log(c);
// d = Object.getOwnPropertyDescriptor(b,'x');
// console.log(d);  // undefined，不能获得继承来的对象的属性特性。
// e = Object.getOwnPropertyDescriptor(a,'y');
// console.log(e); // undefined,不能获取不存在的属性的属性特性。



// // 属性参数
// var o = {};
// Object.defineProperty(o,'x',{
//     value:1,
//     writable: true,
//     enumerable: false,
//     configurable: true
// })

// console.log(o.x);
// Object.keys(o);
// Object.defineProperty(o,'x',{
//     writable:false
// });
// o.x =2 ;
// console.log(o.x);


// var a = { x:1};
// c = Object.getOwnPropertyDescriptor(a,'x');
// console.log(c);

// var a = {x:1,y:12};
// var c = Object.create(a);
// var d = new Array(1,2);
// var b = Object.getPrototypeOf(d);
// console.log(b);
// // console.log(d);

// 检测对象的类
// function classof(o) {
//     if (o === null) return "Null";
//     if (o === undefined) return "Undefined";
//     return Object.prototype.toString.call(o).slice(8,-1);
// }

// var a = [1,23];
// var b = classof(a);
// console.log(b);

// // 可扩展性
// var a = {x:1,y:2};
// var b = Object.create(a);
// Object.preventExtensions(b);
// b.z = 1;
// var c= Object.isExtensible(b);
// console.log(c);
// console.log(b.z);
// a.z = 3;
// console.log(b.z);

// var o = Object.seal(
//    Object.create(
//     Object.freeze({x:1}),
//     {y:{writable:true}}
// )
// )

// for (prop in o ) {
//     console.log(prop);
// }
// console.log(Object.getOwnPropertyDescriptor(o,'y'));
// o.y = 2;
// console.log(o.y);
// console.log(o);


// var o = {
//     x:1,
//     y: {
//         z: [false,NaN,null,'']
//     }
// };
// s = JSON.stringify(o);
// p = JSON.parse(s);

// console.log(s,p);

// var o = function () {
//     return 123;
// }
// s = JSON.stringify(o);
// console.log(s);