import { Button } from "../../library/button";
import { Dialog, DialogActions, DialogBody, DialogTitle } from "../../library/dialog";
import { ICreateLinkDialogProps, ICreateShortUrlPayload, IUrl } from "../../utils/types";
import { Description, ErrorMessage, Field, FieldGroup, Fieldset, Label } from "../../library/fieldset";
import { Input } from "../../library/input";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useCreateUrlMutation } from "../../api/url.api";
import { handleServerError } from "../../utils/helpers";
import { validateUrl, validateAlias } from "../../utils/input_validation";
import DisplayShortUrl from "../display_short_url/DisplayShortUrl";
import { LinkIcon } from "@heroicons/react/24/outline";

const CreateLinkDiaLog: React.FC<ICreateLinkDialogProps> = ({ open, onClose }) => {
  const [shortenUrl, setShortenUrl] = useState<IUrl | null>(null);
  const [longUrl, setLongUrl] = useState<string>("");
  const [validLongUrl, setValidLongUrl] = useState<boolean>(false);
  const [longUrlError, setLongUrlError] = useState<string | undefined>(undefined);

  const [alias, setAlias] = useState<string>("");
  const [validAlias, setValidAlias] = useState<boolean>(false);
  const [aliasError, setAliasError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const result = validateUrl(longUrl);
    !result && longUrl ? setLongUrlError("Invalid url") : setLongUrlError("");
    setValidLongUrl(longUrl ? !result : false);
  }, [longUrl]);

  useEffect(() => {
    const result = validateAlias(alias);
    !result && alias ? setAliasError("Alias must be between 3 and 8 characters") : setAliasError("");
    setValidAlias(alias ? !result : false);
  }, [alias]);

  const [createUrl, { isLoading, isSuccess, isError, error, data }] = useCreateUrlMutation();

  const handleSubmit = () => {
    if (validLongUrl || !longUrl) return;

    if (alias && validAlias) return;

    const payload: ICreateShortUrlPayload = {
      payload: {
        originalUrl: longUrl,
        alias: alias,
      },
      endpoint: "/create_url",
    };

    createUrl(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      setShortenUrl(data.data);
      setLongUrl("");
      setAlias("");
      setValidAlias(false);
      setValidLongUrl(false);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError && error) {
      const { message } = handleServerError(error);
      toast.error(message, { position: "top-center" });
    }
  }, [isError, error]);
  return (
    <>
      <Dialog size="xl" open={open} onClose={onClose}>
        <DialogTitle>Create Short Link</DialogTitle>
        <Description>Streamline Your Links: Simple, Quick, and Effective</Description>
        <DialogBody>
          <Fieldset aria-label="Shorten Long Url">
            <FieldGroup>
              <Field>
                <Label>Long url</Label>
                <Input name="long_url" type="url" invalid={validLongUrl} value={longUrl} onChange={(e) => setLongUrl(e.target.value)} placeholder="Enter long url here" />
                {validLongUrl && <ErrorMessage>{longUrlError}</ErrorMessage>}
              </Field>
              <Field>
                <Label>Alias (optional)</Label>
                <Input name="alias" type="text" invalid={validAlias} value={alias} onChange={(e) => setAlias(e.target.value)} placeholder="Enter alias here" />
                {validAlias && <ErrorMessage>{aliasError}</ErrorMessage>}
              </Field>
              {shortenUrl && <DisplayShortUrl url={`https://codedln.com/${shortenUrl.alias}`} callback={() => setShortenUrl(null)} />}
              <Field>
                <Button type="button" onClick={() => handleSubmit()} color="dark" className="w-full" disabled={validLongUrl || validAlias || isLoading}>
                  <LinkIcon className="w-4" />
                  Shorten URL
                </Button>
              </Field>
            </FieldGroup>
          </Fieldset>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => onClose(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateLinkDiaLog;
