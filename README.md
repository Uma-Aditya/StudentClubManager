# Student Club Management System

A comprehensive MERN stack application for managing student clubs, members, and activities with MySQL database.

## 🚀 Features

### Core Functionality
- **Multi-Role Authentication System** (Admin, Club Leader, Vice Leader, Member)
- **Club Management** - Create, edit, and manage student clubs
- **Member Management** - Handle club memberships and applications
- **Event Management** - Plan and coordinate club events
- **Announcement System** - Communicate with club members
- **Achievement System** - Gamify member participation
- **Real-time Notifications** - Keep users informed

### User Roles & Permissions
- **System Administrators** - Full system control and management
- **Club Leaders/Vice-Leaders** - Club-specific management and member oversight
- **Club Members** - Participation, discovery, and personal management

### Technical Features
- **Responsive Design** - Mobile-first approach with modern UI/UX
- **Glassmorphism Design** - Beautiful visual effects and animations
- **Real-time Updates** - WebSocket integration for live data
- **Progressive Web App** - Offline functionality and mobile app experience
- **Advanced Security** - JWT authentication, rate limiting, and input validation

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **multer** - File uploads
- **nodemailer** - Email notifications

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **React Hook Form** - Form management
- **Lucide React** - Icons

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **MySQL** (v8.0 or higher)
- **npm** or **yarn** package manager

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd student-club-management-system
```

### 2. Install Dependencies

```bash
# Install server dependencies
npm install

# Install client dependencies
npm run install-client
```

### 3. Database Setup

1. **Create MySQL Database**
   ```sql
   CREATE DATABASE student_clubs_db;
   ```

2. **Configure Environment Variables**
   ```bash
   # Copy the environment template
   cp env.example .env
   
   # Edit .env file with your database credentials
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=student_clubs_db
   DB_PORT=3306
   ```

3. **Initialize Database Tables**
   ```bash
   # The tables will be created automatically when you start the server
   # Or you can run the database initialization manually
   node config/database.js
   ```

### 4. Start the Application

#### Development Mode (Both Server and Client)
```bash
npm run dev
```

#### Production Mode
```bash
# Build the client
npm run build

# Start the server
npm start
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/verify` - Verify JWT token

### Clubs
- `GET /api/clubs` - Get all clubs with filtering
- `GET /api/clubs/:id` - Get club details
- `POST /api/clubs` - Create new club
- `PUT /api/clubs/:id` - Update club
- `DELETE /api/clubs/:id` - Delete club
- `GET /api/clubs/:id/members` - Get club members

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Memberships
- `GET /api/memberships` - Get memberships
- `POST /api/memberships` - Apply for club membership
- `PUT /api/memberships/:id` - Update membership status
- `DELETE /api/memberships/:id` - Leave club

## 🎨 Design System

### Color Palette
- **Primary**: Deep Purple (#6366F1) to Electric Blue (#3B82F6)
- **Success**: Emerald Green (#10B981)
- **Warning**: Warm Orange (#F59E0B)
- **Danger**: Red (#EF4444)
- **Info**: Cyan (#06B6D4)

### Typography
- **Display**: Poppins (Bold, 800)
- **Headings**: Poppins (Semi-bold, 600-700)
- **Body**: Inter (Regular, 400-500)
- **Mono**: JetBrains Mono (Code elements)

### Components
- **Glassmorphism Cards** - Semi-transparent with backdrop blur
- **Gradient Buttons** - Beautiful hover effects and animations
- **Responsive Grid** - Mobile-first layout system
- **Micro-interactions** - Smooth animations and transitions

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- **Mobile devices** (320px+)
- **Tablets** (768px+)
- **Desktop** (1024px+)
- **Large screens** (1440px+)

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt with configurable salt rounds
- **Input Validation** - Comprehensive request validation
- **Rate Limiting** - API request throttling
- **CORS Protection** - Cross-origin resource sharing security
- **Helmet.js** - Security headers and protection

## 🚀 Deployment

### Environment Variables
Make sure to set the following environment variables in production:

```bash
NODE_ENV=production
PORT=5000
CLIENT_URL=https://yourdomain.com
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
JWT_SECRET=your-secure-jwt-secret
JWT_REFRESH_SECRET=your-secure-refresh-secret
```

### Build Process
```bash
# Install all dependencies
npm run install-all

# Build the client
npm run build

# Start the production server
npm start
```

## 🧪 Testing

```bash
# Run client tests
npm run test

# Run server tests (if implemented)
npm run test:server
```

## 📁 Project Structure

```
student-club-management-system/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── package.json
├── config/                # Configuration files
│   └── database.js        # Database configuration
├── middleware/            # Express middleware
│   └── auth.js           # Authentication middleware
├── routes/                # API routes
│   ├── auth.js           # Authentication routes
│   ├── clubs.js          # Club management routes
│   ├── events.js         # Event management routes
│   └── ...
├── uploads/               # File uploads directory
├── server.js              # Main server file
├── package.json           # Server dependencies
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/student-club-management-system/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Basic authentication system
- ✅ Club management
- ✅ Member management
- ✅ Event management

### Phase 2 (Next)
- 🔄 Real-time notifications
- 🔄 File upload system
- 🔄 Email notifications
- 🔄 Advanced analytics

### Phase 3 (Future)
- 📋 Mobile app development
- 📋 Advanced reporting
- 📋 Integration with external services
- 📋 Multi-language support

---

**Built with ❤️ for better student club management**
