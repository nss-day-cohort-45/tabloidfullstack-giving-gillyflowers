import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { UserProfileCard } from './UserProfileCard';

export const UserProfileList = () => {
    const { getAllUserProfiles, getDeactivatedUserProfiles } = useContext(
        UserProfileContext
    );
    const [allProfiles, setAllProfiles] = useState([]);
    const [viewingDeactivated, setViewingDeactivated] = useState(false);

    useEffect(() => {
        getAllUserProfiles().then(setAllProfiles);
    }, []);

    useEffect(() => {
        if (viewingDeactivated) {
            getDeactivatedUserProfiles().then(setAllProfiles);
        } else {
            getAllUserProfiles().then(setAllProfiles);
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
                    {allProfiles
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
