import './admin.css'
import { auth } from "../../firebaseConnection";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import axios from "axios";

const NASA_APOD = () => {
  const [nasaData, setNasaData] = useState(null);
  const [nasaLoading, setNasaLoading] = useState(true);
  const [nasaError, setNasaError] = useState(null);

  const [news, setNews] = useState(null); // Armazena um único artigo
  const [newsLoading, setNewsLoading] = useState(true); // Carregamento das notícias
  const [newsError, setNewsError] = useState(null); // Erros nas notícias

  useEffect(() => {
    // Função para buscar dados da NASA
    const fetchAPOD = async () => {
      try {
        const response = await axios.get("https://api.nasa.gov/planetary/apod", {
          params: {
            api_key: "vugKMKvHxRBfJggIzv8IAI63mpjZbTIz6k5twtbw",
          },
        });
        setNasaData(response.data);
      } catch (err) {
        setNasaError("Erro ao carregar os dados da API da NASA.");
      } finally {
        setNasaLoading(false);
      }
    };

    // Função para buscar notícias espaciais
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://api.spaceflightnewsapi.net/v4/articles/1/",
          {
            headers: {
              accept: "application/json",
            },
          }
        );
        setNews(response.data); // Atualiza com o único artigo retornado
      } catch (err) {
        setNewsError("Erro ao carregar as notícias.");
      } finally {
        setNewsLoading(false);
      }
    };

    // Chama ambas as funções
    fetchAPOD();
    fetchNews();
  }, []);

  if (nasaLoading || newsLoading) return <p>Carregando...</p>;
  if (nasaError) return <p>{nasaError}</p>;
  if (newsError) return <p>{newsError}</p>;

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="APInasa">
      <div className="top">
        <div className="logoadmin">
          <p>logo</p>
        </div>
        <div className="redes">
          <button className="btn-sair" onClick={handleLogout}>
            sair
          </button>
        </div>
      </div>

      {/* Dados da NASA */}
      <div className="nasa">
        <h1>{nasaData.title}</h1>
        {nasaData.media_type === "image" ? (
          <img
            src={nasaData.url}
            alt={nasaData.title}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        ) : (
          <iframe
            src={nasaData.url}
            title={nasaData.title}
            width="100%"
            height="500px"
          ></iframe>
        )}
        <p>{nasaData.explanation}</p>
        <p>
          <strong>Data:</strong> {nasaData.date}
        </p>
      </div>

      {/* Notícia Espacial */}
      <div className="noticias">
        <h1>Notícia Espacial</h1>
        {news && (
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              marginBottom: "20px",
              padding: "15px",
            }}
          >
            <h2>{news.title}</h2>
            {news.image_url && (
              <img
                src={news.image_url}
                alt={news.title}
                style={{ maxWidth: "100%", borderRadius: "10px" }}
              />
            )}
            <p>
              <strong>Publicado em:</strong>{" "}
              {new Date(news.published_at).toLocaleDateString("pt-BR")}
            </p>
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "#0056d6",
                fontWeight: "bold",
              }}
            >
              Ler artigo completo
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NASA_APOD;
