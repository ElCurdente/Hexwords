// ======= MENU BURGER ========
const navMenu = document.getElementById('nav-menu'),
    toggleMenu = document.getElementById('nav-toggle'),
    closeMenu = document.getElementById('nav-close');

// VISIBLE
toggleMenu.addEventListener('click', () => {
    navMenu.classList.toggle('show');
})

// CACHE
closeMenu.addEventListener('click', () => {
    navMenu.classList.remove('show');
})

// ACTIVE ET DESACTIVE LE MENU
const navLink = document.querySelectorAll('.nav_link');

function linkAction() {
    // ACTIVE
    navLink.forEach(n => n.classList.remove('active'));
    this.classList.add('active');

    // DESACTIVE
    navMenu.classList.remove('show');
}

navLink.forEach(n => n.addEventListener('click', linkAction));

// Bandeau derrière le menu au scroll
window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
})

// MENU ACTIF SUIVANT LE SCROLL
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav_link');

window.addEventListener("scroll", () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - sectionHeight / 4)) {
            current = section.getAttribute('id');
        }
    })

    navLi.forEach(li => {
        li.classList.remove('active');
        const href = li.getAttribute('href').substring(1);
        if (href === current) {
            li.classList.add('active');
        }
    });
})

// CHANGEMENT DU TEXTE PAGE ACCUEIL
const TypeWriter = function (txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// TYPE METHODE
TypeWriter.prototype.type = function () {
    // INDEX ACTUEL DU MOT
    const index = this.wordIndex % this.words.length;

    // PRENDRE LE TEXTE COMPLET DU MOT ACTUEL
    const fullTxt = this.words[index];

    // CHECK SI SUP
    if (this.isDeleting) {
        // RETIRER LETTRE
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        // AJOUTER LETTRE
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // INSERER LE TEXTE DANS L'ELEMENT
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // INITIALISER VITESSE D'ECRITURE
    let typeSpeed = 300;

    if (this.isDeleting) {
        typeSpeed /= 2;
    }

    // SI LE MOT EST COMPLET
    if (!this.isDeleting && this.txt === fullTxt) {
        // FAIRE UNE PAUSE A LA FIN
        typeSpeed = this.wait;

        // METTRE LE DELETE A TRUE
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;

        // PASSER AU PROCHAIN MOT
        this.wordIndex++;

        // PAUSE AVANT DE COMMENCER L'ECRITURE
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed)
}

// INITIALISER AU DOM LOAD
document.addEventListener('DOMContentLoaded', init);

// INITIALISER APP
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    // INITIALISER TYPEWRITER
    new TypeWriter(txtElement, words, wait);
}