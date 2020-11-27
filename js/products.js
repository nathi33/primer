const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST = "ZA";
const ORDER_BY_PROD_REL = "Relevancia";
var productsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_REL){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductList() {

    let htmlContentToAppend = "";

    for (let i = 0; i < productArray.length; i++) {

        let category = productArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(category.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(category.cost) <= maxCost))) {
    
            htmlContentToAppend += `
            <div class="col-md-6 col-lg-6">
              <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-sm-3">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
                    <div class="col-sm">
                        <div class="d-flex w-100 justify-content-between">
                          <div class="mb-1">
                            <h4>`+ category.name + `</h4>
                            <p>`+ category.description + `</p>
                            <br>
                            <small class="text-muted">` + category.soldCount + ` vendidos</small>
                        </div>
                        <h6><strong>` + category.cost +" " + category.currency + `</strong></h6>
                    </div>
                    </div>
                </div>
              </a>
            
            </div>
            `}
    
         document.getElementById("product_id").innerHTML = htmlContentToAppend;
        }
    }

    function sortAndShowProduct(sortCriteria, categoriesArray){
        currentSortCriteria = sortCriteria;
    
        if(categoriesArray != undefined){
            productArray = categoriesArray;
        }
    
        productArray = sortProducts(currentSortCriteria, productArray);
    
        //Muestro las categorías ordenadas
        showProductList();
    }
    document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(PRODUCTS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                productArray = resultObj.data;
                showProductList(productArray);
            }
        });
        document.getElementById("sortAscCost").addEventListener("click", function () {
            sortAndShowProduct(ORDER_ASC_BY_COST);
        });
    
        document.getElementById("sortDescCost").addEventListener("click", function () {
            sortAndShowProduct(ORDER_DESC_BY_COST);
        });
    
        document.getElementById("sortByRel").addEventListener("click", function () {
            sortAndShowProduct(ORDER_BY_PROD_REL);
        });
    
        document.getElementById("clearRangeFilter").addEventListener("click", function () {
            document.getElementById("rangeFilterCountMin").value = "";
            document.getElementById("rangeFilterCountMax").value = "";
    
            minCost = undefined;
            maxCost = undefined;
    
            showProductList();
        });
    
        document.getElementById("rangeFilterCount").addEventListener("click", function () {
            //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
            //de productos por categoría.
            minCost = document.getElementById("rangeFilterCountMin").value;
            maxCost = document.getElementById("rangeFilterCountMax").value;
    
            if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
                minCost = parseInt(minCost);
            }
            else {
                minCost = undefined;
            }
    
            if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
                maxCost = parseInt(maxCost);
            }
            else {
                maxCost = undefined;
            }
    
            showProductList();
        });
    });
    
    