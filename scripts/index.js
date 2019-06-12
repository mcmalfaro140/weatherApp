let xmlhttp = new XMLHttpRequest();
let url = "http://api.apixu.com/v1/";
let key = "b95d89a6ee414e39926181755191803"

//Getting DOM elements
const input = document.getElementById("inputBar");
const btn = document.getElementById("search");
const locBtn = document.getElementById("getLoc")

//assigning event
btn.addEventListener('click', search)
locBtn.addEventListener('click',getLocation)
input.addEventListener('keyup',function(e){
    if (e.keyCode === 13) {
    search();
  }
});
//functions
function search(){
    let city = input.value
    const currentType = "forecast" // use for fetch
    let search = `${url}/${currentType}.json?key=${key}&q=${city}`
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myArr = JSON.parse(this.responseText);
            myFunction(myArr);
        }
        else if(this.status == 400){
            console.log("sorry")
            var out = '<h2 id="err">Error... Please try again</h2>';
            document.getElementById("id01").innerHTML = out;
        }
               
    };
    xmlhttp.open("GET", search, true);
    xmlhttp.send();
    
    function myFunction(arr) {
        console.log(arr)
        let out = ""
        out = `<h1 id="err">${arr.location.name}</h1>`;
        document.getElementById("id01").innerHTML = out;
        
        
        
    }

}
function getLocation(){
    console.log("Here you will get the user location")
    let temp = document.getElementById("err")
    temp.parentNode.removeChild(temp)
    
}