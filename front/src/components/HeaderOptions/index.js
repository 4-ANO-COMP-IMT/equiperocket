import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Opcao = styled.li`
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    padding: 0 15px;
    cursor: pointer;
    min-width: 150px;
    color: #333;
    font-weight: bold;
`;

const Opcoes = styled.ul`
    display: flex;
    list-style: none;
`;

const textoOpcoes = ['Restaurantes'];

function HeaderOptions() {
    return (
        <Opcoes>
            {textoOpcoes.map((texto, index) => (
                <Opcao key={index}>
                    <Link to={`/${texto.toLowerCase()}`}>
                        <p>{texto}</p>
                    </Link>
                </Opcao>
            ))}
        </Opcoes>
    );
}

export default HeaderOptions;
