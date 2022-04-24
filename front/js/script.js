let canapData = [];

const fetchCanap = async () => {
  await fetch("http://localhost:3000/api/products")
    .then(
      (res) => res.json())
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
        `<a>
              <article id= "${products._id}" class="article-canap">
                  <img src="${products.imageUrl}" alt="canapé ${products.name}" />
                  <h3>${products.name.toUpperCase()}</h3>
                  <p>${products.description}</p>
              </article>
          </a>`
    )
    .join("");


  let articles = document.querySelectorAll(".article-canap");
  console.log(articles);

  articles.forEach((canap) =>
    canap.addEventListener("click", () => {
      console.log(canap);

      window.location = `product.html?${canap.id}`;
    })
  );
};

canapAffichage();