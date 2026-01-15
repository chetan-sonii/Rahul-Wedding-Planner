import { Link, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../store/slice/User.slice';
import { FaUserCircle } from 'react-icons/fa';

interface RootState {
  UserSlice: {
    user: {
      name: string;
      email: string;
    } | null;
  };
}

const Header = () => {
  const userSlice = useSelector((state: RootState) => state.UserSlice);
  // FIX: Check Redux User OR LocalStorage Token
  const isLoggedIn = userSlice?.user || localStorage.getItem("token");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearUser());
    navigate('/');
  };

  return (
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold font-heading text-primary tracking-tight">
            Subh<span className="text-gray-800">Vivah.</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-medium text-sm uppercase tracking-wide text-gray-600">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/vendors" className="hover:text-primary transition-colors">Vendors</Link>
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className="hidden md:flex items-center gap-2 text-gray-700 hover:text-primary font-bold transition-colors">
                    <FaUserCircle className="text-xl" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                      onClick={handleLogout}
                      className="px-5 py-2 rounded-full border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
                  >
                    Logout
                  </button>
                </>
            ) : (
                <>
                  <Link to="/login" className="font-bold text-gray-700 hover:text-primary text-sm">Log In</Link>
                  <Link to="/register" className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-bold hover:bg-pink-700 transition-all shadow-lg shadow-pink-200">
                    Sign Up
                  </Link>
                </>
            )}
          </div>
        </div>
      </header>
  );
};

export default Header;