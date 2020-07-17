const formatterCurrency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

const formatter = new Intl.NumberFormat('pt-BR');

const formatterPerc = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

const formatterPercIng = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

function formatPercIng(value) {
  return formatterPercIng.format(value);
}

function formatNumber(value) {
  return formatter.format(value);
}
function formatPerc(value) {
  return formatterPerc.format(value) + ' %';
}

function formatCurrency(value) {
  return formatterCurrency.format(value);
}

export { formatNumber, formatCurrency, formatPerc, formatPercIng };
