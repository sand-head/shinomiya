import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useFunimation } from '../funimation/context';
import { useColorScheme } from 'react-native-appearance';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useAuth } from '../auth/context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

interface LoginScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
}

const LoginScreen: React.FunctionComponent<LoginScreenProps> = ({navigation}) => {
  const colorScheme = useColorScheme();
  const client = useFunimation();
  const { signIn } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const backgroundStyle = colorScheme === 'light' ? styles.lightBackground : styles.darkBackground;
  const textStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;

  const onSubmit = async () => {
    const response = await client.LoginAsync(email, password);
    if (response.success) {
      await signIn(response.token);
    } else {
      console.log('error', response.error);
    }
  };

  return (
    <View style={[styles.container, backgroundStyle]}>
      <Text style={textStyle}>Shinomiya - the open source Funimation app</Text>
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
    </View>
  );
};

export default LoginScreen;