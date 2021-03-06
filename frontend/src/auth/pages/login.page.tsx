import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import GoogleLogin from "react-google-login";
import styled from "styled-components";

import { loginGoogle } from "user/redux/user.thunks";
import { selectIsLoggedIn } from "user/redux/user.selectors";

import { theme } from "shared/styles/theme.style";
import { SHeadingTitle } from "shared/styles/typography.style";
import { SPageContentCenter } from "shared/styles/layout.style";

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation<{ from: { pathname: string } }>();

  async function handleGoogleSuccess(googleData: any) {
    dispatch(loginGoogle(googleData.tokenId));
  }

  return (
    <SPageContentCenter centerContent>
      <SHeadingTitle>Login Page</SHeadingTitle>
      {loggedIn ? (
        <Redirect to={location.state?.from?.pathname ?? "/notebooks"} />
      ) : (
        <SGoogleLogin
          clientId={`${process.env.REACT_APP_OAUTH_CLIENT_ID}`}
          buttonText="Login With Google"
          onSuccess={handleGoogleSuccess}
          cookiePolicy={"single_host_origin"}
        />
      )}
    </SPageContentCenter>
  );
};

const SGoogleLogin = styled(GoogleLogin)`
  margin-top: ${theme.spacing.sm};
`;