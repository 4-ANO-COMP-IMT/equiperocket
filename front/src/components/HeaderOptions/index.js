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
    color: #dcdcdc;
    font-weight: bold;
    
  
`;

const Opcoes = styled.ul`
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
`;

const LinkEstilizado = styled(Link)`
    text-decoration: none; 
    color: #171412; 
    
    &:focus, &:visited, &:active {
        color: #171412; 
    }
          &:hover {
        color: #8bf337;
    }
`;

const textoOpcoes = ['Restaurantes'];

function HeaderOptions() {
    return (
        <Opcoes>
            {textoOpcoes.map((texto, index) => (
                <Opcao key={index}>
                    <LinkEstilizado to={`/${texto.toLowerCase()}`}>
                        <p>{texto}</p>
                    </LinkEstilizado>
                </Opcao>
            ))}
        </Opcoes>
    );
}

export default HeaderOptions;
