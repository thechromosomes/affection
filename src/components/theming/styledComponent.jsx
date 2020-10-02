import styled from 'styled-components';

// Define our button, but with the use of props.theme this time
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  color: ${props => props.theme.button};
  border: 2px solid ${props => props.theme.border};
`;
// We are passing a default theme for Buttons that arent wrapped in the ThemeProvider
// Button.defaultProps = {
//   theme: {
//     main: "palevioletred"
//   }
// }


export default Button