import React, { useState, useEffect } from 'react';
import * as api from './api/apiService.js';
import Spinner from './components/Spinner.js';

export default function App() {
  const [allTransactions, setallTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getTransaction = async () => {
      const transaction = await api.getAllTransactions();
      setTimeout(() => {
        setallTransactions(transaction);
      }, 2000);
    };

    // api.getAllGrades().then((grades) => {
    //   setTimeout(() => {
    //     setAllGrades(grades);
    //   }, 2000);
    // });

    getTransaction();
  }, []);

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
    <div>
      <h1 className="center">Desafio Final do Bootcamp Full Stack</h1>
      {allTransactions.length > 0 && <Spinner />}
    </div>
  );
}
