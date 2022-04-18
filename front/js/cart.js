let prenomData = document.querySelector("#firstName")
let nomData = document.querySelector("#lastName")
let adresseData = document.querySelector("#address")
let villeData = document.querySelector("#city")
let mailData = document.querySelector("#email")

console.log(villeData)

let ajoutPanier = JSON.parse(localStorage.getItem("canapé")) ?? [];
console.log(ajoutPanier);

const deleteItem = (_id, couleur) => {
    const findIndexInCart = ajoutPanier.findIndex(
    canap => canap._id === _id && canap.couleur === couleur
    );
    ajoutPanier.splice(findIndexInCart, 1)

    localStorage.setItem("canapé", JSON.stringify(ajoutPanier));

    window.location.href = "cart.html";
    console.log(couleur);
}


const fichePanier = (panier = []) => {
    cart__items.innerHTML = panier.map(({imageUrl, name, couleur, price, quantite, _id}) => {
        const id = _id;
        return (
            `
      <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                    <img src="${imageUrl}" alt="Photographie de ${name}">
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${name}</h2>
                        <p id="${couleur}">${couleur}</p>
                        <p class="price">${price} €</p>
                    </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantite}" onchange="changeQuantityInCart(event, '${_id}', '${couleur}')">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p id="${_id}" class="deleteItem" onclick="deleteItem('${_id}', '${couleur}')">Supprimer</p>
                </div>
                </div>
            </div>
      </article>
      `
        )
        }
    );
};

if (ajoutPanier) {
    fichePanier(ajoutPanier);
}

const changeQuantityInCart = (event, id, color) => {
    const findTheIndexToChange = ajoutPanier.findIndex(
    canap => canap._id === id && canap.couleur === color
    );
    ajoutPanier[findTheIndexToChange].quantite = parseInt(event.target.value)
    
    localStorage.setItem("canapé", JSON.stringify(ajoutPanier)),
    (ajoutPanier = JSON.parse(localStorage.getItem("canapé")))




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

};

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
        emailCheck(this);
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
    const form_commander = document.querySelector(".cart__order__form");

    form_commander.addEventListener("submit", (evt) => {
        evt.preventDefault();

        console.log(prenomData)

        const products = ajoutPanier.map(p => p._id);
        console.log(products)

            const commande = {
                contact: {
                    firstName: prenomData.value,
                    lastName: nomData.value,
                    address: adresseData.value,
                    city: villeData.value,
                    email: mailData.value
                },
                products
            };

            const options = {
                method: "POST",
                body: JSON.stringify(commande),
                headers: {"Content-Type": "application/json"},
            };

        console.log(JSON.stringify(commande))

            fetch("http://localhost:3000/api/products/order", options)
                .then(
                    (response) => response.json())
                .then((commandeData) => {
                    console.log(commandeData);
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