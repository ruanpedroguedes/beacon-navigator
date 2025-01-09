import React from 'react';
import Header from '../../components/Header/Header';
import FooterStudent from '../../components/FooterStudent/FooterStudent'
import TurmasAvisosContent from '../../components/StudentClassAvisos/StudentClassAvisos'; // Certifique-se de usar o componente correto!

const TurmasAvisos = () => {
  return (
    <>
      <Header />
      <main>
        <TurmasAvisosContent /> {/* Este deve ser o componente que busca os avisos */}
      </main>
      <FooterStudent/>
    </>
  );
};

export default TurmasAvisos;
