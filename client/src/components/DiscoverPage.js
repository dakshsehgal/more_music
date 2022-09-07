import { useState, useEffect } from 'react'
import './css/discover.css'
import { useLocation } from 'react-router-dom';
import SpotifyRequester from '../services/SpotifyRequestHandler'
import Canvas from './visualizer';
import { useNavigate } from "react-router-dom";
const seeds = require('./seeds.js')

export const DiscoverPage = () => {

    let navigate = useNavigate();
    const [track, setTrack] = useState(useLocation().state[0])
    //const [audio, setAudio] = useState(new Audio(track.preview));
    //var playing = false

    // audio.addEventListener('loadeddata', () => {
    //     console.log('the event listener ran')
    // })

    // const toggle = () => {
    //     if (track.preview) {
    //         playing = !playing;
    //         playing ? audio.play() : audio.pause()
    //     } else {
    //         console.log('sorry, cant play this song')
    //     }
    // }

    // useEffect(() => {
    //     audio.addEventListener('ended', () => playing = false);
    //     return () => {
    //         audio.removeEventListener('ended', () => playing = false);
    //     };
    // }, []);

    var features = { 'hello': 'world' }

    useEffect(() => {
        SpotifyRequester.getFeatures(track.id)
            .then(res => {

                features = res.data
                console.log('audio features are ', features)
            })
    }, [track])


    const requestRecommendation = (seed) => {
        SpotifyRequester.getRecommendation(seed)
            .then(result => {
                console.log('the result transmitted to the frontend is', result)
                var artistList = []

                for (var j = 0; j < result.data.body.tracks[0].artists.length; j++) {
                    artistList[j] = result.data.body.tracks[0].artists[j].name
                }
                const trackAfter = {
                    "name": result.data.body.tracks[0].name,
                    "img_url": result.data.body.tracks[0].album.images[1].url,
                    "artists": artistList,
                    "id": result.data.body.tracks[0].id,
                    "preview": result.data.body.tracks[0].preview_url
                }
                setTrack(trackAfter)
                //audio.pause()
                if (trackAfter.preview) {
                    console.log('new track was loaded, and track.preview should have been updated')
                    //setAudio(new Audio(trackAfter.preview))
                } else {

                    //setAudio(null)
                    console.log('preview url not found')
                }
            })
            .catch(error => console.log(error))
    }

    
   


    return (
        <div className='page'>
            <div className='left col'>
                <p className='left-arrow-label'></p>
                <div className='left-arrow' onClick={() => requestRecommendation(seeds.getSadderSong(track.id, features))}></div>
                
            </div>
            <div className='middle col'>
                <div className="container">
                    <p className='logo'><a onClick={() => navigate('/')}>MORE_MUSIC </a></p>
                    <img src={track.img_url} className='album-cover' />
                    <p className='track-name'>{track.name}</p>
                    <p className='artists'>
                        {track.artists.join(', ')}
                    </p>
                    {/* {track.preview ? <button onClick={toggle} className='toggle-button'>Play/Pause</button> : ''} */}
                    {track.preview ?
                    <div className='visualizer-container'>
                        <Canvas song={track.preview} className='visualizer' />
                    </div> : ''}
                </div>
            </div>
            <div className='right col'>
                <p className='right-arrow-label'></p>
                <div className='right-arrow' onClick={() => requestRecommendation(seeds.getMoreHypeSong(track.id, features))}></div>

            </div>
        </div>
    );
}
