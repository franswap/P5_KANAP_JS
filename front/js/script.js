let canapData = [];


const fetchCanap = async ()=> {
    await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((promise) => {
        canapData = promise;
        console.log(canapData);
    });
}; 

const canapDisplay = async () => {
    await fetchCanap();

    document.getElementById("items").innerHTML = canapData.map((products) =>
    `<div id= "card${products._id}" class="article-canap">
        <a>
            <article class="items">
                <img src="${products.imageUrl}" alt="canapé ${products.name}" />
                <h3>${products.name.toUpperCase()}<h3>
                <p>${products.description} Euro<p>
            </article>
        </a>
    </div>`
    ) 
    // On enleve les virgules.
    .join("");

    let articles = document.querySelectorAll(".article-canap")
    console.log(articles);

    articles.forEach((article) =>
        article.addEventListener("click", () => {
        console.log(article);

        window.location = `product.html?${article.id}`
    }),
    );
};


canapDisplay();