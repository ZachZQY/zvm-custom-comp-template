import { ZhipuAi } from './components/ZhipuAi';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';

function App() {
  function setGlobalData() {
    console.log('setGlobalData');
  }
  return (
    <BrowserRouter>
      <div style={{ height: '60px', width: '60px' }}>
        <ZhipuAi globalData={{}} setGlobalData={
          setGlobalData
        } isSend={false} />
      </div>
    </BrowserRouter>
  );
}

export default App;
