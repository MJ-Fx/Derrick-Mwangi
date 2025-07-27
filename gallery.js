// Gallery Data (Replace with your actual images)
const galleryData = [
    { 
        id: 1, 
        category: 'web', 
        image: 'Dee 1.jpg',
        title: 'E-commerce Website Design',
        desc: 'Modern e-commerce interface with seamless user experience'
    },
    { 
        id: 2, 
        category: 'graphic', 
        image: 'Dee 2.jpg',
        title: 'Brand Identity Package',
        desc: 'Complete branding for a tech startup'
    },
    { 
        id: 3, 
        category: 'photo', 
        image: 'Dee 5.jpg',
        title: 'Product Photography',
        desc: 'Professional product shots for marketing'
    },
    { 
        id: 4, 
        category: 'video', 
        image: 'Dee 1.jpg',
        title: 'Commercial Videography',
        desc: '30-second promotional video'
    },
    { 
        id: 5, 
        category: 'web', 
        image: 'Dee 2.jpg',
        title: 'Portfolio Website',
        desc: 'Minimalist design for creative professional'
    },
    { 
        id: 6, 
        category: 'graphic', 
        image: 'Dee 5.jpg',
        title: 'Event Poster Design',
        desc: 'Vibrant concert poster design'
    },
    { 
        id: 7, 
        category: 'photo', 
        image: 'Dee 1.jpg',
        title: 'Portrait Photography',
        desc: 'Professional headshot session'
    },
    { 
        id: 8, 
        category: 'video', 
        image: 'Dee 2.jpg',
        title: 'Corporate Video',
        desc: 'Company profile video production'
    }
];

// Gallery Variables
let currentFilter = 'all';
let visibleItems = 4;
let currentLightboxIndex = 0;

// DOM Elements
const galleryGrid = document.querySelector('.gallery-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const loadMoreBtn = document.getElementById('load-more-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Initialize Gallery
function initGallery() {
    renderGallery();
    setupEventListeners();
}

// Render Gallery Items
function renderGallery() {
    galleryGrid.innerHTML = '';
    const filteredData = currentFilter === 'all' 
        ? galleryData 
        : galleryData.filter(item => item.category === currentFilter);

    const itemsToShow = filteredData.slice(0, visibleItems);

    itemsToShow.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.category}`;
        galleryItem.dataset.index = index;
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="gallery-overlay">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                <button class="view-btn">View</button>
            </div>
        `;
        galleryGrid.appendChild(galleryItem);
    });

    // Show/hide load more button
    loadMoreBtn.style.display = visibleItems >= filteredData.length ? 'none' : 'block';
}

// Setup Event Listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.filter;
            visibleItems = 4;
            renderGallery();
        });
    });

    // Load more button
    loadMoreBtn.addEventListener('click', () => {
        visibleItems += 4;
        renderGallery();
    });

    // Gallery item clicks (delegated)
    galleryGrid.addEventListener('click', (e) => {
        const viewBtn = e.target.closest('.view-btn');
        const galleryItem = e.target.closest('.gallery-item');
        
        if (viewBtn && galleryItem) {
            openLightbox(parseInt(galleryItem.dataset.index));
        }
    });

    // Lightbox controls
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
    });
}

// Lightbox Functions
function openLightbox(index) {
    const filteredData = currentFilter === 'all' 
        ? galleryData 
        : galleryData.filter(item => item.category === currentFilter);
    
    currentLightboxIndex = index;
    const item = filteredData[index];
    
    lightboxImg.src = item.image;
    lightboxCaption.innerHTML = `<h3>${item.title}</h3><p>${item.desc}</p>`;
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showPrevImage() {
    const filteredData = currentFilter === 'all' 
        ? galleryData 
        : galleryData.filter(item => item.category === currentFilter);
    
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredData.length) % filteredData.length;
    const item = filteredData[currentLightboxIndex];
    
    lightboxImg.src = item.image;
    lightboxCaption.innerHTML = `<h3>${item.title}</h3><p>${item.desc}</p>`;
}

function showNextImage() {
    const filteredData = currentFilter === 'all' 
        ? galleryData 
        : galleryData.filter(item => item.category === currentFilter);
    
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredData.length;
    const item = filteredData[currentLightboxIndex];
    
    lightboxImg.src = item.image;
    lightboxCaption.innerHTML = `<h3>${item.title}</h3><p>${item.desc}</p>`;
}

// Initialize the gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', initGallery);
