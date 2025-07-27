// Sample project data
const projects = {
    web: [
        {
            id: 1,
            title: "E-Commerce Website",
            description: "Full-featured online store with payment integration",
            image: "Dee 2.jpg",
            tech: ["React", "Node.js", "MongoDB", "Stripe API"]
        },
        {
            id: 2,
            title: "Corporate Website",
            description: "Modern business website with CMS integration",
            image: "Dee 2.jpg",
            tech: ["WordPress", "PHP", "JavaScript", "MySQL"]
        },
        {
            id: 3,
            title: "Portfolio Website",
            description: "Creative portfolio for a photographer",
            image: "Dee 2.jpg",
            tech: ["HTML5", "CSS3", "JavaScript", "GSAP"]
        },
        {
            id: 4,
            title: "Web Application",
            description: "Custom CRM solution for small business",
            image: "Dee 2.jpg",
            tech: ["Vue.js", "Laravel", "PostgreSQL", "REST API"]
        }
    ],
    design: [
        {
            id: 1,
            title: "Brand Identity",
            description: "Complete branding package for startup",
            image: "Dee 2.jpg"
        },
        {
            id: 2,
            title: "Logo Design",
            description: "Minimalist logo for tech company",
            image: "Dee 2.jpg"
        },
        {
            id: 3,
            title: "Marketing Materials",
            description: "Brochures and flyers for real estate",
            image: "Dee 2.jpg"
        },
        {
            id: 4,
            title: "Social Media Graphics",
            description: "Instagram templates for influencer",
            image: "Dee 2.jpg"
        },
        {
            id: 5,
            title: "Packaging Design",
            description: "Product packaging for cosmetics line",
            image: "Dee 2.jpg"
        }
    ],
    video: [
        {
            id: 1,
            title: "Commercial Video",
            description: "30-second TV spot for local business",
            video: "assets/videos/commercial.mp4",
            thumbnail: "Dee 2.jpg"
        },
        {
            id: 2,
            title: "Event Coverage",
            description: "Highlights from corporate conference",
            video: "assets/videos/event.mp4",
            thumbnail: "assets/images/video-projects/event.jpg"
        },
        {
            id: 3,
            title: "Product Demo",
            description: "Showcasing features of new tech product",
            video: "assets/videos/product.mp4",
            thumbnail: "assets/images/video-projects/product.jpg"
        }
    ]
};

// Initialize the gallery
document.addEventListener('DOMContentLoaded', function() {
    // Load all projects
    loadWebProjects();
    loadDesignProjects();
    loadVideoProjects();
    
    // Initialize design gallery animation
    initDesignGallery();
    
    // Filter functionality
    setupFilterButtons();
    
    // Modal functionality
    setupModal();
});

function loadWebProjects() {
    const webGallery = document.querySelector('.web-gallery');
    
    projects.web.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'gallery-item';
        projectItem.dataset.id = project.id;
        projectItem.dataset.category = 'web';
        
        projectItem.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="item-caption">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;
        
        webGallery.appendChild(projectItem);
    });
}

function loadDesignProjects() {
    const designGallery = document.querySelector('.design-gallery');
    
    projects.design.forEach((project, index) => {
        const projectItem = document.createElement('div');
        projectItem.className = `design-item ${index === 0 ? 'active' : ''}`;
        projectItem.dataset.id = project.id;
        
        projectItem.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="design-caption">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;
        
        designGallery.appendChild(projectItem);
    });
}

function loadVideoProjects() {
    const videoGallery = document.querySelector('.video-gallery');
    
    projects.video.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'gallery-item';
        projectItem.dataset.id = project.id;
        projectItem.dataset.category = 'video';
        
        projectItem.innerHTML = `
            <video poster="${project.thumbnail}" muted loop>
                <source src="${project.video}" type="video/mp4">
            </video>
            <div class="item-caption">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;
        
        videoGallery.appendChild(projectItem);
    });
}

function initDesignGallery() {
    const designItems = document.querySelectorAll('.design-item');
    let currentIndex = 0;
    
    // Auto-rotate every 3 seconds
    setInterval(() => {
        designItems[currentIndex].classList.remove('active');
        
        // Get random next index (excluding current)
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * designItems.length);
        } while (nextIndex === currentIndex && designItems.length > 1);
        
        currentIndex = nextIndex;
        designItems[currentIndex].classList.add('active');
    }, 3000);
}

function setupFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryCategories = document.querySelectorAll('.gallery-category');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Show/hide categories based on filter
            galleryCategories.forEach(category => {
                if (filter === 'all' || category.dataset.category === filter) {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            });
        });
    });
}

function setupModal() {
    const modal = document.querySelector('.project-modal');
    const modalContent = document.querySelector('.modal-content');
    const modalBody = document.querySelector('.modal-body');
    const closeModal = document.querySelector('.close-modal');
    
    // Handle gallery item clicks
    document.addEventListener('click', function(e) {
        const galleryItem = e.target.closest('.gallery-item');
        
        if (galleryItem) {
            e.preventDefault();
            const category = galleryItem.dataset.category;
            const id = parseInt(galleryItem.dataset.id);
            
            // Find the project
            const project = projects[category].find(p => p.id === id);
            
            if (project) {
                // Populate modal
                let mediaContent = '';
                if (category === 'video') {
                    mediaContent = `
                        <video controls autoplay>
                            <source src="${project.video}" type="video/mp4">
                        </video>
                    `;
                } else {
                    mediaContent = `<img src="${project.image}" alt="${project.title}">`;
                }
                
                let techContent = '';
                if (project.tech) {
                    techContent = `
                        <div class="modal-tech">
                            ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    `;
                }
                
                modalBody.innerHTML = `
                    ${mediaContent}
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                    ${techContent}
                `;
                
                // Show modal
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        }
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
    
    // Close when clicking outside modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Pause videos when modal closes
    modal.addEventListener('transitionend', function() {
        if (!modal.classList.contains('show')) {
            const videos = modalBody.querySelectorAll('video');
            videos.forEach(video => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });
}


// Ensure mobile menu works on gallery page
document.addEventListener('DOMContentLoaded', function() {
    // Fix for gallery page scrolling
    if (window.innerWidth <= 768) {
        document.documentElement.style.overflowX = 'hidden';
        document.body.style.overflowX = 'hidden';
    }
    
    // Close mobile menu when navigating
    const navLinks = document.querySelectorAll('.nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                document.querySelector('.mobile-menu-btn').classList.remove('active');
                document.querySelector('.nav').classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        // Reset mobile menu state on desktop
        document.querySelector('.mobile-menu-btn').classList.remove('active');
        document.querySelector('.nav').classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});
