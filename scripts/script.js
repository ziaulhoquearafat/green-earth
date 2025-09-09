const categoryContainer = document.getElementById('category-container');
const cardContainer = document.getElementById('card-container');
const detailsContainer = document.getElementById('details-container');

const loadCategory = () => {
  const url = 'https://openapi.programming-hero.com/api/categories'; // get data from api
  fetch(url)
    .then(res => res.json()) // promise
    .then(data => {
      // console.log(data.categories);
      const category = data.categories;
      displayCategory(category);
    });
};

const displayCategory = category => {
  category.forEach(cat => {
    // console.log(cat.category_name);
    categoryContainer.innerHTML += `
       
       <li id="${cat.id}" class="hover:bg-[#15803d] text-[#1F2937] hover:text-white py-1 mb-2 px-2 rounded-sm cursor-pointer">${cat.category_name}</li>
       
       `;
  });

  categoryContainer.addEventListener('click', e => {
    const allLi = document.querySelectorAll('li');
    allLi.forEach(li => {
      li.classList.remove('bg-[#15803d]', 'text-white');
    });

    if (e.target.localName === 'li') {
      // console.log(e.target);
      e.target.classList.add('bg-[#15803d]', 'text-white');
      loadPlantsByCategory(e.target.id);
    }
  });
};

const loadPlantsByCategory = categoryId => {
  // console.log(categoryId);
  const url = `https://openapi.programming-hero.com/api/category/${categoryId}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      showPlantsByCategory(data.plants);
    });
};

const loadAllPlants = () => {
  const url = 'https://openapi.programming-hero.com/api/plants';
  fetch(url)
    .then(res => res.json())
    .then(data => {
      showPlantsByCategory(data.plants);
    });
};

const showPlantsByCategory = plants => {
  // console.log(plants);
  cardContainer.innerHTML = '';
  plants.forEach(plant => {
    cardContainer.innerHTML += `
  
            <div class="bg-white p-5 space-y-2 rounded-xl flex flex-col">
            <div class="rounded-lg overflow-hidden">
              <img src="${plant.image}" alt="" class="w-full h-50 md:h-55 object-cover">
            </div>
            <h4 onclick="loadPlantDetails(${plant.id})" class="font-semibold text-sm leading-5 text-[#1F2937]">${plant.name}</h4>
            <p class="text-[12px] text-[#1F2937] leading-4 flex-grow">${plant.description}</p>
            <div class="flex justify-between items-center mb-[12px]">
              <p class="text-[#15803D] bg-[#DCFCE7] rounded-full py-1 px-3 text-sm font-semibold">${plant.category}</p>
              <p class="text-sm font-semibold leading-5"><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${plant.price}</p>
            </div>
            <button class="btn w-full rounded-full bg-[#15803d] text-white mt-auto">Add to Cart</button>
          </div>
  `;
  });
};

const loadPlantDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  // console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  displayPlantDetails(data.plants);
};

const displayPlantDetails = title => {
  console.log(title);
  detailsContainer.innerHTML = '';
  detailsContainer.innerHTML += `
  
      <div class="space-y-3">
            <h2 class="font-bold text-3xl">${title.name}</h2>
            <img src="${title.image}" alt="">
            <p><strong>Category:</strong> ${title.category}</p>
            <p><strong>Price:</strong> <i class="fa-solid fa-bangladeshi-taka-sign"></i>${title.price}</p>
            <p><strong>Description:</strong> ${title.description}</p>
      </div>
  `;
  document.getElementById('my_modal_5').showModal();
};

loadCategory();
loadAllPlants();
