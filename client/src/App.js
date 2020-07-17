import React, { useState, useEffect, useRef } from 'react';
import * as api from './api/apiService';
import Spinner from './components/Spinner';
import TransactionControl from './components/TransactionControl';
import Select from './components/Select';
import Sumario from './components/Sumario';
import Busca from './components/Busca';
import TransactionModal from './components/TransctionModal';

export default function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [period, setPeriod] = useState('');
  // const [valorSelect, setValorSelect] = useState('');
  const [valorInput, setValorInput] = useState('');
  const [yearMonth, setYearMonth] = useState('');
  const latestValorInput = useRef(valorInput);

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
    var localdate = `${dNow.getFullYear()}-${month}`;
    return localdate;
  }

  useEffect(() => {
    const getTransactions = async () => {
      const transaction = await api.getAllTransactions('');
      setTimeout(() => {
        setAllTransactions(transaction);
        let data = getDataAtual();
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
        setTransactions(transac);
      }, 2000);
    };

    getTransaction();
  }, [period]);

  useEffect(() => {
    if (latestValorInput.current !== valorInput) {
      latestValorInput.current = valorInput;
      let trans;
      if (valorInput != '') {
        trans = transactions.filter((transac) => {
          return transac.description.toLowerCase().includes(valorInput);
        });
      } else {
        trans = allTransactions.filter((transac) => {
          return transac.yearMonth == yearMonth;
        });
      }
      setTransactions(trans);
    }
  }, [valorInput]);

  const handleSelect = (newValue) => {
    setYearMonth(newValue);
    setPeriod(`?period=${newValue}`);
  };

  const handleDelete = async (gradeToDelete) => {
    /*const isDeleted = await api.deleteGrade(gradeToDelete);

    if (isDeleted) {
      const deletedGradeIndex = allGrades.findIndex(
        (grade) => grade.id === gradeToDelete.id
      );

      const newGrades = Object.assign([], allGrades);
      newGrades[deletedGradeIndex].isDeleted = true;
      newGrades[deletedGradeIndex].value = 0;

      setAllGrades(newGrades);
    }*/
  };

  const handlePersist = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handlePersistData = async (formData) => {
    /* const { id, newValue } = formData;

    const newGrades = Object.assign([], allGrades);

    const gradeToPersist = newGrades.find((grade) => grade.id === id);
    gradeToPersist.value = newValue;

    if (gradeToPersist.isDeleted) {
      gradeToPersist.isDeleted = false;
      await api.insertGrade(gradeToPersist);
    } else {
      await api.updateGrade(gradeToPersist);
    }

    setIsModalOpen(false);*/
  };

  const handleClose = () => {
    //    setIsModalOpen(false);
  };

  const handleButton = (sobe) => {};

  const handleInput = (newValue) => {
    setValorInput(newValue);
  };

  return (
    <div className="container">
      <h4 className="center">
        <b>Desafio Final do Bootcamp Full Stack</b>
      </h4>
      <h4 className="center">Controle Financeiro Pessoal</h4>
      {allTransactions.length > 0 && (
        <Select
          //value={valorSelect}
          transactions={allTransactions}
          handleSelect={handleSelect}
          //  handleButton={handleSelect}
        />
      )}
      {transactions.length === 0 && <Spinner />}
      {transactions.length > 0 && <Sumario transaction={transactions} />}
      {transactions.length > 0 && (
        <Busca value={valorInput} onChange={handleInput} />
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
          onSave={handlePersistData}
          onClose={handleClose}
          selectedTransaction={selectedTransaction}
        />
      )}
    </div>
  );
}
