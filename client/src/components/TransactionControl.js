import React from 'react';
import Transaction from './Transaction.js';

export default function TransactionsControl({
  transactions,
  onDelete,
  onPersist,
}) {
  const isDelete = (transac) => {
    onDelete(transac);
  };

  const isPersist = (transac) => {
    onPersist(transac);
  };

  return (
    <div className="container">
      {transactions.map((transac) => {
        return (
          <Transaction
            key={transac.id}
            transaction={transac}
            onDelete={isDelete}
            onUpdate={isPersist}
          />
        );
      })}
    </div>
  );
}

const styles = {
  goodGrade: {
    fontWeight: 'bold',
    color: 'green',
  },

  badGrade: {
    fontWeight: 'bold',
    color: 'red',
  },

  table: {
    margin: '20px',
    padding: '10px',
  },
};
