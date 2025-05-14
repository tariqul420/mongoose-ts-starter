# Mongoose Quick Start with TypeScript

A robust Node.js API template built with Express, Mongoose, and TypeScript, featuring authentication, error handling, and best practices.

## Features

- 🚀 **TypeScript** - Written in TypeScript for better type safety and developer experience
- 🔐 **Authentication** - JWT-based authentication with role-based access control
- 🛡️ **Security** - Built-in security best practices
- 📝 **API Documentation** - Well-documented API endpoints
- 🎯 **Error Handling** - Centralized error handling middleware
- 🔄 **Environment Variables** - Easy configuration through environment variables
- 🧪 **Code Quality** - ESLint and Prettier for code quality and formatting

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mongoose-quick-start-ts
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_jwt_secret
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
├── lib/           # Utility functions
├── middlewares/   # Custom middlewares
├── models/        # Mongoose models
├── routes/        # API routes
├── types/         # TypeScript type definitions
└── server.ts      # Application entry point
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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, email [your-email] or open an issue in the repository.
