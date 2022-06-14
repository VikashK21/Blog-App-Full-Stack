import { GlobalProvider } from './context/GlobalState';
import Pages from './routes/Router';

function App() {


  return (
    <GlobalProvider>
        <Pages />
    </GlobalProvider>
  );
}

export default App;
