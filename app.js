const carts=document.querySelector('.carts')
const carttovar=document.querySelector('.cart-tovar')
const Homes=document.getElementById('Homes')
const category=document.querySelector('.category')
const root=document.getElementById('root')
const LogotipImg=document.getElementById('logotip-img')
const corzina=document.querySelector('.corzina')
const otzyv=document.querySelector('.otzyv')
const ShowMore=document.querySelector('.Show-More')
const  CardCorzina=document.getElementById('CardCorzina')
const ZakazBtn=document.querySelector('.Zakaz-btn')
const zakazbtnn=document.querySelector('.zakaz-btnn')
const inpTel=document.getElementById('tel')
const inpName=document.getElementById('name')
const inpSumma=document.getElementById('summa')
const inpUlisa=document.getElementById('ulisa')
const inpDom=document.getElementById('dom')
const inpKv=document.getElementById('kv')
const inpPodezd=document.getElementById('podezd')
const inpEtaj=document.getElementById('etaj')
const inpKod=document.getElementById('kod')
const btnZakaz=document.getElementById('btn-zakaz')
const zakazoformi=document.querySelector('.zakaz-oformi')
const Imgbtnzakaz=document.getElementById('Imgbtnzakaz')
const allcontent=document.querySelector('.all-con')

const url='https://65b13af7d16d31d11bde668f.mockapi.io/meals/meals'

document.addEventListener("DOMContentLoaded", function () {
    const centerDiv = document.getElementById("centerDiv");
    const toggleButton = document.getElementById("toggleButton");

    toggleButton.onclick=()=>{
        centerDiv.style.display='block'
        GetCorzina()
    }
});

Imgbtnzakaz.onclick=()=>{
    const centerDiv = document.getElementById("centerDiv");
    centerDiv.style.display='none'
    allcontent.style.display='block'
    // corzina.style.display='none'
    
}
function ZakazOformi() {
    zakazoformi.style.display='block'
    allcontent.style.display='none'
    corzina.style.display='none'
}

function corzinaDelete(){
    const centerDiv = document.getElementById("centerDiv");
    centerDiv.style.display='none'
}

function BtnBack() {

    Homes.style.display='block'
    root.style.display='none'
    carttovar.style.display='none'
    corzina.style.display='none'
    otzyv.style.display='none'
    ShowMore.style.display='block'
}
LogotipImg.onclick=()=>{
    BtnBack()
}

    




async function getMeals() {
    const res=await fetch(url)
    const data= await res.json()
    
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
    otzyv.style.display='none'
    ShowMore.style.display='block'
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
    
    ShowCartAll(data)
    carttovar.style.display='block'
    root.style.display='none'
}

async function getMealsCtg(namectg) {
    const res=await fetch(url)
    const data=await res.json()
    const filterData=data.filter(el=>el.category===namectg)
    
    showMeals(filterData)
    Homes.style.display='none'
    carttovar.style.display='none'
    root.style.display='flex'
}


async function getUrl() {
    const res=await fetch(url)
    const data=await res.json()
    
    ShowHome(data.slice(0,3))
}

getUrl()

function ShowHome(arr) {
    carts.innerHTML=''
    carttovar.style.display='block'
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



async function CartAll(id) {
    const res=await fetch(url+'/'+id)
    const data=await res.json()
    
    ShowCartAll(data)
    Homes.style.display='none'
    root.style.display='none'
    carttovar.style.display='block'
    
}


function ShowCartAll(arr) {
    ShowMore.style.display='none'

    carttovar.innerHTML=''
    
        carttovar.innerHTML+=`
         <div class="container">
         <div class="cart-tovar-1">
            <div class="back">

                        <button onclick='BtnBack(${arr.id})'><i class="bi bi-chevron-left"></i></button>
                        <h2>Назад</h2>
                    </div>

                <div class="cart-in-tovar">
                    <img src="${arr.img}" alt="">

                    <div class="ingr">
                        <h3>${arr.title}</h3>
                        <h6>${arr.weight} грамм</h6>
                        <h2><p>${arr.price} СОМ</p> </h2>
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
            </div>
        `
        

    
}


let CardData1 = [];
let quantity = 0



async function incrCard1(id) {
    const res = await fetch(url + '/' + id);
    const data = await res.json();

    const existingItem = CardData1.find(item => item.id === data.id);

    if (!existingItem) {
        
        CardCorzina.innerHTML = CardData1.length;

        CardData1.push(data);
        
    } else {


        
    }
    

    localStorage.setItem('CardData1', JSON.stringify(CardData1));
    getFromLocalStorage()


    
}
function getFromLocalStorage() {
    const cart1Ls = localStorage.getItem('CardData1');
    CardData1 = JSON.parse(cart1Ls) 
    CardCorzina.innerHTML = CardData1.length;
    // calculateTotal()
    
    
}

getFromLocalStorage();



 





function GetCorzina() {
    corzina.innerHTML = ''
    CardData1.forEach(item => {
    corzina.innerHTML += `
    <div class="corzinka">
    <div class="cor-img-title">
    <img src="${item.img}" alt="">
    
        <h3>${item.title}</h3>
        </div>

        <div class="cor-ingr">
            <button onclick="decrementCartItem()">-</button>
            <span>${quantity}</span>
            <button onclick="incrementCartItem()">+</button>
            
        </div>
               <button class="Delete" onclick="removeItem(${item.id})">x</button>
        </div>
        <hr>`;
    });
    // ZakazBtn.innerHTML=''
    zakazbtnn.innerHTML=`
    <h2><span>120</span> СОМ</h2>
    
    `


}

function removeItem(itemId) {
    CardData1 = CardData1.filter(item => item.id != itemId);
    localStorage.setItem('CardData1', JSON.stringify(CardData1));
    getFromLocalStorage();
    GetCorzina();
}



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
    totalPricelike = CardData1.reduce((total, item) => total + item.price, 0);
}






function GetOtzyv() {
    Homes.style.display='none'
    ShowMore.style.display='none'
    root.style.display='none'
    carttovar.style.display='none'
    corzina.style.display='none'
    otzyv.style.display='block'
    otzyv.innerHTML=''
    otzyv.innerHTML+=`
    <div class="container">
    <div class="otzyv-widht">
         <div class="otzyv-nav">
                <h3>Отзывы</h3> 
                <button>+ Добавить отзыв</button> 
                    </div>

                 <div class="otzyv-peopl">
                     <div class="otzyv-name">
                        <h2>Розалия</h2>
                            <h5>02.24.21</h5>
                        </div>
                     <p>Ваша доставка и ваши блюда лучшие в Харькове! всегда очень вкусно, вовремя, всегда вежливые курьеры и девушки на телефоне</p>
                 </div>

            </div>

            <div class="otzyv-widht">


                        <div class="otzyv-peopl">
                            <div class="otzyv-name">
                               <h2>Елена</h2>
                                   <h5>02.23.21</h5>
                               </div>
                            <p>Ооочень вкусно!!!!!</p>
                        </div>
       
                   </div>

                   <div class="otzyv-widht">


                            <div class="otzyv-peopl">
                                <div class="otzyv-name">
                                   <h2>Сергей Гаврилюк</h2>
                                       <h5>02.23.21</h5>
                                   </div>
                                <p>Заказываем у Вас больше 2 -ух лет, были разные ситуации, но сервис стал лучше, суши вкуснее. За доставку сегодня на время, огромное спасибо, точь-в-точь в минута в минуту. Успехов Вам и приятных бонусов нам </p>
                            </div>
           
                       </div>
</div>
    `
}




btnZakaz.onclick=()=>{
    if(inpTel.value.trim() && inpName.value.trim()) {
        alert('Ваш заказ оформлен')
        inpTel.value=''
        inpName.value=''
        inpName.style.backgroundColor='#ffffff'
        inpTel.style.backgroundColor='#ffffff'



    } else if (inpSumma.value.trim() && inpUlisa.value.trim()) {
        alert('Ваш заказ оформлен')
        inpSumma.value=''
        inpUlisa.value=''
        inpSumma.style.backgroundColor='#ffffff'
        inpUlisa.style.backgroundColor='#ffffff'

    } else if (inpDom.value.trim() && inpKv.value.trim()) {
        alert('Ваш заказ оформлен')
        inpDom.value=''
        inpKv.value=''
        inpDom.style.backgroundColor='#ffffff'
        inpKv.style.backgroundColor='#ffffff'
    } else if (inpPodezd.value.trim() && inpEtaj.value.trim() && inpKod.value.trim()) {
        alert('Ваш заказ оформлен')
        inpPodezd.value=''
        inpEtaj.value=''
        inpKod.value=''
        inpPodezd.style.backgroundColor='#ffffff'
        inpEtaj.style.backgroundColor='#ffffff'
        inpKod.style.backgroundColor='#ffffff'
    }
     else {
        alert('Пожалуйста, заполните все поля!')
        inpName.style.backgroundColor='red'
        inpTel.style.backgroundColor='red'
        inpSumma.style.backgroundColor='red'
        inpUlisa.style.backgroundColor='red'
        inpDom.style.backgroundColor='red'
        inpKv.style.backgroundColor='red'
        inpPodezd.style.backgroundColor='red'
        inpEtaj.style.backgroundColor='red'
        inpKod.style.backgroundColor='red'
    }
}

async function Categorys1() {
    const res=await fetch(url)
    const data=await res.json()
    const priceFilterFunction = el => el.category === 'sets';
    renderBlock4(data, priceFilterFunction);
    
    
    
}
async function Categorys2() {
    const res=await fetch(url)
    const data=await res.json()
    const priceFilterFunction = el => el.category === 'pizza';
    renderBlock4(data, priceFilterFunction);
    
    
    
}
async function Categorys3() {
    const res=await fetch(url)
    const data=await res.json()
    const priceFilterFunction = el => el.category === 'rolls';
    renderBlock4(data, priceFilterFunction);
    
    
    
}
async function Categorys4() {
    const res=await fetch(url)
    const data=await res.json()
    const priceFilterFunction = el => el.category === 'sishi';
    renderBlock4(data, priceFilterFunction);
    
    
    
}
async function Categorys5() {
    const res=await fetch(url)
    const data=await res.json()
    const priceFilterFunction = el => el.category === 'drinks';
    renderBlock4(data, priceFilterFunction);
    
    
    
}

function renderBlock4(arr, filterFunction) {
    Homes.style.display='none'
    root.style.display='flex'

    root.innerHTML = '';
    const filteredData = arr.filter(filterFunction);
    for (const obj of filteredData) {
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

