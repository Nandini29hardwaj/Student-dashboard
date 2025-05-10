import React, { useState } from 'react';
import { toast } from 'react-toastify';

const StudentForm = ({ addStudent }) => {
  const [student, setStudent] = useState({ name: '', course: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!student.name || !student.course) {
      toast.error('Fill all fields');
      return;
    }
    addStudent(student);
    setStudent({ name: '', course: '' });
    toast.success('Student added');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md max-w-xl mx-auto">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Name"
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Course"
          value={student.course}
          onChange={(e) => setStudent({ ...student, course: e.target.value })}
          className="w-full border p-2 rounded"
        />
      </div>
      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Add Student
      </button>
    </form>
  );
};

export default StudentForm;
