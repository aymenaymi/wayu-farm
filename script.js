// Wayu Farms Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.querySelector('i').classList.toggle('fa-bars');
        mobileToggle.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.querySelector('i').classList.add('fa-bars');
            mobileToggle.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        
        // Add shadow to header on scroll
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.padding = '0.5rem 0';
            header.style.backgroundColor = 'rgba(45, 90, 39, 0.98)';
        } else {
            header.style.padding = '1rem 0';
            header.style.backgroundColor = 'rgba(45, 90, 39, 0.95)';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animate stats counter
    const animateCounter = () => {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200; // Lower = faster
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounter(), 1);
            } else {
                counter.innerText = target;
            }
        });
    };
    
    // Initialize counter when in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-container');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Product Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productsGrid = document.getElementById('products-grid');
    const productsLoading = document.getElementById('products-loading');
    
    // Load products from JSON file or API
    const loadProducts = async (filter = 'all') => {
        productsLoading.style.display = 'block';
        
        try {
            // In a real application, this would fetch from an API
            // For now, we'll use mock data
            const mockProducts = [
                {
                    id: 1,
                    name: "Fresh Tomatoes",
                    category: "vegetables",
                    price: "ETB 120/kg",
                    image: "public/images/tomatoes.jpg",
                    description: "Organic, sun-ripened tomatoes"
                },
                {
                    id: 2,
                    name: "Sweet Mangoes",
                    category: "fruits",
                    price: "ETB 150/kg",
                    image: "public/images/mangoes.jpg",
                    description: "Seasonal, sweet mangoes"
                },
                {
                    id: 3,
                    name: "Organic Maize",
                    category: "grains",
                    price: "ETB 80/kg",
                    image: "public/images/maize.jpg",
                    description: "High-quality organic maize"
                },
                {
                    id: 4,
                    name: "Fresh Cabbages",
                    category: "vegetables",
                    price: "ETB 60/head",
                    image: "public/images/cabbage.jpg",
                    description: "Fresh, crisp cabbages"
                },
                {
                    id: 5,
                    name: "Avocados",
                    category: "fruits",
                    price: "ETB 40/each",
                    image: "public/images/avocado.jpg",
                    description: "Creamy, ripe avocados"
                },
                {
                    id: 6,
                    name: "Wheat Flour",
                    category: "grains",
                    price: "ETB 120/kg",
                    image: "public/images/wheat.jpg",
                    description: "Stone-ground wheat flour"
                },
                {
                    id: 7,
                    name: "Farm Fresh Milk",
                    category: "dairy",
                    price: "ETB 50/liter",
                    image: "public/images/milk.jpg",
                    description: "Fresh, pasteurized milk"
                },
                {
                    id: 8,
                    name: "Organic Eggs",
                    category: "dairy",
                    price: "ETB 10/each",
                    image: "public/images/eggs.jpg",
                    description: "Free-range chicken eggs"
                }
            ];
            
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Filter products
            const filteredProducts = filter === 'all' 
                ? mockProducts 
                : mockProducts.filter(product => product.category === filter);
            
            // Display products
            displayProducts(filteredProducts);
            
        } catch (error) {
            console.error('Error loading products:', error);
            productsGrid.innerHTML = '<p class="error-message">Failed to load products. Please try again later.</p>';
        } finally {
            productsLoading.style.display = 'none';
        }
    };
    
    // Display products in grid
    const displayProducts = (products) => {
        if (products.length === 0) {
            productsGrid.innerHTML = '<p class="no-products">No products found in this category.</p>';
            return;
        }
        
        productsGrid.innerHTML = products.map(product => `
            <div class="product-card" data-category="${product.category}">
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'">
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                    <h3>${product.name}</h3>
                    <p class="product-price">${product.price}</p>
                    <p>${product.description}</p>
                </div>
            </div>
        `).join('');
    };
    
    // Initialize product filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Load filtered products
            const filter = button.getAttribute('data-filter');
            loadProducts(filter);
        });
    });
    
    // Load initial products
    loadProducts();
    
    // Initialize map (simulated - in real app would use Leaflet/Google Maps API)
    const initMap = () => {
        const mapContainer = document.getElementById('farmMap');
        if (mapContainer) {
            // This is where you would initialize a real map
            // For demonstration, we'll just show a placeholder
            console.log('Map would be initialized here for Gujizone, Borena coordinates');
        }
    };
    
    initMap();
    
    // Weather Widget (simulated)
    const updateWeather = () => {
        const weatherTemp = document.querySelector('.weather-temp');
        if (weatherTemp) {
            // Simulate fetching weather data
            // In a real app, you would use a weather API
            const temperatures = ['24°C Sunny', '22°C Partly Cloudy', '26°C Clear', '21°C Light Rain'];
            const randomTemp = temperatures[Math.floor(Math.random() * temperatures.length)];
            
            // Simulate loading delay
            setTimeout(() => {
                weatherTemp.textContent = randomTemp;
            }, 1000);
        }
    };
    
    updateWeather();
    
    // Order Form Submission
    const orderForm = document.getElementById('orderForm');
    const submitOrderBtn = document.getElementById('submitOrder');
    const orderSpinner = document.getElementById('orderSpinner');
    const submitText = document.getElementById('submitText');
    const orderMessage = document.getElementById('orderMessage');
    
    if (orderForm) {
        orderForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            submitText.style.display = 'none';
            orderSpinner.classList.remove('hidden');
            submitOrderBtn.disabled = true;
            orderMessage.style.display = 'none';
            
            // Get form data
            const formData = new FormData(orderForm);
            const data = Object.fromEntries(formData);
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                orderMessage.textContent = 'Thank you for your order! We will contact you shortly to confirm.';
                orderMessage.className = 'form-message success';
                orderMessage.style.display = 'block';
                
                // Reset form
                orderForm.reset();
                
                // Scroll to message
                orderMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
            } catch (error) {
                // Show error message
                orderMessage.textContent = 'There was an error submitting your order. Please try again or call us directly.';
                orderMessage.className = 'form-message error';
                orderMessage.style.display = 'block';
            } finally {
                // Reset button state
                submitText.style.display = 'inline';
                orderSpinner.classList.add('hidden');
                submitOrderBtn.disabled = false;
            }
        });
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const submitContactBtn = document.getElementById('submitContact');
    const contactSpinner = document.getElementById('contactSpinner');
    const contactSubmitText = document.getElementById('contactSubmitText');
    const contactMessageDiv = document.getElementById('contactMessageDiv');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            contactSubmitText.style.display = 'none';
            contactSpinner.classList.remove('hidden');
            submitContactBtn.disabled = true;
            contactMessageDiv.style.display = 'none';
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                contactMessageDiv.textContent = 'Thank you for your message! We will get back to you within 24 hours.';
                contactMessageDiv.className = 'form-message success';
                contactMessageDiv.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Scroll to message
                contactMessageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
            } catch (error) {
                // Show error message
                contactMessageDiv.textContent = 'There was an error sending your message. Please try again or call us directly.';
                contactMessageDiv.className = 'form-message error';
                contactMessageDiv.style.display = 'block';
            } finally {
                // Reset button state
                contactSubmitText.style.display = 'inline';
                contactSpinner.classList.add('hidden');
                submitContactBtn.disabled = false;
            }
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            
            // Simple validation
            if (email && email.includes('@')) {
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Product filter links in footer
    document.querySelectorAll('.footer-links a[data-filter]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = link.getAttribute('data-filter');
            
            // Scroll to products section
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            
            // Trigger filter after a short delay
            setTimeout(() => {
                const filterBtn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
                if (filterBtn) {
                    filterBtn.click();
                } else {
                    // If no exact filter, show all products
                    document.querySelector('.filter-btn[data-filter="all"]').click();
                }
            }, 500);
        });
    });
});