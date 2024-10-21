import logo from '../../assets/Images/logo.svg';
import styled from 'styled-components';

const LogoContainer = styled.div`
    display: flex;
`;

const LogoImage = styled.img`
    margin-right: 15px;
    width: 120px; 
`;

function Logo() {
    return (
        <LogoContainer>
            <LogoImage
                src={logo}
                alt='logo' 
            />
       </LogoContainer>
    )
}

export default Logo;