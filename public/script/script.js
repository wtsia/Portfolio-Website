// add class navbarDark on navbar scroll, and contact form
const header = document.querySelector('.navbar');
// look for form in index.html
const contactForm = document.querySelector('.contactmeform');

// finds each element by ID in index.html
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

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        content: content.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function(){
        
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

    xhr.send(JSON.stringify(formData))
});