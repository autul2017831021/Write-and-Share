import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './component/Login'
import Home from './component/Home'
import Logout from './component/Logout'
import AllBlogs from './component/AllBlogs'
import SingleBlog from './component/SingleBlog'
import NotFound from './component/NotFound'
import PrivateRoute from './middleware/PrivateRoute';
// import Cookies from 'js-cookie';
import getToken from './utils/getToken'
import { useEffect, useState } from 'react';

function App() {
    let [isAuthenticated, setIsAuthenticated] = useState(false);
    const checkAuthention = () => {
        const token = getToken('jwt');
        if(token !== undefined && token !== null){
            isAuthenticated = true;
            setIsAuthenticated(isAuthenticated);
        }
        else {
            isAuthenticated = false;
            setIsAuthenticated(false);
        }
    };
    useEffect( () => {
      checkAuthention();
        console.log("I Am From App.js");
        console.log(isAuthenticated);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isAuthenticated]);

    return (
      <Router>
          <div className="App">
          <ul className="App-header">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              {/* {Cookies.get('jwt') === undefined ? <Link to="/login">Login</Link> : <Link to="/logout">Logout</Link>} */}
              { isAuthenticated === false ? <Link to="/login">Login</Link> : <Link to="/logout">Logout</Link>}
            </li>
            
          </ul>
              <Routes>
                  <Route exact path='/' element={< Home />}></Route>
                  <Route exact path='/login' element={< Login />}></Route>
                  <Route exact path='/logout' element={< Logout />}></Route>
                  {/* <PrivateRoute exact path='/blogs' element={< AllBlogs />}>isAuthenticated={isAuthenticated}</PrivateRoute> */}
                  <Route exact path='/blogs' element={< AllBlogs />}></Route>
                  <Route exact path='/blogs/:id' element={< SingleBlog />}></Route>
                  <Route path='*' element={< NotFound />}></Route>
              </Routes>          
        </div>
      </Router>
    );
}


export default App;
