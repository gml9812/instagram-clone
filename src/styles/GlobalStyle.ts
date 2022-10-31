import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset}
    :focus {
        outline: none;
        border: none;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    html{
        font-size: 11px;
        -webkit-text-size-adjust: none;
        font-family: Roboto;       
        font-display: fallback;
        
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    button {
        background: none;
        padding: 0;
        border: none;
        cursor: pointer;
        &:disabled {
            cursor: default;
            fill: #f2f3f4;
        }
    }
    li {
        list-style: none
    }

    .pc-tablet-only {
        display: block;
        
    }
    .tablet-mobile-only{
        display: none;
        
    }
    .mobile-only {
        display: none;
        
    }
`;
