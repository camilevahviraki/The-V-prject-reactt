import axios from 'axios';

const apiUrl = "http://localhost:3001/";

export const singleFileUpload = async (formData) => {
    try {
        await axios.post("http://localhost:3001/singlefile", formData);
    }catch (error) {
        throw error;
    }
}