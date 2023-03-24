import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function Home() {
  return (
    <div className="home-page">
      <h1>Welcome to my app</h1>
      {Cookies.get('jwt') === undefined ? <Link to="/login">Log In</Link> : <Link to="/blogs">Blogs</Link>}
    </div>
  );
}

export default Home;