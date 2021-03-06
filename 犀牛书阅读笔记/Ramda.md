
关于老师代码的详解：
我觉得了解之前，需要先搞明白2个Ramda函数：

1. R.filter(f,obj)函数，这个函数里面有2个参数，f是指判定条件，obj是需要筛选的对象（或数组）。
然后R.filter()方法会历遍obj的每个元素/属性，把obj中的每个元素/属性传入到f中，查看是否符合条件，最后返回ture,符合条件的会生成一个新的数组/对象。

> 这个新的结果和传入的obj类型相同，如果obj是一个对象，那么返回的是一个对象， 如果obj是一个数组，那么返回来的是一个数组。

这个方法很类似数组的filter方法
```js
a=[1,2,3];
function f(x) {
  return x > 1;
a.filter(f(x)); // [2,3];
```
这里，f是一个函数，相当于判定条件。这个方法就是说a的每个元素都需要过一遍f,f函数return结果为true的，就会被添加进新数组。如果换成用Ramda，它的写法就是：R.filter(a,f);

> R.filter中，貌似只需要写函数名f就行了，不需要加括号，也即不需要调用f。


2. R.compose(a,b,...,c)方法，这里面的参数不限制个数，但它要求，传入里面的每个参数(a,b,c)都必须是函数。然后从右向左执行，进行合并。最右边的函数c,可以有任意个数的参数，但其余的a，b必须是一元函数，就是只能有一个参数。
先计算出c的结果，然后再把c的结果作为参数传入到b中，b的结果传入到a中，这样子……

3. 解决问题的整个思路是这样的：
- 第一步，先明确firstName的判定条件，历遍contacts中的每个元素(obj)，筛选出符合条件的obj。

如果存在obj.firstName === value,那么就返回这个obj，因为contacts是数组，所以obj是被添加到一个新数组(Array)中的。
- 第二步，对这个新数组判定，如果Array的长度为0，那么就说明都不符合条件。如果有新数组，然后老师基本上就假定只有1个符合结果，就是Array[0];
- 判定筛选出来的Array[0]是不是包含prop,如果包含，就列出，如果没有，就说明不存在。

4. 所以代码的执行逻辑就是：
```js
lookUp('Sherlock','number')(contacts);
```
这个代码等价于：
```js
R.compose(
    console.log,
    readProperty('number'),
    nullArray,
    R.filter(isValue('Sherlock'))
)(contacts);
```
R.filter()方法缺位了一个筛选的，然后把contacts传进去。
`R.filter(isValue('Sherlock'))`返回一个数组，把这个结果传入到nullArray()中，然后nullArray()返回一个对象，再传入到readProperty('number')中，然后再结果传入到console.log()中去。




```lookUp('Sherlock','number')(contacts);```
这一行首先是执行lookUP('Sherlock',number)这个函数，
这个函数返回了一个匿名函数:
```js
function (contacts) {
        R.compose(
            console.log,
            readProperty(prop),
            nullArray,
            R.filter(isValue(value))
        )(contacts);
    };
```
上面的contacts在()里只是形参，还没有传输值。
然后lookUP('Sherlock','number')后面又加了一个(contacts)，就说明调用了上面的匿名函数，并传入了一个contacts的值;
开始执行下面的代码了:
```js
R.compose(
    console.log,
    readProperty(prop),
    nullArray,
    R.filter(isValue(value))
)(contacts);// contacts传入值了。
```
这个就是R.compose的执行逻辑了。
