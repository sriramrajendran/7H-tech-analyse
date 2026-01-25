// Tutorials Module - Modular tutorials content and functionality
class TutorialsModule {
    constructor() {
        this.tutorials = [
            {
                id: 1,
                title: "Getting Started with React Hooks",
                difficulty: "Beginner",
                duration: "45 min",
                category: "Frontend",
                description: "Learn the fundamentals of React Hooks and how to use them to build modern React applications.",
                topics: ["useState", "useEffect", "useContext", "Custom Hooks"],
                prerequisites: ["Basic JavaScript", "ES6 Features", "HTML/CSS"],
                steps: [
                    {
                        title: "Introduction to React Hooks",
                        content: "React Hooks are functions that let you use state and other React features in functional components. They were introduced in React 16.8 as a way to use state and lifecycle methods without writing a class.",
                        code: `import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}`
                    },
                    {
                        title: "Understanding useState",
                        content: "The useState Hook lets you add state to functional components. It returns an array with two elements: the current state value and a function to update it.",
                        code: `const [state, setState] = useState(initialValue);

// Example with object
const [user, setUser] = useState({
    name: 'John',
    age: 30
});

// Updating state
setUser(prevUser => ({
    ...prevUser,
    age: prevUser.age + 1
}));`
                    },
                    {
                        title: "Using useEffect for Side Effects",
                        content: "The useEffect Hook lets you perform side effects in functional components. It's similar to componentDidMount, componentDidUpdate, and componentWillUnmount combined.",
                        code: `import React, { useState, useEffect } from 'react';

function DataFetcher() {
    const [data, setData] = useState(null);
    
    useEffect(() => {
        fetchData()
            .then(result => setData(result))
            .catch(error => console.error(error));
            
        // Cleanup function
        return () => {
            // cleanup code here
        };
    }, [dependency]); // Dependency array
    
    return <div>{data ? data : 'Loading...'}</div>;
}`
                    }
                ]
            },
            {
                id: 2,
                title: "Building RESTful APIs with Node.js",
                difficulty: "Intermediate",
                duration: "60 min",
                category: "Backend",
                description: "Learn how to design and implement RESTful APIs using Node.js, Express, and MongoDB.",
                topics: ["Express.js", "REST Principles", "MongoDB", "Authentication"],
                prerequisites: ["JavaScript", "Node.js Basics", "HTTP Protocol"],
                steps: [
                    {
                        title: "Setting up Express Server",
                        content: "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.",
                        code: `const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to our API!' });
});

app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});`
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

    generateTutorialsContent() {
        return `
            <div class="page-header">
                <h2>Tutorials</h2>
                <p>Step-by-step guides to help you master modern technologies</p>
            </div>
            
            <div class="tutorials-container">
                ${this.generateTutorialFilters()}
                ${this.generateTutorialsList()}
            </div>
        `;
    }

    generateTutorialFilters() {
        const categories = this.getCategories();
        const difficulties = this.getDifficulties();
        
        return `
            <section class="tutorial-filters">
                <div class="filter-group">
                    <h4>Category</h4>
                    <div class="filter-options">
                        ${categories.map(cat => `
                            <button class="filter-btn" onclick="tutorialsModule.filterByCategory('${cat}')">
                                ${cat}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="filter-group">
                    <h4>Difficulty</h4>
                    <div class="filter-options">
                        ${difficulties.map(diff => `
                            <button class="filter-btn" onclick="tutorialsModule.filterByDifficulty('${diff}')">
                                ${diff}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    generateTutorialsList() {
        return `
            <section class="tutorials-list">
                <div class="tutorials-grid">
                    ${this.tutorials.map(tutorial => this.generateTutorialCard(tutorial)).join('')}
                </div>
            </section>
        `;
    }

    generateTutorialCard(tutorial) {
        const difficultyClass = tutorial.difficulty.toLowerCase();
        return `
            <article class="tutorial-card">
                <div class="card-header">
                    <span class="tutorial-category">${tutorial.category}</span>
                    <span class="tutorial-difficulty ${difficultyClass}">${tutorial.difficulty}</span>
                </div>
                
                <div class="card-content">
                    <h3>${tutorial.title}</h3>
                    <p class="tutorial-description">${tutorial.description}</p>
                    
                    <div class="tutorial-meta">
                        <span class="duration">⏱️ ${tutorial.duration}</span>
                        <span class="topics-count">📚 ${tutorial.topics.length} topics</span>
                    </div>
                    
                    <div class="tutorial-topics">
                        ${tutorial.topics.slice(0, 3).map(topic => 
                            `<span class="topic-tag">${topic}</span>`
                        ).join('')}
                        ${tutorial.topics.length > 3 ? 
                            `<span class="topic-tag">+${tutorial.topics.length - 3} more</span>` : ''
                        }
                    </div>
                    
                    <button class="start-tutorial-btn" onclick="tutorialsModule.startTutorial(${tutorial.id})">
                        Start Tutorial
                    </button>
                </div>
            </article>
        `;
    }

    startTutorial(tutorialId) {
        const tutorial = this.tutorials.find(t => t.id === tutorialId);
        if (!tutorial) return;
        
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="tutorial-viewer">
                <button class="back-btn" onclick="tutorialsModule.showTutorialsList()">
                    ← Back to Tutorials
                </button>
                
                <div class="tutorial-header">
                    <div class="tutorial-info">
                        <h1>${tutorial.title}</h1>
                        <p>${tutorial.description}</p>
                        
                        <div class="tutorial-meta">
                            <span class="tutorial-category">${tutorial.category}</span>
                            <span class="tutorial-difficulty ${tutorial.difficulty.toLowerCase()}">${tutorial.difficulty}</span>
                            <span class="tutorial-duration">⏱️ ${tutorial.duration}</span>
                        </div>
                    </div>
                </div>
                
                <div class="tutorial-content">
                    ${this.generateTutorialSteps(tutorial)}
                </div>
            </div>
        `;
    }

    generateTutorialSteps(tutorial) {
        return `
            <div class="tutorial-steps">
                ${tutorial.steps.map((step, index) => `
                    <div class="tutorial-step" id="step-${index}">
                        <h3>Step ${index + 1}: ${step.title}</h3>
                        <div class="step-content">
                            <p>${step.content}</p>
                            ${step.code ? `
                                <div class="code-block">
                                    <pre><code>${this.escapeHtml(step.code)}</code></pre>
                                    <button class="copy-btn" onclick="tutorialsModule.copyCode(this)">
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

    showTutorialsList() {
        if (typeof pageManager !== 'undefined') {
            pageManager.loadPage('tech-tutorials');
        }
    }

    filterByCategory(category) {
        const filtered = this.tutorials.filter(t => t.category === category);
        this.displayFilteredTutorials(filtered);
    }

    filterByDifficulty(difficulty) {
        const filtered = this.tutorials.filter(t => t.difficulty === difficulty);
        this.displayFilteredTutorials(filtered);
    }

    displayFilteredTutorials(tutorials) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="page-header">
                <h2>Tutorials</h2>
                <p>Filtered results (${tutorials.length} tutorials)</p>
            </div>
            
            <div class="tutorials-container">
                <button class="clear-filter-btn" onclick="tutorialsModule.showTutorialsList()">
                    Clear Filter
                </button>
                
                <section class="tutorials-list">
                    <div class="tutorials-grid">
                        ${tutorials.map(tutorial => this.generateTutorialCard(tutorial)).join('')}
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
        return [...new Set(this.tutorials.map(t => t.category))];
    }

    getDifficulties() {
        return [...new Set(this.tutorials.map(t => t.difficulty))];
    }

    // Content management methods
    addTutorial(tutorial) {
        this.tutorials.push({
            ...tutorial,
            id: this.tutorials.length + 1
        });
    }

    updateTutorial(tutorialId, updates) {
        const index = this.tutorials.findIndex(t => t.id === tutorialId);
        if (index !== -1) {
            this.tutorials[index] = { ...this.tutorials[index], ...updates };
        }
    }

    deleteTutorial(tutorialId) {
        this.tutorials = this.tutorials.filter(t => t.id !== tutorialId);
    }

    getTutorials() {
        return this.tutorials;
    }

    getTutorial(tutorialId) {
        return this.tutorials.find(t => t.id === tutorialId);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TutorialsModule;
} else {
    window.TutorialsModule = TutorialsModule;
}
