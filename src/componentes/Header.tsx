import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { userType } = useUser();
  const { getTotalItems } = useCart();

  return (
    <header className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">E-Commerce</h1>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="bg-white text-blue-500 px-4 py-2 rounded shadow hover:bg-gray-100 transition-colors"
          >
            Home
          </Link>

          {userType === "cliente" && (
            <Link
              to="/carrinho"
              className="bg-white text-blue-500 px-4 py-2 rounded shadow hover:bg-gray-100 transition-colors"
            >
              Carrinho ({getTotalItems()})
            </Link>
          )}

          {userType === "vendedor" && (
            <Link
              to="/admin"
              className="bg-white text-blue-500 px-4 py-2 rounded shadow hover:bg-gray-100 transition-colors"
            >
              Adicionar Produto
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}