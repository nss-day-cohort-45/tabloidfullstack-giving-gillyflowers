import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card, CardBody, Button } from 'reactstrap';
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
                <div className="text-center">
                    {userProfile.isDeactivated ? (
                        <Button onClick={handleReactivate} color="success">
                            Reactivate User
                        </Button>
                    ) : (
                        <Button onClick={handleDeactivate} color="danger">
                            Deactivate User
                        </Button>
                    )}
                </div>
            </CardBody>
        </Card>
    );
};
