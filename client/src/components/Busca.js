import React from 'react';
import css from './busca.module.css';

export default function Busca({
  value,
  onChange,
  onClick,
  localPesquisa,
  handlePesquisa,
}) {
  const changeInput = (event) => {
    onChange(event.target.value);
  };

  const changePesquisa = (event) => {
    handlePesquisa(event.target.value);
  };

  const handleClickButton = () => {
    onClick();
  };

  return (
    <div className={css.divPrincipal}>
      <button
        className="waves-effect waves-light btn"
        onClick={handleClickButton}
        title="Botão para adicionar"
      >
        + Novo lançamento
      </button>
      <div className={`input-field ${css.divSelect}`}>
        <select
          id="selectLocal"
          className={`browser-default ${css.combo}`}
          value={localPesquisa}
          onChange={changePesquisa}
          title="Local da busca"
        >
          <option key="1" value="descricao">
            Descrição
          </option>
          <option key="2" value="categoria">
            Categoria
          </option>
          <option key="3" value="dia">
            Dia
          </option>
        </select>
        <label className={`active ${css.labelSelect}`} htmlFor="selectLocal">
          Local da busca
        </label>
      </div>
      {localPesquisa !== 'dia' && (
        <div className={`input-field ${css.divInput}`}>
          <input
            id="inputBusca"
            placeholder="Filtro"
            type="text"
            value={value}
            onChange={changeInput}
            title="Conteúdo da busca"
          />
          <label className="active" htmlFor="inputBusca">
            Conteúdo da busca
          </label>
        </div>
      )}
      {localPesquisa === 'dia' && (
        <div className={`input-field ${css.divInput}`}>
          <input
            id="buscaDia"
            placeholder="Filtro"
            type="number"
            value={value}
            min="1"
            max="31"
            step="1"
            onChange={changeInput}
            title="Conteúdo da busca"
          />
          <label className="active" htmlFor="" buscaDia>
            Conteúdo da busca
          </label>
        </div>
      )}
    </div>
  );
}
