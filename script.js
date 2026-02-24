// ============================================
// NAVİGASYON MENÜSÜ İŞLEVLERİ
// ============================================

// Hamburger menü toggle fonksiyonu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Hamburger animasyonu
        hamburger.classList.toggle('active');
    });
}

// Menü linklerine tıklandığında mobil menüyü kapat
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Scroll yapıldığında navbar'a shadow ekle
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// SCROLL ANİMASYONLARI
// ============================================

// Intersection Observer ile scroll animasyonları
const observerOptions = {
    threshold: 0.1, // Element %10 görünür olduğunda tetikle
    rootMargin: '0px 0px -50px 0px' // Biraz erken tetikle
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Bir kez görünür olduktan sonra gözlemi durdur (performans için)
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Sayfa yüklendiğinde animasyonlu elementleri bul ve gözlemle
document.addEventListener('DOMContentLoaded', () => {
    // Animasyonlu elementleri seç
    const animatedElements = document.querySelectorAll(
        '.about-card, .feature-card, .team-card'
    );
    
    // Her elemente fade-in-scroll sınıfı ekle ve gözlemle
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in-scroll');
        // Her element için hafif gecikme ekle (kademeli görünüm)
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
});

// ============================================
// YUMUŞAK SCROLL GEÇİŞLERİ
// ============================================

// Tüm anchor linklerini bul ve yumuşak scroll ekle
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Sadece # ile başlayan linkler için (boş link değilse)
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Navbar yüksekliğini hesapla
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                // Yumuşak scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// HERO ALANI ANİMASYONLARI
// ============================================

// Sayfa yüklendiğinde hero içeriğine animasyon ekle
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in');
    }
});

// ============================================
// KART HOVER EFEKTLERİ
// ============================================

// Takım kartlarına tıklama efekti ekle
const teamCards = document.querySelectorAll('.team-card');
teamCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// BUTON ANİMASYONLARI
// ============================================

// Tüm butonlara ripple efekti ekle
const buttons = document.querySelectorAll('.btn-primary, .back-button');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Ripple efekti için span oluştur
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        // Ripple'ı kaldır
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ============================================
// PERFORMANS İYİLEŞTİRMELERİ
// ============================================

// Scroll event'ini throttle et (performans için)
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll işlemleri buraya
            ticking = false;
        });
        ticking = true;
    }
});

// ============================================
// RESİM YÜKLEME HATALARINI YÖNET
// ============================================

// Placeholder resimler için fallback
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('error', function() {
        // Resim yüklenemezse placeholder göster
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23123C73" width="400" height="400"/%3E%3Ctext fill="%23ffffff" font-family="Arial" font-size="20" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EÜye Fotoğrafı%3C/text%3E%3C/svg%3E';
        this.alt = 'Fotoğraf yüklenemedi';
    });
});

// ============================================
// SAYFA YÜKLEME ANİMASYONU
// ============================================

// Sayfa yüklendiğinde body'ye loaded sınıfı ekle
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ============================================
// KONSOL MESAJI (Geliştirme için)
// ============================================

console.log('%cÜNİGO Web Sitesi', 'color: #1E88E5; font-size: 20px; font-weight: bold;');
console.log('%cTEKNOFEST 2026 - Point-Zero Takımı', 'color: #0B1F3A; font-size: 14px;');
