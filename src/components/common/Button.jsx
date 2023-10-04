import styled from "styled-components";

const Button = styled.button`
    background: none;
    color: ${props => props.theme.colors.accent};
    font-weight: bold;
    border: 1px solid ${props => props.theme.colors.accent};
    border-radius: 20px;
    padding: 0.8em 1.8em;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
`;

export const ButtonSolid = styled(Button)`
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.textAccent};
`;

export default Button;