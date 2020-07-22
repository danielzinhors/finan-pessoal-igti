import React, { useState, useEffect } from 'react';
import css from './select.module.css';

export default function Select({
  transactions,
  handleSelect,
  periodAtual,
  setTransc,
}) {
  const [valor, setValor] = useState(periodAtual);
  const [firstButtonDisable, setFirstButtonDisable] = useState(false);
  const [lastButtonDisable, setLastButtonDisable] = useState(false);
  const tableperiodo = [];
  const tableperiodoAux = [];

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

  useEffect(() => {
    setValor(periodAtual);
  }, [periodAtual]);

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
    return tableperiodoAux;
  });

  const proximoPeriodo = () => {
    setTransc([]);
    let index = tableperiodoAux.indexOf(valor);
    index++;
    setFirstButtonDisable(index === 0);
    setLastButtonDisable(index >= tableperiodoAux.length - 1);
    setValor(tableperiodoAux[index]);
    handleSelect(tableperiodoAux[index]);
  };

  const antPeriodo = () => {
    setTransc([]);
    let index = tableperiodoAux.indexOf(valor);
    index--;
    setFirstButtonDisable(index === 0);
    setLastButtonDisable(index >= tableperiodoAux.length - 1);
    setValor(tableperiodoAux[index]);
    handleSelect(tableperiodoAux[index]);
  };

  const handleChange = (event) => {
    setTransc([]);
    setValor(event.target.value);
    handleSelect(event.target.value);
    let index = tableperiodoAux.indexOf(event.target.value);
    setFirstButtonDisable(index === 0);
    setLastButtonDisable(index >= tableperiodoAux.length - 1);
  };

  return (
    <div className={css.divSelect}>
      <button
        className={`waves-effect waves-light btn ${css.botao}`}
        disabled={firstButtonDisable}
        onClick={antPeriodo}
      >
        &lt;
      </button>
      <select
        className={`browser-default ${css.combo}`}
        value={valor}
        onChange={handleChange}
      >
        {tableperiodo.map((transaction) => {
          return (
            <option key={transaction.id} value={transaction.yearMonth}>
              {transaction.yearMonthBarra}
            </option>
          );
        })}
      </select>
      <button
        className={`waves-effect waves-light btn ${css.botao}`}
        disabled={lastButtonDisable}
        onClick={proximoPeriodo}
      >
        &gt;
      </button>
    </div>
  );
}
