import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
    --body-bg: #fafafa;
    --text-grey: #808080;
    --accent-orange: #F48023;
    --accent-blue: #1682FD;
    --accent-grey: #EAEAEA;
    --accent-green: #17A100;
    --accent-red: #FF0000;
    --orange-bg: #FCF4EC;
    --accent-orange-faint: #f4812380;
    --accent-blue-faint: #1682fd85;
    --border-grey: #C4C4C4;
    --card-shadow: 2px 1px 5px 0 rgba(0, 0, 0, 0.15);
  }
  body {
    font-family: "Nunito Sans", sans-serif;
    background-color: var(--body-bg);
  }
`;

export default GlobalStyles;
