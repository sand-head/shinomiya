import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useFunimation } from '../funimation/context';

const LoginScene = () => {
  const client = useFunimation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>();

  const onSubmit = async () => {
    const response = await client.LoginAsync(email, password);
    setUsername(response?.user.displayName);
  };

  return (
    <View>
      <TextInput autoCompleteType='username'
        autoCorrect={false}
        keyboardType='email-address'
        returnKeyType='next'
        value={email}
        onChangeText={setEmail}
      />
      <TextInput autoCompleteType='password'
        autoCorrect={false}
        returnKeyType='done'
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button title='Login!' onPress={onSubmit} />
      {username && (
        <Text>Howdy {username}!</Text>
      )}
    </View>
  );
};

export default LoginScene;