var product = {};
var commentsArray = [];
var relacionados = [];

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
        document.getElementById("productImagesGallery1").innerHTML = htmlContentToAppend;
    }
}
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productsoldCountHTML = document.getElementById("productsoldCount");
            let productCostHTML = document.getElementById("productCost");
            let productCategoryHTML = document.getElementById("productCategory");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productsoldCountHTML.innerHTML = product.soldCount;
            productCostHTML.innerHTML = product.cost + " " + product.currency;
            productCategoryHTML.innerHTML = product.category
            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }

        getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj1) {
            if (resultObj1.status === "ok") {
                commentsArray = resultObj1.data;

                showComments(commentsArray)
            }

            getJSONData(PRODUCTS_URL).then(function (resultObj) {
                if (resultObj.status === "ok") {
                    relacionados = resultObj.data;
                    let htmlContentToAppend = "";
                    let related = product.relatedProducts;
                    for (let i = 0; i < related.length; i++) {

                        htmlContentToAppend += `
                        <div class= "row-sm-3.5">
                        <div class="card" style="width: 20rem;">
            <h5 class="card-title pt-2 pl-2">`+ relacionados[related[i]].name + `</h5>
            <img class="card-img-top" src="` + relacionados[related[i]].imgSrc + `" alt="Card image cap">
  <div class="card-body">
    <h5><strong>`+ relacionados[related[i]].cost + " " + relacionados[related[i]].currency + `</strong></h5>
    <a href="products.html" class="btn btn-primary">Ver producto</a>
  </div>
  </div>
  </div>
  <br>
</div>`
                    }
                    document.getElementById("relacionados").innerHTML = htmlContentToAppend;
                }
            });
        });
    });
});
function showComments(commentsArray) {
    let htmlContentToAppend = "";

    for (let i = 0; i < commentsArray.length; i++) {
        let comment = commentsArray[i];

        var score = "";
        for (let i = 1; i <= comment.score; i++) {
            score += `<span class="fa fa-star checked"></span>`
        }
        for (let i = comment.score; i < 5; i++) {
            score += `<span class="fa fa-star"></span>`
        }
        htmlContentToAppend += `
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
            <div class="mb-1">
            <h6><strong>` + comment.user + " " + score + `</strong></h6>
            <p>`+ comment.description + `</p>
            <small class="text-muted">` + comment.dateTime + `</small>
            <hr>
        </div>
        </div>
    </div>
 `}
    document.getElementById("comments").innerHTML = htmlContentToAppend;
}

document.getElementById("enviar").addEventListener("click", function () {

    let commentNuevo = document.getElementById("texto").value;
    let score = document.getElementById("points").value;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date + ' ' + time;
    var newComment = Object();
    newComment.score = score;
    newComment.description = commentNuevo;
    newComment.user = localStorage.getItem("email");
    newComment.dateTime = dateTime;

    commentsArray.push(newComment);
    showComments(commentsArray);

});