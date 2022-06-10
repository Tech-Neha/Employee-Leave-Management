import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import AddEmployeeComponent from './components/AddEmployeeComponent';


function App() {
  return (
    <div>
      <Router>
        <HeaderComponent/>
        <div className='container'>
        <Routes>
          <Route exact path='/' element={<ListEmployeeComponent/>}></Route>
          <Route path='/employees' element={<ListEmployeeComponent/>}></Route>
          <Route path='/add-employee' element={<AddEmployeeComponent/>}></Route>
          <Route path='/edit-employee/:id' element={<AddEmployeeComponent/>}></Route>
        </Routes>
        {/* <ListEmployeeComponent/> */}
        </div>
      </Router>
    </div>
  );
}

export default App;
