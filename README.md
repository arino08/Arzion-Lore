# ArzionLore

A dynamic platform for creating and sharing stories with real-time updates and markdown support.

## Features

- 🔐 Google Authentication
- 📝 Markdown Content Creation
- 🎨 Rich Text Editor
- 🔄 Real-time Updates
- 👥 User Profiles
- 📊 View Analytics
- 🏷️ Category Based Filtering
- 🔍 Search Functionality

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Sanity CMS
- TailwindCSS
- Framer Motion
- NextAuth.js
- Markdown-it

## Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn
- Sanity Account
- Google OAuth Credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/arzionlore.git
cd arzionlore
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a 

.env.local

 file:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

4. Run the development server:
```bash
npm run dev
```

## Project Structure

```
arzion/
├── app/               # Next.js app router pages
├── components/        # React components
├── lib/              # Utility functions
├── public/           # Static files
├── sanity/           # Sanity configuration
└── styles/           # Global styles
```

## Features in Detail

### Authentication
- Google OAuth integration
- Protected routes
- User sessions

### Content Management
- Markdown editor
- Image uploads
- Real-time updates
- View tracking

### User Experience
- Responsive design
- Animations
- Search functionality
- Category filtering

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request