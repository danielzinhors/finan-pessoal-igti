import React, { useState, useEffect, useRef } from 'react';
import * as api from './api/apiService';
import Spinner from './components/Spinner';
import TransactionControl from './components/TransactionControl';
import Select from './components/Select';
import Sumario from './components/Sumario';
import Busca from './components/Busca';
import TransactionModal from './components/TransctionModal';

export default function App() {
  let [allTransactions, setAllTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [period, setPeriod] = useState('');
  const [valorInput, setValorInput] = useState('');
  const [yearMonth, setYearMonth] = useState('');
  const latestValorInput = useRef(valorInput);
  const [tituloModal, setTituloModal] = useState('');
  const [periodAtual, setPeriodAtual] = useState('');

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
        setPeriod(`?period=${data}`);
      }, 2000);
    };

    getTransactions();
  }, []);

  useEffect(() => {
    const getTransaction = async () => {
      const transac = await api.getAllTransactions(period);
      setTimeout(() => {
        setTransactions(getTransOrdenada(transac));
      }, 2000);
    };

    getTransaction();
  }, [period]);

  useEffect(() => {
    if (latestValorInput.current !== valorInput) {
      latestValorInput.current = valorInput;
      let trans;
      if (valorInput !== '') {
        trans = transactions.filter((transac) => {
          return transac.description.toLowerCase().includes(valorInput);
        });
      } else {
        trans = allTransactions.filter((transac) => {
          return transac.yearMonth === yearMonth;
        });
      }
      setTransactions(getTransOrdenada(trans));
    }
  }, [valorInput, allTransactions, yearMonth, transactions]);

  const handleSelect = (newValue) => {
    setYearMonth(newValue);
    setPeriod(`?period=${newValue}`);
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
      <h4 className="center">
        <b>Desafio Final do Bootcamp Full Stack</b>
      </h4>
      <h4 className="center">Controle Financeiro Pessoal</h4>
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
      {transactions.length === 0 && allTransactions.length > 0 && (
        <Spinner titulo="Carregando transações" />
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
