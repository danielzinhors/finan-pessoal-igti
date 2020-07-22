import axios from 'axios';

const API_URL = '/api/transaction';

async function getAllTransactions(periodo) {
  const res = await axios.get(`${API_URL}${periodo}`);

  const transactions = res.data.map((transaction) => {
    const { description, category } = transaction;

    return {
      ...transaction,
      descriptionLowerCase: description.toLowerCase(),
      categoryLowerCase: category.toLowerCase(),
      isDeleted: false,
    };
  });

  return transactions;
}

async function insertTransaction(transaction) {
  const response = await axios.post(API_URL, transaction);
  return response.data.id;
}

async function updateTransaction(transaction) {
  const response = await axios.put(`${API_URL}/${transaction.id}`, transaction);
  return response.data;
}

async function deleteTransaction(transaction) {
  const response = await axios.delete(`${API_URL}/${transaction.id}`);
  return response.data;
}

export {
  getAllTransactions,
  insertTransaction,
  updateTransaction,
  deleteTransaction,
};
