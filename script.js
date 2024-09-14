let url = "https://www.themealdb.com/api/json/v1/1/search.php?s="

let box = document.querySelector(".searchbox")
let btn = document.querySelector("#search")
let food = document.querySelector(".dishname")
let menu = document.querySelector(".varieties")
let bkg = document.querySelector(".box-2")


let modal = document.getElementById("modal");
let modalDishname = document.getElementById("modal-dishname");
let modalImage = document.getElementById("modal-image");
let ingredientsList = document.getElementById("ingredients-list");
let instructions = document.getElementById("instructions");
let closeModal = document.querySelector(".close");

async function recepie(dishname) {
    try {
        let response = await fetch(url + dishname)
        let data =  await response.json()

        

        if(data.meals){
            menu.innerHTML="";
            for (const element of data.meals) {
                console.log(element);
                document.querySelector(".errorbox").style.display="none"
                
                let div = document.createElement("div");
                let p1 = document.createElement("p");
                let p2 = document.createElement("p");
                let p4 = document.createElement("p");
                let img = document.createElement("img")
                
                p1.append(element.strMeal);
                div.append(p1);
                menu.append(div)

                p2.append(element.strCategory);
                div.append(p2);
                menu.append(div)

                p4.append(element.strArea);
                div.append(p4);
                menu.append(div)

                img.src = element.strMealThumb
                div.append(img);
                menu.append(div)


                img.addEventListener("click", () => showModal(element));                
            }
        }else{
            document.querySelector(".errorbox").style.display="block"
            let ebox = document.querySelector(".errorbox")
            ebox.innerText = "No meals found for the given dish."
            
            console.log("No meals found for the given dish.");
        }

    } catch (error) {
        console.error("error")
    }
    
}

function showModal(meal) {
    modal.style.display = "block"; // Show the modal
    modalDishname.textContent = meal.strMeal;
    modalImage.src = meal.strMealThumb;
    instructions.textContent = meal.strInstructions;

    ingredientsList.innerHTML = ""; // Clear previous ingredients
    // Loop through ingredients and add them to the list
    for (let i = 1; i <= 20; i++) {
        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
            let li = document.createElement("ul");
            li.textContent = `${ingredient} - ${measure}`;
            ingredientsList.appendChild(li);
        }
    }
}

// Close the modal
closeModal.addEventListener("click", () => {
    modal.style.display = "none"; // Hide the modal
});

// Close modal when clicking outside of modal content
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

btn.addEventListener("click",()=>{
    if(box.value){
        recepie(box.value);
        console.log(box.value);
    }else{
        
        let ebox = document.querySelector(".errorbox")
        ebox.style.display="block"
        ebox.innerText = "Please enter dish name to search."

    }
   
})