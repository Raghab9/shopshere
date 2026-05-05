console.log("Bhai, JavaScript sahi se connect ho gayi hai!");


document.addEventListener('DOMContentLoaded', () => {
    console.log("ShopSphere JS Loaded!");

   
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
            link.style.borderBottom = "2px solid #ff4757"; 
            link.style.color = "#ff4757";
        }
    });

    
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            const searchInput = searchForm.querySelector('input[name="q"]');
            if (searchInput.value.trim() === "") {
                e.preventDefault();
                searchInput.style.border = "2px solid red";
                alert("search something you need");
            }
        });
    }

    const actionButtons = document.querySelectorAll('.nav-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('mouseover', () => {
            btn.style.transform = "scale(1.05)";
            btn.style.transition = "0.3s";
        });
        btn.addEventListener('mouseout', () => {
            btn.style.transform = "scale(1)";
        });
    });

    const logoutLink = document.querySelector('a[href*="logout"]');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            const confirmLogout = confirm("are sure to log out");
            if (!confirmLogout) {
                e.preventDefault();
            }
        });
    }
});





// --- Footer Logic ---

const topBtn = document.querySelector('.top-btn');

if (topBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            topBtn.style.display = "block";
            topBtn.style.opacity = "1";
        } else {
            topBtn.style.opacity = "0";
            setTimeout(() => {
                if (window.scrollY <= 300) topBtn.style.display = "none";
            }, 300);
        }
    });

    // Smooth Scroll effect
    topBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


const footerBottom = document.querySelector('.footer-bottom p');
if (footerBottom) {
    const currentYear = new Date().getFullYear();
    footerBottom.innerHTML = `&copy; ${currentYear} shopshere. All Rights Reserved.`;
}

const footerLinks = document.querySelectorAll('.footer-section.links ul li a');
footerLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.paddingLeft = "10px";
        link.style.transition = "0.3s all ease";
        link.style.color = "#ff4757";
    });
    link.addEventListener('mouseleave', () => {
        link.style.paddingLeft = "0px";
        link.style.color = "inherit";
    });
});


// --- Home Page Dynamic Logic ---

const scrollWrapper = document.querySelector('.scroll-wrapper');
if (scrollWrapper) {
    scrollWrapper.addEventListener('mouseenter', () => {
        scrollWrapper.style.animationPlayState = 'paused';
    });
    scrollWrapper.addEventListener('mouseleave', () => {
        scrollWrapper.style.animationPlayState = 'running';
    });
}

const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const img = card.querySelector('.product-image img');
        if (img) img.style.transform = 'scale(1.1)'; 
        card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
    });

    card.addEventListener('mouseleave', () => {
        const img = card.querySelector('.product-image img');
        if (img) img.style.transform = 'scale(1)';
        card.style.boxShadow = 'none';
    });
});

const catButtons = document.querySelectorAll('.cat-btn');
catButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        catButtons.forEach(b => b.classList.remove('active-cat'));
        this.classList.add('active-cat');
    });
});


const productGrid = document.querySelector('.product-grid');
if (productGrid) {
    productGrid.style.opacity = '0';
    productGrid.style.transition = 'opacity 0.8s ease-in-out';
    
    setTimeout(() => {
        productGrid.style.opacity = '1';
    }, 100);
}


const addButtons = document.querySelectorAll('.add-btn');
addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {

        console.log("Adding to cart...");
        const originalText = btn.innerText;
        btn.innerText = "Adding...";
        setTimeout(() => {
            btn.innerText = originalText;
        }, 1000);
    });
});




// --- Cart Page Logic ---

// 1. Remove Item Confirmation
const removeLinks = document.querySelectorAll('.remove-link');
removeLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const productName = this.closest('tr').querySelector('.product-name-cell').innerText;
        const confirmDelete = confirm(`Bhai, kya aap "${productName}" ko cart se hatana chahte ho?`);
        
        if (!confirmDelete) {
            e.preventDefault(); // Stop the link from redirecting
        } else {
            this.closest('tr').style.transition = '0.3s';
            this.closest('tr').style.opacity = '0.5';
            this.closest('tr').style.backgroundColor = '#ffe0e0';
        }
    });
});

// 2. Checkout Button Animation
const checkoutBtn = document.querySelector('.checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        this.innerHTML = "Processing...";
        this.style.backgroundColor = "#2ed573"; // Green color on click
    });
}

// 3. Table Row Hover Highlight
const cartRows = document.querySelectorAll('.cart-table tbody tr');
cartRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
        row.style.backgroundColor = '#f9f9f9';
        row.style.transform = 'scale(1.01)';
        row.style.transition = '0.2s';
    });
    row.addEventListener('mouseleave', () => {
        row.style.backgroundColor = 'transparent';
        row.style.transform = 'scale(1)';
    });
});

// 4. Quantity Button Feedback
const qtyBtns = document.querySelectorAll('.qty-btn');
qtyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 100);
    });
});


// --- Checkout Page Logic ---

const checkoutForm = document.querySelector('.checkout-container form');

if (checkoutForm) {
    const pincodeInput = checkoutForm.querySelector('input[name="pincode"]');
    const phoneInput = checkoutForm.querySelector('input[name="phone"]');
    const submitBtn = checkoutForm.querySelector('button[type="submit"]');

    // 1. Pincode Validation ( 6 digits allowed)
    pincodeInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, ''); 
        if (this.value.length > 6) {
            this.value = this.value.slice(0, 6);
        }
    });

    // 2. Phone Number Validation ( 10 digits allowed)
    phoneInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10);
        }
    });

    // 3. Form Submission Animation
    checkoutForm.addEventListener('submit', function(e) {
        // Validation check before submit
        if (phoneInput.value.length !== 10) {
            e.preventDefault();
            alert("Bhai, valid 10-digit phone number daalo!");
            phoneInput.focus();
            return;
        }

        if (pincodeInput.value.length !== 6) {
            e.preventDefault();
            alert("Pincode 6 digits ka hona chahiye!");
            pincodeInput.focus();
            return;
        }

        // Button state change
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Placing Order...';
        submitBtn.style.opacity = "0.7";
        submitBtn.style.pointerEvents = "none";
    });

    // 4. Input Focus Effects
    const inputs = checkoutForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.borderColor = "#28a745";
            input.style.boxShadow = "0 0 5px rgba(40, 167, 69, 0.5)";
            input.style.transition = "0.3s";
        });
        input.addEventListener('blur', () => {
            input.style.borderColor = "#ddd";
            input.style.boxShadow = "none";
        });
    });
}

// --- Know Us (About) Page Logic ---

const infoPage = document.querySelector('.info-page-wrapper');

if (infoPage) {

    const missionBoxes = document.querySelectorAll('.m-box');
    
    const revealBoxes = () => {
        missionBoxes.forEach(box => {
            const boxTop = box.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight - 100;
            
            if (boxTop < triggerPoint) {
                box.style.opacity = "1";
                box.style.transform = "translateY(0)";
                box.style.transition = "all 0.6s ease-out";
            }
        });
    };


    missionBoxes.forEach(box => {
        box.style.opacity = "0";
        box.style.transform = "translateY(30px)";
    });

    window.addEventListener('scroll', revealBoxes);
    revealBoxes(); // Check on load

    // 2. Typing Effect for Brand Story Header
    const brandStoryH2 = document.querySelector('.brand-story h2');
    if (brandStoryH2) {
        const text = brandStoryH2.innerText;
        brandStoryH2.innerText = '';
        let i = 0;

        const typeWriter = () => {
            if (i < text.length) {
                brandStoryH2.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        typeWriter();
    }

    // 3. Interactive Hover for Mission/Vision Boxes
    missionBoxes.forEach(box => {
        box.addEventListener('mousemove', (e) => {
            const rect = box.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            box.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        box.addEventListener('mouseleave', () => {
            box.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });
}


// --- Customer Support Page Logic ---

const supportPage = document.querySelector('.info-page-wrapper');

if (supportPage && document.querySelector('.support-grid')) {
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h4');
        const answer = item.querySelector('p');
        
        answer.style.display = "none";
        question.style.cursor = "pointer";
        question.style.padding = "10px 0";
        question.style.borderBottom = "1px solid #eee";
        question.innerHTML = `<span>+</span> ${question.innerText}`;

        question.addEventListener('click', () => {
            const isOpen = answer.style.display === "block";
            
            faqItems.forEach(i => {
                i.querySelector('p').style.display = "none";
                i.querySelector('h4 span').innerText = "+";
            });

            if (!isOpen) {
                answer.style.display = "block";
                answer.style.padding = "10px";
                answer.style.backgroundColor = "#f9f9f9";
                question.querySelector('span').innerText = "-";
            }
        });
    });

    const supportForm = document.querySelector('.auth-form');
    if (supportForm) {
        supportForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const submitBtn = supportForm.querySelector('.auth-btn');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.7";

            // Mock Success Message
            setTimeout(() => {
                supportForm.innerHTML = `
                    <div style="text-align:center; padding: 40px;">
                        <h2 style="color: #28a745;">Mila Gaya Bhai! ✅</h2>
                        <p>Aapka message humare paas pahunch gaya hai. Hum jaldi hi aapse contact karenge.</p>
                        <button onclick="location.reload()" class="auth-btn" style="margin-top:20px;">Send Another</button>
                    </div>
                `;
            }, 1500);
        });
    }

    const messageArea = supportPage.querySelector('textarea');
    if (messageArea) {
        messageArea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
}



// --- Reset Password Page Logic ---

const resetWrapper = document.querySelector('.auth-wrapper');

if (resetWrapper && resetWrapper.querySelector('.auth-title').innerText.includes('Reset')) {
    const resetForm = resetWrapper.querySelector('.auth-form');
    const usernameInput = resetForm.querySelector('input[name="username"]');
    const submitBtn = resetForm.querySelector('.auth-btn');

    // 1. Loading State on Submit
    resetForm.addEventListener('submit', function() {
        submitBtn.innerHTML = '<span class="spinner"></span> Finding Account...';
        submitBtn.style.opacity = "0.8";
        submitBtn.style.pointerEvents = "none";
    });

    const errorBanner = document.querySelector('.error-banner');
    if (errorBanner) {
        setTimeout(() => {
            errorBanner.style.transition = "opacity 0.5s ease";
            errorBanner.style.opacity = "0";
            setTimeout(() => errorBanner.remove(), 500);
        }, 5000);
    }

    // 3. Input Focus Interaction
    usernameInput.addEventListener('focus', () => {
        usernameInput.parentElement.style.transform = "translateX(5px)";
        usernameInput.parentElement.style.transition = "0.3s";
    });

    usernameInput.addEventListener('blur', () => {
        usernameInput.parentElement.style.transform = "translateX(0)";
    });

    // 4. Client-side Empty Check with Shake Effect
    submitBtn.addEventListener('click', (e) => {
        if (usernameInput.value.trim() === "") {
            e.preventDefault();
            resetForm.classList.add('shake');
            usernameInput.style.borderColor = "red";
            
            setTimeout(() => {
                resetForm.classList.remove('shake');
            }, 500);
        }
    });
}



// --- Login Page Logic ---

const loginWrapper = document.querySelector('.auth-wrapper');

if (loginWrapper && loginWrapper.querySelector('.auth-title').innerText.includes('Login')) {
    const loginForm = loginWrapper.querySelector('.auth-form');
    const passwordInput = loginForm.querySelector('input[name="password"]');
    const loginBtn = loginForm.querySelector('.auth-btn');

    // 1. Password Show/Hide Toggle
    const passGroup = passwordInput.parentElement;
    passGroup.style.position = 'relative';
    
    const toggleIcon = document.createElement('span');
    toggleIcon.innerHTML = '👁️';
    toggleIcon.style.cssText = `
        position: absolute;
        right: 15px;
        top: 38px;
        cursor: pointer;
        opacity: 0.6;
    `;
    passGroup.appendChild(toggleIcon);

    toggleIcon.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.innerHTML = '🙈';
        } else {
            passwordInput.type = 'password';
            toggleIcon.innerHTML = '👁️';
        }
    });

    loginForm.addEventListener('submit', (e) => {
        const inputs = loginForm.querySelectorAll('input');
        let isEmpty = false;

        inputs.forEach(input => {
            if (input.value.trim() === "") {
                input.style.borderColor = "red";
                isEmpty = true;
            } else {
                input.style.borderColor = "#ddd";
            }
        });

        if (isEmpty) {
            e.preventDefault();
            alert("Bhai, username aur password dono bharo!");
        } else {
            // Button loading state
            loginBtn.innerHTML = '<span class="spinner"></span> Logging in...';
            loginBtn.style.opacity = "0.8";
        }
    });

    // 3. Welcome Message (Console logging for fun)
    console.log("Login page ready, ShopSphere security active! 🛡️");
}



// --- Set New Password Page Logic ---

const setPassWrapper = document.querySelector('.auth-wrapper');

if (setPassWrapper && setPassWrapper.querySelector('.auth-title').innerText.includes('Set New')) {
    const setPassForm = setPassWrapper.querySelector('.auth-form');
    const newPassInput = setPassForm.querySelector('input[name="password"]');
    const updateBtn = setPassForm.querySelector('.auth-btn');

    const strengthDiv = document.createElement('div');
    strengthDiv.className = 'strength-meter';
    strengthDiv.style.cssText = `
        height: 5px;
        width: 100%;
        background: #ddd;
        margin-top: 5px;
        border-radius: 10px;
        overflow: hidden;
    `;
    
    const strengthBar = document.createElement('div');
    strengthBar.style.cssText = `
        height: 100%;
        width: 0%;
        transition: 0.3s;
    `;
    strengthDiv.appendChild(strengthBar);
    newPassInput.parentElement.appendChild(strengthDiv);

    // 2. Strength Logic
    newPassInput.addEventListener('input', () => {
        const val = newPassInput.value;
        let strength = 0;

        if (val.length > 6) strength += 25;
        if (val.match(/[a-z]/) && val.match(/[A-Z]/)) strength += 25;
        if (val.match(/[0-9]/)) strength += 25;
        if (val.match(/[<>?,./!@#$%^&*]/)) strength += 25;

        strengthBar.style.width = strength + "%";

        // Color Coding
        if (strength <= 25) strengthBar.style.backgroundColor = "red";
        else if (strength <= 50) strengthBar.style.backgroundColor = "orange";
        else if (strength <= 75) strengthBar.style.backgroundColor = "yellow";
        else strengthBar.style.backgroundColor = "#28a745";
    });

    // 3. Form Validation
    setPassForm.addEventListener('submit', (e) => {
        if (newPassInput.value.length < 8) {
            e.preventDefault();
            alert("Bhai, password kam se kam 8 characters ka hona chahiye!");
            newPassInput.style.borderColor = "red";
        } else {
            updateBtn.innerHTML = '<span class="spinner"></span> Updating...';
            updateBtn.style.opacity = "0.8";
        }
    });
}


// --- Profile Page Logic ---

const profileWrapper = document.querySelector('.profile-wrapper');

if (profileWrapper) {
    const avatar = profileWrapper.querySelector('.profile-avatar');
    const infoRows = profileWrapper.querySelectorAll('.info-row');
    const updateBtn = profileWrapper.querySelector('.update-btn');

    // 1. Dynamic Avatar Glow (Mouse Movement)
    avatar.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = avatar.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        
        avatar.style.background = `radial-gradient(circle at ${x}% ${y}%, #ff4757, #2f3542)`;
        avatar.style.transform = 'scale(1.1) rotate(5deg)';
    });

    avatar.addEventListener('mouseleave', () => {
        avatar.style.background = '#ff4757';
        avatar.style.transform = 'scale(1) rotate(0deg)';
    });

    // 2. Info Row Staggered Animation
    infoRows.forEach((row, index) => {
        row.style.opacity = "0";
        row.style.transform = "translateX(-20px)";
        
        setTimeout(() => {
            row.style.transition = "all 0.5s ease-out";
            row.style.opacity = "1";
            row.style.transform = "translateX(0)";
        }, 100 * (index + 1));

        // Hover Effect on Rows
        row.addEventListener('mouseenter', () => {
            row.style.backgroundColor = 'rgba(255, 71, 87, 0.05)';
            row.style.paddingLeft = '15px';
        });
        row.addEventListener('mouseleave', () => {
            row.style.backgroundColor = 'transparent';
            row.style.paddingLeft = '0';
        });
    });

    // 3. Update Button Interaction
    updateBtn.addEventListener('click', function(e) {
        this.style.width = '100%';
        this.innerHTML = 'Opening Editor...';
    });
}


// --- Registration Page Logic ---

const registerWrapper = document.querySelector('.auth-wrapper');

if (registerWrapper && registerWrapper.querySelector('.auth-title').innerText.includes('Create')) {
    const regForm = registerWrapper.querySelector('.auth-form');
    const inputs = regForm.querySelectorAll('input');
    const registerBtn = regForm.querySelector('.auth-btn');

    // 1. Success Color Feedback
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.type === 'email') {
                const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
                input.style.borderColor = isValidEmail ? "#28a745" : "#ff4757";
            } else if (input.value.trim().length > 2) {
                input.style.borderColor = "#28a745";
            } else {
                input.style.borderColor = "#ddd";
            }
        });
    });

    // 2. Interactive Registration Flow
    regForm.addEventListener('submit', (e) => {
        let hasError = false;
        
        inputs.forEach(input => {
            if (input.value.trim() === "") {
                input.style.borderColor = "#ff4757";
                input.classList.add('shake'); // Shake effect reuse
                hasError = true;
                
                setTimeout(() => input.classList.remove('shake'), 400);
            }
        });

        if (hasError) {
            e.preventDefault();
            // Scroll to first error
            const firstError = regForm.querySelector('input[style*="rgb(255, 71, 87)"]');
            if (firstError) firstError.focus();
        } else {
            registerBtn.innerHTML = '<span class="spinner"></span> Creating Account...';
            registerBtn.style.pointerEvents = 'none';
        }
    });

    // 3. Username Suggester (Fun Feature)
    const firstName = regForm.querySelector('input[name="first_name"]');
    const userName = regForm.querySelector('input[name="username"]');

    firstName.addEventListener('blur', () => {
        if (userName.value === "" && firstName.value !== "") {
            const suggestion = firstName.value.toLowerCase() + Math.floor(Math.random() * 100);
            userName.placeholder = `Suggestion: ${suggestion}`;
            userName.style.boxShadow = "0 0 5px rgba(255, 71, 87, 0.2)";
        }
    });
}



// --- Update Password Page Logic ---

const updatePassWrapper = document.querySelector('.auth-wrapper');

if (updatePassWrapper && updatePassWrapper.querySelector('.auth-title').innerText.includes('Update Password')) {
    const updateForm = updatePassWrapper.querySelector('.auth-form');
    const submitBtn = updateForm.querySelector('.auth-btn');
    const oldPassInput = updateForm.querySelector('input[name="oldpass"]');
    const newPassInput = updateForm.querySelector('input[name="newpass"]');

    // 1. Readonly Field Style
    const readonlyInput = updateForm.querySelector('.readonly-input');
    if (readonlyInput) {
        readonlyInput.style.backgroundColor = "#f4f4f4";
        readonlyInput.style.cursor = "not-allowed";
        readonlyInput.title = "Username cannot be changed";
    }

    // 2. Dynamic Submit Button Text
    if (newPassInput) {
        submitBtn.style.backgroundColor = "#28a745"; // New password step par green button
        submitBtn.innerText = "Confirm New Password";
    }

    // 3. Step Transition Animation
    updateForm.style.opacity = "0";
    updateForm.style.transform = "translateY(20px)";
    setTimeout(() => {
        updateForm.style.transition = "all 0.6s ease";
        updateForm.style.opacity = "1";
        updateForm.style.transform = "translateY(0)";
    }, 100);

    // 4. Input Protection Logic
    updateForm.addEventListener('submit', () => {
        submitBtn.innerHTML = '<span class="spinner"></span> Verifying...';
        submitBtn.style.pointerEvents = 'none';
        submitBtn.style.opacity = '0.8';
    });

    // 5. Error Banner Shake
    const wrongPassBanner = document.querySelector('.error-banner');
    if (wrongPassBanner) {
        wrongPassBanner.classList.add('shake');
        setTimeout(() => wrongPassBanner.classList.remove('shake'), 500);
    }
}


// --- Update Profile Page Logic ---

const updateProfileWrapper = document.querySelector('.auth-wrapper');

if (updateProfileWrapper && updateProfileWrapper.querySelector('.auth-title').innerText.includes('Update Profile')) {
    const updateForm = updateProfileWrapper.querySelector('.auth-form');
    const saveBtn = updateForm.querySelector('.auth-btn');
    const inputs = updateForm.querySelectorAll('input:not([readonly])');
    
    const originalValues = {};
    inputs.forEach(input => {
        originalValues[input.name] = input.value;
    });

    // 1. Live Change Detection
    saveBtn.style.opacity = "0.5";
    saveBtn.innerText = "No Changes Made";
    saveBtn.disabled = true;

    updateForm.addEventListener('input', () => {
        let isChanged = false;
        
        inputs.forEach(input => {
            if (input.value !== originalValues[input.name]) {
                isChanged = true;
                input.style.backgroundColor = "#fffdf0"; // Light highlight for changed field
            } else {
                input.style.backgroundColor = "#fff";
            }
        });

        if (isChanged) {
            saveBtn.style.opacity = "1";
            saveBtn.innerText = "Save Changes";
            saveBtn.disabled = false;
            saveBtn.classList.add('pulse-animation');
        } else {
            saveBtn.style.opacity = "0.5";
            saveBtn.innerText = "No Changes Made";
            saveBtn.disabled = true;
        }
    });

    // 2. Email Validation on the fly
    const emailInput = updateForm.querySelector('input[type="email"]');
    emailInput.addEventListener('blur', () => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
        if (!isValid && emailInput.value !== "") {
            emailInput.style.borderColor = "red";
            alert("Bhai, email ka format sahi nahi hai!");
        }
    });

    // 3. Unsaved Changes Guard
    const backLinks = document.querySelectorAll('.auth-footer a');
    backLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (!saveBtn.disabled) {
                const confirmLeave = confirm("Bhai, changes save nahi kiye. Kya sach mein jana hai?");
                if (!confirmLeave) e.preventDefault();
            }
        });
    });

    updateForm.addEventListener('submit', () => {
        saveBtn.innerHTML = '<span class="spinner"></span> Saving Details...';
    });
}

