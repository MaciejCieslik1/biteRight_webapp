import React, { useEffect, useState, useCallback } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './ProgressPage.css';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const ProgressPage = () => {
  // State to store data from the backend
  const [weightHistory, setWeightHistory] = useState([]);
  const [limitHistory, setLimitHistory] = useState([]);
  const [lastWeightEntry, setLastWeightEntry] = useState(null);

  const [weightFilter, setWeightFilter] = useState('30');
  const [macroViewMode, setMacroViewMode] = useState('latest2');

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem('jwt');

    if (!token) {
      console.error("JWT token not found. Please log in.");
      return;
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    try {
      const weightHistoryRes = await fetch('http://localhost:8080/weightHistory/findWeightHistoriesForUser', { headers });
      if (weightHistoryRes.ok) {
        const data = await weightHistoryRes.json();
        const sortedWeightData = data.content
          .sort((a, b) => new Date(a.measurementDate) - new Date(b.measurementDate));
        setWeightHistory(sortedWeightData);
      } else {
        console.error("Failed to fetch weight history:", await weightHistoryRes.text());
        setWeightHistory([]);
      }

      const limitHistoryRes = await fetch('http://localhost:8080/limitHistory/find', { headers });
      if (limitHistoryRes.ok) {
        const data = await limitHistoryRes.json();
        const sortedLimitData = data
          .sort((a, b) => new Date(a.dateChanged) - new Date(b.dateChanged));
        setLimitHistory(sortedLimitData);
      } else {
        console.error("Failed to fetch limit history:", await limitHistoryRes.text());
        setLimitHistory([]);
      }

      // 3. Fetch Last Weight History
      const lastWeightRes = await fetch('http://localhost:8080/weightHistory/findLastWeightHistory', { headers });
      if (lastWeightRes.ok) {
        const data = await lastWeightRes.json();
        setLastWeightEntry(data);
      } else {
        console.error("Failed to fetch last weight entry:", await lastWeightRes.text());
        setLastWeightEntry(null);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getFilteredWeightData = () => {
    if (!weightHistory || weightHistory.length === 0) return [];
    if (weightFilter === 'all') return weightHistory;

    const days = parseInt(weightFilter);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    return weightHistory
      .filter(entry => new Date(entry.measurementDate) >= cutoff)
      .sort((a, b) => new Date(a.measurementDate) - new Date(b.measurementDate));
  };

  const getSelectedLimitData = () => {
    if (!limitHistory || limitHistory.length === 0) return [];

    switch (macroViewMode) {
      case 'latest2':
        return limitHistory.slice(-2);
      case 'startAndNow':
        if (limitHistory.length === 0) return [];
        return limitHistory.length > 1 ? [limitHistory[0], limitHistory.at(-1)] : [limitHistory[0]];
      case 'all':
      default:
        return limitHistory;
    }
  };

  const filteredWeights = getFilteredWeightData();
  const shownLimits = getSelectedLimitData();

  const lineChartData = {
    labels: filteredWeights.map(entry => {
      const date = new Date(entry.measurementDate);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); // Example: "Jun 11"
    }),
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
      y: { ticks: { color: '#333' }, grid: { color: '#eee' }, beginAtZero: false }
    }
  };

  const barChartData = {
    labels: ['Calories', 'Protein', 'Carbs', 'Fat'],
    datasets: shownLimits.map((entry, i) => ({
      label: new Date(entry.dateChanged).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      data: [entry.calorieLimit, entry.proteinLimit, entry.carbLimit, entry.fatLimit],
      backgroundColor: ['#90caf9', '#f48fb1', '#aed581'][i % 3]
    })),
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#333' } } },
    scales: {
      x: { ticks: { color: '#333' }, grid: { color: '#eee' } },
      y: { ticks: { color: '#333' }, grid: { color: '#eee' }, beginAtZero: true }
    },
  };

  return (
    <div className="progress-page">
      <NavBar showButtons={false} showLogoutButton={true} logoTarget="/home" />
      <h2 className="page-title">My Progress</h2>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="label">Current Weight</div>
          <div className="value">{lastWeightEntry?.weight ?? '--'} kg</div>
        </div>
        <div className="summary-card">
          <div className="label">Target Calories</div>
          <div className="value">{limitHistory.at(-1)?.calorieLimit ?? '--'} kcal</div>
        </div>
        <div className="summary-card">
          <div className="label">Protein Goal</div>
          <div className="value">{limitHistory.at(-1)?.proteinLimit ?? '--'} g</div>
        </div>
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <h3>Weight Evolution</h3>
          <div className="chart-wrapper">
            {filteredWeights.length > 0 ? (
              <Line data={lineChartData} options={lineOptions} />
            ) : (
              <p className="no-data-message">No weight data available for this period.</p>
            )}
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
            {shownLimits.length > 0 ? (
              <Bar data={barChartData} options={barOptions} />
            ) : (
              <p className="no-data-message">No nutrition limit data available.</p>
            )}
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
      <Footer />
    </div>
  );
};

export default ProgressPage;