import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import configureStore from './store/configureStore'

import SkillLinker from './containers/SkillLinker'



const store = configureStore()

render(
  <Provider store={store}>
    <SkillLinker/>
  </Provider>,
  document.getElementById('root')
)
