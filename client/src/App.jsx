import UserRoutes from "./routes/UserRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return <BrowserRouter>
    <UserRoutes />
  </BrowserRouter>;
}

export default App
