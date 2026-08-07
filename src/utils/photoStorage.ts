import { Directory, File, Paths } from 'expo-file-system';
import { Platform } from 'react-native';

export function saveDreamPhoto(dreamId: string, sourceUri: string): string {
  if (Platform.OS === 'web') {
    // expo-file-system's Directory/File classes are not supported on web;
    // the picked image URI already works directly as an <Image> source there.
    return sourceUri;
  }
  const photosDir = new Directory(Paths.document, 'dream-photos');
  photosDir.create({ intermediates: true, idempotent: true });
  const sourceFile = new File(sourceUri);
  const destFile = new File(photosDir, `${dreamId}-${Date.now()}.jpg`);
  sourceFile.copy(destFile);
  return destFile.uri;
}
