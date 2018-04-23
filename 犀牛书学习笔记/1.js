// 继承函数式
function inherit(o) {
    return Object.create(o)
};

//isArrayLike函数，检测类数组对象：
function isArrayLike(o) {
    if (o && typeof o === "object" && isFinite(o.length) && o.length >= 0 && o.length === Math.floor(o.length) && o.length < 4294967296)
    return true;
    else return false;
};

// 复制函数式
function extend(o) {
    for (var i = 1; i <arguments.length; i++) {
        var source = arguments[i];
        for (prop in source) {
            o[prop] = source[prop];
        };
    };
    return o;
};

// classof函数，检测类型
function classof(o) {
    return Object.prototype.toString.call(o).slice(8,-1);
}

// getName函数，得到函数的名字.
Function.prototype.getName = function(){
    if('name' in this) return this.name;
    return this.name = this.toString().match(/function\s*([^(]*)\(/)[1];
};

// type函数用来检测参数o的类型，被传入的o可能有很多种情况：String,Number,Boolean,数组，object,undefined,null,NaN。
function type(o) {
    var t,c,n;

    if (o === null) return 'null';
    if (o !== o) return 'NaN';

    if ((t = typeof(o)) !== 'object') {
    
    return t;}

    if((c = classof(o)) !== "Object") {
    return c;}

    if(o.constructor && typeof o.constructor === 'function' && (n = o.constructor.name)) {
        return n;}

    return "Object";
}

// 检测对象是否是某类的实例：
function typeAndValue(x) {
    if(x === null || x === undefined)return 'No constructors';

    switch(x.constructor) {
        case Number: return "Number: " + x;
        case String: return "String:"  + x;
        case Complex:  
        return "Complex:"  + x;
        case RegExp: return "RegExp:"  + x;
        case SimpleRange: 
        return "SimpleRange: " + x;
        case Range: 
        return "Range:"  + x;
    }
}

// 鸭舌辩型实现函数
function quacks(o) {

    for (var i = 1;i<arguments.length;i++){
        var arg = arguments[i];
        console.log(arg);
        switch(typeof arg) {
            case 'string':
            if(typeof o[arg] !== 'function') return false;

            case 'function': {
                arg = arg.prototype;
                console.log(arg);
            }

            case 'objcet' :{
            for (var m in arg) {
                if (typeof arg[m] !== 'function') continue;

                if (typeof o[m] !== 'function') return false;
            }
          }
        }
    };
    
    return true;
};

// 方法借用的泛型实现
var generic = {
    toString: function() {
        var s= "[";
        if (this.constructor && this.constructor.name) {
          s += this.constructor.name + ':'
        };

        var n = 0;
        for (var name in this) {
            if (!this.hasOwnProperty(name)) continue;

            var value = this[name];
            if (typeof value === 'function') continue;
            if (n++) s += ',';
            s += name + '=' + value;
        };

        return s + ']';
    },

    equals : function (that) {
        if (that === null) return false;
        if (this.constructor !== that.constructor) return false;

        for (var name in this) {
            if (name === "|**objectid**|") continue;
            if (!this.hasOwnProperty(name)) continue;
            if(this[name] !== that[name]) return false;
        }
        return true;
    }
}

// 定义子类的defineSubclass方法
{
function defineSubclass(superclass,constructor,methods,statics) {
    constructor.prototype = Object.create(superclass.prototype);
    constructor.prototype.constructor = constructor;
    if (methods) extend(constructor.prototype,methods);
    if (statics) extend(constructor,statics);

    return constructor;
};

// 通过父类构造函数的方法来做到这一点。
Function.prototype.extend = function(constructor,methods,statics) {
    return defineSubclass(this,constructor,methods,statics);
};

// // 举例
// var Set0 = function(x,y) {
//     this.x = x;
//     this.y = y;
// };
// Set0.prototype = {
//     a:1,
//     b:2
// };
// var Set1 = function(x,y) {
//     this.x = x+1;
//     this.y = y+1;
// };
// Set1 = Set0.extend(Set1,function x () {
//     return 1;
// },{x:1,y:2});

// var a = new Set1(1,2);

}


//Set

//Set类：集合类，每个值都是唯一的，然后它的属性名，就是它的值再加一个特殊的符合。
function Set() {
    this.values = {},
    this.n = 0;

    if (arguments.length === 1 && isArrayLike(arguments[0]))  
    {
        this.add.apply(this,arguments[0])
    } else if (arguments.length > 0) 
    {  console.log(0);
        this.add.apply(this,arguments);
    }
};

Set.prototype.add = function() {
    console.log('xx');
    for (var i = 0;i<arguments.length;i++) {
        var val = arguments[i];
        var str = Set._v2s(val);
        if(!this.values.hasOwnProperty(str)) {
            this.values[str] = val;
            this.n++;
        }
    }
    return this;
};

Set.prototype.remove = function() {
    for (var i = 0; i<arguments.length;i++) {
        var str = Set._v2s(arguments[i]);
        if(this.values.hasOwnProperty(str)) {
            delete this.values[str];
            this.n--;
        }
    };

    return this;
};

//contains
Set.prototype.contains = function(value) {
    return this.values.hasOwnProperty(Set._v2s(value));
};

Set.prototype.size = function() {
    return this.n;
};

Set.prototype.foreach = function(f,context) {
    for (var s in this.values) {
        if(this.values.hasOwnProperty(s)) {
            f.call(context,this.values[s]);
        };
    };
};

Set._v2s = function(val) {
    switch (val) {
        case undefined: return 'u';
        case null: return 'null';
        case true: return 't';
        case false: return 'f';
        default: switch(typeof val) {
            case 'number': return '#' + val;
            case 'string': return '"' + val;
            default: return '@' + ObjectId(val);
        };
    };

    function ObjectId(o) {
        var prop = "|**objectid**|";
        if(!o.hasOwnProperty(prop)) {
            o[prop] = Set._v2s._next++;
        };
        return o[prop];
    
    };
};
Set._v2s._next = 100;

// 添加的方法：

extend(Set.prototype,{
    toString : function() {
        var s = '{',
        i = 0;
        this.foreach(function(v) {
            s += ((i++>0) ? ",": "") + v;});
        return s + "}";
  },
    toLocaleString : function() {
        var s = "{",i = 0;
        this.foreach(function(v) {
            if (i++ >0) s += ",";
            if (v === null) s += v;
            else s += v.toLocaleString();
        });
        return s + "}";
    },

    toArray: function() {
        var a = [];
        this.foreach(function(v) {
            a.push(v);
        });
        return a;
    }
    
});

Set.prototype.toJSON = Set.prototype.toArray;

Set.prototype.quals = function(that) {
    if(this === that) return true;
    if (! (that instanceof Set)) return false;
    if(this.size() !== that.size()) return false;

    try{
        this.foreach(function(v) {
            if(!that.contains(v)) throw false;
        });
        return true;
    } catch(x) {
        if (x=== false) return false;
        throw x;
    };
};

// Set类的一个工厂方法，用来添加数组类型：
Set.fromArray = function(a) {
    s = new Set();
    s.add.apply(s,a);
    return s;
}

// Set类的一个辅助构造函数
function SetFromArray(a) {
    Set.apply(this,a);
};
SetFromArray.prototype = Set.prototype;

// var b = function() {};
// var a = new Set(b);
// console.log(a);
// var c= {x:100};
// a.add(c);
// console.log(a.toString());

// var a= new Set(1,2,3,4,5);
// console.log(a.toArray());

// var b= new Set('a','b','c');
// console.log(b.toArray());
// console.log(a);

// var c = Set.fromArray([1,2,3]);
// console.log(c);
// var d = new Set([1,2,3]);
// console.log(d);
// var e = new Set([1,2,3],[4]);
// console.log(e);



// NonNullSet类
function NonNullSet(){
    Set.apply(this,arguments);
};

NonNullSet.prototype = Object.create(Set.prototype);
NonNullSet.prototype.constructor = NonNullSet;

// 为了将null和undefined排除在外，重新写add方法。
NonNullSet.prototype.add = function() {
    for (var i = 0;i<arguments.length;i++) {
        if (arguments[i] === null || arguments[i] === undefined) {
            throw new Error('Can\'t add null or udnefined to a NonNullset')
        };
    };
    console.log(1);
    return Set.prototype.add.apply(this,arguments);
};

var a = new NonNullSet(1,2);
a.add(4,5);


// filter函数
function filteredSetSubclass(superclass,filter) {
    var constructor = function() {
        superclass.apply(this,arguments);
    };

    var proto = constructor.prototype = Object.create(superclass.prototype);
    proto.constructor = constructor;

    proto.add = function() {
        // 在添加任何成员之前首先使用过滤器将所有参数进行过滤

        for ( var i = 0; i<arguments.length;i++) {
            var v = arguments[i];
            if (!filter(v)) {
                throw ('value ' + v + ' rejected by filter')
            };
        };

        superclass.prototype.add.apply(this,arguments);
    };
    return constructor;
};

// NonNullSet类重写

var NonNullSet = (function() {
    var superclass = Set;
    return superclass.extend(
    function() {
    superclass.apply(this,arguments);},
        {
        add: function() {
            for (var i = 0; i<arguments.length;i++) {
                if(arguments[i] === null || arguments[i] === undefined) {
                    throw new Error('Can\'t add null or undefined')
                }
            }

                return superclass.prototype.add.apply(this,arguments);
            }
        
    });
}());

// 9-12 Singletonset: 一个Set的简单子类
// 构造函数

function SingletonSet(member) {
    this.member = member;
};

SingletonSet.prototype = Object.create(Set.prototype);

extend(SingletonSet.prototype,{
    constructor: SingletonSet,
    
    add: function() {
        throw "Read-only Set"
    },

    remove: function () {
        throw "Read-only Set"
    },

    size: function() {
        return 1;
    },

    foreach: function(f,context) {
        f.call(context,this.member);
    },

    contains: function(x) {
        return x === this.member;
    }
})

SingletonSet.prototype.equals = function(that) {
    return that instanceof Set && that.size()===1 && that.contains(this.member);
};

// var x = new SingletonSet('x','y');
// console.log(x);
// console.log(x.toArray());



// 9-3中的内容 defineClass函数

function defineClass (constructor,methods,statics) {
    if(methods) extend(constructor.prototype,methods);
    if(statics) extend(constructor,statics);

    return constructor;
};

var SimpleRange = defineClass(
    function(f,t) {this.f = f,this.t = t},
    {   
        includes : function(x) {return this.f <= x && x<= this.t},
        toString: function() {
            return this.f + '...' + this.t;
        },
    },
    {
        upto: function(){ 
            return new SimpleRange(0,11);}
            // 这里的upto是类属性。
    }
);

// var a = new SimpleRange(1,3);

var StringSet = filteredSetSubclass(Set,function(x) {
    return typeof x === 'string';
});

var MySet = filteredSetSubclass(NonNullSet,function(x) {
    return typeof x !== 'function';
});



var FilteredSet = Set.extend(
    function FilteredSet(set, filter) {
        this.set = set,
        this.filter = filter
    },
    {
        add: function() {
            if (this.filter) {
                for (var i = 0; i<arguments.length;i++) {
                    var v = arguments[i];
                    if(!this.filter(v)) throw new Error("FilteredSet: value " + v + "rejected by filter");
                };
                this.set.add.apply(this.set, arguments);
                return this;
            };
        },

        remove: function() {
            this.set.remove.apply(this.set, arguments);
            return this;
        },
        contains: function(v) {
            return this.set.contains(v)
        },
        size: function() {
            return this.set.size();
        },
        foreach:function(f,c) {
            return this.set.foreach(f,c);
        }
    });























// 9-2 Range
{
function Range(from,to){
    this.from = function(){return from};
    this.to = function(){return to};
};

Range.prototype.includs = function(x) {
        return this.from() <=x && x<= this.to();
        };
Range.prototype.foreach = function(f) {
        for (var x = Math.ceil(this.from());x<=this.to();x++) f(x);
    };
Range.prototype.toString = function(){
        return "(" + this.from() + "..." + this.to() + ")";
    };

Range.prototype.equals = function(that) {
        if(that == null) return false;
        if(that.constructor !== Range) return false;
        return this.from() === that.from() && this.to() === that.to();
};

Range.prototype.compareTo = function(that) {
    if(!(that instanceof Range))
     throw new Error( "Can\'t compare a Range whth " + that);
     var diff = this.from() - that.from();
     if (diff === 0) {
         diff = this.to() - that.to();
     };
     return diff;
};

// Range.prototype.equals = generic.equals;

var r = new Range(1,3);
var b = new Range(2,4);
// console.log(r.equals(b));

}



































{  // 一个大的代码块，enumearation,card,suit,deck.
    // 枚举类型
    function enumeration(namesToValues) {
        var enumeration = function() {
            throw 'can\'t Instantiate Enumerations;'
        };
    
        var proto = enumeration.prototype= {
            constructor : enumeration,
            toString: function() {return this.name;},
            valueOf: function() {return this.value},
            toJSON: function(){return this.name;}
        };
    
        enumeration.values = [];
    
        for (name in namesToValues) {
            var e = Object.create(proto);
            e.name = name;
            e.value = namesToValues[name];
            enumeration[name] = e;
            enumeration.values.push(e);
        };
    
        enumeration.foreach = function(f,c) {
            for (var i = 0;i<this.values.length;i++) {
                f.call(c,this.values[i])
            }
        };
    
        return enumeration;
    };
    
    var Coin = enumeration({Penny:1,Nickel:5,Dime:10,Quarter:25});
    
    // 扑克牌函数
    function Card(suit,rank) {
        this.suit = suit;
        this.rank = rank;
    }
    
    Card.Suit = enumeration({Clubs:1,Diamonds:2,Hearts:3,Spades:4});
    
    Card.Rank = enumeration({Two:2,Three:3,Four:4,Five:5,Six:6,Seven:7,Eight:8,Nine:9,Ten:10,Jack:11,Queen:12,King:13,Ace:14});
    
    Card.prototype.toString = function() {
        return this.rank.toString() + ' of ' + this.suit.toString();
    };
    
    Card.prototype.compareTo = function(that) {
        if (this.rank < that.rank) {return -1};
        if (this.rank > that.rank) {return 1};
        return 0;
    };
    
    Card.orderByRank = function(a,b) {
        return a.compareTo(b);
    };
    
    Card.orderBySuit = function(a,b) {
        if(a.suit < b.suit) return -1;
        if(a.suit > b.suit) return 1;
        if(a.rank > b.rank) return 1;
        if(a.rank > b.rank) return -1; 
        return 0;
    };
    
    function Deck() {
        var cards = this.cards = [];
        Card.Suit.foreach(function(s) {
            Card.Rank.foreach(function(r) {
                cards.push(new Card(r,s));
            });
        });
    };
    
    Deck.prototype.shuffle = function() {
        var deck = this.cards, len = deck.length;
    
        for (var i = len-1; i>0;i--) {
            var r = Math.floor(Math.random() * (i + 1)),temp;
            temp = deck[i],deck[i] = deck[r],deck[r] =temp;
        };
    
        return this;
    };
    
    Deck.prototype.deal = function(n) {
        if(this.cards.length < n) throw 'out of cards';
        return this.cards.splice(this.cards.length - n,n);
    };
    
    var deck = (new Deck().shuffle());
    var hand = deck.deal(13).sort(Card.orderBySuit);
    
    }


// // Complex.js 
{
    // Complex.js
    function Complex(r,i) {
        if(isNaN(r) || isNaN(i)) throw new TypeError();
        this. r = r;
        this. i = i;
    };// 构造函数，并且确保r,i都是数字。isNaN(t)函数，t如果是可以转换为数字的字，则返回false，如果t转换不成数字，则返回为true.
    
    Complex.prototype.add = function(that){
        return new Complex(
            this.r + that.r,
            this.i + that.i) // 这里是返回了一个新的复述对象，而不是直接修改原来的对象。
    };
    
    // 计算2个复述相乘，然后返回相乘的结果。
    Complex.prototype.mul = function(that){
        return new Complex(
            this.r * that.r - this.i*that.i,
            this.r * that.i + this.i*that.r
        )
    };
    
    // 计算复述的模。模式定义为复平面到原点(0,0)的距离。
    Complex.prototype.mag = function() {
        return Math.sqrt(this.r * this.r + this.i*this.i)
    };
    
    Complex.prototype.neg = function() {
        return new Complex(-this.r,-this.i);
    };
    
    Complex.prototype.toString = function() {
        return "{" + this.r + ',' + this.i + '}'
    };
    
    // 检测2个复述实例是否相等，需要检测它们的构造函数是否一样。
    Complex.prototype.equals = function(that) {
        return that !== null && that.constructor === Complex && this.r === that.r && this.i === that.i
    };
    
    // 类字段和类方法直接是构造函数的属性。
    // 类方法并没有this关键字，因为并不是赋值到实例对象上的。它们只对其参数进行操作。
    
    // 构造函数的内属性。
    Complex.ZERO = new Complex(0,0);
    Complex.ONE = new Complex(1,0);
    Complex.I = new Complex(0,1);
    
    //构造函数的类方法。
    Complex.parse = function(s) {
        try{
            var m = Complex._format.exec(s);
            return new Complex(parseFloat(m[1]),parseFloat(m[2]))
        } catch(x) {
            throw new TypeError('cant parse' + s + 'as a complex number;')
        }
    }
    
    Complex._format = /^\{([^,]+),([^}]+)\}$/;
    
    Complex.polar = function(r,theta) {
        return new Complex(r.Math.cos(theta), r.Math.sin(theta));
    };
    
    
    var c= new Complex(2,3);
    var d = new Complex(c.i,c.r);
    var f = c.add(d);  
    var e = Complex.parse(c.toString());
    }
    