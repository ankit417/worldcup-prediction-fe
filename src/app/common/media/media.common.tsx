import { MdDelete } from "react-icons/md";

import UPLOAD from "../../../assets/icons/upload.png";
import { colors } from "../../../modules";
import { Image, ImageUpload, Box } from "../index";

interface MediaProps {
  setImage: (arg: any) => void;
  defaultImages?: any[];
  removedImage?: any;
  setRemovedImage?: any;
  multiple?: boolean;
}
export const Media = ({
  setImage,
  defaultImages,
  removedImage,
  setRemovedImage,
  multiple = false,
}: MediaProps) => {
  const changeImage = (data: any) => {
    setImage(data);
  };

  const onRemoveImage = (i: number) => {
    const removedArray = [...removedImage];
    removedArray.push(i);
    setRemovedImage(removedArray);
  };

  const isMultipleDefault = () => {
    return multiple && defaultImages?.length > 0;
  };
  const isSingleDefault = (imageData: any) => {
    return !multiple && defaultImages?.length > 0 && imageData.length === 0;
  };
  return (
    <ImageUpload onChange={changeImage} multiple={multiple}>
      {({ onUploadImage, imageData, onRemove }) => (
        <Box>
          <Box
            // lg={5}
            // md={2}
            // sm={1}
            flexBox
            alCenter
            columnGap={20}
            rowGap={20}
            style={{ flexWrap: "wrap" }}
          >
            {(isMultipleDefault() || isSingleDefault(imageData)) &&
              defaultImages.map(
                (item: any, index: number) =>
                  !removedImage?.includes(index) && (
                    <div key={index}>
                      <ImageRender
                        imageURL={item}
                        multiple={multiple}
                        onClickRemove={() => onRemoveImage(index)}
                      />
                    </div>
                  )
              )}

            {imageData &&
              imageData.map((item: any, index: number) => (
                <div key={index}>
                  <ImageRender
                    multiple={multiple}
                    imageURL={item.url}
                    onClickRemove={() => onRemove(index)}
                  />
                </div>
              ))}
            <Box>
              <label style={{ display: "inline-block" }}>
                <input
                  id="click"
                  type="file"
                  multiple={multiple}
                  style={{ display: "none" }}
                  name="files"
                  onChange={(e) => onUploadImage(e)}
                  accept="image/png, image/jpeg"
                />
                <Box style={{ cursor: "pointer" }}>
                  <ImageRender imageURL={UPLOAD} />
                </Box>
              </label>
            </Box>
          </Box>
        </Box>
      )}
    </ImageUpload>
  );
};

interface ImageRenderProps {
  onClickRemove?: () => void;
  imageURL: string;
  multiple?: boolean;
}
const ImageRender = ({
  onClickRemove,
  imageURL,
  multiple = false,
}: ImageRenderProps) => {
  return (
    <div className="imageRender">
      <Image
        alt="Avatar"
        link={imageURL}
        style={{
          width: 80,
          height: 80,
          objectFit: "contain",
          // overflow: "hidden",
        }}
        // className="hoverimage"
      />
      {!!onClickRemove && multiple && (
        <div
          style={{
            position: "absolute",
            top: 2,
            right: 2,
            cursor: "pointer",
          }}
          onClick={onClickRemove}
        >
          <MdDelete color={colors.light.black200} size={20} />
        </div>
      )}
    </div>
  );
};
