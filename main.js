const musicContainer = document.querySelector('.music-container')
const infoSection = document.querySelector('.info-section')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.scrubber')
const progressContainer = document.querySelector('.scrubber-section')
const timeSubsection = document.querySelector('.time-subsection')
const title = document.querySelector('#title')
const author = document.querySelector('#author')
const cover = document.querySelector('#cover')
const backgroundColor = document.querySelector('.accents')
const currTime = document.querySelector('#currTime')
const durTime = document.querySelector('#durTime')

// Songs
const songs = [
    'Better Days',
    'Aidan',
    'April Kisses',
    'Autumn Sun',
    'Best Part of Me',
    'Colorful World',
    'Fly or Die',
    'Fraggle',
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
    

    accents = [
        // Better Days
        'linear-gradient(to bottom, #b45309, #111827)',

        // Aidan
        'linear-gradient(to bottom, #3d5375, #111827)',
        
        // April Kisses
        'linear-gradient(to bottom, #ffffff, #000000)',

        // Autumn Sun
        'linear-gradient(to bottom, #BA5333, #000000)',

        // Best Part of Me
        'linear-gradient(to bottom, #5178B4, #111827)',

        // Colorful World
        'linear-gradient(to bottom, #a2b698, #111827)',

        // Fly or Die
        'linear-gradient(to bottom, #feeb7b, #bf321b)',

        // Fraggle
        'linear-gradient(to bottom, #44949c, #a2b698)',

        // I Can't Make You Love Me
        'linear-gradient(to bottom, #C9BEC8, #111827)',

        // Just Relax
        'linear-gradient(to bottom, #D85B7B, #814C9C)',

        // Local Forecast - Elevator
        'linear-gradient(to bottom, #D77DB6, #111827)',

        // MEET ME AT THE TOP
        'linear-gradient(to bottom, #DDB496, #6C4E37)',

        // Perfect
        'linear-gradient(to bottom, #DEE4EC, #277EB5)',

        // Polarity
        'linear-gradient(to bottom, #1115ff, #111827)',

        // Salsa After Work Party
        'linear-gradient(to bottom, #B03A2E, #5B2C6F)',

        // The Paranormal is Real
        'linear-gradient(to bottom, #75663e, #111827)',

        // Upbeat Funk Pop
        'linear-gradient(to bottom, #f2c446, #8c4322)',

        // Voices of Spring
        'linear-gradient(to bottom, #4a4831, #4e5425)',

        // Your Shoulder
        'linear-gradient(to bottom, #A463FF, #E591FF)',
    ]


// Keep track of songs and authors
let songIndex = 0
let authorIndex = 0

// Initially load song info DOM
loadSongInfo(songs[songIndex], authors[authorIndex])

// Update song details
function loadSongInfo(song, artist) {
    title.innerText = song
    author.innerText = artist
    audio.src=`songs/${song}.mp3`
    cover.src=`albumart/${song}.jpg`

    transitionAnimation()
    

    const brightAccents = ['Fly or Die', 'Fraggle', 'MEET ME AT THE TOP', 'Paranormal is Real', 'Your Shoulder', 'Upbeat Funk Pop']
    if (brightAccents.includes(song))
    {
        author.style.color = title.style.color = timeSubsection.style.color = '#444444';
        progress.style.background = '#444444';
    }

    else
    {
        progress.style.color = title.style.color = '#ffffff'
        progress.style.background = '#ffffff';

        author.style.color = timeSubsection.style.color = '#9ca3af'
    }

    const currentBackground = accents[songIndex]
    backgroundColor.style.background = currentBackground;
}

function transitionAnimation() {
    cover.classList.remove('fade-in')
    cover.offsetWidth
    cover.classList.add('fade-in')

    title.classList.remove('slide-in')
    title.offsetWidth
    title.classList.add('slide-in')

    author.classList.remove('slide-in')
    author.offsetWidth
    author.classList.add('slide-in')
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
    songIndex--
    authorIndex--

    if(songIndex < 0) {
        songIndex = songs.length - 1
        authorIndex = authors.length - 1
    }

    loadSongInfo(songs[songIndex], authors[authorIndex])

    playSong()
}

function nextSong() {
    songIndex++
    authorIndex++

    if (songIndex > songs.length - 1) {
        songIndex = 0
        authorIndex = 0
    }

    loadSongInfo(songs[songIndex], authors[authorIndex])

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

  //get duration & currentTime for Time of song
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min >10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d >10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	durTime.innerHTML = min_d +':'+ sec_d;
		
};

// Change song events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);

audio.addEventListener('timeupdate',DurTime);