/* ===== CHAD GPT STORE - CUTTING-EDGE JAVASCRIPT ===== */

class ChadGPTStore {
    constructor() {
        this.cart = [];
        this.products = [];
        this.searchSuggestions = [];
        this.currentFilter = 'all';
        this.isLoading = false;
        
        this.init();
    }

    init() {
        this.loadProducts();
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.animateStats();
        this.setupSearchFunctionality();
    }

    /* ===== PRODUCT DATA & LOADING ===== */
    loadProducts() {
        // Simulate loading with cutting-edge products
        this.products = [
            {
                id: 1,
                title: "Neural Interface Headset",
                description: "Direct brain-computer interface for ultimate productivity",
                price: 2999.99,
                category: "tech",
                emoji: "🧠",
                rating: 5
            },
            {
                id: 2,
                title: "Quantum Phone Case",
                description: "Quantum entangled protection for your device",
                price: 199.99,
                category: "tech",
                emoji: "📱",
                rating: 5
            },
            {
                id: 3,
                title: "Holographic Sneakers",
                description: "Self-lacing shoes with AR display capabilities",
                price: 899.99,
                category: "fashion",
                emoji: "👟",
                rating: 4
            },
            {
                id: 4,
                title: "Smart Coffee Mug",
                description: "Temperature-controlled with mood detection",
                price: 149.99,
                category: "lifestyle",
                emoji: "☕",
                rating: 4
            },
            {
                id: 5,
                title: "Levitating Plant Pot",
                description: "Magnetic levitation meets sustainable living",
                price: 599.99,
                category: "lifestyle",
                emoji: "🌱",
                rating: 5
            },
            {
                id: 6,
                title: "Cyberpunk Jacket",
                description: "LED-embedded fashion with climate control",
                price: 1299.99,
                category: "fashion",
                emoji: "🧥",
                rating: 5
            },
            {
                id: 7,
                title: "AI Drone Assistant",
                description: "Personal AI companion that follows you around",
                price: 3999.99,
                category: "tech",
                emoji: "🚁",
                rating: 5
            },
            {
                id: 8,
                title: "Memory Foam Pillow 2.0",
                description: "Dreams-recording smart pillow with sleep analysis",
                price: 399.99,
                category: "lifestyle",
                emoji: "💤",
                rating: 4
            }
        ];

        this.searchSuggestions = this.products.map(p => p.title);
        this.displayProducts();
    }

    displayProducts(productsToShow = null) {
        const productsGrid = document.getElementById('products-grid');
        const loader = document.getElementById('products-loader');
        
        if (!productsGrid) return;

        // Show loader
        loader.style.display = 'flex';
        
        setTimeout(() => {
            const products = productsToShow || this.products;
            const filteredProducts = this.currentFilter === 'all' 
                ? products 
                : products.filter(p => p.category === this.currentFilter);

            productsGrid.innerHTML = '';

            filteredProducts.forEach((product, index) => {
                const productCard = this.createProductCard(product);
                productCard.style.animationDelay = `${index * 0.1}s`;
                productsGrid.appendChild(productCard);
            });

            // Hide loader
            loader.style.display = 'none';
        }, 500);
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product__card';
        card.setAttribute('data-category', product.category);
        
        card.innerHTML = `
            <div class="product__image">
                ${product.emoji}
            </div>
            <h3 class="product__title">${product.title}</h3>
            <p class="product__description">${product.description}</p>
            <div class="product__rating">
                ${'⭐'.repeat(product.rating)}
            </div>
            <div class="product__price">$${product.price}</div>
            <div class="product__actions">
                <button class="btn btn--primary btn--small" onclick="store.addToCart(${product.id})">
                    Add to Cart
                </button>
                <button class="btn btn--secondary btn--small" onclick="store.quickView(${product.id})">
                    Quick View
                </button>
            </div>
        `;

        return card;
    }

    /* ===== CART FUNCTIONALITY ===== */
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }

        this.updateCartUI();
        this.showNotification(`${product.title} added to cart!`, 'success');
        this.animateCartButton();
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCartUI();
        this.showNotification('Item removed from cart', 'info');
    }

    updateCartQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.updateCartUI();
        }
    }

    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

        // Update cart count
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.classList.toggle('show', totalItems > 0);

        // Update cart items
        if (cartItems) {
            if (this.cart.length === 0) {
                cartItems.innerHTML = '<div class="cart__empty">Your cart is empty</div>';
            } else {
                cartItems.innerHTML = this.cart.map(item => `
                    <div class="cart__item">
                        <div class="cart__item-image">${item.emoji}</div>
                        <div class="cart__item-info">
                            <div class="cart__item-title">${item.title}</div>
                            <div class="cart__item-price">$${item.price}</div>
                        </div>
                        <div class="cart__item-quantity">
                            <button class="quantity__btn" onclick="store.updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <input type="number" class="quantity__input" value="${item.quantity}" 
                                   onchange="store.updateCartQuantity(${item.id}, this.value)" min="1">
                            <button class="quantity__btn" onclick="store.updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                            <button class="quantity__btn" onclick="store.removeFromCart(${item.id})" style="margin-left: 1rem; color: red;">✕</button>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Update total
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (cartTotal) {
            cartTotal.textContent = `$${total.toFixed(2)}`;
        }
    }

    animateCartButton() {
        const cartBtn = document.getElementById('cart-btn');
        cartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 200);
    }

    /* ===== SEARCH FUNCTIONALITY ===== */
    setupSearchFunctionality() {
        const searchInput = document.getElementById('search-input');
        const searchSuggestions = document.getElementById('search-suggestions');
        const searchBtn = document.getElementById('search-btn');

        if (!searchInput || !searchSuggestions) return;

        let searchTimeout;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.toLowerCase().trim();

            if (query.length === 0) {
                searchSuggestions.classList.remove('show');
                this.displayProducts();
                return;
            }

            searchTimeout = setTimeout(() => {
                this.performSearch(query);
                this.showSearchSuggestions(query, searchSuggestions);
            }, 300);
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch(searchInput.value.toLowerCase().trim());
                searchSuggestions.classList.remove('show');
            }
        });

        searchBtn.addEventListener('click', () => {
            this.performSearch(searchInput.value.toLowerCase().trim());
            searchSuggestions.classList.remove('show');
        });

        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
                searchSuggestions.classList.remove('show');
            }
        });
    }

    performSearch(query) {
        if (!query) {
            this.displayProducts();
            return;
        }

        const filteredProducts = this.products.filter(product => 
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );

        this.displayProducts(filteredProducts);
        
        if (filteredProducts.length === 0) {
            document.getElementById('products-grid').innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                    <h3>No products found for "${query}"</h3>
                    <p>Try a different search term or browse all products.</p>
                </div>
            `;
        }
    }

    showSearchSuggestions(query, container) {
        const suggestions = this.searchSuggestions.filter(suggestion => 
            suggestion.toLowerCase().includes(query)
        ).slice(0, 5);

        if (suggestions.length > 0) {
            container.innerHTML = suggestions.map(suggestion => 
                `<div class="search__suggestion" onclick="store.selectSuggestion('${suggestion}')">${suggestion}</div>`
            ).join('');
            container.classList.add('show');
        } else {
            container.classList.remove('show');
        }
    }

    selectSuggestion(suggestion) {
        const searchInput = document.getElementById('search-input');
        const searchSuggestions = document.getElementById('search-suggestions');
        
        searchInput.value = suggestion;
        searchSuggestions.classList.remove('show');
        this.performSearch(suggestion.toLowerCase());
    }

    /* ===== FILTER FUNCTIONALITY ===== */
    setupEventListeners() {
        // Navigation toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navClose = document.getElementById('nav-close');

        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('show-menu');
                navToggle.classList.toggle('active');
            });
        }

        if (navClose) {
            navClose.addEventListener('click', () => {
                navMenu.classList.remove('show-menu');
                navToggle.classList.remove('active');
            });
        }

        // Cart modal
        const cartBtn = document.getElementById('cart-btn');
        const cartModal = document.getElementById('cart-modal');
        const cartCloseBtn = document.getElementById('cart-close');

        if (cartBtn) {
            cartBtn.addEventListener('click', () => {
                cartModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        }

        if (cartCloseBtn) {
            cartCloseBtn.addEventListener('click', () => {
                cartModal.classList.remove('show');
                document.body.style.overflow = 'auto';
            });
        }

        // Close cart when clicking outside
        if (cartModal) {
            cartModal.addEventListener('click', (e) => {
                if (e.target === cartModal) {
                    cartModal.classList.remove('show');
                    document.body.style.overflow = 'auto';
                }
            });
        }

        // Product filters
        const filterBtns = document.querySelectorAll('.filter__btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Update current filter and display products
                this.currentFilter = btn.dataset.filter;
                this.displayProducts();
            });
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    // Close mobile menu if open
                    navMenu.classList.remove('show-menu');
                    navToggle.classList.remove('active');
                }
            });
        });

        // Checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (this.cart.length === 0) {
                    this.showNotification('Your cart is empty!', 'warning');
                    return;
                }
                this.showNotification('Redirecting to checkout... (Demo)', 'success');
                // In a real store, this would redirect to checkout
            });
        }

        // Active navigation link highlighting
        this.setupActiveNavigation();
    }

    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active-link');
                }
            });
        });
    }

    /* ===== INTERSECTION OBSERVER FOR ANIMATIONS ===== */
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe product cards and feature elements
        setTimeout(() => {
            document.querySelectorAll('.product__card, .feature, .stat').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'all 0.6s ease';
                observer.observe(el);
            });
        }, 100);
    }

    /* ===== SMOOTH SCROLLING ENHANCEMENTS ===== */
    setupSmoothScrolling() {
        // Add scroll-based header styling
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }

    /* ===== STATS ANIMATION ===== */
    animateStats() {
        const animateValue = (element, start, end, duration) => {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const current = Math.floor(progress * (end - start) + start);
                element.textContent = current;
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.target);
                    animateValue(entry.target, 0, target, 2000);
                    observer.unobserve(entry.target);
                }
            });
        });

        document.querySelectorAll('.stat__number').forEach(stat => {
            observer.observe(stat);
        });
    }

    /* ===== NOTIFICATION SYSTEM ===== */
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">✕</button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#6366f1'};
            color: white;
            border-radius: 0.5rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 1001;
            display: flex;
            align-items: center;
            gap: 1rem;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 4000);
    }

    /* ===== QUICK VIEW FUNCTIONALITY ===== */
    quickView(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        // Create modal content
        const modalContent = `
            <div class="quick-view-modal" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1002;
                backdrop-filter: blur(5px);
            ">
                <div class="quick-view-content" style="
                    background: white;
                    padding: 2rem;
                    border-radius: 1rem;
                    max-width: 500px;
                    width: 90%;
                    text-align: center;
                    transform: scale(0.8);
                    transition: transform 0.3s ease;
                ">
                    <button onclick="this.closest('.quick-view-modal').remove()" style="
                        position: absolute;
                        top: 1rem;
                        right: 1rem;
                        background: none;
                        border: none;
                        font-size: 1.5rem;
                        cursor: pointer;
                    ">✕</button>
                    <div style="font-size: 4rem; margin-bottom: 1rem;">${product.emoji}</div>
                    <h3 style="margin-bottom: 0.5rem; font-size: 1.5rem;">${product.title}</h3>
                    <p style="color: #6b7280; margin-bottom: 1rem;">${product.description}</p>
                    <div style="margin-bottom: 1rem;">${'⭐'.repeat(product.rating)}</div>
                    <div style="font-size: 1.5rem; font-weight: bold; color: #6366f1; margin-bottom: 1.5rem;">$${product.price}</div>
                    <button onclick="store.addToCart(${product.id}); this.closest('.quick-view-modal').remove();" 
                            class="btn btn--primary">Add to Cart</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalContent);
        
        // Animate in
        setTimeout(() => {
            const content = document.querySelector('.quick-view-content');
            if (content) {
                content.style.transform = 'scale(1)';
            }
        }, 100);

        // Close on outside click
        document.querySelector('.quick-view-modal').addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-view-modal')) {
                e.target.remove();
            }
        });
    }

    /* ===== PERFORMANCE OPTIMIZATIONS ===== */
    lazyLoadImages() {
        // Future implementation for image lazy loading
    }

    preloadCriticalResources() {
        // Preload critical CSS and JS
    }
}

/* ===== INITIALIZE STORE ===== */
let store;

document.addEventListener('DOMContentLoaded', () => {
    store = new ChadGPTStore();
    
    // Add some extra cutting-edge features
    addParallaxEffect();
    addCursorTrail();
    addKeyboardShortcuts();
});

/* ===== ADDITIONAL CUTTING-EDGE FEATURES ===== */

function addParallaxEffect() {
    const heroElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        heroElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            element.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.02}deg)`;
        });
    });
}

function addCursorTrail() {
    let dots = [];
    let mouse = { x: 0, y: 0 };

    // Create dots
    for (let i = 0; i < 12; i++) {
        let dot = document.createElement('div');
        dot.className = 'cursor-dot';
        document.body.appendChild(dot);
        dots.push(dot);
    }

    // Style dots
    const style = document.createElement('style');
    style.textContent = `
        .cursor-dot {
            position: fixed;
            width: 8px;
            height: 8px;
            background: linear-gradient(135deg, #6366f1, #06b6d4);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // Track mouse
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Animate dots
    function animateDots() {
        let x = mouse.x;
        let y = mouse.y;

        dots.forEach((dot, index) => {
            let nextDot = dots[index + 1] || dots[0];
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            dot.style.opacity = '1';
            dot.style.transform = `scale(${(dots.length - index) / dots.length})`;
            
            x += (nextDot.getBoundingClientRect().left - x) * 0.3;
            y += (nextDot.getBoundingClientRect().top - y) * 0.3;
        });

        requestAnimationFrame(animateDots);
    }

    animateDots();
}

function addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('search-input').focus();
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            document.querySelector('.cart__modal.show')?.classList.remove('show');
            document.querySelector('.quick-view-modal')?.remove();
            document.body.style.overflow = 'auto';
        }
        
        // Arrow keys for navigation
        if (e.key === 'ArrowDown' && e.altKey) {
            e.preventDefault();
            window.scrollBy(0, 100);
        }
        if (e.key === 'ArrowUp' && e.altKey) {
            e.preventDefault();
            window.scrollBy(0, -100);
        }
    });
}

/* ===== CSS ANIMATIONS INJECTION ===== */
const additionalStyles = `
    .search__suggestion {
        padding: 0.75rem 1rem;
        cursor: pointer;
        transition: background-color 0.2s ease;
        border-bottom: 1px solid var(--border-color);
    }
    
    .search__suggestion:hover {
        background-color: var(--body-color);
    }
    
    .search__suggestion:last-child {
        border-bottom: none;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .nav__cart:hover {
        animation: pulse 0.5s ease-in-out;
    }
    
    .product__card:hover .product__image {
        transform: scale(1.05);
    }
    
    .btn:active {
        transform: translateY(-1px) scale(0.98);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

console.log('🚀 Chad GPT Store initialized with cutting-edge features!');