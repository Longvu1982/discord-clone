"use client";

import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import React, { useState } from "react";

interface ImageWithSkeletonProps extends ImageProps {}

const ImageWithSkeleton: React.FC<ImageProps> = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  console.log(isLoading);

  return (
    <>
      <div
        className={cn(
          "absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-4600 rounded-full",
          isLoading ? "" : "hidden",
          props.className
        )}
      />
      <Image
        {...props}
        onLoad={() => {
          setIsLoading(false);
        }}
      />
    </>
  );
};

export default ImageWithSkeleton;
