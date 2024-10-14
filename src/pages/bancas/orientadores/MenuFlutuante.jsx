import React from 'react'
import FloatingMenu from '../../../components/FloatingMenu'
import { FaRegPlusSquare } from 'react-icons/fa'

export const MenuFlutuante = (props) => {

    const {
        id_orientando,
        handlerShowModalCadastrarBanca,
        handlerShowModalCadastrarEAtualizarOrientacao
    } = props;
    
    return (
        <div>
            <FloatingMenu>
                <ul className="dropdown-menu">
                    <li>
                        <a className='button' onClick={() => handlerShowModalCadastrarBanca()}><FaRegPlusSquare /> Registrar banca </a>
                    </li>
                    {id_orientando !== 0 ? (
                        <li>
                            <a className='button' onClick={() => handlerShowModalCadastrarEAtualizarOrientacao()}> Registrar orientação</a>
                        </li>
                    ) : ("")}

                    <li>
                        <a>Para adicionar novas opções entre em contato com o desenvolvedor </a>
                    </li>
                </ul>
            </FloatingMenu>
        </div>
    )
}
