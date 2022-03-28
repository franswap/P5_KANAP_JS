function main(){

    const numCommande = document.getElementById("orderId");
    numCommande.innerText = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"))

    // On remet le localstorage vide pour la prochaine commande
    localStorage.clear();
}

main();