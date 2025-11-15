
import React, { useState, useMemo, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const styles = `
  :root {
    --primary-color: #005A9C;
    --secondary-color: #00BFA5;
    --background-color: #f4f7fc;
    --text-color: #333;
    --card-bg: #fff;
    --border-color: #e0e0e0;
    --danger-color: #dc3545;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
  }

  body {
    background-color: var(--background-color);
    color: var(--text-color);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    padding: 20px;
  }

  #root {
    width: 100%;
    max-width: 1200px;
  }

  .app-container {
    width: 100%;
    padding: 20px;
  }

  .header {
    text-align: center;
    margin-bottom: 40px;
  }

  .header h1 {
    color: var(--primary-color);
    font-size: 2.5rem;
    font-weight: 700;
  }

  .header p {
    font-size: 1.1rem;
    color: #666;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
  }

  .feature-card {
    background-color: var(--card-bg);
    border-radius: 10px;
    padding: 25px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    border: 1px solid var(--border-color);
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  }

  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0,0,0,0.1);
  }

  .feature-card h2 {
    color: var(--primary-color);
    margin-top: 15px;
    font-size: 1.1rem;
  }

  .feature-card p {
    font-size: 0.9rem;
    color: #777;
    margin-top: 5px;
  }

  .icon {
    font-size: 2.5rem;
    color: var(--secondary-color);
  }

  .calculator-container, .indicators-container, .history-container {
    background-color: var(--card-bg);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }
  
  .calculator-layout {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 40px;
  }

  .form-section h3, .results-section h3, .indicators-container h3, .history-container h3, .print-only h3 {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-bottom: 20px;
    border-bottom: 2px solid var(--secondary-color);
    padding-bottom: 10px;
  }

  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group.inline {
    display: flex;
    gap: 10px;
    align-items: flex-end;
  }

  .form-group.inline > div {
    flex-grow: 1;
  }
  
  .form-group.inline > button {
    flex-shrink: 0;
    width: auto;
    padding: 12px 15px;
    height: 47px;
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #555;
  }

  .form-group input, .form-group select {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    font-size: 1rem;
    background-color: #ffffff;
    color: var(--text-color);
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .form-group input:focus, .form-group select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(0, 90, 156, 0.2);
  }

  .btn {
    width: 100%;
    padding: 15px;
    border: none;
    border-radius: 5px;
    background-color: var(--secondary-color);
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 10px;
  }

  .btn:first-of-type {
    margin-top: 0;
  }

  .btn:hover {
    background-color: #00a791;
  }

  .btn-secondary {
    background-color: #6c757d;
  }

  .btn-secondary:hover {
     background-color: #5a6268;
  }

  .btn-save {
    background-color: var(--primary-color);
  }

  .btn-save:hover {
    background-color: #004a80;
  }

  .btn-danger {
    background-color: var(--danger-color);
  }

  .btn-danger:hover {
     background-color: #c82333;
  }
  
  .btn-small {
    padding: 5px 10px;
    font-size: 0.8rem;
    width: auto;
    margin: 0 5px;
  }


  .results-summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }

  .summary-item {
    background-color: var(--background-color);
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  
  .summary-item h4 {
    font-size: 1rem;
    color: #666;
    margin-bottom: 10px;
    font-weight: 500;
  }

  .summary-item p {
    font-size: 1.5rem;
    color: var(--primary-color);
    font-weight: 600;
  }
  
  .summary-item p.positive { color: #28a745; }
  .summary-item p.negative { color: var(--danger-color); }

  .cdb-breakdown {
    font-size: 0.9rem;
    color: #666;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid var(--border-color);
    text-align: left;
  }
  .cdb-breakdown div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  .cdb-breakdown div:last-child {
    margin-bottom: 0;
  }
  .cdb-breakdown div span:last-child {
    font-weight: 500;
  }
  .cdb-breakdown .ir-value {
    color: var(--danger-color);
  }


  .table-container {
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid var(--border-color);
    border-radius: 5px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 12px 15px;
    text-align: right;
    border-bottom: 1px solid var(--border-color);
  }
  
  th {
    background-color: var(--background-color);
    font-weight: 600;
    position: sticky;
    top: 0;
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .no-results {
    text-align: center;
    padding: 40px;
    color: #777;
  }
  
  .no-results .icon {
    font-size: 3rem;
    margin-bottom: 15px;
  }

  .indicators-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .indicator-card {
    background: #fff;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 20px;
  }
  
  .indicator-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .indicator-header h4 {
    font-size: 1.2rem;
    color: var(--primary-color);
  }

  .indicator-header p {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--secondary-color);
  }
  
  .detailed-analysis-section {
    margin-top: 40px;
  }
  
  .indicator-tabs, .period-filters {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .indicator-tabs button, .period-filters button {
    padding: 8px 15px;
    border: 1px solid #cdd5e2;
    background-color: #fff;
    color: #333;
    font-weight: 500;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  }
  
  .indicator-tabs button:hover:not(.active), .period-filters button:hover:not(.active) {
    background-color: #e9eff8;
    border-color: var(--primary-color);
  }

  .indicator-tabs button.active, .period-filters button.active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
  
  .custom-period-filter {
    display: flex;
    gap: 15px;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .custom-period-filter label {
    font-weight: 500;
  }

  .chart-wrapper {
    width: 100%;
    margin-top: 20px;
  }
  
  .history-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 30px;
  }

  .history-item {
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 20px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .history-item:hover {
      background-color: #e9eff8;
  }

  .history-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }

  .history-item-header h4 {
    color: var(--primary-color);
    font-size: 1.2rem;
  }

  .history-item-header span {
    font-size: 0.8rem;
    color: #888;
  }

  .history-item p {
    font-size: 1rem;
    color: #555;
  }

  .check-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .check-list-item input {
    padding: 5px;
    font-size: 0.9rem;
    width: 120px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    background-color: #ffffff;
    color: var(--text-color);
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .check-list-item input:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(0, 90, 156, 0.2);
  }
  
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 30px;
    border-radius: 10px;
    width: 90%;
    max-width: 900px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 15px;
  }
  
  .modal-header h3 {
    font-size: 1.5rem;
    color: var(--primary-color);
  }
  
  .modal-close-btn {
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .print-only {
    display: none;
  }

  @media print {
    body {
      background-color: #fff;
      color: #000;
      padding: 20px;
      font-family: 'Poppins', sans-serif;
    }

    .header, .card-grid, .form-section, .no-print {
      display: none !important;
    }
    
    .app-container, .calculator-container, .indicators-container, .history-container, .modal-content {
      box-shadow: none;
      border: none;
      padding: 0;
    }
    
    .modal-backdrop {
        background: none;
    }

    .print-only {
      display: block;
      margin-bottom: 20px;
      border-bottom: 2px solid #ccc;
      padding-bottom: 15px;
    }
    
    .print-only h3 {
      font-size: 1.5rem;
      margin-bottom: 15px;
      border-bottom: none;
    }
    .print-only p {
      margin-bottom: 5px;
      font-size: 1rem;
    }
    .print-only table {
        text-align: left;
    }
    .print-only th, .print-only td {
        text-align: left;
        padding: 5px;
    }

    .calculator-layout {
      grid-template-columns: 1fr;
      gap: 0;
    }
    
    .results-section, .indicators-container, .history-list {
      display: block !important;
    }
    
    .no-results {
        display: none;
    }

    .table-container {
      max-height: none;
      overflow: visible;
      border: 1px solid #ccc;
      page-break-inside: avoid;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      border: 1px solid #ccc;
      padding: 8px;
    }

    th {
      background-color: #f0f0f0;
      position: static;
    }
    
    tr {
        page-break-inside: avoid;
    }
    
    .results-summary {
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      page-break-inside: avoid;
    }
    .summary-item {
      background-color: #f9f9f9;
      border: 1px solid #eee;
    }
    
    .detailed-analysis-section {
        display: block !important;
        margin-top: 30px;
        page-break-before: auto;
    }
    
    .chart-wrapper svg {
        width: 100%;
        height: auto;
    }

    body.modal-open .app-container {
      display: none !important;
    }
    body.modal-open .modal-backdrop {
      position: static !important;
      display: block !important;
      background: none !important;
      width: 100% !important;
      height: auto !important;
    }
    body.modal-open .modal-content {
      box-shadow: none !important;
      border: none !important;
      padding: 0 !important;
      width: 100% !important;
      max-width: 100% !important;
      max-height: none !important;
      overflow-y: visible !important;
    }
  }

  @media (max-width: 900px) {
    .calculator-layout {
      grid-template-columns: 1fr;
    }
  }
   @media (max-width: 600px) {
    body {
      padding: 10px;
    }
    .app-container, .calculator-container, .indicators-container, .history-container {
      padding: 15px;
    }
    .header h1 {
      font-size: 2rem;
    }
    .header p {
      font-size: 1rem;
    }
    
    .form-section h3, .results-section h3, .indicators-container h3, .history-container h3, .print-only h3 {
        font-size: 1.3rem;
    }

    .form-group.inline {
      flex-direction: column;
      align-items: stretch;
    }
    
    .form-group.inline > button {
      height: auto;
      margin-top: 10px;
    }

    .btn {
        padding: 12px;
        font-size: 1rem;
    }

    .results-summary {
      grid-template-columns: 1fr;
    }

    .summary-item {
        padding: 15px;
    }

    .summary-item h4 {
        font-size: 0.9rem;
    }
    .summary-item p {
        font-size: 1.2rem;
    }
    
    .cdb-breakdown {
        font-size: 0.8rem;
    }

    .table-container {
        overflow-x: auto; /* Allow horizontal scroll for table */
        -webkit-overflow-scrolling: touch; /* Smoother scrolling on iOS */
    }

    /* Responsive tables as cards for results */
    .results-section .table-container, .modal-content .table-container {
        overflow-x: visible;
        border: none;
        max-height: 60vh;
    }

    .results-section .table-container table, .modal-content .table-container table {
        border: 0;
    }

    .results-section .table-container thead, .modal-content .table-container thead {
        border: none;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }

    .results-section .table-container tr, .modal-content .table-container tr {
        display: block;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        margin-bottom: 15px;
        padding: 15px;
        background-color: var(--card-bg);
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    
    .results-section .table-container td, .modal-content .table-container td {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        text-align: right;
        border-bottom: 1px solid #f0f0f0;
        font-size: 0.9rem;
    }
    
    .results-section .table-container tr td:last-child, .modal-content .table-container tr td:last-child {
        border-bottom: none;
    }
    
    .results-section .table-container td::before, .modal-content .table-container td::before {
        content: attr(data-label);
        font-weight: 600;
        color: var(--text-color);
        text-align: left;
        padding-right: 10px;
    }
    /* End responsive tables */

    table {
        font-size: 0.8rem; /* Reduce font size in tables */
    }

    th, td {
        padding: 8px 6px; /* Reduce padding in table cells */
    }
    
    .indicator-tabs button, .period-filters button {
        padding: 6px 12px;
        font-size: 0.9rem;
    }

    .check-list-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
    .check-list-item > div {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    
    .modal-content {
        padding: 20px;
    }
   }
`;

type AmortizationType = 'price' | 'sac';
type Calculation = {
  id: number;
  type: string;
  description: string;
  data: any;
};

interface AmortizationRow {
  month: number;
  installment: number;
  interest: number;
  amortization: number;
  balance: number;
}

interface RuralAmortizationRow {
  period: string;
  installment: number;
  interest: number;
  amortization: number;
  balance: number;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const LoanCalculator = ({ onBack, onSave }: { onBack: () => void, onSave: (calc: Omit<Calculation, 'id'>) => void }) => {
  const [amount, setAmount] = useState('100000,00');
  const [rate, setRate] = useState('1');
  const [term, setTerm] = useState('360');
  const [amortizationType, setAmortizationType] = useState<AmortizationType>('price');
  const [calculateIof, setCalculateIof] = useState(false);
  const [financeIof, setFinanceIof] = useState(false);
  const [results, setResults] = useState<{ table: AmortizationRow[], totalInterest: number, totalPaid: number, calculatedIof: number, lastInstallment?: number } | null>(null);

  const resetForm = () => {
    setAmount('100000,00');
    setRate('1');
    setTerm('360');
    setAmortizationType('price');
    setCalculateIof(false);
    setFinanceIof(false);
    setResults(null);
  };

  const calculateLoan = () => {
    const loanAmount = parseFloat(amount.replace(',', '.'));
    const monthlyRate = parseFloat(rate) / 100;
    const loanTerm = parseInt(term, 10);

    if (isNaN(loanAmount) || isNaN(monthlyRate) || isNaN(loanTerm) || loanAmount <= 0 || monthlyRate <= 0 || loanTerm <= 0) {
      setResults(null);
      return;
    }

    let totalIof = 0;
    if (calculateIof) {
        const iofFixed = loanAmount * 0.0038;
        const daysForIof = Math.min(loanTerm * 30, 365);
        const iofDaily = loanAmount * 0.000082 * daysForIof;
        totalIof = iofFixed + iofDaily;
    }

    const principal = financeIof ? loanAmount + totalIof : loanAmount;

    const table: AmortizationRow[] = [];
    let balance = principal;
    let totalInterest = 0;
    let lastInstallment: number | undefined;

    if (amortizationType === 'price') {
      const pmt = principal * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
      for (let i = 1; i <= loanTerm; i++) {
        const interest = balance * monthlyRate;
        const amortization = pmt - interest;
        balance -= amortization;
        totalInterest += interest;
        table.push({ month: i, installment: pmt, interest, amortization, balance: balance < 0 ? 0 : balance });
      }
    } else if (amortizationType === 'sac') {
      const amortization = principal / loanTerm;
      for (let i = 1; i <= loanTerm; i++) {
        const interest = balance * monthlyRate;
        const installment = amortization + interest;
        balance -= amortization;
        totalInterest += interest;
        table.push({ month: i, installment, interest, amortization, balance: balance < 0 ? 0 : balance });
      }
      if (table.length > 0) {
        lastInstallment = table[table.length - 1].installment;
      }
    }

    setResults({ table, totalInterest, totalPaid: principal + totalInterest, calculatedIof: totalIof, lastInstallment });
  };
  
  const handleSave = () => {
      if (!results) return;
      onSave({
          type: 'Empréstimo',
          description: `${formatCurrency(parseFloat(amount.replace(',', '.')))} em ${term} meses (${amortizationType.toUpperCase()})`,
          data: { inputs: { amount, rate, term, amortizationType, calculateIof, financeIof }, results }
      });
      alert('Simulação salva com sucesso!');
  }

  const firstInstallment = useMemo(() => results?.table[0]?.installment ?? 0, [results]);

  return (
    <div className="calculator-container">
       <div className="calculator-layout">
          <div className="form-section">
            <h3>Simular Empréstimo</h3>
            <div className="form-group">
              <label htmlFor="amount">Valor do Empréstimo (R$)</label>
              <input id="amount" type="text" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Ex: 100000,00" />
            </div>
            <div className="form-group">
              <label htmlFor="rate">Taxa de Juros (% a.m.)</label>
              <input id="rate" type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="Ex: 1.0" step="0.01" />
            </div>
            <div className="form-group">
              <label htmlFor="term">Número de Parcelas (meses)</label>
              <input id="term" type="number" value={term} onChange={e => setTerm(e.target.value)} placeholder="Ex: 360" />
            </div>
            <div className="form-group">
              <label htmlFor="amortization">Tipo de Amortização</label>
              <select id="amortization" value={amortizationType} onChange={e => setAmortizationType(e.target.value as AmortizationType)}>
                <option value="price">Tabela Price</option>
                <option value="sac">SAC</option>
              </select>
            </div>
            <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input type="checkbox" checked={calculateIof} onChange={e => {
                        setCalculateIof(e.target.checked);
                        if (!e.target.checked) {
                            setFinanceIof(false);
                        }
                    }} style={{ width: 'auto', margin: 0 }} />
                    Calcular IOF
                </label>
            </div>
            {calculateIof && (
                <div className="form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input type="checkbox" checked={financeIof} onChange={e => setFinanceIof(e.target.checked)} style={{ width: 'auto', margin: 0 }} />
                        Financiar IOF
                    </label>
                </div>
            )}
            <button className="btn" onClick={calculateLoan}>Calcular</button>
            <button className="btn btn-secondary" onClick={resetForm}>Limpar</button>
            <button className="btn btn-secondary" onClick={onBack}>Voltar</button>
            {results && <button className="btn" onClick={resetForm}>Nova Simulação</button>}
          </div>

          <div className="results-section">
            <div className="print-only">
              <h3>Demonstrativo de Empréstimo</h3>
              <p><strong>Valor do Empréstimo:</strong> {formatCurrency(parseFloat(amount.replace(',', '.')))}</p>
              <p><strong>Taxa de Juros:</strong> {rate}% a.m.</p>
              <p><strong>Número de Parcelas:</strong> {term} meses</p>
              <p><strong>Tipo de Amortização:</strong> {amortizationType.toUpperCase()}</p>
              {results && <p><strong>IOF Calculado:</strong> {calculateIof ? formatCurrency(results.calculatedIof) : 'Não'}</p>}
              <p><strong>IOF Financiado:</strong> {financeIof ? 'Sim' : 'Não'}</p>
            </div>
            <h3>Resultados da Simulação</h3>
            {results ? (
              <>
                <div className="results-summary">
                  <div className="summary-item">
                    <h4>Valor da Parcela</h4>
                    <p>{formatCurrency(firstInstallment)}
                      {amortizationType === 'sac' && <span style={{fontSize: '0.8rem', display: 'block'}}>(primeira)</span>}
                    </p>
                  </div>
                  {amortizationType === 'sac' && results.lastInstallment && (
                    <div className="summary-item">
                        <h4>Última Parcela</h4>
                        <p>{formatCurrency(results.lastInstallment)}</p>
                    </div>
                  )}
                  <div className="summary-item">
                    <h4>Total de Juros</h4>
                    <p>{formatCurrency(results.totalInterest)}</p>
                  </div>
                  <div className="summary-item">
                    <h4>Total Pago</h4>
                    <p>{formatCurrency(results.totalPaid)}</p>
                  </div>
                   {results.calculatedIof > 0 && (
                      <div className="summary-item">
                          <h4>IOF Calculado</h4>
                          <p>{formatCurrency(results.calculatedIof)}</p>
                      </div>
                  )}
                  {financeIof && results.calculatedIof > 0 && (
                      <div className="summary-item">
                          <h4>Valor Financiado</h4>
                          <p>{formatCurrency(parseFloat(amount.replace(',', '.')) + results.calculatedIof)}</p>
                      </div>
                  )}
                </div>

                <h4>Demonstrativo Analítico</h4>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Mês</th>
                                <th>Parcela</th>
                                <th>Juros</th>
                                <th>Amortização</th>
                                <th>Saldo Devedor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.table.map(row => (
                                <tr key={row.month}>
                                    <td data-label="Mês">{row.month}</td>
                                    <td data-label="Parcela">{formatCurrency(row.installment)}</td>
                                    <td data-label="Juros">{formatCurrency(row.interest)}</td>
                                    <td data-label="Amortização">{formatCurrency(row.amortization)}</td>
                                    <td data-label="Saldo Devedor">{formatCurrency(row.balance)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 <button className="btn btn-save no-print" onClick={handleSave}>Salvar Simulação</button>
                 <button className="btn no-print" onClick={() => window.print()}>Exportar para PDF</button>
              </>
            ) : (
                <div className="no-results">
                    <div className="icon">📊</div>
                    <p>Preencha os dados e clique em "Calcular" para ver a simulação.</p>
                </div>
            )}
          </div>
       </div>
    </div>
  );
};

const CheckDiscountCalculator = ({ onBack, onSave }: { onBack: () => void, onSave: (calc: Omit<Calculation, 'id'>) => void }) => {
    type Check = { id: number; value: string; date: string };
    
    const getInitialDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 30);
        return today.toISOString().split('T')[0];
    };
    
    const [checks, setChecks] = useState<Check[]>([]);
    const [newCheckValue, setNewCheckValue] = useState('1000,00');
    const [newCheckDate, setNewCheckDate] = useState(getInitialDate());
    const [interestRate, setInterestRate] = useState('3');
    const [calculateIof, setCalculateIof] = useState(true);
    const [tac, setTac] = useState('50,00');
    const [results, setResults] = useState<{ netAmount: number, totalCost: number, originalValue: number, calculatedIof: number, totalInterest: number, tacValue: number } | null>(null);
    const [editingCheck, setEditingCheck] = useState<Check | null>(null);

    const resetForm = () => {
        setChecks([]);
        setNewCheckValue('1000,00');
        setNewCheckDate(getInitialDate());
        setInterestRate('3');
        setCalculateIof(true);
        setTac('50,00');
        setResults(null);
        setEditingCheck(null);
    };

    const handleAddCheck = () => {
        const value = parseFloat(newCheckValue.replace(',', '.'));
        if (isNaN(value) || value <= 0 || !newCheckDate) return;
        setChecks(prev => [...prev, { id: Date.now(), value: newCheckValue, date: newCheckDate }]);
        setNewCheckValue('1000,00');
    };

    const handleDeleteCheck = (id: number) => {
        setChecks(prev => prev.filter(c => c.id !== id));
    };

    const handleStartEditing = (check: Check) => {
        setEditingCheck({ ...check });
    };

    const handleSaveEdit = () => {
        if (!editingCheck) return;
        setChecks(prev => prev.map(c => c.id === editingCheck.id ? editingCheck : c));
        setEditingCheck(null);
    };

    const calculateDiscount = () => {
        const rate = parseFloat(interestRate) / 100;
        const tacValue = parseFloat(tac.replace(',', '.'));

        if (isNaN(rate) || isNaN(tacValue) || checks.length === 0) {
            setResults(null);
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let totalInterest = 0;
        const totalOriginalValue = checks.reduce((sum, check) => sum + parseFloat(check.value.replace(',', '.')), 0);

        let totalIof = 0;

        if (calculateIof) {
            const iofAdditional = totalOriginalValue * 0.0038;
            let iofDaily = 0;
            
            checks.forEach(check => {
                const checkDate = new Date(check.date);
                const utcCheckDate = new Date(checkDate.getUTCFullYear(), checkDate.getUTCMonth(), checkDate.getUTCDate());
                const days = Math.ceil((utcCheckDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                if (days > 0) {
                    const iofDays = Math.min(days, 365);
                    iofDaily += parseFloat(check.value.replace(',', '.')) * 0.000082 * iofDays;
                }
            });

            totalIof = iofAdditional + iofDaily;
        }


        checks.forEach(check => {
            const checkDate = new Date(check.date);
            const utcCheckDate = new Date(checkDate.getUTCFullYear(), checkDate.getUTCMonth(), checkDate.getUTCDate());
            const days = Math.ceil((utcCheckDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            if (days > 0) {
                totalInterest += parseFloat(check.value.replace(',', '.')) * rate * (days / 30);
            }
        });
        
        const totalCost = totalInterest + totalIof + tacValue;
        const netAmount = totalOriginalValue - totalCost;

        setResults({ netAmount, totalCost, originalValue: totalOriginalValue, calculatedIof: totalIof, totalInterest, tacValue });
    };

    const handleSaveSimulation = () => {
        if (!results) return;
        onSave({
            type: 'Antecipação de Cheques',
            description: `${checks.length} cheque(s) totalizando ${formatCurrency(results.originalValue)}`,
            data: { inputs: { checks, interestRate, tac, calculateIof }, results }
        });
        alert('Simulação salva com sucesso!');
    }

    return (
        <div className="calculator-container">
            <div className="calculator-layout">
                <div className="form-section">
                    <h3>Simular Antecipação de Cheques</h3>
                    
                    <h4>Adicionar Cheque</h4>
                     <div className="form-group inline">
                        <div>
                            <label htmlFor="newCheckValue">Valor (R$)</label>
                            <input id="newCheckValue" type="text" value={newCheckValue} onChange={e => setNewCheckValue(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="newCheckDate">Vencimento</label>
                            <input id="newCheckDate" type="date" value={newCheckDate} onChange={e => setNewCheckDate(e.target.value)} />
                        </div>
                        <button className="btn" onClick={handleAddCheck}>+</button>
                    </div>

                    <h4>Taxas da Operação</h4>
                    <div className="form-group">
                        <label htmlFor="interestRate">Taxa de Juros (% a.m.)</label>
                        <input id="interestRate" type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} step="0.01" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tac">TAC (R$)</label>
                        <input id="tac" type="text" value={tac} onChange={e => setTac(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input type="checkbox" checked={calculateIof} onChange={e => setCalculateIof(e.target.checked)} style={{ width: 'auto', margin: 0 }} />
                        Calcular IOF (0.38% + 0.0082% a.d.)
                      </label>
                    </div>

                    <button className="btn" onClick={calculateDiscount} disabled={checks.length === 0}>Calcular</button>
                    <button className="btn btn-secondary" onClick={resetForm}>Limpar</button>
                    <button className="btn btn-secondary" onClick={onBack}>Voltar</button>
                    {results && <button className="btn" onClick={resetForm}>Nova Simulação</button>}
                </div>

                <div className="results-section">
                    <div className="print-only">
                        <h3>Demonstrativo de Antecipação de Cheques</h3>
                        <p><strong>Taxa de Juros:</strong> {interestRate}% a.m.</p>
                        <p><strong>TAC:</strong> {formatCurrency(parseFloat(tac.replace(',', '.')))}</p>
                        <p><strong>Cálculo de IOF:</strong> {calculateIof ? 'Sim' : 'Não'}</p>
                        <h4>Cheques:</h4>
                        <table>
                            <thead><tr><th>Valor</th><th>Vencimento</th></tr></thead>
                            <tbody>
                                {checks.map(c => <tr key={c.id}><td>{formatCurrency(parseFloat(c.value.replace(',', '.')))}</td><td>{new Date(c.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td></tr>)}
                            </tbody>
                        </table>
                    </div>
                    <h3>Cheques Adicionados</h3>
                    <div style={{ maxHeight: '180px', overflowY: 'auto', marginBottom: '20px' }} className="no-print">
                        {checks.length > 0 ? checks.map(check => (
                            <div key={check.id} className="check-list-item">
                                {editingCheck?.id === check.id ? (
                                    <>
                                        <input type="text" value={editingCheck.value} onChange={e => setEditingCheck({...editingCheck, value: e.target.value})} />
                                        <input type="date" value={editingCheck.date} onChange={e => setEditingCheck({...editingCheck, date: e.target.value})} />
                                        <div>
                                            <button className="btn btn-small" onClick={handleSaveEdit}>Salvar</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <span>{formatCurrency(parseFloat(check.value.replace(',', '.')))}</span>
                                        <span>{new Date(check.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>
                                        <div>
                                            <button className="btn btn-small btn-secondary" onClick={() => handleStartEditing(check)}>Editar</button>
                                            <button className="btn btn-small btn-danger" onClick={() => handleDeleteCheck(check.id)}>X</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )) : <p style={{textAlign: 'center', color: '#777'}}>Nenhum cheque adicionado.</p>}
                    </div>

                    <h3>Resultados da Simulação</h3>
                    {results ? (
                        <>
                            <div className="results-summary" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                                <div className="summary-item">
                                    <h4>Valor Líquido a Receber</h4>
                                    <p>{formatCurrency(results.netAmount)}</p>
                                </div>
                                <div className="summary-item">
                                    <h4>Custo Total da Operação</h4>
                                    <p>{formatCurrency(results.totalCost)}</p>
                                    <div className="cdb-breakdown">
                                        <div>
                                            <span>Juros:</span>
                                            <span>{formatCurrency(results.totalInterest)}</span>
                                        </div>
                                        <div>
                                            <span>TAC:</span>
                                            <span>{formatCurrency(results.tacValue)}</span>
                                        </div>
                                        <div>
                                            <span>IOF:</span>
                                            <span>{formatCurrency(results.calculatedIof)}</span>
                                        </div>
                                    </div>
                                </div>
                                 <div className="summary-item">
                                    <h4>Valor Bruto dos Cheques</h4>
                                    <p>{formatCurrency(results.originalValue)}</p>
                                </div>
                            </div>
                            <button className="btn btn-save no-print" onClick={handleSaveSimulation}>Salvar Simulação</button>
                            <button className="btn no-print" onClick={() => window.print()}>Exportar para PDF</button>
                        </>
                    ) : (
                        <div className="no-results">
                            <div className="icon">💸</div>
                            <p>Adicione os cheques, preencha as taxas e clique em "Calcular".</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const RuralFinancingCalculator = ({ onBack, onSave }: { onBack: () => void, onSave: (calc: Omit<Calculation, 'id'>) => void }) => {
    const [amount, setAmount] = useState('500000,00');
    const [rate, setRate] = useState('7.5');
    const [term, setTerm] = useState('10');
    const [gracePeriod, setGracePeriod] = useState('3');
    const [amortizationType, setAmortizationType] = useState<AmortizationType>('sac');
    const [graceInterestPayment, setGraceInterestPayment] = useState('pay_periodically'); // 'pay_periodically', 'pay_at_end', 'capitalize'
    const [graceInterestFrequency, setGraceInterestFrequency] = useState(1); // 1: annual, 2: semi, 4: quarterly, 12: monthly
    const [results, setResults] = useState<{ table: RuralAmortizationRow[], totalInterest: number, totalPaid: number, graceInterest: number, lastInstallment?: number } | null>(null);

    const resetForm = () => {
        setAmount('500000,00');
        setRate('7.5');
        setTerm('10');
        setGracePeriod('3');
        setAmortizationType('sac');
        setGraceInterestPayment('pay_periodically');
        setGraceInterestFrequency(1);
        setResults(null);
    };

    const calculate = () => {
        const loanAmount = parseFloat(amount.replace(',', '.'));
        const annualRate = parseFloat(rate) / 100;
        const totalTermYears = parseInt(term, 10);
        const graceYears = parseInt(gracePeriod, 10);

        const amortizationYears = totalTermYears - graceYears;

        if (isNaN(loanAmount) || isNaN(annualRate) || isNaN(totalTermYears) || isNaN(graceYears) || loanAmount <= 0 || annualRate < 0 || totalTermYears <= 0 || graceYears < 0 || amortizationYears < 0) {
            if (amortizationYears < 0) {
                alert("O prazo total não pode ser menor que o período de carência.");
            }
            setResults(null);
            return;
        }

        const table: RuralAmortizationRow[] = [];
        let balance = loanAmount;
        let totalInterest = 0;
        let graceInterest = 0;

        // Grace Period
        if (graceYears > 0) {
            if (graceInterestPayment === 'pay_periodically') {
                const paymentPeriodsInGrace = graceYears * graceInterestFrequency;
                const ratePerPeriod = Math.pow(1 + annualRate, 1 / graceInterestFrequency) - 1;
                const getPeriodLabel = (periodIndex: number) => {
                    switch (graceInterestFrequency) {
                        case 12: return `Carência Mês ${periodIndex}`;
                        case 4: return `Carência Trim. ${periodIndex}`;
                        case 2: return `Carência Sem. ${periodIndex}`;
                        case 1: default: return `Carência Ano ${periodIndex}`;
                    }
                };
                for (let i = 1; i <= paymentPeriodsInGrace; i++) {
                    const interest = balance * ratePerPeriod;
                    graceInterest += interest;
                    totalInterest += interest;
                    table.push({ period: getPeriodLabel(i), installment: interest, interest: interest, amortization: 0, balance: balance });
                }
            } else if (graceInterestPayment === 'capitalize') {
                for (let i = 1; i <= graceYears; i++) {
                    const interest = balance * annualRate;
                    graceInterest += interest;
                    totalInterest += interest;
                    balance += interest;
                    table.push({ period: `Capitalização Ano ${i}`, installment: 0, interest: interest, amortization: 0, balance: balance });
                }
            } else if (graceInterestPayment === 'pay_at_end') {
                let accumulatedGraceInterest = 0;
                for (let i = 1; i <= graceYears; i++) {
                    const interest = balance * annualRate;
                    accumulatedGraceInterest += interest;
                    graceInterest += interest;
                    totalInterest += interest;
                    table.push({ period: `Carência Ano ${i}`, installment: 0, interest: interest, amortization: 0, balance: balance });
                }
                if (accumulatedGraceInterest > 0) {
                    table.push({ period: `Pgto. Juros Carência`, installment: accumulatedGraceInterest, interest: accumulatedGraceInterest, amortization: 0, balance: balance });
                }
            }
        }
        
        // Amortization Period
        let amortizationBalance = balance;
        if (amortizationYears > 0) {
            if (amortizationType === 'price') {
                const pmt = amortizationBalance * (annualRate * Math.pow(1 + annualRate, amortizationYears)) / (Math.pow(1 + annualRate, amortizationYears) - 1);
                for (let i = 1; i <= amortizationYears; i++) {
                    const interest = amortizationBalance * annualRate;
                    const amortization = pmt - interest;
                    amortizationBalance -= amortization;
                    totalInterest += interest;
                    table.push({ period: `Ano ${i}`, installment: pmt, interest, amortization, balance: amortizationBalance < 0 ? 0 : amortizationBalance });
                }
            } else if (amortizationType === 'sac') {
                const amortization = amortizationBalance / amortizationYears;
                for (let i = 1; i <= amortizationYears; i++) {
                    const interest = amortizationBalance * annualRate;
                    const installment = amortization + interest;
                    amortizationBalance -= amortization;
                    totalInterest += interest;
                    table.push({ period: `Ano ${i}`, installment, interest, amortization, balance: amortizationBalance < 0 ? 0 : amortizationBalance });
                }
            }
        }
        
        let lastInstallment: number | undefined;
        if (amortizationType === 'sac' && amortizationYears > 0) {
            const amortizationRows = table.filter(r => r.amortization > 0);
            if (amortizationRows.length > 0) {
                lastInstallment = amortizationRows[amortizationRows.length - 1].installment;
            }
        }
        
        setResults({ table, totalInterest, totalPaid: loanAmount + totalInterest, graceInterest, lastInstallment });
    };
    
    const handleSave = () => {
        if (!results) return;
        onSave({
            type: 'Financiamento Rural',
            description: `${formatCurrency(parseFloat(amount.replace(',', '.')))} em ${term} anos com ${gracePeriod} de carência`,
            data: { inputs: { amount, rate, term, gracePeriod, amortizationType, graceInterestPayment, graceInterestFrequency }, results }
        });
        alert('Simulação salva com sucesso!');
    }

    const firstInstallment = useMemo(() => results?.table.find(r => r.amortization > 0)?.installment ?? 0, [results]);

    return (
        <div className="calculator-container">
            <div className="calculator-layout">
                <div className="form-section">
                    <h3>Simular Financiamento Rural</h3>
                    <div className="form-group">
                        <label htmlFor="amount-rural">Valor do Financiamento (R$)</label>
                        <input id="amount-rural" type="text" value={amount} onChange={e => setAmount(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rate-rural">Taxa de Juros (% a.a.)</label>
                        <input id="rate-rural" type="number" value={rate} onChange={e => setRate(e.target.value)} step="0.01" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="term-rural">Prazo Total (anos)</label>
                        <input id="term-rural" type="number" value={term} onChange={e => setTerm(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="grace-rural">Período de Carência (anos)</label>
                        <input id="grace-rural" type="number" value={gracePeriod} onChange={e => setGracePeriod(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="grace-interest">Tratamento dos Juros na Carência</label>
                        <select id="grace-interest" value={graceInterestPayment} onChange={e => setGraceInterestPayment(e.target.value)}>
                            <option value="pay_periodically">Pagar durante a carência</option>
                            <option value="pay_at_end">Pagar ao final da carência</option>
                            <option value="capitalize">Capitalizar no saldo devedor</option>
                        </select>
                    </div>
                    {graceInterestPayment === 'pay_periodically' && (
                        <div className="form-group">
                             <label htmlFor="grace-frequency">Frequência de Pagamento (Juros)</label>
                             <select id="grace-frequency" value={graceInterestFrequency} onChange={e => setGraceInterestFrequency(Number(e.target.value))}>
                                <option value={12}>Mensal</option>
                                <option value={4}>Trimestral</option>
                                <option value={2}>Semestral</option>
                                <option value={1}>Anual</option>
                             </select>
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="amortization-rural">Sistema de Amortização</label>
                        <select id="amortization-rural" value={amortizationType} onChange={e => setAmortizationType(e.target.value as AmortizationType)}>
                            <option value="sac">SAC</option>
                            <option value="price">Tabela Price</option>
                        </select>
                    </div>
                    <button className="btn" onClick={calculate}>Calcular</button>
                    <button className="btn btn-secondary" onClick={resetForm}>Limpar</button>
                    <button className="btn btn-secondary" onClick={onBack}>Voltar</button>
                    {results && <button className="btn" onClick={resetForm}>Nova Simulação</button>}
                </div>
                <div className="results-section">
                     <div className="print-only">
                      <h3>Demonstrativo de Financiamento Rural</h3>
                      <p><strong>Valor do Financiamento:</strong> {formatCurrency(parseFloat(amount.replace(',', '.')))}</p>
                      <p><strong>Taxa de Juros:</strong> {rate}% a.a.</p>
                      <p><strong>Prazo Total:</strong> {term} anos</p>
                      <p><strong>Período de Carência:</strong> {gracePeriod} anos</p>
                      <p><strong>Sistema de Amortização:</strong> {amortizationType.toUpperCase()}</p>
                    </div>
                    <h3>Resultados da Simulação</h3>
                    {results ? (
                        <>
                            <div className="results-summary">
                                <div className="summary-item">
                                    <h4>Juros na Carência</h4>
                                    <p>{formatCurrency(results.graceInterest)}</p>
                                </div>
                                <div className="summary-item">
                                    <h4>Primeira Parcela</h4>
                                    <p>{formatCurrency(firstInstallment)}</p>
                                </div>
                                {amortizationType === 'sac' && results.lastInstallment && (
                                    <div className="summary-item">
                                        <h4>Última Parcela</h4>
                                        <p>{formatCurrency(results.lastInstallment)}</p>
                                    </div>
                                )}
                                <div className="summary-item">
                                    <h4>Total Pago</h4>
                                    <p>{formatCurrency(results.totalPaid)}</p>
                                </div>
                            </div>
                            <h4>Demonstrativo Analítico</h4>
                            <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Período</th>
                                            <th>Parcela</th>
                                            <th>Juros</th>
                                            <th>Amortização</th>
                                            <th>Saldo Devedor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.table.map(row => (
                                            <tr key={row.period}>
                                                <td data-label="Período">{row.period}</td>
                                                <td data-label="Parcela">{formatCurrency(row.installment)}</td>
                                                <td data-label="Juros">{formatCurrency(row.interest)}</td>
                                                <td data-label="Amortização">{formatCurrency(row.amortization)}</td>
                                                <td data-label="Saldo Devedor">{formatCurrency(row.balance)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button className="btn btn-save no-print" onClick={handleSave}>Salvar Simulação</button>
                            <button className="btn no-print" onClick={() => window.print()}>Exportar para PDF</button>
                        </>
                    ) : (
                        <div className="no-results">
                            <div className="icon">🚜</div>
                            <p>Preencha os dados para simular seu financiamento.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const CompetitorRateChecker = ({ onBack }: { onBack: () => void }) => {
    const [loanAmount, setLoanAmount] = useState('10000,00');
    const [installmentValue, setInstallmentValue] = useState('450,00');
    const [term, setTerm] = useState('36');
    const [calculatedRate, setCalculatedRate] = useState<number | null>(null);

    const resetForm = () => {
        setLoanAmount('10000,00');
        setInstallmentValue('450,00');
        setTerm('36');
        setCalculatedRate(null);
    };

    const calculateRate = () => {
        const principal = parseFloat(loanAmount.replace(',', '.'));
        const payment = parseFloat(installmentValue.replace(',', '.'));
        const numPayments = parseInt(term, 10);

        if (isNaN(principal) || isNaN(payment) || isNaN(numPayments) || principal <= 0 || payment <= 0 || numPayments <= 0 || (principal / numPayments) > payment) {
            setCalculatedRate(null);
            return;
        }

        let low = 0;
        let high = 1;
        let mid = 0;
        const precision = 1e-7;

        for (let i = 0; i < 100; i++) {
            mid = (low + high) / 2;
            if (mid < precision) break;

            const calculatedPrincipal = payment * (1 - Math.pow(1 + mid, -numPayments)) / mid;

            if (Math.abs(calculatedPrincipal - principal) < precision) {
                break;
            }
            
            // If calculated principal is > actual principal, our rate was too low.
            if (calculatedPrincipal > principal) {
                low = mid;
            } else {
                high = mid;
            }
        }
        
        if (isNaN(mid) || mid <= 0) {
            setCalculatedRate(null);
        } else {
            setCalculatedRate(mid * 100);
        }
    };
    
    return (
        <div className="calculator-container">
            <div className="calculator-layout">
                <div className="form-section">
                    <h3>Verificador de Taxa Concorrente</h3>
                    <div className="form-group">
                        <label htmlFor="loanAmountRate">Valor do Empréstimo (R$)</label>
                        <input id="loanAmountRate" type="text" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="installmentValueRate">Valor da Parcela (R$)</label>
                        <input id="installmentValueRate" type="text" value={installmentValue} onChange={e => setInstallmentValue(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="termRate">Quantidade de Parcelas</label>
                        <input id="termRate" type="number" value={term} onChange={e => setTerm(e.target.value)} />
                    </div>
                    <button className="btn" onClick={calculateRate}>Achar Taxa</button>
                    <button className="btn btn-secondary" onClick={resetForm}>Limpar</button>
                    <button className="btn btn-secondary" onClick={onBack}>Voltar</button>
                    {calculatedRate !== null && <button className="btn" onClick={resetForm}>Novo Cálculo</button>}
                </div>
                <div className="results-section">
                    <div className="print-only">
                        <h3>Demonstrativo de Taxa Concorrente</h3>
                        <p><strong>Valor do Empréstimo:</strong> {formatCurrency(parseFloat(loanAmount.replace(',', '.')))}</p>
                        <p><strong>Valor da Parcela:</strong> {formatCurrency(parseFloat(installmentValue.replace(',', '.')))}</p>
                        <p><strong>Quantidade de Parcelas:</strong> {term}</p>
                    </div>
                    <h3>Resultado</h3>
                    {calculatedRate !== null ? (
                        <>
                         <div className="results-summary" style={{gridTemplateColumns: '1fr'}}>
                             <div className="summary-item">
                                <h4>Taxa de Juros Mensal Encontrada</h4>
                                <p>{calculatedRate.toFixed(4)}% a.m.</p>
                            </div>
                        </div>
                        <button className="btn no-print" onClick={() => window.print()}>Exportar para PDF</button>
                        </>
                    ) : (
                        <div className="no-results">
                            <div className="icon">🔍</div>
                            <p>Preencha os dados para descobrir a taxa de juros real da operação.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const FinancialInvestmentSimulator = ({ onBack }: { onBack: () => void }) => {
    const [investmentAmount, setInvestmentAmount] = useState('10000,00');
    const [periodInDays, setPeriodInDays] = useState(365);
    const [customPeriod, setCustomPeriod] = useState('365');
    const [activePeriodButton, setActivePeriodButton] = useState('1y');
    const [lcaRate, setLcaRate] = useState('98');
    const [cdbRate, setCdbRate] = useState('110');
    const [results, setResults] = useState<any | null>(null);
    const [showDetailedStatement, setShowDetailedStatement] = useState(false);

    const { cdi, selic } = useMemo(() => {
        return {
            cdi: 0.1490,
            selic: 0.15
        };
    }, []);

    const resetForm = () => {
        setInvestmentAmount('10000,00');
        setPeriodInDays(365);
        setCustomPeriod('365');
        setActivePeriodButton('1y');
        setLcaRate('98');
        setCdbRate('110');
        setResults(null);
        setShowDetailedStatement(false);
    };

    const getIncomeTaxRate = (days: number): number => {
        if (days <= 180) return 0.225;
        if (days <= 360) return 0.20;
        if (days <= 720) return 0.175;
        return 0.15;
    };
    
    const calculate = () => {
        setShowDetailedStatement(false);
        const principal = parseFloat(investmentAmount.replace(',', '.'));
        const lcaRatePercent = parseFloat(lcaRate);
        const cdbRatePercent = parseFloat(cdbRate);

        if (isNaN(principal) || isNaN(lcaRatePercent) || isNaN(cdbRatePercent) || principal <= 0 || periodInDays <= 0) {
            setResults(null);
            return;
        }

        // --- CDB/RDC Calculation ---
        const cdbAnnualRate = cdi * (cdbRatePercent / 100);
        const grossAmountCdb = principal * Math.pow(1 + cdbAnnualRate, periodInDays / 365);
        const grossYieldCdb = grossAmountCdb - principal;
        const taxRate = getIncomeTaxRate(periodInDays);
        const taxAmount = grossYieldCdb * taxRate;
        const netAmountCdb = grossAmountCdb - taxAmount;

        // --- LCA/LCI Calculation ---
        const lcaAnnualRate = cdi * (lcaRatePercent / 100);
        const netAmountLca = principal * Math.pow(1 + lcaAnnualRate, periodInDays / 365);

        // --- Poupança Calculation ---
        const poupancaAnnualRate = selic > 0.085 ? 0.0617 : selic * 0.70; // 6.17% a.a. = 0.5% a.m.
        const netAmountPoupanca = principal * Math.pow(1 + poupancaAnnualRate, periodInDays / 365);

        // --- Effective Monthly Rates ---
        const months = periodInDays / 30.4375;
        
        const totalGrossRateCdb = (grossAmountCdb / principal) - 1;
        const monthlyGrossRateCdb = (Math.pow(1 + totalGrossRateCdb, 1 / months) - 1) * 100;
        const totalNetRateCdb = (netAmountCdb / principal) - 1;
        const monthlyNetRateCdb = (Math.pow(1 + totalNetRateCdb, 1 / months) - 1) * 100;

        const totalNetRateLca = (netAmountLca / principal) - 1;
        const monthlyNetRateLca = (Math.pow(1 + totalNetRateLca, 1 / months) - 1) * 100;

        const totalNetRatePoupanca = (netAmountPoupanca / principal) - 1;
        const monthlyNetRatePoupanca = (Math.pow(1 + totalNetRatePoupanca, 1 / months) - 1) * 100;
        
        // --- Detailed Monthly Breakdown ---
        const detailedTable = [];
        const totalMonths = Math.floor(periodInDays / 30.4375);

        if (totalMonths > 0) {
            const cdbMonthlyRate = Math.pow(1 + cdbAnnualRate, 1 / 12) - 1;
            const lcaMonthlyRate = Math.pow(1 + lcaAnnualRate, 1 / 12) - 1;
            const poupancaMonthlyRate = Math.pow(1 + poupancaAnnualRate, 1 / 12) - 1;

            let currentCdbBalance = principal;
            let currentLcaBalance = principal;
            let currentPoupancaBalance = principal;

            for (let month = 1; month <= totalMonths; month++) {
                currentCdbBalance *= (1 + cdbMonthlyRate);
                currentLcaBalance *= (1 + lcaMonthlyRate);
                currentPoupancaBalance *= (1 + poupancaMonthlyRate);
                
                detailedTable.push({
                    month,
                    cdbBalance: currentCdbBalance,
                    lcaBalance: currentLcaBalance,
                    poupancaBalance: currentPoupancaBalance,
                });
            }
        }

        setResults({
            grossAmountCdb,
            grossYieldCdb,
            taxAmountCdb: taxAmount,
            taxRateCdb: taxRate,
            netAmountCdb,
            netAmountLca,
            netAmountPoupanca,
            rates: [
                { name: 'CDB/RDC', gross: monthlyGrossRateCdb, net: monthlyNetRateCdb },
                { name: 'LCI/LCA', gross: monthlyNetRateLca, net: monthlyNetRateLca }, // Gross is same as Net
                { name: 'Poupança', gross: monthlyNetRatePoupanca, net: monthlyNetRatePoupanca }, // Gross is same as Net
            ],
            detailedTable
        });
    };

    const handlePeriodClick = (days: number, key: string) => {
        setPeriodInDays(days);
        setActivePeriodButton(key);
        if (key !== 'custom') {
            setCustomPeriod(String(days));
        }
    };
    
    const handleCustomPeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const days = e.target.value;
        setCustomPeriod(days);
        setActivePeriodButton('custom');
        if (days) {
            setPeriodInDays(parseInt(days, 10));
        }
    }

    const periodOptions = [
        { key: '30d', label: '30 dias', days: 30 },
        { key: '60d', label: '60 dias', days: 60 },
        { key: '90d', label: '90 dias', days: 90 },
        { key: '180d', label: '180 dias', days: 180 },
        { key: '1y', label: '1 Ano', days: 365 },
        { key: '2y', label: '2 Anos', days: 730 },
    ];

    return (
        <div className="calculator-container">
            <div className="calculator-layout">
                <div className="form-section">
                    <h3>Simulador de Aplicação Financeira</h3>
                    <div className="form-group">
                        <label htmlFor="investmentAmount">Valor da Aplicação (R$)</label>
                        <input id="investmentAmount" type="text" value={investmentAmount} onChange={e => setInvestmentAmount(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Período de Investimento</label>
                        <div className="period-filters">
                            {periodOptions.map(opt => (
                                <button key={opt.key} onClick={() => handlePeriodClick(opt.days, opt.key)} className={activePeriodButton === opt.key ? 'active' : ''}>
                                    {opt.label}
                                </button>
                            ))}
                             <button onClick={() => setActivePeriodButton('custom')} className={activePeriodButton === 'custom' ? 'active' : ''}>
                                Personalizado
                            </button>
                        </div>
                        {activePeriodButton === 'custom' && (
                             <div style={{marginTop: '10px'}}>
                                <label htmlFor="customPeriodDays">Período Personalizado (dias)</label>
                                <input id="customPeriodDays" type="number" value={customPeriod} onChange={handleCustomPeriodChange} />
                             </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="cdbRate">Taxa CDB/RDC (% do CDI)</label>
                        <input id="cdbRate" type="number" value={cdbRate} onChange={e => setCdbRate(e.target.value)} />
                    </div>
                     <div className="form-group">
                        <label htmlFor="lcaRate">Taxa LCI/LCA (% do CDI)</label>
                        <input id="lcaRate" type="number" value={lcaRate} onChange={e => setLcaRate(e.target.value)} />
                    </div>

                    <p style={{fontSize: '0.8rem', color: '#666', marginBottom: '15px'}}>
                        Usando CDI: {(cdi * 100).toFixed(2)}% a.a., SELIC: {(selic * 100).toFixed(2)}% a.a. (fixos para simulação).
                    </p>

                    <button className="btn" onClick={calculate}>Calcular</button>
                    <button className="btn btn-secondary" onClick={resetForm}>Limpar</button>
                    <button className="btn btn-secondary" onClick={onBack}>Voltar</button>
                </div>

                <div className="results-section">
                     <div className="print-only">
                        <h3>Demonstrativo de Aplicação Financeira</h3>
                        <p><strong>Valor da Aplicação:</strong> {formatCurrency(parseFloat(investmentAmount.replace(',', '.')))}</p>
                        <p><strong>Período:</strong> {periodInDays} dias</p>
                        <p><strong>Taxa CDB/RDC:</strong> {cdbRate}% do CDI</p>
                        <p><strong>Taxa LCI/LCA:</strong> {lcaRate}% do CDI</p>
                    </div>
                    <h3>Comparativo de Investimentos</h3>
                    {results ? (
                        <>
                            <div className="results-summary">
                                <div className="summary-item">
                                    <h4>Líquido CDB/RDC</h4>
                                    <p>{formatCurrency(results.netAmountCdb)}</p>
                                    <div className="cdb-breakdown">
                                        <div>
                                            <span>Valor Bruto:</span>
                                            <span>{formatCurrency(results.grossAmountCdb)}</span>
                                        </div>
                                        <div>
                                            <span>IR ({results.taxRateCdb * 100}%):</span>
                                            <span className="ir-value">-{formatCurrency(results.taxAmountCdb)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="summary-item">
                                    <h4>Líquido LCI/LCA</h4>
                                    <p>{formatCurrency(results.netAmountLca)}</p>
                                </div>
                                <div className="summary-item">
                                    <h4>Líquido Poupança</h4>
                                    <p>{formatCurrency(results.netAmountPoupanca)}</p>
                                </div>
                            </div>
                            <h4>Taxas Efetivas Mensais</h4>
                             <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th style={{textAlign: 'left'}}>Investimento</th>
                                            <th>Taxa Bruta (% a.m.)</th>
                                            <th>Taxa Líquida (% a.m.)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.rates.map((row: any) => (
                                            <tr key={row.name}>
                                                <td style={{textAlign: 'left'}}>{row.name}</td>
                                                <td>{row.gross.toFixed(4)}%</td>
                                                <td>{row.net.toFixed(4)}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="no-print">
                                {!showDetailedStatement && (
                                    <button className="btn" onClick={() => setShowDetailedStatement(true)} style={{marginTop: '20px'}}>
                                        Criar Demonstrativo Detalhado
                                    </button>
                                )}
                                <button className="btn" onClick={() => window.print()}>Exportar para PDF</button>
                            </div>

                            {showDetailedStatement && results.detailedTable.length > 0 && (
                                <div className="detailed-analysis-section" style={{ marginTop: '30px' }}>
                                    <h4 style={{marginBottom: '15px'}}>Demonstrativo Detalhado (Evolução Mensal)</h4>
                                    <div className="table-container">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th style={{textAlign: 'left'}}>Mês</th>
                                                    <th>Saldo CDB/RDC</th>
                                                    <th>Saldo LCI/LCA</th>
                                                    <th>Saldo Poupança</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {results.detailedTable.map((row: any) => (
                                                    <tr key={row.month}>
                                                        <td style={{textAlign: 'left'}}>{row.month}</td>
                                                        <td>{formatCurrency(row.cdbBalance)}</td>
                                                        <td>{formatCurrency(row.lcaBalance)}</td>
                                                        <td>{formatCurrency(row.poupancaBalance)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <p style={{fontSize: '0.8rem', color: '#666', marginTop: '10px', fontStyle: 'italic'}}>
                                        Nota: A tabela exibe a evolução para meses completos. Os valores finais nos cards acima são mais precisos pois consideram o período exato em dias.
                                    </p>

                                    <h4 style={{marginTop: '30px', marginBottom: '15px'}}>Custo do Imposto de Renda (CDB/RDC)</h4>
                                    <div className="summary-item" style={{textAlign: 'left', padding: '20px'}}>
                                        <div className="cdb-breakdown" style={{borderTop: 'none', paddingTop: 0, marginTop: 0}}>
                                            <div>
                                                <span>Rendimento Bruto Total:</span>
                                                <span>{formatCurrency(results.grossYieldCdb)}</span>
                                            </div>
                                            <div>
                                                <span>Alíquota de IR ({results.taxRateCdb * 100}%):</span>
                                                <span className="ir-value">-{formatCurrency(results.taxAmountCdb)}</span>
                                            </div>
                                            <div style={{borderTop: '1px solid var(--border-color)', paddingTop: '10px', marginTop: '10px'}}>
                                                <span>Rendimento Líquido:</span>
                                                <strong>{formatCurrency(results.grossYieldCdb - results.taxAmountCdb)}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                             {showDetailedStatement && results.detailedTable.length === 0 && (
                                <div className="detailed-analysis-section no-print" style={{ marginTop: '30px' }}>
                                    <p>O demonstrativo detalhado só está disponível para períodos de 1 mês ou mais.</p>
                                </div>
                            )}

                        </>
                    ) : (
                         <div className="no-results">
                            <div className="icon">💡</div>
                            <p>Preencha os dados para comparar os investimentos.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const generateHistoricalData = (days: number, startValue: number, volatility: number) => {
    const data: { date: Date; value: number }[] = [];
    let currentValue = startValue;
    const today = new Date();
    for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        data.push({ date, value: currentValue });
        const change = (Math.random() - 0.49) * volatility;
        currentValue += change;
        if (currentValue < 0) currentValue = 0.01;
    }
    return data.reverse();
};

const EconomicIndicators = ({ onBack }: { onBack: () => void }) => {
    const [indicatorsData, setIndicatorsData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Simulate API call to fetch current indicator values
        setTimeout(() => {
            const data = {
                cdi: { name: 'CDI', data: generateHistoricalData(1, 10.50, 0), unit: '%' },
                selic: { name: 'SELIC', data: generateHistoricalData(1, 10.50, 0), unit: '%' },
                ipca: { name: 'IPCA', data: generateHistoricalData(1, 3.93, 0), unit: '%' },
                usdbrl: { name: 'Dólar', data: generateHistoricalData(1, 5.25, 0), unit: 'R$' }
            };
            setIndicatorsData(data);
            setLoading(false);
        }, 1200);
    }, []);

    const currentValues = useMemo(() => {
        if (!indicatorsData) return null;
        return {
            cdi: { name: 'CDI', value: `${indicatorsData.cdi.data[0].value.toFixed(2)}% a.a.` },
            selic: { name: 'SELIC', value: `${indicatorsData.selic.data[0].value.toFixed(2)}% a.a.` },
            ipca: { name: 'IPCA', value: `${indicatorsData.ipca.data[0].value.toFixed(2)}% a.a.` },
            usdbrl: { name: 'Dólar (USD/BRL)', value: `R$ ${indicatorsData.usdbrl.data[0].value.toFixed(2)}` },
        };
    }, [indicatorsData]);
    
    return (
        <div className="indicators-container">
            <h3>Principais Indicadores Econômicos</h3>
             <p style={{ color: '#666', marginTop: '-15px', marginBottom: '20px' }} className="no-print">Valores atuais (dados simulados).</p>
            
            {loading ? (
                <div className="no-results" style={{ minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p>Buscando dados atualizados...</p>
                </div>
            ) : currentValues && (
                <div className="indicators-grid">
                    {Object.values(currentValues).map((indicator: any) => (
                        <div key={indicator.name} className="indicator-card">
                            <div className="indicator-header">
                                <h4>{indicator.name}</h4>
                                <p>{indicator.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            <button className="btn no-print" onClick={() => window.print()} style={{maxWidth: '350px', margin: '20px auto 0', display: 'block'}}>Exportar para PDF</button>
            <button className="btn btn-secondary no-print" style={{maxWidth: '350px', margin: '10px auto 0', display: 'block'}} onClick={onBack}>Voltar</button>
        </div>
    );
};

const HistoryScreen = ({ calculations, onBack, onClear, onViewDetail }: { calculations: Calculation[], onBack: () => void, onClear: () => void, onViewDetail: (calc: Calculation) => void }) => (
    <div className="history-container">
        <h3>Histórico de Cálculos</h3>
        {calculations.length > 0 ? (
            <div className="history-list">
                {[...calculations].reverse().map(calc => (
                    <div key={calc.id} className="history-item" onClick={() => onViewDetail(calc)}>
                        <div className="history-item-header">
                            <h4>{calc.type}</h4>
                            <span className="no-print">{new Date(calc.id).toLocaleString('pt-BR')}</span>
                        </div>
                        <p>{calc.description}</p>
                    </div>
                ))}
            </div>
        ) : (
            <div className="no-results">
                <div className="icon">📂</div>
                <p>Nenhuma simulação salva ainda.</p>
            </div>
        )}
        <div style={{ maxWidth: '350px', margin: '0 auto' }} className="no-print">
            {calculations.length > 0 && <button className="btn btn-danger" onClick={onClear}>Limpar Histórico</button>}
            <button className="btn btn-secondary" onClick={onBack}>Voltar</button>
        </div>
    </div>
);

const HomeScreen = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <>
      <div className="header">
        <h1>Salva Bancário</h1>
        <p>Suas ferramentas financeiras em um só lugar.</p>
      </div>
      <div className="card-grid">
        <div className="feature-card" onClick={() => onNavigate('loanCalculator')}>
          <div className="icon">🏦</div>
          <h2>Calculadora de Empréstimo</h2>
          <p>Simule empréstimos com sistemas Price e SAC.</p>
        </div>
        <div className="feature-card" onClick={() => onNavigate('checkDiscount')}>
          <div className="icon">📄</div>
          <h2>Antecipação de Cheques</h2>
          <p>Calcule o desconto de cheques e taxas aplicadas.</p>
        </div>
        <div className="feature-card" onClick={() => onNavigate('ruralFinancing')}>
          <div className="icon">🌾</div>
          <h2>Financiamento Rural</h2>
          <p>Simule com carência e parcelamento anual.</p>
        </div>
        <div className="feature-card" onClick={() => onNavigate('investmentSimulator')}>
          <div className="icon">💰</div>
          <h2>Simulador de Aplicação</h2>
          <p>Compare CDB, LCI/LCA e Poupança.</p>
        </div>
        <div className="feature-card" onClick={() => onNavigate('competitorRateChecker')}>
          <div className="icon">🕵️</div>
          <h2>Taxa Concorrente</h2>
          <p>Descubra os juros reais de um financiamento.</p>
        </div>
        <div className="feature-card" onClick={() => onNavigate('economicIndicators')}>
          <div className="icon">📈</div>
          <h2>Indicadores Econômicos</h2>
          <p>Acompanhe CDI, IPCA, Selic e mais.</p>
        </div>
         <div className="feature-card" onClick={() => onNavigate('history')}>
          <div className="icon">💾</div>
          <h2>Histórico de Cálculos</h2>
          <p>Veja suas simulações salvas.</p>
        </div>
      </div>
    </>
  );
};

const HistoryDetailModal = ({ calculation, onClose }: { calculation: Calculation, onClose: () => void }) => {
    if (!calculation) return null;

    const renderDetail = () => {
        const { type, data } = calculation;
        const { results } = data;
        
        switch (type) {
            case 'Empréstimo':
                const firstInstallment = results.table[0]?.installment ?? 0;
                const { inputs } = data;
                return (
                    <>
                        <div className="results-summary">
                            <div className="summary-item"><h4>Valor da Parcela</h4><p>{formatCurrency(firstInstallment)}{inputs.amortizationType === 'sac' && <span style={{fontSize: '0.8rem', display: 'block'}}>(primeira)</span>}</p></div>
                             {inputs.amortizationType === 'sac' && results.lastInstallment && (
                                <div className="summary-item">
                                    <h4>Última Parcela</h4>
                                    <p>{formatCurrency(results.lastInstallment)}</p>
                                </div>
                             )}
                            <div className="summary-item"><h4>Total de Juros</h4><p>{formatCurrency(results.totalInterest)}</p></div>
                            <div className="summary-item"><h4>Total Pago</h4><p>{formatCurrency(results.totalPaid)}</p></div>
                            {results.calculatedIof > 0 &&
                                <div className="summary-item">
                                    <h4>IOF Calculado</h4>
                                    <p>{formatCurrency(results.calculatedIof)}</p>
                                </div>
                            }
                            {inputs.financeIof && results.calculatedIof > 0 &&
                                <div className="summary-item">
                                    <h4>Valor Financiado</h4>
                                    <p>{formatCurrency(parseFloat(inputs.amount.replace(',', '.')) + results.calculatedIof)}</p>
                                </div>
                            }
                        </div>
                        <h4>Demonstrativo Analítico</h4>
                        <div className="table-container">
                            <table>
                                <thead><tr><th>Mês</th><th>Parcela</th><th>Juros</th><th>Amortização</th><th>Saldo Devedor</th></tr></thead>
                                <tbody>{results.table.map((row: AmortizationRow) => (<tr key={row.month}><td data-label="Mês">{row.month}</td><td data-label="Parcela">{formatCurrency(row.installment)}</td><td data-label="Juros">{formatCurrency(row.interest)}</td><td data-label="Amortização">{formatCurrency(row.amortization)}</td><td data-label="Saldo Devedor">{formatCurrency(row.balance)}</td></tr>))}</tbody>
                            </table>
                        </div>
                    </>
                );
             case 'Antecipação de Cheques':
                return (
                     <div className="results-summary" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                        <div className="summary-item"><h4>Valor Líquido a Receber</h4><p>{formatCurrency(results.netAmount)}</p></div>
                        <div className="summary-item">
                            <h4>Custo Total da Operação</h4>
                            <p>{formatCurrency(results.totalCost)}</p>
                            {results.totalInterest !== undefined && results.tacValue !== undefined && (
                                <div className="cdb-breakdown">
                                    <div>
                                        <span>Juros:</span>
                                        <span>{formatCurrency(results.totalInterest)}</span>
                                    </div>
                                    <div>
                                        <span>TAC:</span>
                                        <span>{formatCurrency(results.tacValue)}</span>
                                    </div>
                                    <div>
                                        <span>IOF:</span>
                                        <span>{formatCurrency(results.calculatedIof)}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="summary-item"><h4>Valor Bruto dos Cheques</h4><p>{formatCurrency(results.originalValue)}</p></div>
                    </div>
                )
             case 'Financiamento Rural':
                 const firstAmortInstallment = results.table.find((r: RuralAmortizationRow) => r.amortization > 0)?.installment ?? 0;
                return (
                    <>
                         <div className="results-summary">
                            <div className="summary-item"><h4>Juros na Carência</h4><p>{formatCurrency(results.graceInterest)}</p></div>
                            <div className="summary-item"><h4>Primeira Parcela</h4><p>{formatCurrency(firstAmortInstallment)}</p></div>
                            {data.inputs.amortizationType === 'sac' && results.lastInstallment && (
                                <div className="summary-item">
                                    <h4>Última Parcela</h4>
                                    <p>{formatCurrency(results.lastInstallment)}</p>
                                </div>
                            )}
                            <div className="summary-item"><h4>Total Pago</h4><p>{formatCurrency(results.totalPaid)}</p></div>
                        </div>
                        <h4>Demonstrativo Analítico</h4>
                        <div className="table-container">
                            <table>
                                <thead><tr><th>Período</th><th>Parcela</th><th>Juros</th><th>Amortização</th><th>Saldo Devedor</th></tr></thead>
                                <tbody>{results.table.map((row: RuralAmortizationRow) => (<tr key={row.period}><td data-label="Período">{row.period}</td><td data-label="Parcela">{formatCurrency(row.installment)}</td><td data-label="Juros">{formatCurrency(row.interest)}</td><td data-label="Amortização">{formatCurrency(row.amortization)}</td><td data-label="Saldo Devedor">{formatCurrency(row.balance)}</td></tr>))}</tbody>
                            </table>
                        </div>
                    </>
                )
            default:
                return <p>Detalhes não disponíveis para este tipo de cálculo.</p>;
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{calculation.type}</h3>
                    <button className="modal-close-btn no-print" onClick={onClose}>&times;</button>
                </div>
                <p style={{ color: '#666', marginTop: '-15px', marginBottom: '20px' }}>
                    Salvo em: {new Date(calculation.id).toLocaleString('pt-BR')}
                </p>
                {renderDetail()}
                 <button className="btn no-print" onClick={() => window.print()} style={{marginTop: '20px'}}>
                    Exportar para PDF
                </button>
            </div>
        </div>
    );
};


const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [viewingCalculation, setViewingCalculation] = useState<Calculation | null>(null);
  const [savedCalculations, setSavedCalculations] = useState<Calculation[]>(() => {
    try {
        const item = window.localStorage.getItem('savedCalculations');
        return item ? JSON.parse(item) : [];
    } catch (error) {
        console.error("Failed to parse saved calculations:", error);
        return [];
    }
  });

  useEffect(() => {
    try {
        window.localStorage.setItem('savedCalculations', JSON.stringify(savedCalculations));
    } catch (error) {
        console.error("Failed to save calculations:", error);
    }
  }, [savedCalculations]);

  useEffect(() => {
    const body = document.body;
    if (viewingCalculation) {
        body.classList.add('modal-open');
    } else {
        body.classList.remove('modal-open');
    }
    return () => {
      body.classList.remove('modal-open');
    };
  }, [viewingCalculation]);

  const handleSaveCalculation = (calculation: Omit<Calculation, 'id'>) => {
    setSavedCalculations(prev => [...prev, { ...calculation, id: Date.now() }]);
  };

  const handleClearHistory = () => {
    if (window.confirm('Tem certeza que deseja limpar todo o histórico? Esta ação não pode ser desfeita.')) {
        setSavedCalculations([]);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'loanCalculator':
        return <LoanCalculator onBack={() => setCurrentPage('home')} onSave={handleSaveCalculation} />;
      case 'checkDiscount':
        return <CheckDiscountCalculator onBack={() => setCurrentPage('home')} onSave={handleSaveCalculation} />;
      case 'ruralFinancing':
        return <RuralFinancingCalculator onBack={() => setCurrentPage('home')} onSave={handleSaveCalculation} />;
       case 'competitorRateChecker':
        return <CompetitorRateChecker onBack={() => setCurrentPage('home')} />;
      case 'investmentSimulator':
        return <FinancialInvestmentSimulator onBack={() => setCurrentPage('home')} />;
      case 'economicIndicators':
        return <EconomicIndicators onBack={() => setCurrentPage('home')} />;
      case 'history':
        return <HistoryScreen calculations={savedCalculations} onBack={() => setCurrentPage('home')} onClear={handleClearHistory} onViewDetail={setViewingCalculation} />;
      case 'home':
      default:
        return <HomeScreen onNavigate={setCurrentPage} />;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app-container">
        {renderPage()}
      </div>
      {viewingCalculation && <HistoryDetailModal calculation={viewingCalculation} onClose={() => setViewingCalculation(null)} />}
    </>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);