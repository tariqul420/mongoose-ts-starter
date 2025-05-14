# Mongoose Quick Start with TypeScript

A robust Node.js API template built with Express, Mongoose, and TypeScript, featuring authentication, error handling, and best practices. Use this template to quickly bootstrap your backend projects.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/tariqul420/mongoose-quick-start-ts?style=social)](https://github.com/tariqul420/mongoose-quick-start-ts/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/tariqul420/mongoose-quick-start-ts?style=social)](https://github.com/tariqul420/mongoose-quick-start-ts/network/members)

## Features

- **TypeScript** - Written in TypeScript for better type safety and developer experience
- **Authentication** - JWT-based authentication with role-based access control
- **Security** - Built-in security best practices
- **API Documentation** - Well-documented API endpoints
- **Error Handling** - Centralized error handling middleware
- **Environment Variables** - Easy configuration through environment variables
- **Code Quality** - ESLint and Prettier for code quality and formatting

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
   git clone https://github.com/tariqul420/mongoose-quick-start-ts.git my-project
   cd my-project
   rm -rf .git
   git init
   ```

### Standard Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/tariqul420/mongoose-quick-start-ts.git
   cd mongoose-quick-start-ts
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

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Tariqul Islam

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Support

For support, please open an issue in the GitHub repository: [https://github.com/tariqul420/mongoose-quick-start-ts/issues](https://github.com/tariqul420/mongoose-quick-start-ts/issues)
