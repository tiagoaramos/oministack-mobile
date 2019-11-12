import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../../services/api'
import logo from '../../assets/logo.png'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [permissionLevel, setPermissionLevel] = useState(1);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('accessToken').then(accessToken => {
      if (accessToken) {
        navigation.navigate('Navigation');
      }
    })
  }, []);

  async function handleSubmit() {
        const response = await api.post('/users', {
            firstName,
            lastName,
            email,
            password,
            permissionLevel
        }).then(async response => { 
            navigation.navigate('Login', {
              msg: 'Usuário criado com sucesso!',
            });
        }).catch(error => {
            setErrors(error.response.data.errors)
        })
  }

  function handleCancel() {
    navigation.navigate('SignIn');
  }

  return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
      <Image source={logo} />
      
      <View style={styles.form}>
        <Text style={styles.error}>{errors}</Text>
        <Text style={styles.label}>Nome *</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          placeholderTextColor="#999"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          value={firstName}
          onChangeText={setFirstName}
        />

      <Text style={styles.label}>Sobrenome *</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu Sobrenome"
          placeholderTextColor="#999"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          value={lastName}
          onChangeText={setLastName}
        />

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
          <TouchableOpacity onPress={handleCancel} style={styles.buttonCancell}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
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
  
  buttonCancell: {
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
      margin: 2,
  }
});