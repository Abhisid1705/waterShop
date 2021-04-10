let toggleButton=document.querySelector('.toggle-button');

let navigationBar=document.querySelector('.mobile-nav');

toggleButton.addEventListener('click',()=>{navigationBar.classList.add('open')});
navigationBar.addEventListener('click',()=>{
    navigationBar.classList.remove('open');
})