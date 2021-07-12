/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
} from "react-native";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
// import HomeContainer from "./HomeContainer";

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchImage(1);
  }, []);

  const fetchImage = (page) => {
    fetch(
      `https://api.unsplash.com/photos/?client_id=F6ZgECkn_d2GDEWJ5yeHMrmTA11NeQ-Bz_5esHZd2po&&page=${page}`
    )
      .then((res) => res.json())
      .then((result) => {
        setPage(page);
        setData([...data, ...result]);
      });
  };

  const renderImages = (item) => {
    return (
      <Image
        source={{ uri: item.item.urls.full }}
        style={styles.image}
        resizeMode="stretch"
      />
    );
  };

  const loadMore = () => {
    fetchImage(page + 1);
  };

  return (
    <Fragment>
      {console.log("**8", data, page)}
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        />
        <FlatList
          data={data}
          renderItem={renderImages}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark,
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
});

export default App;
