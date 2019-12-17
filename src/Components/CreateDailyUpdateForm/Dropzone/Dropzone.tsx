import React, { useRef, ChangeEvent, useState } from 'react';
import Icon from './upload.svg';
import './Dropzone.css';


interface Props{
    disabled: boolean;
    onFilesAdded?: (array : any) => void;
}

const Dropzone = (props: Props) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [placeholder, setPlaceholder] = useState('Voeg een bestand toe');
    function openFileDialog() {
        if (props.disabled) return;
        if (fileInputRef != null && fileInputRef.current != null) {
            fileInputRef.current.click();
        }
    }

    function onFilesAdded(event: ChangeEvent<HTMLInputElement>) {
        if (props.disabled) return;
        const files = event.target.files;
        if (props.onFilesAdded && files) {
            const array : Array<File | null> = fileListToArray(files);           
            if(array[0] != null){
                props.onFilesAdded(array);
                setPlaceholder(array[0]!.name);
            }
        }
    }

    function fileListToArray(list : FileList) {
        const array = [];
        for (var i = 0; i < list.length; i++) {
          array.push(list.item(i));
        }
        return array;
    }

    return (
        <div className="Dropzone" onClick={openFileDialog}>
            <img
                alt="upload"
                className="Icon"
                src={Icon}
            />
            <span>{placeholder}</span>
            <input
                ref={fileInputRef}
                className="FileInput"
                type="file"
                onChange={onFilesAdded}
            />
        </div>
    )
}
export default Dropzone;