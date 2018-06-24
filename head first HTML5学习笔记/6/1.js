var lastReportTime = 0;

function updateSales(sales) {
    var salesDiv = document.getElementById("sales");
    console.log(sales);

    sales.forEach(sale => {
        div = document.createElement('div');
        div.innerHTML = sale.name + " sold" + sale.sales + " gumballs";
        salesDiv.appendChild(div);
    });

    if (sales.length > 0) {
        lastReportTime = sales[sales.length -1].time;
    }

};


function handleRefresh() {
    var url = "http://gumball.wickedlysmart.com?callback=updateSales" + "&lastreporttime=" + lastReportTime
    +"&randam=" + (new Date()).getTime();

    var newScriptelement = document.createElement('script');
    newScriptelement.setAttribute('src',url);
    newScriptelement.setAttribute('ad','jsonp');

    var oldScriptElement = document.getElementById('jsonp');
    var head = document.getElementsByTagName("head")[0];
    if (oldScriptElement === null) {
        head.appendChild(newScriptelement);
    } else {
        head.replaceChild(newScriptelement,oldScriptElement)
    };

};


window.onload = function () {
    this.setInterval(handleRefresh,300000);
};



