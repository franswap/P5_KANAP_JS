let canapData = [];

const fetchCanap = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((promise) => {
      canapData = promise;
      console.log(canapData);
    });
};

const canapAffichage = async () => {
  await fetchCanap();

  document.getElementById("items").innerHTML = canapData
    .map(
      (products) =>
        `<div id= "${products._id}" class="article-canap">
        <a>
            <article>
                <img src="${products.imageUrl}" alt="canapé ${products.name}" />
                <h3>${products.name.toUpperCase()}</h3>
                <p>${products.description}</p>
            </article>
        </a>
    </div>`
    )
    // On enleve les virgules.
    .join("");

  // On crée une variable pour stoker les id de nos produits dans une node liste
  let articles = document.querySelectorAll(".article-canap");
  console.log(articles);

  // On créé une boucle qui va nous permettre de faire le tour de la node liste
  articles.forEach((canap) =>
    // Renvoie l'id du canap sur lequel on a cliqué au clique.
    canap.addEventListener("click", () => {
      console.log(canap);

      window.location = `product.html?${canap.id}`;
    })
  );
};

canapAffichage();