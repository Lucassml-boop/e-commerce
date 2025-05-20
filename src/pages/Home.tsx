import { useEffect, useState } from "react";
import { getAllProducts } from "../services/ProductService";
import type { Product } from "../types/Product";
import Header from "../componentes/Header";
import { useCart } from "../context/CartContext";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <Header />

      {/* Product Grid */}
      <main className="flex-grow container mx-auto p-6">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
          Produtos Disponíveis
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-blue-500 font-semibold mt-4">
                  R$ {product.price.toFixed(2)}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  🛒 Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}