import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  StatusBar,
  Image,
  AppRegistry,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Item,
  Input,
  Card,
  CardItem,
  Footer,
  FooterTab,
  Content,
  Thumbnail,
  Tab,
  Tabs,
  ScrollableTab,
  Form,
  Picker,
  Separator,
  List,
  ListItem,
} from 'native-base';

import {useSelector, useDispatch} from 'react-redux';
import {set} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const ContactListScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const contactListRedux = useSelector(state => state.contactState.contactList);
  const [contactList, setContactList] = useState(contactListRedux);
  const [isRefreshing, setIsRefreshing] = useState(false);

  //   useEffect(()=>{
  //     setContactList(contactListRedux)
  //   }, [contactListRedux])

  const isFocused = useIsFocused();

  useEffect(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, [isFocused]);

  const createNewContact = () => {
    navigation.navigate('NewContactScreen');
  };

  const goToContactDetail = (item, index) => {
    navigation.navigate('ContactDetailScreen', {item, index});
  };

  const goSearch = () => {
    navigation.navigate('SearchScreen');
  };

  const onPullToRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // setContactList(contactListRedux)
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={{height: screenHeight, flex: 1}}>
      <View style={{height: 40, flexDirection: 'row', paddingHorizontal: 15}}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Left style={{flex: 1}}>
          <Button
            style={{margintop: 0, left: 10}}
            transparent
            onPress={() => {
              goSearch();
            }}>
            <Image
              source={require('../../img/search.png')}
              style={{height: 25, width: 25}}
            />
          </Button>
        </Left>
        <Body style={{flex: 1, alignItems: 'center'}}>
          <Title
            style={{
              fontSize: 20,
              margintop: 0,
              fontSize: 22,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Contacts
          </Title>
        </Body>
        <Right style={{flex: 1}}>
          <Button
            style={{margintop: 0}}
            transparent
            onPress={() => {
              createNewContact();
            }}>
            <Text style={{fontSize: 35, color: '#ff8c00', bottom: 5}}>+</Text>
          </Button>
        </Right>
      </View>

      <View
        style={{
          height: 1,
          marginTop: 10,
          width: '100%',
          justifyContent: 'center',
          alignSelf: 'center',
          backgroundColor: 'lightgrey',
        }}
      />

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => onPullToRefresh()}
          />
        }
        style={{flex: 1}}
        data={contactListRedux}
        //data={data}
        renderItem={({item, index}) => {
          return (
            <View>
              <TouchableOpacity
                style={{height: 60, justifyContent: 'center'}}
                onPress={() => {
                  goToContactDetail(item, index);
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: '100%',
                    paddingHorizontal: 15,
                  }}>
                  <View
                    style={{
                      flex: 0.2,
                    }}>
                    <View
                      style={{
                        height: 45,
                        width: 45,
                        borderRadius: 45,
                        backgroundColor: '#ff8c00',
                      }}></View>
                  </View>
                  <View style={{flexDirection: 'row', flex: 1}}>
                    <Text>{item.firstName}</Text>
                    <Text> {item.lastName}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: 1,
                width: '90%',
                justifyContent: 'center',
                alignSelf: 'center',
                backgroundColor: 'lightgrey',
              }}
            />
          );
        }}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default ContactListScreen;
