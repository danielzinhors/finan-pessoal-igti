import React, { useEffect } from 'react';
import css from './sumario.module.css';
import { formatCurrency } from '../helpers/formatHelpers.js';
import { useState } from 'react';

export default function Sumario({ transaction }) {
  const [totalLanc, setTotalLanc] = useState(0);
  const [totalRec, setTotalRec] = useState(0);
  const [totalDesp, setTotalDesp] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [classeSaldo, setClasseSaldo] = useState('');

  useEffect(() => {
    if (transaction.length > 0) {
      setTotalLanc(transaction.length);
      let totalRecLocal = transaction
        .filter((transac) => {
          return transac.type === '+';
        })
        .reduce((acc, curr) => {
          return acc + curr.value;
        }, 0);
      setTotalRec(totalRecLocal);
      let totalDespLocal = transaction
        .filter((transac) => {
          return transac.type === '-';
        })
        .reduce((acc, curr) => {
          return acc + curr.value;
        }, 0);
      setTotalDesp(totalDespLocal);
      let saldoLocal = totalRec - totalDesp;
      setSaldo(saldoLocal);
    } else {
      setSaldo(0);
      setTotalDesp(0);
      setTotalLanc(0);
      setTotalRec(0);
    }
    setClasseSaldo(css.corPositivo);
    if (saldo < 0) {
      setClasseSaldo(css.corNegativo);
    }
  }, [transaction, saldo, totalRec, totalDesp]);

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
