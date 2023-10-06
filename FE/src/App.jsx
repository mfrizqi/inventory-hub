import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import ThemeProvider from './material-kit/theme';
import Router from './config/routes';
import ScrollToTop from './material-kit/components/scroll-to-top';

const App = () => {
  return <ThemeProvider>
    <ScrollToTop />
    <Router />
  </ThemeProvider>
}

export default App
