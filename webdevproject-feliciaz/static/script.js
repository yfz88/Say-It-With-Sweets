var L = window.location.href;
console.log(L);

/*DOM manipulation, countdown for header promotion*/
/*code adapted from "https://www.w3schools.com/howto/howto_js_countdown.asp" */
function getCountDown(){
    var end = new Date("May 1 2024, 00:00:00").getTime();
    var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = end - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("time").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("time").innerHTML = "EXPIRED";
    }}, 1000);
}

/*carousel events*/
$(document).ready(function() {
    var index = 0;
    var count = $('.image').length;
    var width = $('.image').outerWidth();

    $('.next').click(function() {
        if (index < count - 1) {
            index++;
            $('.image').css('transform', 'translateX(' + (-index * width) + 'px)');
        }
    });
    $('.prev').click(function() {
        if (index > 0) {
            index--;
            $('.image').css('transform', 'translateX(' + (-index * width) + 'px)');
        }
    });
});

/*form validation for email list*/
function validate(){
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var phone = document.getElementById("phonenumber");
    var zip = document.getElementById("zipcode");
    var msg = document.getElementById("ValidateMsg");
    if (!name.checkValidity() || !email.checkValidity() || !validatePhoneNumber(phone.value) || !validateZipCode(zip.value)){
        msg.innerHTML = "Please fill out the form correctly";
    }
}

function validateZipCode(zip) {
    var zipPattern = /^\d{5}$/;
    if (zip !== "" && !zipPattern.test(zip)) {
      alert("Zip code must be a five-digit code.");
      zip.value = "";
      return false;
    }
    return true;
}

function validatePhoneNumber(phone) {
    var numberPattern = /^[0-9]+$/;
    if (!numberPattern.test(phone)) {
        alert("Please enter only numbers for the phone number.");
        return false;
    }
    return true;
}

/*map, geolocation*/
let map;
async function initMap(){
    const destination = {lat: 40.50594012259089, lng:-78.38643673478738}
    const{Map} = await google.maps.importLibrary("maps");
    const {AdvancedMarkerElement} = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"),{
        zoom: 8,
        center: destination,
        mapId: "map",
    });
    const marker = new AdvancedMarkerElement({
        map: map,
        position: destination,
        title: "Say It With Sweets"
    })
    if (navigator.geolocation) { /*code adapted from "https://www.w3schools.com/html/html5_geolocation.asp"*/
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
            const userMarker = new AdvancedMarkerElement({
                position: userLocation,
                map: map,
                title: 'Your Location',
            });
        });
    }
}

if (L.includes("contact.html")){
    initMap();
}

/*subpages, tabs on Baked Goods Page*/
if (L.includes("bakedgoods.html")){ 
    $(function() {
        $("#tabs").tabs({
            activate: function(event, ui) {
                $("#tab-links li a").removeClass("active");
                $(ui.newTab).find("a").addClass("active");
            }
        });
        $("#tab-links li:first-child a").addClass("active");
    });
}