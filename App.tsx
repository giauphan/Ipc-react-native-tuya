import React from 'react';
import { AuthProvider } from './App/Pages/Auth/Authentication';
import AppNavigator from './App/layout/AppNavigator';

const App = () => {
 return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
 );
};

export default App;
