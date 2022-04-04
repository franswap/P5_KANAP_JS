let ajoutPanier = JSON.parse(localStorage.getItem("canapé"));
console.log(ajoutPanier);

let someProduct = [];


const fichePanier = async () => {
  if (ajoutPanier) {
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
                  <p id="${canapé._id}" class="deleteItem" onclick="deleteItemById(this.id)">Supprimer</p>
                </div>
                </div>
            </div>
      </article>
        `
    );
  }
};

fichePanier();


const deleteItemById = async (fichePanier) => {
  await fichePanier;

  let supprimerProduit = document.querySelectorAll(".deleteItem");
  console.log(supprimerProduit);


  for (let y = 0; y < supprimerProduit.length; y++)
  supprimerProduit[y].addEventListener("click", (e) => {
    e.preventDefault()

    ajoutPanier = ajoutPanier.filter( el => el._id !== supprimerProduit)

    localStorage.setItem("canapé",JSON.stringify(ajoutPanier))

    alert(`vous avez supprimé le ${canapé.name}`)

    window.location.href = "panier.html";
    })
}

deleteItemById ();

  let totalQuantite = [];

  for (let m = 0; m < ajoutPanier.length; m++) {
    let produitQuantite = ajoutPanier[m].quantite;

    totalQuantite.push(produitQuantite)

    console.log(totalQuantite);
  }

     const reduce = (accumulator, currentValue) => accumulator + currentValue;
     const quantiteTotal = totalQuantite.reduce(reduce, 0);
     console.log(quantiteTotal);

     const quantiteHtml = document.querySelector("#totalQuantity").innerHTML =
     `<span>${quantiteTotal}</span>`

  let totalPrice = [];

  for (let m = 0; m < ajoutPanier.length; m++) {
    let produitPrix = ajoutPanier[m].price;
    let quantitePrix = ajoutPanier[m].quantite;

    let prixCoeff = produitPrix * quantitePrix

    totalPrice.push(prixCoeff)

    console.log(totalPrice);
  }

     const reducer = (accumulator, currentValue) => accumulator + currentValue;
     const prixTotal = totalPrice.reduce(reducer, 0);
     console.log(prixTotal);

     const prixHtml = document.querySelector("#totalPrice").innerHTML =
     `<span>${prixTotal}</span>`



function formulaireContent() {

  let form = document.querySelector(".cart__order__form");

  let regExpChamps = new RegExp("^[a-zA-Z ,.'-]+$");

  let regExpEmail = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );

  let regExpAdresse = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );


  form.firstName.addEventListener("change", function () {
    prenomCheck(this);
  });

  form.lastName.addEventListener("change", function () {
    nomCheck(this);
  });

  form.address.addEventListener("change", function () {
    adresseCheck(this);
  });

  form.city.addEventListener("change", function () {
    villeCheck(this);
  });

  form.email.addEventListener("change", function () {
    emailCheck (this);
  });


  const prenomCheck = function (prenomChamps) {
    let notifPrenom = prenomChamps.nextElementSibling;

    if (regExpChamps.test(prenomChamps.value)) {
      notifPrenom.innerHTML = "";
    } else {
      notifPrenom.innerHTML = "Quel est votre prenom ?"; 
    }
  };

  const nomCheck = function (nomChamps) {
    let notifNom = nomChamps.nextElementSibling;

    if (regExpChamps.test(nomChamps.value)) {
      notifNom.innerHTML = "";
    } else {
      notifNom.innerHTML = "Quel est votre nom ?"; 
    }
  };

  const adresseCheck = function (adresseChamps) {
    let notifAdresse = adresseChamps.nextElementSibling;

    if (regExpAdresse.test(adresseChamps.value)) {
      notifAdresse.innerHTML = "";
    } else {
      notifAdresse.innerHTML = "Quelle est votre adresse ?"; 
    }
  };

  const villeCheck = function (villeChamps) {
    let notifVille = villeChamps.nextElementSibling;

    if (regExpChamps.test(villeChamps.value)) {
      notifVille.innerHTML = "";
    } else {
      notifVille.innerHTML = "Dans quelle ville habitez-vous ?"; 
    }
  };

  const emailCheck = function (emailChamps) {
    let notifEmail = emailChamps.nextElementSibling;

    if (regExpEmail.test(emailChamps.value)) {
      notifEmail.innerHTML = "";
    } else {
      notifEmail.innerHTML = "Quelle est votre adresse email ? (promis, pas de SPAM !)"; //On renvoie l'utilisateur sur le champs qu'il a mal rempli
    }
  };
}

formulaireContent();


function postForm() {
  const btn_commander = document.getElementById("order");

  btn_commander.addEventListener("click", (event) => {

    let prenomData = document.getElementById("firstName");
    let nomData = document.getElementById("lastName");
    let adresseData = document.getElementById("address");
    let villeData= document.getElementById("city");
    let mailData = document.getElementById("email");

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

    const options = {
      method: "POST",
      body: JSON.stringify(commande),
      headers: {"Content-Type": "application/json"},
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then(
        (response) => response.json())
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