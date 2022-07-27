let sideMenu = document.querySelector('#side-menu');
let sideBar = document.querySelector('.side-bar');
sideMenu.onclick = () =>{
    console.log("hello");
    sideMenu.classList.toggle('fa-times');
    sideBar.classList.toggle('active');
};

AOS.init();

let addCart = document.querySelectorAll('.add-cart')
let totalQty = document.querySelector('#totalQty')

function updateCart(items){
    axios.post('/update-cart', items).then((res) => {
        console.log(res);
        totalQty.innerHTML = res.data.totalQty;
    })
}

addCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let items = JSON.parse(btn.dataset.items)
        updateCart(items)
    })
})