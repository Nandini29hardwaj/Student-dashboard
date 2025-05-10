import React, { useState } from 'react';

const Sidebar = ({ filter, setFilter }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const courses = ['CSE', 'ECE', 'ME', 'Civil'];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCourseClick = (course) => {
    setFilter(course);  // Update filter with selected course
    if (window.innerWidth <= 1024) {  // Close the sidebar on medium/small screens
      setIsSidebarOpen(false);
    }
  };

  return (
    <div>
      {/* Mobile Hamburger Button */}
      <div className="lg:hidden p-4">
        <button
          className="text-black text-xl"  // Change "Menu" text color to black
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`lg:block fixed inset-0 lg:w-64 bg-gray-800 text-white p-5 z-10 transform transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:relative lg:h-full lg:static`}
      >
        <h2 className="text-xl font-bold mb-4">Courses</h2>
        <ul>
          {courses.map((course) => (
            <li
              key={course}
              className={`cursor-pointer p-2 rounded-md mb-2 ${
                filter === course ? 'bg-blue-600' : 'hover:bg-blue-700'
              }`}
              onClick={() => handleCourseClick(course)}  // Call handleCourseClick on click
            >
              {course}
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay for mobile */}
      <div
        className={`lg:hidden fixed inset-0 bg-black opacity-50 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}  // Close sidebar when clicking outside
      ></div>
    </div>
  );
};

export default Sidebar;
