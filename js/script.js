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

/* ==========================================
   LEETCODE ACTIVITY HEATMAP
========================================== */

const heatmap = document.querySelector("#leetcodeHeatmap");
const heatmapMonths = document.querySelector("#heatmapMonths");
const activityYear = document.querySelector("#activityYear");

const totalSolved = document.querySelector("#totalSolved");
const activeDays = document.querySelector("#activeDays");
const maxStreak = document.querySelector("#maxStreak");

const currentYear = new Date().getFullYear();

const LEETCODE_API =
    "https://falling-grass-92d4.swapnilbiradar12345.workers.dev/leetcode";

const LEETCODE_USERNAME = "swapnilsb_18";


/* ==========================================
   YEAR SELECTOR
========================================== */

if (activityYear) {

    activityYear.innerHTML = "";

    for (
        let year = currentYear;
        year >= currentYear - 4;
        year--
    ) {

        const option =
            document.createElement("option");

        option.value = year;
        option.textContent = year;

        activityYear.appendChild(option);
    }

    activityYear.value = currentYear;
}


/* ==========================================
   MONTH NAMES
========================================== */

const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];


/* ==========================================
   FETCH LEETCODE DATA
========================================== */

async function fetchLeetCodeData(year) {

    const response = await fetch(
        `${LEETCODE_API}?username=${LEETCODE_USERNAME}&year=${year}`
    );

    if (!response.ok) {

        throw new Error(
            `HTTP ${response.status}`
        );
    }

    const data = await response.json();

    if (
        !data ||
        !data.submissionCalendar
    ) {

        throw new Error(
            "submissionCalendar missing"
        );
    }

    let submissions;

    if (
        typeof data.submissionCalendar ===
        "string"
    ) {

        submissions =
            JSON.parse(
                data.submissionCalendar
            );

    } else {

        submissions =
            data.submissionCalendar;
    }

    return submissions;
}


/* ==========================================
   CONVERT TIMESTAMP TO DATE KEY
========================================== */

function getDateKey(timestamp) {

    const date =
        new Date(
            Number(timestamp) * 1000
        );

    return `${date.getFullYear()}-${String(
        date.getMonth() + 1
    ).padStart(2, "0")}-${String(
        date.getDate()
    ).padStart(2, "0")}`;
}


/* ==========================================
   BUILD ACTIVITY MAP
========================================== */

function createActivityMap(submissions) {

    const map = {};

    Object.entries(submissions).forEach(
        ([timestamp, count]) => {

            const dateKey =
                getDateKey(timestamp);

            map[dateKey] =
                Number(count);
        }
    );

    return map;
}


/* ==========================================
   CREATE DATE KEY
========================================== */

function formatDateKey(date) {

    return `${date.getFullYear()}-${String(
        date.getMonth() + 1
    ).padStart(2, "0")}-${String(
        date.getDate()
    ).padStart(2, "0")}`;
}


/* ==========================================
   ACTIVITY LEVEL
========================================== */

function getActivityLevel(count) {

    if (count === 0) {
        return 0;
    }

    if (count <= 2) {
        return 1;
    }

    if (count <= 5) {
        return 2;
    }

    if (count <= 9) {
        return 3;
    }

    return 4;
}


/* ==========================================
   CALCULATE MAX STREAK
========================================== */

function calculateMaxStreak(activityMap) {

    const dates =
        Object.keys(activityMap)
            .filter(
                date => activityMap[date] > 0
            )
            .sort();

    if (dates.length === 0) {
        return 0;
    }

    let maxStreak = 1;
    let currentStreak = 1;

    for (
        let i = 1;
        i < dates.length;
        i++
    ) {

        const previous =
            new Date(
                dates[i - 1] + "T00:00:00"
            );

        const current =
            new Date(
                dates[i] + "T00:00:00"
            );

        const difference =
            Math.round(
                (
                    current - previous
                ) /
                (
                    1000 * 60 * 60 * 24
                )
            );

        if (difference === 1) {

            currentStreak++;

            maxStreak =
                Math.max(
                    maxStreak,
                    currentStreak
                );

        } else {

            currentStreak = 1;
        }
    }

    return maxStreak;
}


/* ==========================================
   CALCULATE LIFETIME STATS
========================================== */

function calculateLifetimeStats(activityMap) {

    let total = 0;
    let days = 0;

    Object.values(activityMap)
        .forEach(count => {

            const value =
                Number(count) || 0;

            total += value;

            if (value > 0) {
                days++;
            }
        });

    const streak =
        calculateMaxStreak(
            activityMap
        );

    return {
        total,
        days,
        streak
    };
}


/* ==========================================
   CREATE MONTH HEATMAP
========================================== */

function createMonthHeatmap(
    year,
    month,
    activityMap
) {

    /*
        Each month is its own block.

        7 rows = Sun → Sat
        Columns = weeks
    */

    const monthContainer =
        document.createElement("div");

    monthContainer.className =
        "heatmap-month";


    const monthTitle =
        document.createElement("div");

    monthTitle.className =
        "heatmap-month-title";

    monthTitle.textContent =
        MONTHS[month];

    monthContainer.appendChild(
        monthTitle
    );


    const monthGrid =
        document.createElement("div");

    monthGrid.className =
        "heatmap-month-grid";


    /*
        First day of month
    */

    const firstDay =
        new Date(
            year,
            month,
            1
        );


    /*
        Last day of month
    */

    const lastDay =
        new Date(
            year,
            month + 1,
            0
        );


    /*
        Sunday = 0
        Monday = 1
        ...
        Saturday = 6
    */

    const startWeekday =
        firstDay.getDay();


    /*
        Number of days
    */

    const daysInMonth =
        lastDay.getDate();


    /*
        Empty cells before first day
    */

    for (
        let i = 0;
        i < startWeekday;
        i++
    ) {

        const empty =
            document.createElement("div");

        empty.className =
            "heatmap-day heatmap-empty";

        monthGrid.appendChild(
            empty
        );
    }


    /*
        Actual days
    */

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const date =
            new Date(
                year,
                month,
                day
            );

        const dateKey =
            formatDateKey(date);

        const count =
            activityMap[dateKey] || 0;

        const level =
            getActivityLevel(count);


        const cell =
            document.createElement("div");

        cell.className =
            `heatmap-day level-${level}`;


        /*
            Tooltip
        */

        const formattedDate =
            date.toLocaleDateString(
                "en-US",
                {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                }
            );


        if (count === 0) {

            cell.title =
                `No submissions on ${formattedDate}`;

        } else {

            cell.title =
                `${count} submission${
                    count === 1
                        ? ""
                        : "s"
                } on ${formattedDate}`;
        }


        monthGrid.appendChild(
            cell
        );
    }


    monthContainer.appendChild(
        monthGrid
    );


    return monthContainer;
}


/* ==========================================
   RENDER HEATMAP
========================================== */

function renderHeatmap(
    year,
    activityMap
) {

    if (!heatmap) {
        return;
    }

    heatmap.innerHTML = "";

    /*
        Create 12 individual month blocks
    */

    for (
        let month = 0;
        month < 12;
        month++
    ) {

        const monthBlock =
            createMonthHeatmap(
                year,
                month,
                activityMap
            );

        heatmap.appendChild(
            monthBlock
        );
    }
}


/* ==========================================
   LOAD LEETCODE ACTIVITY (per-year heatmap)
========================================== */

async function loadLeetCodeActivity(
    year
) {

    if (!heatmap) {

        console.error(
            "LeetCode heatmap not found."
        );

        return;
    }


    try {

        heatmap.innerHTML = "";


        if (heatmapMonths) {
            heatmapMonths.innerHTML = "";
        }


        /*
            Fetch selected year
        */

        const submissions =
            await fetchLeetCodeData(
                year
            );


        console.log(
            `LeetCode ${year} data:`,
            submissions
        );


        /*
            Convert to activity map
        */

        const activityMap =
            createActivityMap(
                submissions
            );


        /*
            Render heatmap
        */

        renderHeatmap(
            year,
            activityMap
        );

    }


    catch (error) {

        console.error(
            "LeetCode activity error:",
            error
        );
    }
}


/* ==========================================
   FETCH ALL-TIME STATS (across every year)
========================================== */

async function fetchAllTimeStats() {

    const maxYearsBack = 15;
    let year = currentYear;
    let combinedMap = {};
    let consecutiveEmptyYears = 0;

    for (
        let i = 0;
        i < maxYearsBack;
        i++
    ) {

        try {

            const submissions =
                await fetchLeetCodeData(
                    year
                );

            const yearMap =
                createActivityMap(
                    submissions
                );

            const hasActivity =
                Object.values(yearMap)
                    .some(c => c > 0);

            combinedMap = {
                ...combinedMap,
                ...yearMap
            };

            consecutiveEmptyYears =
                hasActivity
                    ? 0
                    : consecutiveEmptyYears + 1;

        } catch (error) {

            consecutiveEmptyYears++;
        }

        if (consecutiveEmptyYears >= 2) {
            break;
        }

        year--;
    }

    return calculateLifetimeStats(
        combinedMap
    );
}


/* ==========================================
   LOAD ALL-TIME STATS INTO THE UI
========================================== */

async function loadAllTimeStats() {

    try {

        if (totalSolved) {
            totalSolved.textContent = "...";
        }

        if (activeDays) {
            activeDays.textContent = "...";
        }

        if (maxStreak) {
            maxStreak.textContent = "...";
        }


        const stats =
            await fetchAllTimeStats();


        if (totalSolved) {

            totalSolved.textContent =
                stats.total.toLocaleString();
        }


        if (activeDays) {

            activeDays.textContent =
                stats.days.toLocaleString();
        }


        if (maxStreak) {

            maxStreak.textContent =
                stats.streak;
        }


        console.log(
            "LeetCode all-time stats:",
            stats
        );

    }

    catch (error) {

        console.error(
            "LeetCode all-time stats error:",
            error
        );

        if (totalSolved) {
            totalSolved.textContent = "--";
        }

        if (activeDays) {
            activeDays.textContent = "--";
        }

        if (maxStreak) {
            maxStreak.textContent = "--";
        }
    }
}


/* ==========================================
   INITIAL LOAD
========================================== */

loadLeetCodeActivity(
    currentYear
);

loadAllTimeStats();


/* ==========================================
   YEAR CHANGE
   (heatmap only — Total Solved / Active Days /
   Max Streak stay lifetime and don't change)
========================================== */

if (activityYear) {

    activityYear.addEventListener(
        "change",
        () => {

            const selectedYear =
                Number(
                    activityYear.value
                );

            loadLeetCodeActivity(
                selectedYear
            );
        }
    );
}

