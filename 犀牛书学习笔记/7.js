var a= /Java/g;
var text = 'JavaScript is more fun than Java';

var result;

while((result = a.exec(text)) !== null ) {
    console.log("Matched '" + result[0] + "' " + "at posotion " + result.index + "; next search begins at " + a.lastIndex);
};

