const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

console.log(params.products_id);

const getSpecificProduct = async () => {
    let response = await fetch('/get_specific_product/' + params.products_id)
    let parseData = await response.json()
    console.log(parseData)

    let imageContainer = document.getElementById('image-container')
    let myProductContainer = document.createElement('div')
    myProductContainer.data = parseData._id
    // let myPrices = document.createElement()
    myProductContainer.innerHTML = `
        <p class = ${parseData._id}>${parseData.name} </p>
        <image src=${parseData.image} class = ${parseData._id} alt=''>
        <p class = ${parseData._id}>$ ${parseData.price} </p>
        <p class = ${parseData._id}> ${parseData.productDescription} </p>
        <p id='inventory' class = ${parseData._id}>  ${parseData.inventory === 0 ? "out of stock" : parseData.inventory + ' remaining'} </p>
        <button id="buy" class='show'>BUY</button>
        
        <a href = "../edit?products_id=${parseData._id}">Edit</a>
        <button id="delete"> Delete</button>
    
        `



    let arr = Array.from(myProductContainer.children)

    arr.forEach(item => {
        item.data = parseData._id
    })
    // imageTag.src = element.image
    // myProductContainer.appendChild(imageTag)
    imageContainer.appendChild(myProductContainer)

    return [parseData._id, parseData.inventory]
}

const deleteItem = async () => {
    let productid = params.products_id
    let response = await fetch(`/delete_product/?products_id=${productid}`, {
        method: "DELETE"
    })
    window.location.href = '../'

}






getSpecificProduct()

const buyProduct = async () => {
    let productData = await getSpecificProduct()
    let remainingInventory = productData[1] - 1
    console.log(productData, remainingInventory)

    let response = await fetch(`/update_product/?product_id=${productData[0]}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"

        },
        body: JSON.stringify({ inventory: remainingInventory })
    })
    window.location.href = "../"
    // let mypTags = document.getElementsByClassName(productId)
    // console.log(mypTags)
}

const changePage = element => {
    let span = element.target.nodeName === 'SPAN'
    if (span) {
        window.location.href = `${element.target.id}`
    }
}

const nav = document.getElementById('navbar')
navbar.addEventListener('click', changePage)

setInterval(() => {
    const inventory = document.getElementById('inventory')

    const buy = document.getElementById('buy')
    const deleteButton = document.getElementById('delete')


    if (inventory && inventory.textContent === 'out of stock') {
        buy.style.display = 'none'
    }
    if (buy) {
        buy.addEventListener('click', buyProduct)
    }
    if (deleteButton) {
        deleteButton.addEventListener('click', deleteItem)
    }

}, 1000)


