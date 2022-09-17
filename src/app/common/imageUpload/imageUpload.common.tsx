import React, { useEffect, useState } from "react";

interface ImageUploadProps {
  onChange: (arg: any) => void;
  children: (arg: any) => React.ReactNode;
  multiple: boolean;
  // buttonStyle:any,
  // title:string,
  // buttonclick:()=>void,
  // accept:string,
}

export function ImageUpload(props: ImageUploadProps) {
  const { onChange, children, multiple } = props;

  const [imageData, setImageData] = useState<any[]>([]);

  useEffect(() => {
    onChange(imageData);
  }, [imageData, onChange]);
  const onUploadImage = (e: any) => {
    let { files } = e.target;

    let data: any[] = [];

    for (let i = 0; i < files.length; i++) {
      let impath = URL.createObjectURL(files[i]);
      data.push({ url: impath, file: files[i] });
    }
    if (multiple) {
      setImageData([...imageData, ...data]);
    } else setImageData([...data]);

    // setFunction(data);
  };

  const onRemove = (i: number) => {
    let data = [...imageData];
    data.splice(i, 1);
    setImageData(data);
  };

  const deleteAllHandler = () => {
    setImageData([]);
  };

  return (
    <>
      {children({ imageData, onUploadImage, onRemove, deleteAllHandler })}
      {/* <label style={{ display: "inline-block" }}>
        <input
          id="click"
          style={{ display: "none" }}
          type="file"
          multiple={multiple}
          name="files"
          onChange={(e) => onUploadImage(e)}
          accept={accept}
        />
        {buttonclick}
      </label> */}
    </>
  );
}
