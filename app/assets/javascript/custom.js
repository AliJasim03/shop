// Enhanced JavaScript functionality for the shop

document.addEventListener("turbolinks:load", function() {
    // Notification handling
    const notifications = document.querySelectorAll('.global-notification');

    notifications.forEach(notification => {
        // Auto-hide notifications after 4 seconds
        setTimeout(() => {
            fadeOut(notification);
        }, 4000);

        // Add click-to-dismiss functionality
        const closeBtn = notification.querySelector('.delete');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                fadeOut(notification);
            });
        }
    });

    // Handle cart badge animation
    const addToCartButtons = document.querySelectorAll('button[data-cart-action="add"]');
    const cartCount = document.querySelector('.cart-count');

    if (addToCartButtons.length > 0 && cartCount) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                cartCount.classList.add('animated');

                setTimeout(() => {
                    cartCount.classList.remove('animated');
                }, 500);
            });
        });
    }

    // Enhanced product image handling
    const productImage = document.querySelector('.product-image');

    if (productImage) {
        // Existing image preview functionality
        this.addEventListener('change', handleFileSelect, false);

        // Enhanced preview styling
        const previewContainer = document.getElementById('list');
        if (previewContainer) {
            previewContainer.classList.add('preview-container');
        }
    }

    // Feature image hover zoom effect
    const featureImage = document.querySelector('.feature-image img');

    if (featureImage) {
        const featureImageContainer = featureImage.parentElement;

        featureImageContainer.addEventListener('mousemove', function(e) {
            const { left, top, width, height } = this.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;

            featureImage.style.transformOrigin = `${x * 100}% ${y * 100}%`;
        });

        featureImageContainer.addEventListener('mouseenter', function() {
            featureImage.style.transform = 'scale(1.1)';
        });

        featureImageContainer.addEventListener('mouseleave', function() {
            featureImage.style.transform = 'scale(1)';
        });
    }

    // Mobile menu handling
    const navbarBurgers = document.querySelectorAll('.navbar-burger');

    if (navbarBurgers.length > 0) {
        navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }

    // Sticky sidebar on product page
    const sidebar = document.querySelector('.product-sidebar');

    if (sidebar) {
        const sidebarTop = sidebar.offsetTop;

        window.addEventListener('scroll', () => {
            if (window.scrollY > sidebarTop - 20) {
                sidebar.classList.add('is-sticky');
            } else {
                sidebar.classList.remove('is-sticky');
            }
        });
    }

    // Handle form validation styling
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            input.addEventListener('invalid', () => {
                input.classList.add('is-danger');
                const helpText = input.nextElementSibling;

                if (helpText && helpText.classList.contains('help')) {
                    helpText.classList.add('is-danger');
                }
            });

            input.addEventListener('input', () => {
                if (input.validity.valid) {
                    input.classList.remove('is-danger');
                    const helpText = input.nextElementSibling;

                    if (helpText && helpText.classList.contains('help')) {
                        helpText.classList.remove('is-danger');
                    }
                }
            });
        });
    });
});

// Helper function to fade out elements
function fadeOut(element) {
    let opacity = 1;
    const timer = setInterval(() => {
        if (opacity <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = opacity;
        opacity -= 0.1;
    }, 50);
}

// Product image file selection handler
function handleFileSelect(evt) {
    const files = evt.target.files;
    const list = document.getElementById('list');

    if (!list) return;

    // Clear previous previews
    list.innerHTML = '';
    list.classList.add('preview-grid');

    // Process each selected file
    for (let i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
            continue;
        }

        const reader = new FileReader();

        reader.onload = (function(theFile) {
            return function(e) {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                previewItem.innerHTML = [
                    '<img class="product-preview-thumb" src="', e.target.result,
                    '" title="', escape(theFile.name), '"/>',
                    '<span class="preview-filename">', theFile.name, '</span>'
                ].join('');

                list.appendChild(previewItem);
            };
        })(f);

        reader.readAsDataURL(f);
    }
}