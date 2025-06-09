// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Save, Plus, Trash2, X, Loader2 } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
// import { firestore } from '../../Firebase/Config';
// import { toast } from 'sonner';

// const ExamEntry = () => {
//   const { rollNo } = useParams();
//   const navigate = useNavigate();

//   const [selectedExam, setSelectedExam] = useState('');
//   const [availableExams, setAvailableExams] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [scores, setScores] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState('');

//   // Fetch available exams from Firestore
//   useEffect(() => {
//     const fetchExams = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(firestore, 'exams'));
//         const examsData = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         setAvailableExams(examsData);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching exams: ', err);
//         toast.error('Failed to load exams');
//         setLoading(false);
//       }
//     };

//     fetchExams();
//   }, []);

//   // When exam is selected, populate subjects
//   useEffect(() => {
//     if (selectedExam) {
//       const exam = availableExams.find(e => e.id === selectedExam);
//       if (exam) {
//         setSubjects(exam.subjects);
//         // Initialize scores with empty values
//         const initialScores = {};
//         exam.subjects.forEach(subject => {
//           initialScores[subject.name] = '';
//         });
//         setScores(initialScores);
//       }
//     } else {
//       setSubjects([]);
//       setScores({});
//     }
//   }, [selectedExam, availableExams]);

//   const handleScoreChange = (subjectName, value) => {
//     setScores(prev => ({
//       ...prev,
//       [subjectName]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
    
//     if (!selectedExam) {
//       setError('Please select an exam');
//       setSaving(false);
//       return;
//     }

//     // Validate scores
//     for (const subject of subjects) {
//       const score = scores[subject.name];
//       if (!score ) {
//         setError(`Please enter a valid score for ${subject.name}`);
//         setSaving(false);
//         return;
//       }
//       if (score < 0 || score > 100) {
//         setError(`Score for ${subject.name} must be between 0 and 100`);
//         setSaving(false);
//         return;
//       }
//     }

//     try {
//       const examData = {
//         examId: selectedExam,
//         examName: availableExams.find(e => e.id === selectedExam).name,
//         subjects: subjects.map(subject => ({
//           name: subject.name,
//           score: Number(scores[subject.name])
//         })),
//         date: new Date().toISOString()
//       };

//       // Save to student's exam results collection
//       const studentExamRef = doc(firestore, 'students', rollNo, 'examResults', selectedExam);
//       await setDoc(studentExamRef, examData);

//       toast.success('Exam scores saved successfully!');
//       navigate(`/teacher-dash`);
//     } catch (err) {
//       console.error('Error saving exam scores: ', err);
//       setError('Failed to save exam scores. Please try again.');
//       toast.error('Failed to save exam scores');
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen ">
//         {/* <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-blue-500 z-50 "></div>  */}
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 100 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, y: 50 }}
//       transition={{ duration: 0.5, ease: 'easeInOut' }}
//       className="absolute w-full max-w-4xl mx-auto mt-18 p-6 bg-blue-50/60 backdrop-blur-md rounded-lg shadow-lg sm:relative"
//     >
//       {/* Top right Close/Back */}
//       <button 
//         onClick={() => navigate(-1)}
//         className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 transition-colors"
//       > 
//         <X className="w-6 h-6" />
//       </button>

//       <h2 className="text-xl font-semibold text-gray-800 mb-6">
//         Enter Exam Scores for Roll No: <span className="text-blue-700">{rollNo}</span>
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Exam Selection */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Select Exam
//           </label>
//           <select
//             value={selectedExam}
//             onChange={(e) => setSelectedExam(e.target.value)}
//             className="w-full p-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
//           >
//             <option value="">-- Select an exam --</option>
//             {availableExams.map((exam) => (
//               <option key={exam.id} value={exam.id}>
//                 {exam.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Subjects and Scores */}
//         {selectedExam && (
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Enter Scores
//             </label>
//             <div className="space-y-3">
//               {subjects.map((subject) => (
//                 <div key={subject.name} className="grid grid-cols-12 gap-2 items-center">
//                   <label className="col-span-5 sm:col-span-4 text-sm text-gray-700">
//                     {subject.name}
//                   </label>
//                   <input
//                     type="number"
//                     value={scores[subject.name] || ''}
//                     onChange={(e) => handleScoreChange(subject.name, e.target.value)}
//                     placeholder="0-100"
//                     min="0"
//                     max="100"
//                     className="col-span-5 sm:col-span-4 p-2 rounded-md border border-gray-300 text-sm"
//                   />
//                   <span className="col-span-2 sm:col-span-1 text-sm text-gray-500">
//                     /100
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Error Message */}
//         {error && (
//           <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
//             {error}
//           </div>
//         )}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={!selectedExam || saving}
//           className={`w-full h-10 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition flex items-center justify-center gap-2 ${
//             !selectedExam || saving ? 'opacity-70 cursor-not-allowed' : ''
//           }`}
//         >
//           {saving ? (
//             <Loader2 className="w-5 h-5 animate-spin" />
//           ) : (
//             <>
//               <Save className="w-5 h-5" /> Save Scores
//             </>
//           )}
//         </button>
//       </form>
//     </motion.div>
//   );
// };

// export default ExamEntry;

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, X, Loader2, Edit, Trash2, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../../Firebase/Config';
import { toast } from 'sonner';

const ExamEntry = () => {
  const { rollNo } = useParams();
  const navigate = useNavigate();

  const [selectedExam, setSelectedExam] = useState('');
  const [availableExams, setAvailableExams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [scores, setScores] = useState({});
  const [examResults, setExamResults] = useState([]);
  const [editingResultId, setEditingResultId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const examsSnapshot = await getDocs(collection(firestore, 'exams'));
        const examsData = examsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAvailableExams(examsData);

        const resultsSnapshot = await getDocs(
          collection(firestore, 'students', rollNo, 'examResults')
        );
        const resultsData = resultsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date
            ? new Date(
                typeof doc.data().date === 'string'
                  ? doc.data().date
                  : doc.data().date.seconds * 1000
              ).toLocaleDateString()
            : 'N/A',
        }));
        setExamResults(resultsData.sort((a, b) => new Date(b.date) - new Date(a.date)));

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data: ', err);
        toast.error('Failed to load data');
        setError('Failed to load exams or results.');
        setLoading(false);
      }
    };

    fetchData();
  }, [rollNo]);

  useEffect(() => {
    if (selectedExam && !editingResultId) {
      const exam = availableExams.find((e) => e.id === selectedExam);
      if (exam) {
        setSubjects(exam.subjects);
        const initialScores = {};
        exam.subjects.forEach((subject) => {
          initialScores[subject.name] = '';
        });
        setScores(initialScores);
      }
    } else if (!selectedExam) {
      setSubjects([]);
      setScores({});
    }
  }, [selectedExam, availableExams, editingResultId]);

  const handleScoreChange = (subjectName, value) => {
    setScores((prev) => ({
      ...prev,
      [subjectName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    if (!selectedExam) {
      setError('Please select an exam');
      setSaving(false);
      return;
    }

    for (const subject of subjects) {
      const score = scores[subject.name];
      if (score === '' || score === undefined) {
        setError(`Please enter a score for ${subject.name}`);
        setSaving(false);
        return;
      }
      if (isNaN(score) || score < 0 || score > 100) {
        setError(`Score for ${subject.name} must be between 0 and 100`);
        setSaving(false);
        return;
      }
    }

    try {
      const exam = availableExams.find((e) => e.id === selectedExam);
      const examData = {
        examId: selectedExam,
        examName: exam.name,
        subjects: subjects.map((subject) => ({
          name: subject.name,
          score: Number(scores[subject.name]),
        })),
        date: new Date().toISOString(),
      };

      const studentExamRef = doc(firestore, 'students', rollNo, 'examResults', selectedExam);
      await setDoc(studentExamRef, examData, { merge: true });

      if (editingResultId) {
        setExamResults((prev) =>
          prev.map((result) =>
            result.id === selectedExam
              ? { ...examData, id: selectedExam, date: new Date().toLocaleDateString() }
              : result
          )
        );
        setEditingResultId(null);
      } else {
        setExamResults((prev) => [
          { ...examData, id: selectedExam, date: new Date().toLocaleDateString() },
          ...prev,
        ]);
      }

      toast.success(`Exam scores ${editingResultId ? 'updated' : 'saved'} successfully!`);
      setSelectedExam('');
      setSubjects([]);
      setScores({});
    } catch (err) {
      console.error('Error saving exam scores: ', err);
      setError('Failed to save exam scores. Please try again.');
      toast.error('Failed to save exam scores');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (result) => {
    setEditingResultId(result.id);
    setSelectedExam(result.examId);
    setSubjects(result.subjects);
    const editScores = {};
    result.subjects.forEach((subject) => {
      editScores[subject.name] = subject.score.toString();
    });
    setScores(editScores);
    document.getElementById('exam-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = async (examId) => {
    if (window.confirm('Are you sure you want to delete these exam scores?')) {
      try {
        await deleteDoc(doc(firestore, 'students', rollNo, 'examResults', examId));
        setExamResults((prev) => prev.filter((result) => result.id !== examId));
        toast.success('Exam scores deleted successfully');
      } catch (err) {
        console.error('Error deleting exam scores: ', err);
        toast.error('Failed to delete exam scores');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingResultId(null);
    setSelectedExam('');
    setSubjects([]);
    setScores({});
    setError('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen w-fu">
        {/* <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-blue-500"></div>  */}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="absolute w-full max-w-4xl mx-auto mt-18 p-6 bg-blue-50/60 backdrop-blur-md rounded-lg shadow-lg sm:relative"
    >
      <button
        onClick={() => navigate('/teacher-dash')}
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Enter Exam Scores for Reg No: <span className="text-blue-700">{rollNo}</span>
      </h2>

      <div id="exam-form" className="mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Exam
            </label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              disabled={editingResultId !== null}
              className="w-full p-2 rounded-md border border-gray-300 shadow-sm focus:ring-[#3D4577] focus:border-[#3D4577] text-sm disabled:opacity-50"
            >
              <option value="">-- Select an exam --</option>
              {availableExams
                .filter((exam) => !examResults.some((result) => result.examId === exam.id) || exam.id === editingResultId)
                .map((exam) => (
                  <option key={exam.id} value={exam.id}>
                    {exam.name}
                  </option>
                ))}
            </select>
          </div>

          {selectedExam && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Scores
              </label>
              <div className="space-y-3">
                {subjects.map((subject) => (
                  <div key={subject.name} className="grid grid-cols-12 gap-2 items-center">
                    <label className="col-span-5 sm:col-span-4 text-sm text-gray-700">
                      {subject.name}
                    </label>
                    <input
                      type="number"
                      value={scores[subject.name] || ''}
                      onChange={(e) => handleScoreChange(subject.name, e.target.value)}
                      placeholder="0-100"
                      min="0"
                      max="100"
                      className="col-span-5 sm:col-span-4 p-2 rounded-md border border-gray-300 text-sm"
                    />
                    <span className="col-span-2 sm:col-span-1 text-sm text-gray-500">
                      /100
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={!selectedExam || saving}
              className={`flex-1 h-10 bg-[#3D4577] text-white font-semibold rounded-md shadow-md hover:bg-[#3d4577a6] transition flex items-center justify-center gap-2 ${
                !selectedExam || saving ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {saving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5" /> {editingResultId ? 'Update Scores' : 'Save Scores'}
                </>
              )}
            </button>
            {editingResultId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex-1 h-10 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Exam Results</h2>
          {examResults.length === 0 ? (
            <p className="text-gray-500">No exam results recorded for this student.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left font-semibold text-gray-700 border-b">Exam Name</th>
                    <th className="p-3 text-left font-semibold text-gray-700 border-b">Subjects & Scores</th>
                    <th className="p-3 text-left font-semibold text-gray-700 border-b">Date</th>
                    <th className="p-3 text-left font-semibold text-gray-700 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {examResults.map((result) => (
                    <tr key={result.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-900">{result.examName}</td>
                      <td className="p-3">
                        <ul className="list-disc list-inside">
                          {result.subjects.map((subject, index) => (
                            <li key={index}>
                              {subject.name}: {subject.score}/100
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="p-3 text-gray-500">{result.date}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(result)}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(result.id)}
                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ExamEntry;