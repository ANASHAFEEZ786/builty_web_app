# 🚚 Builty Transport Management System

## Complete Project Documentation & Tutorial

**Author:** Muhammad Anas  
**Repository:** https://github.com/ANASHAFEEZ786/builty_web_app  
**Version:** 1.0.0  
**Last Updated:** February 2024

---

## 📑 Table of Contents

1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Step-by-Step Guide](#step-by-step-guide)
5. [Key Concepts Explained](#key-concepts-explained)
6. [Component Breakdown](#component-breakdown)
7. [Styling System](#styling-system)
8. [PDF Generation](#pdf-generation)
9. [How to Run](#how-to-run)
10. [Deployment Guide](#deployment-guide)

---

## 🎯 Project Overview

**Builty** is a modern Transport Management System designed for logistics and trucking businesses in Pakistan. It provides:

- 📊 **Dashboard** with real-time statistics and charts
- 📦 **Bookings Management** (Parchi/Waybill system)
- 🚛 **Challans** for trip management
- 💰 **Invoices & Payments** tracking
- 📄 **PDF Report Generation**
- ⚙️ **Settings** for company configuration

### Design Philosophy
- **Dark Futuristic Theme** inspired by Electron JS applications
- **Glassmorphism** effects for modern UI
- **Responsive Design** for all screen sizes
- **Pakistan-specific** data and currency (PKR)

---

## 🛠 Technologies Used

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 18.x |
| **Vite** | Build Tool & Dev Server | 5.x |
| **TailwindCSS** | Utility-first CSS Framework | 3.x |
| **React Router** | Client-side Routing | 6.x |
| **Recharts** | Charts & Graphs | 2.x |
| **Lucide React** | Icon Library | Latest |
| **jsPDF** | PDF Generation | 2.x |
| **jspdf-autotable** | PDF Table Plugin | 3.x |

### Why These Technologies?

1. **React + Vite**: Vite provides extremely fast development server with Hot Module Replacement (HMR). Much faster than Create React App.

2. **TailwindCSS**: Utility-first approach allows rapid UI development without writing custom CSS files. Perfect for prototyping and production.

3. **React Router**: Industry standard for single-page application routing in React.

4. **Recharts**: React-native charting library that integrates seamlessly with React components.

---

## 📁 Project Structure

```
builty_web_app/
├── 📄 index.html              # Entry HTML file
├── 📄 package.json            # Dependencies and scripts
├── 📄 vite.config.js          # Vite configuration
├── 📄 tailwind.config.js      # Tailwind configuration
├── 📄 postcss.config.js       # PostCSS configuration
├── 📁 public/
│   └── 🖼 truck.png           # Static assets
├── 📁 src/
│   ├── 📄 main.jsx            # React entry point
│   ├── 📄 App.jsx             # Main App with routing
│   ├── 📄 index.css           # Global styles
│   ├── 📁 components/
│   │   └── 📁 ui/
│   │       ├── 📄 Layout.jsx  # Main layout wrapper
│   │       └── 📄 Sidebar.jsx # Navigation sidebar
│   ├── 📁 pages/
│   │   ├── 📄 Dashboard.jsx   # Home/Dashboard page
│   │   ├── 📄 Bookings.jsx    # Bookings list
│   │   ├── 📄 NewBooking.jsx  # Create new booking
│   │   ├── 📄 Challans.jsx    # Challans management
│   │   ├── 📄 Invoices.jsx    # Invoices page
│   │   ├── 📄 Payments.jsx    # Payments page
│   │   ├── 📄 Reports.jsx     # PDF report generation
│   │   └── 📄 Settings.jsx    # App settings
│   └── 📁 lib/
│       └── 📄 utils.js        # Utility functions
```

---

## 📝 Step-by-Step Guide

### Step 1: Project Initialization

```bash
# Create a new Vite React project
npm create vite@latest builty_web_app -- --template react

# Navigate to the project
cd builty_web_app

# Install dependencies
npm install
```

### Step 2: Install Required Packages

```bash
# Styling
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Routing
npm install react-router-dom

# Charts
npm install recharts

# Icons
npm install lucide-react

# PDF Generation
npm install jspdf jspdf-autotable

# Utility
npm install clsx tailwind-merge
```

### Step 3: Configure Tailwind CSS

**tailwind.config.js:**
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: '#0f172a',  // Dark background
        surface: '#1e293b',     // Card background
        primary: {
          DEFAULT: '#3b82f6',   // Blue accent
          light: '#60a5fa',
          dark: '#2563eb',
        },
        // ... more colors
      },
    },
  },
  plugins: [],
}
```

### Step 4: Create the Utility Function

**src/lib/utils.js:**
```javascript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

This `cn()` function combines Tailwind classes intelligently, avoiding conflicts.

### Step 5: Set Up Global Styles

**src/index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-[#0a0e1a] text-slate-50 antialiased;
    font-family: 'Inter', sans-serif;
  }
  
  /* Dark theme for form elements */
  select, input[type="date"] {
    color-scheme: dark;
  }
}

@layer components {
  .glass-card {
    @apply bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl;
  }
  
  .gradient-text {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400;
  }
}
```

### Step 6: Create the Layout

**src/components/ui/Layout.jsx:**
```jsx
import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
```

### Step 7: Create the Sidebar

**src/components/ui/Sidebar.jsx:**
```jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Ticket, Bus, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'Bookings', icon: Ticket, path: '/bookings' },
    // ... more items
  ];

  return (
    <div className="w-72 bg-slate-900 flex flex-col h-full">
      {/* Logo */}
      <div className="p-6">
        <h1 className="font-bold text-xl text-white">Builty</h1>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center px-4 py-3 rounded-xl transition-all",
                isActive
                  ? "bg-blue-500/20 text-white"
                  : "text-slate-400 hover:text-white"
              )
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
```

### Step 8: Set Up Routing

**src/App.jsx:**
```jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/ui/Layout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
// ... import other pages

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          {/* ... other routes */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
```

---

## 🎓 Key Concepts Explained

### 1. React Components
Components are reusable UI building blocks. In this project:
- **Layout.jsx** - Wraps all pages with sidebar
- **Sidebar.jsx** - Navigation component
- **Dashboard.jsx** - Main dashboard page

### 2. React Router
```jsx
// NavLink automatically adds active class
<NavLink to="/bookings" className={({ isActive }) => isActive ? "active" : ""}>
  Bookings
</NavLink>
```

### 3. TailwindCSS Classes
```jsx
// Example of Tailwind utility classes
<div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-white/5">
  {/* Content */}
</div>
```

Common patterns:
- `bg-*` - Background color
- `p-*` - Padding
- `m-*` - Margin
- `rounded-*` - Border radius
- `text-*` - Text color/size
- `flex` - Flexbox layout
- `grid` - CSS Grid layout

### 4. Glassmorphism Effect
```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}
```

### 5. Conditional Styling with `cn()`
```jsx
import { cn } from '@/lib/utils';

<span className={cn(
  "px-2 py-1 rounded-lg text-xs",
  status === 'active' ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
)}>
  {status}
</span>
```

---

## 🧩 Component Breakdown

### Dashboard Component

**Key Features:**
- Statistics cards with gradient icons
- Area/Bar charts using Recharts
- Recent bookings table
- Glassmorphism card effects

**Chart Implementation:**
```jsx
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <AreaChart data={bookingsData}>
    <defs>
      <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
      </linearGradient>
    </defs>
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Area type="monotone" dataKey="bookings" stroke="#3B82F6" fill="url(#colorBookings)" />
  </AreaChart>
</ResponsiveContainer>
```

### Bookings Component

**Features:**
- Search functionality
- Filterable table
- Status badges with colors
- Link to create new booking

### Reports Component (PDF Generation)

**PDF Generation with jsPDF:**
```jsx
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const generatePDF = () => {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(22);
  doc.text('Report Title', 14, 25);
  
  // Add table
  autoTable(doc, {
    head: [['ID', 'Date', 'Amount']],
    body: [
      ['BK-001', '2024-02-01', 'PKR 50,000'],
      ['BK-002', '2024-02-02', 'PKR 75,000'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [59, 130, 246] },
  });
  
  // Save PDF
  doc.save('report.pdf');
};
```

---

## 🎨 Styling System

### Color Palette
| Color | Hex Code | Usage |
|-------|----------|-------|
| Background | `#0a0e1a` | Main background |
| Surface | `#1e293b` | Cards, panels |
| Primary | `#3b82f6` | Buttons, links |
| Accent | `#8b5cf6` | Highlights |
| Success | `#10b981` | Positive status |
| Warning | `#f59e0b` | Warnings |
| Error | `#ef4444` | Errors |

### Animation Classes
```css
/* Hover lift effect */
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

/* Floating animation */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

---

## 📄 PDF Generation

### Dependencies
```bash
npm install jspdf jspdf-autotable
```

### Basic Usage
```javascript
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Create new PDF document
const doc = new jsPDF();

// Add text
doc.text('Hello World', 10, 10);

// Add table
autoTable(doc, {
  head: [['Name', 'Email', 'Country']],
  body: [
    ['John', 'john@example.com', 'Pakistan'],
    ['Jane', 'jane@example.com', 'Pakistan'],
  ],
});

// Save
doc.save('document.pdf');
```

---

## ▶️ How to Run

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
Open http://localhost:5173 in your browser.

### Production Build
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

---

## 🚀 Deployment Guide

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy

### Deploy to Netlify
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Connect GitHub repository
4. Set build command: `npm run build`
5. Set publish directory: `dist`

---

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [Recharts Examples](https://recharts.org/en-US/examples)
- [Lucide Icons](https://lucide.dev/icons/)

---

## 🙏 Credits

Built with ❤️ by Muhammad Anas

**Technologies:**
- React + Vite
- TailwindCSS
- Recharts
- jsPDF

---

## 📝 License

This project is open source and available under the MIT License.

---

*Happy Coding! 🚀*
