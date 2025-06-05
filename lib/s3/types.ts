export type ShortFileProp = {
  originalFileName: string;
  path: string;
  fileSize: number;
};

export type PresignedUrlProp = ShortFileProp & {
  url: string;
  fileNameInBucket: string;
};
