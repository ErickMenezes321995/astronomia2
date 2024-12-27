import './admin.css'
import {auth} from '../../firebaseConnection'
import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from "react";
import axios from "axios";

const NASA_APOD = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const response = await axios.get("https://api.nasa.gov/planetary/apod", {
          params: {
            api_key: "vugKMKvHxRBfJggIzv8IAI63mpjZbTIz6k5twtbw", // chave
          },
        });
        setData(response.data);
      } catch (error) {
        setError("Erro ao carregar os dados da API.");
      } finally {
        setLoading(false);
      }
    };

    fetchAPOD();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  async function handleLogout(){
    await signOut(auth);
}

  return (
    <div className='foto1'>
       <button className='btn-logout' onClick={handleLogout}>sair</button>
      <h1>{data.title}</h1>
      {data.media_type === "image" ? (
        <img
          src={data.url}
          alt={data.title}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      ) : (
        <iframe
          src={data.url}
          title={data.title}
          width="100%"
          height="500px"
        ></iframe>
      )}
      <p>{data.explanation}</p>
      <p><strong>Data:</strong> {data.date}</p>
    </div>
  );
};

export default NASA_APOD;

