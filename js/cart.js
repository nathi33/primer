let myBoughtArticles;
var buyArray = [];

function showMyBoughtArticles(articles) {
    let htmlContentToAppend = "";
    myBoughtArticles = articles

    for (let i = 0; i < myBoughtArticles.length; i++) {
        htmlContentToAppend += `
        <tr>
          <th scope="row"><img src="`+ myBoughtArticles[i].src + `" alt="..." class="img-thumbnail" style="max-width: 150px;"></th>
          <td>`+ myBoughtArticles[i].name + `</td>
          <td>`+ myBoughtArticles[i].currency + ` ` + myBoughtArticles[i].unitCost + `</td>
          <td>
            <input type="number" min="1" max="1000"  class="form-control text-dark bg-white" id="count`+ i + `" name="sup" value="` + myBoughtArticles[i].count + `" onclick="javascript:updateMyBill('count',` + i + `)" style="width: 70px;" onkeyup="javascript:updateMyBill('count',` + i + `)"></input>
          </td>
          <td><strong > `+ myBoughtArticles[i].currency + ` <span id="subTotal` + i + `">` + myBoughtArticles[i].unitCost * myBoughtArticles[i].count + `</span> </strong></td>
          <th scope="row"><img src="img/basura.png" alt="Limpiar" class="img-circle" style="max-width: 30px;" onclick="javascript:updateMyBill('del',`+ i + `)"></th>
        </tr>
    `
    }
    htmlContentToAppend += ``

    document.getElementById("myBoughtProducts").innerHTML = htmlContentToAppend;
}

function readTipoEnvio() {

    let tiposDeEnvio = document.getElementsByName('tipo_envio');
    let costTipoDeEnvio = 0;
    for (let i = 0; i < tiposDeEnvio.length; i++) {
        if (tiposDeEnvio[i].checked) { costTipoDeEnvio = tiposDeEnvio[i].value }
    }

    return costTipoDeEnvio
}

function computeSubtotal() {
    let subtotal = 0
    for (let i = 0; i < myBoughtArticles.length; i++) {
        let UYUunitCost = myBoughtArticles[i].unitCost;
        if (myBoughtArticles[i].currency === 'USD') { UYUunitCost = myBoughtArticles[i].unitCost * 40 }
        subtotal += UYUunitCost * myBoughtArticles[i].count;
    }
    return Math.round(subtotal)
}

function updateMyBill(atrib = false, art = false) {


    if (atrib || art) {

        if (atrib === 'del') {

            myBoughtArticles.splice(art, 1)
            showMyBoughtArticles(myBoughtArticles)
        }
        else {

            myBoughtArticles[art][atrib] = document.getElementById('count' + art + '').value;


            document.getElementById('subTotal' + art + '').innerHTML = myBoughtArticles[art].unitCost * myBoughtArticles[art].count;
        }
    }


    document.getElementById('subTotal').innerHTML = computeSubtotal();


    document.getElementById('costoDeEnvio').innerHTML = Math.round(computeSubtotal() * readTipoEnvio());


    document.getElementById('total').innerHTML = Math.round(computeSubtotal() + (computeSubtotal() * readTipoEnvio()));

}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showMyBoughtArticles(resultObj.data.articles);
            updateMyBill();

        }
    });

    getJSONData(CART_BUY_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            buyArray = resultObj.data;
        }
    });
});

document.getElementById("procederAlpago").addEventListener("click", function procederalpago(e) {
    let calle = document.getElementById("street");
    let numero = document.getElementById("apto");
    let esquina = document.getElementById("corner");
    let pais = document.getElementById("country");
    let camposCompletos = true;

    if (calle.value === "") {
        calle.classList.add("is-invalid");
        camposCompletos = false;
    }

    if (numero.value === "") {
        numero.classList.add("is-invalid");
        camposCompletos = false;
    }

    if (esquina.value === "") {
        esquina.classList.add("is-invalid");
        camposCompletos = false;
    }

    if (pais.value === "pais") {
        pais.classList.add("is-invalid");
        camposCompletos = false;
    }

    if (camposCompletos) {
        $('#exampleModal').modal('show'); // abrir

    } else {
        alert('Debes completar los datos de envío');
    }

});

document.getElementById("street").addEventListener("input", function valid(e) {
    let calle = document.getElementById("street");

    calle.classList.remove("is-invalid");
    calle.classList.add("is-valid");
});
document.getElementById("apto").addEventListener("input", function valid(e) {
    let numero = document.getElementById("apto");

    numero.classList.remove("is-invalid");
    numero.classList.add("is-valid");
});
document.getElementById("corner").addEventListener("input", function valid(e) {
    let esquina = document.getElementById("corner");

    esquina.classList.remove("is-invalid");
    esquina.classList.add("is-valid");
});
document.getElementById("country").addEventListener("input", function valid(e) {
    let pais = document.getElementById("country");

    pais.classList.remove("is-invalid");
    pais.classList.add("is-valid");
});




document.getElementById("pagar").addEventListener("click", function pagar(e) {

    let nombre = document.getElementById("ccName");
    let numero = document.getElementById("ccNumber");
    let mes = document.getElementById("ccExpirationDate");
    let cvc = document.getElementById("ccCVV");
    let camposCompletos = true;

    if (nombre.value === "") {
        nombre.classList.add("is-invalid");
        camposCompletos = false;
    }

    if (numero.value === "") {
        numero.classList.add("is-invalid");
        camposCompletos = false;
    }

    if (mes.value === "") {
        mes.classList.add("is-invalid");
        camposCompletos = false;

    }

    if (cvc.value === "") {
        cvc.classList.add("is-invalid");
        camposCompletos = false;
    }

    if (camposCompletos) {
        $('#exampleModal').modal('hide');
        alert(buyArray.msg);


    } else {
        alert('Debes completar todos los campos');
    }
});

document.getElementById("ccName").addEventListener("input", function valid(e) {
    let nombretarj = document.getElementById("ccName");

    nombretarj.classList.remove("is-invalid");
    nombretarj.classList.add("is-valid");
});

document.getElementById("ccNumber").addEventListener("input", function valid(e) {
    let numerotarj = document.getElementById("ccNumber");

    numerotarj.classList.remove("is-invalid");
    numerotarj.classList.add("is-valid");
});

document.getElementById("ccExpirationDate").addEventListener("input", function valid(e) {
    let mes = document.getElementById("ccExpirationDate");

    mes.classList.remove("is-invalid");
    mes.classList.add("is-valid");
});


document.getElementById("ccCVV").addEventListener("input", function valid(e) {
    let cardcvc = document.getElementById("ccCVV");

    cardcvc.classList.remove("is-invalid");
    cardcvc.classList.add("is-valid");
});


/* función que cierra modal1 y abre modal 2 */

document.getElementById("transBancaria").addEventListener("click", function banco(e) {

    $('#exampleModal2').modal('show'); 

});

/* validación form modal pago con transferencia bancaria */

document.getElementById("pagar2").addEventListener("click", function banco(e) {

    let numero = document.getElementById("numerocuenta");
    let banco = document.getElementById("banco");
    let camposCompletos = true;

    if (numero.value === "") {
        numero.classList.add("is-invalid");
        camposCompletos = false;
    }

    if (banco.value === "banco") {
        banco.classList.add("is-invalid");
        camposCompletos = false;
    }

    if (camposCompletos) {
        $('#exampleModal2').modal('hide');
        alert(buyArray.msg);
        $('#cerrarmodal').trigger('click'); 


    } else {
        alert('Debes completar todos los campos');
    }
});

document.getElementById("numerocuenta").addEventListener("input", function valid(e) {
    let numero = document.getElementById("numerocuenta");

    numero.classList.remove("is-invalid");
    numero.classList.add("is-valid");
});

document.getElementById("banco").addEventListener("input", function valid(e) {
    let banco = document.getElementById("banco");

    banco.classList.remove("is-invalid");
    banco.classList.add("is-valid");
});