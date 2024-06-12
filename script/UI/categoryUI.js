const imgCategory = document.querySelector('.img-categoty');
const shopSidebar= document.querySelector('.shop__sidebar');
const closeSidebar= document.querySelector('.closeSidebar-img');

imgCategory.addEventListener("click", ()=>{
    shopSidebar.classList.add("mobile")
})
closeSidebar.addEventListener("click", ()=>{
    shopSidebar.classList.remove("mobile")
})

const productBtn = document.querySelectorAll('.product-btn');

window.addEventListener("load", ()=>{


if(screen.availWidth < 800){
    
    productBtn.forEach((e)=> e.innerHTML = "+")
}else{
    productBtn.forEach((e)=> e.innerHTML = "Add to cart")

}

})