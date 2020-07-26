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

  const handleChangeType = (event) => {
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
    var dNow = new Date(getData(data));
    let month = dNow.getMonth() + 1;
    let year = dNow.getFullYear();
    let dia = dNow.getDate();
    let monthComZero = ('00' + month).slice(-2); // "01"
    //let diaComZero = ('00' + dia).slice(-2);
    setTransacYearMonthDay(data);
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
            title="Fechar"
          >
            X
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className={css.modalBody}>
          <div className="input-field col s6">
            {transacType === undefined && (
              <p>
                <label>
                  <input
                    id="inputType"
                    name="type"
                    type="radio"
                    value="+"
                    onChange={handleChangeType}
                    title="Receita"
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
                    title="Despesa"
                  />
                  <span htmlFor="inputType">Despesa</span>
                </label>
              </p>
            )}
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
                    title="Receita"
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
                    title="Despesa"
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
                    title="Receita"
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
                    title="Despesa"
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
                value={
                  transacYearMonthDay !== undefined
                    ? transacYearMonthDay
                    : getDataAtual()
                }
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
