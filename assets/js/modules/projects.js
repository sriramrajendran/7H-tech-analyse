// Projects Module - Modular projects content and functionality
class ProjectsModule {
    constructor() {
        this.projects = [
            {
                id: 1,
                title: "Real Time Market Analysis",
                category: "FinTech",
                status: "Active",
                description: "Real-time marker analysis on demand for portfolio and watchlist with US market analysis and crypto market analysis. Features chart pattern analysis, technical analysis based on indicators, and candlestick pattern analysis.",
                technologies: ["HTML", "CSS", "JavaScript", "GitHub Pages", "Chart.js", "Lucide Icons"],
                features: [
                    "Real-time market analysis on demand",
                    "Portfolio and watchlist analysis",
                    "US market analysis and crypto market analysis",
                    "Chart pattern analysis",
                    "Technical analysis based on indicators",
                    "Candlestick pattern analysis",
                    "Code embedded in this app"
                ],
                githubUrl: "https://github.com/sriramrajendran/7h-beaconoftech",
                demoUrl: "https://sriramrajendran.github.io/7h-beaconoftech",
                            },
            {
                id: 2,
                title: "Stock Analysis Engine",
                category: "FinTech",
                status: "Active",
                description: "Comprehensive analysis of the market, stocks, ETFs, crypto, and more. Features scheduled checks, alerting via push notifications, and enables users to set up alerts for specific stocks, ETFs, crypto, etc.",
                technologies: ["Python", "JavaScript", "API Integration", "Data Analysis", "Notification Systems"],
                features: [
                    "Analysis of market, stocks, ETFs, crypto, etc.",
                    "Scheduled checks and monitoring",
                    "Alerting via push notifications",
                    "Custom alerts for specific stocks, ETFs, crypto",
                    "Automated market scanning"
                ],
                githubUrl: "https://github.com/sriramrajendran/7h-stock-analyzer",
                demoUrl: null,
                            },
            {
                id: 3,
                title: "Gen AI based Educator",
                category: "AI/EdTech",
                status: "In Development",
                description: "Expert analysis on stocks, mortgages, real estate, and more with personified experience. Provides explanations in terms of a user's loan, mortgage, and financial situations.",
                technologies: ["Python", "FastAPI", "OpenAI", "ChromaDB", "Langgraph", "Docker", "GitHub Actions", "GitHub Pages", "React", "TailwindCSS", "NodeJS"],
                features: [
                    "Expert analysis on stocks, mortgages, real estate",
                    "Personified AI experience",
                    "Explanations in terms of user's loan and mortgage",
                    "Interactive learning modules",
                    "Real-time financial education"
                ],
                githubUrl: "https://github.com/sriramrajendran/7h-stock-analyzer",
                demoUrl: null,
                            }
        ];
    }

    generateProjectsContent() {
        return `
            <div class="page-header">
                <h2>Projects</h2>
                <p>Explore the work - intended for educational purposes</p>
            </div>
            
            <div class="projects-container">
                ${this.generateProjectStats()}
                ${this.generateProjectFilters()}
                ${this.generateProjectsGrid()}
            </div>
        `;
    }

    generateProjectStats() {
        const stats = this.getProjectStats();
        return `
            <section class="project-stats">
                <div class="stats-grid">
                    <div class="stat-card">
                        <h3>${stats.total}</h3>
                        <p>Total Projects</p>
                    </div>
                    <div class="stat-card">
                        <h3>${stats.active}</h3>
                        <p>Active Projects</p>
                    </div>
                    <div class="stat-card">
                        <h3>${stats.completed}</h3>
                        <p>Completed</p>
                    </div>
                </div>
            </section>
        `;
    }

    generateProjectFilters() {
        const categories = this.getCategories();
        const statuses = this.getStatuses();
        
        return `
            <section class="project-filters">
                <div class="filter-group">
                    <h4>Category</h4>
                    <div class="filter-options">
                        <button class="filter-btn active" onclick="projectsModule.filterProjects('all')">
                            All
                        </button>
                        ${categories.map(cat => `
                            <button class="filter-btn" onclick="projectsModule.filterProjects('category', '${cat}')">
                                ${cat}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="filter-group">
                    <h4>Status</h4>
                    <div class="filter-options">
                        <button class="filter-btn" onclick="projectsModule.filterProjects('status', 'Active')">
                            Active
                        </button>
                        <button class="filter-btn" onclick="projectsModule.filterProjects('status', 'Completed')">
                            Completed
                        </button>
                        <button class="filter-btn" onclick="projectsModule.filterProjects('status', 'In Development')">
                            In Development
                        </button>
                    </div>
                </div>
            </section>
        `;
    }

    generateProjectsGrid() {
        return `
            <section class="projects-grid">
                ${this.projects.map(project => this.generateProjectCard(project)).join('')}
            </section>
        `;
    }

    generateProjectCard(project) {
        const statusClass = project.status.toLowerCase().replace(/\s+/g, '-');
        
        return `
            <article class="project-card">
                <div class="card-header">
                    <span class="project-category">${project.category}</span>
                    <span class="project-status ${statusClass}">${project.status}</span>
                </div>
                
                <div class="card-content">
                    <h3>${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    
                                        
                    <div class="project-technologies">
                        <h4>Technologies</h4>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => 
                                `<span class="tech-tag">${tech}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="project-features">
                        <h4>Key Features</h4>
                        <ul>
                            ${project.features.slice(0, 3).map(feature => 
                                `<li>${feature}</li>`
                            ).join('')}
                            ${project.features.length > 3 ? 
                                `<li class="more-features">+${project.features.length - 3} more features</li>` : ''
                            }
                        </ul>
                    </div>
                    
                                        
                    <div class="project-actions">
                        <a href="${project.githubUrl}" target="_blank" class="action-btn primary">
                            📂 View Code
                        </a>
                        ${project.demoUrl ? `
                            <a href="${project.demoUrl}" target="_blank" class="action-btn secondary">
                                🚀 Live Demo
                            </a>
                        ` : ''}
                        <button class="action-btn tertiary" onclick="projectsModule.showProjectDetails(${project.id})">
                            📊 Details
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    showProjectDetails(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;
        
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="project-details">
                <button class="back-btn" onclick="projectsModule.showProjectsList()">
                    ← Back to Projects
                </button>
                
                <div class="project-header">
                    <div class="project-info">
                        <h1>${project.title}</h1>
                        <p>${project.description}</p>
                        
                        <div class="project-meta-header">
                            <span class="project-category">${project.category}</span>
                            <span class="project-status ${project.status.toLowerCase().replace(/\s+/g, '-')}">${project.status}</span>
                        </div>
                    </div>
                    
                    <div class="project-actions-header">
                        <a href="${project.githubUrl}" target="_blank" class="action-btn primary">
                            📂 View Code
                        </a>
                        ${project.demoUrl ? `
                            <a href="${project.demoUrl}" target="_blank" class="action-btn secondary">
                                🚀 Live Demo
                            </a>
                        ` : ''}
                    </div>
                </div>
                
                <div class="project-content">
                    ${this.generateDetailedProjectSections(project)}
                </div>
            </div>
        `;
    }

    generateDetailedProjectSections(project) {
        return `
            <section class="project-section">
                <h2>Technologies Used</h2>
                <div class="tech-grid">
                    ${project.technologies.map(tech => `
                        <div class="tech-card">
                            <h4>${tech}</h4>
                            <p>Core technology component</p>
                        </div>
                    `).join('')}
                </div>
            </section>
            
            <section class="project-section">
                <h2>Features</h2>
                <div class="features-list">
                    ${project.features.map(feature => `
                        <div class="feature-item">
                            <span class="feature-icon">✅</span>
                            <span class="feature-text">${feature}</span>
                        </div>
                    `).join('')}
                </div>
            </section>
            
            <section class="project-section">
                <h2>Project Gallery</h2>
                <div class="project-gallery">
                    <div class="gallery-placeholder">
                        <p>📸 Project screenshots and media will be displayed here</p>
                    </div>
                </div>
            </section>
        `;
    }

    showProjectsList() {
        if (typeof pageManager !== 'undefined') {
            pageManager.loadPage('tech-projects');
        }
    }

    filterProjects(type, value) {
        let filtered = this.projects;
        
        if (type === 'all') {
            filtered = this.projects;
        } else if (type === 'category') {
            filtered = this.projects.filter(p => p.category === value);
        } else if (type === 'status') {
            filtered = this.projects.filter(p => p.status === value);
        }
        
        this.displayFilteredProjects(filtered);
    }

    displayFilteredProjects(projects) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="page-header">
                <h2>Projects</h2>
                <p>Filtered results (${projects.length} projects)</p>
            </div>
            
            <div class="projects-container">
                <button class="clear-filter-btn" onclick="projectsModule.showProjectsList()">
                    Clear Filter
                </button>
                
                <section class="projects-grid">
                    ${projects.map(project => this.generateProjectCard(project)).join('')}
                </section>
            </div>
        `;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    getProjectStats() {
        const total = this.projects.length;
        const active = this.projects.filter(p => p.status === 'Active').length;
        const completed = this.projects.filter(p => p.status === 'Completed').length;
        
        return { total, active, completed };
    }

    getCategories() {
        return [...new Set(this.projects.map(p => p.category))];
    }

    getStatuses() {
        return [...new Set(this.projects.map(p => p.status))];
    }

    // Content management methods
    addProject(project) {
        this.projects.push({
            ...project,
            id: this.projects.length + 1
        });
    }

    updateProject(projectId, updates) {
        const index = this.projects.findIndex(p => p.id === projectId);
        if (index !== -1) {
            this.projects[index] = { ...this.projects[index], ...updates };
        }
    }

    deleteProject(projectId) {
        this.projects = this.projects.filter(p => p.id !== projectId);
    }

    getProjects() {
        return this.projects;
    }

    getProject(projectId) {
        return this.projects.find(p => p.id === projectId);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectsModule;
} else {
    window.ProjectsModule = ProjectsModule;
}
