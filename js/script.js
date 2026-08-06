// ==============================
// Smooth Scrolling
// ==============================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if(target){

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});

// ==============================
// Mobile Menu
// ==============================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");


menuToggle.addEventListener("click", ()=>{

    navLinks.classList.toggle("active");

});

// ==============================
// Active Navbar On Scroll
// ==============================

const sections = document.querySelectorAll("section");

const navItems = document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", ()=>{

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.clientHeight;


        if(
            scrollY >= sectionTop &&
            scrollY < sectionTop + sectionHeight
        ){

            current = section.getAttribute("id");

        }

    });


    navItems.forEach(link => {

        link.classList.remove("active");


        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});

// Close mobile menu after clicking a link

navItems.forEach(link=>{

    link.addEventListener("click",()=>{

        navLinks.classList.remove("active");

    });

});

// ==============================
// Scroll Reveal
// ==============================

const revealElements = document.querySelectorAll(".reveal");


const revealOnScroll = () => {

    revealElements.forEach(element => {

        const elementTop = element.getBoundingClientRect().top;

        const windowHeight = window.innerHeight;


        if(elementTop < windowHeight - 100){

            element.classList.add("active");

        }

    });

};


window.addEventListener("scroll", revealOnScroll);


// Run once when page loads
revealOnScroll();