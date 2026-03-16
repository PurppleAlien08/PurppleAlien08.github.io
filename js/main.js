// main.js - Versión completa y corregida
// ==============================================
// SISTEMA DE ESPERA PARA TRADUCCIONES
// ==============================================

// Función para esperar a que las traducciones estén disponibles
function waitForTranslations(callback, maxAttempts = 15, interval = 100) {
    let attempts = 0;
    
    function check() {
        attempts++;
        if (typeof window.translations !== 'undefined' && typeof window.elementsToTranslate !== 'undefined') {
            console.log("✓ Traducciones cargadas correctamente");
            callback();
        } else if (attempts < maxAttempts) {
            setTimeout(check, interval);
        } else {
            console.error("✗ No se pudieron cargar las traducciones");
            // Usar valores por defecto para evitar errores
            window.translations = {
                'es': {
                    'title': 'Antonio Soria - Matemático y Programador',
                    'subtitle': 'Matemático y Desarrollador',
                    'about': 'Sobre Mí',
                    'skills': 'Habilidades',
                    'research': 'Intereses Académicos',
                    'projects': 'Proyectos Destacados',
                    'studio': 'Studio de Desarrollo',
                    'contact': 'Contacto',
                    'philosophy': 'Mi Filosofía'
                },
                'en': {
                    'title': 'Antonio Soria - Mathematician and Programmer',
                    'subtitle': 'Mathematician and Developer',
                    'about': 'About Me',
                    'skills': 'Skills',
                    'research': 'Academic Interests',
                    'projects': 'Featured Projects',
                    'studio': 'Development Studio',
                    'contact': 'Contact',
                    'philosophy': 'My Philosophy'
                }
            };
            
            window.elementsToTranslate = {
                'title': 'head title',
                'subtitle': '.hero p',
                'about': '#about .section-title',
                'skills': '#skills .section-title',
                'research': '#research .section-title',
                'projects': '#projects .section-title',
                'studio': '#studio .section-title',
                'contact': '#contact .section-title',
                'philosophy': '.philosophy .section-title'
            };
            
            callback();
        }
    }
    
    check();
}

// ==============================================
// FUNCIONES PRINCIPALES
// ==============================================

// Función para aplicar las traducciones
function applyLanguage(lang) {
    console.log("Aplicando idioma:", lang);
    
    if (!window.translations || !window.elementsToTranslate) {
        console.error("Error: Traducciones no disponibles");
        return;
    }
    
    if (!window.translations[lang]) {
        console.error("Error: Idioma no disponible:", lang);
        return;
    }
    
    // Actualizar todos los textos
    for (const [key, selector] of Object.entries(window.elementsToTranslate)) {
        try {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0 && window.translations[lang][key]) {
                elements.forEach(element => {
                    element.textContent = window.translations[lang][key];
                });
            }
        } catch (error) {
            console.error(`Error en traducción ${key}:`, error);
        }
    }
    
    // Actualizar el botón de idioma
    const languageBtn = document.getElementById('language-toggle');
    if (languageBtn) {
        const flagSpan = languageBtn.querySelector('.language-flag');
        
        if (lang === 'en') {
            if (flagSpan) flagSpan.textContent = '🇺🇸';
            languageBtn.setAttribute('title', 'Switch to Spanish');
        } else {
            if (flagSpan) flagSpan.textContent = '🇪🇸';
            languageBtn.setAttribute('title', 'Cambiar a inglés');
        }
        
        // Guardar preferencia
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
    }
    
    console.log("Idioma cambiado a:", lang);
}

// Función para el menú desplegable
function initDropdownMenu() {
    const dropdownToggle = document.getElementById('dropdown-toggle');
    const dropdownContent = document.getElementById('dropdown-content');
    
    if (dropdownToggle && dropdownContent) {
        dropdownToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            dropdownContent.classList.toggle('show');
        });
        
        document.addEventListener('click', function(e) {
            if (dropdownContent.classList.contains('show') && 
                !dropdownContent.contains(e.target) && 
                !dropdownToggle.contains(e.target)) {
                dropdownContent.classList.remove('show');
            }
        });
        
        dropdownContent.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                dropdownContent.classList.remove('show');
            });
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        });
    } else {
        console.error("Elementos del menú desplegable no encontrados");
    }
}

// Selector de tema claro/oscuro
function initThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) {
        console.error("No se encontró el botón de cambio de tema");
        return;
    }
    
    console.log("✅ Botón de tema encontrado");
    
    // Desactivar el modo oscuro automático del sistema
    // y usar solo el control manual
    const savedTheme = localStorage.getItem('theme');
    console.log("Tema guardado:", savedTheme);
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        console.log("Modo oscuro activado desde localStorage");
    } else {
        document.body.classList.remove('dark-mode');
        // Establecer valor por defecto si no existe
        if (!savedTheme) localStorage.setItem('theme', 'light');
        console.log("Modo claro activado");
    }
    
    themeToggle.addEventListener('click', function() {
        console.log("🖱️ Botón de tema clickeado");
        document.body.classList.toggle('dark-mode');
        let theme = 'light';
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark';
        }
        localStorage.setItem('theme', theme);
        console.log("Tema cambiado a:", theme, "Clase dark-mode:", document.body.classList.contains('dark-mode'));
    });
    
    console.log("✅ Evento click asignado al botón de tema");
}

// Script para el menú responsive tradicional
function initResponsiveMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
        
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}

// Scroll suave al hacer clic en los enlaces del menú
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                const dropdownContent = document.getElementById('dropdown-content');
                if (dropdownContent) dropdownContent.classList.remove('show');
                
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu) navMenu.classList.remove('active');
            }
        });
    });
}

// Actualizar clase activa en el menú al hacer scroll
function initScrollSpy() {
    function updateActiveMenu() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('load', updateActiveMenu);
    window.addEventListener('scroll', updateActiveMenu);
}

// Animación de elementos al hacer scroll
function initScrollAnimations() {
    function checkScroll() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
}

// ==============================================
// INICIALIZACIÓN
// ==============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando aplicación...");
    
    // 1. Inicializar tema
    initThemeSwitcher();
    
    // 2. Esperar traducciones y luego inicializar idioma
    waitForTranslations(function() {
        const savedLanguage = localStorage.getItem('language') || 'es';
        applyLanguage(savedLanguage);
        
        // 3. Configurar botón de idioma
        const languageToggle = document.getElementById('language-toggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', function() {
                const currentLang = document.documentElement.lang || 'es';
                const newLang = currentLang === 'en' ? 'es' : 'en';
                applyLanguage(newLang);
            });
        }
    });
    
    // 4. Inicializar otros componentes
    initDropdownMenu();
    initResponsiveMenu();
    initSmoothScroll();
    initScrollSpy();
    initScrollAnimations();
    
    window.dispatchEvent(new Event('scroll'));
    console.log("Aplicación inicializada correctamente");
});

// Funciones globales para depuración
window.applyLanguage = applyLanguage;

window.debugTranslations = function() {
    console.log("Translations:", window.translations);
    console.log("Elements to translate:", window.elementsToTranslate);
    console.log("Current language:", localStorage.getItem('language'));
    console.log("Dark mode:", document.body.classList.contains('dark-mode'));
};

// Función para forzar el modo oscuro (para pruebas)
window.forceDarkMode = function() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    console.log("Modo oscuro forzado");
};

// Función para forzar el modo claro (para pruebas)
window.forceLightMode = function() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    console.log("Modo claro forzado");
};

// Función para recargar traducciones (para desarrollo)
window.reloadTranslations = function() {
    const savedLanguage = localStorage.getItem('language') || 'es';
    applyLanguage(savedLanguage);
    console.log("Traducciones recargadas");
};

// Función para diagnosticar el tema
window.diagnoseTheme = function() {
    const themeToggle = document.getElementById('theme-toggle');
    console.log("=== DIAGNÓSTICO DEL TEMA ===");
    console.log("Botón de tema encontrado:", !!themeToggle);
    console.log("Clase dark-mode en body:", document.body.classList.contains('dark-mode'));
    console.log("Tema en localStorage:", localStorage.getItem('theme'));
    console.log("=================================");
};