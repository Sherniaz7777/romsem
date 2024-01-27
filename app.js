const carts=document.querySelector('.carts')
const carttovar=document.querySelector('.cart-tovar')
const Homes=document.getElementById('Homes')
const category=document.querySelector('.category')
const root=document.getElementById('root')
const LogotipImg=document.getElementById('logotip-img')
const corzina=document.querySelector('.corzina')

const url='https://65b13af7d16d31d11bde668f.mockapi.io/meals/meals'



async function BtnBack(id) {
    const res=await fetch(url+'/'+id)
    const data=await res.json()
    Homes.style.display='block'
    root.style.display='none'
    carttovar.style.display='none'
    corzina.style.display='none'
}
LogotipImg.onclick=()=>{
    BtnBack()
}
    



async function getMeals() {
    const res=await fetch(url)
    const data= await res.json()
    console.log(data);
    renderCategory(data)
    // showMeals(data)
}
getMeals()

function renderCategory(arr) {
    const newCtg=[]
    const filterCtg=arr.filter(el=>{
        if(!newCtg.includes(el.category)){
            newCtg.push(el.category)
        }
    })
    console.log(newCtg);
    for (const obj of newCtg) {
        category.innerHTML+=`<p onclick='getMealsCtg("${obj}")'>${obj}</p>`
    }
}

function showMeals(arr) {
    // carttovar.style.display='none'
    root.innerHTML=''
      for (const obj of arr) {
        root.innerHTML+=`
    <div class="roots">
        <div class="cart" onclick='getnonemeals(${obj.id})'>
            <img src="${obj.img}" alt="">

                <h4>${obj.title}</h4>

                    <p>${obj.weight} грамм</p>
                 <hr>

                 <div class="price-btn">
                     <h2>${obj.price} СОМ</h2>
                      <button>Хочу!</button>
                      </div>
             </div>
             </div>
        `
      }   
}
async function getnonemeals(id){
    const res=await fetch(url+'/'+id)
    const data=await res.json()
    console.log(data);
    ShowCartAll(data)
    carttovar.style.display='block'
    root.style.display='none'
}

async function getMealsCtg(namectg) {
    const res=await fetch(url)
    const data=await res.json()
    const filterData=data.filter(el=>el.category===namectg)
    console.log(filterData);
    showMeals(filterData)
    Homes.style.display='none'
    carttovar.style.display='none'
    root.style.display='flex'
}


async function getUrl() {
    const res=await fetch(url)
    const data=await res.json()
    console.log(data);
    ShowHome(data.slice(0,3))
}

getUrl()

function ShowHome(arr) {
    carts.innerHTML=''
    for (const obj of arr){
        carts.innerHTML+=`
        <div class="cart" onclick='CartAll(${obj.id})'>
            <img src="${obj.img}" alt="">

                <h4>${obj.title}</h4>

                    <p>${obj.weight} грамм</p>
                 <hr>

                 <div class="price-btn">
                     <h2>${obj.price} СОМ</h2>
                      <button>Хочу!</button>
                      </div>
             </div>
        `
    }
}
ShowHome()

async function CartAll(id) {
    const res=await fetch(url+'/'+id)
    const data=await res.json()
    console.log(data);
    ShowCartAll(data)
    Homes.style.display='none'
    root.style.display='none'
}


function ShowCartAll(arr) {
    carttovar.innerHTML=''

        carttovar.innerHTML+=`
         <div class="container">
         
         <div class="back">

                        <button onclick='BtnBack(${arr.id})'><i class="bi bi-chevron-left"></i></button>
                        <h2>Назад</h2>
                    </div>

                <div class="cart-in-tovar">
                    <img src="${arr.img}" alt="">

                    <div class="ingr">
                        <h3>${arr.title}</h3>
                        <h6>${arr.weight} грамм</h6>
                        <h2><p>${arr.price} СОМ</p><button class="shotchick">-</button><span>0</span><button class="shotchick">+</button> </h2>
                        <h5>Состав</h5>
                        <h4>${arr.sostav}</h4>
                        <button class="ingr-btn" onclick='incrCard1(${arr.id})'>Хочу!</button>
                    </div>
                </div>

                    <h1 id="Reck">Рекомендуем к этому товару</h1>
                        <div class="Recom">

                            <div class="Recom-Cart">
                                <img src="${arr.img}" alt="">
                                <h2>${arr.title}</h2>
                                <div class="recom-btn">
                                    <h4>${arr.price}</h4>
                                    <button>+</button>
                                </div>
                            </div>
                            <div class="Recom-Cart">
                            <img src="${arr.img}" alt="">
                            <h2>${arr.title}</h2>
                            <div class="recom-btn">
                                <h4>${arr.price}</h4>
                                <button>+</button>
                            </div>
                        </div>

                        <div class="Recom-Cart">
                        <img src="${arr.img}" alt="">
                        <h2>${arr.title}</h2>
                        <div class="recom-btn">
                            <h4>${arr.price}</h4>
                            <button>+</button>
                        </div>
                    </div>
                </div>
                
            </div>
        `
        

    
}
// ShowCartAll()


async function incrCard1(id) {
    const res = await fetch(url + '/' + id);
    const data = await res.json();

    // Push the fetched data into CardData1 array

    CardData1.push(data);

    // GetCorzina();
}



function GetCorzina() {
    corzina.innerHTML = '';
    corzina.innerHTML += `
        <h1>Корзина</h1>
    `;
    CardData2.forEach(item => {
    corzina.innerHTML += `
            <div class="cor-img-ingr">
                <img src="${item.img}" alt="">
                <div>
                    <h3>${item.title}</h3>
                    <div class="cor-img-ingr-1">
                        <button onclick="decrementCartItem(${item.id})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="incrementCartItem(${item.id})">+</button>
                        <h4>${item.weight} грамм</h4>
                    </div>
                </div>
            </div>
        `;
    });


    corzina.innerHTML += `
        <div class="Zakaz-btn">
            <h2>${calculateTotal()} Co</h2>
            <button onclick="placeOrder()">Оформить заказ</button>
        </div>
    `;
}

// Example functions to handle incrementing, decrementing, and calculating total
function incrementCartItem(id) {
    const item = CardData1.find(item => item.id === id);
    if (item) {
        item.quantity += 1;
        GetCorzina();
    }
}

function decrementCartItem(id) {
    const item = CardData1.find(item => item.id === id);
    if (item && item.quantity > 0) {
        item.quantity -= 1;
        GetCorzina();
    }
}

function calculateTotal() {
    return CardData1.reduce((total, item) => total + item.quantity * item.price, 0);
}

function placeOrder() {
    // Add logic to handle placing the order
    console.log('Order placed!');
}





