

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
    }

    .modal-content {
      max-height: none;
      overflow: visible;
      box-shadow: none;
      border: 1px solid #ccc;
      width: 100%;
    }

    .modal-header {
      display: none;
    }
  }
  
  @media (max-width: 900px) {
    .calculator-layout {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    .app-container {
      padding: 10px;
    }

    .header h1 {
      font-size: 2rem;
    }
    
    .form-group.inline {
      flex-direction: column;
      align-items: stretch;
    }

    .form-group.inline > button {
      height: auto;
      margin-top: 10px;
    }

    .results-summary {
      grid-template-columns: 1fr;
    }
    
    .indicators-grid {
      grid-template-columns: 1fr;
    }
    
    table {
        border: 0;
    }

    table thead {
        border: none;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }
    
    table tr {
        border-bottom: 3px solid var(--border-color);
        display: block;
        margin-bottom: .625em;
        background-color: var(--background-color);
        border-radius: 8px;
        padding: 15px;
    }
    
    table td {
        border-bottom: 1px solid #ddd;
        display: block;
        font-size: .8em;
        text-align: right;
        padding: 10px 0;
    }
    
    table td::before {
        content: attr(data-label);
        float: left;
        font-weight: bold;
        text-transform: uppercase;
        color: var(--primary-color);
    }
    
    table td:last-child {
        border-bottom: 0;
    }
  }
`;

const formatCurrency = (value) => {
  if (isNaN(value) || value === null) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${day}/${month}/${year}`;
};

const parseDate = (dateString) => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('/');
    if (!day || !month || !year) return null;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};


const FinancialInvestmentSimulator = ({ goBack }) => {
    const [initialAmount, setInitialAmount] = useState('1000,00');
    const [monthlyAmount, setMonthlyAmount] = useState('100,00');
    const [period, setPeriod] = useState('12');
    const [periodType, setPeriodType] = useState('months');
    const [rateType, setRateType] = useState('CDI');
    const [cdbRate, setCdbRate] = useState('100');
    const [fixedRate, setFixedRate] = useState('10,0');
    
    const [results, setResults] = useState(null);

    const getRate = () => {
        switch (rateType) {
            case 'CDI':
                return 14.90; 
            case 'SELIC':
                return 15.00;
            case 'FIXED':
                return parseFloat(fixedRate.replace(',', '.')) || 0;
            default:
                return 0;
        }
    };
    
    const calculateIR = (profit, days) => {
        if (days <= 180) return profit * 0.225;
        if (days <= 360) return profit * 0.20;
        if (days <= 720) return profit * 0.175;
        return profit * 0.15;
    };

    const handleCalculate = () => {
        const initial = parseFloat(initialAmount.replace(/\./g, '').replace(',', '.')) || 0;
        const monthly = parseFloat(monthlyAmount.replace(/\./g, '').replace(',', '.')) || 0;
        const p = parseInt(period) || 0;
        const totalMonths = periodType === 'years' ? p * 12 : p;
        const totalDays = totalMonths * 30; // Approximation for IR calculation

        let annualRate = getRate();
        if (rateType === 'CDI') {
            annualRate = annualRate * (parseFloat(cdbRate) / 100);
        }
        
        const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;

        let finalAmount = initial * Math.pow(1 + monthlyRate, totalMonths);
        let totalInvested = initial;
        
        if (monthly > 0) {
            finalAmount += monthly * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
            totalInvested += monthly * totalMonths;
        }

        const profit = finalAmount - totalInvested;
        const ir = calculateIR(profit, totalDays);
        const netProfit = profit - ir;
        const netAmount = totalInvested + netProfit;

        setResults({
            grossAmount: finalAmount,
            totalInvested,
            profit,
            ir,
            netAmount,
            netProfit
        });
    };

    const handlePrint = () => {
        window.print();
    };

    const formatInput = (value) => {
      let v = value.replace(/\D/g, '');
      v = (v/100).toFixed(2) + '';
      v = v.replace(".", ",");
      v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      return v;
    };

    return (
        <div className="calculator-container">
            <div className="calculator-layout">
                <div className="form-section">
                    <h3>Simulador de Aplicação</h3>
                    <div className="form-group">
                        <label>Valor Inicial</label>
                        <input type="text" value={initialAmount} onChange={e => setInitialAmount(formatInput(e.target.value))} />
                    </div>
                    <div className="form-group">
                        <label>Valor Mensal</label>
                        <input type="text" value={monthlyAmount} onChange={e => setMonthlyAmount(formatInput(e.target.value))} />
                    </div>
                    <div className="form-group inline">
                         <div>
                            <label>Período</label>
                            <input type="number" value={period} onChange={e => setPeriod(e.target.value)} />
                         </div>
                         <select value={periodType} onChange={e => setPeriodType(e.target.value)}>
                            <option value="months">Meses</option>
                            <option value="years">Anos</option>
                         </select>
                    </div>
                    <div className="form-group">
                        <label>Tipo de Rentabilidade</label>
                        <select value={rateType} onChange={e => setRateType(e.target.value)}>
                            <option value="CDI">Pós-fixado (CDI)</option>
                            <option value="SELIC">Pós-fixado (SELIC)</option>
                            <option value="FIXED">Prefixado</option>
                        </select>
                    </div>
                    {rateType === 'CDI' && (
                        <div className="form-group">
                            <label>% do CDI</label>
                            <input type="number" value={cdbRate} onChange={e => setCdbRate(e.target.value)} />
                        </div>
                    )}
                    {rateType === 'FIXED' && (
                        <div className="form-group">
                            <label>Taxa Fixa (% a.a.)</label>
                            <input type="text" value={fixedRate} onChange={e => setFixedRate(e.target.value)} />
                        </div>
                    )}
                    <button className="btn" onClick={handleCalculate}>Calcular</button>
                    <button className="btn btn-secondary no-print" onClick={goBack}>Voltar</button>
                </div>
                <div className="results-section">
                    <h3>Resultados</h3>
                    {results ? (
                        <>
                            <div className="results-summary">
                                <div className="summary-item">
                                    <h4>Valor Bruto Final</h4>
                                    <p>{formatCurrency(results.grossAmount)}</p>
                                </div>
                                <div className="summary-item">
                                    <h4>Valor Investido</h4>
                                    <p>{formatCurrency(results.totalInvested)}</p>
                                </div>
                                <div className="summary-item">
                                    <h4>Total em Juros</h4>
                                    <p>{formatCurrency(results.profit)}</p>
                                </div>
                                <div className="summary-item">
                                    <h4>Imposto de Renda</h4>
                                    <p className="negative">{formatCurrency(results.ir)}</p>
                                </div>
                                <div className="summary-item">
                                    <h4>Valor Líquido Final</h4>
                                    <p className="positive">{formatCurrency(results.netAmount)}</p>
                                </div>
                                 <div className="summary-item">
                                    <h4>Lucro Líquido</h4>
                                    <p className="positive">{formatCurrency(results.netProfit)}</p>
                                </div>
                            </div>
                            <button className="btn btn-save no-print" onClick={handlePrint}>Exportar para PDF</button>
                        </>
                    ) : (
                        <div className="no-results">
                            <div className="icon">📊</div>
                            <p>Preencha os campos e clique em "Calcular" para ver os resultados.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const CheckAnticipationCalculator = ({ goBack, saveSimulation, viewHistory }) => {
    const [checks, setChecks] = useState([{ days: '', value: '' }]);
    const [tac, setTac] = useState('50,00');
    const [interestRate, setInterestRate] = useState('3,00');
    
    const [results, setResults] = useState(null);

    const formatInput = (value) => {
      let v = value.replace(/\D/g, '');
      v = (v/100).toFixed(2) + '';
      v = v.replace(".", ",");
      v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      return v;
    };
    
    const handleAddCheck = () => {
        setChecks([...checks, { days: '', value: '' }]);
    };

    const handleRemoveCheck = (index) => {
        const newChecks = checks.filter((_, i) => i !== index);
        setChecks(newChecks);
    };

    const handleCheckChange = (index, field, value) => {
        const newChecks = [...checks];
        if (field === 'value') {
            newChecks[index][field] = formatInput(value);
        } else {
            newChecks[index][field] = value;
        }
        setChecks(newChecks);
    };

    const handleCalculate = () => {
        const parsedChecks = checks.map(c => ({
            days: parseInt(c.days) || 0,
            value: parseFloat(c.value.replace(/\./g, '').replace(',', '.')) || 0,
        }));
        
        const parsedTac = parseFloat(tac.replace(/\./g, '').replace(',', '.')) || 0;
        const monthlyInterest = (parseFloat(interestRate.replace(',', '.')) || 0) / 100;
        const dailyInterest = monthlyInterest / 30;

        let totalGrossValue = 0;
        let totalInterest = 0;
        let totalIof = 0;

        const detailedChecks = parsedChecks.filter(c => c.days > 0 && c.value > 0).map(check => {
            const interest = check.value * dailyInterest * check.days;
            const iof = check.value * 0.000082 * check.days + check.value * 0.0038;
            totalGrossValue += check.value;
            totalInterest += interest;
            totalIof += iof;
            return {
                ...check,
                interest,
                iof,
                netValue: check.value - interest - iof,
            };
        });

        const totalOperationCost = totalInterest + parsedTac + totalIof;
        const netAmountToReceive = totalGrossValue - totalOperationCost;

        setResults({
            netAmountToReceive,
            totalOperationCost,
            totalGrossValue,
            totalInterest,
            parsedTac,
            totalIof,
            detailedChecks
        });
    };

    const handleSave = () => {
        if(results) {
            const simulationData = {
                id: Date.now(),
                type: 'Antecipação de Cheques',
                date: new Date().toISOString(),
                ...results
            };
            saveSimulation(simulationData);
            alert('Simulação salva com sucesso!');
        }
    };
    
     const handlePrint = () => {
        window.print();
    };

    return (
        <div className="calculator-container">
            <div className="calculator-layout">
                <div className="form-section">
                    <h3>Antecipação de Cheques</h3>
                    {checks.map((check, index) => (
                        <div key={index} className="form-group inline">
                            <div>
                                <label>Prazo (dias)</label>
                                <input 
                                    type="number" 
                                    value={check.days} 
                                    onChange={e => handleCheckChange(index, 'days', e.target.value)} 
                                    placeholder="Ex: 30"
                                />
                            </div>
                            <div>
                                <label>Valor (R$)</label>
                                <input 
                                    type="text" 
                                    value={check.value} 
                                    onChange={e => handleCheckChange(index, 'value', e.target.value)}
                                    placeholder="Ex: 1.000,00"
                                />
                            </div>
                            {checks.length > 1 && (
                                <button className="btn btn-danger" onClick={() => handleRemoveCheck(index)} style={{height: '47px'}}>-</button>
                            )}
                        </div>
                    ))}
                    <button className="btn btn-secondary" onClick={handleAddCheck}>Adicionar Cheque</button>

                    <div className="form-group" style={{marginTop: '20px'}}>
                        <label>Taxa de Juros (% a.m.)</label>
                        <input type="text" value={interestRate} onChange={e => setInterestRate(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>TAC (Tarifa de Abertura de Crédito)</label>
                        <input type="text" value={tac} onChange={e => setTac(formatInput(e.target.value))} />
                    </div>

                    <button className="btn" onClick={handleCalculate}>Calcular</button>
                    <button className="btn btn-secondary no-print" onClick={goBack}>Voltar</button>
                </div>
                <div className="results-section">
                    <h3>Resultados da Simulação</h3>
                    {results ? (
                        <>
                            <div className="results-summary">
                                <div className="summary-item">
                                    <h4>Valor Líquido a Receber</h4>
                                    <p className="positive">{formatCurrency(results.netAmountToReceive)}</p>
                                </div>
                                <div className="summary-item">
                                    <h4>Custo Total da Operação</h4>
                                    <p className="negative">{formatCurrency(results.totalOperationCost)}</p>
                                    <div className="cdb-breakdown">
                                        <div><span>Juros:</span> <span>{formatCurrency(results.totalInterest)}</span></div>
                                        <div><span>TAC:</span> <span>{formatCurrency(results.parsedTac)}</span></div>
                                        <div><span>IOF:</span> <span>{formatCurrency(results.totalIof)}</span></div>
                                    </div>
                                </div>
                                <div className="summary-item">
                                    <h4>Valor Bruto dos Cheques</h4>
                                    <p>{formatCurrency(results.totalGrossValue)}</p>
                                </div>
                            </div>
                             <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Prazo</th>
                                            <th>Valor Bruto</th>
                                            <th>Juros</th>
                                            <th>IOF</th>
                                            <th>Valor Líquido</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.detailedChecks.map((check, index) => (
                                            <tr key={index}>
                                                <td data-label="Prazo">{check.days} dias</td>
                                                <td data-label="Valor Bruto">{formatCurrency(check.value)}</td>
                                                <td data-label="Juros" className="negative">{formatCurrency(check.interest)}</td>
                                                <td data-label="IOF" className="negative">{formatCurrency(check.iof)}</td>
                                                <td data-label="Valor Líquido" className="positive">{formatCurrency(check.netValue)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="no-print" style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
                               <button className="btn btn-save" onClick={handleSave}>Salvar Simulação</button>
                               <button className="btn btn-secondary" onClick={viewHistory}>Ver Histórico</button>
                               <button className="btn" onClick={handlePrint} style={{backgroundColor: '#007bff'}}>Exportar para PDF</button>
                           </div>
                        </>
                    ) : (
                        <div className="no-results">
                            <div className="icon">📄</div>
                            <p>Preencha os dados da operação para ver o resultado.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const EconomicIndicators = ({ goBack }) => {
    const [loading, setLoading] = useState(true);
    const [indicators, setIndicators] = useState([
        { name: 'CDI', value: '14,90% a.a.' },
        { name: 'SELIC', value: '15,00% a.a.' },
        { name: 'IPCA', value: '3,93% a.a.' },
        { name: 'Dólar', value: 'R$ 5,43' },
    ]);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="indicators-container" style={{ textAlign: 'center' }}>
                <h3>Indicadores Econômicos</h3>
                <p>Buscando dados atualizados...</p>
            </div>
        );
    }
    
    return (
        <div className="indicators-container">
            <h3>Indicadores Econômicos</h3>
            <div className="indicators-grid">
                {indicators.map(indicator => (
                    <div className="indicator-card" key={indicator.name}>
                        <div className="indicator-header">
                            <h4>{indicator.name}</h4>
                            <p>{indicator.value}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="btn btn-secondary no-print" onClick={goBack} style={{marginTop: '30px'}}>Voltar</button>
        </div>
    );
};

const History = ({ goBack, history, viewDetails, deleteSimulation }) => {
    return (
        <div className="history-container">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                 <h3>Histórico de Simulações</h3>
                 <button className="btn btn-secondary no-print" onClick={goBack}>Voltar</button>
            </div>
            {history.length > 0 ? (
                 <div className="history-list">
                    {history.map(item => (
                        <div key={item.id} className="history-item">
                           <div onClick={() => viewDetails(item.id)}>
                             <div className="history-item-header">
                                 <h4>{item.type}</h4>
                                 <span>{formatDate(item.date)}</span>
                             </div>
                             <p>Resultado: {formatCurrency(item.netAmountToReceive || item.netAmount)}</p>
                           </div>
                           <div style={{textAlign: 'right', marginTop: '10px'}} className="no-print">
                               <button className="btn btn-danger btn-small" onClick={(e) => { e.stopPropagation(); deleteSimulation(item.id); }}>Excluir</button>
                           </div>
                        </div>
                    ))}
                 </div>
            ) : (
                <div className="no-results">
                    <div className="icon">🗂️</div>
                    <p>Nenhuma simulação salva ainda.</p>
                </div>
            )}
        </div>
    );
};

const HistoryDetailModal = ({ simulation, onClose, onDelete }) => {
    if (!simulation) return null;

    useEffect(() => {
        document.body.classList.add('modal-open');
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, []);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-header no-print">
                    <h3>Detalhes da Simulação</h3>
                    <button onClick={onClose} className="modal-close-btn">&times;</button>
                </div>
                
                 <div className="print-only">
                    <h3>Relatório de Simulação - {simulation.type}</h3>
                    <p><strong>Data da Simulação:</strong> {formatDate(simulation.date)}</p>
                </div>
                
                {simulation.type === 'Antecipação de Cheques' ? (
                     <>
                        <div className="results-summary">
                            <div className="summary-item">
                                <h4>Valor Líquido a Receber</h4>
                                <p className="positive">{formatCurrency(simulation.netAmountToReceive)}</p>
                            </div>
                            <div className="summary-item">
                                <h4>Custo Total da Operação</h4>
                                <p className="negative">{formatCurrency(simulation.totalOperationCost)}</p>
                                <div className="cdb-breakdown">
                                    <div><span>Juros:</span> <span>{formatCurrency(simulation.totalInterest)}</span></div>
                                    <div><span>TAC:</span> <span>{formatCurrency(simulation.parsedTac)}</span></div>
                                    <div><span>IOF:</span> <span>{formatCurrency(simulation.totalIof)}</span></div>
                                </div>
                            </div>
                            <div className="summary-item">
                                <h4>Valor Bruto dos Cheques</h4>
                                <p>{formatCurrency(simulation.totalGrossValue)}</p>
                            </div>
                        </div>
                         <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Prazo</th>
                                        <th>Valor Bruto</th>
                                        <th>Juros</th>
                                        <th>IOF</th>
                                        <th>Valor Líquido</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {simulation.detailedChecks.map((check, index) => (
                                        <tr key={index}>
                                            <td data-label="Prazo">{check.days} dias</td>
                                            <td data-label="Valor Bruto">{formatCurrency(check.value)}</td>
                                            <td data-label="Juros" className="negative">{formatCurrency(check.interest)}</td>
                                            <td data-label="IOF" className="negative">{formatCurrency(check.iof)}</td>
                                            <td data-label="Valor Líquido" className="positive">{formatCurrency(check.netValue)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                     <div className="results-summary">
                        {/* Details for Financial Investment */}
                    </div>
                )}
                <div className="no-print" style={{display: 'flex', gap: '10px', marginTop: '30px'}}>
                    <button className="btn btn-secondary" onClick={onClose}>Fechar</button>
                    <button className="btn" onClick={handlePrint} style={{backgroundColor: '#007bff'}}>Exportar para PDF</button>
                    <button className="btn btn-danger" onClick={() => onDelete(simulation.id)}>Excluir</button>
                </div>
            </div>
        </div>
    );
};


const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [history, setHistory] = useState(() => {
    try {
        const savedHistory = localStorage.getItem('simulationHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
        console.error("Could not parse history from localStorage", error);
        return [];
    }
  });

  const [selectedSimulationId, setSelectedSimulationId] = useState(null);

  useEffect(() => {
    try {
        localStorage.setItem('simulationHistory', JSON.stringify(history));
    } catch (error) {
        console.error("Could not save history to localStorage", error);
    }
  }, [history]);
  
  const saveSimulation = (simulationData) => {
    // Fix: Explicitly convert Date objects to numbers using getTime() before subtraction to satisfy TypeScript's type checker.
    setHistory(prevHistory => [...prevHistory, simulationData].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  const deleteSimulation = (id) => {
      if(window.confirm('Tem certeza que deseja excluir esta simulação?')) {
        setHistory(prevHistory => prevHistory.filter(item => item.id !== id));
        if (selectedSimulationId === id) {
            setSelectedSimulationId(null); // Close modal if the deleted item was open
        }
      }
  };

  const viewDetails = (id) => {
      setSelectedSimulationId(id);
  };

  const closeDetails = () => {
      setSelectedSimulationId(null);
  }
  
  const selectedSimulation = useMemo(() => {
      return history.find(sim => sim.id === selectedSimulationId) || null;
  }, [history, selectedSimulationId]);


  const renderPage = () => {
    switch (currentPage) {
      case 'investment':
        return <FinancialInvestmentSimulator goBack={() => setCurrentPage('home')} />;
      case 'check':
        return <CheckAnticipationCalculator goBack={() => setCurrentPage('home')} saveSimulation={saveSimulation} viewHistory={() => setCurrentPage('history')} />;
      case 'indicators':
        return <EconomicIndicators goBack={() => setCurrentPage('home')} />;
      case 'history':
        return <History goBack={() => setCurrentPage('home')} history={history} viewDetails={viewDetails} deleteSimulation={deleteSimulation} />;
      default:
        return (
          <>
            <div className="header">
              <h1>Salva Bancário</h1>
              <p>Seu canivete suíço de ferramentas financeiras.</p>
            </div>
            <div className="card-grid">
              <div className="feature-card" onClick={() => setCurrentPage('investment')}>
                <div className="icon">💰</div>
                <h2>Simulador de Aplicação</h2>
                <p>Calcule o rendimento de suas aplicações financeiras.</p>
              </div>
              <div className="feature-card" onClick={() => setCurrentPage('check')}>
                <div className="icon">📄</div>
                <h2>Antecipação de Cheques</h2>
                <p>Simule a antecipação de seus recebíveis.</p>
              </div>
              <div className="feature-card" onClick={() => setCurrentPage('indicators')}>
                <div className="icon">📈</div>
                <h2>Indicadores Econômicos</h2>
                <p>Acompanhe os principais indicadores do mercado.</p>
              </div>
              <div className="feature-card" onClick={() => setCurrentPage('history')}>
                <div className="icon">📚</div>
                <h2>Histórico</h2>
                <p>Veja suas simulações salvas.</p>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="app-container">
      <style>{styles}</style>
      {renderPage()}
      {selectedSimulation && (
        <HistoryDetailModal 
            simulation={selectedSimulation} 
            onClose={closeDetails}
            onDelete={deleteSimulation}
        />
      )}
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);