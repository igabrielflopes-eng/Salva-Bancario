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
- **Economic Indicators Dashboard**: Real-time view of 5 key Brazilian economic indicators (CDI, SELIC, IPCA, INCC, Dólar/Real) with optional automatic updates via Banco Central API.
- **Investment Simulator**: Compare LCA/LCI vs. CDB/RDC with multi-year CDI projections and quick-period buttons (30d, 60d, 90d, 6m, 1a, 2a, custom).
- **Loan Calculators**: Prefixado (fixed-rate) and Pós-fixado (CDI-linked with multi-year projections), with simplified IOF calculation (checkbox-based) and automatic TAC financing.
- **Scheduled Application Calculator**: Simulate wealth accumulation with dynamic CDI projections for long-term planning.
- **Competitor Rate Finder**: Determine competitor loan rates.
- **Receivables Discount Simulator**: Calculate discounting.
- **History & Comparison Tools**: Save and compare simulations.
- **Dark/Light Theme Toggle**: User-controlled theme.
- **Interest Rate Converter**: Convert between periods and compare compound vs. simple interest.
- **Global Settings Menu**: Configure default values for all calculators (e.g., CDI, SELIC, IPCA, INCC, Dólar, loan rates) including multi-year CDI projections based on Boletim Focus do BC (2026: 12.25%, 2027: 10.50%, 2028: 10%), persisted via `localStorage`.
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
- **Banco Central do Brasil API (BACEN)**: Optional integration for automatic updates of economic indicators (CDI, SELIC, IPCA, INCC). No API key required. Endpoints: https://api.bcb.gov.br/dados/serie/bcdata.sgs/{code}/dados
- **AwesomeAPI**: Optional integration for USD/BRL exchange rate updates. Endpoint: https://economia.awesomeapi.com.br/last/USD-BRL
- **Recharts**: For interactive data visualization.
- **React Hot Toast**: For modern toast notifications.
- **jsPDF** and **jspdf-autotable**: For generating PDF reports.

## BACEN API Integration
The application uses the following SGS (Sistema Gerenciador de Séries Temporais) series codes from Banco Central do Brasil to fetch economic indicators:
- **SELIC Meta**: Código 432 (Taxa Meta Selic % a.a.) → Returns annual rate directly
- **CDI Anual**: Código 4391 (CDI acumulado no mês %) → Monthly rate annualized via formula: `((1 + taxa_mensal/100)^12 - 1) * 100`
- **IPCA**: Código 13522 (IPCA acumulado 12 meses %) → Returns 12-month accumulated inflation
- **INCC-DI**: Código 193 (INCC-DI acumulado 12 meses %) → Returns 12-month accumulated construction index
- **USD/BRL**: AwesomeAPI (https://economia.awesomeapi.com.br/last/USD-BRL) → Real-time exchange rate

**Expected values (November 2025):** SELIC ~15% a.a., CDI ~14.90% a.a., IPCA ~4.68%, INCC ~6.40%, USD/BRL ~5.80

## Recent Changes (November 16, 2025)
- Added **Economic Indicators Dashboard** featuring 5 key Brazilian indicators: CDI, SELIC, IPCA, INCC, and Dólar/Real
- Implemented hybrid approach for indicators: manual editing (offline-first) with optional automatic updates via BACEN API
- Added "Atualizar via BACEN" button in Settings to fetch latest indicator values from official sources
- Extended DEFAULT_SETTINGS to include `ipca`, `incc`, `usdBrl`, and `indicatorsLastUpdated` fields
- Created dedicated EconomicIndicators component with color-coded indicator cards
- Positioned "Indicadores Econômicos" card as first item in main menu for easy access
- Maintained offline-first architecture while allowing opt-in API usage for real-time data
- **Fixed BACEN API codes**: Corrected series codes to fetch annual/accumulated values instead of monthly variations (SELIC 432, CDI 4391→annualized, IPCA 13522, INCC 193)
- **Simplified Interest Rate Converter**: Removed monetary calculations, now focuses exclusively on rate capitalization/decapitalization between periods