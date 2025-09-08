const categoryContainer = document.getElementById('category-container');

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
      console.log(e.target);
      e.target.classList.add('bg-[#15803d]', 'text-white');
    }
  });
};

loadCategory();
