// Playbooks Module - Modular playbooks content and functionality
class PlaybooksModule {
    constructor() {
        this.playbooks = [
            {
                id: 1,
                title: "The Vibe Coding Guide",
                difficulty: "Beginner",
                duration: "30 min",
                category: "Development Philosophy",
                description: "Master the art of intuitive development, flow states, and creative coding practices that make programming feel natural and enjoyable.",
                topics: ["Vibe Coding", "Flow State", "Intuitive Development", "Creative Programming", "Mindfulness", "Productivity"],
                prerequisites: ["Basic Programming Knowledge", "Open Mindset", "Willingness to Experiment"],
                contentType: "markdown",
                markdownFile: "assets/playbooks/vibe-coding-guide.md"
            },
            {
                id: 2,
                title: "Building Real-Time Chatbots with WebSockets",
                difficulty: "Intermediate",
                duration: "60 min",
                category: "Full Stack",
                description: "Master WebSocket implementation for building real-time chatbots with React UI, FastAPI backend, and LLM integration with RAG setup.",
                topics: ["WebSockets", "React", "FastAPI", "LLM Integration", "RAG", "Real-time Communication"],
                prerequisites: ["React Basics", "Node.js/Python", "API Development", "WebSocket Concepts"],
                contentType: "markdown",
                markdownFile: "assets/playbooks/real-time-chatbots-websockets.md"
            },
            {
                id: 4,
                title: "Advanced Docker & ECS Deployment Patterns",
                difficulty: "Intermediate",
                duration: "60 min",
                category: "DevOps",
                description: "Master Docker multi-stage builds, ECS service definitions, blue-green deployments, and cost optimization strategies for production environments.",
                topics: ["Docker", "ECS", "Multi-stage Builds", "Blue-Green Deployment", "Cost Optimization", "Production Patterns"],
                prerequisites: ["Docker Basics", "AWS Fundamentals", "Container Concepts", "CI/CD Knowledge"],
                contentType: "markdown",
                markdownFile: "assets/playbooks/advanced-docker-ecs-deployment.md"
            },
            {
                id: 5,
                title: "Building High-Performance APIs with gRPC and Node.js",
                difficulty: "Intermediate",
                duration: "60 min",
                category: "Backend",
                description: "Master gRPC protocol buffers, streaming implementations, connection pooling, and performance optimization for high-throughput APIs.",
                topics: ["gRPC", "Protocol Buffers", "Node.js", "Streaming", "Performance Optimization", "Load Balancing"],
                prerequisites: ["Node.js Advanced", "API Design", "Performance Concepts", "Networking Basics"],
                contentType: "markdown",
                markdownFile: "assets/playbooks/high-performance-grpc-nodejs.md"
            }
        ];

        // Initialize the playbooks module
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
            return markdown; // Return raw markdown, not parsed HTML
        } catch (error) {
            console.error('Error loading markdown file:', error);
            return `<p>Error loading content: ${error.message}</p>`;
        }
    }

    // Simple markdown parser (reuse from blog module)
    markdownParser = {
        parse: (markdown) => {
            // Check if marked is available, otherwise fall back to simple parser
            if (typeof marked !== 'undefined') {
                const html = marked.parse(markdown);
                // Add table class for styling
                return html.replace(/<table>/g, '<table class="markdown-table">');
            } else {
                // Fallback simple parser
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
        }
    };

    // Get all playbooks
    getPlaybooks() {
        return this.playbooks;
    }

    // Get playbook by ID
    getPlaybook(id) {
        return this.playbooks.find(playbook => playbook.id === id);
    }

    // Show full playbook
    async showFullPlaybook(id) {
        console.log('showFullPlaybook called with id:', id);
        const playbook = this.getPlaybook(id);
        if (!playbook) {
            return '<div class="error">Playbook not found</div>';
        }

        let content = '';
        
        if (playbook.contentType === 'markdown' && playbook.markdownFile) {
            try {
                console.log('Loading markdown file:', playbook.markdownFile);
                const markdown = await this.loadMarkdownFile(playbook.markdownFile);
                
                // Remove the title line and the following blank line, but preserve the rest
                const cleanMarkdown = markdown.replace(/^# .+\n\n/m, '');
                
                // Force use of marked.js if available
                if (typeof marked !== 'undefined') {
                    content = marked.parse(cleanMarkdown);
                    // Add table class for styling
                    content = content.replace(/<table>/g, '<table class="markdown-table">');
                    console.log('Using marked.js parser with table styling');
                } else {
                    // Use fallback parser
                    content = this.markdownParser.parse(cleanMarkdown);
                    console.log('Using fallback parser');
                }
                
                // Also remove any H1 tags that might contain the title after parsing
                const titleRegex = new RegExp(`<h1[^>]*>.*${playbook.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*</h1>`, 'gi');
                content = content.replace(titleRegex, '');
                
                // Remove any remaining H1 tags
                content = content.replace(/<h1[^>]*>.*?<\/h1>/gi, '');
                
                // Ensure content is wrapped in post-content div for proper styling (same as blog)
                if (!content.includes('class="post-content"')) {
                    content = `<div class="post-content">${content}</div>`;
                }
                
                console.log('Content wrapped with post-content class');
                
            } catch (error) {
                console.error('Error loading playbook content:', error);
                content = `<div class="post-content"><p>Error loading content: ${error.message}</p></div>`;
            }
        } else if (playbook.contentType === 'markdown' && !playbook.markdownFile) {
            // Parse inline markdown content
            content = this.markdownParser.parse(playbook.content);
            content = `<div class="post-content">${content}</div>`;
        }
        
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="playbook-viewer">
                    <button class="back-btn" onclick="window.location.href='#tech-playbooks'; if(typeof pageManager !== 'undefined') pageManager.loadPage('tech-playbooks');">
                        ← Back to Playbooks
                    </button>
                    
                    <div class="playbook-header">
                        <div class="playbook-info">
                            <h1>${playbook.title}</h1>
                            <p>${playbook.description}</p>
                            
                            <div class="playbook-meta">
                                <span class="playbook-category">${playbook.category}</span>
                                <span class="playbook-difficulty ${playbook.difficulty.toLowerCase()}">${playbook.difficulty}</span>
                                <span class="playbook-duration">⏱️ ${playbook.duration}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="playbook-content">
                        ${content}
                    </div>
                </div>
            `;
        }
    }

    // Generate playbook cards
    generatePlaybookCard(playbook) {
        const difficultyClass = playbook.difficulty.toLowerCase();
        return `
            <article class="playbook-card">
                <div class="card-header">
                    <span class="playbook-category">${playbook.category}</span>
                    <span class="playbook-difficulty ${difficultyClass}">${playbook.difficulty}</span>
                </div>
                
                <div class="card-content">
                    <h3>${playbook.title}</h3>
                    <p class="playbook-description">${playbook.description}</p>
                    
                    <div class="playbook-meta">
                        <span class="duration">⏱️ ${playbook.duration}</span>
                        <span class="topics-count">📚 ${playbook.topics.length} topics</span>
                    </div>
                    
                    <div class="playbook-topics">
                        ${playbook.topics.slice(0, 3).map(topic => 
                            `<span class="topic-tag">${topic}</span>`
                        ).join('')}
                        ${playbook.topics.length > 3 ? `<span class="topic-tag">+${playbook.topics.length - 3} more</span>` : ''}
                    </div>
                </div>
                
                <div class="card-footer" style="margin-top: 1rem; padding-top: 1rem;">
                    <button class="start-playbook-btn" onclick="if(typeof playbookModule !== 'undefined') playbookModule.showFullPlaybook(${playbook.id}); else console.error('playbookModule not available');">
                        Start Playbook →
                    </button>
                </div>
            </article>
        `;
    }

    // Generate playbooks grid
    generatePlaybooksGrid() {
        const playbooks = this.getPlaybooks();
        const featuredPlaybook = playbooks[0];
        const recentPlaybooks = playbooks.slice(1, 4);
        
        return `
            <div class="blog-container">
                <div class="page-header">
                    <h2>Playbooks</h2>
                    <p>Sharing on information that worked out for me</p>
                </div>
                
                ${this.generateFeaturedPlaybook(featuredPlaybook)}
                ${this.generateRecentPlaybooksSection(recentPlaybooks)}
            </div>
        `;
    }

    // Generate featured playbook
    generateFeaturedPlaybook(playbook) {
        if (!playbook) return '';
        
        return `
            <section class="featured-post">
                <div class="featured-content">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                        <span class="playbook-category" style="display: inline-block; max-width: fit-content;">${playbook.category}</span>
                        <span class="playbook-difficulty ${playbook.difficulty.toLowerCase()}">${playbook.difficulty}</span>
                    </div>
                    <h3>${playbook.title}</h3>
                    <p class="post-excerpt">${playbook.description}</p>
                    <div class="playbook-meta">
                        <span class="duration">⏱️ ${playbook.duration}</span>
                        <span class="topics-count">📚 ${playbook.topics.length} topics</span>
                    </div>
                    <div class="playbook-topics">
                        ${playbook.topics.slice(0, 3).map(topic => 
                            `<span class="topic-tag">${topic}</span>`
                        ).join('')}
                        ${playbook.topics.length > 3 ? `<span class="topic-tag">+${playbook.topics.length - 3} more</span>` : ''}
                    </div>
                    <button class="read-more-btn" onclick="if(typeof playbookModule !== 'undefined') playbookModule.showFullPlaybook(${playbook.id}); else console.error('playbookModule not available');">
                        Start Playbook →
                    </button>
                </div>
            </section>
        `;
    }

    // Generate recent playbooks section
    generateRecentPlaybooksSection(playbooks) {
        if (!playbooks.length) return '';
        
        const gridHTML = playbooks.map(playbook => this.generatePlaybookCard(playbook)).join('');
        
        return `
            <section class="recent-posts">
                <h2>More Playbooks</h2>
                <div class="playbooks-grid">
                    ${gridHTML}
                </div>
            </section>
        `;
    }

    // Generate playbooks content for page manager
    generatePlaybooksContent() {
        return this.generatePlaybooksGrid();
    }

    // Add new playbook
    addPlaybook(playbook) {
        this.playbooks.push({
            ...playbook,
            id: this.playbooks.length + 1
        });
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PlaybooksModule;
} else {
    window.PlaybooksModule = PlaybooksModule;
}
