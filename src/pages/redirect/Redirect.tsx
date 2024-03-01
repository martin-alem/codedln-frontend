import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/spinner/Spinner";
import { useRedirectQuery } from "../../api/url.api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { handleServerError } from "../../utils/helpers";

const Redirect = () => {
  const { alias } = useParams();

  const { data, error, isError, isSuccess, isLoading } = useRedirectQuery(alias || "", { skip: !alias });

  useEffect(() => {
    if (isSuccess) {
      if(data) {
        window.location.href = data.data;
      }
    }
  }, [isSuccess, data]);
  useEffect(() => {
    if (isError && error) {
      const { message } = handleServerError(error);
      toast.error(message, { position: "top-center" });
    }
  }, [isError, error]);
  return <>{isLoading ? <LoadingSpinner /> : null}</>;
};

export default Redirect;
