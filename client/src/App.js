import React, { useState, useEffect, useRef } from 'react';
import * as api from './api/apiService';
import Spinner from './components/Spinner';
import TransactionControl from './components/TransactionControl';
import Select from './components/Select';
import Sumario from './components/Sumario';
import Busca from './components/Busca';
import TransactionModal from './components/TransctionModal';
import css from './app.module.css';
import Grafico from './components/Grafico';
import { getDataAtual } from './helpers/DataHelper';

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
  const [salvando, setSalvando] = useState(false);
  const [localPesquisa, setlocalPesquisa] = useState('descricao');
  const latestLocal = useRef(localPesquisa);
  const [tipoChartDespesa, setTipoChartDespesa] = useState('PieChart');

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
        let data = getDataAtual;
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
    if (
      latestValorInput.current !== valorInput ||
      latestLocal.current !== localPesquisa
    ) {
      latestValorInput.current = valorInput;
      latestLocal.current = localPesquisa;
      let trans;
      if (valorInput !== '') {
        switch (localPesquisa) {
          case 'categoria':
            trans = transactionsBusca.filter((transac) => {
              let semAcento = transac.category
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase();
              return semAcento.includes(
                valorInput.normalize('NFD').toLowerCase()
              );
            });
            break;
          case 'dia':
            trans = transactionsBusca.filter((transac) => {
              return transac.day === parseInt(valorInput);
            });
            break;
          default:
            trans = transactionsBusca.filter((transac) => {
              let semAcento = transac.description
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase();
              return semAcento.includes(
                valorInput.normalize('NFD').toLowerCase()
              );
            });
            break;
        }
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
  }, [
    valorInput,
    allTransactions,
    yearMonth,
    transactions,
    transactionsBusca,
    localPesquisa,
  ]);

  const handleSelect = (newValue) => {
    setYearMonth(newValue);
    setPeriod(newValue);
  };

  const handleDelete = async (transactionToDelete) => {
    const isDeleted = await api.deleteTransaction(transactionToDelete);

    if (isDeleted) {
      const transc = await api.getAllTransactions('');
      setPeriodAtual(transactionToDelete.yearMonth);
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
    setSalvando(true);
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
    setPeriodAtual(transacToPersist.yearMonth);
    allTransactions = transc;
    setYearMonth(transacToPersist.yearMonth);
    let trans = allTransactions.filter((transac) => {
      return transac.yearMonth === yearMonth;
    });
    setTransactions(getTransOrdenada(trans));
    setSelectedTransaction({});
    setIsModalOpen(false);
    setSalvando(false);
  };

  const handleClose = () => {
    setSelectedTransaction({});
    setIsModalOpen(false);
    setSalvando(false);
  };

  const handleClickButtonAdd = () => {
    setTituloModal('Adicionando Transação');
    setSalvando(false);
    setIsModalOpen(true);
  };

  const handleInput = (newValue) => {
    setValorInput(newValue);
  };

  const handleLocalPesquisa = (newValue) => {
    setlocalPesquisa(newValue);
  };

  let dataDespesas = [];
  let dataReceitas = [];

  transactions.forEach(({ type, category }) => {
    if (dataDespesas.indexOf(category) === -1) {
      if (type === '-') {
        dataDespesas.push(category);
      } else {
        dataReceitas.push(category);
      }
    }
  });

  dataDespesas = dataDespesas
    .sort((a, b) => a.localeCompare(b))
    .map((dataCategory) => {
      const totalCategory = transactions.reduce((acc, cur) => {
        if (cur.category === dataCategory && cur.type === '-')
          return acc + cur.value;
        return acc;
      }, 0);
      return [dataCategory, totalCategory];
    });

  dataReceitas = dataReceitas
    .sort((a, b) => a.localeCompare(b))
    .map((dataCategory) => {
      const totalCategory = transactions.reduce((acc, cur) => {
        if (cur.category === dataCategory && cur.type === '+')
          return acc + cur.value;
        return acc;
      }, 0);
      return [dataCategory, totalCategory];
    });

  const handleTipoChart = (event) => {
    setTipoChartDespesa(event.target.value);
  };

  return (
    <>
      <header>
        <div className={`navbar-fixed ${css.nav}`}>
          <nav className="teal">
            <div className="navbar-home">
              <div className="content-header">
                <div className={css.divTitulo}>
                  <img
                    className={css.logo}
                    src="https://imagepng.org/wp-content/uploads/2019/05/dinheiro-icone-3.png"
                    alt=""
                    height="100px"
                    width="100px"
                  />
                  <div className={css.titulo}>
                    <h6 className="center">
                      <b>Desafio Final do Bootcamp Full Stack</b>
                    </h6>
                    <h6 className="center">Controle Financeiro Pessoal</h6>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <div className={`container ${css.divContainer}`}>
        <div className="row">
          {allTransactions.length === 0 && (
            <Spinner titulo="Carregando períodos" />
          )}
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
              localPesquisa={localPesquisa}
              handlePesquisa={handleLocalPesquisa}
            />
          )}
          {transactions.length === 0 &&
            allTransactions.length > 0 &&
            encontrou && <Spinner titulo="Carregando transações" />}
          {!encontrou && (
            <div className={css.divNaoEncontrou}>
              <p>
                Não foi localizado nenhuma transação com a descrição "
                {valorInput}"
              </p>
            </div>
          )}
          {transactions.length > 0 && (
            <div className={`col s6`}>
              <TransactionControl
                transactions={transactions}
                onDelete={handleDelete}
                onPersist={handlePersist}
              />
            </div>
          )}
          <div>
            {(dataDespesas.length > 0 || dataReceitas.length > 0) && (
              <div>
                <label className={`input-field ${css.labelSelect}`}>
                  Tipo de gráfico
                </label>
                <select
                  id="selectLocal"
                  className={`browser-default ${css.combo}`}
                  value={tipoChartDespesa}
                  onChange={handleTipoChart}
                  title="Tipo de grafico"
                >
                  <option key="1" value="PieChart">
                    Pizza
                  </option>
                  <option key="2" value="BarChart">
                    Barras
                  </option>
                  <option key="3" value="ScatterChart">
                    Pontos
                  </option>
                  <option key="4" value="AreaChart">
                    Área
                  </option>
                  <option key="5" value="ColumnChart">
                    Colunas
                  </option>
                </select>
              </div>
            )}
            {dataDespesas.length > 0 && (
              <div className={`center col s6 ${css.divGrafico}`}>
                <span className="font-large">
                  <b>Despesas por categoria</b>
                </span>

                <Grafico
                  dataCategories={dataDespesas}
                  tipoGrafico={tipoChartDespesa}
                />
              </div>
            )}
            {dataReceitas.length > 0 && (
              <div className={`center col s6 ${css.divGrafico}`}>
                <span className="font-large">
                  <b>Receitas por categoria</b>
                </span>
                <Grafico
                  dataCategories={dataReceitas}
                  tipoGrafico={tipoChartDespesa}
                />
              </div>
            )}
          </div>

          {isModalOpen && (
            <TransactionModal
              titulo={tituloModal}
              onSave={handlePersistData}
              onClose={handleClose}
              selectedTransaction={selectedTransaction}
              salvando={salvando}
            />
          )}
        </div>
      </div>
    </>
  );
}
