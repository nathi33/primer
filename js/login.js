document.addEventListener("DOMContentLoaded", function(e){

    document.getElementById("boton").addEventListener("click", function loguearse(e) {

    let email= document.getElementById("inputEmail");
  let contraseña = document.getElementById ("inputPassword");
let camposCompletos = true;
var emailName= email.value;
    
   if (email.value === "") {
    email.classList.add("is-invalid");
    camposCompletos = false;
}

if (contraseña.value === "") {
    contraseña.classList.add("is-invalid");
    camposCompletos = false;
}

if (camposCompletos) {
    window.localStorage.setItem("email",emailName);
    window.location.replace("home.html");;
} 
else {
    alert('Debes completar todos los campos');
}

});

    document.getElementById("inputEmail").addEventListener("input", function valid(e) {
    let mail = document.getElementById("inputEmail");

    mail.classList.remove("is-invalid");
    mail.classList.add("is-valid");
});

document.getElementById("inputPassword").addEventListener("input", function valid(e) {
    let pssw = document.getElementById("inputPassword");

    pssw.classList.remove("is-invalid");
    pssw.classList.add("is-valid");


});
});
