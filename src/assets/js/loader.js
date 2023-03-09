// "use strict";
// const card = document.querySelector(".card");
// const cardImageWrapper = document.querySelector(".img-cont");
// //const cardAvatarWrapper = document.querySelector(".user-avatar-cont");


// // const cardAvatarElement = '<img src="https://firebasestorage.googleapis.com/v0/b/instagram-e7380.appspot.com/o/eddy.jpg?alt=media&token=32b063dd-2742-459a-89dd-35f7999d8743" class="rounded-circle image-radius m-r-15" />';
// const cardImageElement = '<img class="img" src="https://firebasestorage.googleapis.com:443/v0/b/instagram-e7380.appspot.com/o/profile_images%2F7E462795-6E26-4F4C-BBAB-2804EF6A8E0E?alt=media&token=930a9243-6230-4b07-ad88-9accefc163fc" width="100%" />';


// const setPlaceholder = () => {
//   if (!card.classList.contains("card--skeleton"));
//   card.classList.add("card--skeleton");
//   cardImageWrapper.innerHTML = "";
//   //cardAvatarWrapper.innerHTML = "";
// };

// const unsetPlaceholder = () => {
//   // if (card.classList.contains("card--skeleton") && cardImageWrapper.children.length === 0 && cardAvatarWrapper.children.length === 0) {
//   if (card.classList.contains("card--skeleton") && cardImageWrapper.children.length === 0) {
//     card.classList.remove("card--skeleton");
//     cardImageWrapper.innerHTML += cardImageElement;
//     //cardAvatarWrapper.innerHTML += cardAvatarElement;
//   }
// };

// const reload = (ms) => {
//   ms = ms || 1000;

//   setPlaceholder();

//   setTimeout(() => {
//     unsetPlaceholder();
//   }, ms);
// };

// window.onload=reload;
