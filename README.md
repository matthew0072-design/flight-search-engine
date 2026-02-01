# ✈️ Flight Search Engine

A modern, responsive flight search application that allows users to explore, filter, and compare flight options in real time, with a strong focus on performance, usability, and clean engineering.

## 🚀 Live Demo
👉 [View Live Demo](https://www.flight-search-engine-eta.vercel.app)

## 🎥 Demo Video
👉 [Watch Loom Demo](https://www.loom.com/share/4fcc60d972a74f9684c4b7ef3153d9de)


## ✨ Features

- **Real-time Flight Search** - Search flights using the Amadeus API with origin, destination, and date inputs
- **Complex Filtering** - Simultaneous filters for number of stops, price range, and airlines that update results instantly
- **Live Price Visualization** - Interactive bar chart showing average prices by airline using Recharts
- **Stats Dashboard** - Quick overview displaying total flights, best price, average price, and number of airlines
- **Best Deal Highlighting** - Automatically highlights the cheapest flight option with a special badge
- **Fully Responsive** - Seamless experience on mobile (drawer navigation) and desktop devices
- **Type-Safe by Design** - Strongly typed throughout the application, including API responses and derived state, to reduce runtime errors and improve maintainability.
- **Smart Loading States** - Elegant loading animations and comprehensive error handling

## 🛠️ Tech Stack

- **React 18** - UI library with hooks
- **TypeScript** - Complete type safety throughout the application
- **TanStack Query** - Server-state management with caching and request deduplication
- **Recharts** - Data visualization library for interactive charts
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Lucide React** - Beautiful, consistent icon library
- **Vite** - Lightning-fast build tooling and dev server
- **Amadeus API** - Real-time flight data from the travel industry's leading API

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Amadeus API credentials (free tier available)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/flight-search-engine.git
cd flight-search-engine
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:
```env
VITE_AMADEUS_KEY=your_amadeus_api_key
VITE_AMADEUS_SECRET=your_amadeus_api_secret
```

### 4. Run development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔑 Getting Amadeus API Credentials

1. Visit [Amadeus for Developers](https://developers.amadeus.com/)
2. Sign up for a free account
3. Create a new app in the Self-Service portal
4. Copy your **API Key** and **API Secret** from the Test environment
5. Add these credentials to your `.env` file

## 📁 Project Structure

```
src/
├── api/
│   └── amadeus.ts          # API client with authentication
├── components/
│   
│   ├── FlightSkeleton.tsx      # Skeleton Loader
│   └── SearchForm.tsx      # Search input form component
|   pages/
|   └── Home.tsx            # Main Page With Search, filters, and Results
├── hooks/
│   └── useFlights.ts       # TanStack Query hook for flight data
├── types/
│   ├── flight.ts           # Flight data interface & Complete Amadeus API response types
│   
└── utils/
    └── normalizeFlights.ts # Transform API responses to application format
```

## 🎨 Key Features Explained

### Dynamic Filtering System
All three filters (stops, price, airlines) work simultaneously and update both the flight list and price graph in real-time, providing instant visual feedback.

### Price Visualization
The bar chart displays the average price per airline, making it easy to compare pricing across carriers at a glance. Each airline is assigned a distinct color automatically.

### Mobile-First Responsive Design
The filter system adapts to mobile devices with a slide-out drawer interface, ensuring full functionality and usability across all screen sizes.

### Complete Type Safety
100% TypeScript coverage with properly typed Amadeus API responses, eliminating runtime type errors and providing excellent IDE autocomplete.

## 🧪 Available Scripts

```bash
# Start development server
npm run dev

# Type check without building
npm run type-check

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Add environment variables in project settings:
    - `VITE_AMADEUS_KEY`
    - `VITE_AMADEUS_SECRET`
5. Click "Deploy"

### Netlify

1. Push your code to GitHub
2. Visit [netlify.com](https://netlify.com) and sign in
3. Click "New site from Git" and select your repository
4. Build settings:
    - Build command: `npm run build`
    - Publish directory: `dist`
5. Add environment variables in "Site settings" → "Environment variables"
6. Click "Deploy site"

## 🎯 Implementation Highlights

- **Efficient Data Fetching**: TanStack Query handles request caching and deduplication, preventing unnecessary API calls
- **Optimized State Management**: React hooks with proper dependency arrays for optimal re-renders
- **Comprehensive Error Handling**: Graceful error states for API failures with user-friendly messages
- **Professional UI/UX**: Attention to visual hierarchy, loading states, empty states, and interactive feedback
- **Clean Code Architecture**: Separation of concerns with dedicated folders for API, components, hooks, types, and utilities

## 🎥 Demo Video Highlights

In the Loom demo, I showcase:
- Complete search workflow from input to results
- Real-time filter interactions and graph updates
- Mobile responsive design with drawer navigation
- Technical implementation decisions and architecture
- Code quality and TypeScript usage

## 🎓 Assessment Requirements Met

This project fulfills all requirements for the Spotter technical assessment:

- ✅ **Search & Results**: Full search interface with origin, destination, and date inputs feeding into a clear results list
- ✅ **Live Price Graph**: Interactive visualization using Recharts that updates in real-time with filter changes
- ✅ **Complex Filtering**: Three simultaneous filters (stops, price, airlines) that instantly update both list and graph
- ✅ **Responsive Design**: Fully functional layouts optimized for both mobile and desktop experiences

Additional polish added:
- Stats dashboard with key metrics
- Best deal highlighting
- Professional gradient design
- Comprehensive TypeScript types
- Error and loading states

## 👨‍💻 Developer

**Fagoroye Ayobami**
- Frontend / Full-Stack Engineer
- GitHub: github.com/matthew0072-design

## 📄 License

This project is open source and available under the MIT License.

---

*Built with ❤️ for the Spotter interview process*