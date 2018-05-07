var collections;
if(!collections) collections={};

collections.sets = (function namespace() {
    // ……
    // 很多类的代码，可以参考AbstractSet那个例子，完全放在这里都行

    return {
        AbstractSet: AbstractSet,
        NotSet:NotSet,
        AbstractEnumerableSet:AbstractEnumerableSet,
        ArraySet:ArraySet
    };// 这里返回的是一个对象，这个对象包含上述的这些属性。
    // 然后这个对象，被赋值给了collections.sets;
}());


