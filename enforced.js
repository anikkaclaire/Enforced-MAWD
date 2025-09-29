const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach((link, i) => {
    link.addEventListener('click', function(e){
        e.preventDefault();
        sections[i].scrollIntoView({behavior:'smooth'});
        navLinks.forEach(l => {
            l.classList.remove('active');
            l.style.backgroundColor = 'transparent';
            l.style.color = 'red';
        });
        this.classList.add('active');
        this.style.backgroundColor = this.style.borderColor;
        this.style.color = 'black';
    });
});

navLinks[0].classList.add('active');
navLinks[0].style.backgroundColor = navLinks[0].style.borderColor;
navLinks[0].style.color = 'black';

const searchInput = document.getElementById('search');
const searchOptions = document.getElementById('search-options');

searchInput.addEventListener('focus', () => {
    searchOptions.style.display = 'block';
});

searchInput.addEventListener('blur', () => {
    setTimeout(() => searchOptions.style.display = 'none', 200);
});

searchOptions.querySelectorAll('p').forEach(option => {
    option.addEventListener('click', () => {
        searchInput.value = option.textContent;
        searchOptions.style.display = 'none';
    });
});

