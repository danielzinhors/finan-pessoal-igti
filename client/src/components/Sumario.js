import React from 'react';
import css from './sumario.module.css';
import { formatCurrency } from '../helpers/formatHelpers.js';

export default function Sumario({ transaction }) {
  let totalLanc = transaction.length;
  let totalRec = transaction
    .filter((transac) => {
      return transac.type === '+';
    })
    .reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);
  let totalDesp = transaction
    .filter((transac) => {
      return transac.type === '-';
    })
    .reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);
  let saldo = totalRec - totalDesp;
  let classeSaldo = css.corPositivo;
  if (saldo < 0) {
    classeSaldo = css.corNegativo;
  }
  return (
    <div className={css.divPrincipal}>
      <span>
        <strong>Lançamentos: </strong>
        {totalLanc}
      </span>
      <span>
        <strong>
          Receitas:{' '}
          <span className={css.corPositivo}>{formatCurrency(totalRec)}</span>
        </strong>
      </span>
      <span>
        <strong>
          Despesas:{' '}
          <span className={css.corNegativo}>{formatCurrency(totalDesp)}</span>
        </strong>
      </span>
      <span>
        <strong>
          Saldo: <span className={classeSaldo}>{formatCurrency(saldo)}</span>
        </strong>
      </span>
    </div>
  );
}
