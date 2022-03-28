// On va d'abord recuperer les données que l'on a stockées
// dans le local storage pour les afficher dans notre panier

let ajoutPanier = JSON.parse(localStorage.getItem("canapé"));

// Comme d'habitude, on verifie, qu'on recuperer bien notre panier
// dans le local host

console.log(ajoutPanier);

let someProduct = [];

const fichePanier = async () => {
  if (ajoutPanier) {
    // si le panier contient un element on va lui demander de l'afficher
    await ajoutPanier;

    cart__items.innerHTML = ajoutPanier.map(
      (canapé) =>
        `
            <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                    <img src="${canapé.imageUrl}" alt="Photographie de ${canapé.name}">
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${canapé.name}</h2>
                        <p>${canapé.couleur}</p>
                        <p class="price">${canapé.price} €</p>
                    </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canapé.quantite}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
                </div>
            </div>
      </article>
        `
    );
  }
};

fichePanier();

// PARTIE SUPPRESSION D'ITEM DANS NOTRE PANIER

//On va creer une fonction qui va recuperer nos données de panier 
const supprimerItemPanier = async (fichePanier) => {
  await fichePanier;

// On selectionne notre champs supprimer dans notre page
  let supprimerProduit = document.querySelectorAll(".deleteItem");
  console.log(supprimerProduit);


  for (let y = 0; 1 < supprimerProduit.lenght; y++)
  supprimerProduit[y].addEventListener("click", (e) => {
    e.preventDefault();

    // On veut supprimer le produit en passant par son identite: son id
    let supprID = ajoutPanier[y]._id;
    console.log(supprID);

    // On va utiliser la methode filter pour supprimer notre élément
    ajoutPanier = ajoutPanier.filter( el => el._id !== supprID)

    // Push dans le localstorage
    localStorage.setItem("canapé",JSON.stringify(ajoutPanier))

    // On indique que l'objet a été suppr 
    alert(`vous avez supprimé le ${canapé.name}`)

    // On raffrechit la page
    window.location.href = "panier.html";
    })
}

supprimerItemPanier ();


// PARTIE SOMME QUANTITE DE NOTRE PANIER

  // On va stocker nos pris dans un array
  let totalQuantite = [];

  // On va chercher nos prix present dans le panier
  for (let m = 0; m < ajoutPanier.length; m++) {
    let produitQuantite = ajoutPanier[m].quantite;

    // On push nos pris dans le tableau
    totalQuantite.push(produitQuantite)

    console.log(totalQuantite);
  }

    // On va utiliser la methode reduce qui va nous permettre de sommer nos prix
     const reduce = (accumulator, currentValue) => accumulator + currentValue;
     const quantiteTotal = totalQuantite.reduce(reduce, 0);
     console.log(quantiteTotal);

     // Il nous reste plus qu'a afficher cette somme dans notre html
     const quantiteHtml = document.querySelector("#totalQuantity").innerHTML =
     `<span>${quantiteTotal}</span>`


// PARTIE SOMME PRIX DE NOTRE PANIER


  // On va stocker nos pris dans un array
  let totalPrice = [];

  // On va chercher nos prix present dans le panier
  for (let m = 0; m < ajoutPanier.length; m++) {
    let produitPrix = ajoutPanier[m].price;

    // On push nos pris dans le tableau
    totalPrice.push(produitPrix)

    console.log(totalPrice);
  }

    // On va utiliser la methode reduce qui va nous permettre de sommer nos prix
     const reducer = (accumulator, currentValue) => accumulator + currentValue;
     const prixTotal = totalPrice.reduce(reducer, 0);
     console.log(prixTotal);

     // Il nous reste plus qu'a afficher cette somme dans notre html
     const prixHtml = document.querySelector("#totalPrice").innerHTML =
     `<span>${prixTotal}</span>`


// PARTIE FORMULAIRE

// On va creer une fonction pour verifier et valider les informations saisies dans notre formulaire.

function formulaireContent() {

  // I- LA CREATION DES EXPRESSIONS REGULIERES
  // La premiere étape est d'ajouter des expressions regulieres (des RegExp) à utiliser dans les champs du formulaire

  let form = document.querySelector(".cart__order__form");

  // On cree nos expressions regulieres:

  let regExpChamps = new RegExp("^[a-zA-Z ,.'-]+$");

  let regExpEmail = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );

  let regExpAdresse = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );

  // II- LA SAISI DES CHAMPS

  // On va ensuite ajouter un evenement à chacun des champs de notre formulaire pour qu'il puisse comprendre que le champs se rempli

  // step 1: LE PRENOM
  form.firstName.addEventListener("change", function () {
    prenomCheck(this);
  });

  // step 2: LE NOM
  form.lastName.addEventListener("change", function () {
    nomCheck(this);
  });

  // step 3: L'ADRESSE
  form.address.addEventListener("change", function () {
    adresseCheck(this);
  });

  // step 4: LA VILLE
  form.city.addEventListener("change", function () {
    villeCheck(this);
  });

  // step 5: L'EMAIL
  form.email.addEventListener("change", function () {
    emailCheck (this);
  });

    // III- LA VALIDATION DES CHAMPS

    // Une fois cette étape réalisée, il faut créer une fonction qui renvoie un message d'erreur si le champs est vide

  // step 1: LE PRENOM - VALIDATION
  const prenomCheck = function (prenomChamps) {
    let notifPrenom = prenomChamps.nextElementSibling;

    if (regExpChamps.test(prenomChamps.value)) {
      notifPrenom.innerHTML = "";
    } else {
      notifPrenom.innerHTML = "Quel est votre prenom ?"; //On renvoie l'utilisateur sur le champs qu'il n'a pas rempli
    }
  };

  // step 2: LE NOM - VALIDATION
  const nomCheck = function (nomChamps) {
    let notifNom = nomChamps.nextElementSibling;

    if (regExpChamps.test(nomChamps.value)) {
      notifNom.innerHTML = "";
    } else {
      notifNom.innerHTML = "Quel est votre nom ?"; //On renvoie l'utilisateur sur le champs qu'il n'a pas rempli
    }
  };

  // step 3: L'ADRESSE - VALIDATION
  const adresseCheck = function (adresseChamps) {
    let notifAdresse = adresseChamps.nextElementSibling;

    if (regExpAdresse.test(adresseChamps.value)) {
      notifAdresse.innerHTML = "";
    } else {
      notifAdresse.innerHTML = "Quelle est votre adresse ?"; //On renvoie l'utilisateur sur le champs qu'il n'a pas rempli
    }
  };

  // step 4: LA VILLE - VALIDATION
  const villeCheck = function (villeChamps) {
    let notifVille = villeChamps.nextElementSibling;

    if (regExpChamps.test(villeChamps.value)) {
      notifVille.innerHTML = "";
    } else {
      notifVille.innerHTML = "Dans quelle ville habitez-vous ?"; //On renvoie l'utilisateur sur le champs qu'il n'a pas rempli
    }
  };

  // step 5: L'EMAIL - VALIDATION
  const emailCheck = function (emailChamps) {
    let notifEmail = emailChamps.nextElementSibling;

    if (regExpEmail.test(emailChamps.value)) {
      notifEmail.innerHTML = "";
    } else {
      notifEmail.innerHTML = "Quelle est votre adresse email ? (promis, pas de SPAM !)"; //On renvoie l'utilisateur sur le champs qu'il n'a pas rempli
    }
  };
}

formulaireContent();


// PARTIE ENVOIE DONNEES DU FORMULAIRE AU LOCAL STORAGE

//On va donner les informations que l'utilisateur a renseigné au local storage
function postForm() {
  const btn_commander = document.getElementById("order");

  // Quand l'utilisateur va cliquer sur commander, on va recuperer ses données

  btn_commander.addEventListener("click", (event) => {

    let prenomData = document.getElementById("firstName");
    let nomData = document.getElementById("lastName");
    let adresseData = document.getElementById("address");
    let villeData= document.getElementById("city");
    let mailData = document.getElementById("email");

    // Dans le local storage, on va creer un tableau pour stocker les données qu'on a receptionnée
    let produitCommande = [];
    for (let i = 0; i < produitLocalStorage.length; i++) {
      produitCommande.push(produitLocalStorage[i].idProduit);
    }
    console.log(produitCommande);

    const commande = {
      contact: {
        prenomData: prenomChamps.value,
        nomData: nomChamps.value,
        adresseData: adresseChamps.value,
        villeData: villeChamps.value,
        mailData: emailChamp.value,
      },
      products: produitCommande
    };

    // On va maintenant envoyer notre requete au back

    // On cree une requete POST
    const options = {
      method: "POST",
      body: JSON.stringify(commande),
      headers: {"Content-Type": "application/json"},
    };

    // On envoie la requete et on change de page avec un localstorage clear pour passer une nouvelle commande.
    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((commandeData) => {
        console.log(data);
        localStorage.clear();
        localStorage.setItem("orderId", commandeData.orderId);

        document.location.href = "confirmation.html";
      })
      .catch((error) => {
        alert("Problème avec fetch : " + error.message);
      });
  });
}

postForm();
