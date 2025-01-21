import React, { useState, useEffect } from "react";
import "./BeaconConect.css"; // Importando o arquivo CSS externo

function BluetoothRead() {
  const [device, setDevice] = useState(null); 
  const [readData, setReadData] = useState(""); 
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
      setReadData(data);
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
      <h1>Beacon Navigator</h1>
      <button
        onClick={connectToDevice}
        className={`button ${connected ? "button-disabled" : "button-connect"}`}
        disabled={connected}
      >
        {connected ? "Conectado" : "Conectar ao dispositivo"}
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
      <h3 className="read-data-title">Dados Lidos:</h3>
      <textarea
        value={readData}
        readOnly
        className="read-data"
      ></textarea>
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
