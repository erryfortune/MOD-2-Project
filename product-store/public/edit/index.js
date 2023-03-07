const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

let form = document.getElementById('form')
form.addEventListener('submit', (event) => {
    event.preventDefault()
})

const editProduct = async () => {
    let form = document.getElementById('form')
    console.log(form.length)
    let name = form[0].value
    console.log(name)
    let image = form[1].value
    let productDescription = form[2].value
    let price = form[3].value
    let inventory = form[4].value
    let category = form[5].value


    let productDetails = {

        name: name,
        price: price,
        image: image,
        inventory: inventory,
        type: category,
        productDescription: productDescription
    }

    let response = await fetch('/update_product/?product_id=' + params.products_id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productDetails)
    })
    // let data = await response.json()
    window.location.href = '../'

}

let editButton = document.getElementById('edit')
editButton.addEventListener('click', editProduct)