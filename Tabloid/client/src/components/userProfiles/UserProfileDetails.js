import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { UserProfileContext } from '../../providers/UserProfileProvider';

export const UserProfileDetails = (params) => {
    const { id } = useParams();
    const [userProfile, setUserProfile] = useState();
    const { getUserProfileById } = useContext(UserProfileContext);
    const history = useHistory();

    useEffect(() => {
        getUserProfileById(id).then((parsed) => {
            if (parsed.id) {
                setUserProfile(parsed);
            } else {
                history.push('/userprofile');
            }
        });
    }, []);

    return userProfile ? (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-12 col-lg-6">
                    {userProfile.imageLocation ? (
                        <img src={userProfile.imageLocation} />
                    ) : null}
                    <h1>{userProfile.displayName}</h1>
                    <h3>Full Name: {userProfile.fullName}</h3>
                    <p>
                        Created:{' '}
                        {new Date(
                            userProfile.createDateTime
                        ).toLocaleDateString('en-US')}
                    </p>
                    <p>Email: {userProfile.email}</p>
                    <p>User type: {userProfile.userType.name}</p>
                    <Link to="/userprofile">Back To User Profiles List</Link>
                </div>
            </div>
        </div>
    ) : null;
};
