import React from 'react';
import css from './select.module.css';

export default function Select({ transactions, handleSelect, handleButton }) {
  const tableperiodo = [];
  const tableperiodoAux = [];

  function getDataAtual() {
    var dNow = new Date();
    let month = dNow.getMonth() + 1;
    switch (month) {
      case 1:
        month = '01';
        break;
      case 2:
        month = '02';
        break;
      case 3:
        month = '03';
        break;
      case 4:
        month = '04';
        break;
      case 5:
        month = '05';
        break;
      case 6:
        month = '06';
        break;
      case 7:
        month = '07';
        break;
      case 8:
        month = '08';
        break;
      case 9:
        month = '09';
        break;
      default:
        month = month;
        break;
    }
    var localdate = `${dNow.getFullYear()}-${month}`;
    return localdate;
  }
  const dataAtual = getDataAtual();

  const getComboItem = (month, year) => {
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

  transactions.map((transac) => {
    if (tableperiodoAux.indexOf(transac.yearMonth) === -1) {
      let yearMonthBarra = transac.yearMonth;
      yearMonthBarra = getComboItem(transac.month, transac.year);
      tableperiodo.push({
        id: transac.id,
        yearMonth: transac.yearMonth,
        yearMonthBarra: yearMonthBarra,
      });
      tableperiodoAux.push(transac.yearMonth);
    }
  });

  const clickButton = (sobe) => {
    // handleButton(sobe);
  };

  const handleChange = (event) => {
    handleSelect(event.target.value);
  };

  return (
    <div className={css.divSelect}>
      <button
        className={`waves-effect waves-light btn ${css.botao}`}
        disabled=""
      >
        &lt;
      </button>
      <select
        className={`browser-default ${css.combo}`}
        onChange={handleChange}
        onClick={clickButton(false)}
      >
        {tableperiodo.map((transaction) => {
          if (dataAtual === transaction.yearMonth) {
            return (
              <option
                key={transaction.id}
                selected
                defaultValue={transaction.yearMonth}
              >
                {transaction.yearMonthBarra}
              </option>
            );
          } else {
            return (
              <option key={transaction.id} value={transaction.yearMonth}>
                {transaction.yearMonthBarra}
              </option>
            );
          }
        })}
      </select>
      <button
        className={`waves-effect waves-light btn ${css.botao}`}
        disabled=""
        onClick={clickButton(true)}
      >
        &gt;
      </button>
    </div>
  );
}