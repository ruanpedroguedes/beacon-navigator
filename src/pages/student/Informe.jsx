import React from 'react';
import Header from '../../components/Header/Header';
import FooterStudent from '../../components/FooterStudent/FooterStudent';
import StudentInforme from '../../components/InformeStudent/InformeStudent';

const InformeStudent = ({ alunoNome }) => {
  return (
    <>
      <Header />
      <main>
        <StudentInforme alunoNome={alunoNome} />
      </main>
      <FooterStudent />
    </>
  );
};

export default InformeStudent;
