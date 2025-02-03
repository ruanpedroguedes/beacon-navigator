import React, { useState, useRef } from "react";

export default function BeaconConect() {
  const [device, setDevice] = useState(null);
  const [dataList, setDataList] = useState([]);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [logMessages, setLogMessages] = useState([]);
  const receivedMessages = useRef(new Set());

  const jsonBufferRef = useRef("");
  let characteristicRef = useRef(null);

  const addLogMessage = (message) => {
    setLogMessages((prevLogs) => [...prevLogs, message]);
  };

  const isValidJSON = (string) => {
    try {
      JSON.parse(string);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleChunk = (chunk) => {
    try {
      chunk = chunk.replace(/[^\x20-\x7E]/g, "");
      jsonBufferRef.current += chunk;
      addLogMessage(`Chunk recebido: ${chunk}`);

      if (jsonBufferRef.current.includes("}")) {
        let possibleJSON = jsonBufferRef.current;
        if (isValidJSON(possibleJSON)) {
          const parsedData = JSON.parse(possibleJSON);

          if (parsedData._id && receivedMessages.current.has(parsedData._id)) {
            addLogMessage("Mensagem repetida detectada, ignorando...");
            return;
          }

          if (parsedData._id) {
            receivedMessages.current.add(parsedData._id);
          }

          setDataList((prevList) => [...prevList, parsedData]);
          jsonBufferRef.current = "";
        }
      }
    } catch (e) {
      setError("Erro ao processar chunk recebido.");
      addLogMessage(`Erro ao processar chunk: ${chunk} - ${e.message}`);
    }
  };

  const connectToDevice = async () => {
    try {
      addLogMessage("Solicitando dispositivo BLE...");
      const bleDevice = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["6e400001-b5a3-f393-e0a9-e50e24dcca93"],
      });

      addLogMessage(`Dispositivo selecionado: ${bleDevice.name}`);
      setDevice(bleDevice);

      bleDevice.addEventListener("gattserverdisconnected", async () => {
        addLogMessage("Dispositivo desconectado, tentando reconectar...");
        setIsConnected(false);
        await reconnectDevice(bleDevice);
      });

      await establishConnection(bleDevice);
    } catch (e) {
      setError("Erro ao conectar ao dispositivo.");
      addLogMessage(`Erro ao conectar: ${e.message}`);
    }
  };

  const establishConnection = async (bleDevice) => {
    try {
      if (!bleDevice.gatt.connected) {
        addLogMessage("Tentando conectar ao GATT Server...");
        await bleDevice.gatt.connect();
      }

      // Verificação adicional do estado de conexão
      if (!bleDevice.gatt.connected) {
        throw new Error("O GATT Server ainda está desconectado após tentativa de conexão.");
      }

      addLogMessage("GATT Server conectado.");
      setIsConnected(true);

      addLogMessage("Obtendo serviço...");
      const service = await bleDevice.gatt.getPrimaryService("6e400001-b5a3-f393-e0a9-e50e24dcca93");

      addLogMessage("Obtendo característica...");
      const characteristic = await service.getCharacteristic("6e400003-b5a3-f393-e0a9-e50e24dcca93");
      characteristicRef.current = characteristic;

      addLogMessage("Iniciando leitura...");
      characteristic.addEventListener("characteristicvaluechanged", (event) => {
        const value = new TextDecoder().decode(event.target.value);
        handleChunk(value);
      });

      await characteristic.startNotifications();
      addLogMessage("Notificações iniciadas.");
    } catch (e) {
      setError("Erro ao recuperar serviços BLE.");
      addLogMessage(`Erro ao recuperar serviços BLE: ${e.message}`);

      if (bleDevice.gatt.connected) {
        addLogMessage("Desconectando e tentando novamente...");
        bleDevice.gatt.disconnect();
      }

      await reconnectDevice(bleDevice);
    }
  };

  const reconnectDevice = async (bleDevice) => {
    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts && !bleDevice.gatt.connected) {
      try {
        addLogMessage(`Tentando reconectar... (Tentativa ${attempts + 1})`);
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Aumentando o tempo de espera para 5 segundos
        await establishConnection(bleDevice);
        if (bleDevice.gatt.connected) {
          addLogMessage("Reconectado com sucesso!");
          break;
        }
      } catch (e) {
        addLogMessage(`Falha na tentativa ${attempts + 1}: ${e.message}`);
      }
      attempts++;
    }

    if (attempts === maxAttempts) {
      addLogMessage("Falha ao reconectar após várias tentativas. Reconecte manualmente.");
    }
  };

  const disconnectDevice = () => {
    if (device && device.gatt.connected) {
      device.gatt.disconnect();
      addLogMessage("Dispositivo desconectado manualmente.");
    }
    setDevice(null);
    setIsConnected(false);
  };

  return (
    <div>
      <h2 style={{textAlign: "left"}}>Olá,</h2>
      <h1 style={{ fontSize: '24px' }}>
         Como posso te ajudar?{' '}
        <span style={{ color: 'red', fontWeight: '300' }}>Veja os seus Beacons!</span>
      </h1>

      {isConnected ? (
        <div>
          <p>Dispositivo conectado: {device.name}</p>
          <button onClick={disconnectDevice}>Desconectar Beacon</button>
        </div>
      ) : (
        <button onClick={connectToDevice}>+ Novo Beacon</button>
      )}

      <h2>Informes:</h2>
      <div style={{ background: "#f8f8f8", padding: "10px", borderRadius: "5px", maxHeight: "200px", overflowY: "auto" }}>
        {logMessages.map((msg, index) => (
          <p key={index} style={{ margin: "5px 0", fontSize: "15px", fontFamily: "Poppins", color: "black" }}>{msg}</p>
        ))}
      </div>
    </div>
  );
}
