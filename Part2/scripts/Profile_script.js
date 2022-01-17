
window.onload=function(){
    document.getElementById("collapsible").addEventListener("click",collapsableMenu);
}


// Adding collapsable menu
function collapsableMenu(){

    let url = "https://elearning-aueb.herokuapp.com/categories"
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    let init ={
    method: "GET",
    headers: myHeaders
}

    let template = document.querySelector("#course-categories-template").innerHTML;
    let compiled_template = Handlebars.compile(template);

    fetch(url, init)
    .then(response => response.json() )
    .then(obj => {
        console.log('Received object', obj)
        let categoriesRecieved = {categories: []};
        if (obj != null){
            for (category in obj){
                categoriesRecieved["categories"].push({"id": obj[category].id,"title":obj[category].title})
            }
        } else {
            console.log("No categories found...")
        }
        console.log(categoriesRecieved);
        let rendered = compiled_template(categoriesRecieved);
        let  htmlCourses = document.querySelector("#course_categories_menu");
        htmlCourses.innerHTML = rendered;
    })
    .catch(error => {
        console.log(error)
    })

    this.classList.toggle("active");
    var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
          }
}

async function checkProfile(){
    let user_email = document.getElementById("user_email").value;
    let user_password = document.getElementById("user_password").value;

    const data = {email: user_email, password:user_password}

    let url = "http://localhost:8080/users/search"


    let init ={
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
        };

    await fetch(url, init)
    .then(function(response){
        if (response.status === 404){
            window.alert("User not found...")
        } else if (response.status === 400){
            window.alert("Wrong password...")
        }
         else if (response.status === 201){ 
             loadProfile()
        }
    })
    .catch(error => {
        console.log(error)
    })
}

async function loadProfile(){

    let user_email = document.getElementById("user_email").value;
    let user_password = document.getElementById("user_password").value;

    const data = {email: user_email, password:user_password}

    let url = "http://localhost:8080/users/get"

    let template = document.querySelector("#profile-details-template").innerHTML;
    let compiled_template = Handlebars.compile(template);

    let init ={
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
        };

    await fetch(url, init)
    .then(response => response.json() )
    .then(obj => {
            console.log('Received object', obj)
            profileDetails = obj;
            let rendered = compiled_template(profileDetails);
            let  Profile = document.querySelector("#profile");
            Profile.innerHTML = rendered;
        
    })
    .catch(error => {
        console.log(error)
    })
}
