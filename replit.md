# Salva Bancário

## Overview
"Salva Bancário" is a comprehensive Brazilian financial calculator application built with React and Vite. It provides a suite of tools for informed financial decisions, including investment simulations, loan calculators, and receivables discounting. The project aims to offer a robust, user-friendly, and installable PWA solution for financial planning, boasting a professional design and offline capabilities.

## User Preferences
I prefer iterative development, with clear communication before major changes are implemented. I appreciate detailed explanations of complex technical decisions. Please ensure the application remains highly performant and user-friendly, with a focus on intuitive UI/UX.

## System Architecture

### Technology Stack
- **Frontend Framework**: React
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: CSS-in-JS (embedded in index.tsx)
- **Charts**: Recharts
- **Notifications**: React Hot Toast
- **PDF Export**: jsPDF with jspdf-autotable
- **Native Mobile**: Capacitor 7.x (iOS/Android deployment with native plugins)

### Core Features
- **Economic Indicators Dashboard**: Real-time view of 4 key Brazilian economic indicators (CDI, SELIC, IPCA, Dólar/Real) with limited automatic updates.
- **Investment Simulator**: Compares LCA/LCI, CDB/RDC, and Poupança with multi-year CDI projections or fixed CDI, including effective rate display and TR support for Poupança.
- **Loan Calculators**: Prefixado (fixed-rate) and Pós-fixado (CDI-linked) with simplified IOF and automatic TAC financing.
- **Scheduled Application Calculator**: Simulates wealth accumulation with dynamic CDI projections.
- **Competitor Rate Finder**: Determines competitor loan rates.
- **Receivables Discount Simulator**: Calculates discounting.
- **History & Comparison Tools**: Save and compare simulations.
- **Dark/Light Theme Toggle**: User-controlled theme.
- **Interest Rate Converter**: Converts between periods and compares compound vs. simple interest.
- **Global Settings Menu**: Configures default values for all calculators (e.g., CDI, SELIC, IPCA, Dólar, loan rates) including multi-year CDI projections, persisted via `localStorage`.
- **Progressive Web App (PWA)**: Installable, offline-first, with custom icons and branded theme.
- **Universal PDF Export**: Generates professional PDF reports for all simulators, optimized for web and native environments.
- **Mobile Responsiveness**: Adaptive layouts for various screen sizes, including responsive tables and graph repositioning.
- **Menu Organization**: Logical grouping of cards: Indicators, Investments, Loans, Tools, and Settings.

### PWA & Native Mobile Implementation
The application functions as both a PWA and native mobile app:
- **PWA Features**: Installability, offline support via service worker (cache-first strategy), standalone display, custom icon, blue theme color.
- **Native Mobile Features (Capacitor)**: Haptic feedback, native sharing (WhatsApp, email, SMS), adaptive status bar theming, branded splash screen, iOS and Android platform support with 95% code reuse. Hybrid PDF/CSV export adapted for native sharing.

### Data Persistence
Simulation history, theme preference, and global settings are persisted in the browser's `localStorage`.

## External Dependencies
- **Google Gemini API**: `GEMINI_API_KEY` (for AI features).
- **Banco Central do Brasil API (BACEN)**: Limited optional integration for automatic updates of SELIC and IPCA. Endpoints: `https://api.bcb.gov.br/dados/serie/bcdata.sgs/{code}/dados`.
- **AwesomeAPI**: Optional integration for USD/BRL exchange rate updates. Endpoint: `https://economia.awesomeapi.com.br/last/USD-BRL`.
- **Recharts**: For interactive data visualization.
- **React Hot Toast**: For modern toast notifications.
- **jsPDF** and **jspdf-autotable**: For generating PDF reports.