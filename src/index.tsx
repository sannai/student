import React from 'react'
import ReactDOM from 'react-dom'
import { MobXProviderContext } from 'mobx-react'
import { Global, css } from '@emotion/core'

import App from './view/App'
import * as serviceWorker from './serviceWorker'
import { store } from './store'

// 添加公式相关的样式
import 'katex/dist/katex.min.css'
import { addStyles as addMathquillStyles } from 'react-mathquill'
addMathquillStyles()

const GlobalStyle = css`
    html,
    body,
    #root {
        height: 100%;
    }
    body,
    ul {
        margin: 0;
    }
    ul {
        padding: 0;
    }
    a {
        text-decoration: none;
    }
    li {
        list-style-type: none;
    }
`

ReactDOM.render(
    <>
        <MobXProviderContext.Provider value={store}>
            <App />
        </MobXProviderContext.Provider>
        <Global styles={GlobalStyle} />
    </>,
    document.getElementById('root')
)
serviceWorker.register()
