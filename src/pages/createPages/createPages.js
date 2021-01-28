import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import Axios from 'axios'

const CreatePages = () => {

    const [name, setName] = useState('');
    const [errorToggle, setErrorToggle] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const history = useHistory();

    const handleChange = (event) => {
        setName(event.target.value)
    }

    const validation = () => {
        if (name === '') {
            return false
        }

        return true
    }

    const handleSunmit = async (e) => {
        e.preventDefault();
        const isValidated = validation();


        if(isValidated){
            const resp = await Axios.post('http://amagpieinthesky:5000/createpagename', {name})

            if(resp.data.status === '200'){
                console.log(resp.data)
                if(resp.data.message === 'Name already created'){
                    setErrorToggle(true);
                    setErrorMessage(resp.data.message)
                }else{
                    history.push(`/${name}`);
                }
            }else{
                setErrorToggle(true);
                setErrorMessage(resp.data.message)
            }
        }
    }

    console.log("Err", errorMessage)

    return(
        <div className="centered w-100">
            <form className="form-style">
                <div className="form-group">
                    <label>Email address</label>
                    <input onChange={handleChange} type="text" className="form-control" placeholder="Enter Name" value={name}/>
                </div>
                <button onClick={handleSunmit} type="submit" className="btn btn-primary">Submit</button>
                { errorToggle && <div>{errorMessage}</div> }
            </form>
        </div>
    )
};

export default CreatePages;