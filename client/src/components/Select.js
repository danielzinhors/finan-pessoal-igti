import React from 'react';

export default function Select({ transactions, handleSelect }) {
  const tableperiodo = [];
  const tableperiodoAux = [];
  transactions.map((transac) => {
    if (tableperiodoAux.indexOf(transac.yearMonth) === -1) {
      let yearMonthBarra = transac.yearMonth;
      yearMonthBarra = yearMonthBarra.replace('-', '/');
      tableperiodo.push({
        id: transac.id,
        yearMonth: transac.yearMonth,
        yearMonthBarra: yearMonthBarra,
      });
      tableperiodoAux.push(transac.yearMonth);
    }
  });

  const handleChange = (event) => {
    handleSelect(event.target.value);
  };

  return (
    <div className="row">
      <select className="browser-default" onChange={handleChange}>
        {tableperiodo.map((transaction) => {
          return (
            <option key={transaction.id} value={transaction.yearMonth}>
              {transaction.yearMonthBarra}
            </option>
          );
        })}
      </select>
    </div>
  );
}
