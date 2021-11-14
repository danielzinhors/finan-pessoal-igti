import React from 'react';
import Transaction from './Transaction.js';
import css from './transactionControl.module.css';

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
    <>
      <div className={`center col s12 ${css.div}`}>
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
    </>
  );
}
