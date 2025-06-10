import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore} from '../Firebase/config'

const ProtectedRoute = ({ children, role }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(firestore, role === 'teacher' ? 'teachers' : 'admins', user.uid);
          const docSnap = await getDoc(docRef);
          setIsAuthenticated(docSnap.exists() && docSnap.data().role === role);
        } catch (error) {
          console.error(`Error verifying ${role} role:`, error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, [role]);

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to={role === 'teacher' ? '/teacher' : '/admin/'} />;
};

export default ProtectedRoute;