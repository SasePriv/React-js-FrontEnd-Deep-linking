import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import Axios from 'axios'

const PersonalPage = () => {

    const [userInfo, setUserInfo] = useState('')
    const [error, setError] = useState(false)
    // const [errorShare, setErrorShare] = useState(false)
    const { id } = useParams();

    useEffect(async () => {
        const getData = await Axios.post('http://amagpieinthesky.com/back/getName', {name: id})

        console.log(getData.data)

        if(getData.data.message === 'Name not found'){
            setError(true)
        }else{
            setUserInfo(getData.data.data)
        }

    },[])

    const handleShareBtn = async() => {
        const getData = await Axios.post('http://amagpieinthesky.com/back/changestatus', {name: id})
        console.log(getData.data)

        Axios.post('http://amagpieinthesky.com/back/generatedynamiclink', {name: id})
        .then((resp) => {

            if(resp.data.message !== 'error with the server'){

                const link = resp.data.data

                if (navigator.share) {
                    navigator
                      .share({
                        // title: "Test",
                        // text: `Check out this link`,
                        url: link,
                      })
                      .then(() => {
                        console.log('Successfully shared');
                      })
                      .catch(error => {
                        console.error('Something went wrong sharing the blog', error);
                      });
                }else{
                    window.open(link, "_blank")
                }
            }

        })
        .catch((err) => {
            console.log(err)
        })

    }

    return(
        <div className="centered w-100 text-center">
            {error 
            ?
                <h2>User not found</h2>
            :
                <React.Fragment>
                    <h2>This Page is for {userInfo && userInfo.namePage.charAt(0).toUpperCase() + userInfo.namePage.slice(1)}</h2>
                    {navigator.share    }
                    <button onClick={handleShareBtn} type="submit" className="btn btn-primary">Share</button>
                </React.Fragment>
            }
        </div>
    )
};

export default PersonalPage;