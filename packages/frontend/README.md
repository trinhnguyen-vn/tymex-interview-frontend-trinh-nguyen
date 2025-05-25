
## Getting Started

### Local Development
1. Setup Environment Variables
Create a `.env` file in the packages/frontend directory or copy content from `.env.example`:
```env
NEXT_PUBLIC_API_HOST_URL=your_api_url
```
2. Install dependencies and run the app:
```bash
yarn && yarn dev
```

### Key Components
- **Products**: Main marketplace component, List of Products
- **Navbar**: Navigation component
- **Footer**: Footer component
- **TBDComponent**: Placeholder component

## Features
- Product listing and filtering
   + Note: Filter & search box works separately with Filter by Category Chip. When selecting filter by Category chip, it reset Filter & search params and vice versa
- Category-based navigation
- Mobile Responsive
- Unit testing
- Docker support

## Testing Strategy
- Unit tests for components, ultilities
- Snapshot testing for Static component (Footer)
- Integration tests for API calls
- Test coverage reporting

