let category = document.getElementById("categories");
let mealCards = document.getElementById("mealCards");
let mealTitle = document.getElementById("mealTitle");
let mealDesc = document.getElementById("mealDesc");


// Get categories
fetch("https://www.themealdb.com/api/json/v1/1/categories.php")

    .then(response => response.json())

    .then(data => {

        data.categories.forEach(value => {

            category.innerHTML += `
                <div class="category"
                     onclick="getMeals('${value.strCategory}')">

                    ${value.strCategory}

                </div>
            `;

        });

    });


// Get meals by category
function getMeals(categoryName) {

    mealCards.innerHTML = "";
    mealTitle.innerHTML = "";
    mealDesc.innerHTML = "";


    // First get category description
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")

        .then(response => response.json())

        .then(data => {

            let selectedCategory = data.categories.find(
                value => value.strCategory === categoryName
            );


            mealDesc.innerHTML = `
                <div class="description">

                    <h2>${selectedCategory.strCategory}</h2>

                    <p>
                        ${selectedCategory.strCategoryDescription}
                    </p>

                </div>
            `;

        });


    // Get meals
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)

        .then(response => response.json())

        .then(data => {

            mealTitle.innerHTML = `
                <div class="meal-Title">

                    <h1>MEALS</h1>

                    <div class="mealLine"></div>

                </div>
            `;


            data.meals.forEach(meal => {

                mealCards.innerHTML += `

                    <a href="" class="itemCheck">

                        <div class="meal-cards">

                            <img
                                src="${meal.strMealThumb}"
                                alt="${meal.strMeal}"
                            >

                           

                            <h6>
                                ${meal.strMeal}
                            </h6>

                        </div>

                    </a>

                `;

            });

        })

        .catch(error => {
            console.log("Error:", error);
        });

}