/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

axios.get('https://api.github.com/users/ekajjj')
.then(response => {
  console.log(response);
  cardContainer.appendChild(cardCreator(response.data))
}) 
.catch((error) =>{
  console.log(error, 'Error')
});



/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 
   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  'chrisdalao',
  'marshnme',
  'sooshebot',
  'beautytechy',
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell'
];

followersArray.forEach(name => {
  axios.get(`https://api.github.com/users/${name}`)
  .then(response => {
      console.log(response)
      cardContainer.appendChild(cardCreator(response.data))
  })
  .catch((error) =>{
    console.log(error, 'Error')
  })
})


// STRETCH FOLLOWERS

const importFollowersArray = [];
axios.get('https://api.github.com/users/ekajjj/followers')
.then(response => {
  console.log(response);
  for(i = 0; i < response.data.length; i++){
    importFollowersArray.push(response.data[i]);
    console.log(response.data[i])
  }
  for(j = 0; j < importFollowersArray.length; j++){
    axios.get(`https://api.github.com/users/${importFollowersArray[j].login}`)
  .then(response2 => {
      //if(!followersArray.includes(response2.data))
      cardContainer.appendChild(cardCreator(response2.data))
  })
  .catch((error) =>{
    console.log(error, 'Error')
  })
  }
});

// TRY TO GET ALL FOLLOWERS OF ALL USERS IN FOLLOWERSARRAY
// Why is their data undefined?

/*
const allFollowersArray = [];
for(i = 0; i < followersArray.length; i++){
axios.get(`https://api.github.com/users/${followersArray[i]}/followers`)
.then(response => {
  for(i = 0; i < response.data.length; i++){
    allFollowersArray.push(response.data[i]);
  }
  for(j = 0; j < allFollowersArray.length; j++){
    

//  axios.get(`https://api.github.com/users/${allFollowersArray[j]}`)
// .then(response => {
//      console.log(response)
//      cardContainer.appendChild(cardCreator(response.data))
//  })
//  .catch((error) =>{
//    console.log(error, 'Error')
//  })
//  

    cardContainer.appendChild(cardCreator(allFollowersArray[j]))
  }
}
)
}
*/

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:
<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>
*/

const cardContainer = document.querySelector('.cards')

function cardCreator(item) {
  const card = document.createElement('div');
  const cardinfoDiv = document.createElement('div');
  const img = document.createElement('img');
  const h3 = document.createElement('h3');
  const nameP = document.createElement('p');
  const locationP = document.createElement('p');
  const profileP = document.createElement('p');
  const followersP = document.createElement('p');
  const followingP = document.createElement('p');
  const bioP = document.createElement('p');
  const aTag = document.createElement('a');
  
  card.classList.add('card');
  cardinfoDiv.classList.add('card-info');
  h3.classList.add('name');
  nameP.classList.add('username');

  card.appendChild(img);
  card.appendChild(cardinfoDiv);
  cardinfoDiv.appendChild(h3);
  cardinfoDiv.appendChild(nameP);
  cardinfoDiv.appendChild(locationP);
  cardinfoDiv.appendChild(profileP);
  cardinfoDiv.appendChild(followersP);
  cardinfoDiv.appendChild(followingP);
  cardinfoDiv.appendChild(bioP);
  profileP.appendChild(aTag);

  img.src = item.avatar_url
  h3.textContent = item.login
  nameP.textContent = item.name
  locationP.textContent = `Location: ${item.location}`
  followersP.textContent = `Followers: ${item.followers}`
  followingP.textContent = `Following: ${item.following}`
  bioP.textContent = item.username
  aTag.textContent = `Profile: ${item.html_url}`
  
  return card;
}