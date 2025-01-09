import React from 'react';
import Header from '../../components/Header/Header';
import FooterStudent from '../../components/FooterStudent/FooterStudent'
import StudentClasses from '../../components/StudentClasses/StudentClasses';

const Turmas = () => {
    return (
      <>
      <Header/>
      <main>
      <StudentClasses/>
      </main>
      <FooterStudent/>
      </>
    );
  };
  
  export default Turmas;