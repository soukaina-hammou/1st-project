// Array of all input types to generate cards dynamically
const inputTypes = [
    { type: 'email', desc: 'Validates formatting to ensure a proper email address structure.', cat: 'Data' },
    { type: 'number', desc: 'Restricts input to numeric values; supports min/max and steps.', cat: 'Data' },
    { type: 'tel', desc: 'Used for telephone numbers; triggers numeric keypad on mobile.', cat: 'Data' },
    { type: 'url', desc: 'Automatically validates that the entry is a properly formatted URL.', cat: 'Data' },
    { type: 'date', desc: 'Opens a native date picker calendar.', cat: 'Date/Time' },
    { type: 'range', desc: 'A slider control for selecting a value from a range.', cat: 'UI' },
    { type: 'color', desc: 'A color picker interface to select hexadecimal colors.', cat: 'UI' },
    { type: 'file', desc: 'Allows the user to select one or more files from their device.', cat: 'Misc' },
    { type: 'checkbox', desc: 'A toggle box for selecting one or multiple independent options.', cat: 'Selection' },
    { type: 'radio', desc: 'Used for selecting exactly one option from a predefined set.', cat: 'Selection' },
];

const grid = document.getElementById('input-grid');
const searchInput = document.getElementById('input-search');

// Initialize the app
function init() {
    renderCards(inputTypes);
    setupTheme();
}

// Render Input Cards
function renderCards(data) {
    data.forEach(item => {
        const card = document.createElement('article');
        card.className = 'card';
        card.setAttribute('data-title', item.type);
        
        card.innerHTML = `
            <div class="card-header">
                <code>type="${item.type}"</code>
                <span class="badge">${item.cat}</span>
            </div>
            <p class="description">${item.desc}</p>
            <div class="preview">
                <label for="ex-${item.type}">Sample ${item.type.charAt(0).toUpperCase() + item.type.slice(1)}</label>
                <input type="${item.type}" id="ex-${item.type}" class="demo-input">
                <div class="value-display">Value: <span class="val">None</span></div>
            </div>
            <div class="code-box">
                <pre><code>&lt;input type="${item.type}"&gt;</code></pre>
                <button class="copy-btn" onclick="copyCode(this)"><i class="far fa-copy"></i></button>
            </div>
        `;
        grid.appendChild(card);
    });

    attachInputListeners();
}

// Live Value Display
function attachInputListeners() {
    const inputs = document.querySelectorAll('.demo-input');
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const display = e.target.nextElementSibling.querySelector('.val');
            display.textContent = e.target.value || 'Empty';
        });
    });
}

// Search Filter Logic
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        card.style.display = title.includes(term) ? 'flex' : 'none';
    });
});

// Copy Code Functionality
function copyCode(btn) {
    const code = btn.previousElementSibling.innerText;
    navigator.clipboard.writeText(code);
    
    const icon = btn.querySelector('i');
    icon.className = 'fas fa-check';
    btn.style.color = '#10b981';
    
    setTimeout(() => {
        icon.className = 'far fa-copy';
        btn.style.color = '';
    }, 2000);
}

// Dark Mode Toggle
function setupTheme() {
    const toggle = document.getElementById('theme-toggle');
    toggle.addEventListener('click', () => {
        const isDark = document.body.hasAttribute('data-theme');
        if (isDark) {
            document.body.removeAttribute('data-theme');
            toggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            toggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
}

// Form Submission Simulation
document.getElementById('master-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Form submitted successfully! Check the console for data.');
    const formData = new FormData(e.target);
    console.log(Object.fromEntries(formData));
});

init();