// Script de teste para verificar a aplicação
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Capturar erros do console
  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('ERROR:', error.message));
  
  try {
    await page.goto('http://localhost:5000', { waitUntil: 'networkidle0', timeout: 10000 });
    console.log('✓ Página principal carregada');
    
    // Clicar no simulador de investimento
    await page.click('text/Simular Investimento');
    await page.waitForTimeout(1000);
    console.log('✓ Simulador de investimento aberto');
    
    // Preencher formulário
    await page.type('#initialValue', '50000');
    await page.type('#months', '24');
    console.log('✓ Formulário preenchido');
    
    // Calcular
    await page.click('button:has-text("Calcular")');
    await page.waitForTimeout(2000);
    console.log('✓ Cálculo executado');
    
    // Verificar se gráfico apareceu
    const hasChart = await page.$('.recharts-wrapper');
    console.log(hasChart ? '✓ Gráfico renderizado' : '✗ Gráfico NÃO encontrado');
    
  } catch (error) {
    console.log('ERRO:', error.message);
  } finally {
    await browser.close();
  }
})();
