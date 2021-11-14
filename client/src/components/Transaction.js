import React, { useState } from 'react';
import Action from './Action';
import css from './transaction.module.css';
import { formatCurrency } from '../helpers/formatHelpers.js';
import DeleteModal from './DeleteModal';
import { getMesAno } from '../helpers/DataHelper';

export default function Transaction({ transaction, onDelete, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletando, setDeletando] = useState(false);

  const handleActionClick = (type) => {
    if (type === 'delete') {
      setIsModalOpen(true);
      return;
    }
    onUpdate(transaction);
  };

  const handleDelete = async () => {
    setDeletando(true);
    let deletou = await onDelete(transaction);
    if (deletou) {
      setIsModalOpen(false);
    }
  };

  const handleClose = () => {
    transaction = [];
    setDeletando(false);
    setIsModalOpen(false);
  };

  let classe = '';
  if (transaction.type === '-') {
    classe = css.divNegativa;
  } else {
    classe = css.divPositiva;
  }

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
          <span className={css.descricao} title="Mês e Ano">
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
          deletando={deletando}
        />
      )}
    </div>
  );
}
