import { ToastContainer } from 'react-toastify';
import Gallery from './Components/Gallery';
import Header from './Components/Header';
import './Styles/App.css';
import Auth from './Components/Auth';

function App() {
  return ( 
    <div className="App flex justify-center" data-testid="app">
        <main className="w-full max-w-screen-xl mx-6 min-h-screen">

        <Auth />

          {/* <Header/>
          <Gallery />
          */}
          <ToastContainer position='top-center' autoClose={true}/> 
        </main>
    </div>
  );
}

export default App;
