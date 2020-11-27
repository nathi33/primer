document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("btnGuardar").addEventListener("click", function (e) {

        localStorage.setItem("guardado", JSON.stringify({ nombre: first_name.value, apellido: last_name.value, email: email.value, tel: number.value, edad: age.value, img: imgURL.value }))
        window.location = "my-profile.html";
    });
    let newPerfil = localStorage.getItem("guardado");

    let nombre = document.getElementById("first_name");
    let apellido = document.getElementById("last_name");
    let email = document.getElementById("email1");
    let tel = document.getElementById("number");
    let edad = document.getElementById("age");
    let img = document.getElementById("pic");
    let saludo = document.getElementById("saludo");
    
    newPerfil = JSON.parse(newPerfil);
    if(newPerfil.img === ""){
        newPerfil.img ="img/agregarFotoPerfil.png";
    };

    if (newPerfil) {
       
        nombre.value = `${newPerfil.nombre}`;
        apellido.value = `${newPerfil.apellido}`;
        email.value = `${newPerfil.email}`;
        tel.value = `${newPerfil.tel}`;
        edad.value = `${newPerfil.edad}`;
        saludo.innerHTML = `Hola ${newPerfil.nombre}`;
        img.src = newPerfil.img;
        
    };
});



