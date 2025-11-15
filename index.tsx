
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

const styles = `
  :root { /* Light Theme */
    --primary-color: #005A9C;
    --secondary-color: #00BFA5;
    --background-color: #f4f7fc;
    --text-color: #333;
    --text-secondary-color: #666;
    --card-bg: #fff;
    --border-color: #e0e0e0;
    --danger-color: #dc3545;
    --success-color: #28a745;
    --input-bg: #fff;
    --table-header-bg: #f4f7fc;
    --table-row-even-bg: #f9f9f9;
    --focus-shadow-color: rgba(0, 90, 156, 0.2);
    --btn-secondary-bg: #6c757d;
    --btn-secondary-hover-bg: #5a6268;
    --btn-tertiary-bg: #fff;
    --btn-tertiary-hover-bg: #e9eff8;
    --tooltip-bg: #333;
    --tooltip-text: #fff;
    --modal-backdrop-bg: rgba(0,0,0,0.5);
    --box-shadow-light: 0 4px 6px rgba(0,0,0,0.05);
    --box-shadow-medium: 0 10px 15px rgba(0,0,0,0.1);
  }

  body[data-theme="dark"] { /* Dark Theme */
    --primary-color: #4dabf7;
    --secondary-color: #20c997;
    --background-color: #121212;
    --text-color: #e0e0e0;
    --text-secondary-color: #a9a9a9;
    --card-bg: #1e1e1e;
    --border-color: #424242;
    --danger-color: #ef9a9a;
    --success-color: #81c784;
    --input-bg: #2c2c2c;
    --table-header-bg: #2c2c2c;
    --table-row-even-bg: #252525;
    --focus-shadow-color: rgba(77, 171, 247, 0.3);
    --btn-secondary-bg: #5f676d;
    --btn-secondary-hover-bg: #787f85;
    --btn-tertiary-bg: #1e1e1e;
    --btn-tertiary-hover-bg: #3a3a3a;
    --tooltip-bg: #e0e0e0;
    --tooltip-text: #121212;
    --modal-backdrop-bg: rgba(0,0,0,0.7);
    --box-shadow-light: 0 4px 6px rgba(0,0,0,0.2);
    --box-shadow-medium: 0 10px 15px rgba(0,0,0,0.3);
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
    transition: background-color 0.3s, color 0.3s;
  }

  #root {
    width: 100%;
    max-width: 1200px;
  }
  
  .theme-toggle-btn {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    color: var(--text-color);
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 1001;
  }

  .theme-toggle-btn:hover {
    transform: scale(1.1);
    box-shadow: var(--box-shadow-medium);
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
    color: var(--text-secondary-color);
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
    transition: transform 0.2s, box-shadow 0.2s, background-color 0.3s;
    border: 1px solid var(--border-color);
    box-shadow: var(--box-shadow-light);
  }

  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--box-shadow-medium);
  }

  .feature-card h2 {
    color: var(--primary-color);
    margin-top: 15px;
    font-size: 1.1rem;
  }

  .feature-card p {
    font-size: 0.9rem;
    color: var(--text-secondary-color);
    margin-top: 5px;
  }

  .icon {
    font-size: 2.5rem;
    color: var(--secondary-color);
  }

  .calculator-container, .history-container, .comparison-container, .settings-container {
    background-color: var(--card-bg);
    padding: 30px;
    border-radius: 10px;
    box-shadow: var(--box-shadow-medium);
  }
  
  .calculator-layout {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 40px;
  }
  
  .settings-container {
    max-width: 600px;
    margin: 0 auto;
  }

  .form-section h3, .results-section h3, .history-container h3, .print-only h3, .comparison-container h3, .settings-container h3 {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-bottom: 20px;
    border-bottom: 2px solid var(--secondary-color);
    padding-bottom: 10px;
  }
  
  .comparison-container h3 {
    text-align: center;
  }
  
  .comparison-container p {
    text-align: center;
    color: var(--text-secondary-color);
    margin-bottom: 20px;
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
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--text-color);
  }

  .form-group input, .form-group select {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    font-size: 1rem;
    background-color: var(--input-bg);
    color: var(--text-color);
    transition: border-color 0.2s, box-shadow 0.2s, background-color 0.3s;
  }

  .form-group input:focus, .form-group select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px var(--focus-shadow-color);
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
  
  .btn:disabled {
    background-color: var(--btn-secondary-bg);
    cursor: not-allowed;
  }

  .btn-secondary {
    background-color: var(--btn-secondary-bg);
  }

  .btn-secondary:hover {
     background-color: var(--btn-secondary-hover-bg);
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
    color: var(--text-secondary-color);
    margin-bottom: 10px;
    font-weight: 500;
  }

  .summary-item p {
    font-size: 1.5rem;
    color: var(--primary-color);
    font-weight: 600;
  }
  
  .summary-item p.positive { color: var(--success-color); }
  .summary-item p.negative { color: var(--danger-color); }

  .cdb-breakdown {
    font-size: 0.9rem;
    color: var(--text-secondary-color);
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
    font-size: 0.9rem;
  }
  
  th {
    background-color: var(--table-header-bg);
    font-weight: 600;
    position: sticky;
    top: 0;
  }

  tbody tr:nth-child(even) {
    background-color: var(--table-row-even-bg);
  }
  
  .no-results {
    text-align: center;
    padding: 40px;
    color: var(--text-secondary-color);
  }
  
  .no-results .icon {
    font-size: 3rem;
    margin-bottom: 15px;
  }

  .period-filters {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .period-filters button {
    padding: 8px 15px;
    border: 1px solid var(--border-color);
    background-color: var(--btn-tertiary-bg);
    color: var(--text-color);
    font-weight: 500;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  }
  
  .period-filters button:hover:not(.active) {
    background-color: var(--btn-tertiary-hover-bg);
    border-color: var(--primary-color);
  }

  .period-filters button.active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
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
      background-color: var(--btn-tertiary-hover-bg);
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
    color: var(--text-secondary-color);
  }

  .history-item p {
    font-size: 1rem;
    color: var(--text-color);
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
    background-color: var(--input-bg);
    color: var(--text-color);
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .check-list-item input:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px var(--focus-shadow-color);
  }
  
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--modal-backdrop-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: var(--card-bg);
    padding: 30px;
    border-radius: 10px;
    width: 90%;
    max-width: 900px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: var(--box-shadow-medium);
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
    color: var(--text-color);
  }

  .print-only {
    display: none;
  }

  .tooltip-container {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .tooltip-icon {
    width: 16px;
    height: 16px;
    background-color: var(--text-secondary-color);
    color: var(--background-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    cursor: help;
  }

  .tooltip-text {
    visibility: hidden;
    width: 250px;
    background-color: var(--tooltip-bg);
    color: var(--tooltip-text);
    text-align: left;
    border-radius: 6px;
    padding: 10px;
    position: absolute;
    z-index: 1;
    bottom: 135%;
    left: 50%;
    margin-left: -125px; /* Use half of the width to center */
    opacity: 0;
    transition: opacity 0.3s;
    font-size: 0.8rem;
    font-weight: 400;
    line-height: 1.4;
  }

  .tooltip-text::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: var(--tooltip-bg) transparent transparent transparent;
  }

  .tooltip-container:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
  
  /* Comparison Tool Styles */
  .selection-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 50vh;
    overflow-y: auto;
    margin-bottom: 20px;
    padding: 5px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
  }

  .selection-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    border: 1px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s;
  }

  .selection-item:hover {
    background-color: var(--btn-tertiary-hover-bg);
  }

  .selection-item.selected {
    background-color: var(--btn-tertiary-hover-bg);
    border-color: var(--primary-color);
    box-shadow: inset 0 0 0 2px var(--primary-color);
  }

  .selection-item input[type="checkbox"] {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    pointer-events: none; /* Let the div handle the click */
  }

  .selection-item-info {
    display: flex;
    flex-direction: column;
  }

  .selection-item-info strong {
    color: var(--primary-color);
  }
  
  .selection-item-info span {
    font-size: 0.9rem;
    color: var(--text-secondary-color);
  }

  .comparison-controls {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 20px;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

  .comparison-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    text-align: center;
  }

  .comparison-column h4 {
    color: var(--primary-color);
    font-size: 1.2rem;
    margin-bottom: 5px;
    word-break: break-word;
  }

  .comparison-column p {
    font-size: 0.9rem;
    color: var(--text-secondary-color);
    margin-bottom: 20px;
  }

  .comparison-details {
    grid-column: 1 / -1;
    margin-top: 10px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 20px;
  }

  .comparison-row {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 10px;
    align-items: center;
    padding: 12px 0;
    font-size: 1rem;
  }
  .comparison-row:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }

  .comparison-row span:nth-child(1) {
    text-align: right;
    font-weight: 600;
  }
  .comparison-row span:nth-child(3) {
    text-align: left;
    font-weight: 600;
  }

  .comparison-label {
    font-weight: 500;
    color: var(--text-secondary-color);
    white-space: nowrap;
    text-align: center;
  }

  .comparison-section-title {
    color: var(--secondary-color);
    margin: 20px 0 10px 0;
    text-align: center;
    font-size: 1.1rem;
    grid-column: 1 / -1;
    padding-top: 10px;
    border-top: 1px solid var(--border-color);
  }
  .comparison-row.title {
      border-bottom: none;
  }
  
  .investment-results-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
  
  .form-note {
    font-size: 0.8rem;
    color: var(--text-secondary-color);
    padding: 10px;
    background-color: var(--background-color);
    border-radius: 5px;
    border-left: 3px solid var(--secondary-color);
  }
  
  /* End Comparison Tool Styles */

  @media print {
    body {
      background-color: #fff !important;
      color: #000 !important;
      padding: 20px;
      font-family: 'Poppins', sans-serif;
    }

    .header, .card-grid, .form-section, .no-print {
      display: none !important;
    }
    
    .app-container, .calculator-container, .history-container, .modal-content {
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
      color: #000 !important;
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
    
    .results-section, .history-list {
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
    
    .investment-results-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 900px) {
    .calculator-layout {
      grid-template-columns: 1fr;
    }
     .investment-results-grid {
        grid-template-columns: 1fr;
     }
  }
   @media (max-width: 600px) {
    body {
      padding: 10px;
    }
    .theme-toggle-btn {
      top: 10px;
      right: 10px;
    }
    .app-container, .calculator-container, .history-container {
      padding: 15px;
    }
    .header h1 {
      font-size: 2rem;
    }
    .header p {
      font-size: 1rem;
    }
    
    .form-section h3, .results-section h3, .history-container h3, .print-only h3 {
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
        font-size: 1.3rem;
    }
    
    .comparison-grid {
        grid-template-columns: 1fr;
    }
    
    .comparison-details {
        padding: 15px;
    }
    
    .comparison-row {
        grid-template-columns: 1fr;
        gap: 5px;
        text-align: center !important;
    }
     .comparison-row span:nth-child(1), .comparison-row span:nth-child(3) {
        text-align: center;
     }

    .card-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
    .feature-card {
      padding: 15px;
    }
    .feature-card .icon {
      font-size: 2rem;
    }
    .feature-card h2 {
      font-size: 0.9rem;
      margin-top: 10px;
    }
    .feature-card p {
      font-size: 0.8rem;
    }
  }

`;

// --- UTILS ---
const formatCurrency = (value) => {
  if (isNaN(value)) return "R$ 0,00";
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const formatPercentage = (value) => {
  if (isNaN(value)) return "0,00%";
  return `${(value * 100).toFixed(2).replace('.', ',')}%`;
};

const parseCurrency = (value) => {
    if (typeof value !== 'string') return 0;
    return Number(value.replace(/[^0-9,-]+/g,"").replace(",", ".")) || 0;
};

const parsePercentage = (value) => {
  if (typeof value !== 'string') return 0;
  return Number(value.replace(/[^0-9,-]+/g,"").replace(",", ".")) / 100 || 0;
};

const getIncomeTaxRate = (days) => {
  if (days <= 180) return 0.225;
  if (days <= 360) return 0.20;
  if (days <= 720) return 0.175;
  return 0.15;
};

// --- API HOOK ---
const useCDI = () => {
    const [cdiRate, setCdiRate] = useState(0.0833); // Approx. 10.5% p.a. / 12 as fallback
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCDI = async () => {
            try {
                // BCB API URL for last 30 days of CDI
                const url = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.12/dados?formato=json&dataInicial=';
                const today = new Date();
                const pastDate = new Date();
                pastDate.setDate(today.getDate() - 30);
                const formatDate = (date) => `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                
                const response = await fetch(`${url}${formatDate(pastDate)}&dataFinal=${formatDate(today)}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data && data.length > 0) {
                    const latestRate = parseFloat(data[data.length - 1].valor.replace(',', '.'));
                    // The API gives daily rate, let's estimate monthly
                    const dailyFactor = 1 + (latestRate / 100);
                    const monthlyFactor = Math.pow(dailyFactor, 21); // Approx. 21 working days in a month
                    const monthlyRate = (monthlyFactor - 1);
                    setCdiRate(monthlyRate);
                }
            } catch (err) {
                setError(err.message);
                console.error("Failed to fetch CDI rate:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCDI();
    }, []);

    return { cdiRate, loading, error };
};


// --- COMPONENTS ---

// FIX: Made `children` prop optional with a default value of null to fix TypeScript error.
const Tooltip = ({ text, children = null }) => (
  <div className="tooltip-container">
    {children}
    <span className="tooltip-text">{text}</span>
  </div>
);

const NoResults = ({ message = "Nenhum resultado para exibir." }) => (
    <div className="no-results">
        <div className="icon">📊</div>
        <h3>Simulação Limpa</h3>
        <p>{message}</p>
    </div>
);

const FeatureCard = ({ icon, title, description, onClick }) => (
  <div className="feature-card" onClick={onClick}>
    <div className="icon">{icon}</div>
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);

const InvestmentSimulator = ({ onSave, cdiRate }) => {
    const [initialValue, setInitialValue] = useState('10000');
    const [months, setMonths] = useState('12');
    const [lcaProfitability, setLcaProfitability] = useState('98');
    const [cdbProfitability, setCdbProfitability] = useState('110');
    
    const [results, setResults] = useState(null);

    const calculation = useMemo(() => {
        const principal = parseCurrency(initialValue);
        const numMonths = parseInt(months, 10);
        const lcaProf = parseFloat(lcaProfitability) / 100;
        const cdbProf = parseFloat(cdbProfitability) / 100;

        if (!principal || !numMonths || !cdiRate) return null;

        // LCA/LCI Calculation (Tax-Free)
        const monthlyLcaRate = cdiRate * lcaProf;
        const finalValueLCA = principal * Math.pow(1 + monthlyLcaRate, numMonths);
        const profitLCA = finalValueLCA - principal;

        // CDB/RDC Calculation (Taxable)
        const monthlyCdbRate = cdiRate * cdbProf;
        const finalValueCDBGross = principal * Math.pow(1 + monthlyCdbRate, numMonths);
        const profitCDBGross = finalValueCDBGross - principal;
        const taxRate = getIncomeTaxRate(numMonths * 30);
        const taxAmount = profitCDBGross * taxRate;
        const finalValueCDBNet = finalValueCDBGross - taxAmount;
        const profitCDBNet = profitCDBGross - taxAmount;

        const tableData = Array.from({ length: numMonths }, (_, i) => {
            const month = i + 1;
            const balanceLCA = principal * Math.pow(1 + monthlyLcaRate, month);
            const balanceCDB = principal * Math.pow(1 + monthlyCdbRate, month);
            return {
                month,
                balanceLCA,
                profitLCA: balanceLCA - principal,
                balanceCDB,
                profitCDB: balanceCDB - principal,
            };
        });

        return {
            principal,
            numMonths,
            finalValueLCA,
            profitLCA,
            finalValueCDBGross,
            profitCDBGross,
            taxRate,
            taxAmount,
            finalValueCDBNet,
            profitCDBNet,
            tableData,
            lcaProfitability: lcaProf,
            cdbProfitability: cdbProf,
        };
    }, [initialValue, months, lcaProfitability, cdbProfitability, cdiRate]);
    
    const handleCalculate = () => {
        setResults(calculation);
    };

    const handleSave = () => {
        if (results) {
            onSave({
                type: 'investment',
                ...results
            });
        }
    };

    return (
        <div className="calculator-container">
            <div className="calculator-layout">
                <div className="form-section">
                    <h3>Simulador de Investimentos</h3>
                    <div className="form-group">
                        <label htmlFor="initialValue">Valor Inicial (R$)</label>
                        <input type="text" id="initialValue" value={initialValue} onChange={e => setInitialValue(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="months">Prazo (meses)</label>
                        <input type="number" id="months" value={months} onChange={e => setMonths(e.target.value)} />
                    </div>
                     <div className="form-group">
                        <label htmlFor="lcaProfitability">
                            Rentabilidade LCA/LCI (% do CDI)
                             <Tooltip text="Investimentos isentos de Imposto de Renda, ideal para pessoas físicas.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <input type="number" id="lcaProfitability" value={lcaProfitability} onChange={e => setLcaProfitability(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cdbProfitability">
                            Rentabilidade CDB/RDC (% do CDI)
                             <Tooltip text="Investimentos com cobrança de Imposto de Renda regressivo sobre o rendimento.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <input type="number" id="cdbProfitability" value={cdbProfitability} onChange={e => setCdbProfitability(e.target.value)} />
                    </div>
                    <p style={{fontSize: '0.8rem', color: 'var(--text-secondary-color)', textAlign: 'center', marginBottom: '15px'}}>CDI base: {formatPercentage(cdiRate)} a.m.</p>
                    <button className="btn" onClick={handleCalculate}>Calcular</button>
                    {results && <button className="btn btn-save" onClick={handleSave}>Salvar Simulação</button>}
                </div>

                <div className="results-section">
                    <h3>Resultados da Simulação</h3>
                    {results ? (
                        <>
                            <div className="investment-results-grid">
                                <div className="lca-results">
                                    <h4>LCA / LCI</h4>
                                    <div className="summary-item">
                                        <h4>Valor Final Líquido</h4>
                                        <p>{formatCurrency(results.finalValueLCA)}</p>
                                    </div>
                                    <div className="summary-item">
                                        <h4>Total em Juros</h4>
                                        <p className="positive">{formatCurrency(results.profitLCA)}</p>
                                    </div>
                                </div>
                                <div className="cdb-results">
                                     <h4>CDB / RDC</h4>
                                     <div className="summary-item">
                                        <h4>Valor Final Líquido</h4>
                                        <p>{formatCurrency(results.finalValueCDBNet)}</p>
                                        <div className="cdb-breakdown">
                                            <div><span>Valor Bruto:</span> <span>{formatCurrency(results.finalValueCDBGross)}</span></div>
                                            <div><span>Imposto de Renda ({formatPercentage(results.taxRate)}):</span> <span className="ir-value">-{formatCurrency(results.taxAmount)}</span></div>
                                        </div>
                                    </div>
                                     <div className="summary-item">
                                        <h4>Total em Juros Líquido</h4>
                                        <p className="positive">{formatCurrency(results.profitCDBNet)}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <h4 style={{marginTop: '30px', marginBottom: '10px'}}>Evolução Mensal</h4>
                            <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Mês</th>
                                            <th>Saldo (LCA/LCI)</th>
                                            <th>Saldo (CDB/RDC)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.tableData.map(row => (
                                            <tr key={row.month}>
                                                <td>{row.month}</td>
                                                <td>{formatCurrency(row.balanceLCA)}</td>
                                                <td>{formatCurrency(row.balanceCDB)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                       <NoResults message="Preencha os dados e clique em 'Calcular' para ver a mágica acontecer." />
                    )}
                </div>
            </div>
        </div>
    );
};

const LoanSimulator = ({ onSave, isPostFixed, cdiRate }) => {
    const [loanAmount, setLoanAmount] = useState('50000');
    const [months, setMonths] = useState('36');
    const [interestRate, setInterestRate] = useState('2.5');
    const [cdiPercent, setCdiPercent] = useState('150');
    const [fixedSpread, setFixedSpread] = useState('0.5');
    const [system, setSystem] = useState('price');
    const [results, setResults] = useState(null);

    const effectiveInterestRate = useMemo(() => {
        if (!isPostFixed) return parseFloat(interestRate) / 100;
        const cdiPart = cdiRate * (parseFloat(cdiPercent) / 100);
        const fixedPart = parseFloat(fixedSpread) / 100;
        return cdiPart + fixedPart;
    }, [isPostFixed, interestRate, cdiPercent, fixedSpread, cdiRate]);

    const calculation = useMemo(() => {
        const principal = parseCurrency(loanAmount);
        const numMonths = parseInt(months, 10);
        const monthlyRate = effectiveInterestRate;

        if (!principal || !numMonths || !monthlyRate || monthlyRate <= 0) return null;

        let tableData = [];
        let totalPaid = 0;
        let totalInterest = 0;
        let remainingBalance = principal;
        let monthlyPayment;

        if (system === 'price') {
            const factor = Math.pow(1 + monthlyRate, numMonths);
            monthlyPayment = principal * (monthlyRate * factor) / (factor - 1);
            totalPaid = monthlyPayment * numMonths;
            totalInterest = totalPaid - principal;

            for (let i = 1; i <= numMonths; i++) {
                const interestComponent = remainingBalance * monthlyRate;
                const principalComponent = monthlyPayment - interestComponent;
                remainingBalance -= principalComponent;
                tableData.push({
                    month: i,
                    payment: monthlyPayment,
                    principal: principalComponent,
                    interest: interestComponent,
                    balance: Math.abs(remainingBalance),
                });
            }
        } else { // SAC
            const principalComponent = principal / numMonths;
            for (let i = 1; i <= numMonths; i++) {
                const interestComponent = remainingBalance * monthlyRate;
                const payment = principalComponent + interestComponent;
                remainingBalance -= principalComponent;
                totalInterest += interestComponent;
                tableData.push({
                    month: i,
                    payment: payment,
                    principal: principalComponent,
                    interest: interestComponent,
                    balance: Math.abs(remainingBalance),
                });
            }
            totalPaid = principal + totalInterest;
        }

        return {
            principal,
            numMonths,
            monthlyRate,
            system,
            isPostFixed,
            cdiPercent: isPostFixed ? parseFloat(cdiPercent) : null,
            fixedSpread: isPostFixed ? parseFloat(fixedSpread) : null,
            cdiRateSnapshot: isPostFixed ? cdiRate : null,
            firstPayment: tableData[0]?.payment || 0,
            lastPayment: tableData[tableData.length - 1]?.payment || 0,
            totalPaid,
            totalInterest,
            tableData,
        };
    }, [loanAmount, months, system, effectiveInterestRate, isPostFixed, cdiPercent, fixedSpread, cdiRate]);

    const handleCalculate = () => {
        setResults(calculation);
    };

    const handleSave = () => {
        if (results) {
            onSave({
                type: isPostFixed ? 'loanPost' : 'loanPre',
                ...results,
            });
        }
    };
    
    return (
        <div className="calculator-container">
            <div className="calculator-layout">
                <div className="form-section">
                    <h3>Empréstimo {isPostFixed ? "Pós-fixado" : "Prefixado"}</h3>
                     <div className="form-group">
                        <label htmlFor="loanAmount">Valor do Empréstimo (R$)</label>
                        <input type="text" id="loanAmount" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="months">Prazo (meses)</label>
                        <input type="number" id="months" value={months} onChange={e => setMonths(e.target.value)} />
                    </div>
                    {isPostFixed ? (
                        <>
                           <div className="form-group">
                                <label>Taxa de Juros Composta</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input type="number" value={cdiPercent} onChange={e => setCdiPercent(e.target.value)} placeholder="% CDI" />
                                    <span>+</span>
                                    <input type="number" value={fixedSpread} onChange={e => setFixedSpread(e.target.value)} placeholder="% Fixo" />
                                </div>
                                 <p style={{fontSize: '0.8rem', color: 'var(--text-secondary-color)', textAlign: 'center', marginTop: '5px'}}>CDI base: {formatPercentage(cdiRate)} a.m.</p>
                            </div>
                        </>
                    ) : (
                        <div className="form-group">
                            <label htmlFor="interestRate">Taxa de Juros Mensal (%)</label>
                            <input type="number" id="interestRate" value={interestRate} onChange={e => setInterestRate(e.target.value)} />
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="system">Sistema de Amortização</label>
                        <select id="system" value={system} onChange={e => setSystem(e.target.value)}>
                            <option value="price">Price (Parcelas Fixas)</option>
                            <option value="sac">SAC (Parcelas Decrescentes)</option>
                        </select>
                    </div>
                     <button className="btn" onClick={handleCalculate}>Calcular</button>
                    {results && <button className="btn btn-save" onClick={handleSave}>Salvar Simulação</button>}
                </div>
                 <div className="results-section">
                    <h3>Resultados da Simulação</h3>
                    {results ? (
                        <>
                            <div className="results-summary">
                                <div className="summary-item">
                                    <h4>{system === 'price' ? 'Valor da Parcela' : 'Primeira Parcela'}</h4>
                                    <p>{formatCurrency(results.firstPayment)}</p>
                                </div>
                                 {system === 'sac' && (
                                     <div className="summary-item">
                                        <h4>Última Parcela</h4>
                                        <p>{formatCurrency(results.lastPayment)}</p>
                                    </div>
                                 )}
                                <div className="summary-item">
                                    <h4>Total Pago</h4>
                                    <p>{formatCurrency(results.totalPaid)}</p>
                                </div>
                                <div className="summary-item">
                                    <h4>Total de Juros</h4>
                                    <p className="negative">{formatCurrency(results.totalInterest)}</p>
                                </div>
                            </div>
                             <h4 style={{marginTop: '30px', marginBottom: '10px'}}>Tabela de Amortização</h4>
                            <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Mês</th>
                                            <th>Parcela</th>
                                            <th>Amortização</th>
                                            <th>Juros</th>
                                            <th>Saldo Devedor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.tableData.map(row => (
                                            <tr key={row.month}>
                                                <td>{row.month}</td>
                                                <td>{formatCurrency(row.payment)}</td>
                                                <td>{formatCurrency(row.principal)}</td>
                                                <td>{formatCurrency(row.interest)}</td>
                                                <td>{formatCurrency(row.balance)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <NoResults message="Preencha os dados do empréstimo e clique em 'Calcular'." />
                    )}
                </div>
            </div>
        </div>
    );
};

const ScheduledApplicationCalculator = ({ onSave, cdiRate }) => {
    const [initialDeposit, setInitialDeposit] = useState('0');
    const [monthlyDeposit, setMonthlyDeposit] = useState('1000');
    const [months, setMonths] = useState('12');
    const [customMonths, setCustomMonths] = useState('');
    const [isCustomMonths, setIsCustomMonths] = useState(false);
    const [lcaProfitability, setLcaProfitability] = useState('82');
    const [cdbProfitability, setCdbProfitability] = useState('110');
    const [results, setResults] = useState(null);

    const activeMonths = isCustomMonths ? customMonths : months;

    const calculation = useMemo(() => {
        const principal = parseCurrency(initialDeposit);
        const monthlyAmount = parseCurrency(monthlyDeposit);
        const numMonths = parseInt(activeMonths, 10);
        const lcaProf = parseFloat(lcaProfitability) / 100;
        const cdbProf = parseFloat(cdbProfitability) / 100;

        if (isNaN(numMonths) || numMonths <= 0 || !cdiRate) return null;

        const monthlyLcaRate = cdiRate * lcaProf;
        const monthlyCdbRate = cdiRate * cdbProf;

        let tableData = [];
        let currentBalanceLCA = principal;
        let currentBalanceCDB = principal;

        for (let i = 1; i <= numMonths; i++) {
            const interestLCA = currentBalanceLCA * monthlyLcaRate;
            currentBalanceLCA += interestLCA + monthlyAmount;

            const interestCDB = currentBalanceCDB * monthlyCdbRate;
            currentBalanceCDB += interestCDB + monthlyAmount;

            tableData.push({
                month: i,
                interestLCA,
                balanceLCA: currentBalanceLCA,
                interestCDB,
                balanceCDB: currentBalanceCDB,
            });
        }
        
        const totalInvested = principal + (monthlyAmount * numMonths);

        // LCA final values
        const finalValueLCA = currentBalanceLCA;
        const totalProfitLCA = finalValueLCA - totalInvested;

        // CDB final values
        const finalValueCDBGross = currentBalanceCDB;
        const totalProfitCDBGross = finalValueCDBGross - totalInvested;
        const taxRate = getIncomeTaxRate(numMonths * 30);
        const taxAmount = totalProfitCDBGross * taxRate;
        const finalValueCDBNet = finalValueCDBGross - taxAmount;
        const totalProfitCDBNet = totalProfitCDBGross - taxAmount;

        return {
            principal,
            monthlyAmount,
            numMonths,
            totalInvested,
            finalValueLCA,
            totalProfitLCA,
            finalValueCDBGross,
            totalProfitCDBGross,
            taxRate,
            taxAmount,
            finalValueCDBNet,
            totalProfitCDBNet,
            tableData,
            lcaProfitability: lcaProf,
            cdbProfitability: cdbProf,
        };
    }, [initialDeposit, monthlyDeposit, activeMonths, lcaProfitability, cdbProfitability, cdiRate]);

    const handleCalculate = () => setResults(calculation);

    const handleSave = () => {
        if (results) {
            onSave({
                type: 'scheduledApplication',
                ...results
            });
        }
    };

    const handleMonthSelection = (value) => {
        setIsCustomMonths(false);
        setMonths(value);
    };

    const handleCustomClick = () => {
        setIsCustomMonths(true);
        setMonths('');
        setCustomMonths('60');
    };

    return (
        <div className="calculator-container">
            <div className="calculator-layout">
                <div className="form-section">
                    <h3>Aplicação Programada</h3>
                    <div className="form-group">
                        <label>Aporte Inicial (R$)</label>
                        <input type="text" value={initialDeposit} onChange={e => setInitialDeposit(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Aportes Mensais (R$)</label>
                        <input type="text" value={monthlyDeposit} onChange={e => setMonthlyDeposit(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Prazo (Meses)</label>
                        <div className="period-filters">
                            {['6', '12', '24', '36', '48', '60'].map(m => (
                                <button key={m} onClick={() => handleMonthSelection(m)} className={!isCustomMonths && months === m ? 'active' : ''}>{m}</button>
                            ))}
                            <button onClick={handleCustomClick} className={isCustomMonths ? 'active' : ''}>Personal.</button>
                        </div>
                        {isCustomMonths && (
                            <input type="number" value={customMonths} onChange={e => setCustomMonths(e.target.value)} placeholder="Digite os meses" />
                        )}
                    </div>
                    <div className="form-group">
                        <label>Rentabilidade LCA/LCI (% do CDI)</label>
                        <input type="number" value={lcaProfitability} onChange={e => setLcaProfitability(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Rentabilidade CDB/RDC (% do CDI)</label>
                        <input type="number" value={cdbProfitability} onChange={e => setCdbProfitability(e.target.value)} />
                    </div>
                     <p className="form-note">Observação: Aplicações em LCA/LCI podem ter carência (ex: 6 meses). Cada novo aporte pode estar sujeito a uma nova carência.</p>
                     <p style={{fontSize: '0.8rem', color: 'var(--text-secondary-color)', textAlign: 'center', marginBottom: '15px'}}>CDI base: {formatPercentage(cdiRate)} a.m.</p>
                    <button className="btn" onClick={handleCalculate} disabled={!activeMonths || parseInt(activeMonths) <= 0}>Calcular</button>
                    {results && <button className="btn btn-save" onClick={handleSave}>Salvar Simulação</button>}
                </div>
                <div className="results-section">
                    <h3>Resultados da Simulação</h3>
                    {results ? (
                        <>
                           <div className="investment-results-grid">
                                <div>
                                    <h4>LCA / LCI</h4>
                                    <div className="summary-item">
                                        <h4>Valor Final Líquido</h4>
                                        <p>{formatCurrency(results.finalValueLCA)}</p>
                                    </div>
                                    <div className="summary-item">
                                        <h4>Total em Juros</h4>
                                        <p className="positive">{formatCurrency(results.totalProfitLCA)}</p>
                                    </div>
                                    <div className="summary-item">
                                        <h4>Total Investido</h4>
                                        <p>{formatCurrency(results.totalInvested)}</p>
                                    </div>
                                </div>
                                <div>
                                     <h4>CDB / RDC</h4>
                                     <div className="summary-item">
                                        <h4>Valor Final Líquido</h4>
                                        <p>{formatCurrency(results.finalValueCDBNet)}</p>
                                         <div className="cdb-breakdown">
                                            <div><span>Valor Bruto:</span> <span>{formatCurrency(results.finalValueCDBGross)}</span></div>
                                            <div><span>Imposto ({formatPercentage(results.taxRate)}):</span> <span className="ir-value">-{formatCurrency(results.taxAmount)}</span></div>
                                        </div>
                                    </div>
                                     <div className="summary-item">
                                        <h4>Total em Juros Líquido</h4>
                                        <p className="positive">{formatCurrency(results.totalProfitCDBNet)}</p>
                                    </div>
                                     <div className="summary-item">
                                        <h4>Total Investido</h4>
                                        <p>{formatCurrency(results.totalInvested)}</p>
                                    </div>
                                </div>
                           </div>
                            <h4 style={{marginTop: '30px', marginBottom: '10px'}}>Evolução Mensal</h4>
                            <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Mês</th>
                                            <th>Saldo (LCA/LCI)</th>
                                            <th>Saldo (CDB/RDC)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.tableData.map(row => (
                                            <tr key={row.month}>
                                                <td>{row.month}</td>
                                                <td>{formatCurrency(row.balanceLCA)}</td>
                                                <td>{formatCurrency(row.balanceCDB)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <NoResults message="Preencha os dados e clique em 'Calcular' para ver seu patrimônio crescer." />
                    )}
                </div>
            </div>
        </div>
    );
};

const CompetitorRateFinder = ({ onSave }) => {
    const [loanAmount, setLoanAmount] = useState('50000');
    const [monthlyPayment, setMonthlyPayment] = useState('2000');
    const [months, setMonths] = useState('36');
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');

    const findRate = (loanVal, paymentVal, numMonths) => {
        if (loanVal <= 0 || paymentVal <= 0 || numMonths <= 0 || (paymentVal * numMonths <= loanVal)) {
            setError("Valores inválidos. O total pago deve ser maior que o valor do empréstimo.");
            return null;
        }

        let low = 0.0;
        let high = 1.0; // 100% monthly rate, a very high upper bound
        const precision = 1e-7;

        for (let i = 0; i < 100; i++) { // Max 100 iterations
            const mid = (low + high) / 2;
            if (mid < precision) break;
            
            const calculatedPV = paymentVal * (1 - Math.pow(1 + mid, -numMonths)) / mid;

            if (Math.abs(calculatedPV - loanVal) < precision) {
                 high = mid; // Converged
                 break;
            }

            if (calculatedPV > loanVal) {
                high = mid;
            } else {
                low = mid;
            }
        }
        
        const finalRate = (low + high) / 2;
        if (finalRate >= 1.0) {
             setError("Não foi possível calcular a taxa. Verifique os valores de entrada.");
             return null;
        }

        return finalRate;
    };

    const handleCalculate = () => {
        setError('');
        setResults(null);
        const principal = parseCurrency(loanAmount);
        const payment = parseCurrency(monthlyPayment);
        const numMonths = parseInt(months, 10);

        const calculatedRate = findRate(principal, payment, numMonths);
        
        if (calculatedRate !== null) {
            setResults({
                loanAmount: principal,
                monthlyPayment: payment,
                months: numMonths,
                calculatedRate: calculatedRate
            });
        }
    };
    
    const handleSave = () => {
        if (results) {
            onSave({
                type: 'competitorRate',
                ...results
            });
        }
    };
    
    return (
        <div className="calculator-container">
            <div className="calculator-layout">
                <div className="form-section">
                    <h3>Apurar Taxa do Concorrente</h3>
                     <div className="form-group">
                        <label htmlFor="loanAmount">Valor do Empréstimo (R$)</label>
                        <input type="text" id="loanAmount" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} />
                    </div>
                     <div className="form-group">
                        <label htmlFor="monthlyPayment">Valor da Parcela (R$)</label>
                        <input type="text" id="monthlyPayment" value={monthlyPayment} onChange={e => setMonthlyPayment(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="months">Quantidade de Meses</label>
                        <input type="number" id="months" value={months} onChange={e => setMonths(e.target.value)} />
                    </div>
                     {error && <p style={{ color: 'var(--danger-color)', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}
                     <button className="btn" onClick={handleCalculate}>Calcular Taxa</button>
                    {results && <button className="btn btn-save" onClick={handleSave}>Salvar Apuração</button>}
                </div>
                 <div className="results-section">
                    <h3>Resultado da Apuração</h3>
                    {results ? (
                         <div className="results-summary" style={{ gridTemplateColumns: '1fr' }}>
                            <div className="summary-item">
                                <h4>Taxa de Juros Mensal Apurada</h4>
                                <p className="negative">{formatPercentage(results.calculatedRate)}</p>
                            </div>
                         </div>
                    ) : (
                        <NoResults message="Preencha os dados do empréstimo para descobrir a taxa de juros." />
                    )}
                </div>
            </div>
        </div>
    );
};


const HistoryModal = ({ history, onClose, onLoad, onClear }) => {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Histórico de Simulações</h3>
                    <button onClick={onClose} className="modal-close-btn">&times;</button>
                </div>
                 {history.length > 0 ? (
                    <>
                        <div className="history-list">
                        {history.map(item => (
                            <div key={item.id} className="history-item" onClick={() => onLoad(item)}>
                                <div className="history-item-header">
                                    <h4>{
                                        {
                                            'investment': 'Investimento',
                                            'loanPre': 'Empréstimo Prefixado',
                                            'loanPost': 'Empréstimo Pós-fixado',
                                            'scheduledApplication': 'Aplicação Programada',
                                            'competitorRate': 'Apuração de Taxa'
                                        }[item.type] || 'Simulação'
                                    }</h4>
                                    <span>{new Date(item.id).toLocaleString('pt-BR')}</span>
                                </div>
                                <p>
                                    {item.type === 'investment' && `Investimento de ${formatCurrency(item.principal)} por ${item.numMonths} meses.`}
                                    {(item.type === 'loanPre' || item.type === 'loanPost') && `Empréstimo de ${formatCurrency(item.principal)} em ${item.numMonths} meses (${item.system.toUpperCase()}).`}
                                    {item.type === 'scheduledApplication' && `Aportes de ${formatCurrency(item.monthlyAmount)} por ${item.numMonths} meses.`}
                                    {item.type === 'competitorRate' && `Taxa apurada para empréstimo de ${formatCurrency(item.loanAmount)}.`}
                                </p>
                            </div>
                        ))}
                        </div>
                        <button className="btn btn-danger" onClick={onClear}>Limpar Histórico</button>
                    </>
                 ) : (
                    <p>Nenhuma simulação salva ainda.</p>
                 )}
            </div>
        </div>
    );
};

const ComparisonTool = ({ history, onClose }) => {
    const [selectedIds, setSelectedIds] = useState([]);

    const getCompatibleSimulations = () => {
        if (selectedIds.length === 0) return history;
        const firstSelected = history.find(sim => sim.id === selectedIds[0]);
        if (!firstSelected) return history;
    
        const loanTypes = ['loanPre', 'loanPost', 'competitorRate'];
        if (loanTypes.includes(firstSelected.type)) {
            return history.filter(sim => loanTypes.includes(sim.type));
        }
        
        return history.filter(sim => sim.type === firstSelected.type);
    };

    const toggleSelection = (id) => {
        setSelectedIds(prev => {
            const newSelection = new Set(prev);
            if (newSelection.has(id)) {
                newSelection.delete(id);
            } else {
                if (newSelection.size < 2) {
                    newSelection.add(id);
                }
            }
            return Array.from(newSelection);
        });
    };

    const clearSelection = () => setSelectedIds([]);

    const simulationsToCompare = history.filter(sim => selectedIds.includes(sim.id)).sort((a,b) => selectedIds.indexOf(a.id) - selectedIds.indexOf(b.id));

    const renderComparison = () => {
        if (simulationsToCompare.length < 2) return null;

        const [sim1, sim2] = simulationsToCompare;
        const type1 = sim1.type;
        const type2 = sim2.type;

        const loanTypes = ['loanPre', 'loanPost', 'competitorRate'];
        
        if (loanTypes.includes(type1) && loanTypes.includes(type2)) {
            return renderLoanComparison(sim1, sim2);
        }

        if (type1 === 'investment' && type1 === type2) {
            return (
                <div className="comparison-details">
                    <div className="comparison-grid">
                       <div className="comparison-column">
                            <h4>Simulação 1</h4>
                            <p>{formatCurrency(sim1.principal)} por {sim1.numMonths} meses</p>
                       </div>
                       <div className="comparison-column">
                            <h4>Simulação 2</h4>
                            <p>{formatCurrency(sim2.principal)} por {sim2.numMonths} meses</p>
                       </div>
                    </div>
                    
                    <div className="comparison-row title"><h5 className="comparison-section-title">LCA / LCI</h5></div>
                    <ComparisonRow label="Rentabilidade CDI" val1={formatPercentage(sim1.lcaProfitability)} val2={formatPercentage(sim2.lcaProfitability)} winner={sim1.lcaProfitability > sim2.lcaProfitability ? 'sim1' : 'sim2'} />
                    <ComparisonRow label="Juros Totais" val1={formatCurrency(sim1.profitLCA)} val2={formatCurrency(sim2.profitLCA)} winner={sim1.profitLCA > sim2.profitLCA ? 'sim1' : 'sim2'} />
                    <ComparisonRow label="Valor Final Líquido" val1={formatCurrency(sim1.finalValueLCA)} val2={formatCurrency(sim2.finalValueLCA)} winner={sim1.finalValueLCA > sim2.finalValueLCA ? 'sim1' : 'sim2'} isBold />

                    <div className="comparison-row title"><h5 className="comparison-section-title">CDB / RDC</h5></div>
                    <ComparisonRow label="Rentabilidade CDI" val1={formatPercentage(sim1.cdbProfitability)} val2={formatPercentage(sim2.cdbProfitability)} winner={sim1.cdbProfitability > sim2.cdbProfitability ? 'sim1' : 'sim2'} />
                    <ComparisonRow label="Juros Líquidos" val1={formatCurrency(sim1.profitCDBNet)} val2={formatCurrency(sim2.profitCDBNet)} winner={sim1.profitCDBNet > sim2.profitCDBNet ? 'sim1' : 'sim2'}/>
                    <ComparisonRow label="Valor Final Líquido" val1={formatCurrency(sim1.finalValueCDBNet)} val2={formatCurrency(sim2.finalValueCDBNet)} winner={sim1.finalValueCDBNet > sim2.finalValueCDBNet ? 'sim1' : 'sim2'} isBold />
                </div>
            );
        }
        
        if (type1 === 'scheduledApplication' && type1 === type2) {
            return (
                <div className="comparison-details">
                     <div className="comparison-grid">
                       <div className="comparison-column">
                            <h4>Simulação 1</h4>
                            <p>{formatCurrency(sim1.monthlyAmount)}/mês por {sim1.numMonths} meses</p>
                       </div>
                       <div className="comparison-column">
                            <h4>Simulação 2</h4>
                            <p>{formatCurrency(sim2.monthlyAmount)}/mês por {sim2.numMonths} meses</p>
                       </div>
                    </div>
                    <div className="comparison-row title"><h5 className="comparison-section-title">LCA / LCI</h5></div>
                    <ComparisonRow label="Rentabilidade" val1={formatPercentage(sim1.lcaProfitability)} val2={formatPercentage(sim2.lcaProfitability)} winner={sim1.lcaProfitability > sim2.lcaProfitability ? 'sim1' : 'sim2'} />
                    <ComparisonRow label="Juros Totais" val1={formatCurrency(sim1.totalProfitLCA)} val2={formatCurrency(sim2.totalProfitLCA)} winner={sim1.totalProfitLCA > sim2.totalProfitLCA ? 'sim1' : 'sim2'} />
                    <ComparisonRow label="Valor Final" val1={formatCurrency(sim1.finalValueLCA)} val2={formatCurrency(sim2.finalValueLCA)} winner={sim1.finalValueLCA > sim2.finalValueLCA ? 'sim1' : 'sim2'} isBold />

                    <div className="comparison-row title"><h5 className="comparison-section-title">CDB / RDC</h5></div>
                    <ComparisonRow label="Rentabilidade" val1={formatPercentage(sim1.cdbProfitability)} val2={formatPercentage(sim2.cdbProfitability)} winner={sim1.cdbProfitability > sim2.cdbProfitability ? 'sim1' : 'sim2'} />
                    <ComparisonRow label="Juros Líquidos" val1={formatCurrency(sim1.totalProfitCDBNet)} val2={formatCurrency(sim2.totalProfitCDBNet)} winner={sim1.totalProfitCDBNet > sim2.totalProfitCDBNet ? 'sim1' : 'sim2'} />
                    <ComparisonRow label="Valor Final" val1={formatCurrency(sim1.finalValueCDBNet)} val2={formatCurrency(sim2.finalValueCDBNet)} winner={sim1.finalValueCDBNet > sim2.finalValueCDBNet ? 'sim1' : 'sim2'} isBold />
                </div>
            );
        }

        return <p>Tipo de simulação não suportado para comparação.</p>;
    };

    const renderLoanComparison = (sim1, sim2) => {
        const normalize = (sim) => {
            if (sim.type === 'competitorRate') {
                return {
                    name: 'Apuração de Taxa',
                    description: `${formatCurrency(sim.loanAmount)} em ${sim.months}x`,
                    loanAmount: sim.loanAmount,
                    months: sim.months,
                    monthlyPayment: sim.monthlyPayment,
                    totalPaid: sim.monthlyPayment * sim.months,
                    interestRate: sim.calculatedRate,
                    totalInterest: (sim.monthlyPayment * sim.months) - sim.loanAmount
                };
            }
            // For loanPre and loanPost
            return {
                name: sim.type === 'loanPre' ? 'Empréstimo Prefixado' : 'Empréstimo Pós-fixado',
                description: `${formatCurrency(sim.principal)} em ${sim.numMonths}x (${sim.system.toUpperCase()})`,
                loanAmount: sim.principal,
                months: sim.numMonths,
                monthlyPayment: sim.firstPayment, // Note: This is the *first* payment
                totalPaid: sim.totalPaid,
                interestRate: sim.monthlyRate,
                totalInterest: sim.totalInterest
            };
        };
    
        const data1 = normalize(sim1);
        const data2 = normalize(sim2);
        
        return (
            <div className="comparison-details">
                 <div className="comparison-grid">
                   <div className="comparison-column">
                        <h4>{data1.name}</h4>
                        <p>{data1.description}</p>
                   </div>
                   <div className="comparison-column">
                        <h4>{data2.name}</h4>
                        <p>{data2.description}</p>
                   </div>
                </div>
                <ComparisonRow label="Valor do Empréstimo" val1={formatCurrency(data1.loanAmount)} val2={formatCurrency(data2.loanAmount)} />
                <ComparisonRow label="Prazo (meses)" val1={data1.months} val2={data2.months} />
                <ComparisonRow label="Taxa de Juros Mensal" val1={formatPercentage(data1.interestRate)} val2={formatPercentage(data2.interestRate)} winner={data1.interestRate < data2.interestRate ? 'sim1' : 'sim2'} isBold />
                <ComparisonRow label="Parcela (Inicial)" val1={formatCurrency(data1.monthlyPayment)} val2={formatCurrency(data2.monthlyPayment)} winner={data1.monthlyPayment < data2.monthlyPayment ? 'sim1' : 'sim2'} />
                <ComparisonRow label="Total de Juros" val1={formatCurrency(data1.totalInterest)} val2={formatCurrency(data2.totalInterest)} winner={data1.totalInterest < data2.totalInterest ? 'sim1' : 'sim2'} />
                <ComparisonRow label="Total Pago" val1={formatCurrency(data1.totalPaid)} val2={formatCurrency(data2.totalPaid)} winner={data1.totalPaid < data2.totalPaid ? 'sim1' : 'sim2'} />
            </div>
        );
    };
    
    // FIX: Made `winner` prop optional with a default value of null to fix cases where it's not provided.
    const ComparisonRow = ({ label, val1, val2, winner = null, isBold = false }) => (
        <div className="comparison-row">
            <span style={{ fontWeight: isBold ? 700 : 600, color: winner === 'sim1' ? 'var(--success-color)' : 'inherit' }}>{val1}</span>
            <span className="comparison-label">{label}</span>
            <span style={{ fontWeight: isBold ? 700 : 600, color: winner === 'sim2' ? 'var(--success-color)' : 'inherit' }}>{val2}</span>
        </div>
    );

    const compatibleSimulations = getCompatibleSimulations();
    
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Comparador de Simulações</h3>
                    <button onClick={onClose} className="modal-close-btn">&times;</button>
                </div>
                {history.length < 2 ? (
                    <p>Você precisa de pelo menos duas simulações salvas para comparar.</p>
                ) : (
                    <>
                        <p>Selecione duas simulações do mesmo tipo para comparar.</p>
                        <div className="selection-list">
                            {compatibleSimulations.map(sim => (
                                <div
                                    key={sim.id}
                                    className={`selection-item ${selectedIds.includes(sim.id) ? 'selected' : ''}`}
                                    onClick={() => toggleSelection(sim.id)}
                                >
                                    <input type="checkbox" checked={selectedIds.includes(sim.id)} readOnly />
                                    <div className="selection-item-info">
                                        <strong>{
                                            {
                                                'investment': 'Investimento',
                                                'loanPre': 'Empréstimo Prefixado',
                                                'loanPost': 'Empréstimo Pós-fixado',
                                                'scheduledApplication': 'Aplicação Programada',
                                                'competitorRate': 'Apuração de Taxa'
                                            }[sim.type]
                                        }</strong>
                                        <span>{new Date(sim.id).toLocaleString('pt-BR')}</span>
                                    </div>
                                </div>
                            ))}
                             {compatibleSimulations.length === 0 && selectedIds.length > 0 && (
                                 <p style={{textAlign: 'center', padding: '20px', color: 'var(--text-secondary-color)'}}>Nenhuma outra simulação compatível encontrada.</p>
                             )}
                        </div>
                        {renderComparison()}
                        {selectedIds.length > 0 && (
                           <div className="comparison-controls">
                                <button className="btn btn-secondary" onClick={clearSelection}>Limpar Seleção</button>
                           </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};


const MainMenu = ({ setView }) => {
    return (
        <>
            <div className="header">
                <h1>Salva Bancário 2.0</h1>
                <p>Seu canivete suíço de ferramentas financeiras.</p>
            </div>
            <div className="card-grid">
                <FeatureCard icon="💰" title="Simular Investimento" description="Compare a rentabilidade de LCA/LCI e CDB/RDC." onClick={() => setView('investment')} />
                <FeatureCard icon="💸" title="Empréstimo Prefixado" description="Calcule empréstimos com taxas de juros fixas." onClick={() => setView('loanPre')} />
                <FeatureCard icon="📈" title="Empréstimo Pós-fixado" description="Simule empréstimos atrelados ao CDI." onClick={() => setView('loanPost')} />
                <FeatureCard icon="🏦" title="Taxa do Concorrente" description="Descubra a taxa de juros de um empréstimo." onClick={() => setView('competitorRate')} />
                <FeatureCard icon="🗓️" title="Aplicação Programada" description="Simule o acúmulo de patrimônio com aportes mensais." onClick={() => setView('scheduledApplication')} />
                <FeatureCard icon="🗂️" title="Histórico" description="Veja e compare suas simulações salvas." onClick={() => setView('history')} />
                <FeatureCard icon="⚙️" title="Configurações" description="Ajuste as preferências do aplicativo." onClick={() => setView('settings')} />
                 <FeatureCard icon="🔍" title="Comparador" description="Compare lado a lado duas simulações salvas." onClick={() => setView('comparison')} />
            </div>
        </>
    );
};


const App = () => {
    const [currentView, setCurrentView] = useState('main');
    const [history, setHistory] = useState(() => {
        try {
            const saved = localStorage.getItem('simulationHistory');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("Could not parse history from localStorage", error);
            return [];
        }
    });
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const { cdiRate, loading: cdiLoading, error: cdiError } = useCDI();
    
    const [modal, setModal] = useState(null); // 'history' or 'comparison'

    useEffect(() => {
        localStorage.setItem('simulationHistory', JSON.stringify(history));
    }, [history]);
    
    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);
    
     useEffect(() => {
        if (currentView === 'history') {
            setModal('history');
            setCurrentView('main'); // Go back to main menu but keep modal open
        }
        if (currentView === 'comparison') {
            setModal('comparison');
            setCurrentView('main');
        }
    }, [currentView]);


    const handleSaveSimulation = (simulationData) => {
        const newSimulation = {
            id: Date.now(),
            ...simulationData
        };
        setHistory(prev => [newSimulation, ...prev]);
        alert("Simulação salva com sucesso!");
    };
    
    const handleLoadSimulation = (simulation) => {
        // This is a placeholder. A full implementation would need to
        // pass the loaded data back to the specific calculator component.
        // For now, it just closes the modal and logs the data.
        console.log("Loading simulation:", simulation);
        setModal(null);
        // A more complex state management (like Redux or Context) would be better here.
        alert("Funcionalidade de carregar simulação em desenvolvimento.");
    };

    const handleClearHistory = () => {
        if (window.confirm("Tem certeza que deseja apagar todo o histórico?")) {
            setHistory([]);
        }
    };
    
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const renderCurrentView = () => {
        if (cdiLoading) {
            return <div>Carregando taxa CDI...</div>;
        }
         if (cdiError) {
            return <div>Erro ao carregar CDI. Usando taxa padrão.</div>;
        }
        
        switch (currentView) {
            case 'investment':
                return <InvestmentSimulator onSave={handleSaveSimulation} cdiRate={cdiRate} />;
            case 'loanPre':
                return <LoanSimulator onSave={handleSaveSimulation} isPostFixed={false} cdiRate={cdiRate} />;
            case 'loanPost':
                return <LoanSimulator onSave={handleSaveSimulation} isPostFixed={true} cdiRate={cdiRate} />;
            case 'scheduledApplication':
                return <ScheduledApplicationCalculator onSave={handleSaveSimulation} cdiRate={cdiRate} />;
             case 'competitorRate':
                return <CompetitorRateFinder onSave={handleSaveSimulation} />;
            case 'main':
            default:
                return <MainMenu setView={setCurrentView} />;
        }
    };

    return (
        <>
            <style>{styles}</style>
             <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Mudar tema">
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <div className="app-container">
                 {currentView !== 'main' && <button className="btn btn-secondary no-print" onClick={() => setCurrentView('main')} style={{maxWidth: '200px', marginBottom: '20px'}}>Voltar ao Menu</button>}
                {renderCurrentView()}
            </div>
            
            {modal === 'history' && <HistoryModal history={history} onClose={() => setModal(null)} onLoad={handleLoadSimulation} onClear={handleClearHistory} />}
            {modal === 'comparison' && <ComparisonTool history={history} onClose={() => setModal(null)} />}
        </>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);