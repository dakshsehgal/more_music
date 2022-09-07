
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SpotifyRequester from '../services/SpotifyRequestHandler'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './css/landing.css'


export const Landing = () => {
    const navigate = useNavigate()
    const [results, setResults] = useState([])

    const handleTrackChange = (event) => {
        if (event.target.value.length >= 4) {
            SpotifyRequester.search(event.target.value)
                .then(response => {
                    setResults(response.data)
                })
                .catch(err => console.log(err.message))
        }
    }

    const trackSubmit = (trackAfter) => {
        console.log('the prop that will be passed is ', trackAfter)
        navigate('/discover', { replace: true, state: trackAfter })
    }

    return (
        <div className="Landing">
            <div className="container-landing">
                <p className='logo-landing'><strong>MORE_MUSIC</strong></p>
                <p className='searchbar-text'>Give me a song.</p>
                <Autocomplete
                    className='search-bar'
                    freeSolo
                    options={results.map((track) => track.name + " - " + track.artists)}
                    onChange={(e, val) => {
                        const trackAfter = results.filter(track => {
                            return track.name + ' - ' + track.artists === val
                        })
                        trackSubmit(trackAfter)
                    }}
                    renderInput={(params) => <TextField {...params} onChange={handleTrackChange} />}
                />
            </div>

        </div>
    );
}
