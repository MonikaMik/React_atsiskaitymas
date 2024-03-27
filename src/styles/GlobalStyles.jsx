import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
    --body-bg: #fafafa;
    --header-bg: #fff;
    --text-grey: #808080;
    --accent-orange: #F48023;
    --hover-orange: #de5c00;
    --accent-blue: #1682FD;
    --accent-grey: #EAEAEA;
    --accent-green: #17A100;
    --toast-green: #00610396;
    --toast-red: #87000096;
    --accent-red: #FF0000;
    --orange-bg: #FCF4EC;
    --accent-orange-faint: #f4812380;
    --accent-blue-faint: #1682fd85;
    --border-grey: #d0d0d0;
    --card-shadow: 2px 1px 5px 0 rgba(0, 0, 0, 0.15);
    --placeholder: #afafaf;
    --accent-peach: #FCF4EC;
  }
  body {
    font-family: "Nunito Sans", sans-serif;
    background-color: var(--body-bg);
  }
@keyframes slideIn {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
`;

export default GlobalStyles;
