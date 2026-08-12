// ============================================================
// PORTFOLIO JAVASCRIPT
// ============================================================


// ============================================================
// SMOOTH SCROLLING
// ============================================================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        e.preventDefault();

        // Close mobile menu
        if (navLinks) {
            navLinks.classList.remove("active");
        }

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});


// ============================================================
// MOBILE MENU
// ============================================================

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const isOpen =
            navLinks.classList.contains("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    // Close menu when clicking a navigation link

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


// ============================================================
// ACTIVE NAVBAR ON SCROLL
// ============================================================

const sections =
    document.querySelectorAll("section");

const navItems =
    document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 120;

        const sectionHeight =
            section.clientHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
                sectionTop + sectionHeight
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navItems.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


// ============================================================
// SCROLL REVEAL
// ============================================================

const revealElements =
    document.querySelectorAll(".reveal");

const revealOnScroll = () => {

    revealElements.forEach(element => {

        const elementTop =
            element.getBoundingClientRect().top;

        const windowHeight =
            window.innerHeight;

        if (
            elementTop <
            windowHeight - 100
        ) {

            element.classList.add("active");

        }

    });

};

window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();


// ============================================================
// HERO TYPING EFFECT
// ============================================================

const typingText =
    "Building modern, responsive, and user-focused web applications.";

const typingElement =
    document.querySelector(".typing-text");

let charIndex = 0;

function typeEffect() {

    if (!typingElement) {
        return;
    }

    if (charIndex < typingText.length) {

        typingElement.textContent +=
            typingText.charAt(charIndex);

        charIndex++;

        setTimeout(typeEffect, 45);

    }

}

if (typingElement) {
    typeEffect();
}


// ============================================================
// BACK TO TOP
// ============================================================

const backToTop =
    document.querySelector("#backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


// ============================================================
// CONTACT FORM
// ============================================================

const contactForm =
    document.querySelector("#contactForm");

const formMessage =
    document.querySelector(".form-message");

const CONTACT_WORKER_URL =
    "https://misty-leaf-82a8.swapnilbiradar12345.workers.dev/";

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();


            // ==================================================
            // Get form fields
            // ==================================================

            const name =
                document.querySelector("#name");

            const email =
                document.querySelector("#email");

            const message =
                document.querySelector("#message");

            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );


            const nameValue =
                name ? name.value.trim() : "";

            const emailValue =
                email ? email.value.trim() : "";

            const messageValue =
                message ? message.value.trim() : "";


            // ==================================================
            // Validate fields
            // ==================================================

            if (
                !nameValue ||
                !emailValue ||
                !messageValue
            ) {

                showFormMessage(
                    "Please fill all fields.",
                    "error"
                );

                return;
            }


            // ==================================================
            // Validate email
            // ==================================================

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(emailValue)) {

                showFormMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                return;
            }


            // ==================================================
            // Loading state
            // ==================================================

            const originalButtonText =
                submitButton
                    ? submitButton.innerHTML
                    : "";

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.innerHTML =
                    "Sending...";
            }


            try {

                // ==================================================
                // Send data to Cloudflare Worker
                // ==================================================

                const response =
                    await fetch(
                        CONTACT_WORKER_URL,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                name: nameValue,
                                email: emailValue,
                                message: messageValue
                            })
                        }
                    );


                // ==================================================
                // Read Worker response
                // ==================================================

                const data =
                    await response.json();


                // ==================================================
                // Check response
                // ==================================================

                if (
                    !response.ok ||
                    !data.success
                ) {

                    throw new Error(
                        data.message ||
                        "Unable to send message."
                    );

                }


                // ==================================================
                // Success
                // ==================================================

                showFormMessage(
                    "Message sent successfully ✓",
                    "success"
                );


                // Clear form

                contactForm.reset();


            }
            catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );


                showFormMessage(
                    "Unable to send message. Please try again.",
                    "error"
                );

            }
            finally {

                // ==================================================
                // Restore button
                // ==================================================

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.innerHTML =
                        originalButtonText;

                }

            }

        }
    );

}


// ============================================================
// FORM MESSAGE HELPER
// ============================================================

function showFormMessage(
    text,
    type = "success"
) {

    if (!formMessage) {
        return;
    }


    formMessage.textContent =
        text;


    formMessage.classList.remove(
        "show",
        "success",
        "error"
    );


    formMessage.classList.add(
        "show",
        type
    );


    // Hide after 4 seconds

    setTimeout(() => {

        formMessage.classList.remove(
            "show"
        );

    }, 4000);

}

// ============================================================
// THEME TOGGLE
// ============================================================

const themeToggle =
    document.querySelector("#themeToggle");


function updateIcon(theme) {

    if (!themeToggle) {
        return;
    }

    themeToggle.innerHTML =
        theme === "light"
            ? '<i data-lucide="sun"></i>'
            : '<i data-lucide="moon"></i>';

    if (
        typeof lucide !== "undefined" &&
        typeof lucide.createIcons === "function"
    ) {

        lucide.createIcons();

    }

}


const savedTheme =
    localStorage.getItem("theme");

if (savedTheme) {

    document.documentElement.setAttribute(
        "data-theme",
        savedTheme
    );

    updateIcon(savedTheme);

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const theme =
                document.documentElement
                    .getAttribute("data-theme");


            if (theme === "light") {

                document.documentElement
                    .removeAttribute("data-theme");

                localStorage.setItem(
                    "theme",
                    "dark"
                );

                updateIcon("dark");

            } else {

                document.documentElement
                    .setAttribute(
                        "data-theme",
                        "light"
                    );

                localStorage.setItem(
                    "theme",
                    "light"
                );

                updateIcon("light");

            }

        }
    );

}


// ============================================================
// LEETCODE ACTIVITY HEATMAP
// ============================================================

const heatmap =
    document.querySelector("#leetcodeHeatmap");

const heatmapMonths =
    document.querySelector("#heatmapMonths");

const activityYear =
    document.querySelector("#activityYear");

const totalSolved =
    document.querySelector("#totalSolved");

const activeDays =
    document.querySelector("#activeDays");

const maxStreak =
    document.querySelector("#maxStreak");

// Add these elements to your HTML for the per-platform /
// combined breakdown (id names are up to you — update the
// selectors below to match):
const gfgSolved =
    document.querySelector("#gfgSolved");

const combinedTotalSolved =
    document.querySelector("#combinedTotalSolved");


const currentYear =
    new Date().getFullYear();


const LEETCODE_API =
    "https://falling-grass-92d4.swapnilbiradar12345.workers.dev/leetcode";

const LEETCODE_USERNAME =
    "swapnilsb_18";

// Worker route added for GFG (see leetcode-worker.js /gfg)
const GFG_API =
    "https://falling-grass-92d4.swapnilbiradar12345.workers.dev/gfg";

const GFG_USERNAME =
    "swapnilsb_18";


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


// ============================================================
// YEAR SELECTOR
// ============================================================

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


// ============================================================
// FETCH LEETCODE DATA
// (returns the full worker payload: submissionCalendar,
// totalActiveDays, streak, totalSolved, etc.)
// ============================================================

async function fetchLeetCodeData(year) {

    const response =
        await fetch(
            `${LEETCODE_API}?username=${LEETCODE_USERNAME}&year=${year}`
        );


    if (!response.ok) {

        throw new Error(
            `HTTP ${response.status}`
        );

    }


    const data =
        await response.json();


    if (
        !data ||
        !data.submissionCalendar
    ) {

        throw new Error(
            "submissionCalendar missing"
        );

    }


    if (
        typeof data.submissionCalendar ===
        "string"
    ) {

        data.submissionCalendar =
            JSON.parse(
                data.submissionCalendar
            );

    }


    return data;

}


// ============================================================
// TIMESTAMP → DATE KEY
// ============================================================

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


// ============================================================
// BUILD ACTIVITY MAP
// ============================================================

function createActivityMap(submissionCalendar) {

    const map = {};

    Object.entries(submissionCalendar).forEach(
        ([timestamp, count]) => {

            const dateKey =
                getDateKey(timestamp);

            map[dateKey] =
                Number(count) || 0;

        }
    );

    return map;

}


// ============================================================
// FORMAT DATE KEY
// ============================================================

function formatDateKey(date) {

    return `${date.getFullYear()}-${String(
        date.getMonth() + 1
    ).padStart(2, "0")}-${String(
        date.getDate()
    ).padStart(2, "0")}`;

}


// ============================================================
// ACTIVITY LEVEL
// ============================================================

function getActivityLevel(count) {

    if (count <= 0) {
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


// ============================================================
// MAX STREAK
// ============================================================

function calculateMaxStreak(activityMap) {

    const dates =
        Object.keys(activityMap)
            .filter(
                date =>
                    activityMap[date] > 0
            )
            .sort();


    if (dates.length === 0) {
        return 0;
    }


    let max = 1;

    let current = 1;


    for (
        let i = 1;
        i < dates.length;
        i++
    ) {

        const previous =
            new Date(
                dates[i - 1] +
                "T00:00:00"
            );

        const date =
            new Date(
                dates[i] +
                "T00:00:00"
            );


        const difference =
            Math.round(
                (
                    date - previous
                ) /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );


        if (difference === 1) {

            current++;

            max =
                Math.max(
                    max,
                    current
                );

        } else {

            current = 1;

        }

    }


    return max;

}


// ============================================================
// ACTIVE DAYS + MAX STREAK FROM AN ACTIVITY MAP
// (NOT used for "problems solved" — submissionCalendar
// counts every submission attempt, not just accepted ones)
// ============================================================

function calculateActivityStats(
    activityMap
) {

    let days = 0;

    Object.values(activityMap)
        .forEach(count => {

            if (count > 0) {
                days++;
            }

        });


    const streak =
        calculateMaxStreak(
            activityMap
        );


    return {
        days,
        streak
    };

}


// ============================================================
// CREATE MONTH HEATMAP
// ============================================================

function createMonthHeatmap(
    year,
    month,
    activityMap
) {

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


    const firstDay =
        new Date(
            year,
            month,
            1
        );


    const lastDay =
        new Date(
            year,
            month + 1,
            0
        );


    const startWeekday =
        firstDay.getDay();


    const daysInMonth =
        lastDay.getDate();


    // Empty cells before first day

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


    // Actual days

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


        const formattedDate =
            date.toLocaleDateString(
                "en-US",
                {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                }
            );


        cell.title =
            count === 0
                ? `No submissions on ${formattedDate}`
                : `${count} submission${
                    count === 1
                        ? ""
                        : "s"
                  } on ${formattedDate}`;


        monthGrid.appendChild(
            cell
        );

    }


    monthContainer.appendChild(
        monthGrid
    );


    return monthContainer;

}


// ============================================================
// RENDER HEATMAP
// ============================================================

function renderHeatmap(
    year,
    activityMap
) {

    if (!heatmap) {
        return;
    }


    heatmap.innerHTML = "";


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


// ============================================================
// LOAD SELECTED YEAR HEATMAP
// ============================================================

async function loadLeetCodeActivity(
    year
) {

    if (!heatmap) {
        return;
    }


    try {

        heatmap.innerHTML = "";


        if (heatmapMonths) {
            heatmapMonths.innerHTML = "";
        }


        const data =
            await fetchLeetCodeData(
                year
            );


        const activityMap =
            createActivityMap(
                data.submissionCalendar
            );


        renderHeatmap(
            year,
            activityMap
        );

    }


    catch (error) {

        console.error(
            "LeetCode heatmap error:",
            error
        );

    }

}


// ============================================================
// FETCH ALL-TIME STATS
// Total Solved -> submitStatsGlobal.acSubmissionNum via the
// worker (lifetime, accepted-only, same value every year so
// only needs to be read once).
// Active Days / Max Streak -> still built by walking back
// across each year's submissionCalendar, since those track
// activity/streaks rather than acceptance.
// ============================================================

async function fetchAllTimeStats() {

    const maxYearsBack = 15;

    let year = currentYear;

    let combinedMap = {};

    let consecutiveEmptyYears = 0;

    let totalSolved = 0;

    let totalSolvedCaptured = false;


    for (
        let i = 0;
        i < maxYearsBack;
        i++
    ) {

        try {

            const data =
                await fetchLeetCodeData(
                    year
                );


            if (!totalSolvedCaptured) {

                totalSolved =
                    Number(
                        data.totalSolved
                    ) || 0;

                totalSolvedCaptured = true;

            }


            const yearMap =
                createActivityMap(
                    data.submissionCalendar
                );


            const hasActivity =
                Object.values(yearMap)
                    .some(
                        count => count > 0
                    );


            combinedMap = {
                ...combinedMap,
                ...yearMap
            };


            consecutiveEmptyYears =
                hasActivity
                    ? 0
                    : consecutiveEmptyYears + 1;

        }


        catch (error) {

            console.warn(
                `Could not fetch LeetCode ${year}`,
                error
            );

            consecutiveEmptyYears++;

        }


        if (
            consecutiveEmptyYears >= 2
        ) {

            break;

        }


        year--;

    }


    const activityStats =
        calculateActivityStats(
            combinedMap
        );


    return {
        totalSolved,
        days: activityStats.days,
        streak: activityStats.streak
    };

}


// ============================================================
// FETCH GFG TOTAL SOLVED
// (proxied through our own worker's /gfg route, which itself
// calls a third-party unofficial GFG stats API. This can fail
// or be unavailable — always treat it as optional and never
// let it block LeetCode stats or the heatmap.)
// ============================================================

async function fetchGfgTotalSolved() {

    try {

        const response =
            await fetch(
                `${GFG_API}?username=${GFG_USERNAME}`
            );

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }

        const data =
            await response.json();

        return Number(data.totalSolved) || 0;

    }

    catch (error) {

        console.warn(
            "GFG stats unavailable:",
            error
        );

        return null; // null = couldn't fetch, not zero solved

    }

}


// ============================================================
// LOAD COMBINED STATS (LeetCode + GFG)
// Combined total only — the heatmap itself stays LeetCode-only
// since GFG has no per-day submission data.
// ============================================================

async function loadCombinedStats(leetcodeTotalSolved) {

    if (gfgSolved) {
        gfgSolved.textContent = "...";
    }

    if (combinedTotalSolved) {
        combinedTotalSolved.textContent = "...";
    }


    const gfgTotal =
        await fetchGfgTotalSolved();


    if (gfgSolved) {

        gfgSolved.textContent =
            gfgTotal === null
                ? "--"
                : gfgTotal.toLocaleString();
    }


    const combined =
        leetcodeTotalSolved +
        (gfgTotal || 0);


    if (combinedTotalSolved) {

        combinedTotalSolved.textContent =
            combined.toLocaleString();
    }

}


// ============================================================
// LOAD ALL-TIME STATS
// ============================================================

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
                stats.totalSolved.toLocaleString();

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
            "LeetCode lifetime stats:",
            stats
        );


        // GFG is independent of LeetCode's health, so this
        // runs even if LeetCode fails — it never throws back
        // into this try block.
        loadCombinedStats(
            stats.totalSolved
        );

    }


    catch (error) {

        console.error(
            "LeetCode stats error:",
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

        // LeetCode failed, but GFG's combined total can still
        // show using 0 as the LeetCode contribution.
        loadCombinedStats(0);

    }

}


// ============================================================
// INITIAL LOAD
// ============================================================

loadLeetCodeActivity(
    currentYear
);

loadAllTimeStats();


// ============================================================
// YEAR CHANGE
// ============================================================

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


// ============================================================
// FINAL SAFETY LOG
// ============================================================

console.log(
    "Portfolio JavaScript loaded successfully."
);