import { useEffect, useState } from "react";
import { Button } from "../../library/button";
import { ErrorMessage, Field, FieldGroup, Fieldset, Label } from "../../library/fieldset";
import { Text } from "../../library/text";
import { Input } from "../../library/input";
import { validateAlias, validateUrl } from "../../utils/input_validation";
import { ICreateShortUrlPayload, IUrl } from "../../utils/types";
import { useCreateUrlMutation } from "../../api/url.api";
import { toast } from "react-toastify";
import { handleServerError } from "../../utils/helpers";
import DisplayShortUrl from "../display_short_url/DisplayShortUrl";

const ShortLink = () => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validLongUrl || !longUrl) return;

    if (alias && validAlias) return;

    const payload: ICreateShortUrlPayload = {
      payload: {
        originalUrl: longUrl,
        alias: alias,
      },
      endpoint: "/guest",
    };

    createUrl(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      if (data) {
        setShortenUrl(data.data);
        setLongUrl("");
        setAlias("");
        setValidAlias(false);
        setValidLongUrl(false);
      }
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError && error) {
      const { message } = handleServerError(error);
      toast.error(message, { position: "top-center" });
    }
  }, [isError, error]);
  return (
    <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 border border-r-0">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h1 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Streamline Your Links: Simple, Quick, and Effective</h1>
          <Text>Brevity at Its Best – Shorten, Share, Succeed.</Text>
        </div>

        <div className="mt-10">
          <div>
            <form onSubmit={handleSubmit}>
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
                    <Button type="submit" color="dark" className="w-full" disabled={validLongUrl || validAlias || isLoading}>
                      Shorten URL
                    </Button>
                  </Field>
                </FieldGroup>
              </Fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortLink;
