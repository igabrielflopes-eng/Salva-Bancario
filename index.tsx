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

  .calculator-container, .indicators-container, .history-container, .comparison-container, .settings-container {
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

  .form-section h3, .results-section h3, .indicators-container h3, .history-container h3, .print-only h3, .comparison-container h3, .settings-container h3 {
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

  .indicators-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .indicator-card {
    background: var(--card-bg);
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
    border: 1px solid var(--border-color);
    background-color: var(--btn-tertiary-bg);
    color: var(--text-color);
    font-weight: 500;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  }
  
  .indicator-tabs button:hover:not(.active), .period-filters button:hover:not(.active) {
    background-color: var(--btn-tertiary-hover-bg);
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
    position: relative;
    cursor: crosshair;
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
    .theme-toggle-btn {
      top: 10px;
      right: 10px;
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
        box-shadow: var(--box-shadow-light);
    }
    
    .results-section .table-container td, .modal-content .table-container td {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        text-align: right;
        border-bottom: 1px solid #444; /* Use a slightly different color for dark mode card dividers */
        font-size: 0.9rem;
    }
    
    body[data-theme="light"] .results-section .table-container td,
    body[data-theme="light"] .modal-content .table-container td {
        border-bottom-color: #f0f0f0;
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
type UserSettings = {
    defaultLoanRate?: string;
    defaultTac?: string;
    defaultRuralRate?: string;
};


interface AmortizationRow {
  month: number;
  installment: number;
  interest: number;
  amortization: number;
  balance: number;
  extraAmortization?: number;
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

const handleCurrencyInputChange = (e: React.ChangeEvent<HTMLInputElement>): string => {
    const rawValue = e.target.value.replace(/\D/g, '');
    if (!rawValue || parseInt(rawValue, 10) === 0) {
        return '0,00';
    }

    const value = parseInt(rawValue, 10);
    const formattedValue = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
    }).format(value / 100);

    return formattedValue;
};

const parseFormattedCurrency = (value: string): number => {
    if (!value) return 0;
    return parseFloat(value.replace(/\./g, '').replace(',', '.'));
}


const HelpTooltip = ({ text }: { text: string }) => (
    <div className="tooltip-container">
        <span className="tooltip-icon">?</span>
        <span className="tooltip-text">{text}</span>
    </div>
);

const LoanCalculator = ({ onBack, onSave, userSettings }: { onBack: () => void, onSave: (calc: Omit<Calculation, 'id'>) => void, userSettings: UserSettings }) => {
  const [amount, setAmount] = useState('100.000,00');
  const [rate, setRate] = useState(userSettings.defaultLoanRate || '1');
  const [term, setTerm] = useState('360');
  const [amortizationType, setAmortizationType] = useState<AmortizationType>('price');
  const [calculateIof, setCalculateIof] = useState(false);
  const [financeIof, setFinanceIof] = useState(false);
  const [results, setResults] = useState<any | null>(null);

  // Extra Amortization State
  const [showExtraAmortization, setShowExtraAmortization] = useState(false);
  const [extraAmount, setExtraAmount] = useState('10.000,00');
  const [extraStartMonth, setExtraStartMonth] = useState('12');
  const [extraFrequency, setExtraFrequency] = useState('single'); // 'single', 'monthly'
  const [extraGoal, setExtraGoal] = useState('term'); // 'term', 'installment'

  const resetForm = () => {
    setAmount('100.000,00');
    setRate(userSettings.defaultLoanRate || '1');
    setTerm('360');
    setAmortizationType('price');
    setCalculateIof(false);
    setFinanceIof(false);
    setResults(null);
    setShowExtraAmortization(false);
    setExtraAmount('10.000,00');
    setExtraStartMonth('12');
    setExtraFrequency('single');
    setExtraGoal('term');
  };

  const calculateLoan = () => {
    const loanAmount = parseFormattedCurrency(amount);
    const monthlyRate = parseFloat(rate) / 100;
    const loanTerm = parseInt(term, 10);

    const doExtraAmortization = showExtraAmortization;
    const extraPmtAmount = doExtraAmortization ? parseFormattedCurrency(extraAmount) : 0;
    const startMonth = doExtraAmortization ? parseInt(extraStartMonth, 10) : 0;

    if (isNaN(loanAmount) || isNaN(monthlyRate) || isNaN(loanTerm) || loanAmount <= 0 || monthlyRate <= 0 || loanTerm <= 0 || (doExtraAmortization && (isNaN(extraPmtAmount) || isNaN(startMonth) || extraPmtAmount <= 0 || startMonth <= 0))) {
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

    // --- Calculation without extra amortization for comparison ---
    let originalTotalInterest = 0;
    if (amortizationType === 'price') {
        const originalPmt = principal * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
        originalTotalInterest = (originalPmt * loanTerm) - principal;
    } else { // SAC
        let tempBalance = principal;
        const tempAmort = principal / loanTerm;
        for (let i=0; i < loanTerm; i++) {
            originalTotalInterest += tempBalance * monthlyRate;
            tempBalance -= tempAmort;
        }
    }


    const table: AmortizationRow[] = [];
    let balance = principal;
    let totalInterest = 0;
    let totalExtraAmortization = 0;

    let pmt = amortizationType === 'price'
        ? principal * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1)
        : 0;
    let sacAmortization = amortizationType === 'sac' ? principal / loanTerm : 0;
    
    for (let i = 1; i <= loanTerm; i++) {
        if (balance <= 0.01) break;

        const interest = balance * monthlyRate;
        totalInterest += interest;

        let amortization = 0;
        if (amortizationType === 'price') {
            amortization = pmt - interest;
        } else { // SAC
            amortization = sacAmortization;
        }

        if (balance < amortization) {
            amortization = balance;
        }

        let currentExtraAmortization = 0;
        if (doExtraAmortization && i >= startMonth) {
            if ((extraFrequency === 'single' && i === startMonth) || extraFrequency === 'monthly') {
                currentExtraAmortization = extraPmtAmount;
            }
        }

        if (balance - amortization < currentExtraAmortization) {
            currentExtraAmortization = balance - amortization;
        }
        
        const installment = amortization + interest;
        balance -= (amortization + currentExtraAmortization);
        totalExtraAmortization += currentExtraAmortization;

        table.push({
            month: i,
            installment: installment,
            interest,
            amortization,
            balance: balance < 0.01 ? 0 : balance,
            extraAmortization: currentExtraAmortization
        });

        if (balance <= 0.01) {
            balance = 0;
        }
        
        if (currentExtraAmortization > 0 && extraGoal === 'installment') {
            const remainingTerm = loanTerm - i;
            if (remainingTerm > 0 && balance > 0) {
                if (amortizationType === 'price') {
                    pmt = balance * (monthlyRate * Math.pow(1 + monthlyRate, remainingTerm)) / (Math.pow(1 + monthlyRate, remainingTerm) - 1);
                    if (isNaN(pmt)) pmt = balance + (balance * monthlyRate);
                } else { // SAC
                    sacAmortization = balance / remainingTerm;
                }
            } else {
                 pmt = 0;
                 sacAmortization = 0;
            }
        }
        
        if (balance <= 0) break;
    }
    
    const finalTerm = table.length > 0 ? table[table.length - 1].month : 0;

    setResults({
        table,
        totalInterest,
        totalPaid: principal + totalInterest,
        calculatedIof: totalIof,
        lastInstallment: amortizationType === 'sac' ? [...table].reverse().find(r => r.installment > 0)?.installment : undefined,
        extra: doExtraAmortization ? {
            totalExtraAmortization,
            interestSaved: originalTotalInterest - totalInterest,
            originalTerm: loanTerm,
            newTerm: finalTerm,
            reductionType: extraGoal
        } : null
    });
  };
  
  const handleSave = () => {
      if (!results) return;
      onSave({
          type: 'Empréstimo',
          description: `${formatCurrency(parseFormattedCurrency(amount))} em ${term} meses (${amortizationType.toUpperCase()})${showExtraAmortization ? ' c/ Amort. Extra' : ''}`,
          data: { 
              inputs: { 
                  amount, rate, term, amortizationType, calculateIof, financeIof, 
                  showExtraAmortization, extraAmount, extraStartMonth, extraFrequency, extraGoal 
              }, 
              results 
          }
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
              <input id="amount" type="text" value={amount} onChange={e => setAmount(handleCurrencyInputChange(e))} placeholder="Ex: 100.000,00" />
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
              <label htmlFor="amortization">
                Tipo de Amortização
                <HelpTooltip text="Tabela Price: Parcelas fixas, com juros decrescentes e amortização crescente. SAC: Amortização constante, resultando em parcelas decrescentes." />
              </label>
              <select id="amortization" value={amortizationType} onChange={e => setAmortizationType(e.target.value as AmortizationType)}>
                <option value="price">Tabela Price</option>
                <option value="sac">SAC</option>
              </select>
            </div>
            <div className="form-group">
                <label>
                    <input type="checkbox" checked={calculateIof} onChange={e => {
                        setCalculateIof(e.target.checked);
                        if (!e.target.checked) {
                            setFinanceIof(false);
                        }
                    }} style={{ width: 'auto', margin: 0 }} />
                    Calcular IOF
                    <HelpTooltip text="IOF (Imposto sobre Operações Financeiras) é um tributo federal que incide sobre operações de crédito. Alíquota: 0,38% (fixo) + 0,0082% ao dia (limitado a 365 dias)." />
                </label>
            </div>
            {calculateIof && (
                <div className="form-group">
                    <label>
                        <input type="checkbox" checked={financeIof} onChange={e => setFinanceIof(e.target.checked)} style={{ width: 'auto', margin: 0 }} />
                        Financiar IOF
                    </label>
                </div>
            )}
            
            {/* Extra Amortization Section */}
            <div className="form-group">
                <label>
                    <input type="checkbox" checked={showExtraAmortization} onChange={e => setShowExtraAmortization(e.target.checked)} style={{ width: 'auto', margin: 0 }} />
                    Adicionar Amortização Extraordinária
                </label>
            </div>
            {showExtraAmortization && (
                <fieldset style={{ border: '1px solid var(--border-color)', borderRadius: '5px', padding: '15px', marginBottom: '20px' }}>
                    <legend style={{ padding: '0 5px', marginLeft: '10px', fontWeight: '500' }}>Opções de Amortização Extra</legend>
                    <div className="form-group">
                        <label htmlFor="extraAmount">Valor do Pagamento Extra (R$)</label>
                        <input id="extraAmount" type="text" value={extraAmount} onChange={e => setExtraAmount(handleCurrencyInputChange(e))} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="extraStartMonth">Mês de Início</label>
                        <input id="extraStartMonth" type="number" value={extraStartMonth} onChange={e => setExtraStartMonth(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="extraFrequency">Frequência</label>
                        <select id="extraFrequency" value={extraFrequency} onChange={e => setExtraFrequency(e.target.value)}>
                            <option value="single">Pagamento Único</option>
                            <option value="monthly">Recorrente (Mensal)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="extraGoal">Objetivo</label>
                        <select id="extraGoal" value={extraGoal} onChange={e => setExtraGoal(e.target.value)}>
                            <option value="term">Reduzir o Prazo</option>
                            <option value="installment">Reduzir Valor da Parcela</option>
                        </select>
                    </div>
                </fieldset>
            )}

            <button className="btn" onClick={calculateLoan}>Calcular</button>
            <button className="btn btn-secondary" onClick={resetForm}>Limpar</button>
            <button className="btn btn-secondary" onClick={onBack}>Voltar</button>
            {results && <button className="btn" onClick={resetForm}>Nova Simulação</button>}
          </div>

          <div className="results-section">
            <div className="print-only">
              <h3>Demonstrativo de Empréstimo</h3>
              <p><strong>Valor do Empréstimo:</strong> {formatCurrency(parseFormattedCurrency(amount))}</p>
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
                          <p>{formatCurrency(parseFormattedCurrency(amount) + results.calculatedIof)}</p>
                      </div>
                  )}
                </div>
                
                {results.extra && results.extra.totalExtraAmortization > 0 && (
                    <>
                        <h4 style={{marginTop: '30px'}}>Impacto da Amortização Extraordinária</h4>
                        <div className="results-summary">
                            <div className="summary-item">
                                <h4>Economia de Juros</h4>
                                <p className="positive">{formatCurrency(results.extra.interestSaved)}</p>
                            </div>
                            {results.extra.reductionType === 'term' && (
                                <div className="summary-item">
                                    <h4>Prazo Reduzido</h4>
                                    <p>{results.extra.originalTerm} → {results.extra.newTerm} meses</p>
                                </div>
                            )}
                            <div className="summary-item">
                                <h4>Total Amortizado Extra</h4>
                                <p>{formatCurrency(results.extra.totalExtraAmortization)}</p>
                            </div>
                        </div>
                    </>
                )}


                <h4>Demonstrativo Analítico</h4>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Mês</th>
                                <th>Parcela</th>
                                <th>Juros</th>
                                <th>Amortização</th>
                                <th>Amort. Extra</th>
                                <th>Saldo Devedor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.table.map((row: AmortizationRow) => (
                                <tr key={row.month}>
                                    <td data-label="Mês">{row.month}</td>
                                    <td data-label="Parcela">{formatCurrency(row.installment)}</td>
                                    <td data-label="Juros">{formatCurrency(row.interest)}</td>
                                    <td data-label="Amortização">{formatCurrency(row.amortization)}</td>
                                    <td data-label="Amort. Extra">{formatCurrency(row.extraAmortization || 0)}</td>
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

const CheckDiscountCalculator = ({ onBack, onSave, userSettings }: { onBack: () => void, onSave: (calc: Omit<Calculation, 'id'>) => void, userSettings: UserSettings }) => {
    type Check = { id: number; value: string; date: string };
    
    const getInitialDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 30);
        return today.toISOString().split('T')[0];
    };
    
    const [checks, setChecks] = useState<Check[]>([]);
    const [newCheckValue, setNewCheckValue] = useState('1.000,00');
    const [newCheckDate, setNewCheckDate] = useState(getInitialDate());
    const [interestRate, setInterestRate] = useState('3');
    const [calculateIof, setCalculateIof] = useState(true);
    const [tac, setTac] = useState(userSettings.defaultTac || '50,00');
    const [results, setResults] = useState<{ netAmount: number, totalCost: number, originalValue: number, calculatedIof: number, totalInterest: number, tacValue: number } | null>(null);
    const [editingCheck, setEditingCheck] = useState<Check | null>(null);

    const resetForm = () => {
        setChecks([]);
        setNewCheckValue('1.000,00');
        setNewCheckDate(getInitialDate());
        setInterestRate('3');
        setCalculateIof(true);
        setTac(userSettings.defaultTac || '50,00');
        setResults(null);
        setEditingCheck(null);
    };

    const handleAddCheck = () => {
        const value = parseFormattedCurrency(newCheckValue);
        if (isNaN(value) || value <= 0 || !newCheckDate) return;
        setChecks(prev => [...prev, { id: Date.now(), value: newCheckValue, date: newCheckDate }]);
        setNewCheckValue('1.000,00');
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
        const tacValue = parseFormattedCurrency(tac);

        if (isNaN(rate) || isNaN(tacValue) || checks.length === 0) {
            setResults(null);
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let totalInterest = 0;
        const totalOriginalValue = checks.reduce((sum, check) => sum + parseFormattedCurrency(check.value), 0);

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
                    iofDaily += parseFormattedCurrency(check.value) * 0.000082 * iofDays;
                }
            });

            totalIof = iofAdditional + iofDaily;
        }


        checks.forEach(check => {
            const checkDate = new Date(check.date);
            const utcCheckDate = new Date(checkDate.getUTCFullYear(), checkDate.getUTCMonth(), checkDate.getUTCDate());
            const days = Math.ceil((utcCheckDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            if (days > 0) {
                totalInterest += parseFormattedCurrency(check.value) * rate * (days / 30);
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
                            <input id="newCheckValue" type="text" value={newCheckValue} onChange={e => setNewCheckValue(handleCurrencyInputChange(e))} />
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
                        <input id="tac" type="text" value={tac} onChange={e => setTac(handleCurrencyInputChange(e))} />
                    </div>
                    <div className="form-group">
                      <label>
                        <input type="checkbox" checked={calculateIof} onChange={e => setCalculateIof(e.target.checked)} style={{ width: 'auto', margin: 0 }} />
                        Calcular IOF
                        <HelpTooltip text="IOF (Imposto sobre Operações Financeiras) é um tributo federal que incide sobre operações de crédito. Para desconto de cheques, a alíquota é de 0,38% (fixo) + 0,0082% ao dia." />
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
                        <p><strong>TAC:</strong> {formatCurrency(parseFormattedCurrency(tac))}</p>
                        <p><strong>Cálculo de IOF:</strong> {calculateIof ? 'Sim' : 'Não'}</p>
                        <h4>Cheques:</h4>
                        <table>
                            <thead><tr><th>Valor</th><th>Vencimento</th></tr></thead>
                            <tbody>
                                {checks.map(c => <tr key={c.id}><td>{formatCurrency(parseFormattedCurrency(c.value))}</td><td>{new Date(c.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td></tr>)}
                            </tbody>
                        </table>
                    </div>
                    <h3>Cheques Adicionados</h3>
                    <div style={{ maxHeight: '180px', overflowY: 'auto', marginBottom: '20px' }} className="no-print">
                        {checks.length > 0 ? checks.map(check => (
                            <div key={check.id} className="check-list-item">
                                {editingCheck?.id === check.id ? (
                                    <>
                                        <input type="text" value={editingCheck.value} onChange={e => setEditingCheck({...editingCheck, value: handleCurrencyInputChange(e)})} />
                                        <input type="date" value={editingCheck.date} onChange={e => setEditingCheck({...editingCheck, date: e.target.value})} />
                                        <div>
                                            <button className="btn btn-small" onClick={handleSaveEdit}>Salvar</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <span>{formatCurrency(parseFormattedCurrency(check.value))}</span>
                                        <span>{new Date(check.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>
                                        <div>
                                            <button className="btn btn-small btn-secondary" onClick={() => handleStartEditing(check)}>Editar</button>
                                            <button className="btn btn-small btn-danger" onClick={() => handleDeleteCheck(check.id)}>X</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )) : <p style={{textAlign: 'center', color: 'var(--text-secondary-color)'}}>Nenhum cheque adicionado.</p>}
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

const RuralFinancingCalculator = ({ onBack, onSave, userSettings }: { onBack: () => void, onSave: (calc: Omit<Calculation, 'id'>) => void, userSettings: UserSettings }) => {
    const [amount, setAmount] = useState('500.000,00');
    const [rate, setRate] = useState(userSettings.defaultRuralRate || '7.5');
    const [term, setTerm] = useState('10');
    const [gracePeriod, setGracePeriod] = useState('3');
    const [amortizationType, setAmortizationType] = useState<AmortizationType>('sac');
    const [graceInterestPayment, setGraceInterestPayment] = useState('pay_periodically'); // 'pay_periodically', 'pay_at_end', 'capitalize'
    const [graceInterestFrequency, setGraceInterestFrequency] = useState(1); // 1: annual, 2: semi, 4: quarterly, 12: monthly
    const [results, setResults] = useState<{ table: RuralAmortizationRow[], totalInterest: number, totalPaid: number, graceInterest: number, lastInstallment?: number } | null>(null);

    const resetForm = () => {
        setAmount('500.000,00');
        setRate(userSettings.defaultRuralRate || '7.5');
        setTerm('10');
        setGracePeriod('3');
        setAmortizationType('sac');
        setGraceInterestPayment('pay_periodically');
        setGraceInterestFrequency(1);
        setResults(null);
    };

    const calculate = () => {
        const loanAmount = parseFormattedCurrency(amount);
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
            description: `${formatCurrency(parseFormattedCurrency(amount))} em ${term} anos com ${gracePeriod} de carência`,
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
                        <input id="amount-rural" type="text" value={amount} onChange={e => setAmount(handleCurrencyInputChange(e))} />
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
                        <label htmlFor="grace-interest">
                            Tratamento dos Juros na Carência
                             <HelpTooltip text="Capitalizar Juros: Os juros da carência são somados ao saldo devedor principal para serem pagos junto com as parcelas de amortização." />
                        </label>
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
                        <label htmlFor="amortization-rural">
                            Sistema de Amortização
                             <HelpTooltip text="SAC: Parcelas decrescentes. Tabela Price: Parcelas fixas." />
                        </label>
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
                      <p><strong>Valor do Financiamento:</strong> {formatCurrency(parseFormattedCurrency(amount))}</p>
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
    const [loanAmount, setLoanAmount] = useState('10.000,00');
    const [installmentValue, setInstallmentValue] = useState('450,00');
    const [term, setTerm] = useState('36');
    const [calculatedRate, setCalculatedRate] = useState<number | null>(null);

    const resetForm = () => {
        setLoanAmount('10.000,00');
        setInstallmentValue('450,00');
        setTerm('36');
        setCalculatedRate(null);
    };

    const calculateRate = () => {
        const principal = parseFormattedCurrency(loanAmount);
        const payment = parseFormattedCurrency(installmentValue);
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
                        <input id="loanAmountRate" type="text" value={loanAmount} onChange={e => setLoanAmount(handleCurrencyInputChange(e))} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="installmentValueRate">Valor da Parcela (R$)</label>
                        <input id="installmentValueRate" type="text" value={installmentValue} onChange={e => setInstallmentValue(handleCurrencyInputChange(e))} />
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
                    <h3>Taxa de Juros Efetiva</h3>
                    {calculatedRate !== null ? (
                        <div className="results-summary" style={{ gridTemplateColumns: '1fr' }}>
                            <div className="summary-item">
                                <h4>Taxa Mensal Calculada</h4>
                                <p>{calculatedRate.toFixed(4)}% a.m.</p>
                            </div>
                            <div className="summary-item">
                                <h4>Taxa Anual Equivalente</h4>
                                <p>{((Math.pow(1 + calculatedRate / 100, 12) - 1) * 100).toFixed(2)}% a.a.</p>
                            </div>
                        </div>
                    ) : (
                         <div className="no-results">
                            <div className="icon">🔍</div>
                            <p>Preencha os dados da operação para descobrir a taxa de juros efetiva.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const DetailedLineChart = ({ data, theme }: { data: { date: string, value: number }[], theme: string }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [tooltip, setTooltip] = useState<{ x: number; y: number; date: string; value: number } | null>(null);

    useEffect(() => {
        if (!data || data.length === 0 || !svgRef.current || !wrapperRef.current) return;

        const svg = svgRef.current;
        while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
        }

        const { width, height } = wrapperRef.current.getBoundingClientRect();
        const margin = { top: 20, right: 30, bottom: 40, left: 60 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const parseDate = (dateString: string) => new Date(dateString);
        const dates = data.map(d => parseDate(d.date));
        const values = data.map(d => d.value);

        const xScale = {
            domain: [Math.min(...dates.map(d => d.getTime())), Math.max(...dates.map(d => d.getTime()))],
            range: [0, innerWidth]
        };
        const yScale = {
            domain: [Math.min(...values) * 0.98, Math.max(...values) * 1.02],
            range: [innerHeight, 0]
        };
        
        const mapX = (value: number) => margin.left + (value - xScale.domain[0]) / (xScale.domain[1] - xScale.domain[0]) * xScale.range[1];
        const mapY = (value: number) => margin.top + (value - yScale.domain[0]) / (yScale.domain[1] - yScale.domain[0]) * yScale.range[1];
        
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        svg.appendChild(g);

        // --- AXES ---
        const textColor = getComputedStyle(document.body).getPropertyValue('--text-color');
        const borderColor = getComputedStyle(document.body).getPropertyValue('--border-color');

        // X-Axis
        const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const numTicksX = Math.min(Math.floor(innerWidth / 100), dates.length);
        const tickIndicesX = Array.from({ length: numTicksX }, (_, i) => Math.floor(i * (dates.length - 1) / (numTicksX - 1)));
        tickIndicesX.forEach(index => {
            const date = dates[index];
            const x = mapX(date.getTime());
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", String(x));
            line.setAttribute("x2", String(x));
            line.setAttribute("y1", String(margin.top + innerHeight));
            line.setAttribute("y2", String(margin.top + innerHeight + 6));
            line.setAttribute("stroke", borderColor);
            xAxis.appendChild(line);

            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", String(x));
            text.setAttribute("y", String(margin.top + innerHeight + 20));
            text.setAttribute("fill", textColor);
            text.setAttribute("font-size", "10");
            text.setAttribute("text-anchor", "middle");
            text.textContent = date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
            xAxis.appendChild(text);
        });
        g.appendChild(xAxis);

        // Y-Axis
        const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const numTicksY = 5;
        for (let i = 0; i <= numTicksY; i++) {
            const value = yScale.domain[0] + (yScale.domain[1] - yScale.domain[0]) * i / numTicksY;
            const y = mapY(value);

            const line = document.createElementNS("http://www.w3.org/2000/svg", "line"); // Grid line
            line.setAttribute("x1", String(margin.left));
            line.setAttribute("x2", String(margin.left + innerWidth));
            line.setAttribute("y1", String(y));
            line.setAttribute("y2", String(y));
            line.setAttribute("stroke", borderColor);
            line.setAttribute("stroke-dasharray", "2,2");
            yAxis.appendChild(line);

            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", String(margin.left - 10));
            text.setAttribute("y", String(y + 3));
            text.setAttribute("fill", textColor);
            text.setAttribute("font-size", "10");
            text.setAttribute("text-anchor", "end");
            text.textContent = value.toFixed(2);
            yAxis.appendChild(text);
        }
        g.appendChild(yAxis);

        // --- LINE ---
        const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary-color');
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const pathData = data.map((d, i) => {
            const x = mapX(parseDate(d.date).getTime());
            const y = mapY(d.value);
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');
        path.setAttribute("d", pathData);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", primaryColor);
        path.setAttribute("stroke-width", "2");
        g.appendChild(path);

        // --- TOOLTIP ---
        const tooltipLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        tooltipLine.setAttribute('stroke', textColor);
        tooltipLine.setAttribute('stroke-width', '1');
        tooltipLine.setAttribute('y1', String(margin.top));
        tooltipLine.setAttribute('y2', String(margin.top + innerHeight));
        tooltipLine.style.display = 'none';
        g.appendChild(tooltipLine);

        const tooltipCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        tooltipCircle.setAttribute('r', '4');
        tooltipCircle.setAttribute('fill', primaryColor);
        tooltipCircle.setAttribute('stroke', getComputedStyle(document.body).getPropertyValue('--card-bg'));
        tooltipCircle.setAttribute('stroke-width', '2');
        tooltipCircle.style.display = 'none';
        g.appendChild(tooltipCircle);

        const handleMouseMove = (event: MouseEvent) => {
            const rect = svg.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const mouseDate = xScale.domain[0] + (x - margin.left) / innerWidth * (xScale.domain[1] - xScale.domain[0]);

            const closestPoint = data.reduce((prev, curr) => {
                const prevDate = parseDate(prev.date).getTime();
                const currDate = parseDate(curr.date).getTime();
                return Math.abs(currDate - mouseDate) < Math.abs(prevDate - mouseDate) ? curr : prev;
            });
            
            const pointX = mapX(parseDate(closestPoint.date).getTime());
            const pointY = mapY(closestPoint.value);

            if(x >= margin.left && x <= width - margin.right) {
                tooltipLine.setAttribute('x1', String(pointX));
                tooltipLine.setAttribute('x2', String(pointX));
                tooltipLine.style.display = 'block';

                tooltipCircle.setAttribute('cx', String(pointX));
                tooltipCircle.setAttribute('cy', String(pointY));
                tooltipCircle.style.display = 'block';

                setTooltip({
                    x: pointX,
                    y: pointY,
                    date: parseDate(closestPoint.date).toLocaleDateString('pt-BR'),
                    value: closestPoint.value
                });
            } else {
                handleMouseLeave();
            }
        };

        const handleMouseLeave = () => {
            tooltipLine.style.display = 'none';
            tooltipCircle.style.display = 'none';
            setTooltip(null);
        };
        
        svg.addEventListener('mousemove', handleMouseMove);
        svg.addEventListener('mouseleave', handleMouseLeave);
        
        return () => {
             if (svg) {
                svg.removeEventListener('mousemove', handleMouseMove);
                svg.removeEventListener('mouseleave', handleMouseLeave);
             }
        }

    }, [data, theme]);

    return (
        <div ref={wrapperRef} className="chart-wrapper" style={{ height: '300px' }}>
            <svg ref={svgRef} width="100%" height="100%"></svg>
            {tooltip && (
                <div style={{
                    position: 'absolute',
                    top: `${tooltip.y - 10}px`, // Offset for better placement
                    left: `${tooltip.x + 10}px`,
                    transform: 'translateY(-100%)',
                    background: 'var(--tooltip-bg)',
                    color: 'var(--tooltip-text)',
                    padding: '8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    pointerEvents: 'none',
                    boxShadow: 'var(--box-shadow-light)',
                    whiteSpace: 'nowrap'
                }}>
                    <div><strong>Data:</strong> {tooltip.date}</div>
                    <div><strong>Valor:</strong> {tooltip.value.toFixed(4)}</div>
                </div>
            )}
        </div>
    );
};

const EconomicIndicators = ({ onBack, theme }: { onBack: () => void, theme: string }) => {
    const [indicators, setIndicators] = useState({ cdi: null, selic: null, dolar: null });
    const [historicalData, setHistoricalData] = useState([]);
    const [selectedIndicator, setSelectedIndicator] = useState('cdi');
    const [period, setPeriod] = useState('1y');
    const [loading, setLoading] = useState(true);

    const periodToDays: { [key: string]: number } = { '1m': 30, '6m': 180, '1y': 365, '5y': 1825, 'max': 99999 };

    useEffect(() => {
        const fetchIndicators = async () => {
            setLoading(true);
            try {
                // Fetch latest indicators
                const cdiPromise = fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.12/dados/ultimos/1?formato=json').then(res => res.json());
                const selicPromise = fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/1?formato=json').then(res => res.json());
                const dolarPromise = fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.10813/dados/ultimos/1?formato=json').then(res => res.json());

                const [cdiData, selicData, dolarData] = await Promise.all([cdiPromise, selicPromise, dolarPromise]);
                
                setIndicators({
                    cdi: cdiData[0]?.valor ? (Math.pow(1 + parseFloat(cdiData[0].valor) / 100, 252) - 1) * 100 : null,
                    selic: selicData[0]?.valor ? parseFloat(selicData[0].valor) * 252 : null,
                    dolar: dolarData[0]?.valor ? parseFloat(dolarData[0].valor) : null
                });

            } catch (error) {
                console.error("Failed to fetch indicators:", error);
            }
        };

        fetchIndicators();
    }, []);

    useEffect(() => {
        const fetchHistoricalData = async () => {
            setLoading(true);
            const indicatorCodes: { [key: string]: number } = { 'cdi': 12, 'selic': 11, 'dolar': 10813 };
            const code = indicatorCodes[selectedIndicator];
            const days = periodToDays[period];

            try {
                const response = await fetch(`https://api.bcb.gov.br/dados/serie/bcdata.sgs.${code}/dados/ultimos/${days}?formato=json`);
                const data = await response.json();
                
                const formattedData = data.map((item: any) => {
                    const [day, month, year] = item.data.split('/');
                    return {
                        date: `${year}-${month}-${day}`,
                        value: parseFloat(item.valor)
                    };
                }).reverse(); // API returns newest first, chart needs oldest first
                setHistoricalData(formattedData);
            } catch (error) {
                console.error("Failed to fetch historical data:", error);
                setHistoricalData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchHistoricalData();
    }, [selectedIndicator, period]);

    const indicatorDescriptions = {
        cdi: 'Taxa de juros dos empréstimos entre bancos (Certificado de Depósito Interbancário). Principal referência para investimentos de renda fixa.',
        selic: 'Taxa básica de juros da economia brasileira, definida pelo Banco Central. Influencia todas as outras taxas de juros do país.',
        dolar: 'Taxa de câmbio que representa o valor do dólar comercial americano em relação ao real brasileiro.'
    };

    return (
        <div className="indicators-container">
            <h3>Indicadores Econômicos</h3>
            <div className="indicators-grid">
                <div className="indicator-card">
                    <div className="indicator-header">
                        <h4>CDI (Anual)</h4>
                        <p>{indicators.cdi ? `${indicators.cdi.toFixed(2)}%` : 'N/A'}</p>
                    </div>
                </div>
                <div className="indicator-card">
                    <div className="indicator-header">
                        <h4>SELIC (Anual)</h4>
                        <p>{indicators.selic ? `${indicators.selic.toFixed(2)}%` : 'N/A'}</p>
                    </div>
                </div>
                <div className="indicator-card">
                    <div className="indicator-header">
                        <h4>Dólar (PTAX)</h4>
                        <p>{indicators.dolar ? `R$ ${indicators.dolar.toFixed(4)}` : 'N/A'}</p>
                    </div>
                </div>
            </div>

            <div className="detailed-analysis-section">
                <h4>Análise Histórica Detalhada</h4>
                 <div className="indicator-tabs">
                    <button onClick={() => setSelectedIndicator('cdi')} className={selectedIndicator === 'cdi' ? 'active' : ''}>CDI</button>
                    <button onClick={() => setSelectedIndicator('selic')} className={selectedIndicator === 'selic' ? 'active' : ''}>SELIC</button>
                    <button onClick={() => setSelectedIndicator('dolar')} className={selectedIndicator === 'dolar' ? 'active' : ''}>Dólar</button>
                </div>
                <p style={{ color: 'var(--text-secondary-color)', marginBottom: '20px' }}>{indicatorDescriptions[selectedIndicator as keyof typeof indicatorDescriptions]}</p>
                <div className="period-filters">
                    <button onClick={() => setPeriod('1m')} className={period === '1m' ? 'active' : ''}>1M</button>
                    <button onClick={() => setPeriod('6m')} className={period === '6m' ? 'active' : ''}>6M</button>
                    <button onClick={() => setPeriod('1y')} className={period === '1y' ? 'active' : ''}>1A</button>
                    <button onClick={() => setPeriod('5y')} className={period === '5y' ? 'active' : ''}>5A</button>
                    <button onClick={() => setPeriod('max')} className={period === 'max' ? 'active' : ''}>Máx</button>
                </div>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '50px' }}>Carregando dados...</div>
                ) : historicalData.length > 0 ? (
                   <DetailedLineChart data={historicalData} theme={theme} />
                ) : (
                    <div className="no-results">
                        <div className="icon">😕</div>
                        <p>Não foi possível carregar os dados históricos.</p>
                    </div>
                )}
            </div>

            <button className="btn btn-secondary" style={{marginTop: '30px'}} onClick={onBack}>Voltar</button>
        </div>
    );
};

const HistoryViewer = ({ onBack, onSelect, history }: { onBack: () => void, onSelect: (id: number) => void, history: Calculation[] }) => {
    return (
        <div className="history-container">
            <h3>Histórico de Simulações</h3>
            {history.length > 0 ? (
                <div className="history-list">
                    {history.map(item => (
                        <div key={item.id} className="history-item" onClick={() => onSelect(item.id)}>
                            <div className="history-item-header">
                                <h4>{item.type}</h4>
                                <span>{new Date(item.id).toLocaleString('pt-BR')}</span>
                            </div>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-results">
                    <div className="icon">📂</div>
                    <p>Nenhuma simulação foi salva ainda.</p>
                </div>
            )}
             <button className="btn btn-secondary" onClick={onBack}>Voltar</button>
        </div>
    );
};

const HistoryModal = ({ calculation, onClose, onDelete }: { calculation: Calculation, onClose: () => void, onDelete: (id: number) => void }) => {
    useEffect(() => {
        document.body.classList.add('modal-open');
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, []);

    const { type, description, data } = calculation;

    const renderDetails = () => {
        // Here you would render the results based on the calculation type
        // This is a simplified version. You'd need to recreate the results view for each type.
        // For brevity, we'll just show a summary and the table if it exists.
        
        // This is a placeholder. In a real app, you'd have dedicated result renderers.
        const summaryItems = [];
        let tableComponent = null;

        if (type === 'Empréstimo' && data.results) {
            const { results } = data;
            const firstInstallment = results.table[0]?.installment ?? 0;
            summaryItems.push({ label: 'Valor da Parcela', value: formatCurrency(firstInstallment) });
            summaryItems.push({ label: 'Total de Juros', value: formatCurrency(results.totalInterest) });
            summaryItems.push({ label: 'Total Pago', value: formatCurrency(results.totalPaid) });
            if (results.calculatedIof > 0) summaryItems.push({ label: 'IOF', value: formatCurrency(results.calculatedIof) });
            
            tableComponent = (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Mês</th><th>Parcela</th><th>Juros</th><th>Amortização</th><th>Amort. Extra</th><th>Saldo Devedor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.table.map((row: AmortizationRow) => (
                                <tr key={row.month}>
                                    <td data-label="Mês">{row.month}</td>
                                    <td data-label="Parcela">{formatCurrency(row.installment)}</td>
                                    <td data-label="Juros">{formatCurrency(row.interest)}</td>
                                    <td data-label="Amortização">{formatCurrency(row.amortization)}</td>
                                    <td data-label="Amort. Extra">{formatCurrency(row.extraAmortization || 0)}</td>
                                    <td data-label="Saldo Devedor">{formatCurrency(row.balance)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        } else if (type === 'Antecipação de Cheques' && data.results) {
             const { results } = data;
             summaryItems.push({ label: 'Valor Líquido', value: formatCurrency(results.netAmount) });
             summaryItems.push({ label: 'Custo Total', value: formatCurrency(results.totalCost) });
             summaryItems.push({ label: 'Valor Bruto', value: formatCurrency(results.originalValue) });
        } else if (type === 'Financiamento Rural' && data.results) {
            const { results } = data;
            const firstInstallment = results.table.find((r: RuralAmortizationRow) => r.amortization > 0)?.installment ?? 0;
            summaryItems.push({ label: 'Primeira Parcela', value: formatCurrency(firstInstallment) });
            summaryItems.push({ label: 'Juros na Carência', value: formatCurrency(results.graceInterest) });
            summaryItems.push({ label: 'Total Pago', value: formatCurrency(results.totalPaid) });

            tableComponent = (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Período</th><th>Parcela</th><th>Juros</th><th>Amortização</th><th>Saldo Devedor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.table.map((row: RuralAmortizationRow) => (
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
            );
        }

        return (
            <>
                <div className="results-summary">
                    {summaryItems.map(item => (
                        <div className="summary-item" key={item.label}>
                            <h4>{item.label}</h4>
                            <p>{item.value}</p>
                        </div>
                    ))}
                </div>
                {tableComponent}
            </>
        );
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div>
                        <h3>{type}</h3>
                        <p style={{color: 'var(--text-secondary-color)', fontSize: '1rem', marginTop: '5px' }}>{description}</p>
                    </div>
                    <button className="modal-close-btn no-print" onClick={onClose}>&times;</button>
                </div>
                {renderDetails()}
                 <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }} className="no-print">
                    <button className="btn" onClick={() => window.print()}>Exportar para PDF</button>
                    <button className="btn btn-danger" onClick={() => { if(window.confirm('Tem certeza que deseja apagar esta simulação?')) { onDelete(calculation.id) } }}>Apagar</button>
                    <button className="btn btn-secondary" onClick={onClose}>Fechar</button>
                </div>
            </div>
        </div>
    );
};

const ComparisonTool = ({ onBack, history }: { onBack: () => void, history: Calculation[] }) => {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [comparison, setComparison] = useState<Calculation[] | null>(null);
    const [error, setError] = useState('');

    const handleSelect = (id: number) => {
        setSelectedIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(i => i !== id);
            }
            if (prev.length < 2) {
                return [...prev, id];
            }
            return prev;
        });
    };

    const handleCompare = () => {
        setError('');
        setComparison(null);
        if (selectedIds.length !== 2) {
            setError('Por favor, selecione exatamente duas simulações para comparar.');
            return;
        }
        
        const itemsToCompare = history.filter(item => selectedIds.includes(item.id));
        if (itemsToCompare[0].type !== itemsToCompare[1].type) {
            setError('Por favor, selecione duas simulações do mesmo tipo (ex: dois empréstimos).');
            return;
        }

        setComparison(itemsToCompare);
    };

    const renderComparisonDetails = () => {
        if (!comparison) return null;

        const [item1, item2] = comparison;
        const type = item1.type;
        
        const rows: { label: string, val1: string | number, val2: string | number, section?: string }[] = [];

        if (type === 'Empréstimo') {
            const { results: res1 } = item1.data;
            const { results: res2 } = item2.data;
            const { inputs: in1 } = item1.data;
            const { inputs: in2 } = item2.data;

            rows.push({ section: 'Condições Iniciais', label: 'Valor Financiado', val1: formatCurrency(parseFormattedCurrency(in1.amount)), val2: formatCurrency(parseFormattedCurrency(in2.amount)) });
            rows.push({ label: 'Taxa de Juros', val1: `${in1.rate}% a.m.`, val2: `${in2.rate}% a.m.` });
            rows.push({ label: 'Prazo', val1: `${in1.term} meses`, val2: `${in2.term} meses` });
            rows.push({ label: 'Sistema', val1: in1.amortizationType.toUpperCase(), val2: in2.amortizationType.toUpperCase() });
            
            rows.push({ section: 'Resultados', label: 'Primeira Parcela', val1: formatCurrency(res1.table[0]?.installment ?? 0), val2: formatCurrency(res2.table[0]?.installment ?? 0) });
            if (in1.amortizationType === 'sac' || in2.amortizationType === 'sac') {
                rows.push({ label: 'Última Parcela', val1: formatCurrency(res1.lastInstallment ?? 0), val2: formatCurrency(res2.lastInstallment ?? 0) });
            }
            rows.push({ label: 'Total de Juros', val1: formatCurrency(res1.totalInterest), val2: formatCurrency(res2.totalInterest) });
            rows.push({ label: 'Custo Efetivo Total (CET)', val1: formatCurrency(res1.totalPaid), val2: formatCurrency(res2.totalPaid) });
        } else if (type === 'Antecipação de Cheques') {
             const { results: res1, inputs: in1 } = item1.data;
             const { results: res2, inputs: in2 } = item2.data;

            rows.push({ section: 'Condições', label: 'Total de Cheques', val1: `${in1.checks.length}`, val2: `${in2.checks.length}` });
            rows.push({ label: 'Valor Bruto', val1: formatCurrency(res1.originalValue), val2: formatCurrency(res2.originalValue) });
            rows.push({ label: 'Taxa de Juros', val1: `${in1.interestRate}% a.m.`, val2: `${in2.interestRate}% a.m.` });
            rows.push({ label: 'TAC', val1: formatCurrency(parseFormattedCurrency(in1.tac)), val2: formatCurrency(parseFormattedCurrency(in2.tac)) });
            
            rows.push({ section: 'Resultados', label: 'Custo Total', val1: formatCurrency(res1.totalCost), val2: formatCurrency(res2.totalCost) });
            rows.push({ label: 'Valor Líquido Recebido', val1: formatCurrency(res1.netAmount), val2: formatCurrency(res2.netAmount) });
        }
        // Add more types if needed

        return (
            <div className="comparison-details">
                {rows.map((row, index) => (
                    <React.Fragment key={index}>
                        {row.section && <h5 className="comparison-section-title">{row.section}</h5>}
                        <div className="comparison-row">
                            <span>{row.val1}</span>
                            <span className="comparison-label">{row.label}</span>
                            <span>{row.val2}</span>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        );
    };

    return (
        <div className="comparison-container">
            <h3>Comparador de Simulações</h3>
            {!comparison ? (
                <>
                    <p>Selecione duas simulações salvas para comparar lado a lado.</p>
                     <div className="selection-list">
                        {history.length > 0 ? history.map(item => (
                            <div 
                                key={item.id} 
                                className={`selection-item ${selectedIds.includes(item.id) ? 'selected' : ''}`}
                                onClick={() => handleSelect(item.id)}
                            >
                                <input type="checkbox" checked={selectedIds.includes(item.id)} readOnly />
                                <div className="selection-item-info">
                                    <strong>{item.type}</strong>
                                    <span>{item.description}</span>
                                    <span style={{fontSize: '0.8rem'}}>{new Date(item.id).toLocaleString('pt-BR')}</span>
                                </div>
                            </div>
                        )) : <p className="no-results" style={{padding: '20px'}}>Nenhuma simulação no histórico.</p>}
                    </div>
                    {error && <p style={{color: 'var(--danger-color)', textAlign: 'center'}}>{error}</p>}
                    <div className="comparison-controls">
                        <button className="btn" onClick={handleCompare} disabled={selectedIds.length !== 2}>Comparar</button>
                        <button className="btn btn-secondary" onClick={onBack}>Voltar</button>
                    </div>
                </>
            ) : (
                <>
                     <div className="comparison-grid">
                        <div className="comparison-column">
                            <h4>{comparison[0].type}</h4>
                            <p>{comparison[0].description}</p>
                        </div>
                         <div className="comparison-column">
                            <h4>{comparison[1].type}</h4>
                            <p>{comparison[1].description}</p>
                        </div>
                        {renderComparisonDetails()}
                    </div>
                    <div className="comparison-controls">
                        <button className="btn" onClick={() => { setComparison(null); setSelectedIds([]); }}>Nova Comparação</button>
                        <button className="btn btn-secondary" onClick={onBack}>Voltar</button>
                    </div>
                </>
            )}
        </div>
    );
};

const UserSettings = ({ onBack, currentSettings, onSave }: { onBack: () => void, currentSettings: UserSettings, onSave: (settings: UserSettings) => void }) => {
    const [defaultLoanRate, setDefaultLoanRate] = useState(currentSettings.defaultLoanRate || '1');
    const [defaultTac, setDefaultTac] = useState(currentSettings.defaultTac || '50,00');
    const [defaultRuralRate, setDefaultRuralRate] = useState(currentSettings.defaultRuralRate || '7.5');
    
    const handleSave = () => {
        onSave({
            defaultLoanRate,
            defaultTac,
            defaultRuralRate,
        });
    };

    return (
        <div className="settings-container">
            <h3>Configurações Padrão</h3>
            <p style={{color: 'var(--text-secondary-color)', marginBottom: '30px'}}>
                Defina valores padrão para agilizar suas simulações. Estes valores serão pré-preenchidos nas calculadoras.
            </p>
            <div className="form-group">
                <label htmlFor="defaultLoanRate">Taxa de Juros Padrão para Empréstimos (% a.m.)</label>
                <input 
                    id="defaultLoanRate" 
                    type="number" 
                    value={defaultLoanRate} 
                    onChange={e => setDefaultLoanRate(e.target.value)} 
                    step="0.01"
                />
            </div>
            <div className="form-group">
                <label htmlFor="defaultTac">TAC Padrão para Antecipação de Cheques (R$)</label>
                <input 
                    id="defaultTac" 
                    type="text" 
                    value={defaultTac} 
                    onChange={e => setDefaultTac(handleCurrencyInputChange(e))} 
                />
            </div>
             <div className="form-group">
                <label htmlFor="defaultRuralRate">Taxa de Juros Padrão para Fin. Rural (% a.a.)</label>
                <input 
                    id="defaultRuralRate" 
                    type="number" 
                    value={defaultRuralRate} 
                    onChange={e => setDefaultRuralRate(e.target.value)} 
                    step="0.01"
                />
            </div>
            <button className="btn" onClick={handleSave}>Salvar Configurações</button>
            <button className="btn btn-secondary" onClick={onBack}>Voltar</button>
        </div>
    );
}

const FeatureCard = ({ icon, title, description, onClick }: { icon: string, title: string, description: string, onClick: () => void }) => (
  <div className="feature-card" onClick={onClick}>
    <div className="icon">{icon}</div>
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);

const Home = ({ onNavigate }: { onNavigate: (view: string) => void }) => (
  <>
    <div className="header">
      <h1>Salva Bancário</h1>
      <p>O canivete suíço de ferramentas para o seu dia a dia.</p>
    </div>
    <div className="card-grid">
      <FeatureCard icon="💰" title="Simular Empréstimo" description="Calcule parcelas, juros e amortizações (Price e SAC)." onClick={() => onNavigate('loan')} />
      <FeatureCard icon="🧾" title="Antecipar Cheques" description="Simule o valor líquido do desconto de cheques pré-datados." onClick={() => onNavigate('check')} />
      <FeatureCard icon="🌾" title="Financiamento Rural" description="Calcule operações de crédito rural com carência e pagamentos anuais." onClick={() => onNavigate('rural')} />
      <FeatureCard icon="🔍" title="Taxa do Concorrente" description="Descubra a taxa de juros real a partir do valor e da parcela." onClick={() => onNavigate('competitor')} />
      <FeatureCard icon="📈" title="Indicadores Econômicos" description="Acompanhe CDI, SELIC, Dólar e outros índices importantes." onClick={() => onNavigate('indicators')} />
      <FeatureCard icon="📚" title="Histórico" description="Veja, compare e exporte suas simulações salvas." onClick={() => onNavigate('history')} />
      <FeatureCard icon="🔄" title="Comparador" description="Compare duas simulações salvas lado a lado." onClick={() => onNavigate('comparison')} />
      <FeatureCard icon="⚙️" title="Configurações" description="Defina valores padrão para agilizar suas simulações." onClick={() => onNavigate('settings')} />
    </div>
  </>
);

const ThemeToggle = ({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) => (
    <button className="theme-toggle-btn no-print" onClick={toggleTheme} aria-label="Alterar tema">
        {theme === 'light' ? '🌙' : '☀️'}
    </button>
);


const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [history, setHistory] = useState<Calculation[]>([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<Calculation | null>(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [userSettings, setUserSettings] = useState<UserSettings>({});
  
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  useEffect(() => {
    const savedHistory = localStorage.getItem('calcHistory');
    if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
    }
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
        setUserSettings(JSON.parse(savedSettings));
    }
  }, []);
  
  const toggleTheme = () => setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');

  const handleSave = (calculationData: Omit<Calculation, 'id'>) => {
      setHistory(prevHistory => {
          const newHistory = [...prevHistory, { ...calculationData, id: Date.now() }];
          localStorage.setItem('calcHistory', JSON.stringify(newHistory));
          return newHistory;
      });
  };

  const handleDeleteHistory = (id: number) => {
       setHistory(prevHistory => {
          const newHistory = prevHistory.filter(item => item.id !== id);
          localStorage.setItem('calcHistory', JSON.stringify(newHistory));
          return newHistory;
      });
      setSelectedHistoryItem(null); // Close modal after deletion
  }
  
  const handleSaveSettings = (newSettings: UserSettings) => {
    setUserSettings(newSettings);
    localStorage.setItem('userSettings', JSON.stringify(newSettings));
    alert('Configurações salvas com sucesso!');
  };

  const handleSelectHistory = (id: number) => {
      const item = history.find(h => h.id === id);
      if (item) {
          setSelectedHistoryItem(item);
      }
  };

  const renderView = () => {
    switch (currentView) {
      case 'loan':
        return <LoanCalculator onBack={() => setCurrentView('home')} onSave={handleSave} userSettings={userSettings} />;
      case 'check':
        return <CheckDiscountCalculator onBack={() => setCurrentView('home')} onSave={handleSave} userSettings={userSettings} />;
      case 'rural':
        return <RuralFinancingCalculator onBack={() => setCurrentView('home')} onSave={handleSave} userSettings={userSettings} />;
      case 'competitor':
        return <CompetitorRateChecker onBack={() => setCurrentView('home')} />;
      case 'indicators':
        return <EconomicIndicators onBack={() => setCurrentView('home')} theme={theme} />;
      case 'history':
        return <HistoryViewer onBack={() => setCurrentView('home')} onSelect={handleSelectHistory} history={history} />;
      case 'comparison':
        return <ComparisonTool onBack={() => setCurrentView('home')} history={history} />;
      case 'settings':
        return <UserSettings onBack={() => setCurrentView('home')} currentSettings={userSettings} onSave={handleSaveSettings} />;
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="app-container">
      <style>{styles}</style>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      {renderView()}
      {selectedHistoryItem && <HistoryModal calculation={selectedHistoryItem} onClose={() => setSelectedHistoryItem(null)} onDelete={handleDeleteHistory} />}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
