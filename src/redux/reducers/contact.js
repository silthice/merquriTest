import data from '../../data/data.json';

const INITIAL_STATE = {
  contactList: data, foundList: []
};

const contact = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case 'ADD_CONTACT': {
          const {
              contactList,
          } = state;

          //console.log(action)
          contactList.push(action.payload)


          const newState = {
              ...state
          }

          return newState;
      }

      case 'EDIT_CONTACT': {
          const {
              contactList,
          } = state;

              contactList[action.payload.idx].firstName = action.payload.firstName
              contactList[action.payload.idx].lastName = action.payload.lastName
              contactList[action.payload.idx].email = action.payload.email
              contactList[action.payload.idx].phone = action.payload.phone

          const newState = {
              ...state,
              contactList: contactList
          };

          return newState;
      }

      case 'SEARCH_CONTACT': {

          let found = false
          let newList = []

          let {
              contactList,
          } = state;

          //console.log(contactList)

          contactList.forEach((c) => {
              //console.log(c)
              let name = c.firstName + " " + c.lastName
              name = name.toLowerCase()
              //console.log(name)
              //console.log(c)

              if (name.includes(action.payload.toLowerCase())) {
                  console.log('found', c)
                  newList.push(c)
                  found = true
              }


          })

          const newState = {
              ...state,
              foundList: newList
          };

          return newState
      }

      case 'RESET_CONTACT': {
          let {
              contactList, foundList
          } = state;

          foundList = []

          const newState = {
              contactList,
              foundList
          }

          console.log('newState', newState)

          return newState
      }

      default:
          return state
  }
};

export default contact;