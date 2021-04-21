import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { PostProvider } from "./providers/PostProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { TagProvider } from './providers/TagProvider';
import { CategoryProvider } from "./providers/CategoryProvider";
import { CommentProvider } from './providers/CommentProvider';
import { PostTagProvider } from './providers/PostTagProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <PostTagProvider>
          <PostProvider>
            <TagProvider>
              <CategoryProvider>
                <CommentProvider>
                  <Header />
                  <ApplicationViews />
                </CommentProvider>
              </CategoryProvider>
            </TagProvider>
          </PostProvider>
        </PostTagProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
