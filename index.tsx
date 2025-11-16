
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend, ResponsiveContainer } from 'recharts';
import toast, { Toaster } from 'react-hot-toast';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
  
  .form-group-toggle {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
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

  .form-group label, .form-group-toggle label {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--text-color);
  }
  
  .form-group-toggle label {
      margin-bottom: 0;
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

  .cdb-breakdown, .discount-breakdown {
    font-size: 0.9rem;
    color: var(--text-secondary-color);
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid var(--border-color);
    text-align: left;
  }
  .cdb-breakdown div, .discount-breakdown div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  .cdb-breakdown div:last-child, .discount-breakdown div:last-child {
    margin-bottom: 0;
  }
  .cdb-breakdown div span:last-child, .discount-breakdown div span:last-child {
    font-weight: 500;
  }
  .cdb-breakdown .ir-value, .discount-breakdown .discount-value {
    color: var(--danger-color);
  }
  .discount-breakdown .gross-value {
      color: var(--success-color);
  }
  .discount-breakdown .net-value {
      font-weight: 600;
      color: var(--primary-color);
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
  
  td.period-label {
    background-color: var(--table-header-bg);
    font-weight: bold;
    color: var(--primary-color);
    text-align: center;
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

  .receivables-list {
    max-height: 150px;
    overflow-y: auto;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .receivable-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    border-radius: 4px;
  }
  .receivable-item:nth-child(even) {
      background-color: var(--background-color);
  }
  .receivable-item-info {
    display: flex;
    gap: 15px;
    font-size: 0.9rem;
  }
  .receivable-item button {
    background: transparent;
    border: none;
    color: var(--danger-color);
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
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
    
    .table-container {
      overflow-x: visible;
    }
    
    .table-container table {
      display: block;
      width: 100%;
    }
    
    .table-container thead {
      display: none;
    }
    
    .table-container tbody {
      display: block;
      width: 100%;
    }
    
    .table-container tr {
      display: block;
      margin-bottom: 15px;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 15px;
      background: var(--card-bg);
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    
    .table-container td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border: none;
      text-align: right;
      border-bottom: 1px solid var(--border-color);
    }
    
    .table-container td:last-child {
      border-bottom: none;
    }
    
    .table-container td:before {
      content: attr(data-label);
      font-weight: 600;
      text-align: left;
      flex: 1;
      color: var(--text-secondary-color);
    }
    
    .receivables-list {
      max-height: none;
    }
    
    .receivable-item {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
      padding: 15px;
    }
    
    .receivable-item-info {
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;
    }
    
    .receivable-item button {
      width: 100%;
      margin-top: 5px;
    }
  }

  .loading-spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid var(--border-color);
    border-radius: 50%;
    border-top-color: var(--primary-color);
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--modal-backdrop-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    border-radius: 10px;
  }

  .loading-text {
    color: var(--text-color);
    font-size: 1rem;
    margin-left: 10px;
  }

  .chart-wrapper {
    margin-top: 30px;
    padding: 20px;
    background-color: var(--background-color);
    border-radius: 8px;
  }

  .chart-wrapper h4 {
    color: var(--primary-color);
    margin-bottom: 15px;
    font-size: 1.1rem;
  }

  .fade-in {
    animation: fadeIn 0.3s ease-in;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .btn-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .btn-group .btn {
    flex: 1;
    min-width: 150px;
  }

  .tooltip-info {
    cursor: help;
    color: var(--secondary-color);
    margin-left: 5px;
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
    if (typeof value !== 'string' || value === '') return 0;
    return Number(value.replace(/[^0-9,-]+/g,"").replace(",", ".")) || 0;
};

const handleCurrencyChange = (setter) => (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');

    if (value === '') {
        setter('');
        return;
    }

    value = BigInt(value).toString();

    if (value.length <= 2) {
        value = value.padStart(3, '0');
    }

    const integerPart = value.slice(0, -2);
    const decimalPart = value.slice(-2);

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    const finalValue = `R$ ${formattedInteger || '0'},${decimalPart}`;
    setter(finalValue);
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

// --- PDF EXPORT ---
const exportToPDF = (simulationType, data) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    
    doc.setFontSize(18);
    doc.setTextColor(0, 90, 156);
    doc.text('Salva Bancário 2.0', pageWidth / 2, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(simulationType, pageWidth / 2, 30, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(102, 102, 102);
    doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, pageWidth / 2, 38, { align: 'center' });
    
    let yPosition = 50;
    
    if (data.summary) {
        doc.setFontSize(12);
        doc.setTextColor(0, 90, 156);
        doc.text('Resumo:', 14, yPosition);
        yPosition += 8;
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        data.summary.forEach(item => {
            doc.text(`${item.label}: ${item.value}`, 20, yPosition);
            yPosition += 6;
        });
        yPosition += 5;
    }
    
    if (data.table) {
        (doc as any).autoTable({
            startY: yPosition,
            head: [data.table.headers],
            body: data.table.rows,
            theme: 'grid',
            headStyles: { fillColor: [0, 90, 156] },
            styles: { fontSize: 9 },
        });
    }
    
    doc.save(`${simulationType.replace(/ /g, '_')}_${Date.now()}.pdf`);
    toast.success('PDF exportado com sucesso!');
};

// --- API HOOK ---
const useCDI = () => {
    // Fixed monthly CDI rate of 1.28% as requested.
    // Annual CDI: 14.90%, Selic: 15.00% are for reference but not directly used in monthly calculations.
    const cdiRate = 0.0128; // 1.28%
    const loading = false;
    const error = null;

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
    const [initialValue, setInitialValue] = useState('R$ 10.000,00');
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

        // Calculate net return rates in percentage
        const netRateLCA = (profitLCA / principal) * 100;
        const netRateCDB = (profitCDBNet / principal) * 100;

        return {
            principal,
            numMonths,
            finalValueLCA,
            profitLCA,
            netRateLCA,
            finalValueCDBGross,
            profitCDBGross,
            taxRate,
            taxAmount,
            finalValueCDBNet,
            profitCDBNet,
            netRateCDB,
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
                        <input type="text" id="initialValue" value={initialValue} onChange={handleCurrencyChange(setInitialValue)} />
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
                    {results && (
                        <div className="btn-group">
                            <button className="btn btn-save" onClick={handleSave}>💾 Salvar</button>
                            <button className="btn btn-secondary" onClick={() => exportToPDF('Simulação de Investimento', {
                                summary: [
                                    { label: 'Valor Inicial', value: formatCurrency(results.principal) },
                                    { label: 'Prazo', value: `${results.numMonths} meses` },
                                    { label: 'LCA/LCI - Valor Final', value: formatCurrency(results.finalValueLCA) },
                                    { label: 'LCA/LCI - Rendimento', value: formatCurrency(results.profitLCA) },
                                    { label: 'LCA/LCI - Taxa Final Líquida', value: `${results.netRateLCA.toFixed(2)}%` },
                                    { label: 'CDB/RDC - Valor Final Líquido', value: formatCurrency(results.finalValueCDBNet) },
                                    { label: 'CDB/RDC - Rendimento Líquido', value: formatCurrency(results.profitCDBNet) },
                                    { label: 'CDB/RDC - Taxa Final Líquida', value: `${results.netRateCDB.toFixed(2)}%` }
                                ],
                                table: {
                                    headers: ['Mês', 'Saldo LCA/LCI', 'Saldo CDB/RDC'],
                                    rows: results.tableData.map(row => [
                                        row.month,
                                        formatCurrency(row.balanceLCA),
                                        formatCurrency(row.balanceCDB)
                                    ])
                                }
                            })}>📄 Exportar PDF</button>
                        </div>
                    )}
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
                                    <div className="summary-item">
                                        <h4>Taxa Final Líquida</h4>
                                        <p className="positive">{results.netRateLCA.toFixed(2)}%</p>
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
                                    <div className="summary-item">
                                        <h4>Taxa Final Líquida</h4>
                                        <p className="positive">{results.netRateCDB.toFixed(2)}%</p>
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
                                                <td data-label="Mês">{row.month}</td>
                                                <td data-label="Saldo (LCA/LCI)">{formatCurrency(row.balanceLCA)}</td>
                                                <td data-label="Saldo (CDB/RDC)">{formatCurrency(row.balanceCDB)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="chart-wrapper fade-in">
                                <h4>📈 Gráfico de Evolução</h4>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={results.tableData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                        <XAxis 
                                            dataKey="month" 
                                            stroke="var(--text-secondary-color)"
                                            label={{ value: 'Mês', position: 'insideBottom', offset: -5 }}
                                        />
                                        <YAxis 
                                            stroke="var(--text-secondary-color)"
                                            tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                                        />
                                        <ChartTooltip 
                                            formatter={(value) => formatCurrency(value)}
                                            contentStyle={{
                                                backgroundColor: 'var(--card-bg)',
                                                border: '1px solid var(--border-color)',
                                                borderRadius: '5px'
                                            }}
                                        />
                                        <Legend />
                                        <Line 
                                            type="monotone" 
                                            dataKey="balanceLCA" 
                                            stroke="var(--secondary-color)" 
                                            strokeWidth={2}
                                            name="LCA/LCI"
                                            dot={false}
                                        />
                                        <Line 
                                            type="monotone" 
                                            dataKey="balanceCDB" 
                                            stroke="var(--primary-color)" 
                                            strokeWidth={2}
                                            name="CDB/RDC"
                                            dot={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
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
    const [loanAmount, setLoanAmount] = useState('R$ 50.000,00');
    const [months, setMonths] = useState('36');
    const [interestRate, setInterestRate] = useState('2.5');
    const [fixedSpread, setFixedSpread] = useState('0.5');
    const [system, setSystem] = useState('price');
    const [results, setResults] = useState(null);

    const effectiveInterestRate = useMemo(() => {
        if (!isPostFixed) return parseFloat(interestRate) / 100;
        const fixedPart = parseFloat(fixedSpread) / 100;
        return cdiRate + fixedPart;
    }, [isPostFixed, interestRate, fixedSpread, cdiRate]);

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
            const denominator = factor - 1;
            
            if (Math.abs(denominator) < 0.000001) {
                // Handle near-zero rate case analytically (flat amortization)
                monthlyPayment = principal / numMonths;
            } else {
                monthlyPayment = principal * (monthlyRate * factor) / denominator;
            }
            
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
            fixedSpread: isPostFixed ? parseFloat(fixedSpread) : null,
            cdiRateSnapshot: isPostFixed ? cdiRate : null,
            firstPayment: tableData[0]?.payment || 0,
            lastPayment: tableData[tableData.length - 1]?.payment || 0,
            totalPaid,
            totalInterest,
            tableData,
        };
    }, [loanAmount, months, system, effectiveInterestRate, isPostFixed, fixedSpread, cdiRate]);

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
                        <input type="text" id="loanAmount" value={loanAmount} onChange={handleCurrencyChange(setLoanAmount)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="months">Prazo (meses)</label>
                        <input type="number" id="months" value={months} onChange={e => setMonths(e.target.value)} />
                    </div>
                    {isPostFixed ? (
                        <>
                           <div className="form-group">
                                <label htmlFor="fixedSpread">Taxa Fixa Adicional (%)</label>
                                <input 
                                    type="number" 
                                    id="fixedSpread"
                                    value={fixedSpread} 
                                    onChange={e => setFixedSpread(e.target.value)} 
                                    placeholder="0.5" 
                                    step="0.01"
                                />
                                <p style={{fontSize: '0.8rem', color: 'var(--text-secondary-color)', textAlign: 'center', marginTop: '5px'}}>
                                    Taxa efetiva: {formatPercentage(cdiRate)} (CDI) + {fixedSpread}% = {formatPercentage(cdiRate + parseFloat(fixedSpread)/100)} a.m.
                                </p>
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
                    {results && (
                        <div className="btn-group">
                            <button className="btn btn-save" onClick={handleSave}>💾 Salvar</button>
                            <button className="btn btn-secondary" onClick={() => exportToPDF('Simulação de Empréstimo', {
                                summary: [
                                    { label: 'Valor do Empréstimo', value: formatCurrency(results.principal) },
                                    { label: 'Prazo', value: `${results.numMonths} meses` },
                                    { label: 'Sistema', value: results.system === 'price' ? 'PRICE (Parcelas Fixas)' : 'SAC (Parcelas Decrescentes)' },
                                    { label: 'Primeira Parcela', value: formatCurrency(results.firstPayment) },
                                    { label: 'Última Parcela', value: formatCurrency(results.lastPayment) },
                                    { label: 'Total Pago', value: formatCurrency(results.totalPaid) },
                                    { label: 'Total de Juros', value: formatCurrency(results.totalInterest) }
                                ],
                                table: {
                                    headers: ['Mês', 'Parcela', 'Amortização', 'Juros', 'Saldo'],
                                    rows: results.tableData.map(row => [
                                        row.month,
                                        formatCurrency(row.payment),
                                        formatCurrency(row.principal),
                                        formatCurrency(row.interest),
                                        formatCurrency(row.balance)
                                    ])
                                }
                            })}>📄 Exportar PDF</button>
                        </div>
                    )}
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
                                                <td data-label="Mês">{row.month}</td>
                                                <td data-label="Parcela">{formatCurrency(row.payment)}</td>
                                                <td data-label="Amortização">{formatCurrency(row.principal)}</td>
                                                <td data-label="Juros">{formatCurrency(row.interest)}</td>
                                                <td data-label="Saldo Devedor">{formatCurrency(row.balance)}</td>
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
    const [initialDeposit, setInitialDeposit] = useState('R$ 0,00');
    const [monthlyDeposit, setMonthlyDeposit] = useState('R$ 1.000,00');
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
                        <input type="text" value={initialDeposit} onChange={handleCurrencyChange(setInitialDeposit)} />
                    </div>
                    <div className="form-group">
                        <label>Aportes Mensais (R$)</label>
                        <input type="text" value={monthlyDeposit} onChange={handleCurrencyChange(setMonthlyDeposit)} />
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
                    {results && (
                        <div className="btn-group">
                            <button className="btn btn-save" onClick={handleSave}>💾 Salvar</button>
                            <button className="btn btn-secondary" onClick={() => exportToPDF('Aplicação Programada', {
                                summary: [
                                    { label: 'Aporte Inicial', value: formatCurrency(results.initialAmount) },
                                    { label: 'Aportes Mensais', value: formatCurrency(results.monthlyAmount) },
                                    { label: 'Prazo', value: `${results.numMonths} meses` },
                                    { label: 'Total Investido', value: formatCurrency(results.totalInvested) },
                                    { label: 'LCA/LCI - Valor Final', value: formatCurrency(results.finalValueLCA) },
                                    { label: 'LCA/LCI - Rendimento', value: formatCurrency(results.totalProfitLCA) },
                                    { label: 'CDB/RDC - Valor Final Líquido', value: formatCurrency(results.finalValueCDBNet) },
                                    { label: 'CDB/RDC - Rendimento Líquido', value: formatCurrency(results.totalProfitCDBNet) }
                                ],
                                table: {
                                    headers: ['Mês', 'Saldo LCA/LCI', 'Saldo CDB/RDC'],
                                    rows: results.tableData.map(row => [
                                        row.month,
                                        formatCurrency(row.balanceLCA),
                                        formatCurrency(row.balanceCDB)
                                    ])
                                }
                            })}>📄 Exportar PDF</button>
                        </div>
                    )}
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
                                                <td data-label="Mês">{row.month}</td>
                                                <td data-label="Saldo (LCA/LCI)">{formatCurrency(row.balanceLCA)}</td>
                                                <td data-label="Saldo (CDB/RDC)">{formatCurrency(row.balanceCDB)}</td>
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
    const [loanAmount, setLoanAmount] = useState('R$ 50.000,00');
    const [monthlyPayment, setMonthlyPayment] = useState('R$ 2.000,00');
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

        // A fixed number of iterations is sufficient for high precision with the bisection method.
        for (let i = 0; i < 100; i++) {
            const mid = (low + high) / 2;
            
            // Handle near-zero rate analytically using limit formula
            const calculatedPV = Math.abs(mid) < 0.000001 
                ? paymentVal * numMonths 
                : paymentVal * (1 - Math.pow(1 + mid, -numMonths)) / mid;

            // The present value (PV) is a decreasing function of the interest rate (r).
            // If the calculated PV is higher than the loan amount, our rate `mid` is too low.
            // We need to search in the upper half of the rates.
            if (calculatedPV > loanVal) {
                low = mid;
            } else {
                // Otherwise, our rate `mid` is too high, so we search in the lower half.
                high = mid;
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
                        <input type="text" id="loanAmount" value={loanAmount} onChange={handleCurrencyChange(setLoanAmount)} />
                    </div>
                     <div className="form-group">
                        <label htmlFor="monthlyPayment">Valor da Parcela (R$)</label>
                        <input type="text" id="monthlyPayment" value={monthlyPayment} onChange={handleCurrencyChange(setMonthlyPayment)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="months">Quantidade de Meses</label>
                        <input type="number" id="months" value={months} onChange={e => setMonths(e.target.value)} />
                    </div>
                     {error && <p style={{ color: 'var(--danger-color)', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}
                     <button className="btn" onClick={handleCalculate}>Calcular Taxa</button>
                    {results && (
                        <div className="btn-group">
                            <button className="btn btn-save" onClick={handleSave}>💾 Salvar</button>
                            <button className="btn btn-secondary" onClick={() => exportToPDF('Taxa do Concorrente', {
                                summary: [
                                    { label: 'Valor do Empréstimo', value: formatCurrency(results.loanAmount) },
                                    { label: 'Valor da Parcela', value: formatCurrency(results.monthlyPayment) },
                                    { label: 'Quantidade de Meses', value: `${results.months} meses` },
                                    { label: 'Taxa Mensal Calculada', value: formatPercentage(results.calculatedRate) },
                                    { label: 'Taxa Anual Equivalente', value: formatPercentage(Math.pow(1 + results.calculatedRate, 12) - 1) }
                                ]
                            })}>📄 Exportar PDF</button>
                        </div>
                    )}
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


const RuralCreditSimulator = ({ onSave }) => {
    const [loanAmount, setLoanAmount] = useState('R$ 200.000,00');
    const [annualRate, setAnnualRate] = useState('7.5');
    const [totalYears, setTotalYears] = useState('10');
    const [graceYears, setGraceYears] = useState('2');
    const [noGracePeriod, setNoGracePeriod] = useState(false);
    const [graceInterest, setGraceInterest] = useState('accumulate');
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (noGracePeriod) {
            setGraceYears('0');
        }
    }, [noGracePeriod]);

    useEffect(() => {
        const numGrace = parseInt(graceYears, 10);
        const numTotal = parseInt(totalYears, 10);
        if (!isNaN(numGrace) && !isNaN(numTotal) && numGrace >= numTotal) {
            setError('A carência não pode ser maior ou igual ao prazo total.');
        } else {
            setError('');
        }
    }, [graceYears, totalYears]);
    
    const calculation = useMemo(() => {
        const principal = parseCurrency(loanAmount);
        const rate = parseFloat(annualRate) / 100;
        const numTotalYears = parseInt(totalYears, 10);
        const numGraceYears = noGracePeriod ? 0 : parseInt(graceYears, 10);

        if (!principal || isNaN(rate) || isNaN(numTotalYears) || isNaN(numGraceYears) || rate <= 0 || numTotalYears <= 0 || numGraceYears < 0 || numGraceYears >= numTotalYears) {
            return null;
        }

        let tableData = [];
        let principalAfterGrace = principal;
        let currentBalance = principal;
        let totalInterestPaid = 0;

        // Grace Period
        for (let i = 1; i <= numGraceYears; i++) {
            const interestForYear = currentBalance * rate;
            let paymentForYear = 0;
            if (graceInterest === 'pay_annually') {
                paymentForYear = interestForYear;
                totalInterestPaid += interestForYear;
            } else { // accumulate
                currentBalance += interestForYear;
            }
            tableData.push({
                year: i,
                isGrace: true,
                payment: paymentForYear,
                principal: 0,
                interest: interestForYear,
                balance: currentBalance,
            });
        }
        principalAfterGrace = currentBalance;

        // Amortization Period
        const amortizationYears = numTotalYears - numGraceYears;
        let annualPayment = 0;

        if (amortizationYears > 0) {
            const factor = Math.pow(1 + rate, amortizationYears);
            const denominator = factor - 1;
            
            if (Math.abs(denominator) < 0.000001) {
                // Handle near-zero rate case analytically (flat amortization)
                annualPayment = principalAfterGrace / amortizationYears;
            } else {
                annualPayment = principalAfterGrace * (rate * factor) / denominator;
            }

            for (let i = 1; i <= amortizationYears; i++) {
                const year = numGraceYears + i;
                const interestComponent = currentBalance * rate;
                const principalComponent = annualPayment - interestComponent;
                currentBalance -= principalComponent;
                totalInterestPaid += interestComponent;
                tableData.push({
                    year: year,
                    isGrace: false,
                    payment: annualPayment,
                    principal: principalComponent,
                    interest: interestComponent,
                    balance: Math.abs(currentBalance),
                });
            }
        }
        
        const totalPaid = principal + totalInterestPaid;
        
        return {
            principal,
            annualRate: rate,
            totalYears: numTotalYears,
            graceYears: numGraceYears,
            principalAfterGrace,
            annualPayment,
            totalPaid,
            totalInterest: totalInterestPaid,
            tableData
        };
    }, [loanAmount, annualRate, totalYears, graceYears, noGracePeriod, graceInterest]);

    const handleCalculate = () => {
        if (error) return;
        setResults(calculation);
    };

    const handleSave = () => {
        if (results) {
            onSave({
                type: 'ruralCredit',
                ...results
            });
        }
    };
    
    return (
        <div className="calculator-container">
            <div className="calculator-layout">
                <div className="form-section">
                    <h3>Simulador de Crédito Rural</h3>
                    <div className="form-group">
                        <label>Valor do Financiamento (R$)</label>
                        <input type="text" value={loanAmount} onChange={handleCurrencyChange(setLoanAmount)} />
                    </div>
                    <div className="form-group">
                        <label>Taxa de Juros Anual (%)</label>
                        <input type="number" value={annualRate} onChange={e => setAnnualRate(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Prazo Total (anos)</label>
                        <input type="number" value={totalYears} onChange={e => setTotalYears(e.target.value)} />
                    </div>
                    
                    <div className="form-group-toggle">
                        <input type="checkbox" id="noGrace" checked={noGracePeriod} onChange={e => setNoGracePeriod(e.target.checked)} />
                        <label htmlFor="noGrace" style={{marginBottom: 0}}>Sem carência</label>
                    </div>

                    {!noGracePeriod && (
                        <>
                             <div className="form-group">
                                <label>Prazo de Carência (anos)</label>
                                <input type="number" value={graceYears} onChange={e => setGraceYears(e.target.value)} disabled={noGracePeriod} />
                            </div>
                             <div className="form-group">
                                <label>
                                    Amortização dos Juros na Carência
                                     <Tooltip text="Escolha como os juros serão tratados durante a carência. 'Acumular' adiciona os juros ao saldo devedor. 'Pagar anualmente' exige o pagamento dos juros a cada ano.">
                                        <span className="tooltip-icon">?</span>
                                    </Tooltip>
                                </label>
                                <select value={graceInterest} onChange={e => setGraceInterest(e.target.value)} disabled={noGracePeriod}>
                                    <option value="accumulate">Acumular (juros capitalizados)</option>
                                    <option value="pay_annually">Pagar anualmente</option>
                                </select>
                            </div>
                        </>
                    )}
                    {error && <p style={{ color: 'var(--danger-color)', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}
                    <button className="btn" onClick={handleCalculate} disabled={!!error}>Calcular</button>
                    {results && (
                        <div className="btn-group">
                            <button className="btn btn-save" onClick={handleSave}>💾 Salvar</button>
                            <button className="btn btn-secondary" onClick={() => exportToPDF('Crédito Rural', {
                                summary: [
                                    { label: 'Valor do Financiamento', value: formatCurrency(results.principal) },
                                    { label: 'Taxa de Juros Anual', value: formatPercentage(results.annualRate) },
                                    { label: 'Prazo Total', value: `${results.totalYears} anos` },
                                    { label: 'Anos de Carência', value: `${results.graceYears} anos` },
                                    { label: 'Saldo Pós-Carência', value: formatCurrency(results.principalAfterGrace) },
                                    { label: 'Parcela Anual', value: formatCurrency(results.annualPayment) },
                                    { label: 'Total de Juros', value: formatCurrency(results.totalInterest) },
                                    { label: 'Total Pago', value: formatCurrency(results.totalPaid) }
                                ],
                                table: {
                                    headers: ['Ano', 'Tipo', 'Pagamento', 'Amortização', 'Juros', 'Saldo'],
                                    rows: results.tableData.map(row => [
                                        row.year,
                                        row.isGrace ? 'Carência' : 'Amortização',
                                        formatCurrency(row.payment),
                                        formatCurrency(row.principal),
                                        formatCurrency(row.interest),
                                        formatCurrency(row.balance)
                                    ])
                                }
                            })}>📄 Exportar PDF</button>
                        </div>
                    )}
                </div>
                 <div className="results-section">
                    <h3>Resultados da Simulação</h3>
                     {results ? (
                        <>
                            <div className="results-summary">
                                <div className="summary-item">
                                    <h4>Parcela Anual (Pós-Carência)</h4>
                                    <p>{formatCurrency(results.annualPayment)}</p>
                                </div>
                                <div className="summary-item">
                                    <h4>Saldo Devedor Pós-Carência</h4>
                                    <p>{formatCurrency(results.principalAfterGrace)}</p>
                                </div>
                                <div className="summary-item">
                                    <h4>Total de Juros</h4>
                                    <p className="negative">{formatCurrency(results.totalInterest)}</p>
                                </div>
                                <div className="summary-item">
                                    <h4>Total Pago</h4>
                                    <p>{formatCurrency(results.totalPaid)}</p>
                                </div>
                            </div>
                            <h4 style={{marginTop: '30px', marginBottom: '10px'}}>Amortização Anual</h4>
                            <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Ano</th>
                                            <th>Pagamento</th>
                                            <th>Amortização</th>
                                            <th>Juros</th>
                                            <th>Saldo Devedor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.tableData.map(row => (
                                            <tr key={row.year}>
                                                <td data-label="Ano">{row.year}</td>
                                                <td data-label="Pagamento">{formatCurrency(row.payment)}</td>
                                                <td data-label="Amortização">{formatCurrency(row.principal)}</td>
                                                <td data-label="Juros">{formatCurrency(row.interest)}</td>
                                                <td data-label="Saldo Devedor">{formatCurrency(row.balance)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <NoResults message="Preencha os dados do financiamento para ver a simulação." />
                    )}
                </div>
            </div>
        </div>
    );
};

const ReceivablesDiscountSimulator = ({ onSave }) => {
    const [receivables, setReceivables] = useState([]);
    const [currentValue, setCurrentValue] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [interestRate, setInterestRate] = useState('3.0');
    const [tac, setTac] = useState('R$ 150,00');
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');

    const summary = useMemo(() => {
        const total = receivables.reduce((acc, curr) => acc + curr.value, 0);
        return { total: formatCurrency(total), count: receivables.length };
    }, [receivables]);
    
    const handleAddReceivable = () => {
        const value = parseCurrency(currentValue);
        if (value <= 0) {
            toast.error("O valor do recebível deve ser maior que zero.");
            return;
        }
        if (!currentDate) {
            toast.error("Por favor, selecione uma data de vencimento.");
            return;
        }
        const today = new Date();
        today.setHours(0,0,0,0);
        const dueDate = new Date(currentDate + 'T00:00:00');
        if (dueDate <= today) {
            toast.error("A data de vencimento deve ser no futuro.");
            return;
        }
        
        setReceivables(prev => [...prev, { id: Date.now(), value, dateStr: currentDate }]);
        setCurrentValue('');
        setCurrentDate('');
    };

    const handleRemoveReceivable = (id) => {
        setReceivables(prev => prev.filter(r => r.id !== id));
    };

    const calculation = useMemo(() => {
        if (receivables.length === 0) return null;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const parsedTac = parseCurrency(tac);
        const monthlyRate = parseFloat(interestRate.replace(',', '.')) / 100;
        
        if (isNaN(monthlyRate) || monthlyRate <= 0) {
             setError("Taxa de juros inválida.");
             return null;
        } else {
            setError("");
        }

        const dailyRate = Math.pow(1 + monthlyRate, 1 / 30) - 1;

        let totalGrossValue = 0;
        let totalInterest = 0;
        let totalDailyIOF = 0;
        const details = [];

        for (const receivable of receivables) {
            const value = receivable.value;
            const dueDate = new Date(receivable.dateStr + 'T00:00:00');
            const diffTime = dueDate.getTime() - today.getTime();
            const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (days <= 0) continue;

            const interest = value * (Math.pow(1 + dailyRate, days) - 1);
            const dailyIOF = value * 0.000082 * days;

            totalGrossValue += value;
            totalInterest += interest;
            totalDailyIOF += dailyIOF;
            details.push({ ...receivable, days, interest, dailyIOF });
        }

        if (totalGrossValue === 0) return null;

        const additionalIOF = totalGrossValue * 0.0038;
        const totalIOF = totalDailyIOF + additionalIOF;
        const totalDiscounts = totalInterest + totalIOF + parsedTac;
        const netValue = totalGrossValue - totalDiscounts;

        return {
            totalGrossValue,
            receivablesCount: receivables.length,
            totalInterest,
            totalIOF,
            additionalIOF,
            totalDailyIOF,
            tac: parsedTac,
            totalDiscounts,
            netValue,
            details
        };
    }, [receivables, interestRate, tac]);

    const handleCalculate = () => {
        if (!calculation) {
             if (receivables.length === 0) toast.error("Adicione pelo menos um recebível para calcular.");
             return;
        }
        setResults(calculation);
    };

    const handleSave = () => {
        if (results) {
            onSave({
                type: 'receivablesDiscount',
                ...results
            });
        }
    };

    return (
        <div className="calculator-container">
            <div className="calculator-layout">
                <div className="form-section">
                    <h3>Desconto de Recebíveis</h3>
                    <div className="form-group inline">
                        <div>
                            <label>Valor do Título</label>
                            <input type="text" value={currentValue} onChange={handleCurrencyChange(setCurrentValue)} />
                        </div>
                         <div>
                            <label>Vencimento</label>
                            <input type="date" value={currentDate} onChange={e => setCurrentDate(e.target.value)} />
                        </div>
                        <button className="btn" onClick={handleAddReceivable}>Add</button>
                    </div>
                    {receivables.length > 0 && (
                        <>
                            <div className="receivables-list">
                                {receivables.map(r => (
                                    <div key={r.id} className="receivable-item">
                                        <div className="receivable-item-info">
                                            <span>{formatCurrency(r.value)}</span>
                                            <span>{new Date(r.dateStr + 'T00:00:00').toLocaleDateString('pt-BR')}</span>
                                        </div>
                                        <button onClick={() => handleRemoveReceivable(r.id)}>&times;</button>
                                    </div>
                                ))}
                            </div>
                            <p style={{textAlign: 'center', fontSize: '0.9rem', marginBottom: '20px'}}>
                                <strong>{summary.count}</strong> títulos adicionados, totalizando <strong>{summary.total}</strong>
                            </p>
                        </>
                    )}
                     <div className="form-group">
                        <label>Taxa de Juros Mensal (%)</label>
                        <input type="text" value={interestRate} onChange={e => setInterestRate(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>
                            TAC (Taxa de Abertura de Crédito)
                             <Tooltip text="Custo fixo da operação, cobrado pela instituição financeira.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <input type="text" value={tac} onChange={handleCurrencyChange(setTac)} />
                    </div>
                    {error && <p style={{ color: 'var(--danger-color)', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}
                    <button className="btn" onClick={handleCalculate} disabled={receivables.length === 0}>Calcular</button>
                    {results && (
                        <div className="btn-group">
                            <button className="btn btn-save" onClick={handleSave}>💾 Salvar</button>
                            <button className="btn btn-secondary" onClick={() => exportToPDF('Desconto de Recebíveis', {
                                summary: [
                                    { label: 'Valor Líquido a Receber', value: formatCurrency(results.netValue) },
                                    { label: 'Valor Bruto dos Títulos', value: formatCurrency(results.totalGrossValue) },
                                    { label: 'Custo Total da Operação', value: formatCurrency(results.totalDiscounts) },
                                    { label: 'Taxa de Juros', value: formatPercentage(results.monthlyRate) },
                                    { label: 'TAC', value: formatCurrency(results.tac) }
                                ],
                                table: {
                                    headers: ['Título', 'Valor Bruto', 'Dias', 'Juros', 'IOF', 'Valor Líquido'],
                                    rows: results.receivablesDetails.map((r, idx) => [
                                        `Título ${idx + 1}`,
                                        formatCurrency(r.grossValue),
                                        r.days,
                                        formatCurrency(r.interest),
                                        formatCurrency(r.iof),
                                        formatCurrency(r.netValue)
                                    ])
                                }
                            })}>📄 Exportar PDF</button>
                        </div>
                    )}
                </div>
                 <div className="results-section">
                    <h3>Resultados da Simulação</h3>
                     {results ? (
                        <>
                            <div className="results-summary">
                                <div className="summary-item">
                                    <h4>Valor Líquido a Receber</h4>
                                    <p className="positive">{formatCurrency(results.netValue)}</p>
                                </div>
                                <div className="summary-item">
                                    <h4>Valor Bruto dos Títulos</h4>
                                    <p>{formatCurrency(results.totalGrossValue)}</p>
                                </div>
                                <div className="summary-item">
                                    <h4>Custo Total da Operação</h4>
                                    <p className="negative">{formatCurrency(results.totalDiscounts)}</p>
                                </div>
                            </div>
                             <div className="summary-item">
                                <h4>Descontos Detalhados</h4>
                                <div className="discount-breakdown">
                                    <div><span>(+) Valor Bruto:</span> <span className="gross-value">{formatCurrency(results.totalGrossValue)}</span></div>
                                    <div><span>(-) Juros:</span> <span className="discount-value">-{formatCurrency(results.totalInterest)}</span></div>
                                    <div><span>(-) IOF Total:</span> <span className="discount-value">-{formatCurrency(results.totalIOF)}</span></div>
                                    <div><span>(-) TAC:</span> <span className="discount-value">-{formatCurrency(results.tac)}</span></div>
                                    <hr style={{border: 'none', borderTop: '1px solid var(--border-color)', margin: '5px 0'}} />
                                    <div><span>(=) Valor Líquido:</span> <span className="net-value">{formatCurrency(results.netValue)}</span></div>
                                </div>
                            </div>

                            <h4 style={{marginTop: '30px', marginBottom: '10px'}}>Detalhamento por Título</h4>
                             <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th style={{textAlign: 'left'}}>Valor</th>
                                            <th>Vencimento</th>
                                            <th>Dias</th>
                                            <th>Juros</th>
                                            <th>IOF</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.details.map(row => (
                                            <tr key={row.id}>
                                                <td style={{textAlign: 'left'}}>{formatCurrency(row.value)}</td>
                                                <td>{new Date(row.dateStr + 'T00:00:00').toLocaleDateString('pt-BR')}</td>
                                                <td>{row.days}</td>
                                                <td>{formatCurrency(row.interest)}</td>
                                                <td>{formatCurrency(row.dailyIOF)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <NoResults message="Adicione os recebíveis e os custos da operação para simular." />
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
                                            'competitorRate': 'Apuração de Taxa',
                                            'ruralCredit': 'Crédito Rural',
                                            'receivablesDiscount': 'Desconto de Recebíveis',
                                        }[item.type] || 'Simulação'
                                    }</h4>
                                    <span>{new Date(item.id).toLocaleString('pt-BR')}</span>
                                </div>
                                <p>
                                    {item.type === 'investment' && `Investimento de ${formatCurrency(item.principal)} por ${item.numMonths} meses.`}
                                    {(item.type === 'loanPre' || item.type === 'loanPost') && `Empréstimo de ${formatCurrency(item.principal)} em ${item.numMonths} meses (${item.system.toUpperCase()}).`}
                                    {item.type === 'scheduledApplication' && `Aportes de ${formatCurrency(item.monthlyAmount)} por ${item.numMonths} meses.`}
                                    {item.type === 'competitorRate' && `Taxa apurada para empréstimo de ${formatCurrency(item.loanAmount)}.`}
                                    {item.type === 'ruralCredit' && `Financiamento de ${formatCurrency(item.principal)} por ${item.totalYears} anos.`}
                                    {item.type === 'receivablesDiscount' && `Antecipação de ${item.receivablesCount} títulos no valor de ${formatCurrency(item.totalGrossValue)}.`}
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
        
        // Prevent comparison of rural credit with other types for now
        if (firstSelected.type === 'ruralCredit') {
            return history.filter(sim => sim.type === 'ruralCredit');
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
                                                'competitorRate': 'Apuração de Taxa',
                                                'ruralCredit': 'Crédito Rural',
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
                <FeatureCard icon="🧾" title="Desconto de Recebíveis" description="Simule a antecipação de boletos e cheques." onClick={() => setView('receivablesDiscount')} />
                <FeatureCard icon="🚜" title="Crédito Rural" description="Simule financiamentos com carência e pagamentos anuais." onClick={() => setView('ruralCredit')} />
                <FeatureCard icon="🏦" title="Taxa do Concorrente" description="Descubra a taxa de juros de um empréstimo." onClick={() => setView('competitorRate')} />
                <FeatureCard icon="🗓️" title="Aplicação Programada" description="Simule o acúmulo de patrimônio com aportes mensais." onClick={() => setView('scheduledApplication')} />
                <FeatureCard icon="🗂️" title="Histórico" description="Veja e compare suas simulações salvas." onClick={() => setView('history')} />
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
        toast.success("Simulação salva com sucesso!");
    };
    
    const handleLoadSimulation = (simulation) => {
        // This is a placeholder. A full implementation would need to
        // pass the loaded data back to the specific calculator component.
        // For now, it just closes the modal and logs the data.
        console.log("Loading simulation:", simulation);
        setModal(null);
        // A more complex state management (like Redux or Context) would be better here.
        toast("Funcionalidade de carregar simulação em desenvolvimento.", { icon: 'ℹ️' });
    };

    const handleClearHistory = () => {
        toast((t) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                    <strong>Confirmar exclusão</strong>
                    <p style={{ margin: '5px 0' }}>Tem certeza que deseja apagar todo o histórico?</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        style={{
                            padding: '6px 12px',
                            background: 'var(--border-color)',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => {
                            setHistory([]);
                            toast.dismiss(t.id);
                            toast.success('Histórico limpo com sucesso!');
                        }}
                        style={{
                            padding: '6px 12px',
                            background: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        ), {
            duration: 8000,
            icon: '⚠️'
        });
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
             case 'ruralCredit':
                return <RuralCreditSimulator onSave={handleSaveSimulation} />;
            case 'receivablesDiscount':
                return <ReceivablesDiscountSimulator onSave={handleSaveSimulation} />;
            case 'main':
            default:
                return <MainMenu setView={setCurrentView} />;
        }
    };

    return (
        <>
            <style>{styles}</style>
            <Toaster 
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: 'var(--card-bg)',
                        color: 'var(--text-color)',
                        border: '1px solid var(--border-color)',
                    },
                    success: {
                        iconTheme: {
                            primary: 'var(--success-color)',
                            secondary: 'white',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: 'var(--danger-color)',
                            secondary: 'white',
                        },
                    },
                }}
            />
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
