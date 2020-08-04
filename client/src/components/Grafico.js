import React from 'react';
import Chart from 'react-google-charts';

export default function Grafico({ dataCategories, tipoGrafico }) {
  const graficoOptions = {
    pieHole: 10,
    legend: {
      position: 'rigth',
      alignment: 'center',
      textStyle: {
        color: '233238',
        fontSize: 14,
      },
    },
    tooltip: {
      showColorCode: true,
    },
    chartArea: {
      left: 50,
      top: 5,
      width: '100%',
      height: '90%',
    },
    width: '100%',
    is3D: true,
  };

  const dataGrafico = [['Category', 'Valor'], ...dataCategories];
  return (
    <div id="chart" className="center">
      <Chart
        chartType={tipoGrafico}
        width="100%"
        height="100%"
        data={dataGrafico}
        options={graficoOptions}
      />
    </div>
  );
}
