import { UploadDropzone } from "@/lib/uploadthing";
import { deleteFile } from "@/lib/uploadthing.utils";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";
import ImageWithSkeleton from "../skelton-image";

interface ServerImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
  endPoint?: "messageFile" | "serverImage";
  className?: string;
  imgClass?: string;
}

const ServerImageUploader: FC<ServerImageUploaderProps> = ({
  value,
  onChange,
  endPoint = "serverImage",
  className,
  imgClass,
}) => {
  const [key, setKey] = useState("");
  return value ? (
    <div className={cn("relative h-20 w-20 mx-auto", className)}>
      <ImageWithSkeleton
        fill
        src={value}
        alt=""
        className={cn("rounded-full object-cover", imgClass)}
      />
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
      endpoint={endPoint}
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
