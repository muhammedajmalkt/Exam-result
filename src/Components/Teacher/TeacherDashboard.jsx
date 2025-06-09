import { useState, useContext } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Users, BookOpen } from 'lucide-react';
// import { AuthContext } from '../Context/Context';
import ExamEntry from './ExamEntry';
import { Outlet } from 'react-router-dom';
import ClassesView from './ClassesView';

 const Exams = () => {
  return (
    <div className="  ml-0 lg:ml-64   pt-24  bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Exams Overview</h2>
      <p className="text-gray-600 text-sm">
        Select a student from the Classes tab to add or edit exam scores.
      </p>
    </div>
  );
};

const TeacherDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [clicked,setClicked] = useState("class")
//   const { isTeacherAuthenticated, setTeacherAuthenticated } = useContext(AuthContext);

//   if (!isTeacherAuthenticated) {
//     navigate('/teacher/login');
//     return null;
//   }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    setTeacherAuthenticated(false);
    navigate('/teacher');
  };

  return (
    <div className="min-h-screen  flex">
     {/* Main Content */}
      <div className="fixed w-full top-0   z-10 ">
        {/* Header */}
        <header className="bg-white  p-4 flex items-center justify-between border-b border-gray-300 z-10">
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
        className={`fixed inset-y-0 left-0 z-50 w-64 h-aut bg-gray-50 transform border-r border-t border-gray-300 top-[74px] ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full' } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 flex items-center justify-between lg:hidden">
          <button onClick={toggleSidebar}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <nav className="mt-4 flex flex-col lg:justify-between h-full  text-sm font-medium text-black/90">
            <div>
            <button  onClick={()=>setClicked("class")}
                className="flex items-center  px-4 py-3 text-gray-700text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors mt-auto w-full" > 
                <Users className="w-5 h-5 " /> <span className="ml-2">Classes</span>
            </button>
            <button  onClick={()=>setClicked("exam")}
            className="flex items-center  px-4 py-3 text-gray-700text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors mt-auto w-full" > 
                <BookOpen className="w-5 h-5 " /> <span className="ml-2">Exams</span>
            </button>
            </div>
                   
           <button
            onClick={handleLogout}
            className="flex items-center mb-8 px-4 py-3 sm:text-gray-700 hover:bg-red-50 hover:text-red-600 text-red-600 transition-colors "
            >
            <LogOut className="w-5 h-5 " />
            <span className="ml-2">Logout</span>
          </button>
      </nav>
      </div>
      { clicked === "class"   && <ClassesView/>}
       {clicked === "exam" && <Exams />}
       <Outlet/>
 
    </div>
  );
};

export default TeacherDashboard;