import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserProfileContext } from '../providers/UserProfileProvider';
import { CommentProvider } from '../providers/CommentProvider';
import PostList from './posts/PostList';
import CommentList from './comments/CommentList';
import { PostDetails } from './posts/PostDetails';
import { PostForm } from './posts/PostForm';
import { UserProfileList } from './userProfiles/UserProfileList';
import { UserProfileDetails } from './userProfiles/UserProfileDetails';
import Login from './Login';
import Register from './Register';
import Hello from './Hello';
import TagList from './tags/TagList';
import TagForm from './tags/TagForm';
import CategoryList from './categories/CategoryList';
import PostTagForm from './postTags/PostTagForm';
import CommentFormEdit from './comments/CommentFormEdit';
import SearchResults from './posts/SearchResults';

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

                <Route path="/posts/create" exact>
                    {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/posts/edit/:id" exact>
                    {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/comment/:id" exact>
                    {isLoggedIn ? <CommentFormEdit /> : <Redirect to="/login" />}
                </Route>

                <Route path="/posts/tags/:postId" exact>
                    {isLoggedIn ? <PostTagForm /> : <Redirect to="/login" />}
                </Route>
                <Route path="/posts/:id/:showComments?" >
                    {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
                </Route>

                <Route path="/tags" exact>
                    {isLoggedIn ? <TagForm /> : <Redirect to="/login" />}
                    {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/tags/:tagId" exact>
                    {isLoggedIn ? <TagForm /> : <Redirect to="/login" />}
                    {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/userprofile" exact>
                    {isLoggedIn ? (
                        <UserProfileList />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>

                <Route path="/userprofile/:id" exact>
                    {isLoggedIn ? (
                        <UserProfileDetails />
                    ) : (
                        <Redirect to="/login" />
                    )}{' '}
                </Route>

                <Route path="/categories" exact>
                    {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/searchResults" exact>
                    {isLoggedIn ? <SearchResults /> : <Redirect to="/login" />}
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
