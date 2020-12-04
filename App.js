/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Switch, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo'
import socketIOClient from 'socket.io-client';

const App: () => React$Node = () => {
  const socket = socketIOClient("http://138.68.230.49/")

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [isSwitchOn1, setIsSwitchOn1] = React.useState(false);
  const [isSwitchOn2, setIsSwitchOn2] = React.useState(false);
  const [isSwitchOn3, setIsSwitchOn3] = React.useState(false);

  const onToggleSwitch = () => {
    socket.emit("turnled", {turn: !isSwitchOn, led: 1})
    setIsSwitchOn(!isSwitchOn)
  };
  
  const onToggleSwitch1 = () => {
    socket.emit("turnled", {turn: !isSwitchOn1, led: 2})
    setIsSwitchOn1(!isSwitchOn1);
  }
  
  const onToggleSwitch2 = () => {
    socket.emit("turnled", {turn: !isSwitchOn2, led: 3})
    setIsSwitchOn2(!isSwitchOn2);
  }
  
  const onToggleSwitch3 = () => {
    socket.emit("turnled", {turn: !isSwitchOn3, led: 4})
    setIsSwitchOn3(!isSwitchOn3);
  }

  useEffect(() => {
    console.log("Use effect")
    socket.on("connect", data => {
      console.log("connect")
    });
  }, [])

  return (
    <View style={style.container}>
      <View style={style.title}>
        <View style={style.icon}>
          <Icon name="home" size={26} color="tomato"/>
        </View>
        <Text style={{fontSize: 16, fontFamily: 'Montserrat-Black'}}>Homecontrol</Text>
      </View>
      
      <View style={style.box}>
        <View style={style.row}>
          <Text>Habitación 1</Text>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
      </View>
      
      <View style={style.box}>
        <View style={style.row}>
          <Text>Habitación 2</Text>
          <Switch value={isSwitchOn1} onValueChange={onToggleSwitch1} />
        </View>
      </View>

      <View style={style.box}>
        <View style={style.row}>
          <Text>Habitación 3</Text>
          <Switch value={isSwitchOn2} onValueChange={onToggleSwitch2} />
        </View>
      </View>

      <View style={style.box}>
        <View style={style.row}>
          <Text>Habitación 4</Text>
          <Switch value={isSwitchOn3} onValueChange={onToggleSwitch3} />
        </View>
      </View>

      <View style={style.box}>
        <Text>Temperatura</Text>
        <View style={[style.row, style.temp]}>
          <Icon name="thermometer" size={26} color="#777"/>
          <Text>30° C</Text>
        </View>
        <Text>Humedad</Text>
        <View style={[style.row, style.temp]}>
          <Icon name="water" size={26} color="#777"/>
          <Text>36%</Text>
        </View>
      </View>
    </View>  
  );
};

const style = StyleSheet.create({
  container: {
    flex:1,
    padding: 15,
  },
  title:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temp: {
    justifyContent: 'center',
  },
  box: {
    backgroundColor: 'white',
    elevation: 1,
    padding: 15,
    marginTop: 20,
  },
  icon: {
    backgroundColor: 'white',
    elevation: 1,
    padding: 5,
    borderRadius: 100,
    marginRight: 10,
  }
})

export default App;
