import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import Statistics from './components/Statistics';
import axios from './api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const fetchStudents = () => {
    axios.get('/students')
      .then(res => setStudents(res.data))
      .catch(err => console.error('Failed:', err));
  };

  useEffect(() => {
    if (loggedIn) fetchStudents();
  }, [loggedIn]);

  const addStudent = (student) => {
    axios.post('/students', student)
      .then(() => fetchStudents())
      .catch(console.error);
  };

  const filteredStudents = filter
    ? students.filter(s => s.course.toLowerCase() === filter.toLowerCase())
    : students;

  return (
    <div className={darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-black'}>
      <ToastContainer />
      {!loggedIn ? (
        showLogin ? (
          <Login setLoggedIn={setLoggedIn} setShowLogin={setShowLogin} />
        ) : (
          <Register setShowLogin={setShowLogin} />
        )
      ) : (
        <div className="flex h-screen overflow-hidden">
          <Sidebar setFilter={setFilter} filter={filter} />
          <div className="flex-1 flex flex-col">
            <Navbar setLoggedIn={setLoggedIn} darkMode={darkMode} setDarkMode={setDarkMode} />
            <main className="p-6 space-y-6 overflow-y-auto">
            
              <StudentForm addStudent={addStudent} />
        
              <StudentList students={filteredStudents} />

              <Statistics students={filteredStudents} />
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
