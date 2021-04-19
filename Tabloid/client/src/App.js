import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { PostProvider } from "./providers/PostProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { TagProvider } from './providers/TagProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <PostProvider>
          <TagProvider>
            <Header />
            <ApplicationViews />
          </TagProvider>
        </PostProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
