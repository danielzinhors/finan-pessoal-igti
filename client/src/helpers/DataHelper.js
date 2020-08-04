function getDataAtual() {
  var dNow = new Date();
  let month = dNow.getMonth() + 1;
  var localdate = `${dNow.getFullYear()}-${('0' + month).slice(-2)}`;
  return localdate;
}

const getMesAno = (month, year) => {
  let item;
  switch (month) {
    case 1:
      item = 'Jan';
      break;
    case 2:
      item = 'Fev';
      break;
    case 3:
      item = 'Mar';
      break;
    case 4:
      item = 'Abr';
      break;
    case 5:
      item = 'Mai';
      break;
    case 6:
      item = 'Jun';
      break;
    case 7:
      item = 'Jul';
      break;
    case 8:
      item = 'Ago';
      break;
    case 9:
      item = 'Set';
      break;
    case 10:
      item = 'Out';
      break;
    case 11:
      item = 'Nov';
      break;
    case 12:
      item = 'Dez';
      break;
    default:
      item = 'Erro';
      break;
  }
  item = `${item}/${year}`;
  return item;
};

export { getDataAtual, getMesAno };
