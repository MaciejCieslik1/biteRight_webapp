import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './ProgressPage.css';
import NavBar from '../../components/NavBar';

const ProgressPage = () => {
  const [weightData, setWeightData] = useState([]);
  const [limitData, setLimitData] = useState([]);
  const [latestWeight, setLatestWeight] = useState(null);

  const [weightFilter, setWeightFilter] = useState('30');
  const [macroViewMode, setMacroViewMode] = useState('latest2');

  useEffect(() => {
    setWeightData([
      { measurementDate: '2025-04-01', weight: 78 },
      { measurementDate: '2025-04-10', weight: 77 },
      { measurementDate: '2025-04-20', weight: 76 },
      { measurementDate: '2025-05-01', weight: 75 },
      { measurementDate: '2025-05-10', weight: 74 },
      { measurementDate: '2025-05-20', weight: 72.5 },
      { measurementDate: '2025-06-01', weight: 72 },
    ]);
    setLimitData([
      { calories: 2300, protein: 95, carbs: 200, fat: 80, date: 'Apr 1' },
      { calories: 2200, protein: 100, carbs: 180, fat: 70, date: 'May 1' },
      { calories: 2100, protein: 110, carbs: 160, fat: 60, date: 'Jun 1' },
    ]);
    setLatestWeight(72);
  }, []);

  const getFilteredWeightData = () => {
    if (weightFilter === 'all') return weightData;
    const days = parseInt(weightFilter);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return weightData.filter(entry => new Date(entry.measurementDate) >= cutoff);
  };

  const getSelectedLimitData = () => {
    switch (macroViewMode) {
      case 'latest2':
        return limitData.slice(-2);
      case 'startAndNow':
        return [limitData[0], limitData.at(-1)];
      case 'all':
      default:
        return limitData;
    }
  };

  const filteredWeights = getFilteredWeightData();
  const shownLimits = getSelectedLimitData();

  const lineChartData = {
    labels: filteredWeights.map(entry => entry.measurementDate),
    datasets: [
      {
        label: 'Weight (kg)',
        data: filteredWeights.map(entry => entry.weight),
        borderColor: '#e91e63',
        backgroundColor: 'rgba(233, 30, 99, 0.2)',
        pointBackgroundColor: '#c2185b',
        borderWidth: 2,
        pointRadius: 5,
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#333' } } },
    scales: {
      x: { ticks: { color: '#333' }, grid: { color: '#eee' } },
      y: { ticks: { color: '#333' }, grid: { color: '#eee' } }
    }
  };

  const barChartData = {
    labels: ['Calories', 'Protein', 'Carbs', 'Fat'],
    datasets: shownLimits.map((entry, i) => ({
      label: entry.date,
      data: [entry.calories, entry.protein, entry.carbs, entry.fat],
      backgroundColor: ['#90caf9', '#f48fb1', '#aed581'][i % 3]
    })),
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#333' } } },
    scales: {
      x: { ticks: { color: '#333' }, grid: { color: '#eee' } },
      y: { ticks: { color: '#333' }, grid: { color: '#eee' } }
    },
  };

  return (
    <div className="progress-page">
      <NavBar showButtons={false} showLogoutButton={true} logoTarget="/home" />
      <h2 className="page-title">My Progress</h2>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="label">Current Weight</div>
          <div className="value">{latestWeight ?? '--'} kg</div>
        </div>
        <div className="summary-card">
          <div className="label">Target Calories</div>
          <div className="value">{limitData.at(-1)?.calories ?? '--'} kcal</div>
        </div>
        <div className="summary-card">
          <div className="label">Protein Goal</div>
          <div className="value">{limitData.at(-1)?.protein ?? '--'} g</div>
        </div>
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <h3>Weight Evolution</h3>
          <div className="chart-wrapper">
            <Line data={lineChartData} options={lineOptions} />
          </div>
          <div className="chart-controls">
            <button onClick={() => setWeightFilter('7')}>7d</button>
            <button onClick={() => setWeightFilter('30')}>30d</button>
            <button onClick={() => setWeightFilter('365')}>1y</button>
            <button onClick={() => setWeightFilter('all')}>All</button>
          </div>
        </div>

        <div className="chart-card">
          <h3>Nutrition Target Evolution</h3>
          <div className="chart-wrapper">
            <Bar data={barChartData} options={barOptions} />
          </div>
          <div className="chart-controls">
            <label>Compare:</label>
            <select onChange={e => setMacroViewMode(e.target.value)} value={macroViewMode}>
              <option value="latest2">Latest 2 Updates</option>
              <option value="startAndNow">Start vs Now</option>
              <option value="all">All Updates</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
