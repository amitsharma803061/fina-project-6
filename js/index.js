const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayCategories(json.categories))
}; 

const loadPlants = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`;

    fetch(url)
    .then((res) => res.json())
    .then((json) => displayPlantsCategory(json.plants))
};

const displayCategories = (lessons) => {
    const categoriesContainer = document.getElementById("categories-container");
    categoriesContainer.innerHTML = "";

    for (let lesson of lessons) {
        console.log(lesson);
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button onclick="loadPlants(${lesson.id})" class="bg-transparent text-xl text-black px-15 py-2 rounded-md font-medium hover:bg-[#15803D] hover:text-white transition-all duration-300">
                     ${lesson.category_name}
                </button>

        `;

        categoriesContainer.append(btnDiv);
    }


};

// {
// "id": 1,
// "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
// "name": "Mango Tree",
// "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
// "category": "Fruit Tree",
// "price": 500
// },
const displayPlantsCategory = (Plants) => {
    const plantsContainer = document.getElementById("plants-container");
    plantsContainer.innerHTML = "";

    Plants.forEach((Plant) => {
        const plantsCard =document.createElement("div");
        plantsCard.innerHTML = ` 
            <div  class="card bg-base-100 w-100 h-125 shadow-sm rounded-2xl py-6">
                    <figure class=" px-10 pt-10">
                        <img
                        src="${Plant.image}"
                        >
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">${Plant.name}</h2>
                        <p>${Plant.description}</p>
                        <div class="flex justify-between">
                            <button class="btn bg-[#DCFCE7] rounded-4xl">${Plant.category}</button>
                            <h2 class="text-xl">$ ${Plant.price}</h2>
                        </div>
                        <button class="text-white text-xl btn bg-[#15803D] rounded-4xl h-14">Add to Cart</button>
                    </div>
                </div>
        
        `;

        plantsContainer.append(plantsCard);
    });
}

loadCategories();