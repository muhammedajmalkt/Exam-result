// import { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { jsPDF } from 'jspdf';
// import { Download, ArrowLeft } from 'lucide-react';
// import { Mycontext } from '../Context/Context';

// const Result = () => {
//   const navigate = useNavigate();
//   const { result } = useContext(Mycontext);

//   useEffect(() => {
//     if (!result) {
//       navigate('/');
//     }
//   }, [result, navigate]);

//   const getGrade = (score) => {
//     if (score >= 90) return 'A+';
//     if (score >= 80) return 'A';
//     if (score >= 70) return 'B';
//     if (score >= 60) return 'C';
//     if (score >= 50) return 'D';
//     return 'F';
//   };

//   const enhancedResult = result
//     ? {
//         ...result,
//         sex: result.studentData?.sex || 'Unknown',
//         school: result.studentData?.school || 'Unknown School',
//         subjects: result.marks.map(subject => ({
//           subject: subject.name,
//           mark: subject.score,
//           grade: getGrade(subject.score),
//         })),
//         grade: result.percentage >= 90 ? 'A+' : result.percentage >= 80 ? 'A' : result.percentage >= 70 ? 'B' : result.percentage >= 60 ? 'C' : result.percentage >= 50 ? 'D' : 'F',
//         status: result.percentage >= 50 ? 'Pass' : 'Fail',
//         resultStatus: result.percentage >= 50 ? 'ELIGIBLE FOR HIGHER STUDIES' : 'NOT ELIGIBLE',
//       }
//     : null;

//   const getGradeColor = (grade) => {
//     switch (grade) {
//       case 'A+': return 'text-green-600';
//       case 'A': return 'text-blue-600';
//       case 'B': return 'text-yellow-600';
//       default: return 'text-gray-600';
//     }
//   };

//   const getStatusColor = (status) => {
//     return status === 'Pass' ? 'text-green-600' : 'text-red-600';
//   };

//   const downloadPDF = () => {
//     if (!enhancedResult) return;
//     const doc = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4'
//     });

//     const primaryColor = '#1E3A8A'; 
//     const accentColor = '#D97706';
//     const headerBgColor = '#DBEAFE';
//     const rowBgColor = '#F9FAFB'; 
//     const textColor = '#111827'; 

//     doc.setFont('helvetica', 'bold');

//     // Header
//     doc.setFillColor(primaryColor);
//     doc.rect(0, 0, 210, 25, 'F'); 
//     doc.setTextColor('#FFFFFF');
//     doc.setFontSize(18);
//     doc.text('Examination Result Certificate', 105, 14, { align: 'center' });

//     // Subheader
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(accentColor);
//     doc.setFontSize(12);
//     doc.text('Official Academic Transcript', 105, 20, { align: 'center' });

//     // Student Information
//     doc.setTextColor(textColor);
//     doc.setFontSize(12);
//     doc.setFont('helvetica', 'bold');
//     doc.text('Student Details', 20, 30);
//     doc.setLineWidth(0.5);
//     doc.setDrawColor(accentColor);
//     doc.line(20, 32, 190, 32); 

//     doc.setFont('helvetica', 'normal');
//     doc.text(`Registration No: ${enhancedResult.regNo}`, 20, 40);
//     doc.text(`Name: ${enhancedResult.studentName}`, 20, 48);
//     doc.text(`Sex: ${enhancedResult.sex}`, 20, 56);
//     doc.text(`School: ${enhancedResult.school}`, 20, 64);
//     doc.text(`Examination: ${enhancedResult.examName}`, 20, 72);
//     doc.text(`Date: ${enhancedResult.examData?.date ? new Date(enhancedResult.examData.date).toLocaleDateString() : 'N/A'}`, 20, 80);

//     // Subject-wise Results Table
//     doc.setFont('helvetica', 'bold');
//     doc.text('Subject-wise Results', 20, 90);
//     doc.line(20, 92, 190, 92); 

//     // Table Header
//     doc.setFillColor(headerBgColor);
//     doc.rect(20, 95, 170, 8, 'F');
//     doc.setTextColor(textColor);
//     doc.setFontSize(11);
//     doc.text('Subject', 22, 100);
//     doc.text('Marks', 100, 100, { align: 'center' });
//     doc.text('Grade', 160, 100, { align: 'center' });
//     doc.setDrawColor(primaryColor);
//     doc.line(20, 103, 190, 103); // Table header bottom line

//     // Table Rows
//     let y = 103;
//     enhancedResult.subjects.forEach(({ subject, mark, grade }, index) => {
//       y += 8;
//       doc.setFillColor(index % 2 === 0 ? rowBgColor : '#FFFFFF');
//       doc.rect(20, y - 5, 170, 8, 'F');
//       doc.setTextColor(textColor);
//       doc.setFont('helvetica', 'normal');
//       doc.text(subject.toUpperCase(), 22, y);
//       doc.text(`${mark}/100`, 100, y, { align: 'center' });
//       doc.setTextColor(grade === 'A+' || grade === 'A' ? '#16A34A' : grade === 'B' ? '#CA8A04' : '#EF4444');
//       doc.text(grade, 160, y, { align: 'center' });
//     });

//     // Table Bottom Line
//     doc.setDrawColor(primaryColor);
//     doc.line(20, y + 3, 190, y + 3);

//     // Result Summary
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(textColor);
//     doc.text('Result Summary', 20, y + 13);
//     doc.line(20, y + 15, 190, y + 15); 

//     doc.setFont('helvetica', 'normal');
//     y += 20;
//     doc.text(`Total Marks: ${enhancedResult.total}/${enhancedResult.subjects.length * 100}`, 20, y);
//     doc.text(`Percentage: ${enhancedResult.percentage}%`, 20, y + 8);
//     doc.setTextColor(enhancedResult.grade === 'A+' || enhancedResult.grade === 'A' ? '#16A34A' : enhancedResult.grade === 'B' ? '#CA8A04' : '#EF4444');
//     doc.text(`Overall Grade: ${enhancedResult.grade}`, 20, y + 16);
//     doc.setTextColor(enhancedResult.status === 'Pass' ? '#16A34A' : '#EF4444');
//     doc.text(`Status: ${enhancedResult.status}`, 20, y + 24);
//     doc.setTextColor(textColor);
//     doc.text(`Result: ${enhancedResult.resultStatus}`, 20, y + 32);

//     // Footer
//     doc.setDrawColor(accentColor);
//     doc.line(20, 270, 190, 270);
//     doc.setFontSize(10);
//     doc.setTextColor(textColor);
//     doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 275);
//     doc.text('Page 1 of 1', 190, 275, { align: 'right' });

//     // Border
//     doc.setDrawColor(primaryColor);
//     doc.setLineWidth(0.3);
//     doc.rect(0, 0, 210, 297); 
//     doc.save('result.pdf');
//   };


//   return (
//     <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 sm:p-6 relative">
//       <div className="absolute inset-0 bg-gray-100 bg-opacity-20 sm:bg-opacity-30"></div>
//       {enhancedResult && (
//         <div className="relative backdrop-blur-sm bg-white/80 rounded-lg shadow-2xl w-full max-w-md sm:max-w-lg lg:max-w-2xl ">
//           <div className="text-center py-6">
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center justify-center gap-2">
//               Examination Result
//             </h2>
//           </div>
//           <div className="px-6 pb-6 space-y-6">
//             <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 space-y-2">
//               <div className="flex justify-between items-center text-sm sm:text-base">
//                 <span className="text-gray-600 font-medium">Reg No:</span>
//                 <span className="font-semibold text-gray-800">{enhancedResult.regNo}</span>
//               </div>
//               <div className="flex justify-between items-center text-sm sm:text-base">
//                 <span className="text-gray-600 font-medium">Name:</span>
//                 <span className="font-semibold text-gray-800">{enhancedResult.studentName}</span>
//               </div>
//               <div className="flex justify-between items-center text-sm sm:text-base">
//                 <span className="text-gray-600 font-medium">Sex:</span>
//                 <span className="font-semibold text-gray-800">{enhancedResult.sex}</span>
//               </div>
//               <div className="flex justify-between items-center text-sm sm:text-base">
//                 <span className="text-gray-600 font-medium">Examination:</span>
//                 <span className="font-semibold text-gray-800">{enhancedResult.examName}</span>
//               </div>
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Subject-wise Results</h3>
//               <div className="border border-gray-200 rounded-lg overflow-hidden">
//                 <div className="grid grid-cols-3 bg-gray-100 text-gray-700 font-semibold text-sm sm:text-base">
//                   <div className="p-3 border-r border-gray-200">Subject</div>
//                   <div className="p-3 border-r border-gray-200 text-center">Marks</div>
//                   <div className="p-3 text-center">Grade</div>
//                 </div>
//                 {enhancedResult.subjects.map(({ subject, mark, grade }, index) => (
//                   <div
//                     key={index}
//                     className="grid grid-cols-3 text-sm sm:text-base border-t border-gray-200 bg-gray-50"
//                   >
//                     <div className="p-3 border-r border-gray-200">{subject.toUpperCase()}</div>
//                     <div className="p-3 border-r border-gray-200 text-center">{mark} /100</div>
//                     <div className={`p-3 text-center font-semibold ${getGradeColor(grade)}`}>{grade}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 space-y-2">
//               <div className="flex justify-between items-center text-sm sm:text-base">
//                 <span className="text-gray-600 font-medium">Total Marks:</span>
//                 <span className="font-bold text-gray-800">{enhancedResult.total}/{enhancedResult.subjects.length * 100}</span>
//               </div>
//               <div className="flex justify-between items-center text-sm sm:text-base">
//                 <span className="text-gray-600 font-medium">Percentage:</span>
//                 <span className="font-bold text-gray-800">{enhancedResult.percentage}%</span>
//               </div>
//               <div className="flex justify-between items-center text-sm sm:text-base">
//                 <span className="text-gray-600 font-medium">Overall Grade:</span>
//                 <span className={`font-bold text-lg ${getGradeColor(enhancedResult.grade)}`}>
//                   {enhancedResult.grade}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center text-sm sm:text-base">
//                 <span className="text-gray-600 font-medium">Result:</span>
//                 <span className={`font-bold ${getStatusColor(enhancedResult.status)}`}>
//                   {enhancedResult.status}
//                 </span>
//               </div>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <button
//                 onClick={downloadPDF}
//                 className="w-full sm:w-1/2 h-10 sm:h-12 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
//               >
//                 <Download className="w-4 h-4 sm:w-5 sm:h-5" />
//                 Print Result
//               </button>
//               <button
//                 onClick={() => {
//                   sessionStorage.removeItem("result")
//                   navigate('/')
//                 } }
//                 className="w-full sm:w-1/2 h-10 sm:h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
//               >
//                 <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
//                 Check Another Result
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Result;
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Mycontext } from '../Context/Context';
import PDFDownloadButton from './Pdf';

const Result = () => {
  const navigate = useNavigate();
  const { result } = useContext(Mycontext);

  useEffect(() => {
    if (!result) {
      navigate('/');
    }
  }, [result, navigate]);

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
        sex: result.studentData?.sex || 'Unknown',
        school: result.studentData?.school || 'Unknown School',
        subjects: result.marks.map(subject => ({
          subject: subject.name,
          mark: subject.score,
          grade: getGrade(subject.score),
        })),
        grade: result.percentage >= 90 ? 'A+' : result.percentage >= 80 ? 'A' : result.percentage >= 70 ? 'B' : result.percentage >= 60 ? 'C' : result.percentage >= 50 ? 'D' : 'F',
        status: result.percentage >= 50 ? 'Pass' : 'Fail',
        resultStatus: result.percentage >= 50 ? 'ELIGIBLE FOR HIGHER STUDIES' : 'NOT ELIGIBLE',
      }
    : null;

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': return 'text-green-600';
      case 'A': return 'text-blue-600';
      case 'B': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Pass' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 sm:p-6 relative">
      <div className="absolute inset-0 bg-gray-100 bg-opacity-20 sm:bg-opacity-30"></div>
      {enhancedResult && (
        <div className="relative backdrop-blur-sm bg-white/80 rounded-lg shadow-2xl w-full max-w-md sm:max-w-lg lg:max-w-2xl ">
          <div className="text-center py-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center justify-center gap-2">
              Examination Result
            </h2>
          </div>
          <div className="px-6 pb-6 space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 space-y-2">
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
                    <div className="p-3 border-r border-gray-200">{subject.toUpperCase()}</div>
                    <div className="p-3 border-r border-gray-200 text-center">{mark} /100</div>
                    <div className={`p-3 text-center font-semibold ${getGradeColor(grade)}`}>{grade}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center text-sm sm:text-base">
                <span className="text-gray-600 font-medium">Total Marks:</span>
                <span className="font-bold text-gray-800">{enhancedResult.total}/{enhancedResult.subjects.length * 100}</span>
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
            <div className="flex flex-col sm:flex-row gap-4">
              <PDFDownloadButton enhancedResult={enhancedResult} /> 
              <button
                onClick={() => {
                  sessionStorage.removeItem("result");
                  navigate('/');
                }}
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