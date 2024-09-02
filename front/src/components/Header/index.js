import Logo from '../Logo';
import HeaderOptions from '../HeaderOptions';
import HeaderIcons from '../HeaderIcons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
    background-color: #fff; /* Mudança de cor do fundo */
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 30px; /* Mais espaço */
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra mais pronunciada */
    position: relative; 

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        padding: 10px;
    }
`;

const LogoLink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #333; /* Alteração de cor */
    margin-right: auto;

    @media (max-width: 768px) {
        margin-bottom: 10px;
    }
`;

const NavAndIconsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between; /* Adicionado para espaçar melhor os elementos */
    flex-grow: 1;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
`;

function Header() {
    return (
        <HeaderContainer>
            <LogoLink to="/">
                <Logo/>
            </LogoLink>
            <NavAndIconsContainer>
                <HeaderOptions/>
                <HeaderIcons/>
            </NavAndIconsContainer>
        </HeaderContainer>
    );
}

export default Header;