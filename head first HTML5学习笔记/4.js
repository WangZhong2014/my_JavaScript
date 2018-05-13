// var movie1 = {
//     title: 'Plan 9 from Outer Space',
//     genre: 'Cult Classic',
//     rating: 5,
//     showtimes: ['11:31am','3:00am','11:00pm'],

//     getNextShowing : function () {
//     var now = new Date().getTime();

//     for (let i = 0; i< this.showtimes.length ; i++) {
//         var showTime = getTimeFromString(this.showtimes[i]);

//         if ((showTime - now) > 0) {
//             return `Next showing of '${this.title}' is ${this.showtimes[i]}`;
//         };
//     };

//     return null;
//    }

// }

var getTimeFromString = timeString => {
    var theTime = new Date();
    var time = timeString.match(/(\d+)(?::(\d\d))?\s*(p?)/);
    console.log(time);
    theTime.setHours( parseInt(time[1]) + (time[3] ? 12 : 0));
    theTime.setMinutes( parseInt(time[2] || 0));

    return theTime.getTime();
};

// var nextShowing = movie1.getNextShowing();
// console.log(nextShowing);

function Movie(title,genre,rating,showtimes) {
    this.title = title,
    this.genre = genre,
    this.rating = rating,
    this.showtimes = showtimes,

    this.getNextShowing = function () {
    var now = new Date().getTime();

    for (let i = 0; i< this.showtimes.length ; i++) {
        var showTime = getTimeFromString(this.showtimes[i]);

        if ((showTime - now) > 0) {
            return `Next showing of '${this.title}' is ${this.showtimes[i]}`;
        };
    };

    return null;
   }

};


var ban = new Movie('buckarro', 'cult class', 5,['1:00pm','5:00pm','7:00pm','11:00pm']);

var plan = new Movie('panced ', 'cult classic', 2,['3:00am','5:00pm']);

console.log(plan.getNextShowing());