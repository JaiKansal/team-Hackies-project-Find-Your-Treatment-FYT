# Hospital Booking Platform

## 🎯 Problem Statement

In India, finding and booking appointments at hospitals is often a challenging and time-consuming process. Patients face several issues:
- Difficulty in finding hospitals with specific treatments
- Standing in long lines just to get an appointment
- Lack of transparent pricing information
- Time-consuming appointment booking process
- No easy way to compare hospitals
- Limited access to hospital facilities and doctor information


## 💡 Approach & Solution

We developed a comprehensive hospital booking platform that addresses these challenges through:

1. **Intelligent Search System**
   - Advanced filtering by treatment, location, and hospital type
   - Real-time availability checking
   - Price transparency
   - Rating-based recommendations

2. **Streamlined Booking Process**
   - One-click appointment scheduling
   - Real-time slot availability
   - Instant booking confirmation
   - Automated reminders

3. **Hospital Comparison**
   - Side-by-side comparison of hospitals
   - Treatment-wise cost comparison
   - Facility comparison
   - User reviews and ratings

4. **User-Centric Design**
   - Intuitive interface
   - Mobile-first approach
   - Multi-language support
   - Accessibility features

## ✨ Features

### 1. Hospital Search & Discovery
- Advanced search by treatment, location, and hospital type
- Filter hospitals by price range and ratings
- Sort hospitals by price, rating, or name
- View detailed hospital profiles with treatments and facilities
- Compare hospitals side by side

### 2. Booking System
- Real-time appointment scheduling
- Available time slot checking
- Booking management (create, update, cancel)
- Booking history tracking
- Upcoming and past appointments view

### 3. User Features
- User authentication (Email/Password and Google)
- User profiles
- Booking history
- Hospital comparisons
- Favorite hospitals

### 4. Hospital Information
- Detailed hospital profiles
- Treatment listings
- Facility information
- Contact details
- Price information
- Ratings and reviews

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Form Handling**: React Hook Form
- **Validation**: Zod

### Backend
- **Authentication**: NextAuth.js
- **Database**: Prisma
- **API**: Next.js API Routes
- **Data Validation**: Zod

### Development Tools
- **Version Control**: Git
- **Package Manager**: npm
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest

## 📸 Screenshots

### Home Page
![Home Page] https://drive.google.com/file/d/1ikq-ym77KCiUI-UEahn4VtgrBjfK0uEP/view?usp=sharing
*Landing page with search functionality and featured hospitals*

### Hospital Search
![Hospital Search] https://drive.google.com/file/d/1HHNpRakAl9Eu2Ubq9mZUhw-MpsOT3t_B/view?usp=sharing
*Advanced search interface with filters and sorting options*

### Hospital Details
![Hospital Details] https://drive.google.com/file/d/1ntIktKLKcbgkkksg1TXCS8q818BIYRa2/view?usp=sharing
*Detailed view of hospital information, treatments, and facilities*

### Booking Page
![Booking Page] https://drive.google.com/file/d/1uWs1BC3vOXcK03dB9TfFQqdPmeiOtrQe/view?usp=sharing
*Appointment booking interface with available time slots*

### Hospital List for Comparision
![Hospital List] https://drive.google.com/file/d/15GsFDgY36go9FgtI1Dd10YdfuDb5aNgh/view?usp=sharing
*Hospital List for adding them to compare*

### Comparison View
![Comparison View] https://drive.google.com/file/d/1VR4oAGmYgBBoqw5B5FaefV_78uiWfP08/view?usp=sharing
*Side-by-side comparison of selected hospitals*

## 🚀 Run Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JaiKansal/team-Hackies-project-Find-Your-Treatment-FYT.git
cd hospital-booking
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure environment variables:
```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Development Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── booking/          # Booking pages
│   ├── compare/          # Hospital comparison
│   ├── hospitals/        # Hospital listing and details
│   └── profile/          # User profile pages
├── components/            # Reusable components
├── lib/                   # Utility functions and types
└── styles/               # Global styles
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Jai Kansal
- Manya Goel

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- NextAuth.js for authentication
- All contributors who have helped shape this project
