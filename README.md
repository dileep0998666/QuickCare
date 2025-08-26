# QuickCare - Healthcare Management System

A modern healthcare appointment booking and management platform built with Next.js 15, MongoDB, and TypeScript.

## 🚀 Features

- **Patient Management**: Secure user authentication with JWT and Google OAuth
- **Hospital Integration**: Multi-hospital backend integration
- **Real-time Booking**: Live appointment scheduling with queue management
- **Review System**: Patient feedback and rating system
- **Responsive Design**: Mobile-first design with modern UI components
- **Secure Payments**: Mock payment integration for appointments

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **Authentication**: JWT, Google OAuth 2.0
- **UI Components**: Radix UI, Lucide Icons
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd quickcare
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your environment variables:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure secret for JWT tokens
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret

4. Run the development server:
```bash
npm run dev
```

## 🚀 Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account
- MongoDB Atlas database

### Steps

1. **Push to GitHub**:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard:
     - `MONGODB_URI`
     - `JWT_SECRET`
     - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
     - `GOOGLE_CLIENT_SECRET`

3. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

### Environment Variables Setup in Vercel

1. Go to your project dashboard in Vercel
2. Navigate to Settings → Environment Variables
3. Add the following variables:

| Name | Value | Environment |
|------|-------|-------------|
| `MONGODB_URI` | Your MongoDB connection string | Production, Preview, Development |
| `JWT_SECRET` | Your JWT secret key | Production, Preview, Development |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Your Google OAuth client ID | Production, Preview, Development |
| `GOOGLE_CLIENT_SECRET` | Your Google OAuth client secret | Production, Preview, Development |

## 🏥 Hospital Integration

QuickCare supports multiple hospital backends. Each hospital can have its own API endpoint:

- Hospital A: `https://quickcare-hospa.onrender.com`
- Hospital B: `https://quickcare-hospb.onrender.com`

## 📱 Features Overview

### For Patients
- Smart location-based hospital discovery
- Real-time doctor availability
- Secure appointment booking
- Queue status tracking
- Review and rating system

### For Hospitals
- Self-service integration
- Independent backend control
- Real-time appointment management
- Patient data security

## 🔧 Development

### Project Structure
```
quickcare/
├── app/                    # Next.js 13+ app directory
│   ├── api/               # API routes
│   ├── hospital/          # Hospital pages
│   ├── login/             # Authentication pages
│   └── ...
├── components/            # Reusable components
├── contexts/              # React contexts
├── lib/                   # Utility functions
├── models/                # MongoDB models
└── public/                # Static assets
```

### Key Components
- `AuthProvider`: Handles user authentication state
- `BookingModal`: Appointment booking interface
- `ConnectionStatus`: Hospital connectivity status

## 🔒 Security

- JWT-based authentication
- HTTP-only cookies for token storage
- Environment variable protection
- Input validation and sanitization
- Secure MongoDB connections

## 📊 Performance

- Server-side rendering with Next.js
- Image optimization
- Code splitting
- Caching strategies
- MongoDB connection pooling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact: support@quickcare.com

## 🚀 Live Demo

Visit the live application: [Your Vercel URL]

---

Built with ❤️ by the QuickCare team