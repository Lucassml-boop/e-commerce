import { useUser } from "./context/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
  const { userType, setUserType } = useUser();

  return (
    <BrowserRouter>
      <div className="p-4 bg-gray-100">
        <label className="block mb-2 font-bold">Selecione o tipo de usuário:</label>
        <select
          value={userType || ""}
          onChange={(e) => setUserType(e.target.value as "cliente" | "vendedor" | null)}
          className="border p-2 rounded"
        >
          <option value="">Nenhum</option>
          <option value="cliente">Cliente</option>
          <option value="vendedor">Vendedor</option>
        </select>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;