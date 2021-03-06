
window.onload=function(){
    document.getElementById("collapsible").addEventListener("click",collapsableMenu);
    document.getElementById("search_button").addEventListener("click",coursesFound);
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


function coursesFound(){
    document.getElementById("front_page_recommendation").hidden = true;
    document.getElementById("courses_found").hidden = false;
    let keyword = document.getElementById("search_bar").value;
    let url = "https://elearning-aueb.herokuapp.com/courses/search?title="+ keyword ;
    // request.open("GET", url)
    // request.setRequestHeader('Accept', 'application/json')
    // request.send()
    // 
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    let init ={
    method: "GET",
    headers: myHeaders
    }

    let template = document.querySelector("#courses-details-template").innerHTML;
    let compiled_template = Handlebars.compile(template);

        fetch(url, init)
        .then(response => response.json() )
        .then(obj => {
            console.log('Received object', obj)
            let coursesRecieved = {courses: []};
            if (obj != null){
                for (course in obj){
                    coursesRecieved["courses"].push({"id": obj[course].id,"title":obj[course].title,"category":obj[course].category,"objectives":obj[course].objectives,"description":obj[course].description,"img":obj[course].img})
                }
            } else {
                console.log("No courses found...")
            }
            console.log(coursesRecieved);
            let rendered = compiled_template(coursesRecieved);
            let  htmlCourses = document.querySelector("#courses_found");
            htmlCourses.innerHTML = rendered;
        })
        .catch(error => {
            console.log(error)
        })


    }
