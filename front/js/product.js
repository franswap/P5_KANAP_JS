const product = window.location.search.split('?').join("");

console.log(product);

let canap = [];

const fetchCanap = async () => {
    await fetch(`http://localhost:3000/api/products${product}`)
    .then((res) => res.json(),
    ).then((promise) => {       

        canap = promise;
        console.log(canap);
    });
};

const canapDisplay = async () => {
    await fetchCanap();

    document.getElementById("item").innerHTML = 
    `<div id="card${canap._id}">
        <article>
            <img src="${canap.imageUrl}" alt="canapé ${canap.name}"></img>
            <h1>${canap.name.toUpperCase()}</h1>
            <p></p>
            <P></p>
        </article>
    </div>`
};

canapDisplay();