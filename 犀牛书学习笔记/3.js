function f() {
    var x = 2;
    console.log(x);
    console.log(arguments[0]);// arguments指代传输的实参对象。
    arguments[0] = null;
    console.log(arguments[0]);
}

f(1);