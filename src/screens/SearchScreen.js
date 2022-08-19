import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

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

import allActions from '../redux/actions/index';
import {SafeAreaView} from 'react-native-safe-area-context';

const SearchScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const foundListRedux = useSelector(state => state.contactState.foundList);
  const contactListRedux = useSelector(state => state.contactState.contactList);
  const [foundData, setFoundData] = useState([]);
  const [foundList, setFoundList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(allActions.contactActions.resetContact(true));
    setFoundData([]);
    setSearchText('');
    setTimeout(() => {
      this._input._root.focus();
    }, 100);
  }, [isFocused]);

  const search = searchTxt => {
    if (searchTxt == '') {
      return Alert.alert(
        'No matching name found, please search using name only',
      );
    }

    dispatch(allActions.contactActions.searchContact(searchTxt));
  };

  const handleNavigation = item => {
    let idx = contactListRedux.indexOf(item);

    navigation.navigate('ContactDetailScreen', {item: item, index: idx});
  };

  useEffect(() => {
    console.log('check foundList', foundListRedux);

    if (searchText !== '') {
      if (foundListRedux.length < 1) {
        setFoundList([]);
        return Alert.alert(
          'No matching name found, please search using name only',
        );
      }
    }
    setFoundList(foundListRedux);
  }, [foundListRedux]);

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
            style={{margintop: 0}}
            transparent
            onPress={() => navigation.goBack()}>
            <Text style={{fontSize: 20, color: '#ff8c00'}}>{'<'} Back </Text>
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
            Search
          </Title>
        </Body>
        <Right style={{flex: 1}}></Right>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Item
          regular
          style={{
            backgroundColor: 'white',
            borderColor: '#f1f1f1',
            width: screenWidth * 0.95,
            borderRadius: 5,
          }}>
          <Input
            ref={ref => {
              this._input = ref;
            }}
            placeholder="Search"
            value={searchText}
            onChangeText={val => {
              setSearchText(val);
            }}
            style={{fontSize: 12}}
            placeholderTextColor="#CCCCCC"
            onSubmitEditing={() => {
              search(searchText);
            }}
          />
          <Button
            onPress={() => {
              search(searchText);
            }}
            style={{
              backgroundColor: '#ff8c00',
              width: 70,
              height: 40,
              justifyContent: 'center',
              marginRight: 5,
              borderRadius: 10,
              marginTop: 5,
            }}>
            <Text style={{color: 'white', fontSize: 12}}>Search</Text>
          </Button>
        </Item>
      </View>

      <FlatList
        style={{flex: 1}}
        data={foundList}
        renderItem={({item, index}) => {
          return (
            <View>
              <TouchableOpacity
                style={{height: 60, justifyContent: 'center'}}
                onPress={() => {
                  handleNavigation(item);
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

              <View style={{borderWidth: 0.2, borderColor: 'grey'}}></View>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
