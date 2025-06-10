// import { useState, useEffect } from 'react';
// import { Routes, Route, Link, useNavigate } from 'react-router-dom';
// import { Menu, X, LogOut, Users, BookOpen } from 'lucide-react';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { auth } from '../../Firebase/config'; 
// import { Outlet } from 'react-router-dom';
// import ClassesView from './ClassesView';
// import { toast } from 'sonner';
// import Swal from 'sweetalert2';

// const Exams = () => {
//   return (
//     <div className="ml-0 lg:ml-64 pt-24 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 w-full">
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">Exams Overview</h2>
//       <p className="text-gray-600 text-sm">
//         Select a student from the Classes tab to add or edit exam scores.
//       </p>
//     </div>
//   );
// };

// const TeacherDashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [clicked, setClicked] = useState('class');
//   const [isTeacherAuthenticated, setTeacherAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();


//   // Monitor authentication state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (teacher) => {
//       if (teacher) {
//         setTeacherAuthenticated(true);
//       } else {
//         setTeacherAuthenticated(false);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (!loading && !isTeacherAuthenticated) {
//       navigate('/teacher');
//     }
//   }, [isTeacherAuthenticated, loading, navigate]);

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);



// const handleLogout = async () => {
//   try {
//     const result = await Swal.fire({
//       title: 'Logout Confirmation',
//       text: 'Are you sure you want to log out?',
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, Logout',
//       cancelButtonText: 'Cancel',
//     });

//     if (result.isConfirmed) {
//       await signOut(auth);
//       setTeacherAuthenticated(false);
//       Swal.fire({ title: 'Logged Out!', text: 'You have been successfully logged out.', icon: 'success', timer:2000});
//        navigate('/teacher'); 
//     }
//   } catch (error) {
//     console.error('Error logging out:', error);
//     Swal.fire({ title: 'Logout Failed', text: 'Failed to log out. Please try again.', icon: 'error', confirmButtonColor: '#d33', });
//   }
// };

  

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (!isTeacherAuthenticated) {
//     return null; 
//   }

//   return (
//     <div className="min-h-screen flex">
//       <div className="fixed w-full top-0 z-10">
//         <header className="bg-white p-4 flex items-center justify-between border-b border-gray-300">
//           <button onClick={toggleSidebar} className="lg:hidden">
//             <Menu className="w-6 h-6 text-gray-600" />
//           </button>
//           <h1 className="text-lg md:text-2xl font-semibold text-gray-700">Teacher Dashboard</h1>
//           <button
//             className="text-gray-700 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
//             onClick={() => navigate('/')}
//           >
//             View Results
//           </button>
//         </header>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 z-50 w-64 h-auto bg-gray-50 transition-transform transform border-t border-r border-gray-300 top-[74px] ${
//           isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } lg:translate-x-0 transition-transform duration-500 ease-in-out`}
//       >
//         <div className="p-4 flex items-center justify-between lg:hidden">
//           <button onClick={toggleSidebar}>
//             <X className="w-6 h-6 text-gray-600" />
//           </button>
//         </div>
//         <nav className="mt-4 flex flex-col lg:justify-between h-full text-sm font-medium text-black/90">
//           <div>
//             <button
//               onClick={() => setClicked('class')}
//               className={`flex items-center px-4 py-3 w-full text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
//                 clicked === 'class' ? 'bg-blue-50 text-blue-600' : ''
//               }`}
//             >
//               <Users className="w-5 h-5" /> <span className="ml-2">Classes</span>
//             </button>
//             <button
//               onClick={() => setClicked('exam')}
//               className={`flex items-center px-4 py-3 w-full text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
//                 clicked === 'exam' ? 'bg-blue-50 text-blue-600' : ''
//               }`}
//             >
//               <BookOpen className="w-5 h-5" /> <span className="ml-2">Exams</span>
//             </button>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="flex items-center mb-8 px-4 py-3 sm:text-gray-700 hover:bg-red-50 hover:text-red-600 text-red-600 transition-colors"
//           >
//             <LogOut className="w-5 h-5" />
//             <span className="ml-2">Logout</span>
//           </button>
//         </nav>
//       </div>

//       {/* Main Content */}
//       {clicked === 'class' && <ClassesView />}
//       {clicked === 'exam' && <Exams />}
//       <Outlet />
//     </div>
//   );
// };

// export default TeacherDashboard;


import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Users, BookOpen } from 'lucide-react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../../Firebase/config'
import { toast } from 'sonner';
import handleLogout from './handleLogOut'; 
import ClassesView from './ClassesView';

const Exams = () => {
  return (
    <div className="ml-0 lg:ml-64 pt-24 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Exams Overview</h2>
      <p className="text-gray-600 text-sm">
        Select a student from the Classes tab to add or edit exam scores.
      </p>
    </div>
  );
};

const TeacherDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [clicked, setClicked] = useState('class');
  const [isTeacherAuthenticated, setTeacherAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Monitor authentication state and verify teacher role
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const teacherDocRef = doc(firestore, 'teachers', user.uid);
          const teacherDoc = await getDoc(teacherDocRef);
          if (teacherDoc.exists() && teacherDoc.data().role === 'teacher') {
            setTeacherAuthenticated(true);
          } else {
            setTeacherAuthenticated(false);
            toast.error('Access denied. You are not a teacher.');
            await signOut(auth);
          }
        } catch (error) {
          console.error('Error verifying teacher role:', error);
          setTeacherAuthenticated(false);
          toast.error('Failed to verify authentication.');
          await signOut(auth);
        }
      } else {
        setTeacherAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isTeacherAuthenticated) {
      navigate('/teacher');
    }
  }, [isTeacherAuthenticated, loading, navigate]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isTeacherAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex">
      {/* Header */}
      <div className="fixed w-full top-0 z-10">
        <header className="bg-white p-4 flex items-center justify-between border-b border-gray-300">
          <button onClick={toggleSidebar} className="lg:hidden">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg md:text-2xl font-semibold text-gray-700">Teacher Dashboard</h1>
          <button
            className="text-gray-700 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/')}
          >
            View Results
          </button>
        </header>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-50 transition-transform border-t border-r border-gray-300 top-[74px] ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-500 ease-in-out`}
      >
        <div className="p-4 flex items-center justify-between lg:hidden">
          <button onClick={toggleSidebar}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <nav className="mt-4 flex flex-col lg:justify-between h-full text-sm font-medium text-black/90">
          <div>
            <button
              onClick={() => {
                setClicked('class');
                setIsSidebarOpen(false);
              }}
              className={`flex items-center px-4 py-3 w-full text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                clicked === 'class' ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <Users className="w-5 h-5" /> <span className="ml-2">Classes</span>
            </button>
            <button
              onClick={() => {
                setClicked('exam');
                setIsSidebarOpen(false);
              }}
              className={`flex items-center px-4 py-3 w-full text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                clicked === 'exam' ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <BookOpen className="w-5 h-5" /> <span className="ml-2">Exams</span>
            </button>
          </div>
          <button
            onClick={() => handleLogout(setTeacherAuthenticated, navigate)}
            className="flex items-center mb-8 px-4 py-3 sm:text-gray-700 hover:bg-red-50 hover:text-red-600 text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-2">Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {clicked === 'class' && <ClassesView />}
        {clicked === 'exam' && <Exams />}
      </div>
    </div>
  );
};

export default TeacherDashboard;