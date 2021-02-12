import React, {useState, useRef} from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';
import {CropView} from 'react-native-image-crop-tools';
import {launchImageLibrary} from 'react-native-image-picker';

const App = () => {
  const [uri, setUri] = useState();
  const [result, setResult] = useState(null);
  const cropViewRef = useRef();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Button
          title={'Clear Image'}
          onPress={() => {
            setUri(null);
            setResult(null);
          }}
        />
        <Button
          title={'Pick Image'}
          onPress={() => {
            launchImageLibrary({noData: true}, (response) => {
              setUri(response.uri);
            });
          }}
        />
        {uri && (
          <CropView
            sourceUrl={uri}
            style={styles.cropView}
            ref={cropViewRef}
            onImageCrop={(res) => setResult(res)}
            keepAspectRatio
            aspectRatio={{width: 16, height: 9}}
            initialImageCropFrame={{x: 100, y: 100, width: 160, height: 90}}
            angle={90}
          />
        )}
        <Button
          title={'Get Cropped View'}
          onPress={() => {
            cropViewRef.current.saveImage(true, 100);
          }}
        />
        <Text>Result:</Text>
        <View style={{height: 300}}>
          <ScrollView>
            <Text>{JSON.stringify(result, null, 4)}</Text>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cropView: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default App;
