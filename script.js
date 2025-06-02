// Typewriter Effect
document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.getElementById('typewriter');
    const phrases = [
        "Build a stunning resume in minutes",
        "Stand out from the crowd",
        "Get hired faster"
    ];
    
    let currentPhrase = 0;
    let currentLetter = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeWriter() {
        const currentText = phrases[currentPhrase].substring(0, currentLetter);
        typewriterElement.textContent = currentText;
        
        if (!isDeleting && currentLetter === phrases[currentPhrase].length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause at end of phrase
        } else if (isDeleting && currentLetter === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            typingSpeed = 100;
        }
        
        if (isDeleting) {
            currentLetter--;
            typingSpeed = 50;
        } else {
            currentLetter++;
            typingSpeed = 100;
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Start the typewriter effect after a short delay
    setTimeout(typeWriter, 500);
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Form navigation for get-started page
    if (document.getElementById('resumeForm')) {
        const form = document.getElementById('resumeForm');
        const sections = document.querySelectorAll('.form-section');
        const progressBar = document.querySelector('.progress');
        const nextButtons = document.querySelectorAll('.btn-next');
        const prevButtons = document.querySelectorAll('.btn-prev');
        const submitButton = document.querySelector('.btn-submit');
        const spinner = document.querySelector('.spinner');
        const btnText = document.querySelector('.btn-text');
        
        let currentSection = 0;
        
        // Show first section
        showSection(currentSection);
        
        // Next button click
        nextButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Validate current section before proceeding
                if (validateSection(currentSection)) {
                    currentSection++;
                    showSection(currentSection);
                    updateProgressBar();
                }
            });
        });
        
        // Previous button click
        prevButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                currentSection--;
                showSection(currentSection);
                updateProgressBar();
            });
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading spinner
            spinner.classList.remove('hidden');
            btnText.textContent = 'Generating...';
            
            // Simulate API call
            setTimeout(function() {
                spinner.classList.add('hidden');
                btnText.textContent = 'Download Resume';
                
                // Show success message
                alert('Your resume has been generated successfully!');
                
                // Here you would typically redirect to the preview page or download the PDF
                // window.location.href = 'resume-preview.html';
            }, 2000);
        });
        
        // Add experience field
        const addExperienceBtn = document.getElementById('addExperience');
        const experienceContainer = document.getElementById('experienceContainer');
        
        if (addExperienceBtn && experienceContainer) {
            addExperienceBtn.addEventListener('click', function() {
                const experienceCount = experienceContainer.children.length;
                const newExperience = document.createElement('div');
                newExperience.className = 'experience-item';
                newExperience.innerHTML = `
                    <div class="form-row">
                        <div class="form-group">
                            <label for="company${experienceCount}">Company</label>
                            <input type="text" id="company${experienceCount}" name="company[]" required>
                            <div class="focus-line"></div>
                        </div>
                        <div class="form-group">
                            <label for="position${experienceCount}">Position</label>
                            <input type="text" id="position${experienceCount}" name="position[]" required>
                            <div class="focus-line"></div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="startDate${experienceCount}">Start Date</label>
                            <input type="month" id="startDate${experienceCount}" name="startDate[]" required>
                            <div class="focus-line"></div>
                        </div>
                        <div class="form-group">
                            <label for="endDate${experienceCount}">End Date</label>
                            <input type="month" id="endDate${experienceCount}" name="endDate[]">
                            <div class="focus-line"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="description${experienceCount}">Description</label>
                        <textarea id="description${experienceCount}" name="description[]" rows="3"></textarea>
                        <div class="focus-line"></div>
                    </div>
                    <button type="button" class="btn btn-remove">
                        <i class="fas fa-trash"></i> Remove Experience
                    </button>
                `;
                
                experienceContainer.appendChild(newExperience);
                
                // Add event listener to remove button
                const removeBtn = newExperience.querySelector('.btn-remove');
                removeBtn.addEventListener('click', function() {
                    experienceContainer.removeChild(newExperience);
                });
            });
        }
        
        function showSection(index) {
            sections.forEach((section, i) => {
                if (i === index) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
            
            // Show/hide navigation buttons
            if (index === 0) {
                prevButtons.forEach(btn => btn.style.visibility = 'hidden');
            } else {
                prevButtons.forEach(btn => btn.style.visibility = 'visible');
            }
            
            if (index === sections.length - 1) {
                nextButtons.forEach(btn => btn.style.display = 'none');
                if (submitButton) submitButton.style.display = 'inline-flex';
            } else {
                nextButtons.forEach(btn => btn.style.display = 'inline-flex');
                if (submitButton) submitButton.style.display = 'none';
            }
        }
        
        function updateProgressBar() {
            const progress = ((currentSection + 1) / sections.length) * 100;
            progressBar.style.width = `${progress}%`;
        }
        
        function validateSection(index) {
            const currentSection = sections[index];
            const inputs = currentSection.querySelectorAll('input[required], textarea[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = 'red';
                    isValid = false;
                    
                    // Reset border color after delay
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 2000);
                }
            });
            
            return isValid;
        }
    }
    
    // Ripple effect for buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
});