# Mongoose Quick Start with TypeScript

A robust Node.js API template built with Express, Mongoose, and TypeScript, featuring authentication, error handling, and best practices. Use this template to quickly bootstrap your backend projects.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/tariqul420/mongoose-ts-starter?style=social)](https://github.com/tariqul420/mongoose-ts-starter/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/tariqul420/mongoose-ts-starter?style=social)](https://github.com/tariqul420/mongoose-ts-starter/network/members)

## Features

- **TypeScript** - Written in TypeScript for better type safety and developer experience
- **Authentication** - JWT-based authentication with role-based access control
- **Security** - Built-in security best practices
- **API Documentation** - Well-documented API endpoints
- **Error Handling** - Centralized error handling middleware
- **Environment Variables** - Easy configuration through environment variables
- **Code Quality** - ESLint and Prettier for code quality and formatting
- **MongoDB Integration** - Mongoose schemas, models, and connection management
- **Deployment Ready** - Configuration for easy deployment on Vercel

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Getting Started

### Using as a Template

This repository is set up as a template. To create your project:

1. Click the "Use this template" button at the top of the repository page
2. Or clone the repository and remove the .git folder:
   ```bash
   git clone https://github.com/tariqul420/mongoose-ts-starter.git my-project
   cd my-project
   rm -rf .git
   git init
   ```

### Standard Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/tariqul420/mongoose-ts-starter.git
   cd mongoose-ts-starter
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   PORT=3000
   NODE_ENV=development
   ACCESS_TOKEN_SECRET=your_access_token_secret
   MONGODB_DATABASE_URL=your_mongodb_connection_string
   MONGODB_DATABASE_PASSWORD=your_mongodb_password
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── lib/            # Utility functions
├── middlewares/    # Custom middlewares
├── models/         # Mongoose models
├── routes/         # API routes
├── types/          # TypeScript type definitions
└── server.ts       # Application entry point
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### User Management

- `GET /api/users/me` - Get current user profile
- `PATCH /api/users/me` - Update user profile
- `DELETE /api/users/me` - Delete user account

## Error Handling

The API uses a centralized error handling mechanism. All errors are caught and formatted consistently:

```typescript
{
  "message": "Error message",
  "status": 400
}
```

## Security Features

- JWT-based authentication
- Password hashing
- CORS enabled
- Rate limiting
- Security headers
- Input validation

## Deployment

This template includes configuration for deploying to Vercel. The `vercel.json` file is already set up for Node.js applications.

To deploy to Vercel:

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root
3. Follow the prompts to deploy

## Related Resources

### Mongoose Templates & Starters

- [mongoose-js-starter](https://github.com/tariqul420/mongoose-js-starter) - JavaScript version of this template (Mongoose + Javascript + Express.js)
- [mongoose-ts-starter](https://github.com/tariqul420/mongoose-ts-starter) - Typescript version of this template (Mongoose + Typescript + Express.js)

### Node.js Templates & Starters

- [node-js-starter](https://github.com/tariqul420/node-js-starter) - JavaScript version of this template (Javascript + Express.js)
- [node-ts-starter](https://github.com/tariqul420/node-ts-starter) - Typescript version of this template (Typescript + Express.js)

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository: [https://github.com/tariqul420/mongoose-ts-starter/issues](https://github.com/tariqul420/mongoose-ts-starter/issues)
