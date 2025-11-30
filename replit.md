# Imagify - AI Text-to-Image Generator

## Overview
Imagify is a full-stack web application that generates images from text prompts using AI. The application uses the Clipdrop API for image generation and includes user authentication, credit management, and payment integration with Razorpay.

## Project Structure
```
.
├── client/                 # React frontend with Vite
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context for state management
│   │   └── assets/        # Images and SVG files
│   └── .env              # Frontend environment variables
├── server/                # Express.js backend
│   ├── config/           # Database configuration
│   ├── controllers/      # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Authentication middleware
│   └── .env             # Backend environment variables
└── .gitignore
```

## Technology Stack
- **Frontend**: React 19, Vite 7, Tailwind CSS 4, React Router, Axios
- **Backend**: Node.js, Express 5, MongoDB (Mongoose)
- **Authentication**: JWT
- **Payment**: Razorpay
- **Image Generation**: Clipdrop API

## Development Setup
The application is configured to run in Replit with:
- Frontend running on port 5000 (0.0.0.0)
- Backend running on port 4000 (localhost)
- Vite configured to allow all hosts for Replit proxy support

## Environment Variables

### Server (.env in server/)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CLIPDROP_API` - API key for Clipdrop image generation
- `RAZORPAY_KEY_ID` - Razorpay payment gateway key ID
- `RAZORPAY_KEY_SECRET` - Razorpay payment gateway secret
- `PORT` - Server port (default: 4000)
- `CURRENCY` - Currency for payments (default: INR)

### Client (.env in client/)
- `VITE_BACKEND_URL` - Backend API URL (http://localhost:4000 for development)
- `VITE_RAZORPAY_KEY_ID` - Razorpay key ID for frontend

## Running the Application
The application uses a single workflow that starts both the backend and frontend:
```bash
cd server && node server.js & cd client && npm run dev
```

## Deployment
Configured for VM deployment with:
- Build step: Builds the Vite frontend
- Run step: Starts both server and preview server on port 5000

## Recent Changes (November 30, 2025)
- Set up Replit environment from GitHub import
- Configured Vite to support Replit proxy (allowedHosts: true, host: 0.0.0.0, port: 5000)
- Created .gitignore for Node.js project
- Installed all dependencies (client and server)
- Configured workflow to run full-stack application
- Set up deployment configuration for production
- Fixed client .env formatting issue

## Database
Uses MongoDB Atlas for data persistence with the following models:
- User model (authentication, credit balance)
- Transaction model (payment records)

## API Routes
- `/api/user` - User authentication and credit management
- `/api/image` - Image generation endpoints
