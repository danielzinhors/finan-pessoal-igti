import React, { useState } from 'react';
import Action from './Action';
import css from './transaction.module.css';
import { formatCurrency } from '../helpers/formatHelpers.js';
import DeleteModal from './DeleteModal';

export default function Transaction({ transaction, onDelete, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const handleActionClick = (type) => {
    if (type === 'delete') {
      setIsModalOpen(true);
      return;
    }
    onUpdate(transaction);
  };

  const handleDelete = async () => {
    setSalvando(true);
    let deletou = await onDelete(transaction);
    if (deletou) {
      setIsModalOpen(false);
    }
  };

  const handleClose = () => {
    transaction = [];
    setSalvando(false);
    setIsModalOpen(false);
  };

  let classe = '';
  if (transaction.type === '-') {
    classe = css.divNegativa;
  } else {
    classe = css.divPositiva;
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

  return (
    <div className={classe}>
      <span className={css.dia} title="Dia">
        {transaction.day}
      </span>
      <div className={css.divDadosValue}>
        <div className={css.divDados}>
          <span className={css.categoria} title="Descrição">
            {transaction.description}
          </span>
          <span className={css.descricao} title="Categoria">
            {transaction.category}
          </span>
          <span className={css.descricao} title="Ano e Mês">
            {getMesAno(transaction.month, transaction.year)}
          </span>
        </div>
        <span className={css.valor} title="Valor">
          {formatCurrency(transaction.value)}
        </span>
      </div>
      <div className={css.divActions}>
        <Action onActionClick={handleActionClick} type="edit" titulo="Editar" />
        <Action
          onActionClick={handleActionClick}
          type="delete"
          titulo="Deletar"
        />
      </div>
      {isModalOpen && (
        <DeleteModal
          onClose={handleClose}
          onDelete={handleDelete}
          transaction={transaction}
          salvando={salvando}
        />
      )}
    </div>
  );
}
