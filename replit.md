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
- **Styling**: CSS-in-JS (embedded in index.tsx for simplicity)
- **Charts**: Recharts (interactive data visualization)
- **Notifications**: React Hot Toast
- **PDF Export**: jsPDF with jspdf-autotable (for reports)

### Core Features
- **Economic Indicators Dashboard**: Real-time view of 4 key Brazilian economic indicators (CDI, SELIC, IPCA, Dólar/Real) with limited automatic updates via Banco Central API (SELIC, IPCA, Dólar only).
- **Investment Simulator**: Compare LCA/LCI vs. CDB/RDC with multi-year CDI projections and quick-period buttons (30d, 60d, 90d, 6m, 1a, 2a, custom).
- **Loan Calculators**: Prefixado (fixed-rate) and Pós-fixado (CDI-linked with multi-year projections), with simplified IOF calculation (checkbox-based) and automatic TAC financing.
- **Scheduled Application Calculator**: Simulate wealth accumulation with dynamic CDI projections for long-term planning.
- **Competitor Rate Finder**: Determine competitor loan rates.
- **Receivables Discount Simulator**: Calculate discounting.
- **History & Comparison Tools**: Save and compare simulations.
- **Dark/Light Theme Toggle**: User-controlled theme.
- **Interest Rate Converter**: Convert between periods and compare compound vs. simple interest.
- **Global Settings Menu**: Configure default values for all calculators (e.g., CDI, SELIC, IPCA, Dólar, loan rates) including multi-year CDI projections based on Boletim Focus do BC (2026: 12.25%, 2027: 10.50%, 2028: 10%), persisted via `localStorage`.
- **Progressive Web App (PWA)**: Installable, offline-first application with custom icons and a branded theme.
- **Universal PDF Export**: Generate professional PDF reports for all simulators, optimized for Replit/iframe environments.
- **Mobile Responsiveness**: Tables transform into responsive card layouts on small screens; graphs reposition for better UX flow.
- **Menu Organization**: Cards organized in logical order - Indicators, Investments, Loans, Tools, and Settings for intuitive navigation.

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
- **Banco Central do Brasil API (BACEN)**: Limited optional integration for automatic updates of SELIC and IPCA only. No API key required. Endpoints: https://api.bcb.gov.br/dados/serie/bcdata.sgs/{code}/dados
- **AwesomeAPI**: Optional integration for USD/BRL exchange rate updates. Endpoint: https://economia.awesomeapi.com.br/last/USD-BRL
- **Recharts**: For interactive data visualization.
- **React Hot Toast**: For modern toast notifications.
- **jsPDF** and **jspdf-autotable**: For generating PDF reports.

## BACEN API Integration
The application uses a limited BACEN integration via the "Atualizar via BACEN" button in Settings, which automatically updates only 3 indicators:
- **SELIC Meta**: Código 432 (Taxa Meta Selic % a.a.) → Returns annual rate directly
- **IPCA**: Código 13522 (IPCA acumulado 12 meses %) → Returns 12-month accumulated inflation
- **USD/BRL**: AwesomeAPI (https://economia.awesomeapi.com.br/last/USD-BRL) → Real-time exchange rate

**CDI is manual-input only** - not updated via API to maintain offline-first philosophy and prevent API dependency.

**Expected values (November 2025):** SELIC ~15% a.a., CDI ~14.90% a.a., IPCA ~4.68%, USD/BRL ~5.80

## Development Configuration
- **Cache Disabled in Development**: Service Worker and Vite configured to bypass caching during development (localhost/Replit), enabling instant hot reload without manual cache clearing
- **Production PWA Intact**: Offline-first caching remains active when published/deployed for full PWA functionality

## Recent Changes (November 16, 2025)
- Added **Economic Indicators Dashboard** featuring 4 key Brazilian indicators: CDI, SELIC, IPCA, and Dólar/Real
- Implemented hybrid approach for indicators: manual editing (offline-first) with limited automatic updates via BACEN API
- Added "Atualizar via BACEN" button in Settings to fetch latest indicator values from official sources
- Extended DEFAULT_SETTINGS to include `ipca` and `usdBrl` fields
- Created dedicated EconomicIndicators component with color-coded indicator cards
- Positioned "Indicadores Econômicos" card as first item in main menu for easy access
- Maintained offline-first architecture while allowing opt-in API usage for real-time data
- **Fixed BACEN API codes**: Corrected series codes to fetch annual/accumulated values instead of monthly variations (SELIC 432, IPCA 13522)
- **Simplified Interest Rate Converter**: Removed monetary calculations, now focuses exclusively on rate capitalization/decapitalization between periods
- **Removed INCC indicator**: Completely removed INCC (construction cost index) from the application to simplify indicator dashboard
- **Limited BACEN API Integration**: "Atualizar via BACEN" now updates only SELIC, IPCA, and Dólar. CDI is manual-input only to maintain offline-first philosophy and reduce API dependency
- **Restored Rural Credit Simulator**: Added "Crédito Rural" card back to main menu with proper icon and description
- **Investment Simulator Enhancement**: Added toggle to choose between CDI projections (multi-year) or constant SELIC rate. UI labels now update dynamically based on selected rate type
- **Scheduled Application Enhancement**: Added same CDI/SELIC toggle as Investment Simulator with dynamic labels and rate explanations
- **Standardized Export Functions**: All 11 simulators now feature complete export capabilities (PDF, CSV/Excel, WhatsApp sharing) with consistent UI and data formatting across the application
- **Development Cache Fix**: Configured Service Worker to detect development environment and bypass caching on localhost/Replit. Added HTTP no-cache headers to Vite dev server. No more Ctrl+Shift+Del needed - changes appear instantly during development while maintaining full PWA offline capabilities in production
- **UI/UX Improvements**: Updated menu card titles and descriptions to be more user-friendly and intuitive. Changed technical banking terms to plain language (e.g., "Simular Investimento" → "Comparar Investimento", "Aplicação Programada" → "Poupança Programada", "Empréstimo Prefixado" → "Empréstimo Taxa Fixa", "Definições" → "Configurações", etc.)
- **Poupança Comparison Added**: Both investment simulators (Comparar Investimento and Poupança Programada) now include Poupança as a third investment option. Calculation follows Brazilian law: 70% of SELIC when SELIC ≤ 8.5% a.a., otherwise 0.5% per month. Displays 3-column comparison (LCA/LCI, CDB/RDC, Poupança) with full data in tables and charts.
- **Effective Rate Display**: Added "Taxas Líquidas Efetivas" section showing annualized (a.a.) and monthly (a.m.) effective rates for all three investments after taxes. CDB/RDC rates shown are post-IR, making it easy to compare true returns across all options.
- **CDI Toggle Correction (Nov 17, 2025)**: Fixed investment simulators to use CDI (not SELIC) in both toggle options. Now correctly offers "CDI (Projeções Multi-Ano)" vs "CDI Fixo" with `settings.cdi` value. Labels updated throughout UI. Poupança continues using SELIC as required by Brazilian regulation.