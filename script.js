document.addEventListener("DOMContentLoaded", function () {
    // Effetto zoom sulle immagini della galleria
    const images = document.querySelectorAll(".gallery img");

    images.forEach(img => {
        img.style.transition = "transform 0.3s ease-in-out";

        img.addEventListener("mouseover", () => {
            img.style.transform = "scale(1.1)";
        });

        img.addEventListener("mouseout", () => {
            img.style.transform = "scale(1)";
        });
    });

    // Slideshow automatica
    let slides = document.querySelectorAll(".slide");
    let index = 0;

    function changeSlide() {
        if (slides.length > 0) {
            slides.forEach(slide => slide.classList.remove("active"));
            index = (index + 1) % slides.length;
            slides[index].classList.add("active");
        }
    }

    setInterval(changeSlide, 2500);

    // Carica il file JSON delle traduzioni
    fetch('lang.json')
        .then(response => response.json())
        .then(translations => {
            function changeLanguage(lang) {
                const languageData = translations[lang];

                if (!languageData) {
                    console.error(`Dati per la lingua "${lang}" non trovati.`);
                    return;
                }

                // Lista di elementi da aggiornare
                const translationMap = {
                    'title': 'title',
                    'page-title': 'title',
                    'nav-home': 'nav_home',
                    'nav-quadri': 'nav_quadri',
                    'nav-progetti': 'nav_progetti',
                    'nav-chisono': 'nav_chisono',
                    'nav-contattami': 'nav_contattami',
                    'footer-text': 'footer_text', // 👈 Footer con copyright (usa innerHTML)
                    'section-title': 'section_title',
                    'section-description': 'section_description',
                    'paintings-title': 'paintings_title',
                    'about-title': 'about_title',
                    'about-description': 'about_description',
                    'quadro-dettaglio-title': 'quadro_dettaglio_title',
                    'dimensioni': 'dimensioni',
                    'descrizione': 'descrizione',
                    'processo-creativo-title': 'processo_creativo',
                    'processo-creativo-descrizione': 'processo_descrizione'
                };

                Object.keys(translationMap).forEach(id => {
                    const elements = document.querySelectorAll(`#${id}`); // Prende tutti gli elementi con quell'ID
                    elements.forEach(element => {
                        if (id === 'footer-text') {
                            element.innerHTML = languageData[translationMap[id]]; // ✅ Risolve il problema del ©
                        } else {
                            element.innerText = languageData[translationMap[id]];
                        }
                    });
                });
            }

            // Imposta la lingua in base a sessionStorage o spagnolo di default
            const savedLanguage = sessionStorage.getItem('selectedLanguage') || 'es'; // Se non c'è, default è spagnolo
            changeLanguage(savedLanguage);

            // Assegna gli eventi solo se i pulsanti esistono
            document.getElementById('btn-es-desktop')?.addEventListener('click', () => {
                changeLanguage('es');
                sessionStorage.setItem('selectedLanguage', 'es');
            });
            
            document.getElementById('btn-en-desktop')?.addEventListener('click', () => {
                changeLanguage('en');
                sessionStorage.setItem('selectedLanguage', 'en');
            });
            
            document.getElementById('btn-it-desktop')?.addEventListener('click', () => {
                changeLanguage('it');
                sessionStorage.setItem('selectedLanguage', 'it');
            });
            
            document.getElementById('btn-es-mobile')?.addEventListener('click', () => {
                changeLanguage('es');
                sessionStorage.setItem('selectedLanguage', 'es');
            });
            
            document.getElementById('btn-en-mobile')?.addEventListener('click', () => {
                changeLanguage('en');
                sessionStorage.setItem('selectedLanguage', 'en');
            });
            
            document.getElementById('btn-it-mobile')?.addEventListener('click', () => {
                changeLanguage('it');
                sessionStorage.setItem('selectedLanguage', 'it');
            });
            
        })
        .catch(error => console.error('Errore nel caricamento delle traduzioni:', error));
});


function toggleMenu() {
    const menu = document.querySelector('#mobyle-menu .menu');
    const overlay = document.querySelector('.menu-overlay');
    const body = document.body;

    // Togliare/aggiungere la classe 'open' per aprire/chiudere il menu
    menu.classList.toggle('open');
    overlay.classList.toggle('active');
    body.classList.toggle('menu-open');
}





                                   // menù seleziona lingua computer //

document.addEventListener("DOMContentLoaded", function () {
    const languageButtons = document.querySelectorAll(".language-option");

    languageButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedLanguage = this.textContent;
            document.getElementById("selected-language").textContent = selectedLanguage;

            // Chiudi il menu a tendina
            document.querySelectorAll('.language-dropdown').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        });
    });

    // Mostra/nasconde il menu a tendina desktop
    document.getElementById("current-language").addEventListener("click", function() {
        var dropdown = document.querySelector(".desktop-language .language-dropdown");
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });

    // Mostra/nasconde il menu a tendina mobile
    document.getElementById("language-icon").addEventListener("click", function() {
        var dropdown = document.querySelector(".mobile-language .language-dropdown");
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const languageIcon = document.getElementById("language-icon"); // Bottone per aprire il menu
    const languageDropdown = document.querySelector(".language-dropdown"); // Il menu a tendina

    // Funzione per mostrare/nascondere il menu
    languageIcon.addEventListener("click", function (event) {
        event.stopPropagation(); // Impedisce la propagazione del click al documento
        languageDropdown.style.display = languageDropdown.style.display === "block" ? "none" : "block";
    });

    // Chiude il menu se si clicca fuori dal menu lingua
    document.addEventListener("click", function (event) {
        if (!languageDropdown.contains(event.target) && event.target !== languageIcon) {
            languageDropdown.style.display = "none";
        }
    });

    // Previene la chiusura del menu se clicchi sul menu stesso
    languageDropdown.addEventListener("click", function (event) {
        event.stopPropagation(); // Evita che il click sul menu si propagi
    });
});
