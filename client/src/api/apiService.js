import axios from 'axios';

const API_URL = 'http://localhost:3001/api/transaction';

async function getAllTransactions(periodo) {
  const res = await axios.get(`${API_URL}${periodo}`);

  const transactions = res.data.map((transaction) => {
    const {
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay,
      type,
    } = transaction;

    return {
      ...transaction,
      descriptionLowerCase: description.toLowerCase(),
      categoryLowerCase: category.toLowerCase(),
      isDeleted: false,
    };
  });

  return transactions;
}

/*async function insertGrade(grade) {
  const response = await axios.post(API_URL, grade);
  return response.data.id;
}

async function updateGrade(grade) {
  const response = await axios.put(API_URL, grade);
  return response.data;
}

async function deleteGrade(grade) {
  const response = await axios.delete(`${API_URL}/${grade.id}`);
  return response.data;
}

async function getValidationFromGradeType(gradeType) {
  const gradeValidation = GRADE_VALIDATION.find(
    (item) => item.gradeType === gradeType
  );

  const { minValue, maxValue } = gradeValidation;

  return {
    minValue,
    maxValue,
  };
}*/

export { getAllTransactions };
// insertGrade,
// updateGrade,
// deleteGrade,
// getValidationFromGradeType,
