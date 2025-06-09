import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Result from './Result';
import { GraduationCap } from 'lucide-react';
import { Mycontext } from '../Context/Context';

const Home = () => {
    const {result,setResult} = useContext(Mycontext)
  const [exam, setExam] = useState('');
  const [regNo, setRegNo] = useState('');
const[showResult,setShowResult] = useState(false)
  const [error, setError] = useState('');
  const navigate =useNavigate()
  const exams = [
    'Midterm Exam 2025',
    'Final Exam 2025',
    'Entrance Exam 2025',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!exam || !regNo) {
      setError('Please select an exam and enter a registration number.');
      setResult(null);
      return;
    }

     setResult({
      studentName: 'John Doe',
      regNo,
      examName: exam,
      marks: {
        Math: 85,
        Science: 90,
        English: 78,
      },
      total: 253,
      percentage: 84.33,
    });
    // setShowResult(true)
    navigate("/result")
  

  };



  return (
   <div className="min-h-screen flex flex-col lg:flex-row lg:p-16 p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
  {/* Left Side - Image */}
  <div className="w-full lg:w-1/2 h-72 lg:h-auto relative  ">
    <img
      src="/students.png"
      alt="Students"
      className="absolute inset-0 w-full h-full object-cover p-16  "
    />
  </div>

  {/* Right Side - Form */}
  <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md lg:max-w-lg transition-all duration-300">
      <div className="text-center mb-12">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Student Result Portal
        </h1>
        <p className="text-gray-600 text-xs">Access your academic results instantly</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="exam" className="block text-sm font-medium text-gray-700">
            Select Exam
          </label>
          <select
            id="exam"
            value={exam}
            onChange={(e) => setExam(e.target.value)}
            className="mt-1 block w-full h-10 p-2 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="">Select an exam</option>
            {exams.map((examName) => (
              <option key={examName} value={examName}>
                {examName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="regNo" className="block text-sm font-medium text-gray-700">
            Registration Number
          </label>
          <input
            id="regNo"
            type="number"
            value={regNo}
            min="0"
            onChange={(e) => setRegNo(e.target.value)}
            placeholder="Enter registration number"
            className="mt-1 block w-full h-10 p-2 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleSubmit}
          className="w-full h-10 bg-gradient-to-r cursor-pointer from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
        >
          View Result
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default Home;