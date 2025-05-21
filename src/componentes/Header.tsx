import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { AiOutlineUser } from "react-icons/ai";

export default function Header() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">E-Commerce</h1>
        <div className="flex space-x-4 items-center">
          <Link
            to="/"
            className="bg-white text-blue-500 px-4 py-2 rounded shadow hover:bg-gray-100 transition-colors"
          >
            Home
          </Link>
          {user?.type === "vendedor" && (
            <Link
              to="/admin"
              className="bg-white text-blue-500 px-4 py-2 rounded shadow hover:bg-gray-100 transition-colors"
            >
              Cadastrar Produto
            </Link>
          )}
          {user ? (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition-colors"
            >
              Sair
            </button>
          ) : (
            <>
              {/* Botão com ícone de pessoa */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-white text-blue-500 px-4 py-2 rounded-full shadow hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <AiOutlineUser className="w-6 h-6" />
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Registrar
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}