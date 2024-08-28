import perfil from '../../assets/Images/perfil.svg';
import styled from 'styled-components';

const Icone = styled.li`
    margin-right: 20px; 
    width: 30px; /* Aumentado */
`;

const Icones = styled.ul`
    display: flex;
    align-items: center;
    list-style-type: none; /* Remover os pontos de lista */
    padding: 0; /* Remover padding padrão */
    margin: 0; /* Remover margin padrão */
`;

const IconImage = styled.img`
    width: 30px; /* Aumentado */
    height: 30px;
`;

const icones = [perfil];

function HeaderIcons() {
    return (
        <Icones>
            {icones.map((icone, index) => (
                <Icone key={index}><IconImage src={icone} /></Icone>
            ))}
        </Icones>
    );
}

export default HeaderIcons;