/* ===================================================
   CÓDIGO JAVASCRIPT - LANDING PAGE INTERACTIVA
   Estudiante: Sergio Rosales Diego
=================================================== */

// Datos de proyectos para el modal
const proyectosData = {
    proyecto1: {
        titulo: "Plataforma Educativa Web",
        descripcion: "Proyecto de maquetación de una plataforma de e-learning. Incluye listado interactivo de cursos y vista previa del progreso.",
        tecnologias: ["HTML5", "CSS Grid", "JavaScript"]
    },
    proyecto2: {
        titulo: "Rediseño App de Finanzas",
        descripcion: "Prototipo interactivo en Figma para la gestión de gastos personales, enfocado en simplicidad y usabilidad móvil.",
        tecnologias: ["Figma", "UI/UX", "Prototipado"]
    },
    proyecto3: {
        titulo: "Dashboard Gestor de Tareas",
        descripcion: "Aplicación web estilo Kanban para organizar tareas. Toda la información se guarda de manera local en el navegador.",
        tecnologias: ["JavaScript Vanilla", "LocalStorage", "CSS Flexbox"]
    }
};

document.addEventListener("DOMContentLoaded", () => {

    // 1. Cambiar Tema (Claro / Oscuro)
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const esOscuro = document.body.classList.contains("dark-mode");
        themeToggle.textContent = esOscuro ? "☀️" : "🌙";
    });

    // 2. Menú Desplegable Móvil
    const menuBtn = document.getElementById("menu-btn");
    const navMenu = document.getElementById("nav-menu");

    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Cerrar menú al hacer clic en un enlace de navegación
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });

    // 3. Resaltar enlace activo según el desplazamiento (ScrollSpy)
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let actual = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                actual = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${actual}`) {
                link.classList.add("active");
            }
        });
    });

    // 4. Filtrado de Proyectos
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const category = btn.getAttribute("data-category");

            projectCards.forEach(card => {
                if (category === "all" || card.getAttribute("data-category") === category) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 5. Envío de Formulario
    const contactForm = document.getElementById("contact-form");
    const formFeedback = document.getElementById("form-feedback");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        formFeedback.style.color = "#16a34a";
        formFeedback.textContent = "¡Mensaje enviado correctamente! Me pondré en contacto pronto.";

        contactForm.reset();

        setTimeout(() => {
            formFeedback.textContent = "";
        }, 4000);
    });

    // 6. Año automático en Footer
    document.getElementById("year").textContent = new Date().getFullYear();
});

// Funciones globales para el Modal
function abrirModal(id) {
    const data = proyectosData[id];
    const modal = document.getElementById("modal-proyecto");
    const contenido = document.getElementById("modal-contenido");

    if (data) {
        contenido.innerHTML = `
            <h3 style="color: var(--title-color); margin-bottom: 0.5rem;">${data.titulo}</h3>
            <p style="font-size: 0.9rem; margin-bottom: 1rem;">${data.descripcion}</p>
            <p style="font-size: 0.85rem;"><strong>Tecnologías usadas:</strong> ${data.tecnologias.join(", ")}</p>
        `;
        modal.style.display = "flex";
    }
}

document.getElementById("cerrar-modal").addEventListener("click", () => {
    document.getElementById("modal-proyecto").style.display = "none";
});

window.addEventListener("click", (e) => {
    const modal = document.getElementById("modal-proyecto");
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
