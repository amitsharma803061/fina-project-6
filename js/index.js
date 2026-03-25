
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayCategories(json.categories))
}; 

const loadPlants = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`;

    const catBtns = document.querySelectorAll(".btn-category");
    catBtns.forEach((btn) => btn.classList.remove("active"));

   const currentBtn =document.getElementById(`lesson-btn-${id}`);
   console.log(currentBtn);
   currentBtn.classList.add("active");

    fetch(url)
    .then((res) => res.json())
    .then((json) => displayPlantsCategory(json.plants))
};

const loadOneTreeDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    console.log(url);

    fetch(url)
    .then((res) => res.json())
    .then((json) => displayPlantsDetails(json.plants))
}

const loadRandomPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((json) => displayPlantsCategory(json.plants))
};

let cart = [];
let total = 0;


const displayCategories = (lessons) => {
    const categoriesContainer = document.getElementById("categories-container");
    categoriesContainer.innerHTML = "";

    for (let lesson of lessons) {
        console.log(lesson);
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.id}" onclick="loadPlants(${lesson.id})" class="bg-transparent text-2xl text-black px-15 py-2 rounded-md text-gray-500 hover:bg-[#15803D] hover:text-white transition-all duration-300 btn-category">
                     ${lesson.category_name}
                </button>

        `;

        categoriesContainer.append(btnDiv);
    }


};

const displayPlantsCategory = (Plants) => {
    const plantsContainer = document.getElementById("plants-container");
    plantsContainer.innerHTML = "";

    Plants.forEach((Plant) => {
        const plantsCard =document.createElement("div");
        plantsCard.innerHTML = ` 
            <div onclick="loadOneTreeDetails(${Plant.id})" class="card bg-base-100 w-100 h-125 shadow-sm rounded-2xl py-6">
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
                            <h2 class="text-xl tree-price">$ ${Plant.price} BDT</h2>
                        </div>
                        <button onclick="addToCard(this, event)" class="text-white text-xl btn bg-[#15803D] rounded-4xl h-14 btn-add">Add to Cart</button>
                    </div>
                </div>
        
        `;

        plantsContainer.append(plantsCard);
    });
};

const displayPlantsDetails = (plants) => {
    const detailsContainer =document.getElementById("details-container");
    detailsContainer.innerHTML = `
            <div>
                <h2 class="text-xl font-bold">${plants.name}</h2>
                <img src="${plants.image}" alt="">
                <h2><span class="font-bold">Category:</span>${plants.category}</h2>
                <h2><span class="font-bold">Price:</span>$${plants.price} BDT</h2>
                <p><span class="font-bold">Description:</span>${plants.description}</p>
            </div>
             
            <div class="modal-action">
                <label for="my_modal_6" class="btn">Close!</label>
            </div>
    
    `;
    document.getElementById("my_modal_6").checked = true;
};



loadCategories();
loadRandomPlants();


// document.getElementById("plants-container").addEventListener("click", (e) => {
//     console.log(e.target);
// }); 

const addToCard = (btn, event) => {
    event.stopImmediatePropagation();
    const card = btn.parentNode.parentNode;
    const treeName = card.querySelector(".card-title").innerText;
    const treePrice =card.querySelector(".tree-price").innerText;
    // const treePriceNum = parseInt(treePrice.replace(/[^0-9]/g, ''));
    const treePriceNum = parseInt(treePrice.replace(/[^0-9]/g, ''));
    // const treePriceNum = Number(treePrice);
    // console.log(treeName, treePriceNum);

    const selectedItem = {
        id: cart.length + 1,
        treeName: treeName,
        treePrice: treePriceNum,
    };
    cart.push(selectedItem);
    total = total + treePriceNum;
    displayCart(cart);
    displayTotal(total);
};

const displayTotal = (val) => {
    document.getElementById("cart-total").innerHTML = val;
};


const displayCart = (cart) => {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";

    for(let item of cart){
        const newItems = document.createElement("div");
            newItems.innerHTML = `
                    <div class=" flex justify-between bg-[#F0FDF4] w-60 h-20 rounded-lg shadow-md gap-6 py-3 px-3">
                        <div class="">
                            
                            <h2 class="text-xl font-medium tree-title"><span class="hidden cart-id">${item.id}</span>  ${item.treeName}</h2>
                            <p class="text-xl text-gray-400 item-price">${item.treePrice}</p>
                        </div>
                        <div onclick="removeCart(this)" class=" py-3 gap-6"><i class="fa-solid fa-xmark"></i></div>
                    </div>
                    
            
            
            `;

            cartContainer.append(newItems);
    };
};

const removeCart = (btn) => {
    const item = btn.parentNode;
    const id =Number(item.querySelector(".cart-id").innerText);
    const treePrice = Number(item.querySelector(".item-price").innerText);

    cart = cart.filter((item) => item.id != id);
    total = 0;
    cart.forEach((item) => (total += item.treePrice));
    displayCart(cart);
    displayTotal(total);

}
