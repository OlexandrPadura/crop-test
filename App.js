import React, {useState, useCallback} from 'react';
import {View, Dimensions, FlatList} from 'react-native';

// NAME - react-native-photo-view-ex
import PhotoView from 'react-native-photo-view-ex';
import RNFetchBlob from 'rn-fetch-blob';

const width = Dimensions.get('screen').width;

const Img = ({item}) => {
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
        'https://images.unsplash.com/photo-1621083439036-7a26badeab2e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1536&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIxMjMxMjg0&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=2048',
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
  const link = {};
  if (downloaded) {
    // link.highSource = {uri: downloaded};
    link.source = {uri: downloaded};
  }

  return (
    <View style={{width: width, height: '100%'}} key={item.key}>
      <PhotoView
        source={{uri: item.img}}
        {...link}
        minimumZoomScale={1}
        maximumZoomScale={5}
        onScale={(e) => {
          trigerCount();
          if (count > 15) {
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
export default ({}) => {
  const images = [
    {
      img:
        'https://images.unsplash.com/photo-1621151580062-8c6634e43d39?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=768&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIxMjMxMjEx&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1024',
      key: 1,
    },
    {
      img:
        'https://images.unsplash.com/photo-1621151323071-f4265578a7e7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=768&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIxMjMxMjMy&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1024',
      key: 2,
    },
    {
      img:
        'https://images.unsplash.com/photo-1621128136065-17a1375d46e0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=768&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIxMjMxMjQy&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1024',
      key: 3,
    },
    {
      img:
        'https://images.unsplash.com/photo-1621151274364-67302cc6ace6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=768&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIxMjMxMjUz&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1024',
      key: 4,
    },
    {
      img:
        'https://images.unsplash.com/photo-1621151528305-a620765e6345?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=768&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIxMjMxMjY0&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1024',
      key: 5,
    },
  ];

  const renderItem = ({item}) => <Img {...{item}} />;

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 5,
    keyExtractor: useCallback((s) => String(s.key), []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: width,
        offset: index * width,
      }),
      [],
    ),
  };

  return (
    <View style={{width: '100%', height: '100%'}}>
      <FlatList
        data={images}
        renderItem={renderItem}
        pagingEnabled
        horizontal
        inverted
        // canCancelContentTouches={false}
        showsHorizontalScrollIndicator={false}
        // onScroll={onScroll}
        {...flatListOptimizationProps}
      />
    </View>
  );
};
