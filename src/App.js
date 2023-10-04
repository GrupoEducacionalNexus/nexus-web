import React from 'react';
import './styles/App.css';
import Routes from './routes';
import { UserProvider } from './UserContext';

function App() {
    return (
        <UserProvider>
            <Routes />
        </UserProvider>
    )
}
export default App;
