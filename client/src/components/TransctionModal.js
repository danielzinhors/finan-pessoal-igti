import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import * as api from '../api/apiService';

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

  /*useEffect(() => {
    const getValidation = async () => {
      const validation = await api.getValidationFromGradeType(type);
      setGradeValidation(validation);
    };

    getValidation();
  }, [type]);

  useEffect(() => {
    const { minValue, maxValue } = gradeValidation;

    if (gradeValue < minValue || gradeValue > maxValue) {
      setErrorMessage(
        `O valor da nota deve ser entre ${minValue} e ${maxValue} (inclusive)`
      );
      return;
    }

    setErrorMessage('');
  }, [gradeValue, gradeValidation]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });*/

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

  return (
    <div>
      <Modal isOpen={true}>
        <div style={styles.flexRow}>
          <span style={styles.title}>{titulo}</span>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={handleModalClose}
          >
            X
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div>
            <p>
              <label>
                <input name="group1" type="radio" checked />
                <span>Receita</span>
              </label>
              <label>
                <input name="group1" type="radio" />
                <span>Despesa</span>
              </label>
            </p>
          </div>
          <div className="input-field">
            <input
              id="inputDescription"
              type="text"
              value={transacDescription}
            />
            <label className="active" htmlFor="inputDescription">
              Descrição:
            </label>
          </div>

          <div className="input-field">
            <input id="inputCategory" type="text" value={transacCategory} />
            <label className="active" htmlFor="inputCategory">
              Categoria:
            </label>
          </div>
          <div>
            <div className="input-field">
              <input id="inputValue" type="number" value={transacValue} />
              <label className="active" htmlFor="inputValue">
                Valor:
              </label>
            </div>

            <div className="input-field">
              <input
                id="inputYearMonthDay"
                type="text"
                className="datepicker"
                value={transacYearMonthDay}
              />
              <label className="active" htmlFor="inputYearMonthDay">
                Data:
              </label>
            </div>
          </div>

          <div style={styles.flexRow}>
            <button
              className="waves-effect waves-light btn"
              disabled={errorMessage.trim() !== ''}
            >
              Salvar
            </button>
            <span style={styles.errorMessage}>{errorMessage}</span>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },

  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },

  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
  },
};
