import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState<"usuario" | "vendedor">("usuario");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await register(name, email, password, type);
      navigate("/");
    } catch (err) {
      setError("Erro ao registrar. Tente novamente.");
    }
  };

  const isPasswordValid = password.length >= 6;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Cadastro</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        />
        <div className="relative mb-4">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <p className="text-sm text-gray-500 mt-1">
            A senha deve ter no mínimo 6 caracteres.
          </p>
        </div>
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "usuario" | "vendedor")}
          className="border p-2 mb-4 w-full rounded"
        >
          <option value="usuario">Usuário</option>
          <option value="vendedor">Vendedor</option>
        </select>
        <button
          onClick={handleRegister}
          disabled={!isPasswordValid}
          className={`py-2 px-4 rounded w-full transition-colors ${
            isPasswordValid
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
}