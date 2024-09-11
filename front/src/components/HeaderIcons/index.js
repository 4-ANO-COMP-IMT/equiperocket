import perfil from '../../assets/Images/perfil.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Icone = styled.li`
    margin-right: 20px;
    width: 30px;
`;

const Icones = styled.ul`
    display: flex;
    align-items: center;
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

const IconImage = styled.img`
    width: 30px;
    height: 30px;
`;

const icones = [
    { src: perfil, route: "/perfil" },
    
];

function HeaderIcons() {
    return (
        <Icones>
            {icones.map((icone, index) => (
                <Icone key={index}>
                    <Link to={icone.route}>
                        <IconImage src={icone.src} alt={`Icone ${index}`} />
                    </Link>
                </Icone>
            ))}
        </Icones>
    );
}

export default HeaderIcons;
