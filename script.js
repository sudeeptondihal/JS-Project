let category = document.getElementById("categories");

let cards = document.getElementById("cards");
let search = document.getElementById("search");
let searchBtn = document.getElementById("search-btn");
let mealCards = document.getElementById("mealCards");
let mealTitle = document.getElementById("mealTitle");

// let categories = [];


fetch("https://www.themealdb.com/api/json/v1/1/categories.php")

    .then(response => response.json())

    .then(data => {

        // categories = data.categories;
        data.categories.forEach(value => {

            // Offcanvas categories
            category.innerHTML += `

                <div class="category">

                    ${value.strCategory}

                </div>

            `;


            // Category cards
            cards.innerHTML += `

                <a href=""><div class="card">

                    <img
                        src="${value.strCategoryThumb}"
                        alt="${value.strCategory}"
                    >

                    <span>
                        ${value.strCategory}
                    </span>

                </div></a>

            `;

        });

    })


    .catch(error => {

        console.log("Error:", error);

    });

   searchBtn.addEventListener("click",(e)=>{
    e.preventDefault()
        let searchVal = search.value.trim()

    mealCards.innerHTML = "";
    mealTitle.innerHTML = "";

    if(searchVal===""){
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchVal}`)
    .then((res)=>res.json())
    .then((data)=>{
        if(!data.meals){
            mealTitle.innerHTML = "";
            mealCards.innerHTML = `<h2>NO MEALS FOUND</h2>`;
            return;
        }
   
     mealTitle.innerHTML = `<div class = "meal-Title">
    
     <h1>MEALS</h1>
      <div id="mealLine"></div>
     <div class="mealLine"></div>
     </div>`;

     data.meals.forEach((meal)=>{
        mealCards.innerHTML += `<a href="" class = "itemCheck"><div class = "meal-cards">
        <img src="${meal.strMealThumb}" >
        <span class="meal-category">${meal.strCategory}</span>
        <p>${meal.strArea}</p>
        <h6>${meal.strMeal}</h6>
        
        </div>
        </a>`;
     })
      .catch((error) => {
            console.log("Search Error:", error);
        });

   })
})

