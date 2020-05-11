import React from 'react';
import {Alert, StyleSheet, View, Text, AsyncStorage, ScrollView} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class HomeScreen extends React.Component {

    constructor() {
      super();
      this.state = {
      };
        
    }

    async componentDidMount() {
      const code = await AsyncStorage.getItem('userToken');
      const response = await fetch(`http://192.168.1.74:3000/api/skip/${+code}`,)

      let res = await response.json()
      const { data = [] } = res

      this.setState({data})
        
    }

    
    
    render() {
      const { data = [] } = this.state
      const head = ['Дата проведения',  'Предмет', 'Уважительно']
      const widthArr = [150, 200, 100];
      let count = 0;
      let valid = 0
        return (
          <View style={styles.container}>
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                <Row data={head} widthArr={widthArr} style={styles.header} textStyle={styles.text}/>
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                  {
                    data.map(({Дата_проведения, Время_проведение, Предмет, Уважительно}) => {
                      count++
                      Уважительно === 1 ? valid ++ : valid
                      return <Row
                        key={`${Дата_проведения.slice(0,10)} ${Время_проведение}`}
                        data={[`${Дата_проведения.slice(0,10)} ${Время_проведение}`,  Предмет, Уважительно === 1 ? '+' : '']}
                        widthArr={widthArr}
                        textStyle={styles.text}
                        style={styles.row}
                    />                 
                  })
                  }
                </Table>
                <Text>Итого: {count}</Text>
                <Text>Уважительно: {valid}</Text>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: 'rgba(114, 122, 252, 0.3)' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
});