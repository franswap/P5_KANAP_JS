function main(){

    const numCommande = document.getElementById("orderId");
    numCommande.innerText = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"))

    localStorage.clear();
}

main();