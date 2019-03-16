function getAllDataRequest() {
    var http = new XMLHttpRequest();
    var url = 'https://tinerd.cak.sh/getAllData';
    // var params = 'orem=ipsum&name=binny';
    http.open('GET', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    http.send();
}

function shouldSwipe(cardInfo){
    /*TODO[@nitish]: implement POST request to https://0.0.0.0:10080/shouldSwipe with cardInfo as post data
    response will be of the format 
    {
    "shouldSwipe": true,
    "success": true
    }
    this function should return a boolean based on the 'shouldSwipe' paramter of the response
    */
}