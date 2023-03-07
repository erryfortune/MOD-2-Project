console.log("testing js file")


const params = new Proxy(new URLSearchParams(window.location.search),{
    get:(searchParams, prop) => searchParams.get(prop),
});


const changePage = element => {
    let span = element.target.nodeName === 'SPAN'
    if (span) {
        console.log('yes')
        window.location.href = `${element.target.id}`
    }
}

const getProducts = async ()=>{
    let response = await fetch('/get_products')
    let parseData = await response.json()
    console.log(parseData);
let imageContainer = document.getElementById('image-container')
    parseData.forEach(element => {
        let imageTag = document.createElement('img')
        let myProductContainer = document.createElement('div')
        myProductContainer.data = element._id
        // let myPrices = document.createElement()
        myProductContainer.innerHTML=`
        <p class = ${element._id}>${element.name} </p>
        <image src=${element.image} class = ${element._id} alt=''>
        <p class = ${element._id}>$ ${element.price} </p>`
        let arr = Array.from(myProductContainer.children)
    
        arr.forEach(item=>{
            item.data = element._id
        })
        // imageTag.src = element.image
        // myProductContainer.appendChild(imageTag)
        imageContainer.appendChild(myProductContainer)
        
    });      

}
getProducts()



const nav = document.getElementById('navbar')
navbar.addEventListener('click', changePage)

const getSpecificProduct = async (element) => {
    console.log(element.target.data);
    console.log(element.target);
    let containerElement = element.target.data !== undefined
    console.log(containerElement);
    if (containerElement){
        console.log('yes');
        window.location.href =`./products?products_id=${element.target.data}`
    }
    console.log("hello")
}

let containerElement = document.getElementById("image-container")
containerElement.addEventListener('click', getSpecificProduct)



