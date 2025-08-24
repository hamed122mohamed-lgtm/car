
const cars = [
  {make:"Toyota", model:"Corolla", year:2022, type:"Sedan", price:920000, img:"pexels-drphotographer152-29458514.jpg"},
  {make:"Hyundai", model:"Elantra", year:2023, type:"Sedan", price:980000, img:"pexels-hyundaimotorgroup-16655396.jpg"},
  {make:"Kia", model:"Sportage", year:2024, type:"SUV", price:1550000, img:"pexels-hyundaimotorgroup-29383295.jpg"},
  {make:"Nissan", model:"Sunny", year:2021, type:"Sedan", price:700000, img:"pexels-esmihel-15223537.jpg"},
  {make:"BMW", model:"3 Series", year:2020, type:"Sedan", price:2300000, img:"pexels-jakub-sambor-24567187-31983216.jpg"},
  {make:"Ford", model:"Ranger", year:2021, type:"Truck", price:1650000, img:"pexels-timothypictures-10842901.jpg"}
  
];

const grid = document.getElementById("cardsGrid");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const sortSelect = document.getElementById("sortSelect");


const formatPrice = n => n.toLocaleString("ar-EG") + " ج.م";


function render(list){
  grid.innerHTML = "";
  if(!list.length){ grid.innerHTML = "<p>لا توجد نتائج</p>"; return; }
  list.forEach(c=>{
    grid.innerHTML += `
      <div class="card">
        <img src="${c.img}" alt="${c.make} ${c.model}">
        <div class="info">
          <h3>${c.make} ${c.model} <span>(${c.year})</span></h3>
          <p>${c.type}</p>
          <strong>${formatPrice(c.price)}</strong>
        </div>
      </div>
    `;
  });
}


function update(){
  let list = [...cars];
  const q = searchInput.value.toLowerCase();
  if(q) list = list.filter(c=> (c.make+c.model+c.year).toLowerCase().includes(q));
  if(typeFilter.value) list = list.filter(c=> c.type === typeFilter.value);

  switch(sortSelect.value){
    case "price-asc": list.sort((a,b)=>a.price-b.price); break;
    case "price-desc": list.sort((a,b)=>b.price-a.price); break;
    case "year-desc": list.sort((a,b)=>b.year-a.year); break;
    case "year-asc": list.sort((a,b)=>a.year-b.year); break;
  }
  render(list);
}

// أحداث
searchInput.addEventListener("input", update);
typeFilter.addEventListener("change", update);
sortSelect.addEventListener("change", update);


update();
