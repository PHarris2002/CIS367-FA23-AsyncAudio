const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const author = document.querySelector('#author')
const cover = document.querySelector('#cover')
const backgroundColor = document.querySelector('.accents')

// Songs
const songs = [
    'Better Days',
    'Aidan',
    'April Kisses',
    'Autumn Sun',
    'Best Part of Me',
    'Fly or Die',
    'Fraggle',
    'Colorful World',
    "I Can't Make You Love Me",
    'Just Relax',
    'Local Forecast - Elevator',
    'MEET ME AT THE TOP',
    'Paranormal is Real',
    'Perfect',
    'Polarity',
    'Salsa After-Work Party',
    'Upbeat Funk Pop',
    'Voices of Spring',
    'Your Shoulder']

// Authors
const authors = [
    'LAKEY INSPIRED',
    'Jonathan Ceaser',
    'Eddie Lang',
    'Bryce Greene',
    'The Dunwells',
    'Levi Holland',
    'Levi Holland',
    'JUQBOXMUSIC',
    'Bryce Greene',
    'Purrple Cat',
    'Kevin MacLeod',
    'GMoneyOnTheBeat',
    'Leonell Cassio',
    'Ed Sheeran',
    'Ethos',
    'Dee Yan-Key',
    'Scott Holmes Music',
    'Johann Strauss',
    'Kaitlyn Thompson']
    
const acc = [
        // Aidan
        'Aidan_Acc',
       
        // April Kisses
        'April_Acc',

        // Autumn Sun
        'Aut_Acc',

        // Best Part of Me
        'Best_Acc',

        // Better Days
        'Bet_Acc',

        // Colorful World
        'Col_Acc',

        // Fly or Die
        'Fly_Acc',

        // Fraggle
        'Frag_Acc',

        // I Can't Make You Love Me
        'Love_Acc',

        // Just Relax
        'Just_Acc',

        // Local Forecast - Elevator
        'Local_Acc',

        // MEET ME AT THE TOP
        'Meet_Acc',

        // Perfect
        'Perfect_Acc',

        // Polarity
        'Pol_Acc',

        // Salsa After Work Party
        'Salsa_Acc',

        // The Paranormal is Real
        'Para_Acc',

        // Upbeat Funk Pop
        'Upbeat_Acc',

        // Voices of Spring
        'Voices_Acc',

        // Your Shoulder
        'Shoulder_Acc'
]


// Keep track of songs and authors
let songIndex = 0
let authorIndex = 0
let accIndex = 0
let accRemoval = accIndex - 1

// Initially load song info DOM
loadSongInfo(songs[songIndex], authors[authorIndex], acc[accIndex])

// Update song details
function loadSongInfo(song, artist, acc) {
    title.innerText = song
    author.innerText = artist
    audio.src=`songs/${song}.mp3`
    cover.src=`albumart/${song}.jpg`

    backgroundColor.classList.add(`from-${acc}`)
    backgroundColor.classList.add(`to-${acc}_2`)

}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('.play-button').classList.remove('fa-play')
    playBtn.querySelector('.play-button').classList.add('fa-pause')

    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('.play-button').classList.add('fa-play')
    playBtn.querySelector('.play-button').classList.remove('fa-pause')
    
    audio.pause()
}

function prevSong() {
    backgroundColor.classList.remove(`from-${acc[accIndex]}`)
    backgroundColor.classList.remove(`to-${acc[accIndex]}_2`)

    songIndex--
    authorIndex--
    accIndex--

    if(songIndex < 0) {
        songIndex = songs.length - 1
        authorIndex = authors.length - 1
        accIndex = acc.length - 1
    }

    loadSongInfo(songs[songIndex], authors[authorIndex], acc[accIndex])

    playSong()
}

function nextSong() {
    backgroundColor.classList.remove(`from-${acc[accIndex]}`)
    backgroundColor.classList.remove(`to-${acc[accIndex]}_2`)

    songIndex++
    authorIndex++
    accIndex++

    if (songIndex > songs.length - 1) {
        songIndex = 0
        authorIndex = 0
        accIndex = 0
    }

    loadSongInfo(songs[songIndex], authors[authorIndex], acc[accIndex])

    playSong()
}

function updateProgress(e) {
   const {duration, currentTime} = e.srcElement
   const progressPercent = (currentTime/duration) * 100
   progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX/width) * duration
}

// Event Listeners
playBtn.addEventListener('click', ()=> {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
        pauseSong()
        
    } else {
        playSong()
    }
})

// Change song events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)