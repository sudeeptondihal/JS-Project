let category = document.getElementById("categories");
let mealCards = document.getElementById("mealCards");
let mealTitle = document.getElementById("mealTitle");
let mealDesc = document.getElementById("mealDesc");


// GET CATEGORIES FOR MENU

fetch("https://www.themealdb.com/api/json/v1/1/categories.php")

    .then(response => response.json())

    .then(data => {

        data.categories.forEach(value => {

            category.innerHTML += `

                <div class="category"
                     onclick="openCategory('${value.strCategory}')">

                    ${value.strCategory}

                </div>

            `;

        });

    })

    .catch(error => {

        console.log("Category Error:", error);

    });


// OPEN CATEGORY

function openCategory(categoryName) {

    window.location.href =
        "second.html?category=" + encodeURIComponent(categoryName);

}


// GET CATEGORY FROM URL

let url = new URLSearchParams(window.location.search);

let categoryName = url.get("category");


// GET CATEGORY DESCRIPTION

fetch("https://www.themealdb.com/api/json/v1/1/categories.php")

    .then(response => response.json())

    .then(data => {

        let selectedCategory = data.categories.find(
            value => value.strCategory === categoryName
        );


        if (selectedCategory) {

            mealDesc.innerHTML = `

                <div class="description">

                    <h2>
                        ${selectedCategory.strCategory}
                    </h2>

                    <p>
                        ${selectedCategory.strCategoryDescription}
                    </p>

                </div>

            `;

        }

    })

    .catch(error => {

        console.log("Description Error:", error);

    });


// GET MEALS

fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(categoryName)}`
)

    .then(response => response.json())

    .then(data => {

        // mealTitle.innerHTML = `

        //     <div class="meal-Title">

        //         <h1>
        //             ${categoryName} MEALS
        //         </h1>

        //         <div class="mealLine"></div>

        //     </div>

        // `;


        // if (!data.meals) {

        //     mealCards.innerHTML = `
        //         <h2>NO MEALS FOUND</h2>
        //     `;

        //     return;

        // }


        data.meals.forEach(meal => {

            mealCards.innerHTML += `
<a href="third.html?id=${meal.idMeal}" class="itemCheck">

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

        console.log("Meal Error:", error);

    });