import React, { useRef, useState, useEffect } from "react";
import { BsFileMusicFill } from "react-icons/bs";
import { HiOutlineCloudUpload } from "react-icons/hi";
import PlayButton from "./PlayButton";
import SoundReactor from "../Classes/SoundReactor";
import { fileType } from "../Utils/FileType";
import { toast } from "react-toastify";

interface MainBodyProps {
  isVisible: boolean;
}

const MainBody = ({ isVisible }: MainBodyProps) => {
  const dragContainerRef = useRef<HTMLDivElement>(null);
  const dragLoadingRef = useRef<HTMLDivElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onDragHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragContainerRef.current?.classList.remove("active");

    if (event.dataTransfer.files) {
      const eventfileType = event.dataTransfer.files[0].type;
      if (eventfileType != fileType) {
        showToastError(true, eventfileType);
        return;
      }
      loadAudioFile(event.dataTransfer.files[0]);
    }
  };

  const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      loadAudioFile(event.target.files![0]);
    }
  };

  const loadAudioFile = (file: File) => {
    const reader = new FileReader();

    if (dragLoadingRef.current != null) {
      dragLoadingRef.current.classList.add("active");
    }

    reader.onload = (e) => {
      const newAudioUrl = reader.result as string;
      SoundReactor.changeAudioElement(newAudioUrl);
    };
    reader.readAsDataURL(file);
  };

  const onButtonClickedHandler = () => {
    if (inputFileRef.current != null) {
      inputFileRef.current.click();
    }
  };

  const showToastError = (isTypeError: boolean, fileType?: string) => {
    if (isTypeError) {
      toast.error(`${fileType} is not an mp3 file 💩`);
    } else {
      toast.error(`There was an error loading the file 💩`);
    }
  };

  const showToastSuccess = () => {
    toast.success("Mp3 file loaded correctly 😎");
  };

  useEffect(() => {
    SoundReactor.setToastCallBack(showToastSuccess, showToastError);
    SoundReactor.setLoadingContainer(dragLoadingRef.current);
  }, []);

  return (
    <main>
      <div className={`main-content ${isVisible ? "" : "hide"}`}>
        <div className="content-left">
          <h2>The new way to visualize audio in the web browsers</h2>
          <h4>
            Insert your custom mp3 audio file and try how the elements in the
            browser "React" to it. This website is made with ThreeJS and React,
            React Three Cannon was used for the pysics.
          </h4>
          <PlayButton />
        </div>
        <div className="content-right">
          <div
            ref={dragContainerRef}
            className="drag-container"
            onDragOver={onDragHandler}
            onDrop={onDropHandler}
            onDragEnter={() => {
              dragContainerRef.current?.classList.add("active");
            }}
            onDragLeave={() => {
              dragContainerRef.current?.classList.remove("active");
            }}
          >
            <div ref={dragLoadingRef} className="drag-loading-content">
              <h4>Loading </h4>
              <div className="spinner"></div>
            </div>
            <HiOutlineCloudUpload size="3.5rem" />
            <h2>Drag&Drop mp3 files here</h2>
            <p>or</p>
            <input
              type="file"
              ref={inputFileRef}
              hidden
              accept="audio/mpeg"
              onChange={onInputChangeHandler}
            />
            <button className="btn-files" onClick={onButtonClickedHandler}>
              Browse files
              <span className="files-contact">
                <BsFileMusicFill size="1.25rem" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainBody;
