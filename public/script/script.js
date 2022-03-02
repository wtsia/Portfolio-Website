// add class navbarDark on navbar scroll, and contact form
const header = document.querySelector('.navbar');
const contactForm = document.querySelector('.contactmeform');

let name = document.getElementById('nameform');
let email = document.getElementById('emailform');
let subject = document.getElementById('subjectform');
let content = document.getElementById('contentform');

window.onscroll = function() {
    let top = window.scrollY;
    if(top >=100) {
        header.classList.add('navbarDark');
    }
    else {
        header.classList.remove('navbarDark');
    }
}

contactForm.Form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('submit clicked');
    let formData = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        content: content.value
    }
    console.log(formData);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText == 'success') {
            alert('Email sent');
            name.value = '';
            email.value = '';
            subject.value = '';
            content.value = '';
        } else {
            alert('something went wrong!')
        }
    }
});