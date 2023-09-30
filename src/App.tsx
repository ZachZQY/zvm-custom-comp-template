import { ZhipuAi } from './components/ZhipuAi';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div style={{ height: '60px', width: '60px' }}>
        <ZhipuAi globalData={{}} />
      </div>
    </BrowserRouter>
  );
}

export default App;
