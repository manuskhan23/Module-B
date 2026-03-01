import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { DataGrid } from '../../components/DataGrid';
import '../../styles/pages.css';

export const ExamSchedule = () => {
  const [exams, setExams] = useState([
    { id: 1, subject: 'Mathematics', class: '10-A', date: '2024-03-15', time: '10:00 AM', room: 'A101' },
    { id: 2, subject: 'English', class: '10-A', date: '2024-03-16', time: '02:00 PM', room: 'A102' },
    { id: 3, subject: 'Science', class: '10-A', date: '2024-03-17', time: '10:00 AM', room: 'A103' },
  ]);

  const columns = [
    { field: 'subject', headerName: 'Subject' },
    { field: 'class', headerName: 'Class' },
    { field: 'date', headerName: 'Date' },
    { field: 'time', headerName: 'Time' },
    { field: 'room', headerName: 'Room' },
  ];

  return (
    <div className="page">
      <PageHeader 
        title="Exam Schedule"
        subtitle="View exam schedule"
      />
      <div className="page-content">
        <DataGrid columns={columns} rows={exams} />
      </div>
    </div>
  );
};
