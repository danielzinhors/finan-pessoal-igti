import React from 'react';
import css from './busca.module.css';

export default function Busca({ value, onChange, onClick }) {
  const changeInput = (event) => {
    onChange(event.target.value);
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
      <div className={`input-field ${css.divInput}`}>
        <input
          placeholder="Filtro"
          type="text"
          value={value}
          onChange={changeInput}
          title="Filtro da descrição"
        />
        <label className="active" htmlFor="inputYearMonthDay">
          Filtrar pela Descrição
        </label>
      </div>
    </div>
  );
}
