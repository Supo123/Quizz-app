document.addEventListener('DOMContentLoaded', function() {
    const openBtn = document.querySelector('#open-btn');
    const closeBtn = document.querySelector('.close-btn');
    const sidebar = document.querySelector('.sidebar');

    openBtn.addEventListener('click', function() {
        sidebar.style.right = '0';
    });

    closeBtn.addEventListener('click', function() {
        sidebar.style.right = '-250px';
    });
});


// login page
// Get the modal
var modal = document.getElementById('loginModal');
var btn = document.getElementById("showLoginBtn");


var span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
    modal.style.display = "block";
}


span.onclick = function() {
    modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function validateForm() {
    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value.trim();
    var errorMsg = document.getElementById('error-msg');

    // Basic validation
    if (username === '') {
        errorMsg.innerHTML = 'Please enter your username.';
        return false;
    }

    if (password === '') {
        errorMsg.innerHTML = 'Please enter your password.';
        return false;
    }

    errorMsg.innerHTML = '';


    return true;
}
/// register form


const loginContainer = document.getElementById('login-page1');
const registerContainer = document.getElementById('register-container');
const showRegisterBtn = document.getElementById('showRegister');


const showLoginBtn = document.getElementById('showLoginBtn');

function showRegisterForm() {
    loginContainer.classList.add('hidden');
    registerContainer.classList.remove('hidden');
}

function showLoginForm() {
    registerContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
}
showRegisterBtn.addEventListener('click', function(event) {
    event.preventDefault(); 
    showRegisterForm();
});

showLoginBtn.addEventListener('click', function(event) {
    event.preventDefault(); 
    showLoginForm();
});

const closebtn=document.getElementById('close-button-register');



closebtn.addEventListener('click',(event)=>{
    event.preventDefault();
    registerContainer.classList.add('hidden');
});


