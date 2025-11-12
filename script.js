// Function to show a specific section and hide others
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    const home = document.getElementById('home');
    const learnMoreBtn = document.getElementById('learnMoreBtn');

    if (sectionId === 'home') {
        // Show home at full height
        home.style.height = '100vh';
        learnMoreBtn.style.display = 'inline-block';
        // Hide all other sections
        sections.forEach(section => {
            if (section.id !== 'home') section.style.display = 'none';
        });
    } else {
        // Keep home visible but shortened
        home.style.height = '50vh';
        learnMoreBtn.style.display = 'none';
        // Show the target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
        // Hide other non-home sections
        sections.forEach(section => {
            if (section.id !== 'home' && section.id !== sectionId) section.style.display = 'none';
        });
    }
}



// Event listeners for navbar links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1); // Remove the '#'
        showSection(targetId);
    });
});



// Global variable to store current user
let currentUser = null;

// Hardcoded user data for demo (since fetch may not work locally)
const users = [
    { email: 'admin@choir.org', password: 'password', name: 'Admin User' },
    { email: 'user@example.com', password: 'pass123', name: 'Example User' }
];

// Form validation and submission for login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (email && password) {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            currentUser = user;
            updateLoginButton();
            toggleLoginMenu();
            this.reset();
        } else {
            alert('Invalid email or password.');
        }
    } else {
        alert('Please fill in all fields.');
    }
});

// Update login button to user picture when logged in
function updateLoginButton() {
    const loginIcon = document.getElementById('loginIcon');
    if (currentUser) {
        loginIcon.innerHTML = '<img src="assets/user-picture.jpg" alt="User" style="width: 30px; height: 30px; border-radius: 50%;">'; // User picture
        loginIcon.onclick = toggleUserMenu;
    } else {
        loginIcon.innerHTML = 'Login';
        loginIcon.onclick = toggleLoginMenu;
    }
}

// Toggle user menu
function toggleUserMenu() {
    const menu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');

    if (currentUser) {
        userName.textContent = `Name: ${currentUser.name || 'N/A'}`;
        userEmail.textContent = `Email: ${currentUser.email}`;
    }

    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Logout function
function logout() {
    currentUser = null;
    updateLoginButton();
    toggleUserMenu();
}

// Experience slider event listener
document.getElementById('experience').addEventListener('input', function() {
    document.getElementById('experienceValue').textContent = this.value;
});

// Terms checkbox event listener
document.getElementById('terms').addEventListener('change', function() {
    if (this.checked) {
        alert('You have agreed to the Terms and Conditions.');
    }
});

// Initialize registration count from localStorage
let registrationCount = parseInt(localStorage.getItem('registrationCount')) || 0;
document.getElementById('registrationCount').textContent = registrationCount;
updateProgressBar();

// Function to update progress bar
function updateProgressBar() {
    const progress = (registrationCount / 100) * 100;
    document.getElementById('registrationProgress').style.width = progress + '%';
    document.getElementById('registrationProgress').setAttribute('aria-valuenow', progress);
}

// Form validation and submission for registration
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const dob = document.getElementById('dob').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const experience = document.getElementById('experience').value;
    const address = document.getElementById('address').value;
    const voice = document.getElementById('voice').value;
    const terms = document.getElementById('terms').checked;

    // Basic validation
    if (!name || !email || !phone || !dob || !gender || !experience || !address || !voice || !terms) {
        alert('Please fill in all required fields.');
        return;
    }

    // Confirmation dialog
    const confirmed = confirm('Are you sure you want to register?');
    if (confirmed) {
        registrationCount++;
        localStorage.setItem('registrationCount', registrationCount);
        document.getElementById('registrationCount').textContent = registrationCount;
        updateProgressBar();
        alert(`Thanks, ${name}! Registration successful! We will contact you soon.`);
        this.reset();
        document.getElementById('experienceValue').textContent = '1';
    }
});

// Form validation and submission for contact
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        alert('Message sent successfully!');
        this.reset();
    } else {
        alert('Please fill in all fields.');
    }
});





// Login menu functionality
function toggleLoginMenu() {
    const menu = document.getElementById('loginMenu');
    const overlay = document.getElementById('loginOverlay');
    menu.classList.toggle('show');
    overlay.classList.toggle('show');
}

// Close menus when clicking outside
document.addEventListener('click', function(event) {
    const loginMenu = document.getElementById('loginMenu');
    const userMenu = document.getElementById('userMenu');
    const loginIcon = document.getElementById('loginIcon');

    if (!loginMenu.contains(event.target) && !loginIcon.contains(event.target)) {
        loginMenu.style.display = 'none';
    }

    if (!userMenu.contains(event.target) && !loginIcon.contains(event.target)) {
        userMenu.style.display = 'none';
    }
});



// Alumni sorting functionality
function sortAlumni() {
    const sortBy = document.getElementById('sortSelect').value;
    const table = document.getElementById('alumniTable');
    const rows = Array.from(table.rows);

    rows.sort((a, b) => {
        let aVal, bVal;
        switch (sortBy) {
            case 'name':
                aVal = a.cells[0].textContent.toLowerCase();
                bVal = b.cells[0].textContent.toLowerCase();
                break;
            case 'section':
                aVal = a.cells[1].textContent.toLowerCase();
                bVal = b.cells[1].textContent.toLowerCase();
                break;
            case 'enterYear':
                aVal = parseInt(a.cells[2].textContent.split('-')[0]);
                bVal = parseInt(b.cells[2].textContent.split('-')[0]);
                break;
            case 'exitYear':
                aVal = parseInt(a.cells[2].textContent.split('-')[1]);
                bVal = parseInt(b.cells[2].textContent.split('-')[1]);
                break;
        }
        if (aVal < bVal) return -1;
        if (aVal > bVal) return 1;
        return 0;
    });

    rows.forEach(row => table.appendChild(row));
}

// ========== Sidebar Toggle ==========
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');
}

// Close sidebar when overlay clicked
document.body.insertAdjacentHTML('beforeend', '<div id="sidebarOverlay"></div>');
document.getElementById('sidebarOverlay').addEventListener('click', toggleSidebar);

// ========== Duplicate Navbar Links to Sidebar ==========
window.addEventListener('DOMContentLoaded', () => {
    const navbarLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sidebarNav = document.getElementById('sidebarNav');
    navbarLinks.forEach(link => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        const a = document.createElement('a');
        a.className = 'nav-link';
        a.href = link.getAttribute('href');
        a.textContent = link.textContent;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = a.getAttribute('href').substring(1);
            showSection(targetId);
            toggleSidebar();
        });
        li.appendChild(a);
        sidebarNav.appendChild(li);
    });
});

// ========== Section Fade-In Animation on Scroll ==========
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

sections.forEach(section => observer.observe(section));



// Initialize home section with full height on page load
document.addEventListener('DOMContentLoaded', function() {
    const home = document.getElementById('home');
    home.classList.add('full');
});


