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

    // Close mobile menu immediately
    navLinks.classList.remove("active");

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

// ==============================
// Hero Typing Effect
// ==============================

const typingText = 
"Building modern, responsive, and user-focused web applications.";

const typingElement = document.querySelector(".typing-text");

let charIndex = 0;


function typeEffect(){

    if(charIndex < typingText.length){

        typingElement.textContent += typingText.charAt(charIndex);

        charIndex++;

        setTimeout(typeEffect,45);

    }

}


typeEffect();

// ==============================
// Back To Top Button
// ==============================

const backToTop = document.querySelector("#backToTop");


window.addEventListener("scroll", ()=>{

    if(window.scrollY > 500){

        backToTop.classList.add("show");

    }else{

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", ()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

// ==============================
// Contact Form Validation
// ==============================

const contactForm = document.querySelector("#contactForm");

const formMessage = document.querySelector(".form-message");


contactForm.addEventListener("submit", (e)=>{

    e.preventDefault();


    const name = document.querySelector("#name").value.trim();

    const email = document.querySelector("#email").value.trim();

    const message = document.querySelector("#message").value.trim();



    if(name === "" || email === "" || message === ""){

        formMessage.textContent = "Please fill all fields.";

        formMessage.classList.add("show");


        setTimeout(()=>{

            formMessage.classList.remove("show");

        },1500);


        return;

    }



    formMessage.textContent = "Message sent successfully ✓";

    formMessage.classList.add("show");


    contactForm.reset();


    setTimeout(()=>{

        formMessage.classList.remove("show");

    },1500);


});

// ==============================
// Theme Toggle
// ==============================

const themeToggle = document.querySelector("#themeToggle");

const currentTheme = localStorage.getItem("theme");

if(currentTheme){

    document.documentElement.setAttribute("data-theme", currentTheme);

    updateIcon(currentTheme);

}

themeToggle.addEventListener("click",()=>{

    const theme =
        document.documentElement.getAttribute("data-theme");

    if(theme === "light"){

        document.documentElement.removeAttribute("data-theme");

        localStorage.setItem("theme","dark");

        updateIcon("dark");

    }else{

        document.documentElement.setAttribute("data-theme","light");

        localStorage.setItem("theme","light");

        updateIcon("light");

    }

});


function updateIcon(theme){

    themeToggle.innerHTML =

        theme === "light"

        ? '<i data-lucide="sun"></i>'

        : '<i data-lucide="moon"></i>';

    lucide.createIcons();

}