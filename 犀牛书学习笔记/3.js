// 通过父类构造函数的方法来做到这一点。
Function.prototype.extend = function(constructor,methods,statics) {
    return defineSubclass(this,constructor,methods,statics);
};

function extend(o) {
    for (var i = 1; i <arguments.length; i++) {
        var source = arguments[i];
        for (prop in source) {
            o[prop] = source[prop];
        };
    };
    return o;
};


// 定义子类的defineSubclass方法
    function defineSubclass(superclass,constructor,methods,statics) {
        constructor.prototype = Object.create(superclass.prototype);
        constructor.prototype.constructor = constructor;
        if (methods) extend(constructor.prototype,methods);
        if (statics) extend(constructor,statics);
    
        return constructor;
    };
    


function abstractmethod() {
    throw new Error ('abstract method');
};

function AbstractSet() {
    throw new Error ('Can\'t instantiate abstract classes')
};

AbstractSet.prototype.contains = abstractmethod;




var NotSet = AbstractSet.extend(
    function NotSet(set) {this.set = set},
    {
        contains: function(x) {return !this.set.contains(x)}, // 覆盖了AbstractSet的contains方法。
        toString: function(x) {return "~" + this.set.toString()},
        equals: function(that) {return that instanceof NotSet && this.set.equals(that.set)}
    }
);

var AbstractEnumerableSet = AbstractSet.extend(
    function() { throw new Error('Can\'t instantiate abstract calsses')},
    {
        size: abstractmethod,
        foreach: abstractmethod,
        isEmpty: function() {return this.size() === 0;},
        toString: function() {
            var s = '{', i = 0;
            this.foreach(function(v) {
                if (i ++ >0) {s += ','};
                s += v;
            })
            return s + "}";
        },
        toLocaleString: function() {
            var s = "{",i = 0;
            this.foreach(function(v) {
                var s= '{',i = 0;
                if(i ++ > 0) {s += ","};
                if(v == null) { s+= v}
                else {s += v.toLocaleString()};
            });
            return s + "}"
        },
        toArray: function() {
            var a= [];
            this.foreach(function(v) {a.push(v)});
            return a;
        },
        equals: function(that) {
            if(!(that instanceof AbstractEnumerableSet)) { return false;};

            if(this.size() !== that.size()) {return false;};
            try{
                this.foreach(function(v) {if (!that.conatains(v)) {throw false;}})
                } catch(x) {
                    if (x === false) return false;
                    throw x;
                }
        }
});



var SingletonSet = AbstractEnumerableSet.extend(
    function SingletonSet(member) {
        this.member = member;
    },{
        contains: function(x) {return x === this.member},
        size: function() {return 1;},
        foreach: function(f,context ) {f.call(context,this.member)}
    });



var AbstractWritaleSet = AbstractEnumerableSet.extend(
    function() {throw new Error("Can't instantiate abstract classes")},
    {
        add: abstractmethod,
        remove: abstractmethod,
        uion: function(that) {
            var self = this;
            that.foreach(function(v) {
                self.add();
            })
            return this;
        },
        intersection: function(that) {
            var self = this;
            this.foreach(function(v) {
                if(!that.contains(v)) {self.remove(v)}
            });
            return this;
        },
        difference: function(that) {
            var self = this;
            that.foreach(function(v) {
                self.remove(v);
            });
        }
    }
);


var ArraySet = AbstractWritaleSet.extend(
    function ArraySet() {
        this.values = [];
        this.add.apply(this,arguments);
    },{
        contains: function(v) {
            return this.values.indexOf(v) != -1;
        },
        size: function() {
            return this.values.length;
        },
        foreach: function(f,c) {
            return this.values.foreach(f,c);
        },
        add : function() {
            for (var i = 0;i <arguments.length; i++) {
                var arg = arguments[i];
                if( !this.contains(arg)) {this.values.push(arg)};
            };
            return this;
        },
        remove: function() {
            for (var i = 0;i< arguments.length;i++) {
                var p = this.values.indexOf(arguments[i]);
                if (p == -1) continue;
                this.values.splice(p,1)
            };
            return this;
        }
    });

var a = new ArraySet(1,2,3);
console.log(a);
a.add(4);
console.log(a);