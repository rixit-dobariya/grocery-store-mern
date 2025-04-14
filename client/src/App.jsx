import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import { BrowserRouter } from "react-router-dom";
import './App.css';

function App() {
  return <BrowserRouter>
    <AdminRoutes />
    <UserRoutes />
  </BrowserRouter>;
}

export default App
