// Blog Module - Modular blog content and functionality
class BlogModule {
    constructor() {
        // Configure marked for table support
        if (typeof marked !== 'undefined') {
            marked.setOptions({
                breaks: true,
                gfm: true, // GitHub Flavored Markdown (includes tables)
                tables: true,
                sanitize: false,
                smartLists: true,
                smartypants: true
            });
        }
        
        // Use marked library for reliable markdown parsing
        this.markdownParser = {
            parse: (markdown) => {
                // Check if marked is available, otherwise fall back to simple parser
                if (typeof marked !== 'undefined') {
                    const html = marked.parse(markdown);
                    // Add table class for styling
                    return html.replace(/<table>/g, '<table class="markdown-table">');
                } else {
                    // Fallback simple parser
                    return this.simpleMarkdownParse(markdown);
                }
            },
            
            simpleMarkdownParse: (markdown) => {
                let html = markdown;
                
                // Headers
                html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
                html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
                html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
                
                // Bold
                html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
                
                // Italic
                html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
                html = html.replace(/_(.+?)_/g, '<em>$1</em>');
                
                // Code blocks
                html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
                    const div = document.createElement('div');
                    div.textContent = code.trim();
                    return `<pre><code class="language-${lang || 'text'}">${div.innerHTML}</code></pre>`;
                });
                
                // Inline code
                html = html.replace(/`(.+?)`/g, '<code>$1</code>');
                
                // Links
                html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
                
                // Lists
                html = html.replace(/^\* (.+)$/gim, '<li>$1</li>');
                html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
                
                html = html.replace(/^\d+\. (.+)$/gim, '<li>$1</li>');
                
                // Line breaks
                html = html.replace(/\n\n/g, '</p><p>');
                html = html.replace(/\n/g, '<br>');
                
                // Wrap in paragraphs if not already wrapped
                if (!html.startsWith('<')) {
                    html = '<p>' + html + '</p>';
                }
                
                return html;
            }
        };
        
        // Static escapeHtml method
        this.escapeHtml = (text) => {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        
        this.blogPosts = [
            {
                id: 1,
                title: "The Art and Science of Software Estimations: A Practical Guide",
                excerpt: "Master software estimation techniques with proven strategies, real-world examples, and data-driven approaches to deliver accurate project timelines.",
                category: "Project Management",
                date: "2025-01-22",
                readTime: "14 min",
                tags: ["estimations", "project-management", "agile", "planning"],
                contentType: "markdown",
                markdownFile: "assets/blog/software-estimations-guide.md"
            },
            {
                id: 2,
                title: "Integrating Generative AI into Modern Web Applications",
                excerpt: "Practical strategies for implementing Gen AI capabilities in web applications, from chat interfaces to automated content generation.",
                category: "Gen AI",
                date: "2025-08-18",
                readTime: "10 min",
                tags: ["genai", "openai", "javascript", "web-development"],
                contentType: "markdown",
                markdownFile: "assets/blog/generative-ai-web-applications.md"
            },
            {
                id: 3,
                title: "GenAI Risks and Guardrails: A Practical Guide to Safe AI Implementation",
                excerpt: "Understanding critical GenAI risks like memory poisoning and hallucinations, and implementing effective guardrails including temperature control, multi-LLM evaluation, and safety filters.",
                category: "Gen AI",
                date: "2026-01-04",
                readTime: "15 min",
                tags: ["genai", "safety", "guardrails", "hallucinations", "ai-security"],
                contentType: "markdown",
                markdownFile: "assets/blog/genai-risks-guardrails.md"
            },
            {
                id: 4,
                title: "AWS Lambda Cold Start Explained (With Fixes)",
                excerpt: "Deep dive into AWS Lambda cold start issues, their causes, performance impact, and proven strategies to minimize or eliminate cold starts in production.",
                category: "Serverless",
                date: "2025-04-25",
                readTime: "11 min",
                tags: ["aws", "lambda", "cold-start", "performance", "serverless"],
                contentType: "markdown",
                markdownFile: "assets/blog/aws-lambda-cold-start.md"
            },
            {
                id: 5,
                title: "Building Scalable Microservices with Node.js",
                excerpt: "Learn how to design and implement microservices architecture using Node.js, Express, and modern deployment practices.",
                category: "Architecture",
                date: "2026-01-27",
                readTime: "8 min",
                tags: ["microservices", "nodejs", "architecture", "scalability"],
                contentType: "markdown",
                markdownFile: "assets/blog/building-scalable-microservices.md"
            }
        ];

        // Initialize the blog module
        this.init();
    }

    // Initialize method
    init() {
        // Any initialization code can go here
    }

    // Methods for content management
    async loadMarkdownFile(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load markdown file: ${filePath}`);
            }
            const markdown = await response.text();
            return this.markdownParser.parse(markdown);
        } catch (error) {
            console.error('Error loading markdown file:', error);
            return `<p>Error loading content: ${error.message}</p>`;
        }
    }

    async loadBlogPostFromMarkdown(postData) {
        const content = await this.loadMarkdownFile(postData.markdownFile);
        return {
            ...postData,
            content,
            contentType: 'markdown'
        };
    }

    addBlogPost(post) {
        this.blogPosts.unshift({
            ...post,
            id: this.blogPosts.length + 1,
            date: new Date().toISOString().split('T')[0]
        });
    }

    // Utility methods for markdown blog management
    async addMarkdownBlogPostFromFile(postData) {
        const fullPost = await this.loadBlogPostFromMarkdown(postData);
        this.addBlogPost(fullPost);
    }

    // Helper method to create new markdown blog posts
    createMarkdownBlogPost(title, excerpt, category, tags, readTime, markdownFileName) {
        return {
            title,
            excerpt,
            category,
            tags,
            readTime,
            contentType: 'markdown',
            markdownFile: `assets/blog/${markdownFileName}`,
            date: new Date().toISOString().split('T')[0]
        };
    }

    // Method to initialize sample markdown posts (for demonstration)
    async initializeSampleMarkdownPosts() {
        const samplePosts = [
            this.createMarkdownBlogPost(
                "Building Scalable Microservices with Node.js",
                "Learn how to design and implement microservices architecture using Node.js, Express, and modern deployment practices.",
                "Architecture",
                ["microservices", "nodejs", "architecture", "scalability"],
                "8 min",
                "building-scalable-microservices.md"
            ),
            this.createMarkdownBlogPost(
                "React Performance Optimization Tips",
                "Essential techniques for optimizing React applications including memoization, code splitting, and bundle size reduction.",
                "Frontend",
                ["react", "performance", "optimization", "frontend"],
                "6 min",
                "react-performance-tips.md"
            )
        ];

        for (const post of samplePosts) {
            await this.addMarkdownBlogPostFromFile(post);
        }
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
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    async showFullPost(postId) {
        const post = this.blogPosts.find(p => p.id === postId);
        if (!post) return;
        
        let content = post.content;
        
        // If it's a markdown post with a markdownFile, load and parse it
        if (post.contentType === 'markdown' && post.markdownFile) {
            content = await this.loadMarkdownFile(post.markdownFile);
            // Remove the first H1 header from markdown content to avoid duplication
            content = content.replace(/^<h1[^>]*>.*?<\/h1>/i, '');
        } else if (post.contentType === 'markdown' && !post.markdownFile) {
            // Parse inline markdown content
            content = this.markdownParser.parse(post.content);
            // Remove the first H1 header from markdown content to avoid duplication
            content = content.replace(/^<h1[^>]*>.*?<\/h1>/i, '');
        }
        
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
                            ${post.contentType === 'markdown' ? '<span class="post-format">📝 Markdown</span>' : ''}
                        </div>
                        <div class="post-tags">
                            ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </header>
                    <div class="post-content">
                        ${content}
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

    renderBlogPosts() {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;

        const posts = this.getBlogPosts();
        const categories = this.getCategories();

        mainContent.innerHTML = `
            <div class="blog-container">
                <header class="blog-header">
                    <h1>Tech Blog</h1>
                    <p>Insights on modern software development</p>
                </header>
                
                ${this.generateFeaturedPost(posts[0])}
                ${this.generateRecentPostsSection(posts.slice(1, 4))}
                ${this.generateCategoriesSection(categories)}
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

    // Method for PageManager compatibility
    generateTechBlogContent() {
        const posts = this.getBlogPosts();
        const categories = this.getCategories();

        return `
            <div class="page-header">
                <h2>Tech Blog</h2>
                <p>Insights on modern software development</p>
            </div>
            
            <div class="blog-container">
                ${this.generateFeaturedPost(posts[0])}
                ${this.generateRecentPostsSection(posts.slice(1))}
                ${this.generateCategoriesSection()}
            </div>
        `;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlogModule;
} else {
    window.BlogModule = BlogModule;
}

// Initialize the blog module
const blogModule = new BlogModule();
