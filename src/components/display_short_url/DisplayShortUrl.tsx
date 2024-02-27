import { ClipboardIcon, LinkIcon } from "@heroicons/react/20/solid";
import { IDisplayShortUrlProps } from "../../utils/types";
import { writeClipboardText } from "../../utils/helpers";

const DisplayShortUrl: React.FC<IDisplayShortUrlProps> = ({ url, callback }) => {
  return (
    <div className="rounded-md bg-blue-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <LinkIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-blue-700">{url}</p>
          <p className="mt-3 text-sm md:ml-6 md:mt-0">
            <ClipboardIcon onClick={() => writeClipboardText(url, callback)} className="w-4 cursor-copy text-blue-700 hover:text-blue-600" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisplayShortUrl;
