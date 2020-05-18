import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, AsyncStorage } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

import io from "socket.io-client";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  socket = io('http://192.168.1.74:3000', { jsonp: false, agent: '-', pfx: '-', cert: '-', ca: '-', ciphers: '-', rejectUnauthorized: '-', perMessageDeflate: '-' });

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    alert(`Вы успешно отметились на занятии`);
    const ФИО = await AsyncStorage.getItem('userName');

    const obj = {
      roomId: `${data}`,
      userName: `${ФИО}`,
    };
    
    await fetch('http://192.168.1.74:3000/rooms' ,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      })

    socket.emit('ROOM:JOIN', obj)  
      
  };

  if (hasPermission === null) {
    return <Text>Запрос на доступ к камере</Text>;
  }
  if (hasPermission === false) {
    return <Text>Нет доступа к камере</Text>;
  }


  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title={'Отсканировть заново'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}