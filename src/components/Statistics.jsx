import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const COLORS = ['#0088FE', '#FF8042'];

const Statistics = ({ students, setStudents }) => {
  const [filteredStudents, setFilteredStudents] = useState(students);

  const courseCount = {};
  const genderCount = { Male: 0, Female: 0 };
  const monthlyAdmissions = {};
  let totalAge = 0;
  let totalStudents = students.length;

  students.forEach((student) => {
    // Course counts
    courseCount[student.course] = (courseCount[student.course] || 0) + 1;

    // Gender counts
    genderCount[student.gender] = (genderCount[student.gender] || 0) + 1;

    // Monthly admissions
    const date = new Date(student.createdAt);
    const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    monthlyAdmissions[month] = (monthlyAdmissions[month] || 0) + 1;

    // Calculate total age (Assuming students have an `age` field)
    totalAge += student.age || 0;  // Check if `age` field exists
  });

  const genderData = [
    { name: 'Male', value: genderCount.Male },
    { name: 'Female', value: genderCount.Female },
  ];

  const monthlyData = Object.entries(monthlyAdmissions).map(([month, count]) => ({
    month,
    count,
  })).sort((a, b) => new Date(a.month) - new Date(b.month));

  const topCourses = Object.entries(courseCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const averageAge = totalStudents > 0 ? totalAge / totalStudents : 0;

  // Filter students by course
  const onCourseClick = (course) => {
    const filteredStudents = students.filter(student => student.course === course);
    setFilteredStudents(filteredStudents); // Update the filtered students state
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {/* Total Students Counter */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Total Students</h2>
        <div className="text-3xl font-bold">{totalStudents}</div>
      </div>

      {/* Gender Distribution Pie Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Gender Distribution</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {genderData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Admissions Line Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Monthly Admissions</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top 3 Courses */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Top 3 Courses</h2>
        <div className="space-y-2">
          {topCourses.map(([course, count]) => (
            <div
              key={course}
              className="flex justify-between items-center p-2 border rounded cursor-pointer hover:bg-gray-100"
              onClick={() => onCourseClick(course)}
            >
              <span className="font-medium">{course}</span>
              <span className="text-sm bg-blue-200 text-blue-800 px-2 py-1 rounded">{count} students</span>
            </div>
          ))}
        </div>
      </div>

      {/* Course Distribution Bar Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Course Distribution</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={Object.entries(courseCount).map(([course, count]) => ({ course, count }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="course" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Average Age of Students */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Average Age of Students</h2>
        <div className="text-3xl font-bold">{averageAge.toFixed(1)}</div>
      </div>

      {/* Recent Students List */}
      <div className="bg-white p-4 rounded shadow col-span-1 sm:col-span-2 lg:col-span-3">
        <h2 className="text-lg font-semibold mb-2">Recent Students</h2>
        <ul>
          {students.slice(-5).map((student) => (
            <li key={student.id} className="p-2 border-b">
              <span className="font-medium">{student.name}</span> - {student.course}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Statistics;
