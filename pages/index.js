import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [code, setCode] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/fetch', { code });
      setData(res.data);
      setError(null);
    } catch (err) {
      setError("Şifre hatalı veya veri alınamadı.");
      setData(null);
    }
  };

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>TA | Turkish Armed Forces</h1>
      {!data ? (
        <form onSubmit={handleSubmit}>
          <input type="password" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Giriş Kodu" style={{ padding: '0.5rem' }} />
          <button type="submit" style={{ marginLeft: '1rem', padding: '0.5rem' }}>Giriş</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      ) : (
        <div>
          <h2>Asteğmen Rütbesindekiler</h2>
          {data.users.map((user, i) => (
            <div key={i} style={{ backgroundColor: '#1e293b', padding: '1rem', margin: '0.5rem 0', borderRadius: '10px' }}>
              <p><b>Kullanıcı:</b> {user.username}</p>
              <p><b>Display Name:</b> {user.displayName}</p>
              <p><b>Rütbeye Geçiş:</b> {user.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
