let category = document.getElementById("categories");

let cards = document.getElementById("cards");
let search = document.getElementById("search");

let categories = [];


fetch("https://www.themealdb.com/api/json/v1/1/categories.php")

    .then(response => response.json())

    .then(data => {

        categories = data.categories;
        categories.forEach(value => {

            // Offcanvas categories
            category.innerHTML += `

                <div class="category">

                    ${value.strCategory}

                </div>

            `;


            // Category cards
            cards.innerHTML += `

                <div class="card">

                    <img
                        src="${value.strCategoryThumb}"
                        alt="${value.strCategory}"
                    >

                    <span>
                        ${value.strCategory}
                    </span>

                </div>

            `;

        });

    })


    .catch(error => {

        console.log("Error:", error);

    });

    search.addEventListener("input",()=>{
        let value = search.value.toLowerCase()

        cards.innerHTML = "";

        categories.forEach((items)=>{
            if(items.strCategory.toLowerCase().includes(value)){
                cards.innerHTML += `

                <div class="card">

                    <img
                        src="${items.strCategoryThumb}"
                        alt="${items.strCategory}"
                    >

                    <span>
                        ${items.strCategory}
                    </span>

                </div>

            `;
            }
        })
    })