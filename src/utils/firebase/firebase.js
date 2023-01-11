import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


// Credentials for firebase. Dont touch!!!
const firebaseConfig = {
	apiKey: 'AIzaSyDTMEbiebVtAXhAt9rQHFipegebaJMUVvU',
	authDomain: 'crwn-clothing-db-1dc14.firebaseapp.com',
	projectId: 'crwn-clothing-db-1dc14',
	storageBucket: 'crwn-clothing-db-1dc14.appspot.com',
	messagingSenderId: '337111266160',
	appId: '1:337111266160:web:4ff8b404a22817d2ab55b5',
	measurementId: 'G-PB0R2RR0RB'
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

// Google Provider
const googleProvider = new GoogleAuthProvider();

// Google Provider settings
googleProvider.setCustomParameters({
	prompt: 'select_account'
});

// Firebase authentication
export const auth = getAuth();
// Firebase Auth with Google popup
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// Ref on Firebase db
export const db = getFirestore();

// Method for creating user document
export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
	if(!userAuth) return;
	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInfo
			});
		} catch (error) {
			console.log('error creating the user', error.message);
		}
	}

	return userDocRef;
};

// Method for creating user by email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
}
