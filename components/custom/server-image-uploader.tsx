import { UploadDropzone } from "@/lib/uploadthing";
import { deleteFile } from "@/lib/uploadthing.utils";
import { X } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";

interface ServerImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
}

const ServerImageUploader: FC<ServerImageUploaderProps> = ({
  value,
  onChange,
}) => {
  const [key, setKey] = useState("");
  return value ? (
    <div className="relative h-20 w-20 mx-auto">
      <Image fill src={value} alt="" className="rounded-full object-cover" />
      <X
        className="absolute top-0 right-0 text-white bg-red-400 text-xs rounded-full p-1"
        size={20}
        onClick={async () => {
          onChange("");
          await deleteFile(key);
        }}
      />
    </div>
  ) : (
    <UploadDropzone
      endpoint="serverImage"
      onClientUploadComplete={(res) => {
        onChange(res[0]?.url);
        setKey(res[0]?.key);
      }}
      onUploadError={(error: Error) => {
        console.error(error);
      }}
    />
  );
};

export default ServerImageUploader;
