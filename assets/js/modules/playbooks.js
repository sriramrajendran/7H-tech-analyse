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
                steps: [
                    {
                        title: "Understanding Vibe Coding Philosophy",
                        content: "Vibe coding is about finding your natural rhythm in development. It's the state where code flows effortlessly, problems solve themselves, and time seems to disappear. This approach emphasizes intuition over rigid processes, creativity over convention, and flow over force. The key is understanding your personal coding patterns, recognizing when you're in the zone, and creating environments that foster this state consistently.",
                        code: `# Vibe Coding Principles:
# - Trust your intuition and first instincts
# - Code when you feel inspired, not when you feel obligated
# - Let problems marinate before diving in
# - Follow your energy, not just your schedule
# - Embrace imperfection and iteration
# - Create a coding sanctuary that feels right
# - Listen to what the code wants to become`
                    },
                    {
                        title: "Creating Your Optimal Coding Environment",
                        content: "Your physical and digital environment dramatically impacts your coding vibe. The right setup removes friction and lets you enter flow states naturally. Consider lighting, sound, ergonomics, and digital distractions. Some developers thrive with ambient music, others need silence. Some prefer dark themes, others light. The key is personalization - create a space that makes you want to code, not one that makes you feel like you should code.",
                        code: `# Environment Setup Checklist:
# - Comfortable seating and proper lighting
# - Minimal distractions (physical and digital)
# - Background noise that helps you focus
# - Tools and shortcuts that feel natural
# - Code editor theme that pleases your eyes
# - Snippets and templates that match your style
# - Time of day when your energy peaks`
                    },
                    {
                        title: "Mastering Flow States in Development",
                        content: "Flow states are the holy grail of vibe coding - those magical periods where you're fully immersed and code pours out naturally. Achieving flow requires the right balance of challenge and skill, clear goals, and immediate feedback. Learn to recognize when you're approaching flow, protect that state fiercely, and understand how to return to it when interrupted. The best code often emerges from these flow periods.",
                        code: `# Flow State Indicators:
# - Time distortion (hours feel like minutes)
# - Self-consciousness disappears
# - Problem-solving becomes automatic
# - Code writes itself through you
# - You feel energized, not drained
# - Complete focus on the task at hand`
                    },
                    {
                        title: "Sustainable Vibe Coding Practices",
                        content: "Vibe coding isn't about chaotic bursts followed by burnout. It's about sustainable practices that keep you in the zone consistently. This includes knowing when to push forward and when to rest, maintaining energy through the day, and preventing the common pitfalls that lead to developer fatigue. The goal is a career-long relationship with coding that stays fresh, exciting, and aligned with your natural rhythms.",
                        code: `# Sustainability Practices:
# - Honor your natural energy cycles
# - Take real breaks that actually refresh you
# - End coding sessions while you still have energy
# - Celebrate small wins and progress
# - Maintain work-life harmony
# - Keep learning and exploring new approaches`
                    }
                ]
            },
            {
                id: 2,
                title: "Building High-Performance gRPC Services",
                difficulty: "Intermediate",
                duration: "75 min",
                category: "Backend",
                description: "Master gRPC for building efficient, type-safe microservices with Protocol Buffers, bidirectional streaming, and modern API design patterns.",
                topics: ["gRPC", "Protocol Buffers", "Microservices", "Streaming", "Node.js", "TypeScript"],
                prerequisites: ["JavaScript", "Node.js Basics", "API Design", "Basic Networking"],
                steps: [
                    {
                        title: "Understanding gRPC Architecture",
                        content: "gRPC is a modern RPC framework that uses Protocol Buffers for serialization and HTTP/2 for transport. It provides significant performance improvements over traditional REST APIs, especially for microservices communication. gRPC supports four types of methods: unary, server streaming, client streaming, and bidirectional streaming.",
                        code: `// gRPC Service Definition (.proto)
syntax = "proto3";

package users;

service UserService {
    rpc GetUser(GetUserRequest) returns (UserResponse);
    rpc ListUsers(ListUsersRequest) returns (stream UserResponse);
    rpc CreateUser(stream CreateUserRequest) returns (CreateUserResponse);
    rpc UserChat(stream ChatMessage) returns (stream ChatMessage);
}

message GetUserRequest {
    string user_id = 1;
}

message UserResponse {
    string user_id = 1;
    string name = 2;
    string email = 3;
    int64 created_at = 4;
}`
                    },
                    {
                        title: "Setting up gRPC Server with Node.js",
                        content: "Implementing a gRPC server in Node.js requires the grpc-js package and compiled Protocol Buffer definitions. The server handles incoming requests, processes business logic, and returns structured responses. Key considerations include error handling, logging, and connection management.",
                        code: `// gRPC Server Implementation
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load proto file
const packageDefinition = protoLoader.loadSync('users.proto');
const usersProto = grpc.loadPackageDefinition(packageDefinition).users;

// Implement service methods
class UserService {
    async getUser(call, callback) {
        try {
            const { user_id } = call.request;
            const user = await findUserById(user_id);
            
            if (!user) {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: 'User not found'
                });
                return;
            }
            
            callback(null, user);
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: error.message
            });
        }
    }
    
    async listUsers(call) {
        try {
            const users = await getAllUsers();
            
            for (const user of users) {
                call.write(user);
            }
            
            call.end();
        } catch (error) {
            call.emit('error', {
                code: grpc.status.INTERNAL,
                details: error.message
            });
        }
    }
}

// Create and start server
const server = new grpc.Server();
server.addService(usersProto.UserService.service, new UserService(), {
    interceptors: [loggingInterceptor, authInterceptor]
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('gRPC server running on port 50051');
    server.start();
});`
                    },
                    {
                        title: "Bidirectional Streaming for Real-Time Communication",
                        content: "Bidirectional streaming is gRPC's most powerful feature, enabling both client and server to send messages simultaneously. This is perfect for real-time applications like chat, live updates, and collaborative tools. The connection remains open, allowing continuous message exchange with low latency.",
                        code: `// Bidirectional Streaming Chat Implementation
async function userChat(call) {
    try {
        // Handle incoming messages from client
        call.on('data', (message) => {
            console.log('Received:', message);
            
            // Process message (could involve AI, validation, etc.)
            const processedMessage = processChatMessage(message);
            
            // Send response back to client
            call.write({
                id: generateMessageId(),
                user_id: message.user_id,
                content: processedMessage.content,
                timestamp: new Date().toISOString(),
                is_ai: processedMessage.is_ai
            });
        });
        
        // Handle client disconnection
        call.on('end', () => {
            console.log('Client disconnected');
        });
        
        // Handle errors
        call.on('error', (error) => {
            console.error('Stream error:', error);
        });
        
    } catch (error) {
        call.emit('error', {
            code: grpc.status.INTERNAL,
            details: error.message
        });
    }
}`
                    }
                ]
            },
                    {
                        title: "Creating RESTful Routes",
                        content: "RESTful APIs use HTTP methods to perform CRUD operations. Here's how to implement standard REST routes.",
                        code: `// GET all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET user by ID
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST new user
app.post('/api/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});`
                    }
                ]
            },
            {
                id: 3,
                title: "Docker Containerization Fundamentals",
                difficulty: "Beginner",
                duration: "30 min",
                category: "DevOps",
                description: "Master the basics of Docker containerization and learn how to containerize your applications.",
                topics: ["Docker Basics", "Dockerfile", "Docker Compose", "Container Management"],
                prerequisites: ["Command Line", "Basic Linux", "Application Deployment"],
                steps: [
                    {
                        title: "Understanding Docker Concepts",
                        content: "Docker is a platform that uses OS-level virtualization to deliver software in packages called containers. Containers are isolated from one another and bundle their own software, libraries, and configuration files.",
                        code: `# Basic Docker commands
docker --version                    # Check Docker version
docker info                         # Get system information
docker images                       # List available images
docker ps                           # List running containers
docker ps -a                        # List all containers

# Pull and run an image
docker pull nginx:latest
docker run -d -p 8080:80 --name my-nginx nginx`
                    },
                    {
                        title: "Creating a Dockerfile",
                        content: "A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image.",
                        code: `# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD [ "node", "app.js" ]`
                    }
                ]
            }
        ];
    }

    generatePlaybooksContent() {
        return `
            <div class="page-header">
                <h2>Playbooks</h2>
                <p>That worked out for me, sharing for educational purposes only</p>
            </div>
            
            <div class="playbooks-container">
                ${this.generatePlaybookFilters()}
                ${this.generatePlaybooksList()}
            </div>
        `;
    }

    generatePlaybookFilters() {
        const categories = this.getCategories();
        const difficulties = this.getDifficulties();
        
        return `
            <section class="playbook-filters">
                <div class="filter-group">
                    <h4>Category</h4>
                    <div class="filter-options">
                        ${categories.map(cat => `
                            <button class="filter-btn" onclick="playbooksModule.filterByCategory('${cat}')">
                                ${cat}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="filter-group">
                    <h4>Difficulty</h4>
                    <div class="filter-options">
                        ${difficulties.map(diff => `
                            <button class="filter-btn" onclick="playbooksModule.filterByDifficulty('${diff}')">
                                ${diff}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    generatePlaybooksList() {
        return `
            <section class="playbooks-list">
                <div class="playbooks-grid">
                    ${this.playbooks.map(playbook => this.generatePlaybookCard(playbook)).join('')}
                </div>
            </section>
        `;
    }

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
                        ${playbook.topics.length > 3 ? 
                            `<span class="topic-tag">+${playbook.topics.length - 3} more</span>` : ''
                        }
                    </div>
                    
                    <button class="start-playbook-btn" onclick="playbooksModule.startPlaybook(${playbook.id})">
                        Start Playbook
                    </button>
                </div>
            </article>
        `;
    }

    startPlaybook(playbookId) {
        const playbook = this.playbooks.find(p => p.id === playbookId);
        if (!playbook) return;
        
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="playbook-viewer">
                <button class="back-btn" onclick="playbooksModule.showPlaybooksList()">
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
                    ${this.generatePlaybookSteps(playbook)}
                </div>
            </div>
        `;
    }

    generatePlaybookSteps(playbook) {
        return `
            <div class="playbook-steps">
                ${playbook.steps.map((step, index) => `
                    <div class="playbook-step" id="step-${index}">
                        <h3>Step ${index + 1}: ${step.title}</h3>
                        <div class="step-content">
                            <p>${step.content}</p>
                            ${step.code ? `
                                <div class="code-block">
                                    <pre><code>${this.escapeHtml(step.code)}</code></pre>
                                    <button class="copy-btn" onclick="playbooksModule.copyCode(this)">
                                        📋 Copy Code
                                    </button>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    showPlaybooksList() {
        if (typeof pageManager !== 'undefined') {
            pageManager.loadPage('tech-playbooks');
        }
    }

    filterByCategory(category) {
        const filtered = this.playbooks.filter(p => p.category === category);
        this.displayFilteredPlaybooks(filtered);
    }

    filterByDifficulty(difficulty) {
        const filtered = this.playbooks.filter(p => p.difficulty === difficulty);
        this.displayFilteredPlaybooks(filtered);
    }

    displayFilteredPlaybooks(playbooks) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="page-header">
                <h2>Playbooks</h2>
                <p>Filtered results (${playbooks.length} playbooks)</p>
            </div>
            
            <div class="playbooks-container">
                <button class="clear-filter-btn" onclick="playbooksModule.showPlaybooksList()">
                    Clear Filter
                </button>
                
                <section class="playbooks-list">
                    <div class="playbooks-grid">
                        ${playbooks.map(playbook => this.generatePlaybookCard(playbook)).join('')}
                    </div>
                </section>
            </div>
        `;
    }

    copyCode(button) {
        const codeBlock = button.parentElement.querySelector('code');
        const text = codeBlock.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            button.textContent = '✅ Copied!';
            setTimeout(() => {
                button.textContent = '📋 Copy Code';
            }, 2000);
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    getCategories() {
        return [...new Set(this.playbooks.map(p => p.category))];
    }

    getDifficulties() {
        return [...new Set(this.playbooks.map(p => p.difficulty))];
    }

    // Content management methods
    addPlaybook(playbook) {
        this.playbooks.push({
            ...playbook,
            id: this.playbooks.length + 1
        });
    }

    updatePlaybook(playbookId, updates) {
        const index = this.playbooks.findIndex(p => p.id === playbookId);
        if (index !== -1) {
            this.playbooks[index] = { ...this.playbooks[index], ...updates };
        }
    }

    deletePlaybook(playbookId) {
        this.playbooks = this.playbooks.filter(p => p.id !== playbookId);
    }

    getPlaybooks() {
        return this.playbooks;
    }

    getPlaybook(playbookId) {
        return this.playbooks.find(p => p.id === playbookId);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PlaybooksModule;
} else {
    window.PlaybooksModule = PlaybooksModule;
}
