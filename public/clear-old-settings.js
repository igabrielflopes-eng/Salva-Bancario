// Script temporário para limpar configurações antigas
if (typeof localStorage !== 'undefined') {
  const settings = localStorage.getItem('appSettings');
  if (settings) {
    const parsed = JSON.parse(settings);
    // Se não tem os campos novos, limpar e forçar recarga
    if (parsed.cdi === undefined || parsed.selic === undefined) {
      console.log('Limpando configurações antigas...');
      localStorage.removeItem('appSettings');
      window.location.reload();
    }
  }
}
