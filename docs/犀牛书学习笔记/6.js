(function namespace() {

    function properties() {
    var names;
    if (arguments.length === 0) {
        names = Object.getOwnPropertyNames(this);
    } else if (arguments.length === 1 && Array.isArray(arguments[0])) {
        names = arguments[0];
    } else {
        names = Array.prototype.splice.call(arguments,0);
    };
    return new Properties(this,names);
   };

   Object.defineProperty(Object.prototype, "properties", {
       value: properties,
       enumerable: false,
       writable: true,
       configurable: true
   });

   function Properties(o,names) {
       this.o = o;
       this.names = names;
   };

   Properties.prototype.hide = function() {
       var o = this.o, hidden = {enumerable: false};
       this.names.forEach(function(n) {
           if(o.hasOwnProperty(n)){
               Object.defineProperty(o,n,hidden);
           };
           return this;
       });
    }

       Properties.prototype.freeze = function() {
           var o = this.o ,frozen = {writable: false,configurable:false};

           this.names.forEach(function(n) {
               if(o.hasOwnProperty(n)) {
                   Object.defineProperty(o,n,frozen);
               }
           });

           return this;
       };

       Properties.prototype.descriptors = function() {
           var o = this.o,desc = {};
           this.names.forEach(function(n) {
               if (!o.hasOwnProperty(n)) return;
               desc[n] = Object.getOwnPropertyDescriptor(o,n);
           });
           return desc;
       };


       Properties.prototype.toString = function() {
           var o = this.o;
           var lines = this.names.map(namestoString);
           return "{\n" + lines.join(",\n") + "\n}";

           function namestoString(n) {
               var s= "", desc = Object.getOwnPropertyDescriptor(o,n);
               if (!desc) return "nonexistent" + n + ": undefined";
               if (!desc.configurable) s += "permanent";
               if((desc.get && !desc.set) || !desc.writable) s+= "readonly";
               if(!desc.enumerable) s += "hiden";
               if(desc.get || desc.set) s+= "accessor" + n;
               else s += n + ":" + ((typeof desc.value === "function")? "function" :desc.values);

               return s;
           }
       };

       Properties.prototype.properties().hide();
    
}());

