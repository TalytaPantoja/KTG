// Script principal do site KTG

document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const body = document.body;
    
    if (mobileMenuIcon) {
        // Criar elementos do menu mobile
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        
        const closeIcon = document.createElement('div');
        closeIcon.className = 'mobile-menu-close';
        closeIcon.innerHTML = '<i class="fas fa-times"></i>';
        
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        
        // Clonar os links do menu principal
        const navLinks = document.querySelector('nav ul').cloneNode(true);
        
        // Montar o menu mobile
        mobileMenu.appendChild(closeIcon);
        mobileMenu.appendChild(navLinks);
        
        // Adicionar ao body
        body.appendChild(mobileMenu);
        body.appendChild(overlay);
        
        // Função para abrir o menu
        function openMobileMenu() {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            body.style.overflow = 'hidden';
        }
        
        // Função para fechar o menu
        function closeMobileMenu() {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        }
        
        // Event listeners
        mobileMenuIcon.addEventListener('click', openMobileMenu);
        closeIcon.addEventListener('click', closeMobileMenu);
        overlay.addEventListener('click', closeMobileMenu);
        
        // Fechar menu ao clicar em um link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
    
    // Header com scroll
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'var(--primary-medium)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
            } else {
                header.style.background = 'var(--primary-dark)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // Animações de entrada
function initAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}
    
    // Preparar elementos para animação
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .section-title, .hero-content h2, .hero-content p, .hero-buttons');
    
    if (animatedElements.length > 0) {
        animatedElements.forEach((element, index) => {
            element.classList.add('fade-in');
            element.classList.add(`delay-${index % 4 + 1}`);
        });
        initAnimations();
    }
    
    // Slider de depoimentos
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider && testimonialSlider.children.length > 1) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        testimonialSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            testimonialSlider.style.cursor = 'grabbing';
            startX = e.pageX - testimonialSlider.offsetLeft;
            scrollLeft = testimonialSlider.scrollLeft;
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            isDown = false;
            testimonialSlider.style.cursor = 'grab';
        });
        
        testimonialSlider.addEventListener('mouseup', () => {
            isDown = false;
            testimonialSlider.style.cursor = 'grab';
        });
        
        testimonialSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialSlider.scrollLeft = scrollLeft - walk;
        });
        
        // Auto scroll para depoimentos
        let scrollInterval;
        
        function startAutoScroll() {
            scrollInterval = setInterval(() => {
                testimonialSlider.scrollLeft += 2;
                
                // Reiniciar quando chegar ao final
                if (testimonialSlider.scrollLeft >= testimonialSlider.scrollWidth - testimonialSlider.clientWidth) {
                    testimonialSlider.scrollLeft = 0;
                }
            }, 30);
        }
        
        function stopAutoScroll() {
            clearInterval(scrollInterval);
        }
        
        // Iniciar auto scroll
        startAutoScroll();
        
        // Parar quando o mouse estiver sobre o slider
        testimonialSlider.addEventListener('mouseenter', stopAutoScroll);
        testimonialSlider.addEventListener('mouseleave', startAutoScroll);
    }
    
    // Smooth scroll para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});