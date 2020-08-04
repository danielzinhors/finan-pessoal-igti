import React, { useState, useEffect } from 'react';
import css from './select.module.css';
import { getMesAno } from '../helpers/DataHelper';

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

  useEffect(() => {
    setValor(periodAtual);
  }, [periodAtual]);

  transactions.map((transac) => {
    if (tableperiodoAux.indexOf(transac.yearMonth) === -1) {
      let yearMonthBarra = transac.yearMonth;
      yearMonthBarra = getMesAno(transac.month, transac.year);
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
        title="Período anterior"
      >
        &lt;
      </button>
      <div>
        <label>Período</label>
        <select
          className={`browser-default ${css.combo}`}
          value={valor}
          onChange={handleChange}
          title="Período"
        >
          {tableperiodo.map((transaction) => {
            return (
              <option key={transaction.id} value={transaction.yearMonth}>
                {transaction.yearMonthBarra}
              </option>
            );
          })}
        </select>
      </div>
      <button
        className={`waves-effect waves-light btn ${css.botao}`}
        disabled={lastButtonDisable}
        onClick={proximoPeriodo}
        title="Próximo período"
      >
        &gt;
      </button>
    </div>
  );
}
