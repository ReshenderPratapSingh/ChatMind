import { useState } from 'react';

function App() {
  const rawApiUrl = import.meta.env.VITE_API_URL || '';
  const apiUrl = rawApiUrl.replace(/\/+$/, '');

  const [loadingType, setLoadingType] = useState(null); // 'health' | 'db' | null
  const [activeEndpoint, setActiveEndpoint] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [responseTime, setResponseTime] = useState(null);

  const executeRequest = async (type, endpoint) => {
    if (!apiUrl) {
      setErrorMessage(
        'VITE_API_URL is undefined. Please verify client/.env or your deployment environment variables.'
      );
      setResponseData(null);
      setResponseStatus(null);
      setActiveEndpoint(endpoint);
      return;
    }

    setLoadingType(type);
    setActiveEndpoint(endpoint);
    setErrorMessage(null);
    setResponseData(null);
    setResponseStatus(null);
    setResponseTime(null);

    const startTime = performance.now();
    const targetUrl = `${apiUrl}${endpoint}`;

    try {
      const res = await fetch(targetUrl);
      const elapsed = Math.round(performance.now() - startTime);
      setResponseTime(elapsed);
      setResponseStatus(res.status);

      let data;
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        data = { rawText: text };
      }

      if (!res.ok) {
        setErrorMessage(
          data?.message ||
          data?.error ||
          `Server returned HTTP ${res.status}: ${res.statusText || 'Error'}`
        );
      }
      setResponseData(data);
    } catch (err) {
      const elapsed = Math.round(performance.now() - startTime);
      setResponseTime(elapsed);
      setResponseStatus(0);
      setErrorMessage(
        `Fetch Failed: ${err.message || 'Network error'}. Possible causes: backend is down, blocked by CORS, or invalid URL.`
      );
      setResponseData(null);
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="header-badge">Deployment Validation Skeleton</div>
        <h1 className="title">Full-Stack Connectivity Tester</h1>
        <p className="subtitle">
          Verify end-to-end communication across Vercel (Frontend), Render (Backend), and MongoDB Atlas (Database).
        </p>
      </header>

      {/* Target API Banner */}
      <section className="url-card">
        <div className="url-label">
          <span>Backend Target (VITE_API_URL):</span>
        </div>
        <code className="url-value" id="vite-api-url-display">
          {apiUrl || '(not configured)'}
        </code>
      </section>

      {/* Action Buttons */}
      <div className="actions-grid">
        <button
          id="btn-check-health"
          className="btn-action health"
          onClick={() => executeRequest('health', '/api/health')}
          disabled={loadingType !== null}
        >
          <div className="btn-header">
            <span className="btn-title">
              {loadingType === 'health' && <span className="spinner" />}
              Check Health
            </span>
            <span className="btn-badge">GET /api/health</span>
          </div>
          <p className="btn-description">
            Tests server availability, CORS headers, and standard routing without database involvement.
          </p>
        </button>

        <button
          id="btn-check-db"
          className="btn-action db"
          onClick={() => executeRequest('db', '/api/test-db')}
          disabled={loadingType !== null}
        >
          <div className="btn-header">
            <span className="btn-title">
              {loadingType === 'db' && <span className="spinner" />}
              Check DB
            </span>
            <span className="btn-badge">GET /api/test-db</span>
          </div>
          <p className="btn-description">
            Validates end-to-end MongoDB Atlas write &amp; read operations using the Ping model.
          </p>
        </button>
      </div>

      {/* Response Display Section */}
      <section className="response-container">
        <div className="response-header">
          <div className="response-title">
            <span>Response Output</span>
            {loadingType ? (
              <span className="status-badge loading">
                <span className="spinner" style={{ width: 10, height: 10, borderWidth: 1 }} />
                Calling {activeEndpoint}...
              </span>
            ) : responseStatus !== null ? (
              <span
                className={`status-badge ${
                  responseStatus >= 200 && responseStatus < 300 ? 'success' : 'error'
                }`}
              >
                {responseStatus === 0 ? 'Network Error' : `HTTP ${responseStatus}`}
              </span>
            ) : (
              <span className="status-badge idle">Awaiting Request</span>
            )}
          </div>

          {responseTime !== null && (
            <div className="response-meta">
              <span>{responseTime} ms</span>
              <span>{activeEndpoint}</span>
            </div>
          )}
        </div>

        {/* Error Details Banner */}
        {errorMessage && (
          <div className="error-banner" id="error-banner">
            <div className="error-banner-title">
              ⚠️ Request Error
            </div>
            <div className="error-banner-body">{errorMessage}</div>
          </div>
        )}

        {/* JSON Code Viewer */}
        {responseData ? (
          <pre className="code-viewer" id="response-viewer">
            {JSON.stringify(responseData, null, 2)}
          </pre>
        ) : !loadingType && !errorMessage ? (
          <div className="placeholder-text">
            Click &ldquo;Check Health&rdquo; or &ldquo;Check DB&rdquo; above to test backend connectivity.
          </div>
        ) : null}
      </section>

      {/* Footer */}
      <footer className="footer-info">
        ChatMind Deployment Validation Skeleton &bull; React + Express + MongoDB Atlas
      </footer>
    </div>
  );
}

export default App;
