import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

//To deploy a push notification
//http://rallycoding.herokuapp.com/api/tokens
//token: ExponentPushToken[_Il1q2CklyTMnqy-4C0bLa]

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
  let previousToken = await AsyncStorage.getItem('pushtoken');
  console.log(previousToken);

  if(previousToken) {
     return;
  } else {
  let { status } =  await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

    if (status !== 'granted') {
      return;
    }

    let token = await Notifications.getExpoPushTokenAsync();

    try {
      await axios.post(PUSH_ENDPOINT, { token: { token } });
      AsyncStorage.setItem('pushtoken', token);
    } catch(e) {
      console.log(e);
    }
  }
};
