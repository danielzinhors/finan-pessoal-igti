import React from 'react';
import css from './busca.module.css';

export default function Busca({ value, onChange }) {
  const changeInput = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className={css.divPrincipal}>
      <button className="waves-effect waves-light btn">
        + Novo lançamento
      </button>
      <div className={`input-field ${css.divInput}`}>
        <input
          placeholder="Filtro"
          type="text"
          value={value}
          onChange={changeInput}
        />
      </div>
    </div>
  );
}
