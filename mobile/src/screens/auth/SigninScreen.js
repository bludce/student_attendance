import React from 'react';

import { 
    KeyboardAvoidingView, 
    View, 
    Button, 
    Alert, 
    Text, 
    AsyncStorage, 
    StyleSheet, 
    TextInput
} from 'react-native';


export default class SigninScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            email: '', 
            password: '', 
            spinner: false, 
            error: false
        };

        this._signInHandler = this._signInHandler.bind(this);
    }

    _signInHandler = async () => {
        const {email, password} = this.state;

        var formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        this.setState({spinner: true});
        const user = {
            "Логин": email,
            "Пароль": password
          }
        const response = await fetch('http://192.168.1.74:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
        })

        let data = await response.json()

        if (data.insert.length === 0) {
            Alert.alert('Ошибка', 'Введите логин и пароль');
        }
        else {
            await AsyncStorage.setItem('userToken', `${data.insert[0].Код_пользователя}`);
            await AsyncStorage.setItem('userName', data.insert[0].Роль);
            this.props.navigation.navigate('App');
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={{flexGrow: 1}} behavior="padding" enabled>
                <View style={style.container}>
                    <TextInput 
                        keyboardType="email-address"
                        onChangeText={email => this.setState({email})}
                        style={style.input}
                        placeholder="Логин"
                        value={this.state.email}
                    />
                    <TextInput 
                        secureTextEntry={true}
                        onChangeText={password => this.setState({password})}
                        style={style.input}
                        placeholder="Пароль"
                        value={this.state.password}
                    />
                    {this.state.spinner &&
                        <Text style={style.spinnerTextStyle}>Processing ...</Text>
                    }
                    {!this.state.spinner &&
                        <Button
                            title="Войти"
                            onPress={this._signInHandler}
                        />
                    }
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }, 
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
      },
    spinnerTextStyle: {
        textAlign: 'center'
    },
});