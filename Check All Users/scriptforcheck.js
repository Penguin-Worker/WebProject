let buttonswitch = document.getElementById("check");
let box = document.getElementsByClassName('box');
let header = document.querySelector('header');
let text = document.querySelectorAll('p');
let singup = document.getElementById('Sign-up');
let login = document.getElementById('Log-in');
let logut = document.getElementById('logout');
const isDarkThemeEnabled = localStorage.getItem('darkThemeEnabled') === 'true';
let username = localStorage.getItem('username');
const usersContainer = document.querySelector(".users");
let searchicon = document.querySelector(".search-photo");
let shoppingicon = document.querySelector(".shoping");
// Устанавливаем начальное значение в соответствии с сохраненным значением
if (isDarkThemeEnabled) {
  switchdarktheme();
  buttonswitch.checked = true;
  
}
let url = '../jsonfiles/LoginAndPasswods.json';
 fetch(url)
 .then(response => response.json())
 .then(result => { for(let element of result){
    const userElement = document.createElement("div");
  userElement.classList.add("user");

  const emailElement = document.createElement("p");
  emailElement.textContent = `Email: ${element.email}. Name: ${element.FirstName} ${element.LastName} (${element.FatherName}). Login: ${element.login}. Password: ${element.password}`;

  userElement.appendChild(emailElement);
  usersContainer.appendChild(userElement);
 }

})
function switchdarktheme(){
  document.body.classList.add("night-theme");
  header.classList.add("night-theme"); 
  logo.style = "filter: invert(1)";
  searchicon.style.filter = "invert(1)";
  shoppingicon.style.filter = "invert(1)";

 for (let elem of text) {
     
    elem.classList.add("night-text");
 }
 logut.style.backgroundColor = "#310A31";
 logut.style.color = "#50FFB1";
for(let i = 0; i < box.length; i++){
     box[i].classList.add("night-theme");
}
}
function switchlight(){
  document.body.classList.remove("night-theme");
  header.classList.remove("night-theme");
  searchicon.style.filter = "invert(0)";
  shoppingicon.style.filter = "invert(0)";
  logo.style = "filter: invert(0)";

  for(let elem of box){
      elem.classList.remove("night-theme");
  }
  logut.style.backgroundColor = "#FCF8F3";
 logut.style.color = "#000000"
  for (let elem of text) {
      elem.classList.remove("night-text");
  }
}
buttonswitch.addEventListener('change',function(){
    if(buttonswitch.checked){  
      localStorage.setItem('darkThemeEnabled','true') 
      switchdarktheme();
        }
     else {
      switchlight();
         localStorage.setItem('darkThemeEnabled','false')
     }
});

let burgershop = document.querySelector('.shop');
let burgerabout = document.querySelector('.about');
let burgersustainability = document.querySelector('.sustainability');
burgerabout.addEventListener('click',function(event){
  event.preventDefault()
  if(localStorage.getItem('username') === '')
  {
    alert("You need to be login/register")
  }
  else{
    window.location.href = '../Read article/ReadArticle.html'
  }
})
burgershop.addEventListener('click',function(event){
  event.preventDefault()
  if(localStorage.getItem('username') === '')
  {
    alert("You need to be login/register")
  }
  else{
    window.location.href = '../Shop/shopall.html'
  }
})
burgersustainability.addEventListener('click',function(event){
  event.preventDefault()
  if(localStorage.getItem('username') === '')
  {
    alert("You need to be login/register")
  }
  else{
    window.location.href = '../Questions/Questions.html'
  }
})

function loadLanguage(language) {
  let url = '../jsonfiles/i18n.json';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Обновление текстовых значений элементов
      const elements = document.querySelectorAll('.i18n');
  
      for (let element of elements) {
        
        const key = element.getAttribute('i18n');
        let translation = data[language][key];
        localStorage.setItem(key,translation);
        element.innerHTML = translation;
      }
    });
}
const languageselect = document.getElementById('languageSelect');
languageselect.addEventListener('change', function(){
  let select = languageselect.value;
  loadLanguage(select)
  localStorage.setItem('translate',select);
})

logut.addEventListener('click',function(){
  location.reload();
  username = '';
  password = '';
  //убираем значения юзера с локалки
  localStorage.setItem('username',`${username}`);
  localStorage.setItem('password',`${password}`);

  for(let elem of pUsername){
    elem.style.display = "none";
  }
 
  logut.style = "display: none";
  localStorage.setItem('logining','false');
  window.location = "../HomePage/index.html";
})
let pUsername = document.querySelectorAll('.username');
let checkuser = localStorage.getItem('logining') === 'true';
if(checkuser){
  setLoginNameOnSite();
  let unauthotized = document.querySelectorAll(".unauthotized");
    for(let elements of unauthotized){
      elements.style = "display:flex"
    }
}
else{
    setLoginNameOnSite();
  }

function setLoginNameOnSite(){
  for(let elem of pUsername){
   elem.textContent = localStorage.getItem('username');
   elem.style.display = "block";
  
  }
  logut.style = "display: flex";
 
 }
 let translate = 'en';
const isEnLanguage = localStorage.getItem('translate');
if(isEnLanguage ==='en'){
  loadLanguage(isEnLanguage)
  const EnOption = languageSelect.querySelector('option[value="en"]');
  EnOption.selected = true;
}
else{
  loadLanguage('ru');
  const ruOption = languageSelect.querySelector('option[value="ru"]');
  ruOption.selected = true;
}
burgerlogout.addEventListener('click',function(){
  username = '';
  password = '';
  //убираем значения юзера с локалки
  localStorage.setItem('username',`${username}`);
  localStorage.setItem('password',`${password}`);

  for(let elem of pUsername){
    elem.style.display = "none";
  }
  window.location = "../HomePage/index.html";
  localStorage.setItem('logining','false');
})