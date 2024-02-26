/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../../api/auth.api";
import LoadingSpinner from "../../components/spinner/Spinner";
import { deleteAuth } from "../../slice/auth.slice";
import { handleServerError } from "../../utils/helpers";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.authUser.user);
  const [logout, { isSuccess, isError, error, isLoading }] = useLogoutMutation();

  useEffect(() => {
    logout(null);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: () => null,
      });
      window.google.accounts.id.revoke(user?.email ?? "", () => {
        dispatch(deleteAuth());
        navigate("/");
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError && error) {
      const { message } = handleServerError(error);
      toast.error(message, { position: "top-center" });
    }
  }, [isError, error]);

  return <>{isLoading && <LoadingSpinner />}</>;
};

export default Logout;
