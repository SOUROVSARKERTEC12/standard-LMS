# 🎓 Standard LMS (Learning Management System)

<div align="center">

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/license-UNLICENSED-red?style=for-the-badge)

**A production-ready Learning Management System built with NestJS, TypeScript, and MySQL**

[Features](#-features) • [Quick Start](#-quick-start) • [API Documentation](#-api-documentation) • [Contributing](#-contributing) • [License](#-license)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Authentication & Authorization](#-authentication--authorization)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Code of Conduct](#-code-of-conduct)
- [Security](#-security)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#-roadmap)
- [Support](#-support)
- [License](#-license)

---

## 🎯 About

Standard LMS is a comprehensive Learning Management System API built with modern technologies. It provides a robust backend for managing users, courses, and educational content with role-based access control, secure authentication, and scalable architecture.

### Key Highlights

- 🔐 **Secure Authentication**: JWT-based authentication with Argon2 password hashing
- 👥 **Role-Based Access Control**: Support for Student, Teacher, and Admin roles
- 📚 **Course Management**: Full CRUD operations for courses with level-based categorization
- 🏗️ **Modular Architecture**: Clean, maintainable codebase following NestJS best practices
- ✅ **Type Safety**: Full TypeScript implementation with strict type checking
- 🛡️ **Input Validation**: Comprehensive validation using class-validator
- 📊 **Database Integration**: TypeORM with MySQL for reliable data persistence

---

## ✨ Features

### Core Features

- ✅ **User Management**
  - User registration and authentication
  - Profile management
  - Role-based user system (Student, Teacher, Admin)

- ✅ **Course Management**
  - Create, read, update, and delete courses
  - Course categorization by level (Beginner, Intermediate, Advanced)
  - Price management
  - Course-author relationship tracking

- ✅ **Security**
  - JWT token-based authentication
  - Argon2 password hashing
  - Role-based authorization
  - Protected and public route decorators
  - Input validation and sanitization

- ✅ **Developer Experience**
  - Hot-reload development mode
  - Comprehensive error handling
  - Request logging with Morgan
  - Type-safe request interfaces
  - Environment-based configuration

---

## 🛠️ Tech Stack

### Core Technologies

| Technology     | Version | Purpose                       |
| -------------- | ------- | ----------------------------- |
| **NestJS**     | ^11.0.1 | Progressive Node.js framework |
| **TypeScript** | ^5.9.3  | Type-safe JavaScript          |
| **TypeORM**    | ^0.3.27 | Object-Relational Mapping     |
| **MySQL2**     | ^3.15.3 | Database driver               |
| **Argon2**     | ^0.44.0 | Password hashing              |
| **JWT**        | ^11.0.1 | Authentication tokens         |

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Morgan** - HTTP request logger
- **class-validator** - Input validation
- **class-transformer** - Object transformation

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **MySQL** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/)
- **Git** - Version control

### Optional but Recommended

- **Postman** or **Insomnia** - API testing
- **MySQL Workbench** - Database management
- **VS Code** - Recommended IDE with NestJS extensions

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/standard-lms.git
cd standard-lms
```

### 2. Install Dependencies

Using **yarn** (recommended):

```bash
yarn install
```

Or using **npm**:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.development` file in the root directory:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=standard_lms

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=24h

# Optional: Add more configuration as needed
```

> ⚠️ **Important**: Never commit `.env` files to version control. Add them to `.gitignore`.

### 4. Create Database

```sql
CREATE DATABASE standard_lms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. Run Database Migrations

The application uses TypeORM's `synchronize` option in development mode. For production, use migrations:

```bash
# Development: Auto-sync (already configured)
# Production: Use migrations
yarn typeorm migration:run
```

---

## ⚙️ Configuration

### Environment Variables

| Variable         | Description           | Default       | Required |
| ---------------- | --------------------- | ------------- | -------- |
| `PORT`           | Server port           | `8000`        | No       |
| `NODE_ENV`       | Environment mode      | `development` | No       |
| `DB_HOST`        | MySQL host            | -             | Yes      |
| `DB_PORT`        | MySQL port            | `3306`        | No       |
| `DB_USERNAME`    | MySQL username        | -             | Yes      |
| `DB_PASSWORD`    | MySQL password        | -             | Yes      |
| `DB_NAME`        | Database name         | -             | Yes      |
| `JWT_SECRET`     | JWT signing secret    | -             | Yes      |
| `JWT_EXPIRATION` | Token expiration time | `24h`         | No       |

### Production Configuration

For production, create a `.env.production` file:

```env
NODE_ENV=production
PORT=3000
# ... other production values
```

Update `app.module.ts` to use the appropriate environment file:

```typescript
ConfigModule.forRoot({
  isGlobal: true,
  envFilePath:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
});
```

---

## 🏃 Running the Application

### Development Mode

```bash
# Start with hot-reload
yarn start:dev

# Or using npm
npm run start:dev
```

The application will be available at `http://localhost:8000`

### Production Mode

```bash
# Build the application
yarn build

# Start production server
yarn start:prod
```

### Debug Mode

```bash
yarn start:debug
```

### Other Commands

```bash
# Format code
yarn format

# Lint code
yarn lint

# Run tests
yarn test

# Run tests with coverage
yarn test:cov

# Run e2e tests
yarn test:e2e
```

---

## 📁 Project Structure

```
standard-lms/
├── src/
│   ├── auth/                    # Authentication module
│   │   ├── decorators/          # Custom decorators (@Public, @Roles)
│   │   ├── dto/                 # Data Transfer Objects
│   │   ├── guards/              # Auth guards (AuthGuard, RolesGuard)
│   │   ├── auth.controller.ts   # Auth endpoints
│   │   ├── auth.service.ts      # Auth business logic
│   │   └── auth.module.ts       # Auth module definition
│   │
│   ├── user/                    # User module
│   │   ├── entity/              # User entity
│   │   ├── enum/                # User enums (roles)
│   │   ├── user.controller.ts   # User endpoints
│   │   ├── user.service.ts      # User business logic
│   │   └── user.module.ts       # User module definition
│   │
│   ├── course/                  # Course module
│   │   ├── entities/            # Course entity
│   │   ├── dto/                 # Course DTOs
│   │   ├── course.controller.ts # Course endpoints
│   │   ├── course.service.ts    # Course business logic
│   │   └── course.module.ts     # Course module definition
│   │
│   ├── database/                # Database configuration
│   │   └── database.module.ts   # TypeORM setup
│   │
│   ├── common/                  # Shared utilities
│   │   └── interfaces/          # TypeScript interfaces
│   │
│   ├── app.module.ts            # Root module
│   ├── app.controller.ts        # Root controller
│   ├── app.service.ts           # Root service
│   └── main.ts                  # Application entry point
│
├── test/                        # E2E tests
├── dist/                        # Compiled JavaScript (generated)
├── .env.development             # Environment variables (not in repo)
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

---

## 📚 API Documentation

### Base URL

```
http://localhost:8000
```

### Authentication Endpoints

#### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "fname": "John",
  "lname": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123!",
  "role": "student" // Optional: "student" | "teacher" | "admin"
}
```

**Response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**

```json
{
  "user": {
    "id": "uuid",
    "fname": "John",
    "lname": "Doe",
    "email": "john.doe@example.com",
    "role": "student",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Get User Profile

```http
GET /auth/profile
Authorization: Bearer {accessToken}
```

**Response:**

```json
{
  "id": "uuid",
  "fname": "John",
  "lname": "Doe",
  "email": "john.doe@example.com",
  "role": "student",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Course Endpoints

#### Create Course

```http
POST /courses
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "name": "Introduction to NestJS",
  "description": "Learn the fundamentals of NestJS framework",
  "level": "Beginner",
  "price": 99.99
}
```

**Required Roles:** `admin`, `teacher`

#### Get All Courses

```http
GET /courses
```

**Response:**

```json
[
  {
    "id": "uuid",
    "name": "Introduction to NestJS",
    "description": "Learn the fundamentals...",
    "level": "Beginner",
    "price": "99.99",
    "userId": "uuid",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get Course by ID

```http
GET /courses/{id}
```

#### Update Course

```http
PATCH /courses/{id}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "name": "Advanced NestJS",
  "price": 149.99
}
```

**Required Roles:** `admin`, `teacher`

#### Delete Course

```http
DELETE /courses/{id}
Authorization: Bearer {accessToken}
```

**Required Roles:** `admin`

### Error Responses

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

---

## 🗄️ Database Schema

### User Table

| Column      | Type        | Constraints       | Description                       |
| ----------- | ----------- | ----------------- | --------------------------------- |
| `id`        | UUID        | PRIMARY KEY       | User unique identifier            |
| `fname`     | VARCHAR(50) | NULLABLE          | First name                        |
| `lname`     | VARCHAR(50) | NOT NULL          | Last name                         |
| `email`     | VARCHAR     | UNIQUE, NOT NULL  | Email address                     |
| `password`  | VARCHAR     | NOT NULL          | Hashed password (Argon2)          |
| `role`      | ENUM        | DEFAULT 'student' | User role (student/teacher/admin) |
| `createdAt` | TIMESTAMP   | AUTO              | Creation timestamp                |
| `updatedAt` | TIMESTAMP   | AUTO              | Update timestamp                  |

### Course Table

| Column        | Type          | Constraints           | Description              |
| ------------- | ------------- | --------------------- | ------------------------ |
| `id`          | UUID          | PRIMARY KEY           | Course unique identifier |
| `name`        | VARCHAR(255)  | NOT NULL              | Course name              |
| `description` | TEXT          | NOT NULL              | Course description       |
| `level`       | ENUM          | DEFAULT 'Beginner'    | Course level             |
| `price`       | DECIMAL(10,2) | DEFAULT 0.00          | Course price             |
| `userId`      | UUID          | FOREIGN KEY, NULLABLE | Course creator ID        |
| `createdAt`   | TIMESTAMP     | AUTO                  | Creation timestamp       |
| `updatedAt`   | TIMESTAMP     | AUTO                  | Update timestamp         |

### Relationships

- **User** `1:N` **Course** - One user can create many courses

---

## 🔐 Authentication & Authorization

### Authentication Flow

1. User registers or logs in
2. Server validates credentials
3. Server generates JWT token with user payload
4. Client stores token and includes it in subsequent requests
5. `AuthGuard` validates token on protected routes

### Authorization

The application uses role-based access control (RBAC) with three roles:

- **Student**: Default role, can view courses
- **Teacher**: Can create and update courses
- **Admin**: Full access, can delete courses

### Using Guards

```typescript
// Protect entire controller
@UseGuards(AuthGuard, RolesGuard)
@Controller('courses')
export class CourseController {
  // All routes require authentication
}

// Make specific route public
@Public()
@Get()
findAll() {
  // This route is accessible without authentication
}

// Require specific roles
@Roles(UserRole.ADMIN, UserRole.TEACHER)
@Post()
create() {
  // Only admins and teachers can access
}
```

### JWT Token Structure

```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "role": "student",
  "username": "John Doe",
  "iat": 1234567890,
  "exp": 1234654290
}
```

---

## 🧪 Testing

### Unit Tests

```bash
# Run all unit tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:cov
```

### E2E Tests

```bash
yarn test:e2e
```

### Test Structure

```
src/
├── auth/
│   ├── auth.controller.spec.ts
│   └── auth.service.spec.ts
├── user/
│   ├── user.controller.spec.ts
│   └── user.service.spec.ts
└── course/
    ├── course.controller.spec.ts
    └── course.service.spec.ts
```

---

## 🚢 Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET` (minimum 32 characters)
- [ ] Disable TypeORM `synchronize` (use migrations)
- [ ] Set up proper CORS configuration
- [ ] Configure rate limiting
- [ ] Set up SSL/TLS certificates
- [ ] Configure database connection pooling
- [ ] Set up logging and monitoring
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline

### Docker Deployment (Example)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install --production
COPY . .
RUN yarn build
EXPOSE 8000
CMD ["yarn", "start:prod"]
```

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
DB_HOST=your-production-db-host
DB_USERNAME=your-db-user
DB_PASSWORD=your-secure-password
DB_NAME=standard_lms_prod
JWT_SECRET=your-very-strong-secret-key-min-32-chars
JWT_EXPIRATION=1h
```

---

## 🤝 Contributing

We welcome contributions from the community! This project is open to everyone, and we appreciate your help in making it better.

### How to Contribute

#### 1. Fork the Repository

Click the "Fork" button at the top right of the repository page to create your own copy.

#### 2. Clone Your Fork

```bash
git clone https://github.com/your-username/standard-lms.git
cd standard-lms
```

#### 3. Create a Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/your-bug-fix
```

**Branch Naming Convention:**

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates
- `chore/` - Maintenance tasks

#### 4. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Update documentation if needed
- Write or update tests

#### 5. Commit Your Changes

```bash
git add .
git commit -m "feat: add new feature description"
```

**Commit Message Convention:**

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Build process or auxiliary tool changes

#### 6. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

#### 7. Create a Pull Request

1. Go to the original repository on GitHub
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill out the PR template:
   - Describe your changes
   - Reference any related issues
   - Add screenshots if applicable
   - List any breaking changes

#### 8. Review Process

- Maintainers will review your PR
- Address any feedback or requested changes
- Once approved, your PR will be merged!

### Reporting Issues

Found a bug? Have a suggestion? Please open an issue!

**Before creating an issue:**

- Check if the issue already exists
- Use a clear, descriptive title
- Provide steps to reproduce
- Include expected vs actual behavior
- Add relevant labels

**Issue Template:**

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**

- OS: [e.g., Windows 10]
- Node version: [e.g., 18.17.0]
- Database: [e.g., MySQL 8.0]

**Additional context**
Add any other context about the problem.
```

### Code Style Guidelines

- Follow TypeScript best practices
- Use meaningful variable and function names
- Keep functions small and focused
- Add JSDoc comments for public APIs
- Follow NestJS conventions
- Run `yarn lint` before committing

### Development Workflow

1. **Always start from the latest main branch**

   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create your feature branch**

   ```bash
   git checkout -b feature/your-feature
   ```

3. **Make changes and test**

   ```bash
   yarn start:dev
   yarn test
   ```

4. **Ensure code quality**

   ```bash
   yarn lint
   yarn format
   ```

5. **Commit and push**
   ```bash
   git commit -m "feat: your feature"
   git push origin feature/your-feature
   ```

### Areas for Contribution

We're looking for help in these areas:

- 🐛 **Bug Fixes**: Fix existing issues
- ✨ **New Features**: Add requested features
- 📚 **Documentation**: Improve docs and examples
- 🧪 **Tests**: Increase test coverage
- 🎨 **UI/UX**: Improve API design
- 🔒 **Security**: Security improvements
- ⚡ **Performance**: Optimize code
- 🌐 **Internationalization**: Add i18n support
- 📦 **Docker**: Improve containerization
- 🔧 **DevOps**: CI/CD improvements

### Getting Help

- 💬 **Discussions**: Use GitHub Discussions for questions
- 🐛 **Issues**: Report bugs via Issues
- 📧 **Email**: Contact maintainers directly
- 📖 **Documentation**: Check the docs first

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Examples of behavior that contributes to a positive environment:**

- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Examples of unacceptable behavior:**

- Harassment, discriminatory language, or comments
- Trolling, insulting/derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct inappropriate for a professional setting

### Enforcement

Project maintainers are responsible for clarifying and enforcing our standards. Violations may result in temporary or permanent bans.

---

## 🔒 Security

### Security Best Practices

- ✅ Passwords are hashed using Argon2
- ✅ JWT tokens for stateless authentication
- ✅ Input validation on all endpoints
- ✅ SQL injection protection via TypeORM
- ✅ Password excluded from API responses

### Reporting Security Issues

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please email security concerns to: `security@yourdomain.com`

Include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will respond within 48 hours and work with you to resolve the issue.

### Security Checklist

- [ ] Use strong, unique JWT secrets
- [ ] Keep dependencies updated
- [ ] Use HTTPS in production
- [ ] Implement rate limiting
- [ ] Regular security audits
- [ ] Monitor for suspicious activity

---

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**Solution:**

- Verify MySQL is running
- Check database credentials in `.env.development`
- Ensure database exists: `CREATE DATABASE standard_lms;`

#### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::8000
```

**Solution:**

```bash
# Change PORT in .env.development
PORT=8001

# Or kill the process using port 8000
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8000 | xargs kill
```

#### JWT Token Invalid

```
UnauthorizedException: Invalid or expired token
```

**Solution:**

- Check `JWT_SECRET` matches between environments
- Verify token hasn't expired
- Ensure token is sent in `Authorization: Bearer <token>` header

#### TypeORM Synchronize Warning

**Solution:**

- In production, disable `synchronize` and use migrations
- Update `database.module.ts`:
  ```typescript
  synchronize: configService.get<string>('NODE_ENV') !== 'production';
  ```

### Getting Help

If you're still experiencing issues:

1. Check existing [GitHub Issues](https://github.com/your-username/standard-lms/issues)
2. Search [GitHub Discussions](https://github.com/your-username/standard-lms/discussions)
3. Create a new issue with detailed information

---

## 🗺️ Roadmap

### Planned Features

- [ ] **User Management**
  - [ ] Email verification
  - [ ] Password reset functionality
  - [ ] User profile picture upload
  - [ ] Account deactivation

- [ ] **Course Features**
  - [ ] Course enrollment system
  - [ ] Course progress tracking
  - [ ] Course reviews and ratings
  - [ ] Course categories/tags
  - [ ] Course search and filtering
  - [ ] Course prerequisites

- [ ] **Content Management**
  - [ ] Lesson management
  - [ ] Video upload and streaming
  - [ ] Assignment system
  - [ ] Quiz/exam functionality
  - [ ] Certificate generation

- [ ] **Additional Features**
  - [ ] Notification system
  - [ ] Discussion forums
  - [ ] File upload/download
  - [ ] Payment integration
  - [ ] Analytics dashboard
  - [ ] API rate limiting
  - [ ] Swagger/OpenAPI documentation
  - [ ] GraphQL support

### Version History

- **v0.0.1** (Current)
  - Initial release
  - Basic authentication
  - Course CRUD operations
  - Role-based access control

---

## 💬 Support

### Get Help

- 📖 **Documentation**: Check this README and code comments
- 💬 **Discussions**: [GitHub Discussions](https://github.com/your-username/standard-lms/discussions)
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-username/standard-lms/issues)
- 📧 **Email**: support@yourdomain.com

### Community

- 🌟 Star the repository if you find it useful
- 🍴 Fork the repository to contribute
- 📢 Share with others who might benefit
- 💡 Suggest new features and improvements

---

## 📄 License

This project is **UNLICENSED**. All rights reserved.

See the [LICENSE](LICENSE) file for more information.

---

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - The progressive Node.js framework
- [TypeORM](https://typeorm.io/) - Amazing ORM for TypeScript
- All contributors who help improve this project

---

<div align="center">

**Made with ❤️ by the Standard LMS Team**

[⬆ Back to Top](#-standard-lms-learning-management-system)

</div>
