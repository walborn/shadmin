import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
*,
*:before,
*:after {
  box-sizing: border-box;
}

html, body, #root {
  min-height: 100%;
  min-height: 100vh;
}

html {
  font-size: 100%;
}

body {
  margin: 0;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.background.index};
  color: ${props => props.theme.font.color.index};
  font-family: ${props => props.theme.font.family};
  font-size: ${props => props.theme.font.size};
}

#__next {
  width: 100%;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
  min-height: 100vh;
  > main {
    flex: 1 1 auto;
    padding: 20px 0 50px 0;
    > * {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
  @media only screen and (max-width: 780px) {
    > main {
      padding-top: 20px;
    }
  }
}


.Toastify__toast {
  padding: 16px !important;
  border-radius: 3px !important;
}

@media only screen and (max-width: 480px) {
  .Toastify__toast-container {
      padding: 20px !important;
  }
}

.Toastify__toast--success {
  color: ${props => props.theme.button.color.index} !important;
  background-color: ${props => props.theme.button.background.index} !important;
  font-size: 14px !important;
  line-height: 1.4 !important;
}

.Toastify__progress-bar--success {
  background: ${props => props.theme.button.color.index} !important;
  height: 3px !important;
}

.Toastify__toast--error {
  color: ${props => props.theme.font.color.index} !important;
  background-color: ${props => props.theme.error.background.index} !important;
  font-size: 14px !important;
  line-height: 1.4 !important;
}

.Toastify__progress-bar--error {
  background: ${props => props.theme.font.color.index} !important;
  height: 3px !important;
}
`
