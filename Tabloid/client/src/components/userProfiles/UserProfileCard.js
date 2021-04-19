import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';

export const UserProfileCard = ({ userProfile }) => {
    return (
        <Card className="m-4">
            <Link to={`/userprofile/${userProfile.id}`}>
                <h3 className="text-center">{userProfile.displayName}</h3>
            </Link>
            <CardBody>
                <p>Full Name: {userProfile.fullName}</p>
                <p>User Role: {userProfile.userType.name}</p>
            </CardBody>
        </Card>
    );
};
