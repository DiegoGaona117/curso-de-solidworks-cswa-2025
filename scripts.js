<!-- JavaScript -->
        // DOM Content Loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Remove loading state
            const content = document.getElementById('main-content');
            content.classList.remove('loading');
            content.classList.add('loaded');

            // Expandable content functionality
            const expandBtn = document.getElementById('expand-btn');
            const expandableContent = document.getElementById('expandable-content');
            let isExpanded = false;

            if (expandBtn && expandableContent) {
                expandBtn.addEventListener('click', function() {
                    isExpanded = !isExpanded;
                    
                    if (isExpanded) {
                        expandableContent.classList.add('show');
                        expandBtn.textContent = 'Ocultar';
                    } else {
                        expandableContent.classList.remove('show');
                        expandBtn.textContent = 'Ver Más CSWA';
                    }
                });
            }

            // CTA button tracking
            const ctaButtons = document.querySelectorAll('a[href*="hotmart.com"]');
            ctaButtons.forEach(button => {
                button.addEventListener('click', function() {
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'click', {
                            'event_category': 'CTA',
                            'event_label': 'Inscribirse Ahora'
                        });
                    }
                });
            });
        });

        // DNS prefetch for external resources
        const dnsLinks = [
            '//pay.hotmart.com',
            '//static.wixstatic.com'
        ];

        dnsLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = href;
            document.head.appendChild(link);
        });
