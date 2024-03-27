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
.loader {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        position: relative;
        animation: rotate 1s linear infinite
      }
      .loader::before , .loader::after {
        content: "";
        box-sizing: border-box;
        position: absolute;
        inset: 0px;
        border-radius: 50%;
        border: 5px solid #FFF;
        animation: prixClipFix 2s linear infinite ;
      }
      .loader::after{
        border-color: #FF3D00;
        animation: prixClipFix 2s linear infinite , rotate 0.5s linear infinite reverse;
        inset: 6px;
      }

      @keyframes rotate {
        0%   {transform: rotate(0deg)}
        100%   {transform: rotate(360deg)}
      }

      @keyframes prixClipFix {
          0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
          25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
          50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
          75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
          100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
      }
      
`;

export default GlobalStyles;
