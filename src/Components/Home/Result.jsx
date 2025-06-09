import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { Award, Download, ArrowLeft } from 'lucide-react';
import { Mycontext } from '../Context/Context';

const Result = () => {
  const navigate = useNavigate();
  const {result} = useContext(Mycontext)

  useEffect(() => {
    if (!result) {
      navigate('/');
    }
  }, [result, navigate]);

  // Derive grades and enhance result
  const getGrade = (score) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  };

  const enhancedResult = result
    ? {
        ...result,
        sex: result.sex || 'Unknown',
        school: result.school || 'Unknown School',
        subjects: Object.entries(result.marks).map(([subject, mark]) => ({
          subject,
          mark,
          grade: getGrade(mark),
        })),
        grade: result.grade || (result.percentage >= 90 ? 'A+' : result.percentage >= 80 ? 'A' : 'B'),
        status: result.status || (result.percentage >= 50 ? 'Pass' : 'Fail'),
        resultStatus: result.percentage >= 50 ? 'ELIGIBLE FOR HIGHER STUDIES' : 'NOT ELIGIBLE',
      }
    : null;

  // Dynamic color for grade
  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
        return 'text-green-600';
      case 'A':
        return 'text-blue-600';
      case 'B':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  // Dynamic color for status
  const getStatusColor = (status) => {
    return status === 'Pass' ? 'text-green-600' : 'text-red-600';
  };

  const downloadPDF = () => {
    if (!enhancedResult) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Student Result', 20, 20);
    doc.setFontSize(12);
    // doc.text(`ID: ${enhancedResult._id || 'N/A'}`, 20, 30);
    doc.text(`Reg No: ${enhancedResult.regNo}`, 20, 40);
    doc.text(`Name: ${enhancedResult.studentName}`, 20, 50);
    doc.text(`Sex: ${enhancedResult.sex}`, 20, 60);
    // doc.text(`School: ${enhancedResult.school}`, 20, 70);
    doc.text(`Exam: ${enhancedResult.examName}`, 20, 80);
    doc.text('Subject-wise Results:', 20, 90);
    // Table headers
    doc.text('Subject', 20, 100);
    doc.text('Marks', 120, 100);
    doc.text('Grade', 160, 100);
    doc.line(20, 102, 190, 102); // Horizontal line
    let y = 110;
    // Table rows
    enhancedResult.subjects.forEach(({ subject, mark, grade }) => {
      doc.text(subject, 20, y);
      doc.text(`${mark}/100`, 120, y);
      doc.text(grade, 160, y);
      y += 10;
    });
    doc.line(20, y - 8, 190, y - 8); // Bottom line
    doc.text(`Total: ${enhancedResult.total}/300`, 20, y + 10);
    doc.text(`Percentage: ${enhancedResult.percentage}%`, 20, y + 20);
    doc.text(`Overall Grade: ${enhancedResult.grade}`, 20, y + 30);
    doc.text(`Status: ${enhancedResult.status}`, 20, y + 40);
    doc.text(`Result: ${enhancedResult.resultStatus}`, 20, y + 50);
    doc.save('result.pdf');
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 sm:p-6 relative">
      <div className="absolute inset-0 bg-gray-100 bg-opacity-20 sm:bg-opacity-30"></div>

      {/* Result Container */}
      {enhancedResult && (
        <div className="relative backdrop-blur-sm bg-white/80 rounded-lg shadow-2xl w-full max-w-md sm:max-w-lg lg:max-w-2xl animate-in slide-in-from-right duration-500">
          {/* Header */}
          <div className="text-center py-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center justify-center gap-2">
              Examination Result
            </h2>
          </div>

          {/* Content */}
          <div className="px-6 pb-6 space-y-6">
            {/* Student Info */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 space-y-2">
              {/* <div className="flex justify-between items-center text-sm sm:text-base">
                <span className="text-gray-600 font-medium">ID:</span>
                <span className="font-semibold text-gray-800">{enhancedResult._id || 'N/A'}</span>
              </div> */}
              <div className="flex justify-between items-center text-sm sm:text-base">
                <span className="text-gray-600 font-medium">Reg No:</span>
                <span className="font-semibold text-gray-800">{enhancedResult.regNo}</span>
              </div>
              <div className="flex justify-between items-center text-sm sm:text-base">
                <span className="text-gray-600 font-medium">Name:</span>
                <span className="font-semibold text-gray-800">{enhancedResult.studentName}</span>
              </div>
              <div className="flex justify-between items-center text-sm sm:text-base">
                <span className="text-gray-600 font-medium">Sex:</span>
                <span className="font-semibold text-gray-800">{enhancedResult.sex}</span>
              </div>
              <div className="flex justify-between items-center text-sm sm:text-base">
                <span className="text-gray-600 font-medium">Examination:</span>
                <span className="font-semibold text-gray-800">{enhancedResult.examName}</span>
              </div>
            </div>

            {/* Subject-wise Results Table */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Subject-wise Results</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="grid grid-cols-3 bg-gray-100 text-gray-700 font-semibold text-sm sm:text-base">
                  <div className="p-3 border-r border-gray-200">Subject</div>
                  <div className="p-3 border-r border-gray-200 text-center">Marks</div>
                  <div className="p-3 text-center">Grade</div>
                </div>
                {enhancedResult.subjects.map(({ subject, mark, grade }, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 text-sm sm:text-base border-t border-gray-200 bg-gray-50"
                  >
                    <div className="p-3 border-r border-gray-200">{subject}</div>
                    <div className="p-3 border-r border-gray-200 text-center">{mark}/100</div>
                    <div className="p-3 text-center font-semibold text-gray-800">{grade}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Result Summary */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center text-sm sm:text-base">
                <span className="text-gray-600 font-medium">Total Marks:</span>
                <span className="font-bold text-gray-800">{enhancedResult.total}/300</span>
              </div>
              <div className="flex justify-between items-center text-sm sm:text-base">
                <span className="text-gray-600 font-medium">Percentage:</span>
                <span className="font-bold text-gray-800">{enhancedResult.percentage}%</span>
              </div>
              <div className="flex justify-between items-center text-sm sm:text-base">
                <span className="text-gray-600 font-medium">Overall Grade:</span>
                <span className={`font-bold text-lg ${getGradeColor(enhancedResult.grade)}`}>
                  {enhancedResult.grade}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm sm:text-base">
                <span className="text-gray-600 font-medium">Result:</span>
                <span className={`font-bold ${getStatusColor(enhancedResult.status)}`}>
                  {enhancedResult.status}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={downloadPDF}
                className="w-full sm:w-1/2 h-10 sm:h-12 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                Print Result
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full sm:w-1/2 h-10 sm:h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                Check Another Result
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;