$(document).ready(function() {
    var data = fetch("data.json")
        .then((response) => response.json())
        .then((json) => console.log(json));
    console.log(data);
});