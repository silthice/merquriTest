import {useNavigation} from '@react-navigation/native';
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
  TextInput,
  SafeAreaView,
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
import allActions from '../redux/actions/index';

console.log(allActions);
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const ContactDetailScreen = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(route.params.item.firstName);
  const [lastName, setLastName] = useState(route.params.item.lastName);
  const [email, setEmail] = useState(route.params.item.email);
  const [phone, setPhone] = useState(route.params.item.phone);
  const [userIdx, setUserIdx] = useState(route.params.index);

  //   useEffect(()=>{
  //     console.log('firstname', firstName)
  //     console.log('lastname', lastName)
  //     console.log('email', email)
  //     console.log('phone', phone)

  //   },[firstName,lastName,email,phone])

  const editDetails = () => {
    if (firstName == '' || lastName == '') {
      return Alert.alert('First or Last name cannot be empty');
    }

    let edited = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      idx: userIdx,
    };

    console.log(edited);

    //   this.props.editContact(edited);

    dispatch(allActions.contactActions.editContact(edited));

    Alert.alert(
      'Success',
      'Contact edited successfully.',
      [{text: 'Ok', onPress: () => navigation.goBack()}],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView>
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
            <Text style={{color: '#ff8c00'}}>Cancel</Text>
          </Button>
        </Left>
        <Body style={{flex: 1, alignItems: 'center'}}></Body>
        <Right style={{flex: 1}}>
          <TouchableOpacity
            style={{margintop: 0}}
            onPress={() => {
              editDetails();
            }}>
            <Text style={{color: '#ff8c00'}}>Save</Text>
          </TouchableOpacity>
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

      <View>
        <View
          style={{
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            height: 200,
          }}>
          <View
            style={{
              height: screenHeight * 0.2,
              width: screenHeight * 0.2,
              borderRadius: 200,
              backgroundColor: '#ff8c00',
            }}></View>
        </View>

        <View style={{paddingHorizontal: 15}}>
          <View style={{marginVertical: 5}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
              Main Information
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: screenWidth * 0.25}}>
              <Text style={{color: 'black'}}>First Name</Text>
            </View>

            <View style={{}}></View>
            <View style={{marginLeft: 20}}>
              <TextInput
                ref={ref => {
                  this._inputFirstName = ref;
                }}
                style={{
                  backgroundColor: 'white',
                  height: 35,
                  width: screenWidth * 0.6,
                  borderRadius: 5,
                }}
                defaultValue={route.params.item.firstName}
                editable
                maxLength={40}
                //onChangeText={(val)=>{ this.handleUserIdInput(val) }}
                onChangeText={val => {
                  setFirstName(val);
                }}
                onSubmitEditing={() => {
                  console.log('trigger this');
                  this._inputLastName.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
          </View>

          <View
            style={{
              marginVertical: 7.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderWidth: 0.2,
                borderColor: 'grey',
                width: '100%',
              }}></View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: screenWidth * 0.25}}>
              <Text style={{color: 'black'}}>Last Name</Text>
            </View>

            <View style={{}}></View>
            <View style={{marginLeft: 20}}>
              <TextInput
                //ref={ref => { this._inputLastName = ref }}
                ref={input => {
                  this._inputLastName = input;
                }}
                style={{
                  backgroundColor: 'white',
                  height: 35,
                  width: screenWidth * 0.6,
                  borderRadius: 5,
                }}
                defaultValue={route.params.item.lastName}
                editable
                maxLength={40}
                //onChangeText={(val)=>{ this.handleUserIdInput(val) }}
                onChangeText={val => {
                  setLastName(val);
                }}
                onSubmitEditing={() => {
                  console.log('trigger this');
                  this._inputEmail.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
          </View>
        </View>

        <View style={{paddingHorizontal: 15}}>
          <View style={{marginVertical: 5}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
              Sub Information
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: screenWidth * 0.25}}>
              <Text style={{color: 'black'}}>Email</Text>
            </View>

            <View style={{}}></View>
            <View style={{marginLeft: 20}}>
              <TextInput
                //ref={ref => { this._inputEmail = ref }}
                ref={input => {
                  this._inputEmail = input;
                }}
                style={{
                  backgroundColor: 'white',
                  height: 35,
                  width: screenWidth * 0.6,
                  borderRadius: 5,
                }}
                defaultValue={route.params.item.email}
                editable
                maxLength={40}
                //onChangeText={(val)=>{ this.handleUserIdInput(val) }}
                onChangeText={val => {
                  setEmail(val);
                }}
                onSubmitEditing={() => {
                  console.log('trigger this');
                  this._inputPhone.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
          </View>

          <View
            style={{
              marginVertical: 7.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderWidth: 0.2,
                borderColor: 'grey',
                width: '100%',
              }}></View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: screenWidth * 0.25}}>
              <Text style={{color: 'black'}}>Phone</Text>
            </View>

            <View style={{}}></View>
            <View style={{marginLeft: 20}}>
              <TextInput
                //ref={ref => { this._inputPhone = ref }}
                ref={input => {
                  this._inputPhone = input;
                }}
                style={{
                  backgroundColor: 'white',
                  height: 35,
                  width: screenWidth * 0.6,
                  borderRadius: 5,
                }}
                defaultValue={route.params.item.phone}
                editable
                maxLength={40}
                //onChangeText={(val)=>{ this.handleUserIdInput(val) }}
                onChangeText={val => {
                  setPhone(val);
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ContactDetailScreen;
