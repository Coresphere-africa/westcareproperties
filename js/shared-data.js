/**
 * WESTCARE PROPERTIES LTD - SHARED DATA MANAGEMENT SYSTEM
 * This centralized system ensures all pages stay synchronized with backend data
 */

class WestcareDataManager {
    constructor() {
        this.initializeDefaultData();
        this.setupStorageListeners();
    }

    // Initialize default data if not already present
    initializeDefaultData() {
        const defaults = {
            branding: {
                companyName: 'Westcare Properties Ltd',
                tagline: 'Your Trusted Real Estate Partner',
                phone: '0723 466916',
                email: 'info@westcare-properties.com',
                address: 'Nairobi, Kenya',
                logo: null,
                primaryColor: '#2e7d32',
                secondaryColor: '#1b5e20',
                accentColor: '#ffb300'
            },
            socialMedia: {
                facebook: 'https://facebook.com/westcareproperties',
                twitter: 'https://twitter.com/westcareprops',
                instagram: 'https://instagram.com/westcareproperties',
                linkedin: 'https://linkedin.com/company/westcare-properties',
                whatsapp: '+254723466916'
            },
            properties: [],
            agents: [],
            blogPosts: [],
            images: [],
            testimonials: [],
            websiteSettings: {
                maintenanceMode: false,
                theme: 'light',
                notificationsEnabled: true
            }
        };

        for (const [key, value] of Object.entries(defaults)) {
            if (!localStorage.getItem(`wcData_${key}`)) {
                localStorage.setItem(`wcData_${key}`, JSON.stringify(value));
            }
        }
    }

    // Get branding data
    getBranding() {
        return JSON.parse(localStorage.getItem('wcData_branding') || '{}');
    }

    // Update branding data
    updateBranding(updates) {
        const current = this.getBranding();
        const updated = { ...current, ...updates };
        localStorage.setItem('wcData_branding', JSON.stringify(updated));
        this.notifyObservers('branding', updated);
        return updated;
    }

    // Get social media data
    getSocialMedia() {
        return JSON.parse(localStorage.getItem('wcData_socialMedia') || '{}');
    }

    // Get all properties
    getProperties() {
        return JSON.parse(localStorage.getItem('wcData_properties') || '[]');
    }

    // Add property
    addProperty(property) {
        const properties = this.getProperties();
        property.id = Date.now().toString();
        properties.push(property);
        localStorage.setItem('wcData_properties', JSON.stringify(properties));
        this.notifyObservers('properties', properties);
        return property;
    }

    // Update property
    updateProperty(id, updates) {
        const properties = this.getProperties();
        const index = properties.findIndex(p => p.id === id);
        if (index !== -1) {
            properties[index] = { ...properties[index], ...updates };
            localStorage.setItem('wcData_properties', JSON.stringify(properties));
            this.notifyObservers('properties', properties);
        }
        return properties[index];
    }

    // Delete property
    deleteProperty(id) {
        const properties = this.getProperties().filter(p => p.id !== id);
        localStorage.setItem('wcData_properties', JSON.stringify(properties));
        this.notifyObservers('properties', properties);
    }

    // Get all agents
    getAgents() {
        return JSON.parse(localStorage.getItem('wcData_agents') || '[]');
    }

    // Add agent
    addAgent(agent) {
        const agents = this.getAgents();
        agent.id = Date.now().toString();
        agents.push(agent);
        localStorage.setItem('wcData_agents', JSON.stringify(agents));
        this.notifyObservers('agents', agents);
        return agent;
    }

    // Delete agent
    deleteAgent(id) {
        const agents = this.getAgents().filter(a => a.id !== id);
        localStorage.setItem('wcData_agents', JSON.stringify(agents));
        this.notifyObservers('agents', agents);
    }

    // Get all blog posts
    getBlogPosts() {
        return JSON.parse(localStorage.getItem('wcData_blogPosts') || '[]');
    }

    // Add blog post
    addBlogPost(post) {
        const posts = this.getBlogPosts();
        post.id = Date.now().toString();
        post.createdAt = new Date().toISOString();
        posts.push(post);
        localStorage.setItem('wcData_blogPosts', JSON.stringify(posts));
        this.notifyObservers('blogPosts', posts);
        return post;
    }

    // Delete blog post
    deleteBlogPost(id) {
        const posts = this.getBlogPosts().filter(p => p.id !== id);
        localStorage.setItem('wcData_blogPosts', JSON.stringify(posts));
        this.notifyObservers('blogPosts', posts);
    }

    // Get all images
    getImages() {
        return JSON.parse(localStorage.getItem('wcData_images') || '[]');
    }

    // Add image
    addImage(image) {
        const images = this.getImages();
        image.id = Date.now().toString();
        images.push(image);
        localStorage.setItem('wcData_images', JSON.stringify(images));
        this.notifyObservers('images', images);
        return image;
    }

    // Delete image
    deleteImage(id) {
        const images = this.getImages().filter(img => img.id !== id);
        localStorage.setItem('wcData_images', JSON.stringify(images));
        this.notifyObservers('images', images);
    }

    // Get testimonials
    getTestimonials() {
        return JSON.parse(localStorage.getItem('wcData_testimonials') || '[]');
    }

    // Observer pattern for real-time updates
    setupStorageListeners() {
        this.observers = {};
        window.addEventListener('storage', (e) => {
            if (e.key && e.key.startsWith('wcData_')) {
                const dataType = e.key.replace('wcData_', '');
                const newData = JSON.parse(e.newValue || '{}');
                this.notifyObservers(dataType, newData);
            }
        });
    }

    subscribe(dataType, callback) {
        if (!this.observers[dataType]) {
            this.observers[dataType] = [];
        }
        this.observers[dataType].push(callback);
    }

    notifyObservers(dataType, data) {
        if (this.observers[dataType]) {
            this.observers[dataType].forEach(callback => callback(data));
        }
    }
}

// Global instance
const wcData = new WestcareDataManager();
