import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Home } from "./components/Home";
import './App.css'
function App() {
  const isAuthenticated = useIsAuthenticated();
  const {instance} = useMsal();
  const handleLogout = () => {
    instance.logout();
  }

  if (!isAuthenticated) {
    return <Home />;
  }

  return (
    <>
      <h1>Welcome to Protected Area</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default App
