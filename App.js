import React, {useState, useRef} from 'react';
import {Button, StatusBar, StyleSheet, View, Image} from 'react-native';
import {CropView} from 'react-native-image-crop-tools';
import {launchImageLibrary} from 'react-native-image-picker';

const App = () => {
  const [uri, setUri] = useState();
  const cropViewRef = useRef();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Button
          title={'Pick Image'}
          onPress={() => {
            launchImageLibrary({noData: true}, (response) => {
              setUri(response.uri);
            });
          }}
        />
        {uri !== undefined && (
          <CropView
            sourceUrl={uri}
            style={styles.cropView}
            ref={cropViewRef}
            onImageCrop={(res) => console.log(res)}
            keepAspectRatio
            aspectRatio={{width: 16, height: 9}}
          />
        )}
        <Button
          title={'Get Cropped View'}
          onPress={() => {
            cropViewRef.current.saveImage(true, 100);
          }}
        />
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
