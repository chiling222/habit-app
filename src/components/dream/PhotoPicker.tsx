import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Alert, Image, Pressable, StyleSheet, View } from 'react-native';
import { Icon } from '../../theme/icons';
import { saveDreamPhoto } from '../../utils/photoStorage';
import { AppText } from '../AppText';

type Props = {
  dreamId: string;
  photoUri?: string;
  locked?: boolean;
  onPicked: (uri: string) => void;
};

export function PhotoPicker({ dreamId, photoUri, locked, onPicked }: Props) {
  const pick = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('需要相簿權限', '請到「設定」允許存取照片,才能加照片喔');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    });
    if (result.canceled) return;
    const localUri = saveDreamPhoto(dreamId, result.assets[0].uri);
    onPicked(localUri);
  };

  if (locked) {
    return (
      <View style={styles.box}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.image} />
        ) : (
          <View style={styles.lockedPlaceholder}>
            <Icon name="mountain" size={26} color="rgba(255,255,255,.9)" />
          </View>
        )}
      </View>
    );
  }

  return (
    <Pressable onPress={pick} style={styles.box}>
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Icon name="camera" size={19} color="#7E9188" />
          <AppText style={styles.placeholderLabel}>加照片</AppText>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: { width: 72, height: 72, borderRadius: 12, overflow: 'hidden', flexShrink: 0 },
  image: { width: '100%', height: '100%' },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,.55)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,.95)',
    borderStyle: 'dashed',
    borderRadius: 12,
  },
  placeholderLabel: { fontSize: 11, color: '#6E8078', marginTop: 2 },
  lockedPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,.5)',
  },
});
