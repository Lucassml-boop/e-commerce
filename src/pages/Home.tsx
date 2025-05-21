import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!user) return;
    await deleteDoc(doc(db, "products", id));
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
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
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-blue-500 font-semibold mt-4">R$ {product.price}</p>
                {user?.uid === product.createdBy && (
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
                  >
                    Excluir
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}