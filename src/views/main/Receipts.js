import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, SafeAreaView, FlatList, KeyboardAvoidingView, Platform, Text, StyleSheet } from 'react-native';

import api from '../../services/api'
import logo from '../../assets/logo.png'

function Item({ id, date, value, description, balance }) {
    return (
      <View style={styles.item} key={id}>
        <Text style={styles.title}>{date}</Text>
        <Text style={styles.title}>{description}</Text>
        <Text style={styles.title}>{value}</Text>
        <Text style={styles.title}>{balance}</Text>
      </View>
    );
  }
  


export default function Receipts({ navigation }) {

  const [receipts, setReceipts] = useState([]);
  const [errors, setErrors] = useState('');
  const [msg, setMsg] = useState(navigation.getParam('msg', ''));
  
  useEffect(() => {
    AsyncStorage.getItem('accessToken').then(accessToken => {
        async function loadReceipts() {
            console.log(`Bearer ${accessToken}` )
            const response = await api.get('/receipts', {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
            setReceipts(response.data);
        }
        loadReceipts();
    })
  }, []);

  componentDidMount = async () => {
      await api.post('/receipts', { }).then(async response => { 
          console.log(response)
          setReceipts(response)
      }).catch(error => {
          setErrors(error.response.data.errors)
      })
  }
  

  return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
      <SafeAreaView style={styles.form}>
        <FlatList
            data={receipts}
            renderItem={({ item }) => <Item {...item} />}
            keyExtractor={item => item.id}
        />
      </SafeAreaView>
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