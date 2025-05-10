import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios, { delayResponse: 1000 });

// Initial students with gender and createdAt
const initialStudents = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    course: 'CSE',
    gender: 'Male',
    createdAt: '2025-04-20T10:00:00Z',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    course: 'CSE',
    gender: 'Female',
    createdAt: '2025-04-22T14:30:00Z',
  },
  {
    id: 3,
    name: 'Rahul Mehra',
    email: 'rahul@example.com',
    course: 'ECE',
    gender: 'Male',
    createdAt: '2025-04-25T09:45:00Z',
  },
  {
    id: 4,
    name: 'Priya Verma',
    email: 'priya@example.com',
    course: 'ECE',
    gender: 'Female',
    createdAt: '2025-04-28T11:20:00Z',
  },
  {
    id: 5,
    name: 'Amit Khanna',
    email: 'amit@example.com',
    course: 'ME',
    gender: 'Male',
    createdAt: '2025-05-02T08:15:00Z',
  },
  {
    id: 6,
    name: 'Sneha Kapoor',
    email: 'sneha@example.com',
    course: 'ME',
    gender: 'Female',
    createdAt: '2025-05-04T13:50:00Z',
  },
  {
    id: 7,
    name: 'Karan Singh',
    email: 'karan@example.com',
    course: 'Civil',
    gender: 'Male',
    createdAt: '2025-05-06T10:10:00Z',
  },
  {
    id: 8,
    name: 'Anjali Rao',
    email: 'anjali@example.com',
    course: 'Civil',
    gender: 'Female',
    createdAt: '2025-05-08T12:25:00Z',
  },
];

let students = [...initialStudents];

// GET /students
mock.onGet('/students').reply(200, students);

// POST /students
mock.onPost('/students').reply(config => {
  const newStudent = JSON.parse(config.data);
  newStudent.id = Date.now();
  newStudent.createdAt = new Date().toISOString(); // Automatically set timestamp
  students.push(newStudent);
  return [201, newStudent];
});

export default axios;
