let category = document.getElementById("categories");
let cards = document.getElementById("cards");
let search = document.getElementById("search");
let searchBtn = document.getElementById("search-btn");
let mealCards = document.getElementById("mealCards");
let mealTitle = document.getElementById("mealTitle");

// GET CATEGORIES

fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  .then((response) => response.json())

  .then((data) => {
    data.categories.forEach((value) => {
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

  .catch((error) => {
    console.log("Error:", error);
  });

let url = new URLSearchParams(window.location.search);

let mealId = url.get("id");

let mealDetails = document.getElementById("mealDetails");

if (mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => {
      return res.json();
    })

    .then((data) => {
      if (!data.meals) {
        mealDetails.innerHTML = "<h2>No meals found</h2>";

        return;
      }

      let meal = data.meals[0];

      let ingredientsHTML = "";

      for (let i = 1; i <= 20; i++) {
        let ingredient = meal["strIngredient" + i];
        

        if (ingredient && ingredient.trim() !== "") {
          ingredientsHTML += `
            <li>
                ${ingredient}
            </li>
        `;
        }
      }

      let measurementsHTML = "";
      for (let i = 1; i <= 20; i++) {
        let ingredient = meal["strIngredient" + i];
        let measure = meal["strMeasure" + i];

        if (ingredient && ingredient.trim() !== "") {
          measurementsHTML += `
                    <div class="measure-item">
                    <div>
                        <img src="">
                        <span>${measure || "As required"}</span>
                    </div>
                    <span>${ingredient}</span>
                    </div>
                    `;
        }
      }

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
                        Source: ${meal.strYoutube}
                    </p>

                    <h3>
                        Ingredients
                    </h3>

                   <ul>
                     ${ingredientsHTML}
                    </ul>

                    <div>
                        ${measurementsHTML}
                    </div>

                    <h3>
                        Instructions
                    </h3>

                    <p>
                        ${meal.strInstructions}
                    </p>

                </div>

            `;
    })

    .catch((error) => {
      console.log("Error:", error);
    });
}
