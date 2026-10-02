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

      let bread = document.getElementById("bread");

      bread.innerHTML = `${meal.strMeal}`;

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
                        <img src="spoon.jpeg" class="spoon">
                        <span>${measure || "As required"}</span>
                    </div>
                    <span>${ingredient}</span>
                    </div>
                    `;
        }
      }

      let tagsHTML = "";

      if (meal.strTags) {
        meal.strTags.split(",").forEach(function (tag) {
          tagsHTML += `<span class="meal-tag">${tag}</span>`;
        });
      } else {
        tagsHTML = "<span>No tags available</span>";
      }

      mealDetails.innerHTML = `

                <div>

                    <img
                        src="${meal.strMealThumb}"
                        alt="${meal.strMeal}"
                    >

                    <h1 class="mealname">
                        ${meal.strMeal}
                    </h1>
                    <hr class="hr">

                    <p class="category1">
                        Category: ${meal.strCategory}
                    </p>

                    <p class="source">
                        Source: ${meal.strSource}
                    </p>

                    <span class="tags">
                      <b>Tags:</b>
                      <span class="tag1">${tagsHTML}</span>
                    </span>


                    <div class="mainIng">
                    <div class="ingredientBox">
                    <div>

                                <h3 class="ing">
                                    Ingredients
                                </h3>
                    </div>
                                <ul class="getIng">
                                    ${getIngredients(meal)}
                                </ul>
                      </div>

                      
                      </div>

                      
              <h3 class="measureheading">
    Measure:
</h3>

<div>
    ${measurementsHTML}
</div>

<h3>
    Instructions:
</h3>

<div class="insSec">
    <div class="instruction">
        ${getInstructions(meal.strInstructions)}
    </div>
</div>
                    </div>

            `;
    })

    .catch((error) => {
      console.log("Error:", error);
    });
}

function getInstructions(instructions) {
  let steps = instructions.split(/\r?\n/).filter((step) => step.trim() !== "");

  return steps
    .map((step) => {
      return `
           <p><i class="fa-solid fa-check" id="rightmark"></i> ${step}</p>
        `;
    })
    .join("");
}

function getIngredients(meal) {
  let ingredients = "";

  for (let i = 1; i <= 20; i++) {
    let ingredient = meal[`strIngredient${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients += `
                <li>${ingredient}</li>
            `;
    }
  }

  return ingredients;
}
