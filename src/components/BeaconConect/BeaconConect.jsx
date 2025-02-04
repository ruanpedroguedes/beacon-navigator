import React, { useState, useRef } from "react";

export default function BeaconConect() {
  const [device, setDevice] = useState(null);
  const [dataList, setDataList] = useState([]);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [logMessages, setLogMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
      chunk = chunk.replace(/[^\x20-\x7E]/g, "");  // Remove caracteres não ASCII
      jsonBufferRef.current += chunk;
      addLogMessage(`Chunk recebido: ${chunk}`);
  
      // Verifica se o buffer contém um array JSON completo
      if (jsonBufferRef.current.startsWith("[") && jsonBufferRef.current.endsWith("}]")) {
        const possibleJSON = jsonBufferRef.current;
  
        if (isValidJSON(possibleJSON)) {
          const parsedDataArray = JSON.parse(possibleJSON);  // Converte o array completo
          
          parsedDataArray.forEach((parsedData) => {
            if (parsedData._id && receivedMessages.current.has(parsedData._id)) {
              addLogMessage("Mensagem repetida detectada, desconectando...");
              disconnectDevice();
              return;
            }
  
            if (parsedData._id) {
              receivedMessages.current.add(parsedData._id);
            }
  
            setDataList((prevList) => [
              ...prevList,
              {
                nome: parsedData.nome || "Desconhecido",
                dia: parsedData.dia || "N/A",
                descricao: parsedData.descricao || "Sem descrição",
              },
            ]);
          });
  
          // Limpa o buffer após processar o JSON completo
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

      bleDevice.addEventListener("gattserverdisconnected", () => {
        addLogMessage("Dispositivo desconectado.");
        setIsConnected(false);
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
    }
  };

  const disconnectDevice = () => {
    if (device && device.gatt.connected) {
      device.gatt.disconnect();
      addLogMessage("Dispositivo desconectado manualmente.");
    }
    jsonBufferRef.current = ""; // Limpa o buffer ao desconectar
    setDevice(null);
    setIsConnected(false);
  };

  const clearLogs = () => {
    setLogMessages([]);
  };

  const filteredData = dataList.filter((item) =>
    item.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ fontSize: '20px', textAlign: 'left' }}>Olá,</h2>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>
        Como posso te ajudar?{' '}
        <span style={{ color: 'red', fontWeight: '300' }}>Veja os seus Beacons!</span>
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        {isConnected ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'green', fontWeight: 'bold' }}>Dispositivo conectado: {device.name}</span>
            <button onClick={disconnectDevice} style={{ backgroundColor: 'red', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}>Desconectar Beacon</button>
          </div>
        ) : (
          <button onClick={connectToDevice} style={{ backgroundColor: 'blue', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}>+ Novo Beacon</button>
        )}
      </div>

      <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '10px' }}>Dados Recebidos:</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {filteredData.map((data, index) => (
          <div key={index} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', padding: '15px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{data.nome}</h3>
            <p><strong>Dia:</strong> {data.dia}</p>
            <p><strong>Descrição:</strong> {data.descricao}</p>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '22px', fontWeight: '600', marginTop: '30px' }}>Informes:</h2>
      <div style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '10px', maxHeight: '200px', overflowY: 'auto' }}>
        {logMessages.map((msg, index) => (
          <p key={index} style={{ fontSize: '14px', fontFamily: 'monospace', color: 'black', marginBottom: '5px' }}>{msg}</p>
        ))}
      </div>
      <button onClick={clearLogs} style={{ marginTop: '20px', backgroundColor: 'red', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}>Limpar Logs</button>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
    </div>
  );
}
