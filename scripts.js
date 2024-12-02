// Fade-in effect when sections come into view
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));

// Navbar active link highlighting on scroll
const navLinks = document.querySelectorAll('.navbar a');
const sectionsArray = Array.from(sections);

window.addEventListener('scroll', () => {
    let currentSection = "";
    sectionsArray.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

async function updateGitHubInfo() {
    try {
        // Fetch GitHub user data
        const response = await fetch('https://api.github.com/users/ThomasVarvellaVicente');
        const data = await response.json();

        // Get the avatar URL and bio from the response
        const avatarUrl = data.avatar_url;
        const bio = data.bio;

        // Update the avatar image in the About section
        const avatarImg = document.querySelector('.about-section img');
        avatarImg.src = avatarUrl;

        // Update the bio in the About section
        const bioParagraph = document.querySelector('.about-section p');
        bioParagraph.innerText = bio;
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
    }
}

// Call the function to update the info when the page loads
window.onload = updateGitHubInfo;

// Initialize EmailJS with your Public Key
(function() {
    emailjs.init("JIGfXZuE9G8ex9Deh"); // Replace with your actual public key from EmailJS
})();

// Form submission logic to send the email
document.querySelector('#contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    const form = e.target;
    const formData = new FormData(form);

    emailjs.sendForm('service_ksdf6db', 'template_gqim6ci', formData, 'JIGfXZuE9G8ex9Deh')
        .then((response) => {
            console.log('SUCCESS!', response);
            alert('Message sent successfully!');
            form.reset(); // Clear the form after successful submission
        }, (error) => {
            console.log('FAILED...', error);
            alert('Something went wrong. Please try again later.');
        });
});