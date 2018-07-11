import React from 'react';
import ReactDOM from 'react-dom';
import { Router} from 'react-router'
import history from './history'
import rootRoute from './router'
import device from 'react-ui/device'
import 'react-ui/fast-clicks'


require('react-ui/resources/less/intro.less');
require('react-ui/resources/less/views.less');
require('react-ui/resources/less/pages.less');
require('react-ui/resources/less/statusbar.less');
require('react-ui/resources/less/toolbars.less');
require('react-ui/resources/less/toolbars-pages.less');
require('react-ui/resources/less/tabs.less');
require('react-ui/resources/less/badges.less');


// require('react-ui/resources/less/react-ui.ios.less')
require('react-ui/resources/less/react-ui.ios.colors.less')

require('./resources/less/app.less')
window.device = device;
ReactDOM.render( 
  <Router history={ history } routes={ rootRoute } />,
  document.getElementById('app')
)
