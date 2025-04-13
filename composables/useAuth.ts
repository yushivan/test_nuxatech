
import Cookies from 'js-cookie';

export const useAuth = () => {
    const isLoggedIn = useState<boolean>('isLoggedIn', () => false);
  
    const logout = () => {
      isLoggedIn.value = false;
      Cookies.remove('access_token');
      Cookies.remove('email');
      window.location.href = '/';
    };
    
  
    const checkAuth = () => {
      const token = Cookies.get('access_token');
      isLoggedIn.value = !!token;
    };
  
    return { isLoggedIn, logout, checkAuth };
  };
  