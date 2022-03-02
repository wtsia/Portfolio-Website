const contactForm = document.querySelector('.contact-form');

let name = document.getElementById('name')
let name = document.getElementById('name')
let name = document.getElementById('name')
let name = document.getElementById('name')

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
            name.value = '';
            name.value = '';
            name.value = '';
        } else {
            alert('something went wrong!')
        }
    }
});