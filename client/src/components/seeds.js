
const getMoreHypeSong = (trackId, features) => {
    const seed = {
        seed_tracks: [trackId],
        min_energy: (features.energy + 0.1 > 1) ? 1 : features.energy + 0.1
    }
    return seed
}

const getFasterSong = (trackId, features) => {
    const seed = {
        seed_tracks: [trackId],
        min_tempo: features.tempo + 10
    }
    return seed
}

const getHappierSong = (trackId, features) => {
    const seed = {
        seed_tracks: [trackId],
        min_valence: (features.valence + 0.1 > 1) ? 1 : features.valence + 0.1
    }
    return seed
}

const getSadderSong = (trackId, features) => {
    const seed = {
        seed_tracks: [trackId],
        max_valence: (features.valence - 0.2 <= 0.1) ? 0.2 : features.valence - 0.2
    }
    return seed
}



const getGroovierSong = (trackId, features) => {
    const seed = {
        seed_tracks: [trackId],
        min_danceability: (features.danceability + 0.1 > 1) ? 1 : features.danceability + 0.1
    }
    return seed
}



module.exports = {
    getMoreHypeSong, getFasterSong, getGroovierSong, getHappierSong, getSadderSong
}