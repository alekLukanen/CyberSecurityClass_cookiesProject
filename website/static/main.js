
console.log("In main.js file");
console.log("saving a cookie to the web browser!")

//https://www.w3schools.com/js/js_cookies.asp //////////////
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
////////////////////////////////////////////////////////////

function doesCookieExist(cookieName){
    str = getCookie(cookieName);
    if (str.length>0){
        return true;
    }else{
        return false;
    }
}

cookie_data = [
    {key: "name", default_value: "Null", value: null, desc: "The username of the user"},
    {key: "background_color", default_value: "grey", value: null, desc: "Sets the background color of all pages"},
    {key: "text_color", default_value: "white", value: null, desc: "Sets the text color of all pages"},
]

for (index in cookie_data){
    element = cookie_data[index];
    current_value = getCookie(element.key);
    if (current_value.length>0){
        element.value = current_value;
    }else{
        element.value = element.default_value;
    }
    console.log("element: " + element.value);
}

console.log("cookie_data: " + cookie_data);

var app = new Vue({
    el: '#app',
    data: {
        title: 'Dogs and Stuff',
        info: 'A website dedicated to dogs and stuff',
        cookies: cookie_data,
    },
    methods: {
        getCurrentValue: function(cookie) {
            console.log(cookie.key + ": " + getCookie(cookie.key) + ", " + doesCookieExist(cookie.key));
            return cookie.key;
        },
        saveAllValues: function() {
            console.log('saving all values to cookies');
            for (index in cookie_data){
                element = cookie_data[index];
                current_value = getCookie(element.key);
                setCookie(element.key, element.value, 7);
                console.log("element.value: " + element.value);
            }
        }
    }
});
