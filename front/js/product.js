const idCanap = window.location.search
  .split("?")
  .join(""); 

console.log(idCanap);

let canap = [];

const quantity = document.querySelector("#quantity");

const fetchCanap = async () => {
  await fetch(`http://localhost:3000/api/products/${idCanap}`)
    .then((res) => res.json())
    .then((promise) => {
      canap = promise;
      console.log(canap);
    });
};

const ficheCanap = async () => {
  await fetchCanap();

  document.querySelector(".item__img").innerHTML = 
            `<div>
                <img src="${canap.imageUrl}" alt="canapé ${canap.name}"></img>
            </div>`;

  document.getElementById("title").innerHTML = 
            `<div>
                <h1>${canap.name}</h1>               
            </div>`;

  document.getElementById("price").innerHTML = 
            `<div>
                <span>${canap.price}</span>          
            </div>`;

  document.getElementById("description").innerHTML = 
          `<div>
            <p>${canap.description}</p>          
          </div>`;

  let color = document.getElementById("colors");

  console.log(color);

  canap.colors.forEach((elementColor) => {
    let colorCanap = document.createElement("option");
    color.appendChild(colorCanap); 
    colorCanap.value = elementColor;
    colorCanap.innerHTML = elementColor;
  });
  ajoutPanier(canap);
};

ficheCanap();

const ajoutPanier = () => {
  let ajouter = document.querySelector("#addToCart");
  ajouter.addEventListener("click", () => {
    if (quantity.value > 0 && quantity.value < 100) {
    let canapStorage = JSON.parse(localStorage.getItem("canapé"));
    let option = document.getElementById("colors");
    console.log(option);

    const colorCanap = Object.assign({}, canap, {
      couleur: `${option.value}`, 
      quantite: parseFloat(document.querySelector("#quantity").value),
    });
    console.log(colorCanap);

    if (canapStorage == null) {
      canapStorage = [];
      canapStorage.push(colorCanap);
      console.log(canapStorage);
      localStorage.setItem("canapé", JSON.stringify(canapStorage));
    }

    else if (canapStorage != null) {
      for (i = 0; i < canapStorage.length; i++) {
        if (
          canapStorage[i]._id == canap._id &&
          canapStorage[i].couleur == colors.value
        ) {
          return (
            canapStorage[i].quantite= canapStorage[i].quantite + parseFloat(document.querySelector("#quantity").value),
            console.log("L'article a bien été ajouté au panier"),
            localStorage.setItem("canapé", JSON.stringify(canapStorage)),
            (canapStorage = JSON.parse(localStorage.getItem("canapé")))
          );
        }
      }
      for (i = 0; i < canapStorage.length; i++) {
        if (
          (canapStorage[i]._id == canap._id &&
            canapStorage[i].couleur != colors.value) ||
          canapStorage[i]
        ) {
          return (
            console.log("Votre nouvel article a été ajouté au panier"),
            canapStorage.push(colorCanap),
            localStorage.setItem("canapé", JSON.stringify(canapStorage)),
            (canapStorage = JSON.parse(localStorage.getItem("canapé")))
          );
        }
      }
    }
  } else {
    console.log("La quantité doit être comprise entre 1 et 99.");
  }
});
  return (canapStorage = JSON.parse(localStorage.getItem("canapé")));

};