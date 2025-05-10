import React from 'react';
import { motion } from 'framer-motion';

const StudentList = ({ students, filter }) => {
  const filtered = students.filter(
    (s) => !filter || s.course.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map((student, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 bg-white shadow rounded"
        >
          <h3 className="text-lg font-semibold">{student.name}</h3>
          <p className="text-sm text-gray-500">Course: {student.course}</p>
        </motion.div>
      ))}
      {filtered.length === 0 && <p>No students found.</p>}
    </div>
  );
};

export default StudentList;
