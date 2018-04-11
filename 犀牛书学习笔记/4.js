var n = 3;
n.times(function(n) {
    console.log(n + 'hello');
});

Number.prototype.times = function(f,context) {
    var n = Number(this);
    for (var i = 0; i < n; i ++) {
        f.call(context, i);
    };
};

