import React, { useState, useEffect, createContext } from 'react';
import { Spinner } from 'reactstrap';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
    const apiUrl = '/api/userprofile';

    const userProfile = sessionStorage.getItem('userProfile');
    const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);
    const [currentUserId, setCurrentUserId] = useState(0);
    const [userProfiles, setUserProfiles] = useState([]);
    const [viewingDeactivated, setViewingDeactivated] = useState(false);

    const [isFirebaseReady, setIsFirebaseReady] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((u) => {
            setIsFirebaseReady(true);
        });
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            setCurrentUserId(JSON.parse(userProfile).id);
        }
    }, [userProfile]);

    const login = (email, pw) => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, pw)
            .then((signInResponse) => getUserProfile(signInResponse.user.uid))
            .then((userProfile) => {
                sessionStorage.setItem(
                    'userProfile',
                    JSON.stringify(userProfile)
                );
                setIsLoggedIn(true);
            });
    };

    const logout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                sessionStorage.clear();
                setIsLoggedIn(false);
            });
    };

    const register = (userProfile, password) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(userProfile.email, password)
            .then((createResponse) =>
                saveUser({
                    ...userProfile,
                    firebaseUserId: createResponse.user.uid,
                })
            )
            .then((savedUserProfile) => {
                sessionStorage.setItem(
                    'userProfile',
                    JSON.stringify(savedUserProfile)
                );
                setIsLoggedIn(true);
            });
    };

    const getToken = () => firebase.auth().currentUser.getIdToken();

    const getAllUserProfiles = () => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then(setUserProfiles)
        );
    };

    const getDeactivatedUserProfiles = () => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/deactivated`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then(setUserProfiles)
        );
    };

    const getUserProfileById = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/getbyid/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );
    };

    const getUserProfile = (firebaseUserId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${firebaseUserId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((resp) => resp.json())
        );
    };

    const saveUser = (userProfile) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userProfile),
            }).then((resp) => resp.json())
        );
    };

    const deactivateUserProfile = (userProfileId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${userProfileId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(getAllUserProfiles)
        );
    };

    const reactivateUserProfile = (userProfile) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/reactivate/${userProfile.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userProfile),
            }).then(getAllUserProfiles)
        );
    };

    return (
        <UserProfileContext.Provider
            value={{
                isLoggedIn,
                login,
                logout,
                register,
                getToken,
                currentUserId,
                getAllUserProfiles,
                getUserProfileById,
                getDeactivatedUserProfiles,
                deactivateUserProfile,
                reactivateUserProfile,
                userProfiles,
                setUserProfiles,
                viewingDeactivated,
                setViewingDeactivated,
            }}
        >
            {isFirebaseReady ? (
                props.children
            ) : (
                <Spinner className="app-spinner dark" />
            )}
        </UserProfileContext.Provider>
    );
}
