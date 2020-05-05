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
  background: ${({ theme }) => theme.background.color};
  color: ${({ theme }) => theme.font.color.text};
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size};
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

.Toastify__toast--success {
  color: #fff !important;
  background-color: #4d99f5 !important;
  font-size: 14px !important;
  line-height: 1.4 !important;
}

.Toastify__progress-bar--success {
  background: #fff !important;
  height: 3px !important;
}
`
