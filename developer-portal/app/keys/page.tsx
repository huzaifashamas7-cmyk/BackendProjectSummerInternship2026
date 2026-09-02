'use client';

import { useState } from 'react';

const API_BASE = 'http://localhost:3000/api/v1';


export default function KeysPage() {
  const [keyName, setKeyName] = useState('');
  const [scopesInput, setScopesInput] = useState('exams:read');
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [revokeId, setRevokeId] = useState('');
  const [revokeKeyId, setRevokeKeyId] = useState('');
  const [revokeMessage, setRevokeMessage] = useState('');
  const [logsKeyId, setLogsKeyId] = useState('');
  const [logsKeyToken, setLogsKeyToken] = useState('');
  const [logs, setLogs] = useState<any[]>([]);
  const [error, setError] = useState('');

  async function handleCreateKey(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setCreatedKey(null);

    try {
      const scopes = scopesInput.split(',').map(s => s.trim()).filter(Boolean);
      const res = await fetch(`${API_BASE}/keys`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key_name: keyName, scopes, user_id: 1 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create key');
      setCreatedKey(data.api_key);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleRevoke(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setRevokeMessage('');

    try {
      const res = await fetch(`${API_BASE}/keys/${revokeId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${revokeKeyId}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to revoke key');
      setRevokeMessage(data.message);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleViewLogs(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLogs([]);

    try {
      const res = await fetch(`${API_BASE}/keys/${logsKeyId}/logs`, {
        headers: { 'Authorization': `Bearer ${logsKeyToken}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch logs');
      setLogs(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div style={{ padding: '40px', maxWidth: '700px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>API Key Management</h1>

      {error && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px', borderRadius: '6px', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>Create a new key</h2>
        <form onSubmit={handleCreateKey} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            placeholder="Key name"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
          />
          <input
            placeholder="Scopes, comma separated (e.g. exams:read, exams:write)"
            value={scopesInput}
            onChange={(e) => setScopesInput(e.target.value)}
            style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
          />
          <button type="submit" style={{ padding: '8px 16px', background: '#111827', color: 'white', borderRadius: '4px', width: 'fit-content' }}>
            Create Key
          </button>
        </form>
        {createdKey && (
          <div style={{ marginTop: '12px', padding: '12px', background: '#f3f4f6', borderRadius: '6px', wordBreak: 'break-all' }}>
            <strong>Your new key (save it now):</strong><br />
            {createdKey}
          </div>
        )}
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>Revoke a key</h2>
        <form onSubmit={handleRevoke} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            placeholder="Key ID to revoke"
            value={revokeId}
            onChange={(e) => setRevokeId(e.target.value)}
            style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
          />
          <input
            placeholder="Your API key (Bearer token)"
            value={revokeKeyId}
            onChange={(e) => setRevokeKeyId(e.target.value)}
            style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
          />
          <button type="submit" style={{ padding: '8px 16px', background: '#dc2626', color: 'white', borderRadius: '4px', width: 'fit-content' }}>
            Revoke Key
          </button>
        </form>
        {revokeMessage && <div style={{ marginTop: '12px', color: '#059669' }}>{revokeMessage}</div>}
      </section>

      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>View request logs</h2>
        <form onSubmit={handleViewLogs} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            placeholder="Key ID"
            value={logsKeyId}
            onChange={(e) => setLogsKeyId(e.target.value)}
            style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
          />
          <input
            placeholder="Your API key (Bearer token)"
            value={logsKeyToken}
            onChange={(e) => setLogsKeyToken(e.target.value)}
            style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
          />
          <button type="submit" style={{ padding: '8px 16px', background: '#111827', color: 'white', borderRadius: '4px', width: 'fit-content' }}>
            View Logs
          </button>
        </form>
        {logs.length > 0 && (
          <table style={{ marginTop: '16px', width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
                <th style={{ padding: '8px' }}>Endpoint</th>
                <th style={{ padding: '8px' }}>Method</th>
                <th style={{ padding: '8px' }}>Status</th>
                <th style={{ padding: '8px' }}>Latency</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '8px' }}>{log.endpoint}</td>
                  <td style={{ padding: '8px' }}>{log.method}</td>
                  <td style={{ padding: '8px' }}>{log.status_code}</td>
                  <td style={{ padding: '8px' }}>{log.latency_ms}ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}