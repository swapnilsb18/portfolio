# Swapnil Biradar — Personal Portfolio

A modern, responsive personal portfolio website showcasing my skills, projects, problem-solving activity, and contact information.

The portfolio is designed to give recruiters and visitors a quick overview of who I am, what I build, and how I approach development.

## 🌐 Live Portfolio

**Portfolio:** [https://swapnilsb18.github.io/portfolio/]

---

## ✨ Features

### 👨‍💻 Hero Section

* Personal introduction
* Developer tagline with typing animation
* Short professional description
* Call-to-action buttons
* Download/view resume option
* Responsive profile image

### 🧑‍💼 About Section

* Personal introduction
* Background and development interests
* Clean recruiter-friendly presentation

### 🛠️ Skills Section

* Technologies and tools
* Organized skill categories
* Responsive layout
* Interactive visual presentation

### 🚀 Projects Section

* Featured development projects
* Project descriptions
* Technologies used
* Links to project repositories/live demos

### 📊 LeetCode Activity

The portfolio includes a dynamic LeetCode activity heatmap.

Features include:

* Year-based activity selection
* Daily submission heatmap
* Monthly activity organization
* Submission intensity levels
* Total problems solved
* Total active days
* Maximum solving streak
* Hover information for individual days
* Responsive layout

LeetCode activity is retrieved through a Cloudflare Worker rather than exposing external API logic directly in the frontend.

### 📬 Contact Form

The contact section contains a fully functional contact system.

Visitors can submit:

* Name
* Email
* Message

The submission flow is:

```text
Portfolio Contact Form
        ↓
Cloudflare Worker
        ↓
Resend
        ↓
Email Inbox
```

The form includes:

* Client-side validation
* Email validation
* Loading state
* Success state
* Error handling
* Automatic form reset
* Visitor email used as Reply-To
* No email API credentials exposed in frontend JavaScript

### 🌙 Dark / Light Theme

The portfolio supports theme switching with:

* Dark mode
* Light mode
* Persistent theme preference
* Dynamic theme icon
* CSS variables for consistent theming

### 📱 Responsive Design

The website is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

Responsive behavior includes:

* Mobile navigation
* Hamburger menu
* Responsive hero section
* Responsive profile image
* Mobile-friendly forms
* Responsive project and skill layouts
* Adaptive LeetCode heatmap

---

## 🧰 Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* CSS Variables
* Responsive Design
* DOM Manipulation
* Fetch API

### APIs & Backend Services

* Cloudflare Workers
* Resend
* LeetCode activity data

### UI

* Lucide Icons
* CSS animations
* Hover interactions
* Theme switching
* Responsive layouts

---

## 📁 Project Structure

```text
portfolio/
│
├── assets/
│   ├── images/
│   │   └── avatar.png
│   │
│   └── resume/
│       └── resume.pdf
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
└── README.md
```

> Update the structure above if your actual repository uses different filenames or folders.

---

## ⚙️ How It Works

### LeetCode Activity

The frontend requests LeetCode activity data through a Cloudflare Worker.

The Worker acts as the backend layer so the portfolio does not have to directly depend on the external endpoint.

The frontend then:

1. Requests activity data.
2. Parses the submission calendar.
3. Converts timestamps into dates.
4. Builds an activity map.
5. Generates the heatmap dynamically.
6. Calculates activity statistics.
7. Updates the UI.

---

### Contact System

The contact form sends visitor information to the Cloudflare Worker.

Example payload:

```json
{
  "name": "Visitor Name",
  "email": "visitor@example.com",
  "message": "Hello, I would like to connect."
}
```

The Worker processes the request and sends the email through Resend.

This keeps the email service credentials on the backend instead of exposing them in the browser.

---

## 🔐 Security Considerations

The project intentionally keeps sensitive email-service credentials outside the frontend.

The Resend API key is stored in the Cloudflare Worker environment rather than inside:

* HTML
* CSS
* JavaScript
* GitHub repository

The frontend only communicates with the public Worker endpoint.

For production deployment, the Worker should also be configured to accept requests only from the portfolio's domain and should have appropriate abuse/rate-limiting protection.

---

## 🎨 Design Goals

The portfolio focuses on:

* Minimal visual clutter
* Strong typography
* Clear hierarchy
* Responsive layouts
* Subtle animations
* Recruiter-friendly navigation
* Fast access to projects and skills
* Professional dark/light themes

The goal is not simply to display information, but to demonstrate practical frontend development through the portfolio itself.

---

## 🚀 Running Locally

Clone the repository:

```bash
git clone https://github.com/swapnilsb18/portfolio
```

Navigate into the project:

```bash
cd portfolio
```

Then open the project using a local development server.

For example, with VS Code:

```text
Right click index.html
→ Open with Live Server
```

---

## 📌 Deployment

The frontend can be deployed using services such as:

* GitHub Pages
* Cloudflare Pages
* Netlify
* Vercel

The Cloudflare Worker is deployed separately and handles backend functionality such as:

* LeetCode data retrieval
* Contact form processing

---

## 📈 Future Improvements

Potential future improvements include:

* Project filtering by technology
* GitHub repository activity
* GitHub contribution visualization
* Blog/articles section
* More detailed project case studies
* Contact-form spam protection
* Analytics
* Accessibility improvements
* Performance optimization
* Automated deployment with CI/CD

---

## 📬 Contact

If you'd like to discuss a project, collaboration, internship, or development opportunity, you can contact me through the portfolio's contact section.

**Portfolio:** [https://swapnilsb18.github.io/portfolio/]

**GitHub:** [https://github.com/swapnilsb18]

**LinkedIn:** [www.linkedin.com/in/swapnil-biradar-025981257]

**Email:** [swapnilsbofficial@gmail.com]

---

## ⭐ About This Project

This portfolio is itself a demonstration of my development skills.

Instead of using a static template alone, the project includes dynamic functionality such as API integration, a custom LeetCode activity visualization, theme persistence, responsive navigation, and a serverless contact system.

---

## 📄 License

This project is primarily intended as a personal portfolio.

The source code may be referenced for learning and inspiration, but personal content, images, resume files, and branding should not be reused without permission.

---

**Built with HTML, CSS, JavaScript, Cloudflare Workers, and Resend.**
