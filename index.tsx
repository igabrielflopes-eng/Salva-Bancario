
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend, ResponsiveContainer } from 'recharts';
import toast, { Toaster } from 'react-hot-toast';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

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

  /* Keyboard Shortcuts Hint */
  .keyboard-hint {
    font-size: 0.75rem;
    color: var(--text-secondary-color);
    opacity: 0.7;
    margin-top: 5px;
    text-align: center;
  }

  /* Offline Badge */
  .offline-badge {
    position: fixed;
    bottom: 20px;
    left: 20px;
    background-color: var(--danger-color);
    color: white;
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    z-index: 1001;
    box-shadow: var(--box-shadow-medium);
    animation: slideInLeft 0.3s ease-out;
  }

  .offline-badge.online {
    background-color: var(--success-color);
  }

  @keyframes slideInLeft {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  /* Onboarding/Tutorial Styles */
  .tutorial-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tutorial-spotlight {
    position: fixed;
    border: 3px solid var(--secondary-color);
    border-radius: 8px;
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.8);
    pointer-events: none;
    z-index: 2001;
    transition: all 0.3s ease;
  }

  .tutorial-tooltip {
    position: fixed;
    background-color: var(--card-bg);
    color: var(--text-color);
    padding: 20px;
    border-radius: 10px;
    max-width: 400px;
    z-index: 2002;
    box-shadow: var(--box-shadow-medium);
    border: 2px solid var(--secondary-color);
  }

  .tutorial-tooltip h3 {
    color: var(--secondary-color);
    margin-bottom: 10px;
  }

  .tutorial-tooltip p {
    margin-bottom: 15px;
    line-height: 1.5;
  }

  .tutorial-controls {
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }

  .tutorial-progress {
    font-size: 0.85rem;
    color: var(--text-secondary-color);
    margin-bottom: 10px;
  }

  .help-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--secondary-color);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: var(--box-shadow-medium);
    transition: all 0.2s ease;
    z-index: 1001;
  }

  .help-button:hover {
    transform: scale(1.1);
    background-color: #00a791;
  }

  /* Share Button Styles */
  .share-buttons {
    display: flex;
    gap: 10px;
    margin-top: 15px;
    flex-wrap: wrap;
  }

  .share-buttons .btn {
    flex: 1;
    min-width: 150px;
  }

  /* Save Button Animation */
  .btn-save.saving {
    background-color: var(--success-color);
    animation: pulse 0.5s ease-in-out;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  /* View Transition Animation */
  .view-transition {
    animation: fadeInSlide 0.3s ease-out;
  }

  @keyframes fadeInSlide {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Multi-select Comparison Styles */
  .comparison-grid.multi {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  @media (max-width: 768px) {
    .comparison-grid.multi {
      grid-template-columns: 1fr;
    }
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

const formatCDI = (monthlyRate, annualRate) => {
    const monthly = formatPercentage(monthlyRate);
    const annual = formatPercentage(annualRate);
    return `${monthly} a.m. (${annual} a.a.)`;
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

const calculateIOF = (principal, months, iofAdicionalRate = 0.0038, iofDiarioRate = 0.000082) => {
  const dias = months * 30;
  const iofAdicional = principal * iofAdicionalRate;
  const iofDiarioCalculado = principal * iofDiarioRate * dias;
  const iofDiario = Math.min(iofDiarioCalculado, principal * 0.03);
  const iofTotal = iofAdicional + iofDiario;
  
  return {
    iofAdicional,
    iofDiario,
    iofTotal,
    dias,
    iofAdicionalRate,
    iofDiarioRate
  };
};

// --- PDF EXPORT ---
const exportToPDF = async (simulationType, data) => {
    console.log('[PDF Export Global] Iniciando exportação de:', simulationType);
    
    try {
        console.log('[PDF Export Global] Criando documento jsPDF...');
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        
        const settings = JSON.parse(localStorage.getItem('appSettings') || '{}');
        const companyName = settings.companyName || '';
        const logoUrl = settings.logoUrl || '';
        
        // Adicionar logo se fornecida
        if (logoUrl) {
            try {
                console.log('[PDF Export Global] Carregando logo...');
                const img = new Image();
                img.crossOrigin = 'Anonymous';
                await new Promise((resolve, reject) => {
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                    img.src = logoUrl;
                });
                
                // Detectar formato da imagem (PNG, JPG, JPEG)
                let imageFormat = 'PNG';
                
                // Se for data URL, extrair MIME type
                const dataUrlMatch = logoUrl.match(/^data:(image\/(\w+));/);
                if (dataUrlMatch) {
                    const mimeType = dataUrlMatch[2].toLowerCase();
                    if (mimeType === 'jpeg' || mimeType === 'jpg') {
                        imageFormat = 'JPEG';
                    } else if (mimeType === 'png') {
                        imageFormat = 'PNG';
                    }
                } else {
                    // Se for URL externa, detectar pela extensão
                    const ext = logoUrl.toLowerCase().split('.').pop()?.split('?')[0];
                    if (ext === 'jpg' || ext === 'jpeg') {
                        imageFormat = 'JPEG';
                    } else if (ext === 'png') {
                        imageFormat = 'PNG';
                    }
                }
                
                // Adicionar logo no canto superior direito (20x20)
                const logoSize = 20;
                doc.addImage(img, imageFormat, pageWidth - logoSize - 10, 10, logoSize, logoSize);
                console.log('[PDF Export Global] Logo adicionada com sucesso! Formato:', imageFormat);
            } catch (error) {
                console.warn('[PDF Export Global] Erro ao carregar logo:', error);
                toast.error('Não foi possível carregar a logo. Verifique a URL nas configurações.');
            }
        }
        
        console.log('[PDF Export Global] Adicionando cabeçalho...');
        doc.setFontSize(18);
        doc.setTextColor(0, 90, 156);
        doc.text('Salva Bancário', pageWidth / 2, 20, { align: 'center' });
        
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text(simulationType, pageWidth / 2, 30, { align: 'center' });
        
        doc.setFontSize(10);
        doc.setTextColor(102, 102, 102);
        doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, pageWidth / 2, 38, { align: 'center' });
        
        let yPosition = 50;
        
        if (data && data.summary && data.summary.length > 0) {
            console.log('[PDF Export Global] Adicionando resumo...');
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
        
        if (data && data.table && data.table.headers && data.table.rows) {
            console.log('[PDF Export Global] Adicionando tabela...');
            autoTable(doc, {
                startY: yPosition,
                head: [data.table.headers],
                body: data.table.rows,
                theme: 'grid',
                headStyles: { fillColor: [0, 90, 156] },
                styles: { fontSize: 9 },
            });
        }
        
        if (companyName) {
            console.log('[PDF Export Global] Adicionando marca d\'água (empresa)...');
            doc.setFontSize(10);
            doc.setTextColor(102, 102, 102);
            doc.text(companyName, pageWidth / 2, pageHeight - 10, { align: 'center' });
        }
        
        console.log('[PDF Export Global] Salvando arquivo...');
        
        // Solução para iframe/Replit: usar blob + window.open
        const blob = doc.output('blob');
        const url = URL.createObjectURL(blob);
        const newWindow = window.open(url, '_blank');
        
        // Fallback se popup blocker ativar
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            console.log('[PDF Export Global] Popup bloqueado, usando link de download...');
            const link = document.createElement('a');
            link.href = url;
            link.download = `${simulationType.replace(/ /g, '_')}_${Date.now()}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        
        // Liberar memória após um pequeno delay (tanto para sucesso quanto fallback)
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        
        console.log('[PDF Export Global] PDF exportado com sucesso!');
        toast.success('PDF aberto em nova aba! Use Ctrl+S ou o botão de download do navegador.');
    } catch (error) {
        console.error('[PDF Export Global] Erro ao exportar PDF:', error);
        toast.error('Erro ao exportar PDF: ' + error.message);
    }
};

// --- CSV EXPORT ---
const exportToCSV = (data, filename = 'export.csv') => {
    try {
        const { headers, rows } = data;
        
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => {
                const cellStr = String(cell || '');
                if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
                    return `"${cellStr.replace(/"/g, '""')}"`;
                }
                return cellStr;
            }).join(','))
        ].join('\n');
        
        const BOM = '\uFEFF';
        const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
        toast.success('CSV exportado com sucesso!');
    } catch (error) {
        console.error('Erro ao exportar CSV:', error);
        toast.error('Erro ao exportar CSV: ' + error.message);
    }
};

// --- SHARE FUNCTIONALITY ---
const shareSimulation = (simulationData, simulationType) => {
    try {
        const encodedData = btoa(JSON.stringify(simulationData));
        const baseUrl = window.location.origin + window.location.pathname;
        const shareUrl = `${baseUrl}?simulation=${encodedData}`;
        
        return {
            url: shareUrl,
            whatsappUrl: `https://wa.me/?text=${encodeURIComponent(`Confira minha simulação ${simulationType}: ${shareUrl}`)}`
        };
    } catch (error) {
        console.error('Erro ao gerar link de compartilhamento:', error);
        toast.error('Erro ao compartilhar: ' + error.message);
        return null;
    }
};

const copyToClipboard = async (text) => {
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            toast.success('Link copiado para a área de transferência!');
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                toast.success('Link copiado para a área de transferência!');
            } catch (err) {
                toast.error('Não foi possível copiar o link');
            }
            
            document.body.removeChild(textArea);
        }
    } catch (error) {
        console.error('Erro ao copiar:', error);
        toast.error('Erro ao copiar link');
    }
};

// --- SETTINGS & HOOKS ---

// Utility functions for rate conversions
const monthlyToAnnual = (monthlyRate) => {
    return Math.pow(1 + monthlyRate, 12) - 1;
};

const annualToMonthly = (annualRate) => {
    return Math.pow(1 + annualRate, 1/12) - 1;
};

const getCDIForYear = (settings, year) => {
    const currentYear = new Date().getFullYear();
    
    if (year <= currentYear) {
        return settings.cdiAnnual;
    } else if (year === 2026) {
        return settings.cdi2026 || DEFAULT_SETTINGS.cdi2026;
    } else if (year === 2027) {
        return settings.cdi2027 || DEFAULT_SETTINGS.cdi2027;
    } else if (year >= 2028) {
        return settings.cdi2028 || DEFAULT_SETTINGS.cdi2028;
    }
    
    return settings.cdiAnnual;
};

const DEFAULT_SETTINGS = {
    cdiAnnual: 0.1490, // 14.90%
    cdi2026: 0.1225, // 12.25% - Projeção Boletim Focus
    cdi2027: 0.1050, // 10.50% - Projeção Boletim Focus
    cdi2028: 0.1000, // 10.00% - Projeção Boletim Focus
    selicAnnual: 0.1500, // 15.00%
    ipca: 0.0482, // 4.82% a.a.
    usdBrl: 5.85, // R$ 5,85
    loanRate: 0.025, // 2.5% a.m.
    iofRate: 0.0038, // 0.38% IOF Adicional
    iofDiarioRate: 0.000082, // 0.0082% IOF Diário
    tacLoan: 0, // R$ 0,00
    lcaPercentCDI: 0.95, // 95% do CDI
    cdbPercentCDI: 1.10, // 110% do CDI
    tdRate: 0.020, // 2.0% a.m.
    tacTD: 150, // R$ 150,00
    companyName: '', // Nome da Empresa para PDFs
    logoUrl: '', // URL da Logo para PDFs
    indicatorsLastUpdated: new Date().toISOString(), // Última atualização dos indicadores
    lastUpdated: new Date().toISOString()
};

const useSettings = () => {
    const [settings, setSettingsState] = useState(() => {
        const saved = localStorage.getItem('appSettings');
        return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    });

    const updateSettings = (newSettings) => {
        const updated = {
            ...newSettings,
            lastUpdated: new Date().toISOString()
        };
        setSettingsState(updated);
        localStorage.setItem('appSettings', JSON.stringify(updated));
        toast.success('Configurações salvas com sucesso!');
    };

    const resetToDefaults = () => {
        const defaults = {
            ...DEFAULT_SETTINGS,
            lastUpdated: new Date().toISOString()
        };
        setSettingsState(defaults);
        localStorage.setItem('appSettings', JSON.stringify(defaults));
        toast.success('Configurações restauradas para os valores padrão!');
    };

    // Calculate derived values
    const cdiMonthly = annualToMonthly(settings.cdiAnnual);
    const selicMonthly = annualToMonthly(settings.selicAnnual);

    return {
        settings,
        updateSettings,
        resetToDefaults,
        cdiMonthly,
        selicMonthly,
        cdiAnnual: settings.cdiAnnual,
        selicAnnual: settings.selicAnnual
    };
};

const useCDI = () => {
    const { cdiMonthly, cdiAnnual } = useSettings();
    const loading = false;
    const error = null;

    return { 
        cdiRate: cdiMonthly,
        cdiMonthly,
        cdiAnnual,
        loading, 
        error 
    };
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
    const { settings } = useSettings();
    const { cdiMonthly, cdiAnnual } = useCDI();
    
    const [initialValue, setInitialValue] = useState('R$ 10.000,00');
    const [months, setMonths] = useState('12');
    const [selectedPeriod, setSelectedPeriod] = useState('12m');
    const [lcaProfitability, setLcaProfitability] = useState((settings.lcaPercentCDI * 100).toFixed(0));
    const [cdbProfitability, setCdbProfitability] = useState((settings.cdbPercentCDI * 100).toFixed(0));
    const [useSelicProjection, setUseSelicProjection] = useState(false);
    
    const [results, setResults] = useState(null);

    const calculation = useMemo(() => {
        const principal = parseCurrency(initialValue);
        const numMonths = parseInt(months, 10);
        const lcaProf = parseFloat(lcaProfitability) / 100;
        const cdbProf = parseFloat(cdbProfitability) / 100;

        if (!principal || !numMonths || !cdiRate) return null;

        const today = new Date();
        const startYear = today.getFullYear();
        const startMonth = today.getMonth();

        let balanceLCA = principal;
        let balanceCDB = principal;
        const tableData = [];
        const cdiByYear = {};

        for (let i = 0; i < numMonths; i++) {
            const futureMonth = startMonth + i;
            const futureYear = startYear + Math.floor(futureMonth / 12);
            
            let baseRateAnnual;
            if (useSelicProjection) {
                baseRateAnnual = settings.selicAnnual || DEFAULT_SETTINGS.selicAnnual;
            } else {
                baseRateAnnual = getCDIForYear(settings, futureYear);
            }
            
            const monthlyBaseRate = annualToMonthly(baseRateAnnual);

            if (!cdiByYear[futureYear]) {
                cdiByYear[futureYear] = baseRateAnnual;
            }

            const monthlyLcaRate = monthlyBaseRate * lcaProf;
            const monthlyCdbRate = monthlyBaseRate * cdbProf;

            balanceLCA *= (1 + monthlyLcaRate);
            balanceCDB *= (1 + monthlyCdbRate);

            tableData.push({
                month: i + 1,
                balanceLCA,
                profitLCA: balanceLCA - principal,
                balanceCDB,
                profitCDB: balanceCDB - principal,
                cdiRate: baseRateAnnual,
                year: futureYear,
            });
        }

        const finalValueLCA = balanceLCA;
        const profitLCA = finalValueLCA - principal;

        const finalValueCDBGross = balanceCDB;
        const profitCDBGross = finalValueCDBGross - principal;
        const taxRate = getIncomeTaxRate(numMonths * 30);
        const taxAmount = profitCDBGross * taxRate;
        const finalValueCDBNet = finalValueCDBGross - taxAmount;
        const profitCDBNet = profitCDBGross - taxAmount;

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
            cdiByYear,
            useSelicProjection,
        };
    }, [initialValue, months, lcaProfitability, cdbProfitability, cdiRate, settings, useSelicProjection]);
    
    const handlePeriodClick = (period: string, monthsValue: string) => {
        setSelectedPeriod(period);
        setMonths(monthsValue);
    };

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
                        <input type="text" id="initialValue" value={initialValue} onChange={handleCurrencyChange(setInitialValue)} inputMode="decimal" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="months">Prazo (meses)</label>
                        <input 
                            type="number" 
                            id="months" 
                            value={months} 
                            onChange={e => {
                                setMonths(e.target.value);
                                setSelectedPeriod('custom');
                            }} 
                            inputMode="numeric" 
                        />
                        <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px'}}>
                            <button 
                                type="button"
                                onClick={() => handlePeriodClick('1m', '1')}
                                style={{
                                    padding: '8px 12px',
                                    border: selectedPeriod === '1m' ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                                    borderRadius: '6px',
                                    backgroundColor: selectedPeriod === '1m' ? 'var(--primary-color)' : 'var(--card-bg)',
                                    color: selectedPeriod === '1m' ? 'white' : 'var(--text-color)',
                                    fontSize: '0.85rem',
                                    fontWeight: selectedPeriod === '1m' ? 'bold' : 'normal',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >30 dias</button>
                            <button 
                                type="button"
                                onClick={() => handlePeriodClick('2m', '2')}
                                style={{
                                    padding: '8px 12px',
                                    border: selectedPeriod === '2m' ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                                    borderRadius: '6px',
                                    backgroundColor: selectedPeriod === '2m' ? 'var(--primary-color)' : 'var(--card-bg)',
                                    color: selectedPeriod === '2m' ? 'white' : 'var(--text-color)',
                                    fontSize: '0.85rem',
                                    fontWeight: selectedPeriod === '2m' ? 'bold' : 'normal',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >60 dias</button>
                            <button 
                                type="button"
                                onClick={() => handlePeriodClick('3m', '3')}
                                style={{
                                    padding: '8px 12px',
                                    border: selectedPeriod === '3m' ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                                    borderRadius: '6px',
                                    backgroundColor: selectedPeriod === '3m' ? 'var(--primary-color)' : 'var(--card-bg)',
                                    color: selectedPeriod === '3m' ? 'white' : 'var(--text-color)',
                                    fontSize: '0.85rem',
                                    fontWeight: selectedPeriod === '3m' ? 'bold' : 'normal',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >90 dias</button>
                            <button 
                                type="button"
                                onClick={() => handlePeriodClick('6m', '6')}
                                style={{
                                    padding: '8px 12px',
                                    border: selectedPeriod === '6m' ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                                    borderRadius: '6px',
                                    backgroundColor: selectedPeriod === '6m' ? 'var(--primary-color)' : 'var(--card-bg)',
                                    color: selectedPeriod === '6m' ? 'white' : 'var(--text-color)',
                                    fontSize: '0.85rem',
                                    fontWeight: selectedPeriod === '6m' ? 'bold' : 'normal',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >6 meses</button>
                            <button 
                                type="button"
                                onClick={() => handlePeriodClick('12m', '12')}
                                style={{
                                    padding: '8px 12px',
                                    border: selectedPeriod === '12m' ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                                    borderRadius: '6px',
                                    backgroundColor: selectedPeriod === '12m' ? 'var(--primary-color)' : 'var(--card-bg)',
                                    color: selectedPeriod === '12m' ? 'white' : 'var(--text-color)',
                                    fontSize: '0.85rem',
                                    fontWeight: selectedPeriod === '12m' ? 'bold' : 'normal',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >1 ano</button>
                            <button 
                                type="button"
                                onClick={() => handlePeriodClick('24m', '24')}
                                style={{
                                    padding: '8px 12px',
                                    border: selectedPeriod === '24m' ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                                    borderRadius: '6px',
                                    backgroundColor: selectedPeriod === '24m' ? 'var(--primary-color)' : 'var(--card-bg)',
                                    color: selectedPeriod === '24m' ? 'white' : 'var(--text-color)',
                                    fontSize: '0.85rem',
                                    fontWeight: selectedPeriod === '24m' ? 'bold' : 'normal',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >2 anos</button>
                            <button 
                                type="button"
                                onClick={() => setSelectedPeriod('custom')}
                                style={{
                                    padding: '8px 12px',
                                    border: selectedPeriod === 'custom' ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                                    borderRadius: '6px',
                                    backgroundColor: selectedPeriod === 'custom' ? 'var(--primary-color)' : 'var(--card-bg)',
                                    color: selectedPeriod === 'custom' ? 'white' : 'var(--text-color)',
                                    fontSize: '0.85rem',
                                    fontWeight: selectedPeriod === 'custom' ? 'bold' : 'normal',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >Personalizado</button>
                        </div>
                    </div>
                    
                    <div style={{marginTop: '15px', marginBottom: '15px', padding: '15px', backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)'}}>
                        <label style={{display: 'block', marginBottom: '10px', fontWeight: 'bold', color: 'var(--text-color)'}}>
                            Taxa de Referência
                            <Tooltip text="Escolha entre usar CDI com projeções multi-ano ou SELIC constante.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                            <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '8px 12px', borderRadius: '6px', backgroundColor: !useSelicProjection ? 'var(--primary-color)' : 'var(--card-bg)', color: !useSelicProjection ? 'white' : 'var(--text-color)', border: !useSelicProjection ? '2px solid var(--primary-color)' : '1px solid var(--border-color)', fontWeight: !useSelicProjection ? 'bold' : 'normal'}}>
                                <input 
                                    type="radio" 
                                    name="rateReference" 
                                    checked={!useSelicProjection} 
                                    onChange={() => setUseSelicProjection(false)}
                                    style={{marginRight: '8px'}}
                                />
                                CDI (Projeções Multi-Ano)
                            </label>
                            <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '8px 12px', borderRadius: '6px', backgroundColor: useSelicProjection ? 'var(--primary-color)' : 'var(--card-bg)', color: useSelicProjection ? 'white' : 'var(--text-color)', border: useSelicProjection ? '2px solid var(--primary-color)' : '1px solid var(--border-color)', fontWeight: useSelicProjection ? 'bold' : 'normal'}}>
                                <input 
                                    type="radio" 
                                    name="rateReference" 
                                    checked={useSelicProjection} 
                                    onChange={() => setUseSelicProjection(true)}
                                    style={{marginRight: '8px'}}
                                />
                                SELIC ({((settings.selicAnnual || DEFAULT_SETTINGS.selicAnnual) * 100).toFixed(2)}% a.a.)
                            </label>
                        </div>
                        <p style={{fontSize: '0.75rem', color: 'var(--text-secondary-color)', marginTop: '8px', marginBottom: '0'}}>
                            {useSelicProjection 
                                ? 'Usando taxa SELIC constante para todo o período.' 
                                : 'Usando CDI atual e projeções para 2026-2028 do Boletim Focus.'}
                        </p>
                    </div>
                    
                     <div className="form-group">
                        <label htmlFor="lcaProfitability">
                            Rentabilidade LCA/LCI (% {useSelicProjection ? 'da SELIC' : 'do CDI'})
                             <Tooltip text="Investimentos isentos de Imposto de Renda, ideal para pessoas físicas.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <input type="number" id="lcaProfitability" value={lcaProfitability} onChange={e => setLcaProfitability(e.target.value)} inputMode="decimal" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cdbProfitability">
                            Rentabilidade CDB/RDC (% {useSelicProjection ? 'da SELIC' : 'do CDI'})
                             <Tooltip text="Investimentos com cobrança de Imposto de Renda regressivo sobre o rendimento.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <input type="number" id="cdbProfitability" value={cdbProfitability} onChange={e => setCdbProfitability(e.target.value)} inputMode="decimal" />
                    </div>
                    <p style={{fontSize: '0.8rem', color: 'var(--text-secondary-color)', textAlign: 'center', marginBottom: '15px'}}>
                        {useSelicProjection ? `SELIC: ${((settings.selicAnnual || DEFAULT_SETTINGS.selicAnnual) * 100).toFixed(2)}% a.a.` : `CDI: ${formatCDI(cdiMonthly, cdiAnnual)}`}
                    </p>
                    <button className="btn" onClick={handleCalculate}>Calcular</button>
                    <div className="keyboard-hint">Atalho: ENTER</div>
                    {results && (
                        <>
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
                                <button className="btn btn-secondary" onClick={() => exportToCSV({
                                    headers: ['Mês', 'Saldo LCA/LCI', 'Saldo CDB/RDC'],
                                    rows: results.tableData.map(row => [
                                        row.month,
                                        formatCurrency(row.balanceLCA),
                                        formatCurrency(row.balanceCDB)
                                    ])
                                }, 'investimento.csv')}>📊 Exportar CSV</button>
                            </div>
                            <div className="share-buttons">
                                <button className="btn btn-secondary" onClick={() => {
                                    const shareData = shareSimulation(results, 'Simulação de Investimento');
                                    if (shareData) {
                                        window.open(shareData.whatsappUrl, '_blank');
                                    }
                                }}>
                                    💬 Compartilhar no WhatsApp
                                </button>
                                <button className="btn btn-secondary" onClick={() => {
                                    const shareData = shareSimulation(results, 'Simulação de Investimento');
                                    if (shareData) {
                                        copyToClipboard(shareData.url);
                                    }
                                }}>
                                    📋 Copiar Link
                                </button>
                            </div>
                        </>
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
                            
                            {results.cdiByYear && (
                                <div style={{marginTop: '20px', padding: '15px', backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)'}}>
                                    <h5 style={{margin: '0 0 10px 0', color: 'var(--primary-color)', fontSize: '0.95rem'}}>
                                        📊 Taxas {results.useSelicProjection ? 'SELIC' : 'CDI'} Aplicadas
                                    </h5>
                                    <p style={{fontSize: '0.85rem', color: 'var(--text-secondary-color)', marginBottom: '10px'}}>
                                        {results.useSelicProjection 
                                            ? 'Taxa SELIC constante aplicada:'
                                            : Object.keys(results.cdiByYear).length > 1 
                                                ? 'Simulação com projeções multi-ano do Boletim Focus do BC:'
                                                : 'Taxa CDI aplicada nesta simulação:'}
                                    </p>
                                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                                        {Object.entries(results.cdiByYear).map(([year, rate]) => (
                                            <div key={year} style={{
                                                padding: '8px 12px',
                                                backgroundColor: 'var(--bg-color)',
                                                borderRadius: '6px',
                                                fontSize: '0.85rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px'
                                            }}>
                                                <strong>{year}:</strong> <span style={{color: 'var(--primary-color)'}}>{(Number(rate) * 100).toFixed(2)}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

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
    const { settings } = useSettings();
    const { cdiMonthly, cdiAnnual } = useCDI();
    
    const [loanAmount, setLoanAmount] = useState('R$ 50.000,00');
    const [months, setMonths] = useState('36');
    const [customMonths, setCustomMonths] = useState('');
    const [isCustomMonths, setIsCustomMonths] = useState(false);
    const [interestRate, setInterestRate] = useState((settings.loanRate * 100).toFixed(2));
    const [fixedSpread, setFixedSpread] = useState('0.5');
    const [system, setSystem] = useState('price');
    const [tac, setTac] = useState(formatCurrency(settings.tacLoan));
    const [shouldCalculateIOF, setShouldCalculateIOF] = useState(false);
    const [financeIOF, setFinanceIOF] = useState(false);
    const [results, setResults] = useState(null);
    
    const handleMonthSelection = (value) => {
        setMonths(value);
        setIsCustomMonths(false);
        setCustomMonths('');
    };
    
    const handleCustomClick = () => {
        setIsCustomMonths(true);
        setMonths(customMonths || '12');
    };
    
    useEffect(() => {
        if (isCustomMonths && customMonths) {
            setMonths(customMonths);
        }
    }, [customMonths, isCustomMonths]);

    const effectiveInterestRate = useMemo(() => {
        if (!isPostFixed) return parseFloat(interestRate) / 100;
        const fixedPart = parseFloat(fixedSpread) / 100;
        return cdiRate + fixedPart;
    }, [isPostFixed, interestRate, fixedSpread, cdiRate]);

    const calculation = useMemo(() => {
        const principal = parseCurrency(loanAmount);
        const numMonths = parseInt(months, 10);
        const monthlyRate = effectiveInterestRate;
        const iofAdicionalRate = shouldCalculateIOF ? settings.iofRate : 0;
        const iofDiarioRate = settings.iofDiarioRate || 0.000082;
        const tacValue = parseCurrency(tac);

        if (!principal || !numMonths || !monthlyRate || monthlyRate <= 0) return null;

        const iofData = shouldCalculateIOF ? calculateIOF(principal, numMonths, iofAdicionalRate, iofDiarioRate) : { iofTotal: 0, iofAdicional: 0, iofDiario: 0, dias: 0, iofAdicionalRate: 0, iofDiarioRate: 0 };
        const iofValue = iofData.iofTotal;
        const effectivePrincipal = principal + (financeIOF ? iofValue : 0) + tacValue;
        const totalUpfrontCosts = (shouldCalculateIOF && !financeIOF ? iofValue : 0);

        let tableData = [];
        let totalPaid = 0;
        let totalInterest = 0;
        let remainingBalance = effectivePrincipal;
        let monthlyPayment;

        const today = new Date();
        const startYear = today.getFullYear();
        const startMonth = today.getMonth();
        const fixedPart = isPostFixed ? parseFloat(fixedSpread) / 100 : 0;
        const cdiByYear = {};

        if (system === 'price') {
            if (!isPostFixed) {
                const factor = Math.pow(1 + monthlyRate, numMonths);
                const denominator = factor - 1;
                
                if (Math.abs(denominator) < 0.000001) {
                    monthlyPayment = effectivePrincipal / numMonths;
                } else {
                    monthlyPayment = effectivePrincipal * (monthlyRate * factor) / denominator;
                }
                
                totalPaid = monthlyPayment * numMonths;
                totalInterest = totalPaid - effectivePrincipal;

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
            } else {
                for (let i = 1; i <= numMonths; i++) {
                    const futureMonth = startMonth + (i - 1);
                    const futureYear = startYear + Math.floor(futureMonth / 12);
                    const cdiAnnualForYear = getCDIForYear(settings, futureYear);
                    const monthlyCDIForYear = annualToMonthly(cdiAnnualForYear);
                    const currentMonthlyRate = monthlyCDIForYear + fixedPart;

                    if (!cdiByYear[futureYear]) {
                        cdiByYear[futureYear] = cdiAnnualForYear;
                    }

                    const interestComponent = remainingBalance * currentMonthlyRate;
                    const principalComponent = effectivePrincipal / numMonths;
                    const payment = principalComponent + interestComponent;
                    
                    remainingBalance -= principalComponent;
                    totalPaid += payment;
                    totalInterest += interestComponent;

                    tableData.push({
                        month: i,
                        payment,
                        principal: principalComponent,
                        interest: interestComponent,
                        balance: Math.abs(remainingBalance),
                        cdiRate: cdiAnnualForYear,
                        year: futureYear,
                    });
                }
            }
        } else { // SAC
            const principalComponent = effectivePrincipal / numMonths;
            for (let i = 1; i <= numMonths; i++) {
                let currentMonthlyRate = monthlyRate;

                if (isPostFixed) {
                    const futureMonth = startMonth + (i - 1);
                    const futureYear = startYear + Math.floor(futureMonth / 12);
                    const cdiAnnualForYear = getCDIForYear(settings, futureYear);
                    const monthlyCDIForYear = annualToMonthly(cdiAnnualForYear);
                    currentMonthlyRate = monthlyCDIForYear + fixedPart;

                    if (!cdiByYear[futureYear]) {
                        cdiByYear[futureYear] = cdiAnnualForYear;
                    }
                }

                const interestComponent = remainingBalance * currentMonthlyRate;
                const payment = principalComponent + interestComponent;
                remainingBalance -= principalComponent;
                totalInterest += interestComponent;
                totalPaid += payment;
                
                const row: any = {
                    month: i,
                    payment: payment,
                    principal: principalComponent,
                    interest: interestComponent,
                    balance: Math.abs(remainingBalance),
                };
                
                if (isPostFixed) {
                    const futureMonth = startMonth + (i - 1);
                    const futureYear = startYear + Math.floor(futureMonth / 12);
                    row.cdiRate = getCDIForYear(settings, futureYear);
                    row.year = futureYear;
                }
                
                tableData.push(row);
            }
        }

        return {
            principal,
            effectivePrincipal,
            iofValue,
            iofAdicional: iofData.iofAdicional,
            iofDiario: iofData.iofDiario,
            iofDias: iofData.dias,
            tacValue,
            financeIOF,
            totalUpfrontCosts,
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
            totalCost: totalPaid + totalUpfrontCosts,
            tableData,
            cdiByYear: isPostFixed ? cdiByYear : null,
        };
    }, [loanAmount, months, system, effectiveInterestRate, isPostFixed, fixedSpread, cdiRate, tac, shouldCalculateIOF, financeIOF, settings]);

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
                        <input type="text" id="loanAmount" value={loanAmount} onChange={handleCurrencyChange(setLoanAmount)} inputMode="decimal" />
                    </div>
                    <div className="form-group">
                        <label>Prazo (Meses)</label>
                        <div className="period-filters">
                            {['12', '24', '36', '48', '60'].map(m => (
                                <button key={m} onClick={() => handleMonthSelection(m)} className={!isCustomMonths && months === m ? 'active' : ''}>{m}</button>
                            ))}
                            <button onClick={handleCustomClick} className={isCustomMonths ? 'active' : ''}>Personal.</button>
                        </div>
                        {isCustomMonths && (
                            <input type="number" value={customMonths} onChange={e => setCustomMonths(e.target.value)} placeholder="Digite os meses" inputMode="numeric" />
                        )}
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
                                    inputMode="decimal"
                                />
                                <p style={{fontSize: '0.8rem', color: 'var(--text-secondary-color)', textAlign: 'center', marginTop: '5px'}}>
                                    CDI: {formatCDI(cdiMonthly, cdiAnnual)}<br/>
                                    Taxa efetiva: {formatPercentage(cdiRate)} + {fixedSpread}% = {formatPercentage(cdiRate + parseFloat(fixedSpread)/100)} a.m.
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="form-group">
                            <label htmlFor="interestRate">Taxa de Juros Mensal (%)</label>
                            <input type="number" id="interestRate" value={interestRate} onChange={e => setInterestRate(e.target.value)} inputMode="decimal" />
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="system">Sistema de Amortização</label>
                        <select id="system" value={system} onChange={e => setSystem(e.target.value)}>
                            <option value="price">Price (Parcelas Fixas)</option>
                            <option value="sac">SAC (Parcelas Decrescentes)</option>
                        </select>
                    </div>
                    <div className="form-group-toggle">
                        <input 
                            type="checkbox" 
                            id="shouldCalculateIOF" 
                            checked={shouldCalculateIOF} 
                            onChange={e => {
                                setShouldCalculateIOF(e.target.checked);
                                if (!e.target.checked) setFinanceIOF(false);
                            }} 
                        />
                        <label htmlFor="shouldCalculateIOF" style={{marginBottom: 0}}>Calcular IOF</label>
                    </div>
                    {shouldCalculateIOF && (
                        <div className="form-group-toggle" style={{marginLeft: '20px'}}>
                            <input 
                                type="checkbox" 
                                id="financeIOF" 
                                checked={financeIOF} 
                                onChange={e => setFinanceIOF(e.target.checked)} 
                            />
                            <label htmlFor="financeIOF" style={{marginBottom: 0}}>Financiar IOF (agregar ao empréstimo)</label>
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="tac">TAC - Taxa de Abertura de Crédito (R$)</label>
                        <input type="text" id="tac" value={tac} onChange={handleCurrencyChange(setTac)} inputMode="decimal" />
                        <p style={{fontSize: '0.75rem', color: 'var(--text-secondary-color)', marginTop: '5px'}}>
                            TAC sempre financiado automaticamente
                        </p>
                    </div>
                     <button className="btn" onClick={handleCalculate}>Calcular</button>
                    <div className="keyboard-hint">Atalho: ENTER</div>
                    {results && (
                        <>
                            <div className="btn-group">
                                <button className="btn btn-save" onClick={handleSave}>💾 Salvar</button>
                                <button className="btn btn-secondary" onClick={() => exportToPDF('Simulação de Empréstimo', {
                                    summary: [
                                        { label: 'Valor Solicitado', value: formatCurrency(results.principal) },
                                        { label: 'IOF Adicional (0,38%)', value: formatCurrency(results.iofAdicional) },
                                        { label: `IOF Diário (${results.iofDias} dias)`, value: formatCurrency(results.iofDiario) },
                                        { label: 'IOF Total', value: formatCurrency(results.iofValue) },
                                        { label: 'TAC', value: formatCurrency(results.tacValue) },
                                        { label: 'Financiar IOF', value: results.financeIOF ? 'Sim' : 'Não' },
                                        { label: 'Valor Financiado', value: formatCurrency(results.effectivePrincipal) },
                                        { label: 'Prazo', value: `${results.numMonths} meses` },
                                        { label: 'Sistema', value: results.system === 'price' ? 'PRICE (Parcelas Fixas)' : 'SAC (Parcelas Decrescentes)' },
                                        { label: 'Primeira Parcela', value: formatCurrency(results.firstPayment) },
                                        { label: 'Última Parcela', value: formatCurrency(results.lastPayment) },
                                        { label: 'Total de Juros', value: formatCurrency(results.totalInterest) },
                                        { label: 'Custo Total', value: formatCurrency(results.totalCost) }
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
                                <button className="btn btn-secondary" onClick={() => exportToCSV({
                                    headers: ['Mês', 'Parcela', 'Amortização', 'Juros', 'Saldo'],
                                    rows: results.tableData.map(row => [
                                        row.month,
                                        formatCurrency(row.payment),
                                        formatCurrency(row.principal),
                                        formatCurrency(row.interest),
                                        formatCurrency(row.balance)
                                    ])
                                }, 'emprestimo.csv')}>📊 Exportar CSV</button>
                            </div>
                            <div className="share-buttons">
                                <button className="btn btn-secondary" onClick={() => {
                                    const shareData = shareSimulation(results, 'Simulação de Empréstimo');
                                    if (shareData) {
                                        window.open(shareData.whatsappUrl, '_blank');
                                    }
                                }}>
                                    💬 Compartilhar no WhatsApp
                                </button>
                                <button className="btn btn-secondary" onClick={() => {
                                    const shareData = shareSimulation(results, 'Simulação de Empréstimo');
                                    if (shareData) {
                                        copyToClipboard(shareData.url);
                                    }
                                }}>
                                    📋 Copiar Link
                                </button>
                            </div>
                        </>
                    )}
                </div>
                 <div className="results-section">
                    <h3>Resultados da Simulação</h3>
                    {results ? (
                        <>
                            <div className="results-summary">
                                <div className="summary-item">
                                    <h4>Valor Solicitado</h4>
                                    <p>{formatCurrency(results.principal)}</p>
                                </div>
                                <div className="summary-item">
                                    <h4>IOF</h4>
                                    <p className="negative">{formatCurrency(results.iofValue)}</p>
                                </div>
                                <div className="summary-item">
                                    <h4>TAC</h4>
                                    <p className="negative">{formatCurrency(results.tacValue)}</p>
                                </div>
                                <div className="summary-item">
                                    <h4>Valor Financiado</h4>
                                    <p>{formatCurrency(results.effectivePrincipal)}</p>
                                </div>
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
                                    <h4>Total de Juros</h4>
                                    <p className="negative">{formatCurrency(results.totalInterest)}</p>
                                </div>
                                <div className="summary-item">
                                    <h4>Custo Total</h4>
                                    <p className="negative">{formatCurrency(results.totalCost)}</p>
                                </div>
                            </div>
                            
                            {results.cdiByYear && (
                                <div style={{marginTop: '20px', padding: '15px', backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)'}}>
                                    <h5 style={{margin: '0 0 10px 0', color: 'var(--primary-color)', fontSize: '0.95rem'}}>📊 Taxas CDI Aplicadas</h5>
                                    <p style={{fontSize: '0.85rem', color: 'var(--text-secondary-color)', marginBottom: '10px'}}>
                                        {Object.keys(results.cdiByYear).length > 1 
                                            ? 'Empréstimo pós-fixado com projeções multi-ano do Boletim Focus do BC:'
                                            : 'Taxa CDI aplicada neste empréstimo pós-fixado:'}
                                    </p>
                                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                                        {Object.entries(results.cdiByYear).map(([year, rate]) => (
                                            <div key={year} style={{
                                                padding: '8px 12px',
                                                backgroundColor: 'var(--bg-color)',
                                                borderRadius: '6px',
                                                fontSize: '0.85rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px'
                                            }}>
                                                <strong>{year}:</strong> <span style={{color: 'var(--primary-color)'}}>{(Number(rate) * 100).toFixed(2)}%</span>
                                            </div>
                                        ))}
                                    </div>
                                    <p style={{fontSize: '0.75rem', color: 'var(--text-secondary-color)', marginTop: '10px', marginBottom: '0'}}>
                                        Taxa final de cada mês = CDI do ano + {results.fixedSpread.toFixed(2)}% (spread fixo)
                                    </p>
                                </div>
                            )}
                             
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
    const { settings } = useSettings();
    const { cdiMonthly, cdiAnnual } = useCDI();
    
    const [initialDeposit, setInitialDeposit] = useState('R$ 0,00');
    const [monthlyDeposit, setMonthlyDeposit] = useState('R$ 1.000,00');
    const [months, setMonths] = useState('12');
    const [customMonths, setCustomMonths] = useState('');
    const [isCustomMonths, setIsCustomMonths] = useState(false);
    const [lcaProfitability, setLcaProfitability] = useState('82');
    const [cdbProfitability, setCdbProfitability] = useState('110');
    const [useSelicProjection, setUseSelicProjection] = useState(false);
    const [results, setResults] = useState(null);

    const activeMonths = isCustomMonths ? customMonths : months;

    const calculation = useMemo(() => {
        const principal = parseCurrency(initialDeposit);
        const monthlyAmount = parseCurrency(monthlyDeposit);
        const numMonths = parseInt(activeMonths, 10);
        const lcaProf = parseFloat(lcaProfitability) / 100;
        const cdbProf = parseFloat(cdbProfitability) / 100;

        if (isNaN(numMonths) || numMonths <= 0 || !cdiRate) return null;

        const today = new Date();
        const startYear = today.getFullYear();
        const startMonth = today.getMonth();

        let tableData = [];
        let currentBalanceLCA = principal;
        let currentBalanceCDB = principal;
        const cdiByYear = {};

        for (let i = 1; i <= numMonths; i++) {
            const futureMonth = startMonth + (i - 1);
            const futureYear = startYear + Math.floor(futureMonth / 12);
            
            let baseRateAnnual;
            if (useSelicProjection) {
                baseRateAnnual = settings.selic / 100;
            } else {
                baseRateAnnual = getCDIForYear(settings, futureYear);
            }
            
            const monthlyBaseRate = annualToMonthly(baseRateAnnual);

            if (!cdiByYear[futureYear]) {
                cdiByYear[futureYear] = baseRateAnnual;
            }

            const monthlyLcaRate = monthlyBaseRate * lcaProf;
            const monthlyCdbRate = monthlyBaseRate * cdbProf;

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
                cdiRate: baseRateAnnual,
                year: futureYear,
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
            cdiByYear,
            useSelicProjection,
        };
    }, [initialDeposit, monthlyDeposit, activeMonths, lcaProfitability, cdbProfitability, cdiRate, settings, useSelicProjection]);

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
                        <input type="text" value={initialDeposit} onChange={handleCurrencyChange(setInitialDeposit)} inputMode="decimal" />
                    </div>
                    <div className="form-group">
                        <label>Aportes Mensais (R$)</label>
                        <input type="text" value={monthlyDeposit} onChange={handleCurrencyChange(setMonthlyDeposit)} inputMode="decimal" />
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
                            <input type="number" value={customMonths} onChange={e => setCustomMonths(e.target.value)} placeholder="Digite os meses" inputMode="numeric" />
                        )}
                    </div>
                    <div className="form-group">
                        <label>
                            Taxa de Referência
                            <Tooltip text="Escolha a taxa base para os cálculos: CDI com projeções do Boletim Focus ou SELIC constante.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <div style={{display: 'flex', gap: '10px', marginTop: '8px'}}>
                            <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '8px 12px', borderRadius: '6px', backgroundColor: !useSelicProjection ? 'var(--primary-color)' : 'var(--card-bg)', color: !useSelicProjection ? 'white' : 'var(--text-color)', border: !useSelicProjection ? '2px solid var(--primary-color)' : '1px solid var(--border-color)', fontWeight: !useSelicProjection ? 'bold' : 'normal'}}>
                                <input 
                                    type="radio" 
                                    name="rateType" 
                                    checked={!useSelicProjection} 
                                    onChange={() => setUseSelicProjection(false)}
                                    style={{marginRight: '8px'}}
                                />
                                CDI (Projeções Multi-Ano)
                            </label>
                            <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '8px 12px', borderRadius: '6px', backgroundColor: useSelicProjection ? 'var(--primary-color)' : 'var(--card-bg)', color: useSelicProjection ? 'white' : 'var(--text-color)', border: useSelicProjection ? '2px solid var(--primary-color)' : '1px solid var(--border-color)', fontWeight: useSelicProjection ? 'bold' : 'normal'}}>
                                <input 
                                    type="radio" 
                                    name="rateType" 
                                    checked={useSelicProjection} 
                                    onChange={() => setUseSelicProjection(true)}
                                    style={{marginRight: '8px'}}
                                />
                                SELIC ({settings?.selic?.toFixed(2) || '0.00'}% a.a.)
                            </label>
                        </div>
                        <p style={{fontSize: '0.75rem', color: 'var(--text-secondary-color)', marginTop: '8px', lineHeight: '1.4'}}>
                            {useSelicProjection 
                                ? '💡 SELIC constante: ideal para simulações de curto prazo com taxa fixa.'
                                : '💡 CDI com projeções: usa taxas anuais diferentes conforme Boletim Focus do BC (2026: 12.25%, 2027: 10.50%, 2028: 10%).'}
                        </p>
                    </div>
                    <div className="form-group">
                        <label>
                            Rentabilidade LCA/LCI (% {useSelicProjection ? 'da SELIC' : 'do CDI'})
                        </label>
                        <input type="number" value={lcaProfitability} onChange={e => setLcaProfitability(e.target.value)} inputMode="decimal" />
                    </div>
                    <div className="form-group">
                        <label>
                            Rentabilidade CDB/RDC (% {useSelicProjection ? 'da SELIC' : 'do CDI'})
                        </label>
                        <input type="number" value={cdbProfitability} onChange={e => setCdbProfitability(e.target.value)} inputMode="decimal" />
                    </div>
                     <p className="form-note">Observação: Aplicações em LCA/LCI podem ter carência (ex: 6 meses). Cada novo aporte pode estar sujeito a uma nova carência.</p>
                     <p style={{fontSize: '0.8rem', color: 'var(--text-secondary-color)', textAlign: 'center', marginBottom: '15px'}}>CDI: {formatCDI(cdiMonthly, cdiAnnual)}</p>
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
                            <button className="btn btn-secondary" onClick={() => exportToCSV({
                                headers: ['Mês', 'Saldo LCA/LCI', 'Saldo CDB/RDC'],
                                rows: results.tableData.map(row => [
                                    row.month,
                                    formatCurrency(row.balanceLCA),
                                    formatCurrency(row.balanceCDB)
                                ])
                            }, 'aplicacao-programada.csv')}>📊 Exportar CSV</button>
                            <button className="btn btn-secondary" onClick={() => {
                                const shareData = shareSimulation(results, 'Aplicação Programada');
                                if (shareData) {
                                    window.open(shareData.whatsappUrl, '_blank');
                                }
                            }}>
                                💬 Compartilhar no WhatsApp
                            </button>
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
                            
                            {results.cdiByYear && (
                                <div style={{marginTop: '20px', padding: '15px', backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)'}}>
                                    <h5 style={{margin: '0 0 10px 0', color: 'var(--primary-color)', fontSize: '0.95rem'}}>
                                        📊 Taxas {results.useSelicProjection ? 'SELIC' : 'CDI'} Aplicadas
                                    </h5>
                                    <p style={{fontSize: '0.85rem', color: 'var(--text-secondary-color)', marginBottom: '10px'}}>
                                        {results.useSelicProjection 
                                            ? 'Taxa SELIC constante aplicada:'
                                            : Object.keys(results.cdiByYear).length > 1 
                                                ? 'Simulação com projeções multi-ano do Boletim Focus do BC:'
                                                : 'Taxa CDI aplicada nesta simulação:'}
                                    </p>
                                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                                        {Object.entries(results.cdiByYear).map(([year, rate]) => (
                                            <div key={year} style={{
                                                padding: '8px 12px',
                                                backgroundColor: 'var(--bg-color)',
                                                borderRadius: '6px',
                                                fontSize: '0.85rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px'
                                            }}>
                                                <strong>{year}:</strong> <span style={{color: 'var(--primary-color)'}}>{(Number(rate) * 100).toFixed(2)}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

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
                        <input type="text" id="loanAmount" value={loanAmount} onChange={handleCurrencyChange(setLoanAmount)} inputMode="decimal" />
                    </div>
                     <div className="form-group">
                        <label htmlFor="monthlyPayment">Valor da Parcela (R$)</label>
                        <input type="text" id="monthlyPayment" value={monthlyPayment} onChange={handleCurrencyChange(setMonthlyPayment)} inputMode="decimal" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="months">Quantidade de Meses</label>
                        <input type="number" id="months" value={months} onChange={e => setMonths(e.target.value)} inputMode="numeric" />
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
                            <button className="btn btn-secondary" onClick={() => exportToCSV({
                                headers: ['Descrição', 'Valor'],
                                rows: [
                                    ['Valor do Empréstimo', formatCurrency(results.loanAmount)],
                                    ['Valor da Parcela', formatCurrency(results.monthlyPayment)],
                                    ['Quantidade de Meses', `${results.months} meses`],
                                    ['Taxa Mensal Calculada', formatPercentage(results.calculatedRate)],
                                    ['Taxa Anual Equivalente', formatPercentage(Math.pow(1 + results.calculatedRate, 12) - 1)]
                                ]
                            }, 'taxa-concorrente.csv')}>📊 Exportar CSV</button>
                            <button className="btn btn-secondary" onClick={() => {
                                const shareData = shareSimulation(results, 'Taxa do Concorrente');
                                if (shareData) {
                                    window.open(shareData.whatsappUrl, '_blank');
                                }
                            }}>
                                💬 Compartilhar no WhatsApp
                            </button>
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
    const [system, setSystem] = useState('sac');
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
        let firstPayment = 0;
        let lastPayment = 0;

        if (amortizationYears > 0) {
            if (system === 'price') {
                // PRICE: Fixed payments
                const factor = Math.pow(1 + rate, amortizationYears);
                const denominator = factor - 1;
                
                if (Math.abs(denominator) < 0.000001) {
                    // Handle near-zero rate case analytically (flat amortization)
                    annualPayment = principalAfterGrace / amortizationYears;
                } else {
                    annualPayment = principalAfterGrace * (rate * factor) / denominator;
                }
                firstPayment = lastPayment = annualPayment;

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
            } else {
                // SAC: Constant principal amortization
                const principalComponent = principalAfterGrace / amortizationYears;
                
                for (let i = 1; i <= amortizationYears; i++) {
                    const year = numGraceYears + i;
                    const interestComponent = currentBalance * rate;
                    const payment = principalComponent + interestComponent;
                    currentBalance -= principalComponent;
                    totalInterestPaid += interestComponent;
                    
                    if (i === 1) firstPayment = payment;
                    if (i === amortizationYears) lastPayment = payment;
                    
                    tableData.push({
                        year: year,
                        isGrace: false,
                        payment: payment,
                        principal: principalComponent,
                        interest: interestComponent,
                        balance: Math.abs(currentBalance),
                    });
                }
                annualPayment = firstPayment;
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
            firstPayment,
            lastPayment,
            totalPaid,
            totalInterest: totalInterestPaid,
            tableData,
            system
        };
    }, [loanAmount, annualRate, totalYears, graceYears, noGracePeriod, graceInterest, system]);

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
                        <input type="text" value={loanAmount} onChange={handleCurrencyChange(setLoanAmount)} inputMode="decimal" />
                    </div>
                    <div className="form-group">
                        <label>Taxa de Juros Anual (%)</label>
                        <input type="number" value={annualRate} onChange={e => setAnnualRate(e.target.value)} inputMode="decimal" />
                    </div>
                    <div className="form-group">
                        <label>Prazo Total (anos)</label>
                        <input type="number" value={totalYears} onChange={e => setTotalYears(e.target.value)} inputMode="numeric" />
                    </div>
                    
                    <div className="form-group">
                        <label>Sistema de Amortização</label>
                        <select value={system} onChange={e => setSystem(e.target.value)}>
                            <option value="price">PRICE (Parcelas Fixas)</option>
                            <option value="sac">SAC (Parcelas Decrescentes)</option>
                        </select>
                    </div>
                    
                    <div className="form-group-toggle">
                        <input type="checkbox" id="noGrace" checked={noGracePeriod} onChange={e => setNoGracePeriod(e.target.checked)} />
                        <label htmlFor="noGrace" style={{marginBottom: 0}}>Sem carência</label>
                    </div>

                    {!noGracePeriod && (
                        <>
                             <div className="form-group">
                                <label>Prazo de Carência (anos)</label>
                                <input type="number" value={graceYears} onChange={e => setGraceYears(e.target.value)} disabled={noGracePeriod} inputMode="numeric" />
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
                                    { label: 'Sistema de Amortização', value: results.system === 'price' ? 'PRICE (Parcelas Fixas)' : 'SAC (Parcelas Decrescentes)' },
                                    { label: 'Saldo Pós-Carência', value: formatCurrency(results.principalAfterGrace) },
                                    ...(results.system === 'price' 
                                        ? [{ label: 'Parcela Anual', value: formatCurrency(results.annualPayment) }]
                                        : [
                                            { label: 'Primeira Parcela', value: formatCurrency(results.firstPayment) },
                                            { label: 'Última Parcela', value: formatCurrency(results.lastPayment) }
                                          ]
                                    ),
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
                            <button className="btn btn-secondary" onClick={() => exportToCSV({
                                headers: ['Ano', 'Tipo', 'Pagamento', 'Amortização', 'Juros', 'Saldo'],
                                rows: results.tableData.map(row => [
                                    row.year,
                                    row.isGrace ? 'Carência' : 'Amortização',
                                    formatCurrency(row.payment),
                                    formatCurrency(row.principal),
                                    formatCurrency(row.interest),
                                    formatCurrency(row.balance)
                                ])
                            }, 'credito-rural.csv')}>📊 Exportar CSV</button>
                            <button className="btn btn-secondary" onClick={() => {
                                const shareData = shareSimulation(results, 'Crédito Rural');
                                if (shareData) {
                                    window.open(shareData.whatsappUrl, '_blank');
                                }
                            }}>
                                💬 Compartilhar no WhatsApp
                            </button>
                        </div>
                    )}
                </div>
                 <div className="results-section">
                    <h3>Resultados da Simulação</h3>
                     {results ? (
                        <>
                            <div className="results-summary">
                                <div className="summary-item">
                                    <h4>{results.system === 'price' ? 'Parcela Anual (Pós-Carência)' : 'Primeira Parcela'}</h4>
                                    <p>{formatCurrency(results.system === 'price' ? results.annualPayment : results.firstPayment)}</p>
                                </div>
                                {results.system === 'sac' && (
                                    <div className="summary-item">
                                        <h4>Última Parcela</h4>
                                        <p>{formatCurrency(results.lastPayment)}</p>
                                    </div>
                                )}
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
    const { settings } = useSettings();
    
    const [receivables, setReceivables] = useState([]);
    const [currentValue, setCurrentValue] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [interestRate, setInterestRate] = useState((settings.tdRate * 100).toFixed(2));
    const [tac, setTac] = useState(formatCurrency(settings.tacTD));
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
                            <input type="text" value={currentValue} onChange={handleCurrencyChange(setCurrentValue)} inputMode="decimal" />
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
                        <input type="text" value={interestRate} onChange={e => setInterestRate(e.target.value)} inputMode="decimal" />
                    </div>
                    <div className="form-group">
                        <label>
                            TAC (Taxa de Abertura de Crédito)
                             <Tooltip text="Custo fixo da operação, cobrado pela instituição financeira.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <input type="text" value={tac} onChange={handleCurrencyChange(setTac)} inputMode="decimal" />
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
                            <button className="btn btn-secondary" onClick={() => exportToCSV({
                                headers: ['Título', 'Valor Bruto', 'Dias', 'Juros', 'IOF', 'Valor Líquido'],
                                rows: results.receivablesDetails.map((r, idx) => [
                                    `Título ${idx + 1}`,
                                    formatCurrency(r.grossValue),
                                    r.days,
                                    formatCurrency(r.interest),
                                    formatCurrency(r.iof),
                                    formatCurrency(r.netValue)
                                ])
                            }, 'desconto-recebiveis.csv')}>📊 Exportar CSV</button>
                            <button className="btn btn-secondary" onClick={() => {
                                const shareData = shareSimulation(results, 'Desconto de Recebíveis');
                                if (shareData) {
                                    window.open(shareData.whatsappUrl, '_blank');
                                }
                            }}>
                                💬 Compartilhar no WhatsApp
                            </button>
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
                if (newSelection.size < 4) {
                    newSelection.add(id);
                } else {
                    toast.error('Você pode comparar até 4 simulações por vez.');
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
                        <p>Selecione de 2 até 4 simulações do mesmo tipo para comparar.</p>
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


const SettingsMenu = () => {
    const { settings, updateSettings, resetToDefaults } = useSettings();
    
    const [cdiAnnualInput, setCdiAnnualInput] = useState((settings.cdiAnnual * 100).toFixed(2));
    const [cdi2026Input, setCdi2026Input] = useState(((settings.cdi2026 || DEFAULT_SETTINGS.cdi2026) * 100).toFixed(2));
    const [cdi2027Input, setCdi2027Input] = useState(((settings.cdi2027 || DEFAULT_SETTINGS.cdi2027) * 100).toFixed(2));
    const [cdi2028Input, setCdi2028Input] = useState(((settings.cdi2028 || DEFAULT_SETTINGS.cdi2028) * 100).toFixed(2));
    const [selicAnnualInput, setSelicAnnualInput] = useState((settings.selicAnnual * 100).toFixed(2));
    const [ipcaInput, setIpcaInput] = useState(((settings.ipca || DEFAULT_SETTINGS.ipca) * 100).toFixed(2));
    const [usdBrlInput, setUsdBrlInput] = useState((settings.usdBrl || DEFAULT_SETTINGS.usdBrl).toFixed(2));
    const [loanRateInput, setLoanRateInput] = useState((settings.loanRate * 100).toFixed(2));
    const [iofRateInput, setIofRateInput] = useState((settings.iofRate * 100).toFixed(2));
    const [iofDiarioRateInput, setIofDiarioRateInput] = useState(((settings.iofDiarioRate || 0.000082) * 100).toFixed(4));
    const [tacLoanInput, setTacLoanInput] = useState(formatCurrency(settings.tacLoan));
    const [lcaPercentInput, setLcaPercentInput] = useState((settings.lcaPercentCDI * 100).toFixed(0));
    const [cdbPercentInput, setCdbPercentInput] = useState((settings.cdbPercentCDI * 100).toFixed(0));
    const [tdRateInput, setTdRateInput] = useState((settings.tdRate * 100).toFixed(2));
    const [tacTDInput, setTacTDInput] = useState(formatCurrency(settings.tacTD));
    const [companyNameInput, setCompanyNameInput] = useState(settings.companyName || '');
    const [logoUrlInput, setLogoUrlInput] = useState(settings.logoUrl || '');
    const [isLoadingIndicators, setIsLoadingIndicators] = useState(false);

    // Calculate monthly rates for display
    const cdiMonthly = annualToMonthly(parseFloat(cdiAnnualInput) / 100);
    const selicMonthly = annualToMonthly(parseFloat(selicAnnualInput) / 100);

    const handleSave = () => {
        const newSettings = {
            cdiAnnual: parseFloat(cdiAnnualInput) / 100,
            cdi2026: parseFloat(cdi2026Input) / 100,
            cdi2027: parseFloat(cdi2027Input) / 100,
            cdi2028: parseFloat(cdi2028Input) / 100,
            selicAnnual: parseFloat(selicAnnualInput) / 100,
            ipca: parseFloat(ipcaInput) / 100,
            usdBrl: parseFloat(usdBrlInput),
            loanRate: parseFloat(loanRateInput) / 100,
            iofRate: parseFloat(iofRateInput) / 100,
            iofDiarioRate: parseFloat(iofDiarioRateInput) / 100,
            tacLoan: parseCurrency(tacLoanInput),
            lcaPercentCDI: parseFloat(lcaPercentInput) / 100,
            cdbPercentCDI: parseFloat(cdbPercentInput) / 100,
            tdRate: parseFloat(tdRateInput) / 100,
            tacTD: parseCurrency(tacTDInput),
            companyName: companyNameInput,
            logoUrl: logoUrlInput,
            indicatorsLastUpdated: settings.indicatorsLastUpdated
        };
        updateSettings(newSettings);
    };

    const handleReset = () => {
        if (confirm('Tem certeza que deseja restaurar todas as configurações para os valores padrão?')) {
            resetToDefaults();
            setCdiAnnualInput((DEFAULT_SETTINGS.cdiAnnual * 100).toFixed(2));
            setCdi2026Input((DEFAULT_SETTINGS.cdi2026 * 100).toFixed(2));
            setCdi2027Input((DEFAULT_SETTINGS.cdi2027 * 100).toFixed(2));
            setCdi2028Input((DEFAULT_SETTINGS.cdi2028 * 100).toFixed(2));
            setSelicAnnualInput((DEFAULT_SETTINGS.selicAnnual * 100).toFixed(2));
            setIpcaInput((DEFAULT_SETTINGS.ipca * 100).toFixed(2));
            setUsdBrlInput(DEFAULT_SETTINGS.usdBrl.toFixed(2));
            setLoanRateInput((DEFAULT_SETTINGS.loanRate * 100).toFixed(2));
            setIofRateInput((DEFAULT_SETTINGS.iofRate * 100).toFixed(2));
            setIofDiarioRateInput((DEFAULT_SETTINGS.iofDiarioRate * 100).toFixed(4));
            setTacLoanInput(formatCurrency(DEFAULT_SETTINGS.tacLoan));
            setLcaPercentInput((DEFAULT_SETTINGS.lcaPercentCDI * 100).toFixed(0));
            setCdbPercentInput((DEFAULT_SETTINGS.cdbPercentCDI * 100).toFixed(0));
            setTdRateInput((DEFAULT_SETTINGS.tdRate * 100).toFixed(2));
            setTacTDInput(formatCurrency(DEFAULT_SETTINGS.tacTD));
            setCompanyNameInput(DEFAULT_SETTINGS.companyName || '');
            setLogoUrlInput(DEFAULT_SETTINGS.logoUrl || '');
        }
    };

    const handleUpdateIndicators = async () => {
        setIsLoadingIndicators(true);
        try {
            const fetchIndicator = async (code) => {
                const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${code}/dados/ultimos/1?formato=json`;
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Erro ao buscar série ${code}`);
                const data = await response.json();
                return data && data.length > 0 ? parseFloat(data[0].valor) : null;
            };

            const fetchUSD = async () => {
                try {
                    const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
                    const data = await response.json();
                    return parseFloat(data.USDBRL.bid);
                } catch (error) {
                    console.error('Erro ao buscar USD:', error);
                    return null;
                }
            };

            const [selicMeta, ipcaAcum12m, usd] = await Promise.all([
                fetchIndicator(432),
                fetchIndicator(13522),
                fetchUSD()
            ]);

            if (selicMeta) setSelicAnnualInput(selicMeta.toFixed(2));
            if (ipcaAcum12m) setIpcaInput(ipcaAcum12m.toFixed(2));
            if (usd) setUsdBrlInput(usd.toFixed(2));

            const updatedSettings = {
                ...settings,
                selicAnnual: selicMeta ? selicMeta / 100 : settings.selicAnnual,
                ipca: ipcaAcum12m ? ipcaAcum12m / 100 : settings.ipca,
                usdBrl: usd || settings.usdBrl,
                indicatorsLastUpdated: new Date().toISOString()
            };
            
            updateSettings(updatedSettings);
            toast.success('Indicadores atualizados: SELIC, IPCA e Dólar!');
        } catch (error) {
            console.error('Erro ao atualizar indicadores:', error);
            toast.error('Erro ao buscar indicadores. Verifique sua conexão e tente novamente.');
        } finally {
            setIsLoadingIndicators(false);
        }
    };

    return (
        <div className="calculator-container">
            <div className="calculator-layout">
                <div className="form-section">
                    <h3>⚙️ Definições do Aplicativo</h3>
                    
                    <h4 style={{marginTop: '20px', marginBottom: '10px', color: 'var(--primary-color)'}}>📊 Taxas de Mercado</h4>
                    
                    <div className="form-group">
                        <label>
                            CDI Atual (%)
                            <Tooltip text="Taxa CDI atual. Usado como referência para investimentos e empréstimos pós-fixados de curto prazo.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <input 
                            type="number" 
                            value={cdiAnnualInput} 
                            onChange={e => setCdiAnnualInput(e.target.value)}
                            step="0.01"
                            inputMode="decimal"
                        />
                        <p style={{fontSize: '0.8rem', color: 'var(--text-secondary-color)', textAlign: 'center', marginTop: '5px'}}>
                            Mensal: {formatPercentage(cdiMonthly)} a.m. | Anual: {cdiAnnualInput}% a.a.
                        </p>
                    </div>

                    <div style={{marginTop: '15px', padding: '15px', backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)'}}>
                        <h5 style={{marginTop: '0', marginBottom: '15px', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '8px'}}>
                            📈 Projeções CDI Multi-Ano
                            <Tooltip text="Projeções baseadas no Boletim Focus do Banco Central. Usadas em simulações de longo prazo para maior precisão.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </h5>
                        <p style={{fontSize: '0.85rem', color: 'var(--text-secondary-color)', marginBottom: '15px', fontStyle: 'italic'}}>
                            Fonte: Boletim Focus - Banco Central do Brasil
                        </p>

                        <div className="form-group">
                            <label>CDI 2026 (%)</label>
                            <input 
                                type="number" 
                                value={cdi2026Input} 
                                onChange={e => setCdi2026Input(e.target.value)}
                                step="0.01"
                                inputMode="decimal"
                            />
                        </div>

                        <div className="form-group">
                            <label>CDI 2027 (%)</label>
                            <input 
                                type="number" 
                                value={cdi2027Input} 
                                onChange={e => setCdi2027Input(e.target.value)}
                                step="0.01"
                                inputMode="decimal"
                            />
                        </div>

                        <div className="form-group">
                            <label>CDI 2028 (%)</label>
                            <input 
                                type="number" 
                                value={cdi2028Input} 
                                onChange={e => setCdi2028Input(e.target.value)}
                                step="0.01"
                                inputMode="decimal"
                            />
                        </div>

                        <div style={{marginTop: '20px', padding: '15px', backgroundColor: 'var(--bg-color)', borderRadius: '6px'}}>
                            <h6 style={{margin: '0 0 10px 0', color: 'var(--text-secondary-color)', fontSize: '0.9rem'}}>📉 Curva de Projeção</h6>
                            <LineChart width={280} height={150} data={[
                                { year: new Date().getFullYear(), cdi: parseFloat(cdiAnnualInput) },
                                { year: 2026, cdi: parseFloat(cdi2026Input) },
                                { year: 2027, cdi: parseFloat(cdi2027Input) },
                                { year: 2028, cdi: parseFloat(cdi2028Input) }
                            ]} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                <XAxis dataKey="year" stroke="var(--text-secondary-color)" style={{fontSize: '0.75rem'}} />
                                <YAxis stroke="var(--text-secondary-color)" style={{fontSize: '0.75rem'}} domain={[8, 16]} />
                                <ChartTooltip 
                                    contentStyle={{backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '4px'}}
                                    formatter={(value: any) => `${value.toFixed(2)}%`}
                                    labelFormatter={(label) => `Ano: ${label}`}
                                />
                                <Line type="monotone" dataKey="cdi" stroke="var(--primary-color)" strokeWidth={2} dot={{fill: 'var(--primary-color)', r: 4}} />
                            </LineChart>
                            <p style={{fontSize: '0.75rem', color: 'var(--text-secondary-color)', textAlign: 'center', marginTop: '8px', marginBottom: '0'}}>
                                Taxas projetadas são aplicadas automaticamente em simulações de longo prazo
                            </p>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>
                            SELIC Anual (%)
                            <Tooltip text="Taxa básica de juros da economia brasileira, definida pelo Banco Central.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <input 
                            type="number" 
                            value={selicAnnualInput} 
                            onChange={e => setSelicAnnualInput(e.target.value)}
                            step="0.01"
                            inputMode="decimal"
                        />
                        <p style={{fontSize: '0.8rem', color: 'var(--text-secondary-color)', textAlign: 'center', marginTop: '5px'}}>
                            Mensal: {formatPercentage(selicMonthly)} a.m. | Anual: {selicAnnualInput}% a.a.
                        </p>
                    </div>

                    <h4 style={{marginTop: '20px', marginBottom: '10px', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '10px'}}>
                        📊 Outros Indicadores Econômicos
                        <button 
                            className="btn btn-primary" 
                            onClick={handleUpdateIndicators}
                            disabled={isLoadingIndicators}
                            style={{fontSize: '0.8rem', padding: '6px 12px', marginLeft: 'auto'}}
                        >
                            {isLoadingIndicators ? '⏳ Atualizando...' : '🔄 Atualizar via BACEN'}
                        </button>
                    </h4>

                    {settings.indicatorsLastUpdated && (
                        <p style={{fontSize: '0.75rem', color: 'var(--text-secondary-color)', fontStyle: 'italic', marginTop: '-5px', marginBottom: '15px'}}>
                            Última atualização: {new Date(settings.indicatorsLastUpdated).toLocaleString('pt-BR')}
                        </p>
                    )}

                    <div className="form-group">
                        <label>
                            IPCA (%)
                            <Tooltip text="Índice Nacional de Preços ao Consumidor Amplo - Mede a inflação oficial do país.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <input 
                            type="number" 
                            value={ipcaInput} 
                            onChange={e => setIpcaInput(e.target.value)}
                            step="0.01"
                            inputMode="decimal"
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            Dólar (R$)
                            <Tooltip text="Cotação do Dólar Americano em Reais.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <input 
                            type="number" 
                            value={usdBrlInput} 
                            onChange={e => setUsdBrlInput(e.target.value)}
                            step="0.01"
                            inputMode="decimal"
                        />
                    </div>

                    <h4 style={{marginTop: '20px', marginBottom: '10px', color: 'var(--primary-color)'}}>💸 Empréstimos</h4>
                    
                    <div className="form-group">
                        <label>
                            Taxa Padrão Mensal (%)
                            <Tooltip text="Taxa de juros padrão pré-preenchida nos simuladores de empréstimo.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <input 
                            type="number" 
                            value={loanRateInput} 
                            onChange={e => setLoanRateInput(e.target.value)}
                            step="0.01"
                            inputMode="decimal"
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            IOF Adicional Padrão (%)
                            <Tooltip text="IOF Adicional sobre operações de crédito. Taxa fixa: 0,38%.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <input 
                            type="number" 
                            value={iofRateInput} 
                            onChange={e => setIofRateInput(e.target.value)}
                            step="0.01"
                            inputMode="decimal"
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            IOF Diário Padrão (%)
                            <Tooltip text="IOF Diário sobre operações de crédito. Taxa típica: 0,0082% por dia (máximo 3%).">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <input 
                            type="number" 
                            value={iofDiarioRateInput} 
                            onChange={e => setIofDiarioRateInput(e.target.value)}
                            step="0.0001"
                            inputMode="decimal"
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            TAC Padrão (R$)
                            <Tooltip text="Taxa de Abertura de Crédito cobrada no início do empréstimo.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <input 
                            type="text" 
                            value={tacLoanInput} 
                            onChange={handleCurrencyChange(setTacLoanInput)}
                            inputMode="decimal"
                        />
                    </div>

                    <h4 style={{marginTop: '20px', marginBottom: '10px', color: 'var(--primary-color)'}}>📈 Investimentos</h4>
                    
                    <div className="form-group">
                        <label>
                            % CDI para LCA/LCI
                            <Tooltip text="Percentual do CDI que LCA/LCI costuma render. Típico: 90-100%.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <input 
                            type="number" 
                            value={lcaPercentInput} 
                            onChange={e => setLcaPercentInput(e.target.value)}
                            step="1"
                            inputMode="numeric"
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            % CDI para CDB/RDC
                            <Tooltip text="Percentual do CDI que CDB/RDC costuma render. Típico: 100-120%.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <input 
                            type="number" 
                            value={cdbPercentInput} 
                            onChange={e => setCdbPercentInput(e.target.value)}
                            step="1"
                            inputMode="numeric"
                        />
                    </div>

                    <h4 style={{marginTop: '20px', marginBottom: '10px', color: 'var(--primary-color)'}}>📝 Desconto de Recebíveis</h4>
                    
                    <div className="form-group">
                        <label>
                            Taxa TD Padrão Mensal (%)
                            <Tooltip text="Taxa de desconto padrão para antecipação de recebíveis.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <input 
                            type="number" 
                            value={tdRateInput} 
                            onChange={e => setTdRateInput(e.target.value)}
                            step="0.01"
                            inputMode="decimal"
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            TAC TD Padrão (R$)
                            <Tooltip text="Taxa de abertura de crédito padrão para desconto de recebíveis.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <input 
                            type="text" 
                            value={tacTDInput} 
                            onChange={handleCurrencyChange(setTacTDInput)}
                            inputMode="decimal"
                        />
                    </div>

                    <h4 style={{marginTop: '20px', marginBottom: '10px', color: 'var(--primary-color)'}}>🏢 Branding / Marca d'água</h4>
                    
                    <div className="form-group">
                        <label>
                            Nome da Empresa
                            <Tooltip text="Nome da sua empresa que será exibido no rodapé dos PDFs exportados.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <input 
                            type="text" 
                            value={companyNameInput} 
                            onChange={e => setCompanyNameInput(e.target.value)}
                            placeholder="Ex: Minha Empresa Ltda"
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            URL da Logo (opcional)
                            <Tooltip text="URL da logo da sua empresa para aparecer nos PDFs. Deixe em branco se não quiser usar.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <input 
                            type="text" 
                            value={logoUrlInput} 
                            onChange={e => setLogoUrlInput(e.target.value)}
                            placeholder="https://exemplo.com/logo.png"
                        />
                    </div>

                    <div style={{marginTop: '20px', padding: '10px', backgroundColor: 'var(--background-secondary)', borderRadius: '5px', fontSize: '0.85rem', color: 'var(--text-secondary-color)'}}>
                        <strong>Última atualização:</strong> {new Date(settings.lastUpdated).toLocaleString('pt-BR')}
                    </div>

                    <div className="btn-group" style={{marginTop: '20px'}}>
                        <button className="btn" onClick={handleSave}>💾 Salvar Configurações</button>
                        <button className="btn btn-secondary" onClick={handleReset}>🔄 Restaurar Padrões</button>
                    </div>
                </div>

                <div className="results-section">
                    <h3>ℹ️ Informações</h3>
                    <div className="no-results">
                        <div className="icon">⚙️</div>
                        <h3>Configurações Globais</h3>
                        <p style={{textAlign: 'center', lineHeight: '1.6'}}>
                            Estas configurações definem os valores padrão para todos os simuladores do aplicativo.
                            <br/><br/>
                            Ao alterar e salvar, os novos valores serão automaticamente pré-preenchidos em todos os calculadores.
                            <br/><br/>
                            <strong>Dica:</strong> Use o botão "Restaurar Padrões" para voltar aos valores originais do sistema.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InterestRateConverter = () => {
    const [rateInput, setRateInput] = useState('2.00');
    const [fromPeriod, setFromPeriod] = useState('month');
    const [toPeriod, setToPeriod] = useState('year');
    const [showFormulas, setShowFormulas] = useState(false);
    const [results, setResults] = useState(null);

    const periodOptions = [
        { value: 'day', label: 'Dia (a.d.)' },
        { value: 'month', label: 'Mês (a.m.)' },
        { value: 'year', label: 'Ano (a.a.)' }
    ];

    const periodFactors = {
        day: 1,
        month: 30,
        year: 360
    };

    const calculate = () => {
        const rate = parseFloat(rateInput) / 100;

        if (!rate || rate <= 0) {
            toast.error('Preencha uma taxa válida.');
            return;
        }

        const fromDays = periodFactors[fromPeriod];
        const toDays = periodFactors[toPeriod];

        const convertedCompound = Math.pow(1 + rate, fromDays / toDays) - 1;
        const convertedSimple = (rate * fromDays) / toDays;

        const dailyCompound = fromPeriod === 'day' ? rate : Math.pow(1 + rate, 1 / fromDays) - 1;
        const monthlyCompound = Math.pow(1 + dailyCompound, 30) - 1;
        const yearlyCompound = Math.pow(1 + dailyCompound, 360) - 1;

        setResults({
            convertedCompound,
            convertedSimple,
            dailyCompound,
            monthlyCompound,
            yearlyCompound
        });

        toast.success('Conversão realizada com sucesso!');
    };

    const exportToPDF = () => {
        console.log('[PDF Export] Iniciando exportação...');
        
        if (!results) {
            toast.error('Realize o cálculo primeiro.');
            return;
        }

        try {
            console.log('[PDF Export] Criando documento jsPDF...');
            const doc = new jsPDF();

            console.log('[PDF Export] Adicionando texto ao documento...');
            doc.setFontSize(16);
            doc.text('Conversão de Taxas de Juros', 20, 20);

            const summary = [
                { label: 'Taxa Original', value: `${rateInput}% ${periodOptions.find(p => p.value === fromPeriod)?.label || ''}` },
                { label: '', value: '' },
                { label: 'Conversão para ' + periodOptions.find(p => p.value === toPeriod)?.label, value: '' },
                { label: '  Taxa Composta', value: `${formatPercentage(results.convertedCompound)}` },
                { label: '  Taxa Simples', value: `${formatPercentage(results.convertedSimple)}` },
                { label: '', value: '' },
                { label: 'Taxas Equivalentes', value: '' },
                { label: '  Taxa Diária', value: formatPercentage(results.dailyCompound) + ' a.d.' },
                { label: '  Taxa Mensal', value: formatPercentage(results.monthlyCompound) + ' a.m.' },
                { label: '  Taxa Anual', value: formatPercentage(results.yearlyCompound) + ' a.a.' }
            ];

            console.log('[PDF Export] Adicionando resumo...');
            let yPos = 30;
            doc.setFontSize(10);
            summary.forEach(item => {
                if (item.label === '') {
                    yPos += 3;
                } else {
                    doc.text(`${item.label}: ${item.value}`, 20, yPos);
                    yPos += 6;
                }
            });

            console.log('[PDF Export] Salvando arquivo...');
            
            const blob = doc.output('blob');
            const url = URL.createObjectURL(blob);
            const newWindow = window.open(url, '_blank');
            
            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                console.log('[PDF Export] Popup bloqueado, usando link de download...');
                const link = document.createElement('a');
                link.href = url;
                link.download = `Conversao_Taxas_${Date.now()}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            
            console.log('[PDF Export] PDF exportado com sucesso!');
            toast.success('PDF aberto em nova aba! Use Ctrl+S ou o botão de download do navegador.');
        } catch (error) {
            console.error('[PDF Export] Erro ao exportar PDF:', error);
            toast.error('Erro ao exportar PDF: ' + error.message);
        }
    };

    return (
        <div className="calculator-container">
            <div className="calculator-layout">
                <div className="form-section">
                    <h3>🔄 Capitalização e Descapitalização de Taxas</h3>

                    <div className="form-group">
                        <label>
                            Taxa de Juros (%)
                            <Tooltip text="Informe a taxa percentual que deseja converter.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <input 
                            type="number" 
                            value={rateInput} 
                            onChange={e => setRateInput(e.target.value)}
                            step="0.01"
                            inputMode="decimal"
                            placeholder="Ex: 2.00"
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            Período Origem
                            <Tooltip text="Período em que a taxa está expressa atualmente.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <select value={fromPeriod} onChange={e => setFromPeriod(e.target.value)}>
                            {periodOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>
                            Período Destino
                            <Tooltip text="Período para o qual deseja converter a taxa.">
                                <span className="tooltip-icon">?</span>
                            </Tooltip>
                        </label>
                        <select value={toPeriod} onChange={e => setToPeriod(e.target.value)}>
                            {periodOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    <button className="btn" onClick={calculate}>🔍 Converter Taxa</button>

                    {results && (
                        <div style={{marginTop: '20px'}}>
                            <button 
                                className="btn btn-secondary" 
                                onClick={() => setShowFormulas(!showFormulas)}
                                style={{width: '100%'}}
                            >
                                {showFormulas ? '📐 Ocultar Fórmulas' : '📐 Mostrar Fórmulas'}
                            </button>
                        </div>
                    )}

                    {showFormulas && (
                        <div style={{
                            marginTop: '15px', 
                            padding: '15px', 
                            backgroundColor: 'var(--background-secondary)', 
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            lineHeight: '1.8'
                        }}>
                            <h4 style={{marginTop: 0, color: 'var(--primary-color)'}}>📐 Fórmulas Utilizadas</h4>
                            
                            <p><strong>Capitalização/Descapitalização (Composta):</strong><br/>
                            i_convertida = (1 + i)^(n₁/n₂) - 1</p>
                            
                            <p><strong>Conversão Linear (Simples):</strong><br/>
                            i_convertida = (i × n₁) / n₂</p>
                            
                            <p><strong>Taxas Equivalentes:</strong><br/>
                            i_diária = (1 + i_origem)^(1/dias_origem) - 1<br/>
                            i_mensal = (1 + i_diária)^30 - 1<br/>
                            i_anual = (1 + i_diária)^360 - 1</p>
                            
                            <p style={{fontSize: '0.75rem', color: 'var(--text-secondary-color)', marginBottom: 0}}>
                            Onde: i = Taxa, n₁ = Dias período origem, n₂ = Dias período destino
                            </p>
                        </div>
                    )}

                    <div style={{marginTop: '20px', padding: '15px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--border-color)'}}>
                        <p style={{fontSize: '0.85rem', color: 'var(--text-secondary-color)', margin: '0'}}>
                            💡 <strong>Dica:</strong> Use <strong>capitalização</strong> para converter de períodos menores para maiores (ex: mensal → anual). Use <strong>descapitalização</strong> para o contrário (ex: anual → mensal).
                        </p>
                    </div>
                </div>

                <div className="results-section">
                    {!results ? (
                        <NoResults message="Preencha os campos e clique em 'Converter Taxa' para ver os resultados." />
                    ) : (
                        <>
                            <h3>📊 Resultados da Conversão</h3>

                            <div className="result-card">
                                <h4>🔄 Taxa Convertida</h4>
                                <div className="result-item">
                                    <span className="label">Taxa Original:</span>
                                    <span className="value">{rateInput}% {periodOptions.find(p => p.value === fromPeriod)?.label || ''}</span>
                                </div>
                                <div className="result-item">
                                    <span className="label">Conversão Composta:</span>
                                    <span className="value highlight">{formatPercentage(results.convertedCompound)} {periodOptions.find(p => p.value === toPeriod)?.label || ''}</span>
                                </div>
                                <div className="result-item">
                                    <span className="label">Conversão Linear (Simples):</span>
                                    <span className="value">{formatPercentage(results.convertedSimple)} {periodOptions.find(p => p.value === toPeriod)?.label || ''}</span>
                                </div>
                            </div>

                            <div className="result-card">
                                <h4>📈 Taxas Equivalentes (Juros Compostos)</h4>
                                <div className="result-item">
                                    <span className="label">Taxa Diária:</span>
                                    <span className="value">{formatPercentage(results.dailyCompound)} a.d.</span>
                                </div>
                                <div className="result-item">
                                    <span className="label">Taxa Mensal:</span>
                                    <span className="value">{formatPercentage(results.monthlyCompound)} a.m.</span>
                                </div>
                                <div className="result-item">
                                    <span className="label">Taxa Anual:</span>
                                    <span className="value">{formatPercentage(results.yearlyCompound)} a.a.</span>
                                </div>
                            </div>

                            <div className="result-card" style={{backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)'}}>
                                <h4>ℹ️ Informações Importantes</h4>
                                <p style={{fontSize: '0.85rem', margin: '0', lineHeight: '1.6', color: 'var(--text-secondary-color)'}}>
                                    <strong>Conversão Composta:</strong> Considera o efeito de capitalização exponencial (juros sobre juros). Mais precisa para operações financeiras reais.
                                    <br/><br/>
                                    <strong>Conversão Linear:</strong> Utiliza proporcionalidade simples. Aproximação mais básica, sem considerar capitalização.
                                    <br/><br/>
                                    <strong>Taxas Equivalentes:</strong> Representam a mesma rentabilidade em períodos diferentes usando capitalização composta.
                                </p>
                            </div>

                            <div className="btn-group" style={{marginTop: '20px'}}>
                                <button className="btn" onClick={exportToPDF}>📄 Exportar PDF</button>
                                <button className="btn btn-secondary" onClick={() => exportToCSV({
                                    headers: ['Descrição', 'Valor'],
                                    rows: [
                                        ['Taxa Original', `${rateInput}% ${periodOptions.find(p => p.value === fromPeriod)?.label || ''}`],
                                        ['Conversão Composta', `${formatPercentage(results.convertedCompound)} ${periodOptions.find(p => p.value === toPeriod)?.label || ''}`],
                                        ['Conversão Linear', `${formatPercentage(results.convertedSimple)} ${periodOptions.find(p => p.value === toPeriod)?.label || ''}`],
                                        ['Taxa Diária Equivalente', `${formatPercentage(results.dailyCompound)} a.d.`],
                                        ['Taxa Mensal Equivalente', `${formatPercentage(results.monthlyCompound)} a.m.`],
                                        ['Taxa Anual Equivalente', `${formatPercentage(results.yearlyCompound)} a.a.`]
                                    ]
                                }, 'conversao-taxas.csv')}>📊 Exportar CSV</button>
                                <button className="btn btn-secondary" onClick={() => {
                                    const shareData = shareSimulation(results, 'Conversão de Taxas');
                                    if (shareData) {
                                        window.open(shareData.whatsappUrl, '_blank');
                                    }
                                }}>
                                    💬 Compartilhar no WhatsApp
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const TutorialOverlay = ({ onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    
    const tutorialSteps = [
        {
            title: '👋 Bem-vindo ao Salva Bancário!',
            description: 'Este é o seu canivete suíço de ferramentas financeiras. Vamos fazer um tour rápido pelas funcionalidades principais.',
            position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
            spotlight: null
        },
        {
            title: '💰 Simuladores de Investimento',
            description: 'Compare rentabilidades entre LCA/LCI e CDB/RDC com diferentes taxas e prazos.',
            position: { top: '30%', left: '20%' },
            spotlight: null
        },
        {
            title: '💸 Empréstimos',
            description: 'Calcule empréstimos prefixados ou pós-fixados com sistemas SAC ou Price.',
            position: { top: '40%', left: '30%' },
            spotlight: null
        },
        {
            title: '⚙️ Definições',
            description: 'Configure taxas padrão (CDI, SELIC, taxas de empréstimo) e personalize seus PDFs com o nome da sua empresa.',
            position: { top: '50%', left: '40%' },
            spotlight: null
        },
        {
            title: '🗂️ Histórico e Comparação',
            description: 'Todas as suas simulações são salvas automaticamente. Você pode comparar até 4 simulações lado a lado!',
            position: { top: '60%', left: '30%' },
            spotlight: null
        },
        {
            title: '⌨️ Atalhos de Teclado',
            description: 'Use ESC para voltar ao menu, ENTER para calcular, e Ctrl/Cmd+K para abrir as definições rapidamente.',
            position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
            spotlight: null
        }
    ];
    
    const step = tutorialSteps[currentStep];
    
    const handleNext = () => {
        if (currentStep < tutorialSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleFinish();
        }
    };
    
    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    
    const handleSkip = () => {
        if (confirm('Deseja pular o tutorial? Você pode revê-lo a qualquer momento clicando no botão "?" no canto inferior direito.')) {
            handleFinish();
        }
    };
    
    const handleFinish = () => {
        localStorage.setItem('tutorialCompleted', 'true');
        toast.success('Tutorial concluído! Clique no "?" se precisar de ajuda.');
        onClose();
    };
    
    return (
        <>
            <div className="tutorial-overlay" onClick={handleSkip}></div>
            {step.spotlight && <div className="tutorial-spotlight" style={step.spotlight}></div>}
            <div className="tutorial-tooltip" style={step.position} onClick={e => e.stopPropagation()}>
                <div className="tutorial-progress">Passo {currentStep + 1} de {tutorialSteps.length}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div className="tutorial-controls">
                    <button className="btn btn-secondary" onClick={handleSkip} style={{fontSize: '0.9rem', padding: '8px 15px'}}>
                        Pular Tutorial
                    </button>
                    <div style={{display: 'flex', gap: '10px'}}>
                        {currentStep > 0 && (
                            <button className="btn btn-secondary" onClick={handlePrevious} style={{fontSize: '0.9rem', padding: '8px 15px'}}>
                                ← Anterior
                            </button>
                        )}
                        <button className="btn" onClick={handleNext} style={{fontSize: '0.9rem', padding: '8px 15px'}}>
                            {currentStep === tutorialSteps.length - 1 ? '✓ Concluir' : 'Próximo →'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

const EconomicIndicators = ({ setView }) => {
    const { settings } = useSettings();

    return (
        <div className="calculator-container">
            <div className="calculator-layout">
                <div className="form-section">
                    <h3>📊 Indicadores Econômicos</h3>
                    
                    {settings.indicatorsLastUpdated && (
                        <p style={{fontSize: '0.85rem', color: 'var(--text-secondary-color)', fontStyle: 'italic', textAlign: 'center', marginBottom: '20px'}}>
                            Última atualização: {new Date(settings.indicatorsLastUpdated).toLocaleString('pt-BR')}
                        </p>
                    )}

                    <div style={{display: 'grid', gap: '15px'}}>
                        <div style={{padding: '15px', backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '2px solid var(--primary-color)'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <span style={{fontSize: '1rem', fontWeight: 'bold', color: 'var(--primary-color)'}}>CDI</span>
                                <span style={{fontSize: '1.3rem', fontWeight: 'bold'}}>{((settings.cdiAnnual || DEFAULT_SETTINGS.cdiAnnual) * 100).toFixed(2)}%</span>
                            </div>
                            <p style={{fontSize: '0.75rem', color: 'var(--text-secondary-color)', margin: '5px 0 0 0'}}>Certificado de Depósito Interbancário</p>
                        </div>

                        <div style={{padding: '15px', backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '2px solid var(--success-color)'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <span style={{fontSize: '1rem', fontWeight: 'bold', color: 'var(--success-color)'}}>SELIC</span>
                                <span style={{fontSize: '1.3rem', fontWeight: 'bold'}}>{((settings.selicAnnual || DEFAULT_SETTINGS.selicAnnual) * 100).toFixed(2)}%</span>
                            </div>
                            <p style={{fontSize: '0.75rem', color: 'var(--text-secondary-color)', margin: '5px 0 0 0'}}>Taxa Básica de Juros</p>
                        </div>

                        <div style={{padding: '15px', backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '2px solid #f59e0b'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <span style={{fontSize: '1rem', fontWeight: 'bold', color: '#f59e0b'}}>IPCA</span>
                                <span style={{fontSize: '1.3rem', fontWeight: 'bold'}}>{((settings.ipca || DEFAULT_SETTINGS.ipca) * 100).toFixed(2)}%</span>
                            </div>
                            <p style={{fontSize: '0.75rem', color: 'var(--text-secondary-color)', margin: '5px 0 0 0'}}>Índice de Preços ao Consumidor</p>
                        </div>

                        <div style={{padding: '15px', backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '2px solid #10b981'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <span style={{fontSize: '1rem', fontWeight: 'bold', color: '#10b981'}}>Dólar</span>
                                <span style={{fontSize: '1.3rem', fontWeight: 'bold'}}>R$ {(settings.usdBrl || DEFAULT_SETTINGS.usdBrl).toFixed(2)}</span>
                            </div>
                            <p style={{fontSize: '0.75rem', color: 'var(--text-secondary-color)', margin: '5px 0 0 0'}}>USD/BRL - Dólar Americano</p>
                        </div>
                    </div>

                    <div style={{marginTop: '20px', padding: '15px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--border-color)'}}>
                        <p style={{fontSize: '0.85rem', color: 'var(--text-secondary-color)', margin: '0'}}>
                            💡 <strong>Dica:</strong> Para atualizar os indicadores automaticamente via API do Banco Central, acesse <strong>Definições</strong> e clique em "Atualizar via BACEN".
                        </p>
                    </div>

                    <div className="action-buttons">
                        <button className="btn btn-secondary" onClick={() => setView('home')}>← Voltar ao Menu</button>
                        <button className="btn btn-primary" onClick={() => setView('settings')}>⚙️ Ir para Definições</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MainMenu = ({ setView }) => {
    return (
        <>
            <div className="header">
                <h1>Salva Bancário</h1>
                <p>Seu canivete suíço de ferramentas financeiras.</p>
            </div>
            <div className="card-grid">
                <FeatureCard icon="📊" title="Indicadores Econômicos" description="Visualize CDI, SELIC, IPCA e Dólar." onClick={() => setView('indicators')} />
                <FeatureCard icon="💰" title="Simular Investimento" description="Compare a rentabilidade de LCA/LCI e CDB/RDC." onClick={() => setView('investment')} />
                <FeatureCard icon="🗓️" title="Aplicação Programada" description="Simule o acúmulo de patrimônio com aportes mensais." onClick={() => setView('scheduledApplication')} />
                <FeatureCard icon="🧾" title="Desconto de Recebíveis" description="Simule a antecipação de boletos e cheques." onClick={() => setView('receivablesDiscount')} />
                <FeatureCard icon="💸" title="Empréstimo Prefixado" description="Calcule empréstimos com taxas de juros fixas." onClick={() => setView('loanPre')} />
                <FeatureCard icon="📈" title="Empréstimo Pós-fixado" description="Simule empréstimos atrelados ao CDI." onClick={() => setView('loanPost')} />
                <FeatureCard icon="🌾" title="Crédito Rural" description="Simule financiamentos rurais com carência e sistemas SAC/PRICE." onClick={() => setView('ruralCredit')} />
                <FeatureCard icon="🏦" title="Taxa do Concorrente" description="Descubra a taxa de juros de um empréstimo." onClick={() => setView('competitorRate')} />
                <FeatureCard icon="🔄" title="Conversão de Taxas" description="Capitalize e descapitalize taxas entre diferentes períodos." onClick={() => setView('rateConverter')} />
                <FeatureCard icon="🔍" title="Comparador" description="Compare lado a lado duas simulações salvas." onClick={() => setView('comparison')} />
                <FeatureCard icon="🗂️" title="Histórico" description="Veja e compare suas simulações salvas." onClick={() => setView('history')} />
                <FeatureCard icon="⚙️" title="Definições" description="Configure valores padrão do aplicativo." onClick={() => setView('settings')} />
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
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [showTutorial, setShowTutorial] = useState(false);

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
    
    useEffect(() => {
        const tutorialCompleted = localStorage.getItem('tutorialCompleted');
        if (!tutorialCompleted) {
            setTimeout(() => setShowTutorial(true), 1000);
        }
    }, []);
    
    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            localStorage.setItem('lastOnline', new Date().toISOString());
            toast.success('Conexão restaurada! Você está online.');
        };
        
        const handleOffline = () => {
            setIsOnline(false);
            toast.error('Modo offline ativado. Suas alterações serão salvas localmente.');
        };
        
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && currentView !== 'main') {
                setCurrentView('main');
                toast('Voltando ao menu principal...', { icon: '🏠' });
            }
            
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setCurrentView('settings');
                toast('Abrindo definições...', { icon: '⚙️' });
            }
            
            if (e.key === 'Enter' && currentView !== 'main') {
                const calculateButton = document.querySelector('button.btn:not(.btn-secondary)');
                if (calculateButton && calculateButton.textContent?.includes('Calcular')) {
                    (calculateButton as HTMLElement).click();
                }
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
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
            case 'indicators':
                return <EconomicIndicators setView={setCurrentView} />;
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
            case 'settings':
                return <SettingsMenu />;
            case 'rateConverter':
                return <InterestRateConverter />;
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
            <div className="app-container view-transition">
                 {currentView !== 'main' && (
                     <div>
                         <button className="btn btn-secondary no-print" onClick={() => setCurrentView('main')} style={{maxWidth: '200px', marginBottom: '20px'}}>
                             Voltar ao Menu
                         </button>
                         <div className="keyboard-hint">Atalho: ESC</div>
                     </div>
                 )}
                {renderCurrentView()}
            </div>
            
            {!isOnline && (
                <div className="offline-badge">
                    📡 Modo Offline
                </div>
            )}
            
            <button 
                className="help-button no-print" 
                onClick={() => setShowTutorial(true)}
                aria-label="Ajuda / Tutorial"
            >
                ?
            </button>
            
            {modal === 'history' && <HistoryModal history={history} onClose={() => setModal(null)} onLoad={handleLoadSimulation} onClear={handleClearHistory} />}
            {modal === 'comparison' && <ComparisonTool history={history} onClose={() => setModal(null)} />}
            {showTutorial && <TutorialOverlay onClose={() => setShowTutorial(false)} />}
        </>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('PWA: Service Worker registrado com sucesso:', registration.scope);
            })
            .catch((error) => {
                console.log('PWA: Falha ao registrar Service Worker:', error);
            });
    });
}
