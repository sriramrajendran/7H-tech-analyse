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
                title: "Building Real-Time Chatbots with WebSockets",
                difficulty: "Intermediate",
                duration: "60 min",
                category: "Full Stack",
                description: "Master WebSocket implementation for building real-time chatbots with React UI, FastAPI backend, and LLM integration with RAG setup.",
                topics: ["WebSockets", "React", "FastAPI", "LLM Integration", "RAG", "Real-time Communication"],
                prerequisites: ["React Basics", "Node.js/Python", "API Development", "WebSocket Concepts"],
                steps: [
                    {
                        title: "Understanding WebSocket Architecture",
                        content: "WebSockets provide full-duplex communication channels over a single TCP connection, perfect for real-time chat applications. Unlike HTTP's request-response cycle, WebSockets maintain persistent connections enabling instant bidirectional messaging. This architecture is ideal for chatbots, live notifications, collaborative applications, and real-time data streaming where immediate response times are critical.",
                        code: `// WebSocket vs HTTP Comparison
// HTTP: Request-Response (stateless)
// WebSocket: Persistent connection (stateful)

// WebSocket handshake process
// 1. Client sends HTTP Upgrade request
// 2. Server responds with 101 Switching Protocols  
// 3. Persistent WebSocket connection established
// 4. Bidirectional messaging begins

// WebSocket message types
// - Text messages (JSON, plain text)
// - Binary messages (files, images)  
// - Control frames (ping/pong, close)`
                    },
                    {
                        title: "Setting up WebSocket Server with Node.js",
                        content: "Node.js with Socket.IO provides excellent WebSocket support with automatic fallbacks, room management, and event-driven architecture. The server handles connection management, event broadcasting, and room-based messaging. Key considerations include authentication, error handling, and connection lifecycle management.",
                        code: `// WebSocket Server Implementation
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"]
    }
});

// Connection manager
const connections = new Map();

io.on('connection', (socket) => {
    console.log(\`User connected: \${socket.id}\`);
    connections.set(socket.id, socket);
    
    // Handle chat messages
    socket.on('send_message', async (data) => {
        try {
            const { content, roomId, useAi } = data;
            
            // Process with LLM if needed
            let response = content;
            if (useAi) {
                response = await processWithLLM(content);
            }
            
            // Broadcast to room
            socket.to(roomId).emit('new_message', {
                userId: socket.id,
                content: response,
                timestamp: new Date().toISOString()
            });
            
        } catch (error) {
            socket.emit('error', { message: 'Failed to send message' });
        }
    });
    
    socket.on('disconnect', () => {
        connections.delete(socket.id);
        console.log(\`User disconnected: \${socket.id}\`);
    });
});

server.listen(3000, () => {
    console.log('WebSocket server running on port 3000');
});

async function processWithLLM(message) {
});`
                    },
                    {
                        title: "Service Discovery and Load Balancing",
                        content: "Service discovery enables microservices to find and communicate with each other without hardcoded dependencies. Load balancing distributes incoming requests across multiple instances of a service to improve performance and reliability.",
                        code: `// Service Discovery with Consul
const consul = require('consul')({ host: 'localhost' });

// Register services
const userService = require('./services/userService');
const productService = require('./services/productService');

// Register with Consul
consul.agent({
    name: 'user-service',
    address: 'localhost:3001',
    port: 3001
});

consul.agent({
    name: 'product-service',
    address: 'localhost:3002',
    port: 3002
});

// Service discovery client
const getServiceUrl = (serviceName) => {
    const service = consul.agent.service.list({ service: serviceName }).pop();
    if (service) {
        return \`\${service.Address}:\${service.Port}\`;
    }
    throw new Error(\`Service \${serviceName} not found\`);
};

// Load balancing with round-robin
const roundRobin = (services) => {
    let index = 0;
    return () => {
        const service = services[index];
        index = (index + 1) % services.length;
        return service;
    };
};

// Usage
const productServices = ['localhost:3002', 'localhost:3003', 'localhost:3004'];
const getNextProductService = roundRobin(productServices);`
                    }
                ]
            },
            {
                id: 4,
                title: "Advanced Docker & ECS Deployment Patterns",
                difficulty: "Intermediate",
                duration: "60 min",
                category: "DevOps",
                description: "Master advanced Docker patterns and AWS ECS deployment for production-ready applications with CI/CD pipelines.",
                topics: ["Docker", "AWS ECS", "CI/CD", "Production", "Deployment"],
                prerequisites: ["Docker Basics", "AWS Basics", "Command Line", "Application Deployment"],
                steps: [
                    {
                        title: "Multi-Stage Docker Builds",
                        content: "Multi-stage builds optimize Docker images by separating build-time dependencies from runtime dependencies. This reduces final image size and improves security by excluding build tools and development dependencies from production images.",
                        code: `# Multi-Stage Dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm test

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]`
                    },
                    {
                        title: "AWS ECS Deployment",
                        content: "Amazon ECS (Elastic Container Service) simplifies Docker container management at scale. It provides automatic scaling, load balancing, and service discovery out of the box. ECS integrates with other AWS services like ALB, RDS, and CloudWatch.",
                        code: `# ECS Task Definition Example
{
    "family": "FARGATE",
    "taskRoleArn": "arn:aws:iam::123456789012:role/ecs-task-role",
    "containerDefinitions": [
        {
            "name": "my-app",
            "image": "my-app:latest",
            "portMappings": [
                {
                    "containerPort": 3000,
                    "protocol": "tcp",
                    "hostPort": 80
                }
            ]
        }
    ],
    "requiresCompatibilities": [
        {
            "taskDefinition": "arn:aws:iam::123456789012:role/ecs-task-role"
        }
    ],
    "networkMode": "awsvpc",
    "cpu": "256",
    "memory": "512"
}

# ECS Service Definition
{
    "family": "FARGATE",
    "serviceName": "my-app-service",
    "taskDefinition": "arn:aws:iam::123456789012:role/ecs-task-role",
    "desiredCount": 2
}

# Auto Scaling Policy
{
    "targetCapacity": 10,
    "minimumScalingStepSize": 1,
    "maximumScalingStepSize": 2
}`
                    }
                ]
            },
            {
                id: 5,
                title: "Building High-Performance APIs with gRPC and Node.js",
                difficulty: "Intermediate",
                duration: "60 min",
                category: "API Development",
                description: "Master gRPC architecture, Protocol Buffers, and build production-ready high-performance APIs with Node.js, including advanced patterns and deployment strategies.",
                topics: ["gRPC", "Protocol Buffers", "Node.js", "Microservices", "Streaming", "Performance"],
                prerequisites: ["JavaScript", "Node.js Basics", "API Concepts", "Microservices Fundamentals"],
                steps: [
                    {
                        title: "Understanding gRPC Architecture",
                        content: "gRPC is a high-performance, open-source universal RPC framework that uses HTTP/2 for transport, Protocol Buffers as the interface definition language, and provides features such as authentication, load balancing, and more. Understanding the architecture is crucial for building efficient microservices that can handle high loads with low latency.",
                        code: `// gRPC Architecture Components:
// - Protocol Buffers: Schema definition and serialization
// - Service Definitions: Interface contracts
// - Streaming Types: Unary, Server Streaming, Client Streaming, Bidirectional
// - HTTP/2 Transport: Multiplexed connections
// - Interceptors: Middleware for cross-cutting concerns

// Protocol Buffer Service Definition
syntax = "proto3";

package user;

service UserService {
  rpc GetUser(GetUserRequest) returns (UserResponse);
  rpc ListUsers(ListUsersRequest) returns (stream UserResponse);
  rpc CreateUser(stream CreateUserRequest) returns (CreateUserResponse);
  rpc BidirectionalChat(stream ChatMessage) returns (stream ChatMessage);
}

message GetUserRequest {
  string user_id = 1;
}

message UserResponse {
  string id = 1;
  string name = 2;
  string email = 3;
  int64 created_at = 4;
}`
                    },
                    {
                        title: "Setting up gRPC Server with Node.js",
                        content: "Building a production-ready gRPC server requires proper error handling, logging, health checks, and graceful shutdown. The server should be structured to handle multiple service definitions, implement proper middleware, and provide monitoring capabilities for production environments.",
                        code: `// gRPC Server Implementation
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load protocol buffer definitions
const PROTO_PATH = path.join(__dirname, 'user.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const userProto = grpc.loadPackageDefinition(packageDefinition).user;

// Service implementation
class UserServiceImpl {
  async getUser(call, callback) {
    try {
      const { user_id } = call.request;
      
      // Business logic here
      const user = await findUserById(user_id);
      
      if (!user) {
        callback({
          code: grpc.status.NOT_FOUND,
          details: 'User not found'
        });
        return;
      }
      
      callback(null, {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at
      });
      
    } catch (error) {
      console.error('GetUser error:', error);
      callback({
        code: grpc.status.INTERNAL,
        details: 'Internal server error'
      });
    }
  }
  
  async listUsers(call) {
    try {
      const { limit = 10, offset = 0 } = call.request;
      const users = await findUsers({ limit, offset });
      
      for (const user of users) {
        call.write({
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.created_at
        });
      }
      
      call.end();
      
    } catch (error) {
      console.error('ListUsers error:', error);
      call.emit('error', {
        code: grpc.status.INTERNAL,
        details: 'Internal server error'
      });
    }
  }
}

// Server setup with health checks
const server = new grpc.Server();

// Add services
server.addService(
  userProto.UserService.service,
  new UserServiceImpl()
);

// Health check service
server.addService(grpc.health.v1.Health.service, {
  check: (call, callback) => {
    callback(null, { status: grpc.health.v1.HealthCheckResponse.SERVING });
  }
});

// Start server
const serverAddress = '0.0.0.0:50051';
server.bindAsync(
  serverAddress,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error('Failed to bind server:', err);
      return;
    }
    
    console.log(\`gRPC server running on \${serverAddress}\`);
    server.start();
    
    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('Received SIGTERM, shutting down gracefully');
      server.forceShutdown();
    });
    
    process.on('SIGINT', () => {
      console.log('Received SIGINT, shutting down gracefully');
      server.forceShutdown();
    });
  }
);`
                    },
                    {
                        title: "Building gRPC Client with Connection Management",
                        content: "A robust gRPC client needs connection pooling, retry mechanisms, circuit breakers, and proper error handling. The client should automatically reconnect on failures, handle load balancing, and provide a clean API for the application layer.",
                        code: `// gRPC Client with Connection Management
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

class GrpcClient {
  constructor(serviceUrl, protoPath, packageName) {
    this.serviceUrl = serviceUrl;
    this.packageDefinition = protoLoader.loadSync(protoPath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });
    
    this.proto = grpc.loadPackageDefinition(this.packageDefinition)[packageName];
    this.client = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    
    this.connect();
  }
  
  connect() {
    try {
      this.client = new this.proto.UserService(
        this.serviceUrl,
        grpc.credentials.createInsecure(),
        {
          'grpc.keepalive_time_ms': 30000,
          'grpc.keepalive_timeout_ms': 5000,
          'grpc.keepalive_permit_without_calls': true,
          'grpc.http2.max_pings_without_data': 0,
          'grpc.http2.min_time_between_pings_ms': 10000,
          'grpc.http2.min_ping_interval_without_data_ms': 300000
        }
      );
      
      this.setupEventHandlers();
      this.isConnected = true;
      this.reconnectAttempts = 0;
      
      console.log('gRPC client connected successfully');
      
    } catch (error) {
      console.error('Failed to connect gRPC client:', error);
      this.handleConnectionError(error);
    }
  }
  
  setupEventHandlers() {
    // Handle connection state changes
    if (this.client.waitForReady) {
      this.client.waitForReady(Date.now() + 5000, (error) => {
        if (error) {
          console.error('Client ready timeout:', error);
          this.handleConnectionError(error);
        } else {
          console.log('gRPC client is ready');
        }
      });
    }
  }
  
  handleConnectionError(error) {
    this.isConnected = false;
    
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      
      console.log(\`Attempting reconnect \${this.reconnectAttempts}/\${this.maxReconnectAttempts} in \${delay}ms\`);
      
      setTimeout(() => {
        this.connect();
      }, delay);
      
    } else {
      console.error('Max reconnection attempts reached');
      throw new Error('Failed to connect to gRPC server');
    }
  }
  
  async getUser(userId) {
    if (!this.isConnected) {
      throw new Error('gRPC client not connected');
    }
    
    return new Promise((resolve, reject) => {
      const deadline = Date.now() + 5000; // 5 second timeout
      
      this.client.getUser(
        { user_id: userId },
        { deadline: deadline },
        (error, response) => {
          if (error) {
            if (error.code === grpc.status.DEADLINE_EXCEEDED) {
              reject(new Error('Request timeout'));
            } else {
              reject(error);
            }
          } else {
            resolve(response);
          }
        }
      );
    });
  }
  
  async listUsers(options = {}) {
    if (!this.isConnected) {
      throw new Error('gRPC client not connected');
    }
    
    return new Promise((resolve, reject) => {
      const call = this.client.listUsers(options);
      const users = [];
      
      call.on('data', (user) => {
        users.push(user);
      });
      
      call.on('end', () => {
        resolve(users);
      });
      
      call.on('error', (error) => {
        reject(error);
      });
      
      // Handle timeout
      setTimeout(() => {
        call.cancel();
        reject(new Error('Stream timeout'));
      }, 30000);
    });
  }
  
  close() {
    if (this.client) {
      grpc.closeClient(this.client);
      this.isConnected = false;
      console.log('gRPC client closed');
    }
  }
}

// Usage example
const client = new GrpcClient(
  'localhost:50051',
  './user.proto',
  'user'
);

// Health check with circuit breaker
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.threshold = threshold;
    this.timeout = timeout;
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
  }
  
  async execute(operation) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }
    
    try {
      const result = await operation();
      
      if (this.state === 'HALF_OPEN') {
        this.state = 'CLOSED';
        this.failureCount = 0;
      }
      
      return result;
      
    } catch (error) {
      this.failureCount++;
      this.lastFailureTime = Date.now();
      
      if (this.failureCount >= this.threshold) {
        this.state = 'OPEN';
      }
      
      throw error;
    }
  }
}

// Circuit breaker usage
const circuitBreaker = new CircuitBreaker();

async function getUserWithCircuitBreaker(userId) {
  return circuitBreaker.execute(() => client.getUser(userId));
}`
                    },
                    {
                        title: "Implementing Advanced gRPC Patterns",
                        content: "Advanced gRPC patterns include interceptors for authentication and logging, bidirectional streaming for real-time communication, load balancing across multiple service instances, and implementing proper error handling with custom error codes.",
                        code: `// gRPC Interceptors for Authentication and Logging
class AuthInterceptor {
  constructor(jwtSecret) {
    this.jwtSecret = jwtSecret;
  }
  
  intercept(call, next) {
    const metadata = call.metadata.get('authorization');
    
    if (!metadata || !metadata[0]) {
      callback({
        code: grpc.status.UNAUTHENTICATED,
        details: 'Missing authorization token'
      });
      return;
    }
    
    try {
      const token = metadata[0].replace('Bearer ', '');
      const decoded = jwt.verify(token, this.jwtSecret);
      call.request.user = decoded;
      
      return next(call);
      
    } catch (error) {
      callback({
        code: grpc.status.UNAUTHENTICATED,
        details: 'Invalid token'
      });
    }
  }
}

class LoggingInterceptor {
  intercept(call, next) {
    const start = Date.now();
    const methodName = call.method.path;
    
    console.log(\`[\${new Date().toISOString()}] Starting \${methodName}\`);
    
    return next(call).then(response => {
      const duration = Date.now() - start;
      console.log(\`[\${new Date().toISOString()}] Completed \${methodName} in \${duration}ms\`);
      return response;
    }).catch(error => {
      const duration = Date.now() - start;
      console.error(\`[\${new Date().toISOString()}] Failed \${methodName} in \${duration}ms: \${error.message}\`);
      throw error;
    });
  }
}

// Bidirectional Streaming Implementation
class ChatService {
  async bidirectionalChat(call) {
    call.on('data', (message) => {
      console.log('Received message:', message);
      
      // Process message and send response
      const response = {
        id: Date.now().toString(),
        content: \`Echo: \${message.content}\`,
        user_id: 'bot',
        timestamp: Date.now()
      };
      
      call.write(response);
    });
    
    call.on('end', () => {
      console.log('Chat stream ended');
      call.end();
    });
    
    call.on('error', (error) => {
      console.error('Chat stream error:', error);
    });
  }
}

// Load Balancing with DNS
const dns = require('dns');

class LoadBalancedClient {
  constructor(serviceName, protoPath, packageName) {
    this.serviceName = serviceName;
    this.clients = new Map();
    this.currentIndex = 0;
    this.proto = this.loadProto(protoPath, packageName);
    this.refreshInterval = 30000; // 30 seconds
    
    this.startLoadBalancing();
  }
  
  async resolveServiceAddresses() {
    return new Promise((resolve, reject) => {
      dns.resolveSrv(this.serviceName, (error, addresses) => {
        if (error) {
          reject(error);
        } else {
          resolve(addresses.map(addr => \`\${addr.name}:\${addr.port}\`));
        }
      });
    });
  }
  
  async updateClients() {
    try {
      const addresses = await this.resolveServiceAddresses();
      
      // Remove clients for addresses that no longer exist
      for (const [address, client] of this.clients) {
        if (!addresses.includes(address)) {
          grpc.closeClient(client);
          this.clients.delete(address);
        }
      }
      
      // Add new clients
      for (const address of addresses) {
        if (!this.clients.has(address)) {
          const client = new this.proto.ChatService(
            address,
            grpc.credentials.createInsecure()
          );
          this.clients.set(address, client);
        }
      }
      
    } catch (error) {
      console.error('Failed to update clients:', error);
    }
  }
  
  startLoadBalancing() {
    this.updateClients();
    setInterval(() => this.updateClients(), this.refreshInterval);
  }
  
  getNextClient() {
    const addresses = Array.from(this.clients.keys());
    if (addresses.length === 0) {
      throw new Error('No available service instances');
    }
    
    const address = addresses[this.currentIndex % addresses.length];
    this.currentIndex++;
    
    return this.clients.get(address);
  }
  
  async sendMessage(message) {
    const client = this.getNextClient();
    
    return new Promise((resolve, reject) => {
      client.sendMessage(message, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }
}

// Custom Error Handling
class GrpcError extends Error {
  constructor(code, message, details = {}) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = 'GrpcError';
  }
}

const errorHandler = (error, callback) => {
  if (error instanceof GrpcError) {
    callback({
      code: error.code,
      details: error.message,
      metadata: error.details
    });
  } else if (error.name === 'ValidationError') {
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      details: error.message
    });
  } else if (error.name === 'NotFoundError') {
    callback({
      code: grpc.status.NOT_FOUND,
      details: error.message
    });
  } else {
    console.error('Unexpected error:', error);
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal server error'
    });
  }
};`
                    },
                    {
                        title: "Production Deployment with Docker and Kubernetes",
                        content: "Deploying gRPC services to production requires proper containerization, Kubernetes configuration for load balancing and service discovery, monitoring with Prometheus and Grafana, and implementing proper CI/CD pipelines for automated deployments.",
                        code: `# Dockerfile for gRPC Service
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S grpcuser -u 1001

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/protos ./protos
COPY --from=builder /app/package.json ./package.json

USER grpcuser

EXPOSE 50051

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD node healthcheck.js

CMD ["node", "dist/server.js"]

# Kubernetes Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: grpc-service
  labels:
    app: grpc-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: grpc-service
  template:
    metadata:
      labels:
        app: grpc-service
    spec:
      containers:
      - name: grpc-service
        image: grpc-service:latest
        ports:
        - containerPort: 50051
        env:
        - name: NODE_ENV
          value: "production"
        - name: PORT
          value: "50051"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          exec:
            command:
            - node
            - healthcheck.js
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          exec:
            command:
            - node
            - healthcheck.js
          initialDelaySeconds: 5
          periodSeconds: 5

---
# gRPC Service with HTTP/2 load balancing
apiVersion: v1
kind: Service
metadata:
  name: grpc-service
spec:
  selector:
    app: grpc-service
  ports:
  - port: 50051
    targetPort: 50051
    protocol: TCP
    name: grpc
  type: ClusterIP

---
# Ingress for gRPC (requires gRPC-capable ingress controller)
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: grpc-ingress
  annotations:
    nginx.ingress.kubernetes.io/backend-protocol: "GRPC"
    nginx.ingress.kubernetes.io/grpc-backend: "true"
spec:
  rules:
  - host: grpc-api.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: grpc-service
            port:
              number: 50051

# Prometheus Configuration for gRPC Metrics
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
    scrape_configs:
    - job_name: 'grpc-services'
      static_configs:
      - targets: ['grpc-service:50051']
      metrics_path: /metrics
      scheme: http
      grpc:
        service: "user.UserService"
        method: "GetUser"

# Grafana Dashboard Configuration
{
  "dashboard": {
    "title": "gRPC Service Metrics",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(grpc_server_handled_total[5m])",
            "legendFormat": "{{method}} - {{grpc_code}}"
          }
        ]
      },
      {
        "title": "Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(grpc_server_handling_seconds_bucket[5m]))",
            "legendFormat": "95th percentile"
          }
        ]
      },
      {
        "title": "Error Rate",
        "type": "singlestat",
        "targets": [
          {
            "expr": "rate(grpc_server_handled_total{grpc_code!=\"OK\"}[5m]) / rate(grpc_server_handled_total[5m])",
            "legendFormat": "Error Rate"
          }
        ]
      }
    ]
  }
}

# CI/CD Pipeline (.github/workflows/grpc-deploy.yml)
name: Deploy gRPC Service

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Run integration tests
      run: npm run test:integration

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Build Docker image
      run: |
        docker build -t grpc-service:\${{ github.sha }} .
        docker tag grpc-service:\${{ github.sha }} grpc-service:latest
    
    - name: Push to registry
      if: github.ref == 'refs/heads/main'
      run: |
        echo \${{ secrets.DOCKER_PASSWORD }} | docker login -u \${{ secrets.DOCKER_USERNAME }} --password-stdin
        docker push grpc-service:\${{ github.sha }}
        docker push grpc-service:latest

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to Kubernetes
      run: |
        echo \${{ secrets.KUBECONFIG }} | base64 -d > kubeconfig
        export KUBECONFIG=kubeconfig
        
        # Update image in deployment
        kubectl set image deployment/grpc-service grpc-service=grpc-service:\${{ github.sha }}
        
        # Wait for rollout
        kubectl rollout status deployment/grpc-service
        
        # Verify deployment
        kubectl get pods -l app=grpc-service`
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
