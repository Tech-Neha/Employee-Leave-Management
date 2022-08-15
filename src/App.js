import './App.css';
import { MemoryRouter as Router, Route, Routes} from 'react-router-dom'; 
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import AddEmployeeComponent from './components/AddEmployeeComponent';
import Login from './components/Login';
import EmployeePage from './components/EmployeePage';
import HomePage from './components/HomePage';
import ManagerLoginPage from './components/ManagerLogin';
import RegisterPage from './components/RegisterPage';
import NavBar from './components';
import ManagerPage from './components/ManagerPage';
import DisplayLeave from './components/DisplayLeave';
import DisplayStatusComponent from './components/DisplayStatusComponent';


function App() {
  return (
    <div>
     <Router>
      <NavBar/>
        
        {/* <div className='container'> */}
          
        <Routes>
          {/* <Route exact path='/' element={<ListEmployeeComponent/>}></Route> */}
          <Route exact path='/' element={<HomePage/>}></Route>
          <Route path='/employee-login' element={<Login/>}></Route>
          <Route path='/admin-login' element={<ManagerLoginPage/>}></Route>
          <Route path='/register' element={<RegisterPage/>}></Route>
          <Route path='/employee-page' element={<EmployeePage/>}></Route>
          <Route path='/employees' element={<ListEmployeeComponent/>}></Route>
          <Route path='/add-employee' element={<AddEmployeeComponent/>}></Route>
          <Route path='/edit-employee/:id' element={<AddEmployeeComponent/>}></Route>
          <Route path='/manager-page' element={<ManagerPage/>}></Route>
          <Route path='/display-leave' element={<DisplayLeave/>}></Route>
          <Route path='/display-leave' element={<DisplayLeave/>}></Route>
          <Route path='/DisplayStatusComponent' element={<DisplayStatusComponent/>}></Route> 
        </Routes>
        {/* <ListEmployeeComponent/> */}
       
        {/* </div> */}
      </Router>
    </div>
  );
}

export default App;