import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../utils/auth';

const NavBar = () => {
 const { user, logout } = useAuthContext();
 const navigate = useNavigate();

 const handleLogout = () => {
  logout();
  navigate('/'); // Redirect to home (or another page) after logout
 };

 return (
  <nav className="bg-gray-800">
   <div className="container mx-auto px-4">
    <Link to="/" className="text-white font-bold">Service Payment Manager</Link>
    <div className="flex items-center justify-end">
     {user ? (
      <>
       <Link to="/profile" className="ml-4 text-white">Profile</Link>
       {/* Conditional link for providers */}
       {user.isProvider && <Link to="/dashboard" className="ml-4 text-white">Dashboard</Link>}
       <button onClick={handleLogout} className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Logout
       </button>
      </>
     ) : (
      <>
       <Link to="/login" className="ml-4 text-white">Login</Link>
       <Link to="/register" className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Register
       </Link>
      </>
     )}
    </div>
   </div>
  </nav>
 );
};

export default NavBar;