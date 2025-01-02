import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import TeacherClasses from '../../components/TeacherClasses/TeacherClasses';

const TeacherDashboard = () => {
  return (
   <>
   <Header/>
   <main>
    <TeacherClasses/>
   </main>
   <Footer/>
   </>
  );
};

export default TeacherDashboard;