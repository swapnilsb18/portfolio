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

// Per-platform / combined breakdown elements
const gfgSolved =
    document.querySelector("#gfgSolved");

const codestudioSolved =
    document.querySelector("#codestudioSolved");

const combinedTotalSolved =
    document.querySelector("#combinedTotalSolved");


const currentYear =
    new Date().getFullYear();

// Holds the currently-displayed year's LeetCode activity map,
// and CodeStudio's/GFG's full-history activity maps (all
// date -> count). Combined here rather than on the backend
// since they load at different times and the LeetCode one
// changes with the year dropdown.
let leetcodeActivityMap = {};
let leetcodeFullHistoryMap = {};
let codestudioActivityMap = {};
let gfgActivityMap = {};


const LEETCODE_API =
    "https://falling-grass-92d4.swapnilbiradar12345.workers.dev/leetcode";

const LEETCODE_USERNAME =
    "swapnilsb_18";

const GFG_API =
    "https://falling-grass-92d4.swapnilbiradar12345.workers.dev/gfg";

const GFG_USERNAME =
    "swapnilsb_18";

const CODESTUDIO_API =
    "https://falling-grass-92d4.swapnilbiradar12345.workers.dev/codestudio";

const CODESTUDIO_UUID =
    "cde00eb3-20be-41c2-b47c-569cc3f4e925";

// How far back to pull CodeStudio history from. Adjust to
// whenever you joined Code360 — pulling too wide a range just
// means more pages for the worker to walk.
const CODESTUDIO_START_DATE =
    "2022-01-01T00:00:00Z";


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
// MERGE ACTIVITY MAPS
// Sums counts for any date present in more than one map. Used
// to combine LeetCode's per-year map with CodeStudio's
// full-history map into one heatmap.
// ============================================================

function mergeActivityMaps(...maps) {

    const merged = {};

    maps.forEach(map => {

        Object.entries(map).forEach(
            ([date, count]) => {

                merged[date] =
                    (merged[date] || 0) + count;

            }
        );

    });

    return merged;

}


// ============================================================
// FILTER ACTIVITY MAP TO A SINGLE YEAR
// ============================================================

function filterActivityMapToYear(activityMap, year) {

    const filtered = {};

    const prefix = `${year}-`;

    Object.entries(activityMap).forEach(
        ([date, count]) => {

            if (date.startsWith(prefix)) {
                filtered[date] = count;
            }

        }
    );

    return filtered;

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
// (targetContainer defaults to the LeetCode heatmap element so
// existing calls don't need to change; pass a different
// container — e.g. codestudioHeatmap — to render elsewhere.)
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

    const today =
        new Date();

    today.setHours(
        0, 0, 0, 0
    );

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


        // Future date — render blank, not a dot

        if (date > today) {

            const empty =
                document.createElement("div");

            empty.className =
                "heatmap-day heatmap-empty";

            monthGrid.appendChild(
                empty
            );

            continue;

        }


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
// (targetContainer defaults to the LeetCode heatmap element so
// existing calls don't need to change.)
// ============================================================

function renderHeatmap(
    year,
    activityMap,
    targetContainer = heatmap
) {

    if (!targetContainer) {
        return;
    }


    targetContainer.innerHTML = "";


    const today =
        new Date();

    today.setHours(
        0, 0, 0, 0
    );


    for (
        let month = 0;
        month < 12;
        month++
    ) {

        const firstDayOfMonth =
            new Date(
                year,
                month,
                1
            );


        // Skip months that haven't started yet at all
        if (firstDayOfMonth > today) {
            continue;
        }


        const monthBlock =
            createMonthHeatmap(
                year,
                month,
                activityMap
            );


        targetContainer.appendChild(
            monthBlock
        );

    }

}


// ============================================================
// RENDER COMBINED HEATMAP FOR A YEAR
// Merges the stored LeetCode map (for the given year) with
// CodeStudio's and GFG's maps, both filtered down to that year,
// then renders into the LeetCode heatmap container. Safe to
// call before any source has loaded — a missing one just
// contributes nothing yet, no error.
// ============================================================

function renderCombinedHeatmapForYear(year) {

    if (!heatmap) {
        return;
    }

    const codestudioForYear =
        filterActivityMapToYear(
            codestudioActivityMap,
            year
        );

    const gfgForYear =
        filterActivityMapToYear(
            gfgActivityMap,
            year
        );

    const combinedMap =
        mergeActivityMaps(
            leetcodeActivityMap,
            codestudioForYear,
            gfgForYear
        );

    renderHeatmap(
        year,
        combinedMap,
        heatmap
    );

}


// ============================================================
// LOAD SELECTED YEAR HEATMAP (LeetCode)
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


        leetcodeActivityMap =
            createActivityMap(
                data.submissionCalendar
            );


        renderCombinedHeatmapForYear(
            year
        );

    }


    catch (error) {

        console.error(
            "LeetCode heatmap error:",
            error
        );

        leetcodeActivityMap = {};

        renderCombinedHeatmapForYear(
            year
        );

    }

}


// ============================================================
// FETCH ALL-TIME STATS (LeetCode)
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
        streak: activityStats.streak,
        activityMap: combinedMap
    };

}


// ============================================================
// FETCH GFG STATS
// (proxied through our own worker's /gfg route, which now calls
// GeeksforGeeks' own practiceapi directly — returns an exact
// lifetime total plus a submissionCalendar built from real
// per-problem timestamps. Still treated as optional/best-effort
// so a GFG outage never blocks LeetCode stats or the heatmap.)
// ============================================================

async function fetchGfgStats() {

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

        return {
            totalSolved: Number(data.totalSolved) || 0,
            submissionCalendar: data.submissionCalendar || {}
        };

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
// FETCH CODESTUDIO STATS (Code360 by Coding Ninjas)
// Proxied through our own worker's /codestudio route, which
// walks Code360's public "contributions" endpoint across all
// pages in the given date range and returns a totalSolved
// count plus a submissionCalendar shaped like LeetCode's.
// Optional and best-effort — a Code360 outage or API change
// should never block LeetCode/GFG stats or the heatmap.
// ============================================================

async function fetchCodeStudioStats() {

    try {

        const endDate =
            new Date().toISOString();

        const response =
            await fetch(
                `${CODESTUDIO_API}?uuid=${CODESTUDIO_UUID}` +
                `&start_date=${encodeURIComponent(CODESTUDIO_START_DATE)}` +
                `&end_date=${encodeURIComponent(endDate)}`
            );

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }

        const data =
            await response.json();

        return {
            totalSolved: Number(data.totalSolved) || 0,
            submissionCalendar: data.submissionCalendar || {}
        };

    }

    catch (error) {

        console.warn(
            "CodeStudio stats unavailable:",
            error
        );

        return null; // null = couldn't fetch, not zero solved

    }

}


// ============================================================
// LOAD COMBINED STATS (LeetCode + GFG + CodeStudio)
// GFG and CodeStudio each contribute a total and a per-day map,
// both merged into the LeetCode heatmap via
// renderCombinedHeatmapForYear, and also folded into Active
// Days / Max Streak so those match the combined heatmap
// instead of staying LeetCode-only.
// ============================================================

async function loadCombinedStats(leetcodeTotalSolved) {

    if (gfgSolved) {
        gfgSolved.textContent = "...";
    }

    if (codestudioSolved) {
        codestudioSolved.textContent = "...";
    }

    if (combinedTotalSolved) {
        combinedTotalSolved.textContent = "...";
    }


    const [gfgStats, codestudioStats] =
        await Promise.all([
            fetchGfgStats(),
            fetchCodeStudioStats()
        ]);


    if (gfgSolved) {

        gfgSolved.textContent =
            gfgStats === null
                ? "--"
                : gfgStats.totalSolved.toLocaleString();
    }


    if (codestudioSolved) {

        codestudioSolved.textContent =
            codestudioStats === null
                ? "--"
                : codestudioStats.totalSolved.toLocaleString();
    }


    if (gfgStats) {

        gfgActivityMap =
            gfgStats.submissionCalendar;

    }

    if (codestudioStats) {

        codestudioActivityMap =
            codestudioStats.submissionCalendar;

    }

    if (gfgStats || codestudioStats) {

        const selectedYear =
            activityYear
                ? Number(activityYear.value)
                : currentYear;

        renderCombinedHeatmapForYear(
            selectedYear
        );


        // Recompute Active Days / Max Streak across the full
        // combined history (LeetCode + CodeStudio + GFG) so
        // these stats match what the heatmap now shows, rather
        // than staying LeetCode-only.
        const combinedFullHistory =
            mergeActivityMaps(
                leetcodeFullHistoryMap,
                codestudioActivityMap,
                gfgActivityMap
            );

        const combinedActivityStats =
            calculateActivityStats(
                combinedFullHistory
            );

        if (activeDays) {

            activeDays.textContent =
                combinedActivityStats.days.toLocaleString();

        }

        if (maxStreak) {

            maxStreak.textContent =
                combinedActivityStats.streak;

        }

    }


    const combined =
        leetcodeTotalSolved +
        (gfgStats?.totalSolved || 0) +
        (codestudioStats?.totalSolved || 0);


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


        leetcodeFullHistoryMap =
            stats.activityMap;


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


        // GFG and CodeStudio are independent of LeetCode's
        // health, so this runs even if LeetCode fails — it
        // never throws back into this try block.
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

        // LeetCode failed, but GFG/CodeStudio's combined total
        // can still show using 0 as the LeetCode contribution.
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