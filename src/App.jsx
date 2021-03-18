import React, { useCallback, useState } from 'react';
import './App.css';
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';

const { TextArea } = Input;

function App() {
  const [links, setLinks] = useState('');
  const [loading, setLoading] = useState(false);

  const makeLinksShort = useCallback(async () => {
    setLoading(true);

    const linksToShort = links.split('\n');

    axios.post('https://multilinks-api.herokuapp.com/shortByISGD', {
      linksToShort
    })
    .then(({ data: shortenedLinks }) => {
      setLinks(shortenedLinks.join('\n'));
      setLoading(false);
    })
    .catch(console.log);
  }, [links]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Вставьте ссылки в поле
        </p>
        <p>
          P.S. Каждая ссылка должна быть с новой строки
        </p>
      </header>
      <TextArea style={{ height: '70vh', width: '90vw' }} value={loading ? 'Загрузка...' : links} onChange={e => setLinks(e.target.value)}/>
      <Button type="primary" size="large" loading={loading} onClick={makeLinksShort} style={{ width: '90vw' }}>Укоротить ссылки</Button>
    </div>
  );
}

export default App;
