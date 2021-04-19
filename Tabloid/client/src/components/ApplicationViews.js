import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserProfileContext } from '../providers/UserProfileProvider';
import PostList from './posts/PostList';
import { PostDetails } from './posts/PostDetails';
import Login from './Login';
import Register from './Register';
import Hello from './Hello';
import TagList from './tags/TagList';
import TagForm from './tags/TagForm';

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
                </Route>

                <Route path="/posts/userposts/:id">
                    {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/posts" exact>
                    {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/posts/:id" exact>
                    {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
                </Route>

                <Route path="/tags" exact>
                    {isLoggedIn ? <TagForm /> : <Redirect to="/login" />}
                    {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </main>
    );
}
