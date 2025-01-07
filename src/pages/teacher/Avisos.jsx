import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CriarAvisos from '../../components/CriarAvisos/CriarAvisos';

const AvisosPage = () => {
  const { classId } = useParams(); // Obtém o classId da URL

  return (
   <>
   <Header/>
   <main>
    <h1>Avisos da Turma</h1>
    <CriarAvisos classId={classId} /> {/* Passa o classId como prop */}
   </main>
   <Footer/>
   </>
  );
};

export default AvisosPage;