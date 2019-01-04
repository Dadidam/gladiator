import React from 'react';
import { connect } from 'react-redux';

const Home = ({ user }) => {
  const renderGreetings = () => {
    if (!user) return null;
    return <h4>Nice to see you, {user.name}, again!</h4>;
  };

  return (
    <div>
      <h1>Welcome Home</h1>
      {renderGreetings()}
      <p>Content here.</p>
    </div>
  );
};

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(Home);
