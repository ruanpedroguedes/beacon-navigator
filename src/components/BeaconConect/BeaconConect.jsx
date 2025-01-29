import React, { useState, useEffect } from "react";

export default function BeaconConect() {
  const [device, setDevice] = useState(null);
  const [jsonString, setJsonString] = useState(""); // Armazena os chunks recebidos
  const [data, setData] = useState(null); // Armazena os dados processados
  const [error, setError] = useState(null); // Armazena mensagens de erro

  // Função para validar JSON
  const isValidJSON = (string) => {
    try {
      JSON.parse(string);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Função para processar os chunks recebidos
  const handleChunk = (chunk) => {
    try {
      // Remover caracteres não imprimíveis
      chunk = chunk.replace(/[^\x20-\x7E]/g, "");

      // Adicionar o chunk ao buffer
      const updatedJsonString = jsonString + chunk;

      // Tentar parsear o JSON
      if (isValidJSON(updatedJsonString)) {
        const parsedData = JSON.parse(updatedJsonString);
        setData(parsedData);
        setJsonString(""); // Limpar buffer após parsear
      } else {
        setJsonString(updatedJsonString); // Continuar aguardando mais dados
      }
    } catch (e) {
      setError("Erro ao processar o chunk recebido.");
      console.error("Erro ao processar chunk:", chunk, e);
    }
  };

  // Função de conexão BLE
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

      console.log("Obtendo serviço...");
      const service = await server.getPrimaryService("6e400001-b5a3-f393-e0a9-e50e24dcca93");

      console.log("Obtendo característica...");
      const characteristic = await service.getCharacteristic("6e400003-b5a3-f393-e0a9-e50e24dcca93");

      console.log("Iniciando leitura...");
      characteristic.addEventListener("characteristicvaluechanged", (event) => {
        const value = new TextDecoder().decode(event.target.value);
        console.log("Chunk recebido:", value);
        handleChunk(value);
      });

      await characteristic.startNotifications();
      console.log("Notificações iniciadas.");
    } catch (e) {
      setError("Erro ao conectar ao dispositivo.");
      console.error("Erro ao conectar:", e);
    }
  };

  useEffect(() => {
    if (device) {
      // Lidando com desconexão
      device.addEventListener("gattserverdisconnected", () => {
        console.log("Dispositivo desconectado.");
        setDevice(null);
      });
    }
  }, [device]);

  return (
    <div>
      <h1>Conectar ao Beacon</h1>
      {device ? (
        <p>Dispositivo conectado: {device.name}</p>
      ) : (
        <button onClick={connectToDevice}>Conectar</button>
      )}
      {data && (
        <div>
          <h2>Dados Recebidos:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
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
