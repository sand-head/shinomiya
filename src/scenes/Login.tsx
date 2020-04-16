import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useFunimation } from '../funimation/context';
import { useColorScheme } from 'react-native-appearance';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 24,
    width: '80%',
    fontSize: 18,
    borderBottomColor: '#888',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  lightBackground: {
    backgroundColor: '#fff',
  },
  darkBackground: {
    backgroundColor: '#000',
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});

const LoginScene = () => {
  const colorScheme = useColorScheme();
  const client = useFunimation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>();

  const backgroundStyle = colorScheme === 'light' ? styles.lightBackground : styles.darkBackground;
  const textStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;

  const onSubmit = async () => {
    const response = await client.LoginAsync(email, password);
    if (response.success) {
      setUsername(response.user.displayName);
    } else {
      console.log('error', response.error);
    }
  };

  return (
    <View style={[styles.container, backgroundStyle]}>
      <TextInput autoCompleteType='username'
        autoCorrect={false}
        keyboardType='email-address'
        returnKeyType='next'
        placeholder='Email Address'
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
      />
      <TextInput autoCompleteType='password'
        autoCorrect={false}
        returnKeyType='done'
        secureTextEntry={true}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        style={styles.textInput}
      />
      <Button title='Login!' onPress={onSubmit} />
      {username && (
        <Text>Howdy {username}!</Text>
      )}
    </View>
  );
};

export default LoginScene;