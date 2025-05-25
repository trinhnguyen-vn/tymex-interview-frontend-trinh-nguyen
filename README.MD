# Tymex Frontend Application

## Overview
This is a modern web application built with Next.js and React, featuring a marketplace interface for products. The application is designed with scalability, maintainability, and user experience in mind.

👉 [Online Demo](https://tymex-interview-frontend-trinh-nguyen-frontend.vercel.app/)
## Project Architecture

### Monorepo Structure
This project uses a monorepo structure to manage both frontend and mock server code in a single repository. This approach offers several key benefits:

1. **Independent Development**
   - Frontend team can develop without being blocked by backend dependencies
   - Mock server provides realistic API responses during development
   - Enables parallel development of frontend and backend features

2. **Consistent Development Environment**
   - Consistent API contract across development and production

3. **Mock Server Benefits**
   - Simulates real API behavior without backend dependencies
   - Provides consistent test data for development


#### Code Structure
```
packages/
├── server/           # Mock server
│   ├── data/         # Mock data and fixtures
│   └── routes/       # API route definitions
├── frontend/         # Frontend Application code
    src/
    ├── api/          # API integration and services
    ├── app/          # Next.js app router pages
    ├── components/   # Reusable React components
    ├── constants/    # Application constants
    ├── hooks/        # Custom React hooks
    ├── styles/       # Global styles and theme
    ├── tests/        # Test utilities
    ├── theme/        # Theme configuration
    ├── types/        # TypeScript type definitions
    └── utils/        # Utility functions
```

## Technologies Used
### Core Technologies
- **Next.js 15.3.2**: React-bases framework, improve SEO( suitable for comercial application)
- **React 19.0.0**: JavaScript library for building user interfaces
- **TypeScript**: For type-safe code
- **Material-UI (MUI)**: Component library for consistent UI design
  - @mui/material: Core components
  - @mui/icons-material: Icon components
  - @emotion/react & @emotion/styled: Styling solution
- **json-server**: Server mocking framework

### Development Tools
- **Jest**: Testing framework
- **React Testing Library**: For component testing
- **Language**: TypeScript
- **ESLint**: Code linting
- **TypeScript**: Static type checking
- **Docker**: Containerization
- **CI/CD**: GitHub Action

## Getting Started
### Prerequisites
- Node.js (LTS version)
- Yarn package manager
- Docker (for containerized deployment)

### Installation
1. Clone the repository
2. Setup Environment Variables
Create a `.env` file in the packages/frontend directory:
```env
NEXT_PUBLIC_API_HOST_URL=your_api_url
```

3. Install dependencies and start app:
   ```bash
   yarn install && yarn dev
   ```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
The mock server will provide API responses at `http://localhost:5005`

### Testing
```bash
yarn test
yarn test:cov  # With coverage
```

### Building
```bash
yarn build
```

## Code Quality
- ESLint for code linting
- TypeScript for type safety
- Unit/integration test cover > 80% (branches, lines, statements)

## Contribution and Development Workflow
1. Create a new branch for your feature
2. Make your changes
3. Run tests: `yarn test`
4. Run linting: `yarn lint`
5. Submit a pull request
