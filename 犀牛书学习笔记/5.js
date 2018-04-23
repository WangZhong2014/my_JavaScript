function freezeProps(o) {
    var props = (arguments.length === 1)
    ? Object.getOwnPropertyNames(o)
    : Array.prototype.splice.call(arguments,1);

    props.forEach(function(n) {
        if(!Object.getOwnPropertyDescriptor(o,n).configurable) return;
        Object.defineProperty(o,n,{writable:false,configurable:false})
    })
};


function hideProps(o) {
    var props = (arguments.length === 1)
    ? Object.getOwnPropertyNames(o)
    : Array.prototype.splice.call(arguments,1);

    props.forEach(function(n) {
        if(!Object.getOwnPropertyNames(n)) {
            return ;
        };
        Object.defineProperty(o,n,{enumerable:false})
    })
};


function Range(from,to) {
    if(from >to ) throw new Error("Range: from must be <= to");

    function getFrom() {return from;};
    function getTo() {return to};
    function setFrom(f) {
        if(f <= to) from = f;
        else throw new Error("Range: from must be <= to")
    };
    function setTo(t) {
        if(t >= from) to = t;
        else throw new Error("Range: from must be <= to")
    };

    Object.defineProperties(this,{
        from:{get:getFrom,set:setFrom,enumerable:true,configurable:false},
        to:{get:getTo,set:setTo,enumerable:true,configurable:false},

    })
};

Range.prototype = hideProps({
    constructor : Range,
    includs : function(x) {
        return this.from <=x && x<= this.to
    },
    foreach : function(f) {
        for (var x = Math.ceil(this.from);x<= this.to; x++) {
            f(x);
        };
    },
    toString: function() {
        return "{" + this.from + "..." + this.to + "}";
    }
});