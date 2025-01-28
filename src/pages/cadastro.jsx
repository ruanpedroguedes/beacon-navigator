import FormFisico from "../components/Form/FormFisico";
import { useState } from 'react';
import './FormCadastro.css'

export default function Cadastro (){

    const [isFisica, setIsFisica] = useState(true);

    const pessoaEscolhida = () => {
        if (isFisica == false){
            return <FormJurico pessoaEscolhida={setIsFisica}/>
        } else if (isFisica == true){
            return <FormFisico pessoaEscolhida={setIsFisica}/>
        }
    }
    
    return(
        <>
        {pessoaEscolhida()}
        </>
    )
}
