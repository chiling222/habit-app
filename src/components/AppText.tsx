import React from 'react';
import { Text, TextInput, TextInputProps, TextProps } from 'react-native';

export function AppText({ style, ...rest }: TextProps) {
  return <Text style={[{ fontFamily: 'Huninn_400Regular' }, style]} {...rest} />;
}

export function AppTextInput({ style, ...rest }: TextInputProps) {
  return <TextInput style={[{ fontFamily: 'Huninn_400Regular' }, style]} {...rest} />;
}
