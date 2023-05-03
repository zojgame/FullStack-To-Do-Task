import './index.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Header } from './components';
import { MainPage, LoginPage, RegistrationPage } from './Pages';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>          
          <Route element={<Header />} path='/'>
            <Route element={<MainPage />} path='/'/>
            <Route element={<LoginPage />} path='/login'/>
            <Route element={<RegistrationPage />} path='/registration'/>
            <Route element={<MainPage />} path='*'/>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
