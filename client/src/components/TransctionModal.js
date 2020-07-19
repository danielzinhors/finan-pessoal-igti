import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import css from './transactionModal.module.css';

Modal.setAppElement('#root');

export default function TransactionModal({
  onSave,
  onClose,
  selectedTransaction,
  titulo,
}) {
  const {
    id,
    description,
    category,
    type,
    value,
    year,
    day,
    month,
    yearMonth,
    yearMonthDay,
  } = selectedTransaction;

  const [transacDescription, setTransacDescription] = useState(description);
  const [transacCategory, setTransacCategory] = useState(category);
  const [transacType, setTransacType] = useState(type);
  const [transacValue, setTransacValue] = useState(value);
  const [transacYear, setTransacYear] = useState(year);
  const [transacDay, setTransacDay] = useState(day);
  const [transacMonth, setTransacMonth] = useState(month);
  const [transacYearMonth, setTransacYearMonth] = useState(yearMonth);
  const [transacYearMonthDay, setTransacYearMonthDay] = useState(yearMonthDay);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = {
      id,
      description: transacDescription,
      category: transacCategory,
      type: transacType,
      value: transacValue,
      year: transacYear,
      day: transacDay,
      month: transacMonth,
      yearMonth: transacYearMonth,
      yearMonthDay: transacYearMonthDay,
    };

    onSave(formData);
  };

  const handleModalClose = () => {
    onClose(null);
  };

  /* const handleGradeChange = (event) => {
    setGradeValue(+event.target.value);
  };*/

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

  const handleChangeType = (event) => {
    console.log(event.target.value);
    setTransacType(event.target.value);
  };

  const handleTransacDescription = (event) => {
    setTransacDescription(event.target.value);
  };

  const handleTransacCategory = (event) => {
    setTransacCategory(event.target.value);
  };

  const handleChangeValue = (event) => {
    setTransacValue(+event.target.value);
  };

  const handleChangeDate = (event) => {
    let data = event.target.value;
    var dNow = new Date(data);
    let month = dNow.getMonth() + 1;
    let year = dNow.getFullYear();
    let dia = dNow.getDate() + 1;
    let monthComZero = ('00' + month).slice(-2); // "01"
    let diaComZero = ('00' + dia).slice(-2);
    setTransacYearMonthDay(`${year}-${monthComZero}-${diaComZero}`);
    setTransacYearMonth(`${year}-${monthComZero}`);
    setTransacYear(year);
    setTransacDay(dia);
    setTransacMonth(month);
  };

  return (
    <div className="col s4">
      <Modal isOpen={true} style={customStyles}>
        <div className={`${css.flexRow} col s6`}>
          <span className={css.title}>{titulo}</span>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={handleModalClose}
          >
            X
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className={css.modalBody}>
          <div className="input-field col s6">
            {transacType === '+' && (
              <p>
                <label>
                  <input
                    id="inputType"
                    name="type"
                    type="radio"
                    value="+"
                    checked
                    onChange={handleChangeType}
                  />
                  <span htmlFor="inputType">Receita</span>
                </label>
                <label>
                  <input
                    id="inputType"
                    name="type"
                    type="radio"
                    value="-"
                    onChange={handleChangeType}
                  />
                  <span htmlFor="inputType">Despesa</span>
                </label>
              </p>
            )}
            {transacType === '-' && (
              <p>
                <label>
                  <input
                    id="inputType"
                    name="type"
                    type="radio"
                    value="+"
                    onChange={handleChangeType}
                  />
                  <span htmlFor="inputType">Receita</span>
                </label>
                <label>
                  <input
                    id="inputType"
                    name="type"
                    type="radio"
                    value="-"
                    checked
                    onChange={handleChangeType}
                  />
                  <span htmlFor="inputType">Despesa</span>
                </label>
              </p>
            )}
          </div>
          <div className="input-field col s6">
            <input
              id="inputDescription"
              type="text"
              value={transacDescription}
              onChange={handleTransacDescription}
            />
            <label className="active" htmlFor="inputDescription">
              Descrição:
            </label>
          </div>

          <div className="input-field col s6">
            <input
              id="inputCategory"
              type="text"
              value={transacCategory}
              onChange={handleTransacCategory}
            />
            <label className="active" htmlFor="inputCategory">
              Categoria:
            </label>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input
                id="inputValue"
                type="number"
                value={transacValue}
                step="0.01"
                onChange={handleChangeValue}
              />
              <label className="active" htmlFor="inputValue">
                Valor:
              </label>
            </div>

            <div className="input-field col s6">
              <input
                id="inputYearMonthDay"
                type="date"
                value={transacYearMonthDay}
                onChange={handleChangeDate}
              />
              <label className="active" htmlFor="inputYearMonthDay">
                Data:
              </label>
            </div>
          </div>
          <div className={css.flexRow}>
            <button
              className="waves-effect waves-light btn"
              disabled={errorMessage.trim() !== ''}
            >
              Salvar
            </button>
            <span className={css.errorMessage}>{errorMessage}</span>
          </div>
        </form>
      </Modal>
    </div>
  );
}
