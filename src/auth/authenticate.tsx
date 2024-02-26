import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { saveAuth } from "../slice/auth.slice";
import { AppDispatch } from "../store";
import { handleServerError } from "../utils/helpers";
import { useGetUserQuery } from "../api/user.api";
import LoadingSpinner from "../components/spinner/Spinner";
import { IAuthGuardProps } from "../utils/types";

export const AuthGuard: React.FC<IAuthGuardProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, error, isLoading, isSuccess, isError } = useGetUserQuery();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(saveAuth(data.data));
      navigate("/dashboard");
    }
  }, [isSuccess, dispatch, location.state, data, navigate]);

  useEffect(() => {
    if (isError && error) {
      const { statusCode, message } = handleServerError(error);
      toast.error(message, { position: "top-center" });
      if (statusCode === 401) {
        navigate("/");
      }
    }
  }, [isError, error, navigate]);

  if (isLoading) return <LoadingSpinner />;

  return <>{children}</>;
};
