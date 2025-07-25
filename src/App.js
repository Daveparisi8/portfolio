import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import MainContent from './Components/MainContent/MainContent'
import AppHeader from './Components/AppHeader'
import SpaceBackground from './Components/MainContent/SpaceBackground';


function App() {
  return (
      <div className="fade-in">
        <Header/>
        <AppHeader/>
        <MainContent/>
      </div>
  );
}

export default App;
