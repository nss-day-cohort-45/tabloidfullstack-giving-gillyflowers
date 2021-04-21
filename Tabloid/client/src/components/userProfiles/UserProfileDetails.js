import { Button } from 'reactstrap';
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { UserProfileContext } from '../../providers/UserProfileProvider';

export const UserProfileDetails = (params) => {
    const { id } = useParams();
    const [userProfile, setUserProfile] = useState();
    const [changed, setChanged] = useState(false);
    const {
        getUserProfileById,
        getUserTypes,
        userTypes,
        updateUserProfile,
    } = useContext(UserProfileContext);
    const history = useHistory();

    useEffect(() => {
        getUserTypes().then(
            getUserProfileById(id).then((parsed) => {
                if (parsed.id) {
                    setUserProfile(parsed);
                } else {
                    history.push('/userprofile');
                }
            })
        );
    }, []);

    const handleUserTypeChange = (evt) => {
        const user = { ...userProfile };
        user.userTypeId = parseInt(evt.target.value);
        setChanged(true);
        setUserProfile(user);
    };

    const handleSaveChanges = () => {
        updateUserProfile(userProfile).then(() => {
            history.push('/userprofile');
        });
    };

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
                    <p>
                        Status:{' '}
                        {userProfile.isDeactivated ? 'Inactive' : 'Active'}
                    </p>
                    {userTypes.length > 0 && !userProfile.isDeactivated ? (
                        <div className="form-group">
                            <label htmlFor="userType">User role: </label>
                            <select
                                value={userProfile.userTypeId}
                                name="userType"
                                onChange={handleUserTypeChange}
                            >
                                {userTypes.map((ut) => (
                                    <option key={ut.id} value={ut.id}>
                                        {ut.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : null}
                    {changed ? (
                        <Button color="success" onClick={handleSaveChanges}>
                            Save Changes
                        </Button>
                    ) : null}
                    <Link to="/userprofile">Back To User Profiles List</Link>
                </div>
            </div>
        </div>
    ) : null;
};
