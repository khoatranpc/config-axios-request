import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import doRequest, { METHOD } from './utils/restApi';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [listPost, setListPost] = useState([]);

  const handleCallApi = async () => {
    const payload = {
      query: {
        postId: 1,
        userName: 'Khoa đẹp trai'
      }
    }
    const data = await doRequest('/comments', METHOD.GET, payload);
    console.log(data);
  }

  useEffect(() => {
    console.log(listPost);
  }, [listPost])
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => {
          handleCallApi()
        }}>Gọi api</button>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
