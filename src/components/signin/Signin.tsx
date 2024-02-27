/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { Strong, Text } from "../../library/text";
import { IGoogleOAuthPayload, IGoogleOAuthResponse } from "../../utils/types";
import GoogleOAuth from "../google_oauth/GoogleOAuth";
import { useGoogleSignInMutation } from "../../api/auth.api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveAuth } from "../../slice/auth.slice";
import { handleServerError } from "../../utils/helpers";
import { toast } from "react-toastify";
import { SignInMethod } from "../../utils/constant";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [googleLogin, { isSuccess: googleIsSuccess, isError: googleIsError, error: googleError, data: googleData }] = useGoogleSignInMutation();

  const handleGoogleLogin = useCallback(
    async (response: IGoogleOAuthResponse) => {
      const payload: IGoogleOAuthPayload = {
        idToken: response.credential,
        signInWith: SignInMethod.GOOGLE,
      };
      googleLogin(payload);
    },
    [googleLogin]
  );

  useEffect(() => {
    if (googleIsSuccess) {
      dispatch(saveAuth(googleData.data));
      navigate("/dashboard");
    }
  }, [dispatch, googleIsSuccess, navigate]);

  useEffect(() => {
    if (googleIsError && googleError) {
      const { message } = handleServerError(googleError);
      toast.error(message, { position: "top-center" });
    }
  }, [googleIsError, googleError]);
  return (
    <div className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img className="h-20 w-auto" src="https://gemkox-spaces.nyc3.cdn.digitaloceanspaces.com/codedln/codedln.svg" alt="codedln" />
          <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
          <Text>
            Sign in to <Strong>your account</Strong> to manage all your urls
          </Text>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <GoogleOAuth callback={handleGoogleLogin} text="signin_with" />
        </div>
      </div>
    </div>
  );
};

export default Signin;
