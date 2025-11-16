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

### UX Improvements (Previous Session)
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

### Current Session - Global Settings & Rate Converter (November 16, 2025)

- **Sistema de Configurações Globais (Settings Menu)**:
  - Criado hook `useSettings()` para gerenciamento de configurações persistentes no localStorage
  - Funções auxiliares para conversão de taxas: `monthlyToAnnual()` e `annualToMonthly()`
  - Componente `SettingsMenu` completo com campos organizados em categorias:
    - **Taxas de Mercado**: CDI Anual, SELIC Anual (com exibição automática mensal/anual)
    - **Empréstimos**: Taxa padrão mensal, IOF padrão, TAC padrão
    - **Investimentos**: % CDI para LCA/LCI, % CDI para CDB/RDC
    - **Desconto de Recebíveis**: Taxa TD padrão mensal, TAC TD padrão
  - Botões "Salvar Configurações" e "Restaurar Padrões"
  - Exibe timestamp da última atualização
  - Tooltips explicativos em todos os campos
  - Integração automática: valores padrão são aplicados a todos os simuladores

- **Conversor de Taxas de Juros (Interest Rate Converter)**:
  - Conversão entre períodos: dia, mês, ano
  - Exibição de taxas equivalentes (diária, mensal, anual)
  - Comparação completa: Juros Compostos vs Juros Simples
  - Inputs: taxa, períodos (origem/destino), principal, prazo
  - Resultados detalhados com gráfico de evolução
  - Tabela comparativa de evolução mês a mês
  - Toggle "Mostrar/Ocultar Fórmulas" com explicações matemáticas
  - Export PDF completo com summary e tabela
  - Gráfico interativo (Recharts) mostrando diferença entre juros compostos e simples

- **Formato Duplo do CDI em Todo o Aplicativo**:
  - Criada função `formatCDI(monthlyRate, annualRate)` 
  - Formato: "X,XX% a.m. (Y,YY% a.a.)"
  - Aplicado em:
    - Simulador de Investimento
    - Calculadoras de Empréstimo (Prefixado e Pós-fixado)
    - Aplicação Programada
  - Exibe tanto taxa mensal quanto anual simultaneamente

- **Integração de Valores Padrão das Settings**:
  - `InvestmentSimulator`: usa `lcaPercentCDI` e `cdbPercentCDI` das settings
  - `LoanSimulator`: usa `loanRate`, `iofRate`, `tacLoan` das settings
  - `ReceivablesDiscountSimulator`: usa `tdRate`, `tacTD` das settings
  - Usuários podem alterar valores padrão globalmente via Settings
  - Valores persistem entre sessões (localStorage)

- **Novas Features no Menu Principal**:
  - Card "⚙️ Definições" - acesso ao menu de configurações
  - Card "🔄 Conversão de Taxas" - calculadora de conversão e comparação de juros
  - Total de 11 ferramentas disponíveis (antes: 9)

- **Bug Fixes - PDF Export (November 16, 2025)**:
  - Corrigido erro no InterestRateConverter: `RechartsTooltip` → `ChartTooltip`
  - Adicionado verificações de segurança robustas nas funções exportToPDF
  - Implementado try-catch blocks com tratamento de erro amigável
  - Adicionado console.log detalhados para debugging
  - Verificações de existência: `if (data && data.summary && data.summary.length > 0)`
  - Mensagens de erro com toast.error para feedback ao usuário
  - **Solução para iframe/Replit**: Implementado blob + window.open() em vez de doc.save()
    - PDFs agora abrem em nova aba (compatível com iframe do Replit)
    - Fallback automático para download link se popup blocker ativar
    - Mensagem clara: "PDF aberto em nova aba! Use Ctrl+S ou o botão de download."
  - PDF export agora funcional em todos os 11 simuladores

### Previous Session - IOF e TAC nos Empréstimos
- **Campos IOF e TAC**:
  - Adicionado campo "IOF (%)" com valor padrão 0.38%
  - Adicionado checkbox "Financiar IOF" que agrega o valor do IOF ao empréstimo
  - Adicionado campo "TAC - Taxa de Abertura de Crédito (R$)"
  - Aplicado aos empréstimos Prefixado e Pós-fixado
  
- **Cálculos atualizados**:
  - IOF calculado sobre o valor solicitado
  - Quando "Financiar IOF" marcado: IOF é adicionado ao principal financiado
  - Quando desmarcado: IOF pago à vista (custo inicial)
  - TAC sempre é custo inicial (não financiado)
  - Custo Total = Total Pago (parcelas) + Custos Iniciais (IOF não financiado + TAC)
  
- **Interface atualizada**:
  - Resultados mostram: Valor Solicitado, IOF, TAC, Valor Financiado
  - Exibe primeira/última parcela, juros e custo total
  - PDF inclui todos os campos: IOF, TAC, flag "Financiar IOF"

### Previous Session - Quick Selection & SAC for Rural Credit
- **Quick-Select Loan Term Buttons**:
  - Added preset buttons to Loan Calculators (Prefixado and Pós-fixado)
  - Buttons: 12, 24, 36, 48, 60 months + "Personalizado" (custom)
  - Clicking preset auto-fills the months field
  - "Personalizado" reveals input field for custom values
  - Improved UX for common loan terms
  
- **SAC Amortization for Rural Credit**:
  - Added "Sistema de Amortização" field to Rural Credit Simulator
  - Two options:
    - **PRICE**: Fixed annual payments (original method)
    - **SAC**: Constant principal amortization, decreasing payments
  - SAC calculation:
    - Fixed principal amount per year
    - Decreasing interest (based on remaining balance)
    - Results show "First Payment" and "Last Payment"
  - UI and PDF export updated to reflect selected system
  - Proper handling of grace periods for both systems

- **PDF Export Fix**:
  - Fixed `doc.autoTable is not a function` error
  - Changed import from `import jsPDF` to `import { jsPDF }`
  - Changed autoTable import to standalone function: `import autoTable from 'jspdf-autotable'`
  - Updated call from `doc.autoTable()` to `autoTable(doc, options)`

### Previous Session - Taxa Final Líquida
- **Taxa de Retorno em Percentual**:
  - Adicionado campo "Taxa Final Líquida" no Simulador de Investimento
  - Exibe o retorno percentual líquido para LCA/LCI e CDB/RDC
  - Facilita comparação direta entre as duas modalidades
  - Fórmula: (Rendimento Líquido / Valor Inicial) × 100
  - Incluído também no export PDF

### Previous Session - Mobile Responsiveness & Feature Completion
- **Post-Fixed Loan Calculator Simplification**: 
  - Removed redundant "% CDI" field (previously 150%)
  - Now calculates directly as: CDI monthly rate + fixed spread
  - Cleaner, more intuitive interface
  
- **Universal PDF Export**: 
  - Added "📄 Exportar PDF" button to ALL simulators:
    - Investment Simulator (LCA/LCI vs CDB/RDC)
    - Loan Calculator (PRICE & SAC)
    - Scheduled Application Calculator
    - Competitor Rate Finder
    - Rural Credit Simulator
    - Receivables Discount Simulator
  - Each PDF includes relevant summary and detailed tables
  - Consistent button styling with icons across all calculators
  
- **Graph Repositioning**: 
  - Moved Investment Simulator graph to the end (after table data)
  - Better UX flow: summary → table → visualization
  
- **Mobile Responsive Tables**: 
  - Implemented CSS-based responsive card layout for mobile devices
  - Tables automatically transform into cards on screens ≤600px
  - Each table row becomes a styled card with:
    - Clear labels for each data field
    - Vertical layout for easy reading
    - Proper spacing and visual hierarchy
    - Theme-aware styling (dark/light mode)
  - Applied to all major data tables:
    - Investment evolution tables
    - Loan amortization schedules
    - Scheduled application projections
    - Rural credit payment schedules
  - No horizontal scrolling required on mobile
  - Touch-friendly interface

## Notes
- The application stores simulation history in browser localStorage
- Theme preference is also persisted in localStorage
- CDI rate is fetched dynamically (used in various calculations)
- Global settings stored in localStorage with automatic application to all simulators
- All components are currently in a single file (index.tsx) - approximately 3,976 lines
