import React, { useContext, useEffect, useState } from 'react';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { UserProfileCard } from './UserProfileCard';

export const UserProfileList = () => {
    const { getAllUserProfiles } = useContext(UserProfileContext);
    const [allProfiles, setAllProfiles] = useState([]);

    useEffect(() => {
        getAllUserProfiles().then(setAllProfiles);
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
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
