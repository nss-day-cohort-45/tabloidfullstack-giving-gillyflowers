import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';
import { UserProfileContext } from '../../providers/UserProfileProvider';

export const UserProfileCard = ({ userProfile }) => {
    const {
        deactivateUserProfile,
        reactivateUserProfile,
        setViewingDeactivated,
    } = useContext(UserProfileContext);
    const history = useHistory();

    const handleDeactivate = () => {
        if (window.confirm('Are you sure you want to deactivate this user?')) {
            deactivateUserProfile(userProfile.id).then(() => {
                history.push('/userprofile');
            });
        }
    };

    const handleReactivate = () => {
        reactivateUserProfile(userProfile).then(() => {
            setViewingDeactivated(false);
            history.push('/userprofile');
        });
    };

    return (
        <Card className="m-4">
            <Link to={`/userprofile/${userProfile.id}`}>
                <h3 className="text-center">{userProfile.displayName}</h3>
            </Link>
            <CardBody>
                <p>Full Name: {userProfile.fullName}</p>
                <p>User Role: {userProfile.userType.name}</p>
                {userProfile.isDeactivated ? (
                    <p onClick={handleReactivate} style={{ cursor: 'pointer' }}>
                        Reactivate User
                    </p>
                ) : (
                    <p onClick={handleDeactivate} style={{ cursor: 'pointer' }}>
                        Deactivate User
                    </p>
                )}
            </CardBody>
        </Card>
    );
};
