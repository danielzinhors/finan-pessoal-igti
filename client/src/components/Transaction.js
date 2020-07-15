import React from 'react';
import Action from './Action';
import css from './transaction.module.css';

export default function Transaction({ transaction, onDelete, onUpdate }) {
  const handleActionClick = (type) => {
    if (type === 'delete') {
      onDelete(transaction);
      return;
    }

    onUpdate(transaction);
  };
  let classe = '';
  if (transaction.type === '-') {
    classe = css.divNegativa;
  } else {
    classe = css.divPositiva;
  }
  return (
    <div className="row">
      <div className="col s12">
        <div className={classe}>
          <span className={css.dia}>{transaction.day}</span>
          <div className={css.divDadosValue}>
            <div className={css.divDados}>
              <span className={css.categoria}>{transaction.category}</span>
              <span className={css.descricao}>{transaction.description}</span>
            </div>
            <span className={css.valor}>{transaction.value}</span>
          </div>
          <div className={css.divActions}>
            <Action onActionClick={handleActionClick} type="edit" />
            <Action onActionClick={handleActionClick} type="delete" />
          </div>
        </div>
      </div>
    </div>
  );
}
