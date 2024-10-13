import { useAuthStore } from '@/store';
import { Navigate } from 'react-router-dom';

const ProtectedLoggedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  if (token && user) {
    return <Navigate to={user.role === 'DOCTOR' ? '/patients' : '/dashboard'}/>;
  }

  return children;
};

export default ProtectedLoggedRoute;