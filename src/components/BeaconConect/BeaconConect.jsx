import React, { useState, useEffect } from "react";
import "./BeaconConect.css"; // Importando o arquivo CSS externo

function BluetoothRead() {
  const [device, setDevice] = useState(null); 
  const [readData, setReadData] = useState(""); // Dados brutos lidos
  const [parsedJson, setParsedJson] = useState(null); // Dados JSON parseados (se aplicável)
  const [error, setError] = useState(""); 
  const [connected, setConnected] = useState(false); 
  const [characteristicTx, setCharacteristicTx] = useState(null); 

  const SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca93";
  const CHARACTERISTIC_UUID_TX = "6e400003-b5a3-f393-e0a9-e50e24dcca93";

  const connectToDevice = async () => {
    setError(""); 
    try {
      const bleDevice = await navigator.bluetooth.requestDevice({
        filters: [{ namePrefix: "BeaconNavigator" }], 
        optionalServices: [SERVICE_UUID],
      });

      setDevice(bleDevice);

      bleDevice.addEventListener("gattserverdisconnected", handleDisconnection);

      const server = await bleDevice.gatt.connect();
      setConnected(true);

      const service = await server.getPrimaryService(SERVICE_UUID);
      const characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID_TX);
      setCharacteristicTx(characteristic); 
    } catch (err) {
      setError("Erro ao conectar ao dispositivo BLE. Verifique se o dispositivo está acessível.");
    }
  };

  const readCharacteristic = async () => {
    if (!characteristicTx) {
      setError("Característica não está disponível.");
      return;
    }

    try {
      const value = await characteristicTx.readValue();
      const decoder = new TextDecoder("utf-8");
      const data = decoder.decode(value);

      setReadData(data); // Sempre armazena os dados como texto bruto

      // Detectar se os dados são JSON
      try {
        const jsonData = JSON.parse(data); // Se for JSON válido
        setParsedJson(jsonData);
      } catch {
        setParsedJson(null); // Não é JSON, mantém os dados brutos
      }
    } catch (err) {
      setError("Erro ao ler a característica.");
    }
  };

  const handleDisconnection = () => {
    setConnected(false);
    setCharacteristicTx(null); 
  };

  const disconnectDevice = () => {
    if (device && device.gatt.connected) {
      device.gatt.disconnect();
      setConnected(false);
      setCharacteristicTx(null); 
    }
  };

  useEffect(() => {
    return () => {
      if (device && device.gatt.connected) {
        device.gatt.disconnect();
      }
    };
  }, [device]);

  return (
    <div className="container">
      <h1 className="title">Olá, Como posso te ajudar? <span className="highlight">Veja os seus Beacons!</span> </h1>
      <button
        onClick={connectToDevice}
        className={`button ${connected ? "button-disabled" : "button-connect"}`}
        disabled={connected}
      >
        {connected ? "Conectado" : "+  Novo Beacon"}
      </button>
      <button
        onClick={readCharacteristic}
        className="button button-read"
        disabled={!connected || !characteristicTx}
      >
        Ler Dados
      </button>
      <button
        onClick={disconnectDevice}
        className="button button-disconnect"
        disabled={!connected}
      >
        Desconectar
      </button>
      {error && <p className="error-message">{error}</p>}
      <h3 className="read-data-title">Informações:</h3>
      {parsedJson ? (
        <table className="read-data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Role</th>
              <th>PCD</th>
              <th>Detalhes PCD</th>
            </tr>
          </thead>
          <tbody>
            {parsedJson.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.nome}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>{item.isPCD ? "Sim" : "Não"}</td>
                <td>{item.pcdDetails}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <textarea
          value={readData || "Nenhum dado disponível"}
          readOnly
          className="read-data"
        ></textarea>
      )}
      <span className="beacon-conect">
        <a href="/login"> Login</a>
      </span> 
    </div>
  );
}

export default function App() {
  return (
    <div>
      <BluetoothRead />
    </div>
  );
}
