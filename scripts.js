document.addEventListener("DOMContentLoaded",function(){const e=document.getElementById("main-content");e.classList.remove("loading"),e.classList.add("loaded");const t=document.getElementById("expand-btn"),n=document.getElementById("expandable-content");let c=!1;t&&n&&t.addEventListener("click",function(){c=!c,c?(n.classList.add("show"),t.textContent="Ocultar"):(n.classList.remove("show"),t.textContent="Ver Más CSWA")});const o=document.querySelectorAll('a[href*="hotmart.com"]');o.forEach(e=>{e.addEventListener("click",function(){"undefined"!=typeof gtag&&gtag("event","click",{event_category:"CTA",event_label:"Inscribirse Ahora"})})})});const dnsLinks=["//pay.hotmart.com","//static.wixstatic.com"];dnsLinks.forEach(e=>{const t=document.createElement("link");t.rel="dns-prefetch",t.href=e,document.head.appendChild(t)});
/* ===== FUNCIONALIDAD DESCUENTO WHATSAPP ===== */

// Función para detectar acceso desde WhatsApp
function detectWhatsAppAccess() {
    console.log('🔍 Detectando acceso desde WhatsApp...');
    
    // Método 1: Detectar por User Agent
    const userAgent = navigator.userAgent.toLowerCase();
    const isWhatsAppInApp = userAgent.includes('whatsapp');
    
    // Método 2: Detectar por referrer
    const referrer = document.referrer.toLowerCase();
    const fromWhatsApp = referrer.includes('whatsapp') || 
                        referrer.includes('wa.me') || 
                        referrer.includes('api.whatsapp.com');
    
    // Método 3: Detectar por parámetros URL
    const urlParams = new URLSearchParams(window.location.search);
    const whatsappParam = urlParams.get('utm_source') === 'whatsapp' || 
                         urlParams.get('source') === 'whatsapp' ||
                         urlParams.get('from') === 'wa' ||
                         urlParams.get('ref') === 'whatsapp' ||
                         urlParams.get('campaign') === 'whatsapp';
    
    // Método 4: Detectar por hash en la URL
    const hashParams = window.location.hash.includes('whatsapp') || 
                      window.location.hash.includes('wa') ||
                      window.location.hash.includes('wp');
    
    // Método 5: Detectar por parámetros específicos de WhatsApp Business
    const whatsappBusiness = urlParams.get('fbclid') && userAgent.includes('mobile');
    
    // Log de detección para debugging
    console.log('📱 User Agent contiene WhatsApp:', isWhatsAppInApp);
    console.log('🔗 Referrer desde WhatsApp:', fromWhatsApp);
    console.log('🎯 Parámetros de WhatsApp:', whatsappParam);
    console.log('#️⃣ Hash contiene WhatsApp:', hashParams);
    console.log('💼 WhatsApp Business:', whatsappBusiness);
    
    return isWhatsAppInApp || fromWhatsApp || whatsappParam || hashParams || whatsappBusiness;
}

// Función para mostrar el descuento de WhatsApp
function showWhatsAppDiscount() {
    console.log('✅ Activando descuento de WhatsApp...');
    
    const discountSection = document.getElementById('whatsapp-discount');
    const regularSection = document.getElementById('regular-pricing');
    
    if (discountSection && regularSection) {
        // Mostrar descuento con animación
        discountSection.classList.add('show');
        
        // Ocultar precio regular
        regularSection.classList.add('hide');
        regularSection.style.display = 'none';
        
        // Guardar en localStorage para mantener el descuento en la sesión
        localStorage.setItem('whatsapp_discount_shown', 'true');
        localStorage.setItem('whatsapp_discount_timestamp', Date.now().toString());
        
        // Enviar evento a Google Analytics si está disponible
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_discount_shown', {
                event_category: 'discount',
                event_label: 'whatsapp_access',
                value: 1000 // Valor del descuento en MXN
            });
        }
        
        // Enviar evento a Facebook Pixel si está disponible
        if (typeof fbq !== 'undefined') {
            fbq('track', 'ViewContent', {
                content_type: 'discount',
                content_ids: ['whatsapp_discount'],
                value: 1997,
                currency: 'MXN'
            });
        }
        
        // Opcional: Mostrar notificación de descuento activado
        showDiscountNotification();
        
        console.log('🎉 Descuento de WhatsApp activado exitosamente');
    } else {
        console.error('❌ No se encontraron elementos de descuento');
    }
}

// Función para mostrar notificación de descuento
function showDiscountNotification() {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #25d366, #128c7e);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
            z-index: 10000;
            font-weight: bold;
            animation: slideInRight 0.5s ease-out;
        ">
            🎉 ¡Descuento de WhatsApp activado!
            <div style="font-size: 0.9rem; margin-top: 5px; opacity: 0.9;">
                Ahorra $1,000 MXN
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remover notificación después de 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 4000);
}

// Función para verificar si el descuento ya fue mostrado
function hasDiscountBeenShown() {
    const shown = localStorage.getItem('whatsapp_discount_shown');
    const timestamp = localStorage.getItem('whatsapp_discount_timestamp');
    
    if (!shown || !timestamp) {
        return false;
    }
    
    // Verificar si han pasado más de 24 horas (opcional)
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    if (now - parseInt(timestamp) > twentyFourHours) {
        // Limpiar localStorage después de 24 horas
        localStorage.removeItem('whatsapp_discount_shown');
        localStorage.removeItem('whatsapp_discount_timestamp');
        return false;
    }
    
    return true;
}

// Función principal para inicializar la funcionalidad de precios
function initPricingDisplay() {
    console.log('🚀 Inicializando sistema de descuentos...');
    
    // Verificar si ya se mostró el descuento en esta sesión
    const discountAlreadyShown = hasDiscountBeenShown();
    
    if (detectWhatsAppAccess() || discountAlreadyShown) {
        showWhatsAppDiscount();
        
        if (detectWhatsAppAccess()) {
            console.log('✅ Acceso detectado desde WhatsApp - Mostrando descuento');
        } else {
            console.log('🔄 Descuento ya mostrado anteriormente - Manteniendo descuento');
        }
    } else {
        console.log('📝 Acceso regular - Mostrando precio normal');
    }
}

// Función para testing: simular acceso desde WhatsApp
function testWhatsAppDiscount() {
    console.log('🧪 MODO TEST: Simulando acceso desde WhatsApp');
    showWhatsAppDiscount();
}

// Función para limpiar el estado (útil para testing)
function resetPricing() {
    console.log('🔄 Reiniciando sistema de precios...');
    localStorage.removeItem('whatsapp_discount_shown');
    localStorage.removeItem('whatsapp_discount_timestamp');
    location.reload();
}

// Función para detectar si viene de un enlace de WhatsApp específico
function trackWhatsAppSource() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    
    if (utmSource === 'whatsapp' || utmMedium === 'whatsapp') {
        console.log('📊 Tracking WhatsApp source:', {
            source: utmSource,
            medium: utmMedium,
            campaign: utmCampaign
        });
        
        // Enviar datos específicos de campaña
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_campaign_access', {
                campaign_name: utmCampaign || 'default',
                traffic_type: 'whatsapp_link'
            });
        }
    }
}

// Agregar estilos de animación dinámicamente
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    document.head.appendChild(style);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('📋 DOM cargado - Iniciando sistema de descuentos');
    
    // Agregar estilos de animación
    addAnimationStyles();
    
    // Rastrear fuente de WhatsApp
    trackWhatsAppSource();
    
    // Inicializar sistema de precios
    initPricingDisplay();
});

// Opcional: Detectar cambios en la URL para SPAs
window.addEventListener('popstate', function() {
    console.log('🔄 Cambio de URL detectado - Verificando descuentos');
    initPricingDisplay();
});

// Exponer funciones globalmente para debugging
window.WhatsAppDiscount = {
    test: testWhatsAppDiscount,
    reset: resetPricing,
    detect: detectWhatsAppAccess,
    show: showWhatsAppDiscount,
    hasBeenShown: hasDiscountBeenShown
};

console.log('💬 Sistema de descuentos de WhatsApp cargado exitosamente');
console.log('🛠️ Para testing usa: WhatsAppDiscount.test() o WhatsAppDiscount.reset()');

// Agregar listener para enlaces de WhatsApp
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href*="wa.me"], a[href*="whatsapp"], .whatsapp-cta');
    if (link) {
        // Tracking de clics en enlaces de WhatsApp
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                event_category: 'whatsapp',
                event_label: link.href || link.textContent,
                transport_type: 'beacon'
            });
        }
        
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Contact');
        }
        
        console.log('📱 Click en enlace de WhatsApp registrado');
    }
});
