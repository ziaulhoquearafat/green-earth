const categoryContainer = document.getElementById('category-container');
const cardContainer = document.getElementById('card-container');
const detailsContainer = document.getElementById('details-container');
const cartContainer = document.getElementById('cart-container');

let totalPrice = 0;

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
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/category/${categoryId}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      showPlantsByCategory(data.plants);
    });
};

const manageSpinner = isLoading => {
  if (isLoading == true) {
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('card-container').classList.add('hidden');
  } else {
    document.getElementById('card-container').classList.remove('hidden');
    document.getElementById('spinner').classList.add('hidden');
  }
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
        <button data-id="${plant.id}" data-name="${plant.name}" data-price="${plant.price}" class="btn add-to-cart w-full rounded-full bg-[#15803d] text-white mt-auto">Add to Cart</button>
      </div>
    `;
  });

  const buttons = document.querySelectorAll('.add-to-cart');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);

      alert(`${name} has been added to the cart`);

      // Check if item already exists in cart
      const existingItem = document.querySelector(
        `.cart-item[data-id='${id}']`
      );
      if (existingItem) {
        // Increase quantity
        const qtyEl = existingItem.querySelector('.item-qty');
        let qty = parseInt(qtyEl.innerText);
        qty += 1;
        qtyEl.innerText = qty;

        // Update price display
        const priceEl = existingItem.querySelector('.item-price');
        priceEl.innerText = price * qty;
      } else {
        // Add new item
        cartContainer.innerHTML += `
          <div class="cart-item bg-[#F0FDF4] p-3 rounded-lg flex justify-between items-center mb-3" data-id="${id}" data-price="${price}">
            <div>
              <h4 class="font-semibold text-sm leading-5 text-[#1F2937] mb-2">${name}</h4>
              <p class="text-sm leading-5 text-gray-500"><i class="fa-solid fa-bangladeshi-taka-sign"></i> <span class="item-price">${price}</span> <i class="fa-solid fa-xmark"></i> <span class="item-qty">1</span></p>
            </div>
            <div>
              <i class="fa-solid fa-xmark cursor-pointer remove-item"></i>
            </div>
          </div>
        `;
      }

      // Update total price
      let newTotal = 0;
      const allItems = document.querySelectorAll('.cart-item');
      allItems.forEach(item => {
        const itemPrice = parseFloat(
          item.querySelector('.item-price').innerText
        );
        newTotal += itemPrice;
      });
      document.getElementById(
        'cart-total'
      ).innerHTML = `<i class="fa-solid fa-bangladeshi-taka-sign"></i> ${newTotal}`;

      const removeBtns = document.querySelectorAll('.remove-item');
      removeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const item = btn.closest('.cart-item');
          item.remove();

          let totalAfterRemove = 0;
          const remainingItems = document.querySelectorAll('.cart-item');
          remainingItems.forEach(it => {
            totalAfterRemove += parseFloat(
              it.querySelector('.item-price').innerText
            );
          });
          document.getElementById(
            'cart-total'
          ).innerHTML = `<i class="fa-solid fa-bangladeshi-taka-sign"></i> ${totalAfterRemove}`;
        });
      });
    });
  });

  manageSpinner(false);
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
