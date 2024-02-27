/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useEffect } from "react";
import { IGoogleOAuthProps } from "../../utils/types";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

const GoogleOAuth: React.FC<IGoogleOAuthProps> = memo(({ callback, text }) => {
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: callback,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "filled_black", size: "medium", text: text, width: 400, logo_alignment: "left" } // customization attributes
      );
    }
  }, [callback, text]);

  return <div id="buttonDiv"></div>;
});

export default GoogleOAuth;
