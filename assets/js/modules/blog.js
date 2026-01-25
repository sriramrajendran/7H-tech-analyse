// Blog Module - Modular blog content and functionality
class BlogModule {
    constructor() {
        this.blogPosts = [
            {
                id: 1,
                title: "Building Modern Web Applications with Microservices",
                excerpt: "Explore the architecture patterns and best practices for developing scalable microservices-based applications.",
                category: "Architecture",
                date: "2024-01-15",
                readTime: "8 min",
                tags: ["microservices", "architecture", "scalability"],
                content: `
                    <h2>Building Modern Web Applications with Microservices</h2>
                    <p>In today's rapidly evolving digital landscape, microservices architecture has emerged as a powerful approach to building scalable, maintainable web applications. This comprehensive guide explores the key principles, patterns, and best practices for implementing microservices effectively.</p>
                    
                    <h3>Understanding Microservices Architecture</h3>
                    <p>Microservices architecture is an architectural style that structures an application as a collection of loosely coupled, independently deployable services. Each service is organized around a specific business capability and can be developed, deployed, and scaled independently.</p>
                    
                    <h3>Key Benefits</h3>
                    <ul>
                        <li><strong>Scalability:</strong> Individual services can be scaled based on demand</li>
                        <li><strong>Flexibility:</strong> Different services can use different technologies</li>
                        <li><strong>Resilience:</strong> Failure in one service doesn't affect the entire application</li>
                        <li><strong>Team Autonomy:</strong> Teams can work independently on different services</li>
                    </ul>
                    
                    <h3>Implementation Best Practices</h3>
                    <p>When implementing microservices, consider the following best practices:</p>
                    <ul>
                        <li>Define clear service boundaries based on business capabilities</li>
                        <li>Implement robust API design and versioning</li>
                        <li>Use containerization for consistent deployment</li>
                        <li>Implement proper monitoring and logging</li>
                        <li>Design for failure and implement circuit breakers</li>
                    </ul>
                    
                    <h3>Conclusion</h3>
                    <p>Microservices architecture offers significant benefits for modern web applications, but requires careful planning and implementation. By following best practices and learning from real-world experiences, development teams can build robust, scalable systems that meet the demands of today's users.</p>
                `
            },
            {
                id: 2,
                title: "Advanced JavaScript Patterns for Modern Development",
                excerpt: "Master essential JavaScript patterns and techniques for writing clean, maintainable code in modern web applications.",
                category: "JavaScript",
                date: "2024-01-10",
                readTime: "6 min",
                tags: ["javascript", "patterns", "best-practices"],
                content: `
                    <h2>Advanced JavaScript Patterns for Modern Development</h2>
                    <p>JavaScript has evolved significantly over the years, and understanding advanced patterns is crucial for writing clean, maintainable code. This article explores essential patterns that every modern JavaScript developer should know.</p>
                    
                    <h3>Module Pattern</h3>
                    <p>The module pattern is one of the most fundamental patterns in JavaScript for creating encapsulated code:</p>
                    <pre><code>const MyModule = (function() {
    let privateVariable = 'secret';
    
    function privateFunction() {
        return privateVariable;
    }
    
    return {
        publicMethod: function() {
            return privateFunction();
        }
    };
})();</code></pre>
                    
                    <h3>Observer Pattern</h3>
                    <p>The Observer pattern is perfect for implementing event-driven architectures:</p>
                    <pre><code>class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
}</code></pre>
                    
                    <h3>Promise Chain Pattern</h3>
                    <p>Mastering promise chains is essential for handling asynchronous operations:</p>
                    <pre><code>fetchUserData()
    .then(user => fetchUserPosts(user.id))
    .then(posts => processPosts(posts))
    .then(processedPosts => displayPosts(processedPosts))
    .catch(error => handleError(error));</code></pre>
                    
                    <h3>Conclusion</h3>
                    <p>These patterns form the foundation of modern JavaScript development. By understanding and applying them correctly, developers can write more maintainable, scalable, and efficient code.</p>
                `
            },
            {
                id: 3,
                title: "Cloud-Native Development: Best Practices and Strategies",
                excerpt: "Learn how to build and deploy cloud-native applications that leverage the full potential of cloud platforms.",
                category: "Cloud",
                date: "2024-01-05",
                readTime: "10 min",
                tags: ["cloud", "devops", "containers"],
                content: `
                    <h2>Cloud-Native Development: Best Practices and Strategies</h2>
                    <p>Cloud-native development represents a paradigm shift in how we build, deploy, and manage applications. This comprehensive guide covers the essential practices and strategies for successful cloud-native development.</p>
                    
                    <h3>What is Cloud-Native?</h3>
                    <p>Cloud-native refers to applications designed specifically to run in cloud environments, taking advantage of cloud computing's distributed, elastic nature. These applications are built using containers, microservices, and continuous delivery practices.</p>
                    
                    <h3>Core Principles</h3>
                    <ul>
                        <li><strong>Containerization:</strong> Package applications and their dependencies in containers</li>
                        <li><strong>Microservices:</strong> Break down applications into small, independent services</li>
                        <li><strong>Continuous Delivery:</strong> Automate build, test, and deployment processes</li>
                        <li><strong>DevOps Culture:</strong> Foster collaboration between development and operations</li>
                    </ul>
                    
                    <h3>Best Practices</h3>
                    <ul>
                        <li>Design for failure and implement proper error handling</li>
                        <li>Use infrastructure as code (IaC) for reproducible environments</li>
                        <li>Implement comprehensive monitoring and logging</li>
                        <li>Adopt GitOps for deployment management</li>
                        <li>Use service meshes for microservice communication</li>
                    </ul>
                    
                    <h3>Conclusion</h3>
                    <p>Cloud-native development requires a shift in mindset and practices, but offers significant benefits in terms of scalability, reliability, and maintainability. By following these best practices, teams can build robust cloud-native applications.</p>
                `
            }
        ];
    }

    generateTechBlogContent() {
        const featuredPost = this.blogPosts[0];
        const recentPosts = this.blogPosts.slice(1, 4);
        
        return `
            <div class="page-header">
                <h2>Tech Blog</h2>
                <p>Insights, tutorials, and best practices for modern software development</p>
            </div>
            
            <div class="blog-container">
                ${this.generateFeaturedPost(featuredPost)}
                ${this.generateRecentPostsSection(recentPosts)}
                ${this.generateCategoriesSection()}
            </div>
        `;
    }

    generateFeaturedPost(post) {
        return `
            <section class="featured-post">
                <div class="featured-content">
                    <span class="post-category">${post.category}</span>
                    <h3>${post.title}</h3>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <div class="post-meta">
                        <span class="post-date">${this.formatDate(post.date)}</span>
                        <span class="post-read-time">${post.readTime} read</span>
                    </div>
                    <button class="read-more-btn" onclick="blogModule.showFullPost(${post.id})">
                        Read Full Article
                    </button>
                </div>
            </section>
        `;
    }

    generateRecentPostsSection(posts) {
        return `
            <section class="recent-posts">
                <h3>Recent Articles</h3>
                <div class="posts-grid">
                    ${posts.map(post => this.generatePostCard(post)).join('')}
                </div>
            </section>
        `;
    }

    generatePostCard(post) {
        return `
            <article class="post-card">
                <div class="card-content">
                    <span class="post-category">${post.category}</span>
                    <h4>${post.title}</h4>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <div class="post-meta">
                        <span class="post-date">${this.formatDate(post.date)}</span>
                        <span class="post-read-time">${post.readTime}</span>
                    </div>
                    <button class="read-more-btn" onclick="blogModule.showFullPost(${post.id})">
                        Read More
                    </button>
                </div>
            </article>
        `;
    }

    generateCategoriesSection() {
        const categories = this.getCategories();
        return `
            <section class="categories-section">
                <h3>Categories</h3>
                <div class="categories-grid">
                    ${categories.map(category => `
                        <div class="category-card">
                            <h4>${category.name}</h4>
                            <p>${category.count} articles</p>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    }

    getCategories() {
        const categoryCount = {};
        this.blogPosts.forEach(post => {
            categoryCount[post.category] = (categoryCount[post.category] || 0) + 1;
        });
        
        return Object.keys(categoryCount).map(name => ({
            name,
            count: categoryCount[name]
        }));
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    showFullPost(postId) {
        const post = this.blogPosts.find(p => p.id === postId);
        if (!post) return;
        
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="full-post-container">
                <button class="back-btn" onclick="blogModule.showBlogList()">
                    ← Back to Blog
                </button>
                <article class="full-post">
                    <header class="post-header">
                        <span class="post-category">${post.category}</span>
                        <h1>${post.title}</h1>
                        <div class="post-meta">
                            <span class="post-date">${this.formatDate(post.date)}</span>
                            <span class="post-read-time">${post.readTime} read</span>
                        </div>
                        <div class="post-tags">
                            ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </header>
                    <div class="post-content">
                        ${post.content}
                    </div>
                </article>
            </div>
        `;
    }

    showBlogList() {
        if (typeof pageManager !== 'undefined') {
            pageManager.loadPage('tech-blog');
        }
    }

    // Methods for content management
    addBlogPost(post) {
        this.blogPosts.unshift({
            ...post,
            id: this.blogPosts.length + 1,
            date: new Date().toISOString().split('T')[0]
        });
    }

    updateBlogPost(postId, updates) {
        const index = this.blogPosts.findIndex(p => p.id === postId);
        if (index !== -1) {
            this.blogPosts[index] = { ...this.blogPosts[index], ...updates };
        }
    }

    deleteBlogPost(postId) {
        this.blogPosts = this.blogPosts.filter(p => p.id !== postId);
    }

    getBlogPosts() {
        return this.blogPosts;
    }

    getBlogPost(postId) {
        return this.blogPosts.find(p => p.id === postId);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlogModule;
} else {
    window.BlogModule = BlogModule;
}
