import React from 'react';
import Header from '../../components/Header/Header';
import FooterTeacher from '../../components/FooterTeacher/FooterTeacher'
import TeacherClasses from '../../components/TeacherClasses/TeacherClasses';

const TeacherDashboard = () => {
  return (
   <>
   <Header/>
   <main>
    <TeacherClasses/>
   </main>
   <FooterTeacher/>
   </>
  );
};

export default TeacherDashboard;