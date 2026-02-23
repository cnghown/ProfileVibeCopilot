# 🎮 ProfileVibeCopilot

> A unique developer portfolio with a console debug aesthetic

A modern, interactive developer portfolio website built with vanilla HTML, CSS, and JavaScript. Features a console-styled interface with gradient effects, code block syntax highlighting, and fully responsive design.

## ✨ Features

- **Console Debug Aesthetic** - Styled like a browser console with error messages and debug output
- **Multi-color Gradient Name** - Animated gradient text effect on hover
- **Code Blocks** - Syntax-highlighted code examples in multiple languages
- **Interactive Navigation** - Tab-based section switching (About, Skills, Projects, My Job, Contact)
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Music Player** - Optional background music with notification system
- **My Job Section** - Showcase of custom projects (Web Game, NRO Game, Zalo Bot)
- **QR Code Bank Transfer** - Easy payment integration
- **Social Links** - GitHub, Facebook, Email, and Phone contact options

## 📋 Sections

### About
Personal introduction and developer information across multiple programming languages (TypeScript, PHP, Python, Java, Go, Ruby)

### Skills
Programming languages, frameworks, and tools used

### Projects
GitHub projects showcase with interactive cards

### My Job
Custom creations and services showcase:
- 🎮 **Web Game** - PHP-based auto bank system
- 🎮 **Game NRO** - Java-based game with custom features
- 🤖 **Zalo Bot** - Node.js bot with anti-spam and entertainment features

### Contact
Direct contact information with:
- Email: hoandeptrai61@gmail.com
- GitHub: github.com/cnghown
- Facebook: Bui Cong Hoan
- Phone: +84 395134812
- Bank Transfer QR Code

## 🚀 Quick Start

### Clone the Repository
```bash
git clone https://github.com/cnghown/ProfileVibeCopilot.git
cd ProfileVibeCopilot
```

### Open in Browser
Simply open `index.html` in your web browser or serve it with a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server
```

Then visit: `http://localhost:8000`

## 📁 Project Structure

```
ProfileVibeCopilot/
├── index.html          # Main HTML file
├── style.css           # Complete styling
├── script.js           # Interactive functionality
├── README.md           # This file
└── assets/
    ├── img/
    │   ├── hoandz.jpg          # Profile avatar
    │   ├── mong-vuot-rong.png  # Avatar decoration
    │   ├── tick.png            # Verified badge
    │   ├── web.png             # Web Game screenshot
    │   ├── nro.png             # Game NRO screenshot
    │   ├── botzalo.png         # Zalo Bot screenshot
    │   ├── qrbank.jpg          # Bank transfer QR code
    │   └── logonhac.gif        # Music notification logo
    └── nhac/                   # Music files directory
```

## 🎨 Design Features

### Color Scheme
- **Primary Background**: `#0a0e27` (Dark Navy)
- **Code Background**: `#0f1419` (Darker Black)
- **Accent Purple**: `#a855f7`
- **Accent Cyan**: `#06b6d4`
- **Accent Green**: `#22c55e`
- **Accent Yellow**: `#facc15`
- **Error Red**: `#ef4444`

### Typography
- **Font Family**: Fira Code (Monospace)
- **Highlighting**: Highlight.js for code syntax
- **Icons**: Font Awesome 6.5.0

### Responsive Breakpoints
- **Desktop**: Default (max-width: 1000px container)
- **Tablet**: `@media (max-width: 768px)`
- **Mobile**: `@media (max-width: 480px)`

## 🔧 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, Animations, Gradients
- **JavaScript (Vanilla)** - No frameworks, pure DOM manipulation
- **Highlight.js** - Code syntax highlighting
- **Font Awesome** - Icon library
- **Google Fonts** - Fira Code typeface

## 📱 Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

## ⚙️ Customization

### Change Your Information
Edit the HTML in `index.html`:
- Replace name: "Bùi Công Hoan" → Your name
- Update email: hoandeptrai61@gmail.com → Your email
- Change links: GitHub, Facebook, Phone URLs

### Modify Colors
Edit CSS variables in `style.css` (Lines 1-16):
```css
:root {
    --primary-bg: #0a0e27;
    --accent-purple: #a855f7;
    /* ... more variables */
}
```

### Add Your Own Projects
Add code blocks in the `#projects` section with your GitHub projects

### Update Avatar
Replace `/assets/img/hoandz.jpg` with your own profile image

## 🎵 Music Feature

The portfolio includes an optional music player:
- Click "Có" (Yes) on the notification to enable music
- Click "Không" (No) to disable
- Music player uses HTML5 audio element
- Note: Mobile hides the player to save space

## 📊 GitHub Links

- **Profile**: https://github.com/cnghown
- **This Repository**: https://github.com/cnghown/ProfileVibeCopilot

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Bùi Công Hoan**
- Email: hoandeptrai61@gmail.com
- GitHub: [@cnghown](https://github.com/cnghown)
- Facebook: [Bui Cong Hoan](https://www.facebook.com/conghoan61/)

---

Made with ❤️ and ☕ | Backend Developer • Vibe Coding
