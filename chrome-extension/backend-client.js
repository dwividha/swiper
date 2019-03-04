function getAllDataRequest() {
    //TODO: implement send get request to https://0.0.0.0:10080/getAllData
    var http = new XMLHttpRequest();
    var url = 'https://backend.tinerd.com:10443/getAllData';
    // var params = 'orem=ipsum&name=binny';
    http.open('GET', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    http.send();
}

function shouldSwipe(cardInfo){
    //TODO: implement POST request to https://0.0.0.0:10080/shouldSwipe with cardInfo as post data
}