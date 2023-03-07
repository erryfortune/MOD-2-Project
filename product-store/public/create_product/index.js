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



const nav = document.getElementById('navbar')
navbar.addEventListener('click', changePage)
console.log(nav)

{/* <form id="form">
<input type="text" placeholder="product name" id="" >
<input type="url" name="image" id="" placeholder="image">
<input type="text" placeholder="product description">
<input type="number"placeholder="price">
<input type="number" placeholder="inventory">
<input type="text"placeholder="category">


    </form> */}
    let form = document.getElementById('form')
    form.addEventListener('submit',(event)=>{
        event.preventDefault()
    })
    
const createProduct = async()=>{
    let form = document.getElementById('form')
    console.log(form.length)
    let name = form[0].value
    console.log(name)
    let image =form[1].value
    let productDescription = form[2].value
    let price = form[3].value
    let inventory = form[4].value
    let category = form[5].value


    let productDetails ={
    
        name:name,
        price:price,
        image:image,
        inventory:inventory,
        type:category,
        productDescription:productDescription
}

let response =await fetch('/create_product',{
    method: "POST",
    headers:{
        "Content-Type": "application/json"
    },
body: JSON.stringify(productDetails)
})
// let data = await response.json()
window.location.href= '../'





}
let mybutton = document.getElementById("create")
mybutton.addEventListener('click', createProduct)