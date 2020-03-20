import ReactDOM from "react-dom";
import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import { connect} from 'formik'
import "react-image-crop/dist/ReactCrop.css";
import ReactModal from 'react-modal';


class Cropper extends PureComponent {
  state = {
    src: null,
    style: {
      height: '100%',
      width:  '100%'
    }, 
     crop: { 
       unit: '%',
      width: 30,
      aspect: 1 / 1
    }
  };

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      this.setState({show:true})
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.setState({ src: reader.result })
      }
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  render() {
    const { 
      crop, croppedImageUrl, src, 
      show, style
    } = this.state;

    return (
      <div className="cropper-field">
        <div>
          <input type="file" name="thumbnail" onChange={this.onSelectFile} />
        </div>
        {src && (
            <ReactModal isOpen={show}>
          <div style={{height: '300px'}}>
              <ReactCrop
                src={src}
                crop={crop}
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
                style={style}
              />
          </div>

          {croppedImageUrl && (
            <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
          )}
          </ReactModal>
        )}
      </div>
    );
  }
}

export default connect(Cropper)
