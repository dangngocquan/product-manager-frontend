function createObjInfors(productVariations, product) {
    var productId = product.id;
    var productDefaultPrice = product.price;

    var variantNames = [];
    productVariations.forEach((productVariant) => {
        variantNames = [...variantNames, ...productVariant['variant_names']];
    })
    variantNames = [...new Set(variantNames)];
    // console.log(variantNames);

    var prices = [];
    var variantValueNames = [];
    var variantValueIds = [];
    variantNames.forEach(() => {
        variantValueNames.push([]);
        variantValueIds.push([]);
    });
    productVariations.forEach((productVariant) => {
        prices.push(productVariant['price']);

        var thisVariantNames = productVariant['variant_names'];

        var thisVariantValueNames = productVariant['variant_value_names'];
        thisVariantValueNames.forEach((variantValueName, variantValueIndex) => {
            var variantName = thisVariantNames[variantValueIndex];
            var index = variantNames.indexOf(variantName);
            variantValueNames[index].push(variantValueName);
        })

        var thisVariantValueIds = productVariant['variant_value_ids'];
        thisVariantValueIds.forEach((variantValueId, variantValueIndex) => {
            var variantName = thisVariantNames[variantValueIndex];
            var index = variantNames.indexOf(variantName);
            variantValueIds[index].push(variantValueId);
        })
    })

    variantValueNames.forEach((values, index) => {
        variantValueNames[index] = [...new Set(values)];
    })
    variantValueIds.forEach((ids, index) => {
        variantValueIds[index] = [...new Set(ids)];
    })


    return {
        productId,
        productDefaultPrice,
        variantNames,
        variantValueNames,
        variantValueIds,
        prices
    };
}



function createVariantValuesStatus(objInfors) {
    var matrix = [];
    var selectedIds = [];
    objInfors.variantValueNames.forEach((rowVariantValueNames, index) => {
        matrix.push([]);
        rowVariantValueNames.forEach(() => {
            matrix[index] = [...matrix[index], 0];
        })
        selectedIds.push(-1);
    })

    var price = objInfors.productDefaultPrice;

    // varant of product that user are chosing
    var variantId = -1;

    return {
        status: matrix,
        selectedIds: selectedIds,
        price,
        variantId
    };
}




function fillVariantValuesUnable(variantValuesStatus0, infors0, productVariations) {
    var status = variantValuesStatus0["status"];
    var selectedIds = variantValuesStatus0["selectedIds"];
    var variantValueIds = infors0["variantValueIds"];

    for (var i = 0; i < status.length; i++) {
        for (var j = 0; j < status[i].length; j++) {
            if (status[i][j] == 1) continue;

            var selectedIds0 = [...selectedIds];
            selectedIds0[i] = variantValueIds[i][j];
            var isExistCase = productVariations.some((productVariant) => {
                var variantValueIds0 = productVariant["variant_value_ids"];
                return selectedIds0.every((id) => {
                    return variantValueIds0.includes(id) || id == -1;
                })
            })

            if (isExistCase) {
                status[i][j] = 0;
            } else {
                status[i][j] = -1;
            }
            
        }
    }
}


function getCurrentPriceAndVariantId(objInfors, productVariations, variantValuesStatus, product) {
    if (objInfors["variantNames"].length == 0) return {
        price: objInfors["productDefaultPrice"],
        variantId: -1
    };
    for (var productVariant of productVariations) {
        var variantValueIds0 = productVariant['variant_value_ids'];
        var isSelected = variantValueIds0.every((id) => {
            return variantValuesStatus['selectedIds'].includes(id);
        });

        if (isSelected) return {
            price: productVariant['price'],
            variantId: productVariant['id']
        }
    }
    return {
        price: product.price,
        variantId: -1
    }

}


export default {
    createObjInfors,
    createVariantValuesStatus,
    fillVariantValuesUnable,
    getCurrentPriceAndVariantId
}