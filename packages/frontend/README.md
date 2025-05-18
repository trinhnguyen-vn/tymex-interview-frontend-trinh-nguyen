
## Getting Started
### Prerequisites
- Node.js 18 or later
- Docker (for containerized deployment)
- Yarn or npm package manager

Can run by three ways: 
### Local Development
First, install dependencies and run the development server:
```bash
npm install && npm run dev
# or
yarn && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Docker Deployment
```bash
# Build the Docker image and run container
docker build && docker start
```

### Using Makefile
For easier Docker management, use the provided Makefile:
```bash
# Pull latest code and rebuild
make auto

# View logs
make log

# Stop container
make stop
```


## Code Structure
## Technologies
- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: CSS Modules
- **State Management**: React Context
- **API Integration**: Axios
- **Containerization**: Docker
- **CI/CD**: GitHub Action

## Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_HOST_URL=your_api_url
SERVER_API_HOST_URL=your_server_api_url
```

## Development Workflow
1. Create a new branch for your feature
2. Make your changes
3. Run tests: `yarn test`
4. Run linting: `yarn lint`
5. Submit a pull request

