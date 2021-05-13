import React, {useState} from 'react';
import {View} from 'react-native';

// NAME - react-native-photo-view-ex
import PhotoView from 'react-native-photo-view-ex';
import RNFetchBlob from 'rn-fetch-blob';

export default ({}) => {
  const url =
    'https://banner2.cleanpng.com/20180713/tre/kisspng-react-native-web-application-javascript-google-scholar-logo-5b486117ca2a66.0620183815314701038281.jpg';

  const [downloaded, setDownloaded] = useState(null);
  const [loading, setLoading] = useState(false);

  let count = 0;
  let id;
  const trigerCount = () => {
    if (id) {
      clearTimeout(id);
    }
    count += 1;
    id = setTimeout(() => {
      count = 0;
    }, 300);
  };

  const fetchFull = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    console.log('fetchFull');
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch(
        'GET',
        'https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-png-transparent.png',
      )
      .then((resp) => {
        return resp.readFile('base64');
      })
      .then(async (base64Data) => {
        const dirs = RNFetchBlob.fs.dirs.CacheDir;
        const path = dirs + `/test.png`;
        RNFetchBlob.fs.writeFile(path, base64Data, 'base64').then(() => {
          setDownloaded(`file://${path}`);
        });
      });
  };
  console.log(downloaded, 'downloaded');
  return (
    <View style={{width: '100%', height: '100%'}}>
      <PhotoView
        // key={downloaded}
        source={{uri: downloaded ? downloaded : url}}
        scale={1}
        minimumZoomScale={1}
        maximumZoomScale={5}
        onScale={(e) => {
          console.log(e.nativeEvent,'onScale');
          trigerCount();
          if (count > 20) {
            fetchFull();
          }
        }}
        resizeMode="contain"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
      />
    </View>
  );
};
