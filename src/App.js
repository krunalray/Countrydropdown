import React from 'react';
import AppRoutes from './AppRoutes';
import { useRoutes } from 'react-router-dom';
import Header from './component/shared/header';
function App() {
  const routes = useRoutes(AppRoutes);
  return (
    <div className="App">      
      <React.StrictMode>
          <Header/>
          {routes}
      </React.StrictMode>
    </div>
  );
}

export default App;
