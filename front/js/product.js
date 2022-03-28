// Tout d'abord, on va recuperer les données presentent dans l'URL. via la methode window location
const idCanap = window.location.search
  .split("?") // on enleve le point d'interrogation pour recup l'id
  .join(""); // on enleve la premiere valeure vide que va nous retourner notre methode

console.log(idCanap); // On regarde bien qu'on ne recupere que l'id dans la console.

let canap = []; // On va stoker notre élément dans un tableau

const quantity = document.querySelector("#quantity");

const fetchCanap = async () => {
  await fetch(`http://localhost:3000/api/products/${idCanap}`) // On va injecter l'URL du canapé
    .then((res) => res.json())
    .then((promise) => {
      canap = promise;
      console.log(canap);
    });
};

// on va chercher nos données de maniere asynchrone
const ficheCanap = async () => {
  await fetchCanap();

  // L'image du produit doit etre injecté dans la class item_img de l'html
  document.querySelector(".item__img").innerHTML = `<div>
                <img src="${canap.imageUrl}" alt="canapé ${canap.name}"></img>
            </div>`;

  // Le nom du produit doit etre injecté dans l'id title de l'html
  document.getElementById("title").innerHTML = `<div>
                <h1>${canap.name}</h1>               
            </div>`;

  // Le prix du produit doit etre injecté dans l'id price de l'html
  document.getElementById("price").innerHTML = `<div>
                <span>${canap.price}</span>          
            </div>`;

  // La description du produit doit etre injecté dans l'id description de l'html
  document.getElementById("description").innerHTML = `<div>
            <p>${canap.description}</p>          
        </div>`;

  // La couleur du produit doit etre injecté dans l'id colors de l'html
  let color = document.getElementById("colors");
  // On recupere la liste deroulance, puis on verif dans la console
  console.log(color);
  // On cree une boucle qui va aller chercher nos couleurs à chaque tour de boucle
  canap.colors.forEach((elementColor) => {
    // var avec nos options de couleurs qui vont venir
    let colorCanap = document.createElement("option");
    color.appendChild(colorCanap); // appendChild va nous permettre de placer colorCanap en enfant de color et l'afficher dans la liste deroulante
    colorCanap.value = elementColor;
    colorCanap.innerHTML = elementColor;
  });
  ajoutPanier(canap); // on ajoute nos produits au panier
};

ficheCanap();

// PARTIE PANIER

// On va creer une fonction pour ajouter nos items au panier

const ajoutPanier = () => {
  let ajouter = document.querySelector("#addToCart");
  ajouter.addEventListener("click", () => {
    if (quantity.value > 0 && quantity.value < 100) {
    // On créé une variable pour recup les data du local storage et pour mettre nos futurs data
    let canapStorage = JSON.parse(localStorage.getItem("canapé"));
    // On va recup la couleur choisi par l'utilisateur
    let option = document.getElementById("colors");
    console.log(option);

    // On doit recuperer la valeur exact de la couleur avec la methode assign
    const colorCanap = Object.assign({}, canap, {
      // On cree un objet qui va contenir:
      couleur: `${option.value}`, // le choix de la couleur de notre canap
      quantite: parseFloat(document.querySelector("#quantity").value), // sa quantité
    });
    console.log(colorCanap);

    // On verifie que le localstorage est vide. S'il est vide, on lui indique que nos data seront dans un tableau
    if (canapStorage == null) {
      canapStorage = [];
      canapStorage.push(colorCanap);
      console.log(canapStorage);
      // On va faire prendre au local storage une clée canapé avec une valeur en string de notre tableau de données
      localStorage.setItem("canapé", JSON.stringify(canapStorage));
    }

    // Si le local host n'est pas nulle
    else if (canapStorage != null) {
      // On va faire une boucle qui compare larticle quon va ajouter ajouter (type et couleur)
      for (i = 0; i < canapStorage.length; i++) {
        if (
          canapStorage[i]._id == canap._id &&
          canapStorage[i].couleur == colors.value
        ) {
          // Si les deux articles sont similaires, on ajoute la quantité souhaité en plus au panier
          return (
            canapStorage[i].quantite++,
            console.log("L'article a bien été ajouté au panier"),
            localStorage.setItem("canapé", JSON.stringify(canapStorage)),
            (canapStorage = JSON.parse(localStorage.getItem("canapé")))
          );
        }
      }
      // Si les deux articles sont similaires mais que la couleur differe, on ajoute un new canap
      // Ou qu'on ajoute un article different
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
