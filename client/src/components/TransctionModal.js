import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import css from './transactionModal.module.css';
import Spinner from './Spinner';

Modal.setAppElement('#root');

export default function TransactionModal({
  onSave,
  onClose,
  selectedTransaction,
  titulo,
  salvando,
}) {
  function getDataAtual() {
    var dNow = new Date();
    let month = dNow.getMonth() + 1;
    switch (month) {
      case 1:
        month = '01';
        break;
      case 2:
        month = '02';
        break;
      case 3:
        month = '03';
        break;
      case 4:
        month = '04';
        break;
      case 5:
        month = '05';
        break;
      case 6:
        month = '06';
        break;
      case 7:
        month = '07';
        break;
      case 8:
        month = '08';
        break;
      case 9:
        month = '09';
        break;
      default:
        break;
    }
    var localdate = `${dNow.getFullYear()}-${month}-${dNow.getDate()}`;
    return localdate;
  }

  function getData(data) {
    let mes = data.substr(5, 2);
    switch (mes) {
      case '01':
        mes = 'Jan';
        break;
      case '02':
        mes = 'Feb';
        break;
      case '03':
        mes = 'Mar';
        break;
      case '04':
        mes = 'Apr';
        break;
      case '05':
        mes = 'May';
        break;
      case '06':
        mes = 'June';
        break;
      case '07':
        mes = 'July';
        break;
      case '08':
        mes = 'Aug';
        break;
      case '09':
        mes = 'Sept';
        break;
      case '10':
        mes = 'Oct';
        break;
      case '11':
        mes = 'Nov';
        break;
      case '12':
        mes = 'Dec';
        break;
      default:
        break;
    } //Jan 1, 2000 00:00:00
    let dia = data.substr(8, 2);
    let ano = data.substring(0, 4);
    let date = `${mes} ${dia}, ${ano} 00:00:00`;
    return date;
  }

  const getDia = (data) => {
    let dNow = new Date(getData(data));
    let dia = dNow.getDate();
    return dia;
  };

  const getMes = (data) => {
    let dNow = new Date(getData(data));
    let month = dNow.getMonth() + 1;
    return month;
  };

  const getAno = (data) => {
    let dNow = new Date(getData(data));
    let year = dNow.getFullYear();
    return year;
  };

  const getMesComZero = (data) => {
    let dNow = new Date(getData(data));
    let month = dNow.getMonth() + 1;
    let monthComZero = ('00' + month).slice(-2); // "01"
    return monthComZero;
  };

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
  const [transacYear, setTransacYear] = useState(
    year !== undefined ? year : getAno(getDataAtual())
  );
  const [transacDay, setTransacDay] = useState(
    day !== undefined ? day : getDia(getDataAtual())
  );
  const [transacMonth, setTransacMonth] = useState(
    month !== undefined ? month : getMes(getDataAtual())
  );
  const [transacYearMonth, setTransacYearMonth] = useState(
    yearMonth !== undefined
      ? yearMonth
      : `${getAno(getDataAtual())}-${getMesComZero(getDataAtual())}`
  );
  const [transacYearMonthDay, setTransacYearMonthDay] = useState(
    yearMonthDay !== undefined ? yearMonthDay : getDataAtual()
  );
  const [errorMessage, setErrorMessage] = useState('');
  const positive = '+';
  const negative = '-';

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
    if (formData.type === undefined) {
      setErrorMessage('O tipo é obrigatório ser despesa ou receita!');
    } else if (formData.description === undefined) {
      setErrorMessage('A descrição é obrigatória!');
    } else if (formData.category === undefined) {
      setErrorMessage('A categoria é obrigatória!');
    } else if (formData.value === undefined) {
      setErrorMessage('O valor é obrigatório!');
    } else if (formData.description === undefined) {
      setErrorMessage('A descrição é obrigatória!');
    } else if (formData.yearMonthDay === undefined) {
      setErrorMessage('A data é obrigatória!');
    } else {
      onSave(formData, true);
    }
  };

  const handleModalClose = () => {
    onClose(null);
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

  const handleChangeTypePositive = (event) => {
    setTransacType(event.target.value);
  };

  const handleChangeTypeNegative = (event) => {
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
    setTransacYearMonthDay(data);
    setTransacYearMonth(`${getAno(data)}-${getMesComZero(data)}`);
    setTransacYear(getAno(data));
    setTransacDay(getDia(data));
    setTransacMonth(getMes(data));
  };

  return (
    <div className="col s6">
      <Modal isOpen={true} style={customStyles}>
        <div className={`${css.flexRow} col s6`}>
          <span className={css.title}>{titulo}</span>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={handleModalClose}
            title="Fechar"
            disabled={salvando}
          >
            X
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className={css.modalBody}>
          <div className="input-field col s6">
            <p>
              <label>
                <input
                  id="inputTypePositive"
                  type="radio"
                  value={positive}
                  onChange={handleChangeTypePositive}
                  title="Receita"
                  checked={transacType === '+'}
                />
                <span htmlFor="inputTypePositive">Receita</span>
              </label>
              <label>
                <input
                  id="inputTypeNegative"
                  type="radio"
                  value={negative}
                  checked={transacType === '-'}
                  onChange={handleChangeTypeNegative}
                  title="Despesa"
                />
                <span htmlFor="inputTypeNegative">Despesa</span>
              </label>
            </p>
          </div>
          <div className="input-field col s6">
            <input
              id="inputDescription"
              type="text"
              value={transacDescription}
              onChange={handleTransacDescription}
              title="Descrição"
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
              title="Categoria"
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
                title="Valor"
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
                title="Data"
              />
              <label className="active" htmlFor="inputYearMonthDay">
                Data:
              </label>
            </div>
          </div>
          <div className={css.flexRow}>
            <button
              className="waves-effect waves-light btn"
              text="Salvar"
              disabled={salvando}
            >
              Salvar
            </button>
            {salvando && <Spinner titulo="salvando transação" />}
            <span className={css.errorMessage}>{errorMessage}</span>
          </div>
        </form>
      </Modal>
    </div>
  );
}
