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
document.addEventListener('click', (e) => {
    if (e.target.matches('#nav-menu a')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// Scroll suave para los enlaces del menú
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        setTimeout(() => {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    });
});

// Animación de scroll para las imágenes
const serviceItems = document.querySelectorAll('.service-item');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in');
            }, 100);
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
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const origin = document.getElementById('origin');
    const destination = document.getElementById('destination');
    const details = document.getElementById('details');

    let isValid = true;

    if (!name.value) {
        showError(name, 'Por favor, ingresa tu nombre.');
        isValid = false;
    }

    if (!email.value || !validateEmail(email.value)) {
        showError(email, 'Por favor, ingresa un correo electrónico válido.');
        isValid = false;
    }

    if (!phone.value) {
        showError(phone, 'Por favor, ingresa tu número de teléfono.');
        isValid = false;
    }

    if (!origin.value) {
        showError(origin, 'Por favor, ingresa el origen.');
        isValid = false;
    }

    if (!destination.value) {
        showError(destination, 'Por favor, ingresa el destino.');
        isValid = false;
    }

    if (!details.value) {
        showError(details, 'Por favor, describe los detalles de la carga.');
        isValid = false;
    }

    if (!isValid) return;

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

// Mostrar mensajes de error
function showError(input, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    input.parentNode.insertBefore(errorElement, input.nextSibling);
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

// Cerrar modal automáticamente después de 3 segundos
setTimeout(() => {
    successModal.style.opacity = '0';
    setTimeout(() => {
        successModal.style.display = 'none';
    }, 300);
}, 3000);