import React, { useCallback, useState } from 'react';
import './App.css';
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';

const { TextArea } = Input;

function App() {
  const [links, setLinks] = useState('');
  const [loading, setLoading] = useState(false);

  const makeLinksShort = useCallback(async () => {
    setLoading(true);

    const linksToShort = links.split('\n');

    const shortenedLinks = [];

    const makeShortLink = link => {
        return new Promise(resolve => {
            setTimeout(() => {
                fetch(`https://clck.ru/--?url=${encodeURIComponent(link)}`)
                    .then(res => res.text())
                    .then(shortLink => {
                        resolve(shortLink);
                    });
            }, 200);
        });
    };

    // (async () => {
        for (let i = 0; i < linksToShort.length; i++) {
            const link = linksToShort[i];
            const shortenedLink = await makeShortLink(link);

            shortenedLinks.push(shortenedLink);
        }
    // })();

    // window.shortenedLinks = shortenedLinks;
    setLinks(shortenedLinks.join('\n'));
    setLoading(false);
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
