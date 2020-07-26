import React, { useState, useEffect, useRef } from 'react';
import * as api from './api/apiService';
import Spinner from './components/Spinner';
import TransactionControl from './components/TransactionControl';
import Select from './components/Select';
import Sumario from './components/Sumario';
import Busca from './components/Busca';
import TransactionModal from './components/TransctionModal';
import css from './app.module.css';

export default function App() {
  let [allTransactions, setAllTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [transactionsBusca, setTransactionsBusca] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [period, setPeriod] = useState('');
  const [valorInput, setValorInput] = useState('');
  const [yearMonth, setYearMonth] = useState('');
  const latestValorInput = useRef(valorInput);
  const [tituloModal, setTituloModal] = useState('');
  const [periodAtual, setPeriodAtual] = useState('');
  const [encontrou, setEncontrou] = useState(true);

  function getDataAtual() {
    var dNow = new Date();
    let month = dNow.getMonth() + 1;
    var localdate = `${dNow.getFullYear()}-${('0' + month).slice(-2)}`;
    return localdate;
  }

  function getTransOrdenada(transc) {
    const trans = transc.sort((a, b) => {
      return a.day - b.day;
    });
    return trans;
  }

  useEffect(() => {
    const getTransactions = async () => {
      const transaction = await api.getAllTransactions('');
      setTimeout(() => {
        setAllTransactions(transaction);
        let data = getDataAtual();
        setPeriodAtual(data);
        setYearMonth(data);
        setPeriod(data);
      }, 2000);
    };

    getTransactions();
  }, []);

  useEffect(() => {
    const getTransaction = async () => {
      const transac = await api.getAllTransactions(period);
      setTimeout(() => {
        setTransactions(getTransOrdenada(transac));
        setTransactionsBusca(getTransOrdenada(transac));
      }, 2000);
    };
    if (period !== '') {
      getTransaction();
    }
  }, [period]);

  useEffect(() => {
    if (latestValorInput.current !== valorInput) {
      latestValorInput.current = valorInput;
      let trans;
      if (valorInput !== '') {
        trans = transactionsBusca.filter((transac) => {
          let semAcento = transac.description
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
          return semAcento.includes(valorInput.normalize('NFD').toLowerCase());
        });
        if (trans.length > 0) {
          setEncontrou(true);
        } else {
          setEncontrou(false);
        }
      } else {
        trans = transactionsBusca;
        setEncontrou(true);
      }
      setTransactions(getTransOrdenada(trans));
    }
  }, [valorInput, allTransactions, yearMonth, transactions, transactionsBusca]);

  const handleSelect = (newValue) => {
    setYearMonth(newValue);
    setPeriod(newValue);
  };

  const handleDelete = async (transactionToDelete) => {
    const isDeleted = await api.deleteTransaction(transactionToDelete);

    if (isDeleted) {
      const transc = await api.getAllTransactions('');
      allTransactions = transc;
      setYearMonth(transactionToDelete.yearMonth);
      let trans = allTransactions.filter((transac) => {
        return transac.yearMonth === yearMonth;
      });
      setTransactions(getTransOrdenada(trans));
    }
  };

  const handlePersist = (transaction) => {
    setSelectedTransaction(transaction);
    setTituloModal('Editando Transação');
    setIsModalOpen(true);
  };

  const handlePersistData = async (formData) => {
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
    } = formData;
    let transacToPersist = allTransactions.find((transac) => transac.id === id);
    if (transacToPersist !== undefined) {
      transacToPersist.id = id;
      transacToPersist.description = description;
      transacToPersist.category = category;
      transacToPersist.type = type;
      transacToPersist.value = value;
      transacToPersist.year = year;
      transacToPersist.day = day;
      transacToPersist.month = month;
      transacToPersist.yearMonth = yearMonth;
      transacToPersist.yearMonthDay = yearMonthDay;
    } else {
      transacToPersist = formData;
    }
    if (transacToPersist.id === undefined) {
      await api.insertTransaction(transacToPersist);
    } else {
      await api.updateTransaction(transacToPersist);
    }
    const transc = await api.getAllTransactions('');
    allTransactions = transc;
    setYearMonth(transacToPersist.yearMonth);
    let trans = allTransactions.filter((transac) => {
      return transac.yearMonth === yearMonth;
    });
    setTransactions(getTransOrdenada(trans));
    setSelectedTransaction({});
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setSelectedTransaction({});
    setIsModalOpen(false);
  };

  const handleClickButtonAdd = () => {
    setTituloModal('Adicionando Transação');
    setIsModalOpen(true);
  };

  const handleInput = (newValue) => {
    setValorInput(newValue);
  };

  return (
    <div className="container">
      <div className={css.divTitulo}>
        <img
          className={css.logo}
          src="https://imagepng.org/wp-content/uploads/2019/05/dinheiro-icone-3.png"
          alt=""
          height="150px"
          width="150px"
        />
        <div className={css.titulo}>
          <h4 className="center">
            <b>Desafio Final do Bootcamp Full Stack</b>
          </h4>
          <h4 className="center">Controle Financeiro Pessoal</h4>
        </div>
      </div>
      {allTransactions.length === 0 && <Spinner titulo="Carregando períodos" />}
      {allTransactions.length > 0 && !isModalOpen && (
        <Select
          transactions={allTransactions}
          handleSelect={handleSelect}
          periodAtual={periodAtual}
          setTransc={setTransactions}
        />
      )}
      {transactions.length > 0 && !isModalOpen && (
        <Sumario transaction={transactions} />
      )}
      {allTransactions.length > 0 && !isModalOpen && (
        <Busca
          value={valorInput}
          onChange={handleInput}
          onClick={handleClickButtonAdd}
        />
      )}
      {transactions.length === 0 && allTransactions.length > 0 && encontrou && (
        <Spinner titulo="Carregando transações" />
      )}
      {!encontrou && (
        <div className={css.divNaoEncontrou}>
          <p>
            Não foi localizado nenhuma transação com a descrição "{valorInput}"
          </p>
        </div>
      )}
      {transactions.length > 0 && (
        <TransactionControl
          transactions={transactions}
          onDelete={handleDelete}
          onPersist={handlePersist}
        />
      )}

      {isModalOpen && (
        <TransactionModal
          titulo={tituloModal}
          onSave={handlePersistData}
          onClose={handleClose}
          selectedTransaction={selectedTransaction}
        />
      )}
    </div>
  );
}
