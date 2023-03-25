import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './component/Login'
import Home from './component/Home'
import Logout from './component/Logout'
import AllBlogs from './component/AllBlogs'
import SingleBlog from './component/SingleBlog'
import Cookies from 'js-cookie';

function App() {
  return (
    <Router>
        <div className="App">
        <ul className="App-header">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {Cookies.get('jwt') === undefined ? <Link to="/login">Login</Link> : <Link to="/logout">Logout</Link>}
          </li>
          
        </ul>
        <Routes>
            <Route exact path='/' element={< Home />}></Route>
            <Route exact path='/login' element={< Login />}></Route>
            <Route exact path='/logout' element={< Logout />}></Route>
            <Route exact path='/blogs' element={< AllBlogs />}></Route>
            <Route exact path='/blogs/:id' element={< SingleBlog />}></Route>
        </Routes>
      </div>
    </Router>
  );
}


export default App;
