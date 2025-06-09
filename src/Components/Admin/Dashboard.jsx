// import React, { useState, useEffect } from 'react';
// import { Users, BookOpen, Award, TrendingUp, Calendar, Bell, Search, Filter, BarChart3, PieChart, Download } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterGrade, setFilterGrade] = useState('all');

//   // Sample data
//   const dashboardStats = {
//     totalStudents: 1247,
//     resultsPublished: 892,
//     pendingResults: 355,
//     averageScore: 87.5,
//     passRate: 94.2
//   };

//   const gradeDistribution = [
//     { grade: 'A+', count: 234, percentage: 26.2, color: '#10B981' },
//     { grade: 'A', count: 198, percentage: 22.2, color: '#3B82F6' },
//     { grade: 'B+', count: 176, percentage: 19.7, color: '#8B5CF6' },
//     { grade: 'B', count: 142, percentage: 15.9, color: '#F59E0B' },
//     { grade: 'C+', count: 89, percentage: 10.0, color: '#EF4444' },
//     { grade: 'C', count: 53, percentage: 5.9, color: '#6B7280' }
//   ];

//   const monthlyResults = [
//     { month: 'Jan', published: 78, pending: 45 },
//     { month: 'Feb', published: 92, pending: 38 },
//     { month: 'Mar', published: 156, pending: 62 },
//     { month: 'Apr', published: 134, pending: 44 },
//     { month: 'May', published: 189, pending: 71 },
//     { month: 'Jun', published: 243, pending: 95 }
//   ];

//   const recentResults = [
//     { id: 1, student: 'Alice Johnson', course: 'Mathematics', grade: 'A+', score: 96, date: '2025-06-03' },
//     { id: 2, student: 'Bob Smith', course: 'Physics', grade: 'A', score: 89, date: '2025-06-03' },
//     { id: 3, student: 'Carol Williams', course: 'Chemistry', grade: 'B+', score: 85, date: '2025-06-02' },
//     { id: 4, student: 'David Brown', course: 'Biology', grade: 'A', score: 91, date: '2025-06-02' },
//     { id: 5, student: 'Eva Davis', course: 'English', grade: 'A+', score: 94, date: '2025-06-01' }
//   ];

//   const StatCard = ({ icon: Icon, title, value, subtitle, trend, color = 'blue' }) => (
//     <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
//       <div className="flex items-center justify-between mb-4">
//         <div className={`p-3 rounded-lg bg-${color}-100`}>
//           <Icon className={`w-6 h-6 text-${color}-600`} />
//         </div>
//         {trend && (
//           <div className="flex items-center text-green-600">
//             <TrendingUp className="w-4 h-4 mr-1" />
//             <span className="text-sm font-medium">+{trend}%</span>
//           </div>
//         )}
//       </div>
//       <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
//       <p className="text-gray-600 text-sm">{title}</p>
//       {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br  from-white  to-blue-50 ">
//       {/* Header */}
//       <header className=" ">
//         <div className="max-w-7xl mx-auto pxe-4 sm:px-6 lg:px-8">
//           <div className="flex justify-end items-center h-16">
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search students..."
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <button className="p-2 text-gray-400 hover:text-gray-600 relative">
//                 <Bell className="w-6 h-6" />
//                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Navigation Tabs */}
//         <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 w-fit">
//           {[
//             { id: 'overview', label: 'Overview', icon: BarChart3 },
//             { id: 'results', label: 'Results', icon: Award },
//             { id: 'analytics', label: 'Analytics', icon: PieChart }
//           ].map(tab => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
//                 activeTab === tab.id
//                   ? 'bg-white shadow-sm text-blue-600 font-medium'
//                   : 'text-gray-600 hover:text-gray-900'
//               }`}
//             >
//               <tab.icon className="w-4 h-4" />
//               <span>{tab.label}</span>
//             </button>
//           ))}
//         </div>

//         {/* Overview Tab */}
//         {activeTab === 'overview' && (
//           <div className="space-y-8">
//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
//               <StatCard
//                 icon={Users}
//                 title="Total Students"
//                 value={dashboardStats.totalStudents.toLocaleString()}
//                 subtitle="Active enrollments"
//                 trend={12}
//                 color="blue"
//               />
//               <StatCard
//                 icon={Award}
//                 title="Results Published"
//                 value={dashboardStats.resultsPublished}
//                 subtitle={`${((dashboardStats.resultsPublished / dashboardStats.totalStudents) * 100).toFixed(1)}% of total`}
//                 trend={8}
//                 color="green"
//               />
//               <StatCard
//                 icon={Calendar}
//                 title="Pending Results"
//                 value={dashboardStats.pendingResults}
//                 subtitle="Awaiting publication"
//                 color="orange"
//               />
//               <StatCard
//                 icon={TrendingUp}
//                 title="Average Score"
//                 value={`${dashboardStats.averageScore}%`}
//                 subtitle="Class performance"
//                 trend={3}
//                 color="purple"
//               />
//               <StatCard
//                 icon={BookOpen}
//                 title="Pass Rate"
//                 value={`${dashboardStats.passRate}%`}
//                 subtitle="Above 60% score"
//                 trend={5}
//                 color="emerald"
//               />
//             </div>

//             {/* Charts Section */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               {/* Monthly Results Chart */}
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-lg font-semibold text-gray-900">Monthly Results Trend</h3>
//                   <button className="text-gray-400 hover:text-gray-600">
//                     <Download className="w-5 h-5" />
//                   </button>
//                 </div>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={monthlyResults}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="month" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="published" fill="#3B82F6" name="Published" />
//                     <Bar dataKey="pending" fill="#F59E0B" name="Pending" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* Grade Distribution */}
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-lg font-semibold text-gray-900">Grade Distribution</h3>
//                   <button className="text-gray-400 hover:text-gray-600">
//                     <Download className="w-5 h-5" />
//                   </button>
//                 </div>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <RechartsPieChart>
//                     <Pie
//                       data={gradeDistribution}
//                       cx="50%"
//                       cy="50%"
//                       outerRadius={80}
//                       dataKey="count"
//                       label={({grade, percentage}) => `${grade} (${percentage}%)`}
//                     >
//                       {gradeDistribution.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </RechartsPieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Results Tab */}
//         {activeTab === 'results' && (
//           <div className="space-y-6">
//             {/* Filters */}
//             <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
//               <div className="flex items-center space-x-2">
//                 <Filter className="w-5 h-5 text-gray-400" />
//                 <span className="text-sm font-medium text-gray-700">Filter by Grade:</span>
//               </div>
//               <select
//                 value={filterGrade}
//                 onChange={(e) => setFilterGrade(e.target.value)}
//                 className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="all">All Grades</option>
//                 {gradeDistribution.map(grade => (
//                   <option key={grade.grade} value={grade.grade}>{grade.grade}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Recent Results Table */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//               <div className="px-6 py-4 border-b border-gray-200">
//                 <h3 className="text-lg font-semibold text-gray-900">Recent Results</h3>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {recentResults.map((result) => (
//                       <tr key={result.id} className="hover:bg-gray-50 transition-colors">
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
//                               {result.student.split(' ').map(n => n[0]).join('')}
//                             </div>
//                             <div className="ml-3">
//                               <div className="text-sm font-medium text-gray-900">{result.student}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.course}</td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                             result.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
//                             result.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
//                             'bg-yellow-100 text-yellow-800'
//                           }`}>
//                             {result.grade}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.score}%</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.date}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Analytics Tab */}
//         {activeTab === 'analytics' && (
//           <div className="space-y-8">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               {/* Performance Trend */}
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Trend</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <LineChart data={monthlyResults}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="month" />
//                     <YAxis />
//                     <Tooltip />
//                     <Line type="monotone" dataKey="published" stroke="#3B82F6" strokeWidth={3} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* Grade Statistics */}
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-6">Grade Statistics</h3>
//                 <div className="space-y-4">
//                   {gradeDistribution.map((grade, index) => (
//                     <div key={index} className="flex items-center justify-between">
//                       <div className="flex items-center space-x-3">
//                         <div className={`w-4 h-4 rounded`} style={{backgroundColor: grade.color}}></div>
//                         <span className="font-medium text-gray-900">Grade {grade.grade}</span>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <span className="text-sm text-gray-600">{grade.count} students</span>
//                         <span className="text-sm font-medium text-gray-900">{grade.percentage}%</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Award, TrendingUp, Calendar, Bell, Search, Filter, BarChart3, PieChart, Download, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../Firebase/Config';
import { toast } from 'sonner';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('all');
  const [dashboardStats, setDashboardStats] = useState({
    totalStudents: 0,
    resultsPublished: 0,
    pendingResults: 0,
    averageScore: 0,
    passRate: 0,
  });
  const [gradeDistribution, setGradeDistribution] = useState([]);
  const [monthlyResults, setMonthlyResults] = useState([]);
  const [recentResults, setRecentResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to calculate grade based on average score
  const calculateGrade = (avgScore) => {
    if (avgScore >= 90) return 'A+';
    if (avgScore >= 80) return 'A';
    if (avgScore >= 70) return 'B+';
    if (avgScore >= 60) return 'B';
    if (avgScore >= 50) return 'C+';
    return 'C';
  };

  // Fetch data from Firestore
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch all students
        const studentsSnapshot = await getDocs(collection(firestore, 'students'));
        const totalStudents = studentsSnapshot.docs.length;

        // Fetch all exams to calculate pending results
        const examsSnapshot = await getDocs(collection(firestore, 'exams'));
        const totalExams = examsSnapshot.docs.length;

        let resultsPublished = 0;
        let totalScores = 0;
        let passingResults = 0;
        const gradeCounts = { 'A+': 0, A: 0, 'B+': 0, B: 0, 'C+': 0, C: 0 };
        const monthlyData = {};
        const recentResultsData = [];

        // Fetch results for all students
        for (const studentDoc of studentsSnapshot.docs) {
          const rollNo = studentDoc.id;
          const studentName = studentDoc.data().name || 'Unknown Student';
          const resultsSnapshot = await getDocs(
            collection(firestore, 'students', rollNo, 'examMarks')
          );

          resultsSnapshot.forEach((resultDoc) => {
            const result = resultDoc.data();
            resultsPublished++;

            // Calculate average score for the result
            const totalScore = result.subjects.reduce((sum, subject) => sum + (subject.score || 0), 0);
            const avgScore = totalScore / result.subjects.length;
            totalScores += avgScore;

            // Determine grade
            const grade = calculateGrade(avgScore);
            gradeCounts[grade]++;

            // Count passing results (score >= 60)
            if (avgScore >= 60) passingResults++;

            // Aggregate monthly data
            const date = result.date
              ? new Date(
                  typeof result.date === 'string' ? result.date : result.date.seconds * 1000
                )
              : new Date();
            const month = date.toLocaleString('en-US', { month: 'short' });
            monthlyData[month] = monthlyData[month] || { published: 0, pending: 0 };
            monthlyData[month].published++;

            // Collect recent results (limit to 5)
            if (recentResultsData.length < 5) {
              recentResultsData.push({
                id: resultDoc.id,
                student: studentName,
                course: result.examName,
                grade,
                score: avgScore.toFixed(1),
                date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
              });
            }
          });
        }

        // Calculate pending results
        const pendingResults = totalStudents * totalExams - resultsPublished;

        // Format grade distribution
        const totalGrades = Object.values(gradeCounts).reduce((sum, count) => sum + count, 0);
        const gradeDistributionData = Object.entries(gradeCounts).map(([grade, count]) => ({
          grade,
          count,
          percentage: totalGrades ? ((count / totalGrades) * 100).toFixed(1) : 0,
          color: grade === 'A+' ? '#10B981' : grade === 'A' ? '#3B82F6' : grade === 'B+' ? '#8B5CF6' : grade === 'B' ? '#F59E0B' : grade === 'C+' ? '#EF4444' : '#6B7280',
        }));

        // Format monthly results (last 6 months)
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const monthlyResultsData = months.map((month) => ({
          month,
          published: monthlyData[month]?.published || 0,
          pending: totalStudents - (monthlyData[month]?.published || 0),
        }));

        // Update state
        setDashboardStats({
          totalStudents,
          resultsPublished,
          pendingResults,
          averageScore: resultsPublished ? (totalScores / resultsPublished).toFixed(1) : 0,
          passRate: resultsPublished ? ((passingResults / resultsPublished) * 100).toFixed(1) : 0,
        });
        setGradeDistribution(gradeDistributionData);
        setMonthlyResults(monthlyResultsData);
        setRecentResults(recentResultsData.sort((a, b) => new Date(b.date) - new Date(a.date)));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        toast.error('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Filter recent results based on search term and grade
  const filteredRecentResults = recentResults.filter(
    (result) =>
      result.student.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterGrade === 'all' || result.grade === filterGrade)
  );

  const StatCard = ({ icon: Icon, title, value, subtitle, trend, color = 'blue' }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        {trend && (
          <div className="flex items-center text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">+{trend}%</span>
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-blue-500"></div> 
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      {/* Header */}
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 w-fit">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'results', label: 'Results', icon: Award },
            { id: 'analytics', label: 'Analytics', icon: PieChart },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white shadow-sm text-blue-600 font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <StatCard
                icon={Users}
                title="Total Students"
                value={dashboardStats.totalStudents.toLocaleString()}
                subtitle="Active enrollments"
                trend={12} // Placeholder; calculate dynamically if needed
                color="blue"
              />
              <StatCard
                icon={Award}
                title="Results Published"
                value={dashboardStats.resultsPublished}
                subtitle={`${dashboardStats.totalStudents ? ((dashboardStats.resultsPublished / dashboardStats.totalStudents) * 100).toFixed(1) : 0}% of total`}
                trend={8} // Placeholder
                color="green"
              />
              <StatCard
                icon={Calendar}
                title="Pending Results"
                value={dashboardStats.pendingResults}
                subtitle="Awaiting publication"
                color="orange"
              />
              <StatCard
                icon={TrendingUp}
                title="Average Score"
                value={`${dashboardStats.averageScore}%`}
                subtitle="Class performance"
                trend={3} // Placeholder
                color="purple"
              />
              <StatCard
                icon={BookOpen}
                title="Pass Rate"
                value={`${dashboardStats.passRate}%`}
                subtitle="Above 60% score"
                trend={5} // Placeholder
                color="emerald"
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Monthly Results Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Monthly Results Trend</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyResults}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="published" fill="#3B82F6" name="Published" />
                    <Bar dataKey="pending" fill="#F59E0B" name="Pending" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Grade Distribution */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Grade Distribution</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ grade, percentage }) => `${grade} (${percentage}%)`}
                    >
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Filter by Grade:</span>
              </div>
              <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Grades</option>
                {gradeDistribution.map((grade) => (
                  <option key={grade.grade} value={grade.grade}>
                    {grade.grade}
                  </option>
                ))}
              </select>
            </div>

            {/* Recent Results Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Results</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRecentResults.map((result) => (
                      <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {result.student.split(' ').map((n) => n[0]).join('')}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{result.student}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.course}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              result.grade.startsWith('A')
                                ? 'bg-green-100 text-green-800'
                                : result.grade.startsWith('B')
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {result.grade}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.score}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Performance Trend */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyResults}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="published" stroke="#3B82F6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Grade Statistics */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Grade Statistics</h3>
                <div className="space-y-4">
                  {gradeDistribution.map((grade, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded`} style={{ backgroundColor: grade.color }}></div>
                        <span className="font-medium text-gray-900">Grade {grade.grade}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{grade.count} students</span>
                        <span className="text-sm font-medium text-gray-900">{grade.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;