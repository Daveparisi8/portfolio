import { useEffect, useState } from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadStats = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/analytics', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setError(body?.message || 'Unable to load analytics.');
        return;
      }

      const payload = await response.json();
      setStats(payload);
    } catch {
      setError('Analytics service is unavailable.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-card">
        <div className="admin-dashboard-header-row">
          <div>
            <p className="admin-eyebrow">Administrator View</p>
            <h1>Portfolio Analytics</h1>
          </div>
          <button className="admin-refresh-button" onClick={loadStats} disabled={isLoading}>
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {error && <p className="admin-dashboard-error">{error}</p>}

        {stats && (
          <>
            <div className="admin-metric-grid">
              <div className="admin-metric-card">
                <p className="admin-metric-label">Unique Portfolio Review Visits</p>
                <p className="admin-metric-value">{stats.portfolioUniqueVisits}</p>
              </div>

              <div className="admin-metric-card">
                <p className="admin-metric-label">Tracked Links</p>
                <p className="admin-metric-value">{stats.links.length}</p>
              </div>
            </div>

            <h2>Unique Clicks Per Link</h2>
            {stats.links.length === 0 ? (
              <p className="admin-empty">No link clicks recorded yet.</p>
            ) : (
              <div className="admin-table-scroll">
                <table className="admin-analytics-table">
                  <thead>
                    <tr>
                      <th>Link</th>
                      <th>Destination</th>
                      <th>Unique Clicks</th>
                      <th>Total Clicks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.links.map((link) => (
                      <tr key={link.linkId}>
                        <td>{link.label}</td>
                        <td>{link.url || '-'}</td>
                        <td>{link.uniqueClicks}</td>
                        <td>{link.totalClicks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
