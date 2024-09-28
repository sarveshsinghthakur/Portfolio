var typed = new Typed('#web', {
    strings: ['Web Developer', 'Web Designer', 'Software Developer', 'Python Developer', 'Student'],
    typeSpeed: 30,
    backSpeed: 30,
    loop: true
  });
  
window.addEventListener('scroll', function() {
    var nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.childnav2');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('show');
});


