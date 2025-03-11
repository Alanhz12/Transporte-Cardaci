// Menú hamburguesa
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Cerrar el menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('#nav-menu a');

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Scroll suave para los enlaces del menú
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        // Cierra el menú antes de hacer scroll
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');

        setTimeout(() => {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    });
});

// Animación de scroll para las imágenes
const serviceItems = document.querySelectorAll('.service-item');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

serviceItems.forEach((item) => {
    observer.observe(item);
});

// Validación del formulario de cotización
document.getElementById('quote-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const details = document.getElementById('details').value;

    if (!name || !email || !origin || !destination || !details) {
        alert('Por favor, completa todos los campos del formulario.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    const formData = new FormData(this);

    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            successModal.style.display = 'flex';
            setTimeout(() => {
                successModal.style.opacity = '1';
            }, 10);
            this.reset();
        } else {
            alert('Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo.');
        }
    })
    .catch(error => {
        alert('Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo.');
    })
    .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar Solicitud';
    });
});

// Validación de correo electrónico
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Modal de éxito
const successModal = document.getElementById('success-modal');
const closeModal = document.querySelector('.close');

// Cerrar modal
closeModal.addEventListener('click', () => {
    successModal.style.opacity = '0';
    setTimeout(() => {
        successModal.style.display = 'none';
    }, 300);
});

window.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.style.opacity = '0';
        setTimeout(() => {
            successModal.style.display = 'none';
        }, 300);
    }
});