import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../../services/api'
import logo from '../../assets/logo.png'



export default function Login({ navigation }) { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [msg, setMsg] = useState(navigation.getParam('msg', ''));
  

  useEffect(() => {
    AsyncStorage.getItem('accessToken').then(accessToken => {
      if (accessToken) {
        navigation.navigate('App');
      }
    })
  }, []);

  async function handleSubmit() {
      const response = await api.post('/auth', {
          email,
          password
      }).then(async response => { 
          const { accessToken, refreshToken } = response.data;
          await AsyncStorage.setItem('accessToken', accessToken);
          await AsyncStorage.setItem('refreshToken', refreshToken);
          navigation.navigate('App');
      }).catch(error => {
        console.log(error)
        setErrors(error.response.data.errors)
      })
  }
  async function handleRegister() {
      navigation.navigate('CreateAccount');
  }

  return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
      <Image source={logo} />
      
      <View style={styles.form}>
        <Text style={styles.msg}>{msg}</Text>
        <Text style={styles.error}>{errors}</Text>
        <Text style={styles.label}>SEU E-MAIL *</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>SENHA *</Text>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          autoCorrect={false}
          value={password}
          secureTextEntry={true} 
          onChangeText={setPassword}
        />

        <View style={styles.actionsButtons}>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRegister} style={styles.buttonRegister}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },

  actionsButtons: {
    flex: 1,
    flexDirection: 'row',
  },
  
  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    flex: 1, 
    flexGrow: 1,
  },
  
  buttonRegister: {
    height: 42,
    backgroundColor: '#5ac05b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    flex: 1, 
    flexGrow: 1,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  error: {
      color: '#F00',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      paddingHorizontal: 20,
  }
});