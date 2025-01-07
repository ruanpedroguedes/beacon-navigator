import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import StudentClasses from '../../components/StudentClasses/StudentClasses';

const Turmas = () => {
    return (
      <>
      <Header/>
      <main>
      <StudentClasses/>
      </main>
      <Footer/>
      </>
    );
  };
  
  export default Turmas;