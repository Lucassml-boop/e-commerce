import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Admin() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddProduct = async () => {
    if (!user) {
      alert("Você precisa estar logado para adicionar um produto.");
      return;
    }
  
    if (!title || !price || !description || !image) {
      alert("Por favor, preencha todos os campos e selecione uma imagem.");
      return;
    }
  
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      alert("Por favor, insira um valor válido para o preço.");
      return;
    }
  
    try {
      setIsUploading(true);
  
     
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "products"); 
  
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
  
      const imageUrl = response.data.secure_url;
  
      await addDoc(collection(db, "products"), {
        title,
        price: numericPrice,
        description,
        imagemUrl: imageUrl, 
        createdBy: user.uid,
      });
  
      alert("Produto adicionado com sucesso!");
      setTitle("");
      setPrice("");
      setDescription("");
      setImage(null);
    } catch (error: any) {
      console.error("Erro ao adicionar produto:", error.message);
      alert("Erro ao adicionar produto. Verifique as permissões.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Adicionar Produto</h1>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        />
        <input
          type="text"
          placeholder="Digite o valor do produto"
          value={price}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*\.?\d*$/.test(value)) {
              setPrice(value);
            }
          }}
          className="border p-2 mb-4 w-full rounded"
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          className="border p-2 mb-4 w-full rounded"
        />
        {isUploading ? (
          <button
            disabled
            className="bg-gray-300 text-gray-500 py-2 px-4 rounded w-full cursor-not-allowed"
          >
            Enviando...
          </button>
        ) : (
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition-colors"
          >
            Adicionar Produto
          </button>
        )}
      </div>
    </div>
  );
}