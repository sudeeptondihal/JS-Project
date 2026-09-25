let category = document.getElementById("categories");
let cards = document.getElementById("cards");
let search = document.getElementById("search");
let searchBtn = document.getElementById("search-btn");
let mealCards = document.getElementById("mealCards");
let mealTitle = document.getElementById("mealTitle");



fetch("https://www.themealdb.com/api/json/v1/1/categories.php")

    .then(response => response.json())

    .then(data => {

        data.categories.forEach(value => {

            // Offcanvas categories
            category.innerHTML += `

                <a><div class="category">

                    ${value.strCategory}

                </div></a>

            `;

        });

    })


    .catch(error => {

        console.log("Error:", error);

    });
