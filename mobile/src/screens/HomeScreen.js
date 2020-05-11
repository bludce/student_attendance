import React from 'react';
import {StyleSheet, View, Text, AsyncStorage, Image} from 'react-native';

export default class HomeScreen extends React.Component {

    constructor() {
      super();
      this.state = {
          Группа: '',
          ФИО: ''
      };
        
    }

    async componentDidMount() {
      const code = await AsyncStorage.getItem('userToken');
      const response = await fetch(`http://192.168.1.74:3000/api/profile/student/${code}`,)

      let res = await response.json()
      const { data = [] } = res
      const {Группа, ФИО} = data[0]

      this.setState({Группа, ФИО})
        
    }

    
    render() {
        return (
            <View style={styles.container}>
              <Image
                style={{ width: 250, height: 250 }}
                resizeMode="contain"
                source={require('../../assets/avatar.png')}
              />
              <Text>{this.state.ФИО}</Text>
              <Text>{this.state.Группа}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    img: {
      width: 10
    }
});