import React from 'react'
import './UploadFoto.css'

const axios = require("axios");

class ReactUploadImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            prev: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("/upload", formData, config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
            });
    }
    onChange(e) {

        e.target.files[0] === undefined ? '' :
        this.setState({
            file: e.target.files[0],
            prev: URL.createObjectURL(e.target.files[0])
        });

    }

    render() {
        let imgPreview;
        if (this.state.prev) {
            imgPreview = <img src={this.state.prev} alt='' />
        }
        
        return (

            <form onSubmit={this.onFormSubmit}>
                <div className="form-group preview">
                    {imgPreview}
                </div>
                <div className="image-button">
                    <label htmlFor="change-photo">
                        <img src="https://ik.imagekit.io/zvqf9loqe2/VET/Vector__1__wVzNtBzycat.svg" alt="plusbutton"/>
                    </label>
                    <input id='change-photo' type="file" name="myImage" onChange={this.onChange} />
                    <button  type="submit">Upload</button>
                </div>
            </form>
        )
    }
}

export default ReactUploadImage