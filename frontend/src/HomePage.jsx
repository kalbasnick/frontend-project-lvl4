import React from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect } from "react";

const HomePage = () => {
  const { push } = useHistory();
  const userToken = JSON.parse(localStorage.getItem('userId'));
  console.log(userToken);

  useEffect(() => {
    if (!userToken) {
      push('/login');
    }
  });
 
  return (
    <div>
      test;
    </div>
  )
};

export default HomePage;
