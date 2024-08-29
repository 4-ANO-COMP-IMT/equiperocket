import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Opcao = styled.li`
    font-size: 18px; /* Tamanho de fonte maior */
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    padding: 0 15px; /* Mais espaçamento */
    cursor: pointer;
    min-width: 150px; /* Mais largo */
    color: #333; /* Cor ajustada */
    font-weight: bold;
`;

const Opcoes = styled.ul`
    display: flex;
    list-style: none; /* Remover marcadores */
`;

const textoOpcoes = ['Restaurantes']; /* Adicionando mais opções */

function HeaderOptions() {
    return (
        <Opcoes>
            {textoOpcoes.map((texto,index) => (
                  <Link to ={`/${texto.toLowerCase()}`} key={index}><Opcao><p>{texto}</p></Opcao></Link> 
            ))}
        </Opcoes>
    );
}

export default HeaderOptions;