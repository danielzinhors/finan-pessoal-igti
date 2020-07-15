import React, { useState, useEffect } from 'react';
import * as api from './api/apiService.js';
import Spinner from './components/Spinner.js';
import TransactionControl from './components/TransactionControl.js';
import Select from './components/Select.js';

export default function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [Transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [period, setPeridod] = useState('');

  useEffect(() => {
    const getTransactions = async () => {
      const transaction = await api.getAllTransactions('');
      setTimeout(() => {
        setAllTransactions(transaction);
      }, 2000);
    };

    getTransactions();
  }, []);

  useEffect(() => {
    const getTransaction = async () => {
      const transactions = await api.getAllTransactions(period);
      setTimeout(() => {
        setTransactions(transactions);
      }, 2000);
    };

    getTransaction();
  }, [period]);

  const handleSelect = (newValue) => {
    setPeridod(`?periodo=${newValue}`);
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

  const handlePersist = (grade) => {
    //setSelectedGrade(grade);
    // setIsModalOpen(true);
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

  return (
    <div className="container">
      <h4 className="center">
        <b>Desafio Final do Bootcamp Full Stack</b>
      </h4>
      <h4 className="center">Controle Financeiro Pessoal</h4>
      {allTransactions.length > 0 && (
        <Select transactions={allTransactions} handleSelect={handleSelect} />
      )}
      {Transactions.length === 0 && <Spinner />}
      {Transactions.length > 0 && (
        <TransactionControl
          transactions={Transactions}
          onDelete={handleDelete}
          onPersist={handlePersist}
        />
      )}
    </div>
  );
}
