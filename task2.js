const searchbtn = document.querySelector('.searchbtn');
const searchbox = document.querySelector('.searchbox');
const Fetch_data = document.querySelector('.Fetch_data');
//const result =document.querySelector('.result');

const fetch_Data = async (x) => {
   const apiBaseUrl = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${x}`);
   console.log(apiBaseUrl);
   const response = await apiBaseUrl.json();
   // console.log(response.drinks[0]);
   response.drinks.forEach(drink => {
      //console.log(drink);
      const drinks_Div = document.createElement('div') // using javascript we can create div box
      drinks_Div.classList.add('cockimg'); // giving div class name as cockimg.
      drinks_Div.innerHTML = `<img src="${drink.strDrinkThumb}">
                           <h1>${drink.strDrink}</h1>`;

      Fetch_data.appendChild(drinks_Div);
      drinks_Div.addEventListener('click', () => showModal(drink));
   });
   
}

function showModal(drink) {
   console.log(drink);
   console.log(typeof(drink));
    document.getElementById('modal-name').innerText = drink.strDrink;
   document.getElementById('modal-image').src = drink.strDrinkThumb;
   document.getElementById('modal-ingredients').innerHTML = '';
   for (let i=1;i<=3;i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ingredient) {
         const li = document.createElement('li');
         li.innerText = `${measure || ''} ${ingredient}`;// here data are store in the object format.
         document.getElementById('modal-ingredients').appendChild(li);
      }
      else {
         break;
      }
      //document.getElementById('modal-instruction').innerText = drink.strInstructions;
      document.getElementById('save-favorite').onclick = ()=> saveTofavorites(drink);

      document.getElementById('modal').style.display = 'flex';
   }
}
   document.querySelector('.modal .close').addEventListener('click', function(){
      document.getElementById('modal').style.display = 'none';
   });

   function saveTofavorites(drink) {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      //const favorites = object.values(x);
      // Ensure favorites is an array
      if (!Array.isArray(favorites)) {
          console.error('Favorites is not an array');
          return;
      }
      if (!favorites.some(fav => fav.idDrink === drink.idDrink)) {
          favorites.push(drink);
          localStorage.setItem('favorites', JSON.stringify(favorites));
          console.log("Cocktail saved to favorites!");
      } else {
          alert('Cocktail is already in favorites.');
      }
  }


   //document.addEventListener('DOMContentLoaded', (event) => {
      // Function to display results
      function displayResults(drinks) {
   
          console.log(drinks);
          console.log("hii");
          
          // Ensure Result is defined and points to the correct DOM element
          const result = document.querySelector('.result'); // Adjust the selector as needed
          if (!result) {
              console.error('Result element not found');
              return;
          }
  
          // Clear previous results
          result.innerHTML = '';
  
          // Check if drinks is an array
          if (Array.isArray(drinks)) {
              drinks.forEach(drink => {
                  const card = document.createElement('div');
                  card.classList.add('card');
                  card.innerHTML = `<img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                                    <h3>${drink.strDrink}</h3>`;
                                    //card.addEventListener('click', () => showModal(drink));
                                    result.appendChild(card);
              });
          } else {
              console.error('Expected drinks to be an array');
          }
      }
  
      // Add event listener to the button
      document.getElementById('saves-favorite').addEventListener('click', function () {
          const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
          console.log(typeof(favorites));
          Fetch_data.innerHTML='';
          displayResults(favorites);
      });
  //});
  


searchbtn.addEventListener('click', (e) => {
   e.preventDefault();
   const searchInput = searchbox.value.trim(); // these will basically take the value from the input box.
   console.log(searchInput);
   fetch_Data(searchInput);// passing the search data to fetch function.
});
