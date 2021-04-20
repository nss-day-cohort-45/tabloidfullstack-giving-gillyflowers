import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { UserProfileCard } from './UserProfileCard';

export const UserProfileList = () => {
    const {
        getAllUserProfiles,
        getDeactivatedUserProfiles,
        userProfiles,
        viewingDeactivated,
        setViewingDeactivated,
    } = useContext(UserProfileContext);

    useEffect(() => {
        getAllUserProfiles();
    }, []);

    useEffect(() => {
        if (viewingDeactivated) {
            getDeactivatedUserProfiles();
        } else {
            getAllUserProfiles();
        }
    }, [viewingDeactivated]);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    <div className="text-center">
                        {viewingDeactivated ? (
                            <h1>Deactivated Users</h1>
                        ) : (
                            <h1>Active Users</h1>
                        )}
                        {viewingDeactivated ? (
                            <Button
                                color="success"
                                onClick={() => {
                                    setViewingDeactivated(false);
                                }}
                            >
                                View Active Users
                            </Button>
                        ) : (
                            <Button
                                onClick={() => {
                                    setViewingDeactivated(true);
                                }}
                            >
                                View Deactivated Users
                            </Button>
                        )}
                    </div>
                    {userProfiles
                        .sort((a, b) =>
                            a.displayName.localeCompare(b.displayName)
                        )
                        .map((userProfile) => {
                            return (
                                <UserProfileCard
                                    key={userProfile.id}
                                    userProfile={userProfile}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
};
