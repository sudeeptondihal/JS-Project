let category = document.getElementById("categories");
let cards = document.getElementById("cards");
let search = document.getElementById("search");
let searchBtn = document.getElementById("search-btn");
let mealCards = document.getElementById("mealCards");
let mealTitle = document.getElementById("mealTitle");


// GET CATEGORIES

fetch("https://www.themealdb.com/api/json/v1/1/categories.php")

    .then(response => response.json())

    .then(data => {

        data.categories.forEach(value => {

            // OFFCANVAS MENU

            category.innerHTML += `

                <div class="category"
                     onclick="openCategory('${value.strCategory}')">

                    ${value.strCategory}

                </div>

            `;


            // CATEGORY CARDS

            cards.innerHTML += `

                <a href="second.html?category=${encodeURIComponent(value.strCategory)}">

                    <div class="card">

                        <img
                            src="${value.strCategoryThumb}"
                            alt="${value.strCategory}"
                        >

                        <span>
                            ${value.strCategory}
                        </span>

                    </div>

                </a>

            `;

        });

    })

    .catch(error => {

        console.log("Error:", error);

    });
// MENU CATEGORY CLICK

// function openCategory(categoryName) {

//     window.location.href =
//         "second.html?category=" + encodeURIComponent(categoryName);

// }
let url = new URLSearchParams(window.location.search);

let mealId = url.get("id");

let mealDetails = document.getElementById("mealDetails");


if (mealId) {

    fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    )

        .then((res) => {

            return res.json();

        })

        .then((data) => {

            if (!data.meals) {

                mealDetails.innerHTML =
                    "<h2>No meals found</h2>";

                return;
            }


            let meal = data.meals[0];


            mealDetails.innerHTML = `

                <div>

                    <img
                        src="${meal.strMealThumb}"
                        alt="${meal.strMeal}"
                    >

                    <h2>
                        ${meal.strMeal}
                    </h2>

                    <p>
                        Category: ${meal.strCategory}
                    </p>

                    <p>
                        Area: ${meal.strArea}
                    </p>

                    <h3>
                        Instructions
                    </h3>

                    <p>
                        ${meal.strInstructions}
                    </p>

                    <h3>
                        Ingredients
                    </h3>

                    <ul>

                        <li>
                            ${meal.strIngredient1}
                            -
                            ${meal.strMeasure1}
                        </li>

                        <li>
                            ${meal.strIngredient2}
                            -
                            ${meal.strMeasure2}
                        </li>

                        <li>
                            ${meal.strIngredient3}
                            -
                            ${meal.strMeasure3}
                        </li>

                    </ul>

                    <a
                        href="${meal.strYoutube}"
                        target="_blank"
                    >
                        Watch Recipe Video
                    </a>

                </div>

            `;

        })

        .catch((error) => {

            console.log("Error:", error);

        });

}