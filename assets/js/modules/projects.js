// Projects Module - Modular projects content and functionality
class ProjectsModule {
    constructor() {
        this.projects = [
            {
                id: 1,
                title: "Real-Time Stock Analysis Platform",
                category: "FinTech",
                status: "Active",
                description: "A comprehensive platform for real-time stock market analysis with advanced technical indicators and portfolio management.",
                technologies: ["React", "Node.js", "WebSocket", "MongoDB", "Chart.js"],
                features: [
                    "Real-time market data streaming",
                    "Advanced technical indicators",
                    "Portfolio tracking and analysis",
                    "Risk assessment tools",
                    "Custom alert system"
                ],
                githubUrl: "https://github.com/sriramrajendran/stock-analysis",
                demoUrl: "https://stock-analysis-demo.example.com",
                progress: 75,
                teamSize: 3,
                startDate: "2023-09-01",
                estimatedCompletion: "2024-03-01"
            },
            {
                id: 2,
                title: "Microservices E-commerce Platform",
                category: "E-Commerce",
                status: "Completed",
                description: "A scalable e-commerce platform built with microservices architecture, supporting high traffic and complex inventory management.",
                technologies: ["Node.js", "Docker", "Kubernetes", "Redis", "PostgreSQL"],
                features: [
                    "Microservices architecture",
                    "Auto-scaling infrastructure",
                    "Real-time inventory management",
                    "Payment gateway integration",
                    "Advanced analytics dashboard"
                ],
                githubUrl: "https://github.com/sriramrajendran/ecommerce-platform",
                demoUrl: "https://ecommerce-demo.example.com",
                progress: 100,
                teamSize: 5,
                startDate: "2023-01-15",
                completionDate: "2023-08-30"
            },
            {
                id: 3,
                title: "AI-Powered Code Review Assistant",
                category: "AI/ML",
                status: "In Development",
                description: "An intelligent code review tool that uses machine learning to identify potential issues, suggest improvements, and enforce coding standards.",
                technologies: ["Python", "TensorFlow", "Git API", "React", "FastAPI"],
                features: [
                    "Automated code quality analysis",
                    "Security vulnerability detection",
                    "Performance optimization suggestions",
                    "Coding standard enforcement",
                    "Integration with popular IDEs"
                ],
                githubUrl: "https://github.com/sriramrajendran/code-review-ai",
                demoUrl: null,
                progress: 45,
                teamSize: 4,
                startDate: "2023-11-01",
                estimatedCompletion: "2024-06-01"
            },
            {
                id: 4,
                title: "Cloud-Native CI/CD Pipeline",
                category: "DevOps",
                status: "Active",
                description: "A comprehensive CI/CD solution for cloud-native applications with automated testing, deployment, and monitoring.",
                technologies: ["Jenkins", "Docker", "Kubernetes", "Terraform", "Prometheus"],
                features: [
                    "Automated build and test pipelines",
                    "Multi-cloud deployment support",
                    "Infrastructure as code",
                    "Real-time monitoring and alerting",
                    "Rollback and recovery mechanisms"
                ],
                githubUrl: "https://github.com/sriramrajendran/cicd-pipeline",
                demoUrl: null,
                progress: 60,
                teamSize: 2,
                startDate: "2023-10-15",
                estimatedCompletion: "2024-02-15"
            }
        ];
    }

    generateProjectsContent() {
        return `
            <div class="page-header">
                <h2>Projects</h2>
                <p>Explore our portfolio of innovative technology projects</p>
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
                    <div class="stat-card">
                        <h3>${stats.teamMembers}</h3>
                        <p>Team Members</p>
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
        const progressColor = project.progress >= 75 ? 'success' : project.progress >= 50 ? 'warning' : 'danger';
        
        return `
            <article class="project-card">
                <div class="card-header">
                    <span class="project-category">${project.category}</span>
                    <span class="project-status ${statusClass}">${project.status}</span>
                </div>
                
                <div class="card-content">
                    <h3>${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    
                    <div class="project-progress">
                        <div class="progress-header">
                            <span>Progress</span>
                            <span class="progress-percentage">${project.progress}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill ${progressColor}" style="width: ${project.progress}%"></div>
                        </div>
                    </div>
                    
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
                    
                    <div class="project-meta">
                        <div class="meta-item">
                            <span class="meta-label">Team Size:</span>
                            <span class="meta-value">${project.teamSize} members</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Started:</span>
                            <span class="meta-value">${this.formatDate(project.startDate)}</span>
                        </div>
                        ${project.completionDate ? `
                            <div class="meta-item">
                                <span class="meta-label">Completed:</span>
                                <span class="meta-value">${this.formatDate(project.completionDate)}</span>
                            </div>
                        ` : project.estimatedCompletion ? `
                            <div class="meta-item">
                                <span class="meta-label">Est. Completion:</span>
                                <span class="meta-value">${this.formatDate(project.estimatedCompletion)}</span>
                            </div>
                        ` : ''}
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
                            <span class="team-size">👥 ${project.teamSize} members</span>
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
                <h2>Project Overview</h2>
                <div class="overview-grid">
                    <div class="overview-item">
                        <h3>Progress</h3>
                        <div class="progress-display">
                            <div class="progress-bar-large">
                                <div class="progress-fill ${project.progress >= 75 ? 'success' : project.progress >= 50 ? 'warning' : 'danger'}" 
                                     style="width: ${project.progress}%"></div>
                            </div>
                            <span class="progress-percentage-large">${project.progress}%</span>
                        </div>
                    </div>
                    
                    <div class="overview-item">
                        <h3>Timeline</h3>
                        <div class="timeline-info">
                            <p><strong>Started:</strong> ${this.formatDate(project.startDate)}</p>
                            ${project.completionDate ? 
                                `<p><strong>Completed:</strong> ${this.formatDate(project.completionDate)}</p>` :
                                project.estimatedCompletion ?
                                `<p><strong>Est. Completion:</strong> ${this.formatDate(project.estimatedCompletion)}</p>` : ''
                            }
                        </div>
                    </div>
                    
                    <div class="overview-item">
                        <h3>Team</h3>
                        <div class="team-info">
                            <p>${project.teamSize} team members</p>
                            <div class="team-avatars">
                                ${Array(project.teamSize).fill(0).map((_, i) => 
                                    `<div class="team-avatar" title="Team Member ${i + 1}">👤</div>`
                                ).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
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
        const teamMembers = this.projects.reduce((sum, p) => sum + p.teamSize, 0);
        
        return { total, active, completed, teamMembers };
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
