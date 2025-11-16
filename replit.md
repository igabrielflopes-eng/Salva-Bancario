# Salva Bancário 2.0

## Overview
"Salva Bancário 2.0" is a comprehensive Brazilian financial calculator application built with React and Vite. It provides a suite of tools to help users make informed financial decisions, including investment simulations, loan calculators, and receivables discounting.

## Project Architecture

### Technology Stack
- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 6.2.0
- **Language**: TypeScript
- **Styling**: CSS-in-JS (embedded in index.tsx)
- **Charts**: Recharts (interactive data visualization)
- **Notifications**: React Hot Toast (modern toast notifications)
- **PDF Export**: jsPDF with jspdf-autotable (generate PDF reports)

### Project Structure
```
.
├── index.html          # Main HTML entry point
├── index.tsx           # Main React application (all components in one file)
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── package.json        # Dependencies and scripts
└── README.md           # Original project documentation
```

## Main Features

1. **Investment Simulator** - Compare returns between LCA/LCI and CDB/RDC investments
2. **Loan Calculators** - Both prefixado (fixed-rate) and pós-fixado (CDI-linked) loans
3. **Scheduled Application Calculator** - Simulate wealth accumulation with monthly deposits
4. **Competitor Rate Finder** - Determine competitor loan interest rates
5. **Rural Credit Simulator** - Financing with grace periods and annual payments
6. **Receivables Discount Simulator** - Calculate receivables discounting
7. **History & Comparison Tools** - Save and compare financial simulations
8. **Dark/Light Theme Toggle** - User preference for visual theme

## Environment Configuration

### Required Secrets
- `GEMINI_API_KEY` - Google Gemini API key for AI features

### Port Configuration
- **Development**: Port 5000 (configured for Replit webview)
- **Host**: 0.0.0.0 (allows external connections)

## Development

### Running Locally
```bash
npm install
npm run dev
```

The app will be available at http://localhost:5000/

### Build for Production
```bash
npm run build
npm run preview
```

## Recent Changes (November 16, 2025)

### Initial Setup
- Configured Vite to run on port 5000 for Replit compatibility
- Added HMR (Hot Module Replacement) configuration for webview
- Set up workflow for automatic server restart
- Configured deployment settings

### UX Improvements (Latest Session)
- **Toast Notifications**: Replaced all browser alerts with modern toast notifications using react-hot-toast
  - Custom theming for dark/light modes
  - Success, error, and info variants
  - Non-blocking user experience
- **Interactive Charts**: Added Recharts library with interactive line charts in Investment Simulator
  - Visual comparison of LCA/LCI vs CDB/RDC evolution
  - Responsive design with tooltips
  - Theme-aware styling
- **PDF Export**: Implemented PDF generation for simulation reports
  - Professional formatting with jsPDF and jspdf-autotable
  - Includes summary and detailed monthly tables
  - Download feature with success feedback
- **Visual Polish**: 
  - Added loading states and fade-in animations
  - Improved button layouts with btn-group styling
  - Added icons to action buttons
  - Enhanced overall user feedback

## Notes
- The application stores simulation history in browser localStorage
- Theme preference is also persisted in localStorage
- CDI rate is fetched dynamically (used in various calculations)
- All components are currently in a single file (index.tsx) - approximately 2,682 lines
