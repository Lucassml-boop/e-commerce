import { useState } from "react";
import { addProduct } from "../services/ProductService";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const handleAddProduct = async () => {
    await addProduct({ title, price, description, image: "" });
    alert("Produto adicionado!");
    setTitle("");
    setPrice(0);
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Adicionar Produto</h1>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        />
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border p-2 mb-4 w-full rounded"
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        />
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition-colors"
        >
          Adicionar Produto
        </button>
      </div>
    </div>
  );
}