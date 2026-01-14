import { Link, NavLink, useNavigate } from 'react-router';
import { BiHeartCircle } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../store/slice/User.slice';
import { UserCredentials } from '../types/auth'; // Import your user type

// 1. Define the State Interface to fix the 'any' error
interface RootState {
  UserSlice: {
    user: UserCredentials | undefined;
  };
}

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 2. Apply the 'RootState' type here
  const { user } = useSelector((state: RootState) => state.UserSlice);

  const handleLogout = () => {
    dispatch(removeUser());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/login');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
      `mr-5 font-sans font-medium transition-colors duration-300 ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`;

  return (
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">

          {/* Logo Section */}
          <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <BiHeartCircle className="w-10 h-10 text-primary" />
            <span className="ml-3 text-2xl font-heading font-bold text-gray-800">
            Shubh<span className="text-primary">Vivah</span>
          </span>
          </Link>

          {/* Navigation Links */}
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-200 flex flex-wrap items-center text-base justify-center">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {user ? (
                // LOGGED IN VIEW
                <div className="flex items-center gap-3">
              <span className="hidden md:block font-sans text-sm text-gray-600">
                Hi, {user.name.split(' ')[0]}
              </span>

                  <Link
                      to="/dashboard"
                      className="flex items-center gap-2 bg-pink-50 hover:bg-pink-100 border border-pink-200 px-4 py-2 rounded-full transition-all text-sm font-medium text-pink-700"
                  >
                    <FaUserCircle className="text-lg" />
                    My Dashboard
                  </Link>

                  <button
                      onClick={handleLogout}
                      className="text-sm font-sans text-gray-500 hover:text-red-500 font-medium ml-2"
                  >
                    Logout
                  </button>
                </div>
            ) : (
                // LOGGED OUT VIEW
                <div className="flex items-center gap-3">
                  <Link to="/login" className="font-sans font-medium text-gray-600 hover:text-primary transition-colors">
                    Login
                  </Link>
                  <Link to="/register" className="bg-primary hover:bg-pink-700 text-white px-6 py-2 rounded-full transition-all shadow-md font-sans text-sm">
                    Register Free
                  </Link>
                </div>
            )}
          </div>
        </div>
      </header>
  )
}

export default Header;