// Toggle Menu Icon on Mobile
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll Sections Active Link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    // Remove toggle icon and navbar when click navbar link (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// --- GESTION DU FORMULAIRE DE CONTACT (Sans redirection) ---
var form = document.getElementById("contact-form");
var statusMessage = document.getElementById("form-status");

async function handleSubmit(event) {
    event.preventDefault(); // Empêche le rechargement/redirection de la page
    var data = new FormData(event.target);
    
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            statusMessage.innerHTML = "Merci ! Votre message a été envoyé avec succès.";
            statusMessage.style.color = "var(--accent)"; // Couleur bleue pour le succès
            form.reset(); // Vide les champs du formulaire après l'envoi
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    statusMessage.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    statusMessage.innerHTML = "Oups! Il y a eu un problème lors de l'envoi.";
                }
                statusMessage.style.color = "red";
            })
        }
    }).catch(error => {
        statusMessage.innerHTML = "Oups! Il y a eu un problème lors de l'envoi.";
        statusMessage.style.color = "red";
    });
}

if (form) {
    form.addEventListener("submit", handleSubmit);
}