import React, { useState, useEffect } from "react";

export default function BeaconConect() {
  const [device, setDevice] = useState(null); // Dispositivo BLE conectado
  const [informes, setInformes] = useState([]); // Dados filtrados da API
  const [error, setError] = useState(null); // Mensagens de erro

  // Função para buscar dados da API e processar apenas os informes
  const fetchInformes = async () => {
    try {
      const response = await fetch("http://192.168.137.1:5000/api/informes");
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }
      const apiData = await response.json();

      // Filtra ou processa os dados caso necessário (opcional)
      setInformes(apiData); // Armazena os dados recebidos diretamente
      console.log("Informes recebidos:", apiData); // Exibe apenas os informes no console
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      setError("Erro ao buscar dados da API.");
    }
  };

  // Conexão BLE (pode ser ajustada para uso com informes, se necessário)
  const connectToDevice = async () => {
    try {
      console.log("Solicitando dispositivo BLE...");
      const bleDevice = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["6e400001-b5a3-f393-e0a9-e50e24dcca93"], // Substitua pelo UUID correto
      });

      console.log("Dispositivo selecionado:", bleDevice.name);
      setDevice(bleDevice);

      console.log("Conectando ao GATT Server...");
      const server = await bleDevice.gatt.connect();
      console.log("GATT Server conectado.");
    } catch (e) {
      setError("Erro ao conectar ao dispositivo BLE.");
      console.error("Erro ao conectar:", e);
    }
  };

  // Listener para desconexão BLE (caso necessário)
  useEffect(() => {
    if (device) {
      device.addEventListener("gattserverdisconnected", () => {
        console.log("Dispositivo BLE desconectado.");
        setDevice(null);
      });
    }
  }, [device]);

  return (
    <div>
      <h1>Informes</h1>
      <button
        onClick={async () => {
          await fetchInformes(); // Busca os dados mais recentes da API
        }}
      >
        Buscar Informes
      </button>

      <button onClick={connectToDevice}>Conectar ao BLE</button>

      {informes.length > 0 && (
        <div>
          <h2>Dados dos Informes:</h2>
          <ul>
            {informes.map((informe) => (
              <li key={informe._id}>
                <strong>{informe.nome}</strong> - {informe.dia}: {informe.descricao}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <div>
          <h2>Erro:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
