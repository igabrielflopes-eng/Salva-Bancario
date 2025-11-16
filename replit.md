# Salva Bancário 2.0

## Overview
"Salva Bancário 2.0" is a comprehensive Brazilian financial calculator application built with React and Vite. It provides a suite of tools for informed financial decisions, including investment simulations, loan calculators, and receivables discounting. The project aims to offer a robust, user-friendly, and installable PWA solution for financial planning, boasting a professional design and offline capabilities.

## User Preferences
I prefer iterative development, with clear communication before major changes are implemented. I appreciate detailed explanations of complex technical decisions. Please ensure the application remains highly performant and user-friendly, with a focus on intuitive UI/UX.

## System Architecture

### Technology Stack
- **Frontend Framework**: React
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: CSS-in-JS (embedded in index.tsx for simplicity)
- **Charts**: Recharts (interactive data visualization)
- **Notifications**: React Hot Toast
- **PDF Export**: jsPDF with jspdf-autotable (for reports)

### Core Features
- **Investment Simulator**: Compare LCA/LCI vs. CDB/RDC.
- **Loan Calculators**: Prefixado (fixed-rate) and Pós-fixado (CDI-linked), supporting IOF, TAC, and financing options.
- **Scheduled Application Calculator**: Simulate wealth accumulation.
- **Competitor Rate Finder**: Determine competitor loan rates.
- **Rural Credit Simulator**: Financing with grace periods, annual payments, and both PRICE and SAC amortization systems.
- **Receivables Discount Simulator**: Calculate discounting.
- **History & Comparison Tools**: Save and compare simulations.
- **Dark/Light Theme Toggle**: User-controlled theme.
- **Interest Rate Converter**: Convert between periods and compare compound vs. simple interest.
- **Global Settings Menu**: Configure default values for all calculators (e.g., CDI, SELIC, loan rates), persisted via `localStorage`.
- **Progressive Web App (PWA)**: Installable, offline-first application with custom icons and a branded theme.
- **Universal PDF Export**: Generate professional PDF reports for all simulators, optimized for Replit/iframe environments.
- **Mobile Responsiveness**: Tables transform into responsive card layouts on small screens; graphs reposition for better UX flow.

### PWA Implementation
The application functions as a PWA, featuring:
- **Installability**: Via manifest.json, allowing home screen/desktop installation.
- **Offline Support**: `service-worker.js` implements a cache-first strategy for static assets.
- **App-like Experience**: Standalone display mode.
- **Custom Icon**: Professional financial calculator icon (Swiss Army knife theme).
- **Theme Color**: Blue (`#2563eb`).

### Data Persistence
- Simulation history, theme preference, and global settings are persisted in the browser's `localStorage`.

## External Dependencies
- **Google Gemini API**: `GEMINI_API_KEY` (for AI features, though not explicitly detailed in functionality).
- **Recharts**: For interactive data visualization.
- **React Hot Toast**: For modern toast notifications.
- **jsPDF** and **jspdf-autotable**: For generating PDF reports.