// Configuration Firebase centralisée
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyD9kAxm4LTuINjsLhYqHdXvyGG22Mny8yI',
	authDomain: 'cyano-signalement.firebaseapp.com',
	projectId: 'cyano-signalement',
	storageBucket: 'cyano-signalement.appspot.com',
	messagingSenderId: '909152647209',
	appId: '1:909152647209:android:646095775ca5c7d2b6c438',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
