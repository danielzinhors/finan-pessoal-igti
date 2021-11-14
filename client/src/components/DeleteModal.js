import React, { useEffect } from 'react';
import Modal from 'react-modal';
import css from './transactionModal.module.css';
import Spinner from './Spinner';

Modal.setAppElement('#root');

export default function DeleteModal({
  onClose,
  onDelete,
  transaction,
  deletando,
}) {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (!deletando) {
      if (event.key === 'Escape') {
        onClose(null);
      }
    }
  };

  const handleModalClose = () => {
    onClose(null);
  };

  const handleDelete = () => {
    onDelete();
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <div className="col s4">
      <Modal isOpen={true} style={customStyles}>
        <div className={`${css.flexRow} col s6`}>
          <span title="Pergunta">Pergunta</span>
        </div>
        <div>
          <p
            className={css.title}
            title="Deseja realmente excluir a transação:"
          >
            Deseja realmente excluir a transação:
          </p>
          <p
            className={css.title}
            title={`${transaction.description} do dia ${transaction.day}?`}
          >
            {transaction.description} do dia {transaction.day}?
          </p>
        </div>
        <div className={css.flexRow}>
          <button
            className="waves-effect waves-light btn red dark-4"
            onClick={handleDelete}
            title="Sim"
            disabled={deletando}
          >
            Sim
          </button>
          <button
            className="waves-effect waves-lights btn"
            onClick={handleModalClose}
            title="Nâo"
            disabled={deletando}
          >
            Não
          </button>
        </div>
        <div>{deletando && <Spinner titulo="excluindo transação" />}</div>
      </Modal>
    </div>
  );
}
