// Author Module - Modular author content and functionality
class AuthorModule {
    constructor() {
        this.authorData = {
            name: "Sriramprabhu Rajendran",
            title: "Software Engineering Leader & Technology Innovator",
            experience: "2 decades",
            photo: "assets/images/author-photo.jpg",
            social: {
                linkedin: "https://www.linkedin.com/in/rsri",
                github: "https://github.com/sriramrajendran"
            }
        };
    }

    generateAuthorContent() {
        return `
            <div class="page-header">
                <h2>About the Author</h2>
            </div>
            
            <div class="author-container">
                ${this.generateProfileSection()}
                ${this.generateContentSections()}
            </div>
        `;
    }

    generateProfileSection() {
        return `
            <div class="author-profile">
                <div class="author-avatar">
                    <img src="${this.authorData.photo}" alt="${this.authorData.name}" class="author-photo">
                </div>
                <div class="author-info">
                    <h3>${this.authorData.name}</h3>
                    <p class="author-title">${this.authorData.title}</p>
                    <div class="author-memberships">
                        <span class="membership-badge">🏛️ IEEE Senior Member</span>
                        <span class="membership-badge">👑 ioasd.org Royal Fellow</span>
                    </div>
                    <div class="author-links">
                        <a href="${this.authorData.social.linkedin}" target="_blank" class="social-link">
                            <span class="social-icon">💼</span> LinkedIn
                        </a>
                        <a href="${this.authorData.social.github}" target="_blank" class="social-link">
                            <span class="social-icon">💻</span> GitHub
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    generateContentSections() {
        return `
            <div class="author-content">
                ${this.generateProfessionalBackground()}
                ${this.generateTechnologyExpertise()}
                ${this.generateLeadershipSection()}
                ${this.generatePhilosophySection()}
                ${this.generatePhotographySection()}
                ${this.generateContactSection()}
            </div>
        `;
    }

    generateProfessionalBackground() {
        return `
            <div class="author-section">
                <h4>👨‍💻 Professional Background</h4>
                <p>Seasoned Software Engineering Leader with <strong>${this.authorData.experience} of experience</strong> in financial services and technology innovation. Specializes in delivering transformative solutions that drive business growth and operational excellence through cutting-edge technologies and strategic leadership.</p>
            </div>
        `;
    }

    generateTechnologyExpertise() {
        return `
            <div class="author-section">
                <h4>🚀 Technology Expertise</h4>
                <div class="skills-grid">
                    <div class="skill-category">
                        <h5>Gen AI & Cloud</h5>
                        <ul>
                            <li>Generative AI & Machine Learning</li>
                            <li>AWS Cloud Services</li>
                            <li>Event-Driven Architecture</li>
                            <li>Microservices Design</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h5>Core Technologies</h5>
                        <ul>
                            <li>Java & Spring Framework</li>
                            <li>Apache Kafka</li>
                            <li>JavaScript (Node.js)</li>
                            <li>APIs (REST/SOAP/gRPC)</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h5>Data & Databases</h5>
                        <ul>
                            <li>Data Modeling & Design</li>
                            <li>NoSQL (DynamoDB/Cassandra/MongoDB)</li>
                            <li>SQL (Oracle/PostgreSQL/MSSQL/DB2)</li>
                            <li>Cache (Memcached/Redis)</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h5>DevOps & Infrastructure</h5>
                        <ul>
                            <li>Container Services (Docker/Kubernetes/ECS/Mesos)</li>
                            <li>Automation & CI/CD</li>
                            <li>DevOps & Agile (incl XP)</li>
                            <li>Performance Tuning</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h5>Enterprise Systems</h5>
                        <ul>
                            <li>JavaEE & IBM SOA (Websphere/Process Server/BPEL)</li>
                            <li>IBM MQ/WSRR/Datapower/WODM</li>
                            <li>Redhat (JBPM/EAP/Drools)</li>
                            <li>Design Patterns & Architecture</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h5>Leadership & Design</h5>
                        <ul>
                            <li>Strong Design Thinking</li>
                            <li>Low Latency Systems</li>
                            <li>High Availability & Resilience</li>
                            <li>Systems at Scale</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    generateLeadershipSection() {
        return `
            <div class="author-section">
                <h4>🎯 Leadership & Innovation</h4>
                <ul class="achievement-list">
                    <li><strong>Cross-functional Team Leadership:</strong> Managing distributed teams and multi-million-dollar technology initiatives</li>
                    <li><strong>Digital Transformation:</strong> Leading enterprise-wide modernization efforts and cloud migration strategies</li>
                    <li><strong>Innovation Management:</strong> Establishing R&D practices and fostering culture of continuous improvement</li>
                    <li><strong>Technical Excellence:</strong> Implementing best practices in code quality, security, and performance optimization</li>
                </ul>
            </div>
        `;
    }

    generatePhilosophySection() {
        return `
            <div class="author-section">
                <h4>💡 Professional Philosophy</h4>
                <p>Committed to fostering diversity, inclusion, and continuous learning, resulting in impactful business outcomes and lasting value for customers. Passionate about technology advancement and engineering excellence, with a proven ability to design robust architectures and optimize performance in fast-paced environments.</p>
            </div>
        `;
    }

    generatePhotographySection() {
        return `
            <div class="author-section">
                <h4>📸 Photography & Creative Pursuits</h4>
                <p>Beyond the world of technology, I have a deep passion for photography - capturing moments, exploring perspectives, and finding beauty in the ordinary. Photography provides a creative balance to the logical precision of software engineering, allowing me to see the world through different lenses both literally and figuratively.</p>
                <div class="photography-link">
                    <a href="https://www.instagram.com/rajen.sriram/" target="_blank" class="social-link instagram-link">
                        <span class="social-icon">📷</span> Check out my photography on Instagram
                    </a>
                </div>
            </div>
        `;
    }

    generateContactSection() {
        return `
            <div class="author-section">
                <h4>📧 Get in Touch</h4>
                <p>Interested in collaboration, have questions about technology leadership, or want to discuss innovative projects? Feel free to reach out!</p>
                <div class="contact-methods">
                    <a href="${this.authorData.social.linkedin}" target="_blank" class="contact-button">
                        <span class="button-icon">💼</span> Connect on LinkedIn
                    </a>
                    <a href="${this.authorData.social.github}" target="_blank" class="contact-button">
                        <span class="button-icon">💻</span> View on GitHub
                    </a>
                </div>
            </div>
        `;
    }

    // Method to update author data (for future maintainability)
    updateAuthorData(newData) {
        this.authorData = { ...this.authorData, ...newData };
    }

    // Method to get author data (for potential future use)
    getAuthorData() {
        return this.authorData;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthorModule;
} else {
    window.AuthorModule = AuthorModule;
}
