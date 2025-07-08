const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const STORAGE_KEY = "MP3_PLAYER_CONFIG";
const VOLUME_KEY = "MP3_VOLUME_CONFIG";
const THEME_KEY = "MP3_DARK_MODE";

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isDarkMode: false,

    h2HeaderElement: $("header h2"),
    cdThumb: $(".cd-thumb"),
    audio: document.getElementById("audio"),
    playBtn: $(".btn-toggle-play"),
    repeatBtn: $(".btn-repeat"),
    randomBtn: $(".btn-random"),
    nextBtn: $(".btn-next"),
    prevBtn: $(".btn-prev"),
    progress: document.getElementById("progress"),
    songs: [
        {
            name: "Caravan Of Life",
            singer: "Tokyo Square",
            path: "./assets/music/CaravanOfLife.mp3",
            image: "./assets/img/song1.jpg"
        },
        {
            name: "Within You'll Remain",
            singer: "Tokyo Square",
            path: "./assets/music/WithinYou'llRemain.mp3",
            image: "./assets/img/song2.jpg"
        },
        {
            name: "Willow",
            singer: "Jasmine Thompson",
            path: "./assets/music/Willow.mp3",
            image: "./assets/img/song3.jpg"
        },
        {
            name: "That's My Goal",
            singer: "Shayne Ward",
            path: "./assets/music/That'sMyGoal.mp3",
            image: "./assets/img/song4.jpg"
        },
        {
            name: "Somebody's Me",
            singer: "Enrique Iglesias",
            path: "./assets/music/Somebody'sMe.mp3",
            image: "./assets/img/song5.jpg"
        },
        {
            name: "Betrayal",
            singer: "Michael Learn To Rock",
            path: "./assets/music/Betrayal.mp3",
            image: "./assets/img/song3.jpg"
        }
    ],
    loadConfig: function () {
        const stored = localStorage.getItem("MP3_PLAYER_CONFIG");
        const config = stored ? JSON.parse(stored) : {};
        console.log("load:" + config.currentIndex);

        if (config.hasOwnProperty("isRandom")) {
            this.isRandom = config.isRandom;
            if (this.isRandom) {
                this.randomBtn.classList.add("active");
            }
        }
        if (config.hasOwnProperty("isRepeat")) {
            this.isRepeat = config.isRepeat;
            if (this.isRepeat) {
                this.repeatBtn.classList.add("active");
            }
        }
        if (config.hasOwnProperty("currentIndex") && config.currentIndex < this.songs.length) {
            this.currentIndex = config.currentIndex;
        }
    },
    defineProperties: function () {
        const _this = this;
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return _this.songs[_this.currentIndex];
            }
        })
    },
    toggleDarkMode: function () {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle("dark", this.isDarkMode);
        localStorage.setItem(THEME_KEY, JSON.stringify(this.isDarkMode));
        // Đổi icon
        if (this.isDarkMode) {
            this.darkToggleIcon.classList.remove("fa-moon");
            this.darkToggleIcon.classList.add("fa-sun");
        } else {
            this.darkToggleIcon.classList.remove("fa-sun");
            this.darkToggleIcon.classList.add("fa-moon");
        }
    },

    loadDarkMode: function () {
        const stored = localStorage.getItem(THEME_KEY);
        const isDark = stored ? JSON.parse(stored) : false;
        this.isDarkMode = isDark;
        if (this.isDarkMode) {
            document.body.classList.add("dark");
        }
        // Cập nhật icon khi load
        if (this.darkToggleIcon) {
            this.darkToggleIcon.classList.toggle("fa-sun", this.isDarkMode);
            this.darkToggleIcon.classList.toggle("fa-moon", !this.isDarkMode);
        }
    },
    render: function () {
        const htmls = this.songs.map(song => {
            return `
                <div class="song">
                    <div class="thumb" style="background-image: url('${song.image}')"></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        });
        const playlistElement = $(".playlist");
        playlistElement.innerHTML = htmls.join("");
    },
    loadCurrentSong: function () {
        const currentSong = this.songs[this.currentIndex];
        this.h2HeaderElement.innerText = `${currentSong.name}`;
        this.cdThumb.style.backgroundImage = `url("${currentSong.image}")`;
        this.audio.src = currentSong.path;
    },
    playSong: function () {
        this.audio.play();
        this.isPlaying = true;
        this.playBtn.classList.add("playing");
        this.cdThumb.classList.add("rotating");
        const songList = $$(".song");
        this.updateActiveSong();
    },
    updateActiveSong: function () {
        $$(".song").forEach(song => song.classList.remove("active"));
        $$(".song")[this.currentIndex]?.classList.add("active");
    },
    pauseSong: function () {
        this.audio.pause();
        this.isPlaying = false;
        this.playBtn.classList.remove("playing");
        this.cdThumb.classList.remove("rotating");
        this.playBtn.querySelector(".icon-pause").style.display = "none";
        this.playBtn.querySelector(".icon-play").style.display = "inline";
    },
    nextSong: function () {
        const songsLeght = this.songs.length - 1;
        this.currentIndex === songsLeght ? this.currentIndex = 0 : this.currentIndex += 1;
        this.loadCurrentSong();
        if (this.isPlaying) this.playSong();
        this.saveConfig();
    },
    prevSong: function () {
        this.currentIndex === 0 ? this.currentIndex = (this.songs.length - 1) : this.currentIndex -= 1;
        this.loadCurrentSong();
        if (this.isPlaying) this.playSong();
        this.saveConfig();
    },
    playRandomSong: function () {
        if (this.songs.length === 1) return;
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        // console.log(this.currentIndex);
        this.loadCurrentSong();
        if (this.isPlaying) this.playSong();
        this.saveConfig();
    },
    toggleRandom: function () {
        this.isRandom = !this.isRandom;
        this.randomBtn.classList.toggle("active", this.isRandom);
        this.saveConfig();
    },
    toggleRepeat: function () {
        this.isRepeat = !this.isRepeat;
        this.repeatBtn.classList.toggle("active", this.isRepeat);
        this.saveConfig();
    },
    handleProgress: function () {
        if (this.audio.duration) {
            let percentTime = Math.floor(this.audio.currentTime / this.audio.duration * 100);
            this.progress.value = percentTime;
        };
    },
    handleSeek: function () {
        this.progress.oninput = () => {
            if (this.audio.duration) {
                const seekPercent = this.progress.value;
                const newTime = (seekPercent / 100) * this.audio.duration;
                this.audio.currentTime = newTime;
            }
        }
    },
    handleEnded: function () {
        this.audio.onended = () => {
            if (this.isRepeat) {
                return this.playSong();
            }
            if (this.isRandom) {
                return this.playRandomSong();
            }
            this.nextSong();
        };
    },
    handlePlaylistClick: function () {
        const playList = $(".playlist");
        playList.onclick = (e) => {
            const songNode = e.target.closest(".song:not(.active)");
            if (songNode && !e.target.closest(".option")) {
                const songElements = $$(".song");
                const index = [...songElements].indexOf(songNode);
                this.currentIndex = index;
                this.loadCurrentSong();
                this.isPlaying ? this.playSong() : this.updateActiveSong();
                this.saveConfig();
            }
        }
    },
    initTimeDisplayElements: function () {
        const timeElement = this.progress.parentNode;
        const currentTimeElement = document.createElement("span");
        const durationElement = document.createElement("span");
        currentTimeElement.classList.add("time-current");
        durationElement.classList.add("time-duration");
        let timeDefault = "00:00";
        currentTimeElement.textContent = timeDefault;
        durationElement.textContent = timeDefault;
        const timeContainer = document.createElement("div");
        timeContainer.classList.add("time-display");
        timeContainer.appendChild(currentTimeElement);
        timeContainer.appendChild(durationElement);
        timeElement.insertBefore(timeContainer, this.progress);
        this.currentTimeElement = currentTimeElement;
        this.durationElement = durationElement;
    },
    formatTime: function (seconds) {
        seconds = Math.floor(seconds);
        let newMinutes = Math.floor(seconds / 60);
        let newSeconds = Math.floor(seconds) % 60;
        if (newMinutes < 10) newMinutes = `0${newMinutes}`;
        if (newSeconds < 10) newSeconds = `0${newSeconds}`;
        return `${newMinutes}:${newSeconds}`;
    },
    handleLoadedMetadata: function () {
        if (this.audio.duration) {
            this.durationElement.textContent = this.formatTime(this.audio.duration);
        }
    },
    displayTimeInfo: function () {
        if (this.audio.duration) {
            let formatCurrentTime = this.formatTime(this.audio.currentTime);
            this.currentTimeElement.textContent = formatCurrentTime;
            // console.log(formatCurrentTime);
        }
    },
    initVolumeElements: function () {
        const controlElement = $(".control");
        const volumeContainer = document.createElement("div");
        volumeContainer.classList.add("volume-control");
        controlElement.appendChild(volumeContainer);
        const volumeIcon = document.createElement("i");
        volumeIcon.classList.add("volume-icon", "fas", "fa-volume-up");
        const volumeInput = document.createElement("input");
        volumeInput.type = "range";
        volumeInput.min = 0;
        volumeInput.max = 100;
        volumeInput.step = 1;
        volumeInput.value = 50;
        volumeContainer.appendChild(volumeIcon);
        volumeContainer.appendChild(volumeInput);
        this.volumeIcon = volumeIcon;
        this.volumeInput = volumeInput;
    },
    handleVolumeControl: function () {
        this.volumeInput.oninput = () => {
            const volumeValue = parseFloat(this.volumeInput.value) / 100;
            this.audio.volume = volumeValue;
            if (volumeValue > 0) {
                this.audio.muted = false;
                this.volumeIcon.classList.remove("fa-volume-mute");
                this.volumeIcon.classList.add("fa-volume-up");
            }
            if (volumeValue === 0) {
                this.volumeIcon.classList.remove("fa-volume-up");
                this.volumeIcon.classList.add("fa-volume-mute");
            }
            this.saveVolumeConfig();
        }
        this.volumeIcon.onclick = () => {
            const isMuted = this.audio.muted || this.audio.volume === 0;
            if (isMuted) {
                this.audio.muted = false;
                this.volumeInput.value = this.lastVolume || 50;
                this.audio.volume = parseFloat(this.volumeInput.value) / 100;
                this.volumeIcon.classList.remove("fa-volume-mute");
                this.volumeIcon.classList.add("fa-volume-up");
            } else {
                this.lastVolume = this.volumeInput.value;
                this.audio.muted = true;
                this.volumeInput.value = 0;
                this.audio.volume = 0;
                this.volumeIcon.classList.remove("fa-volume-up");
                this.volumeIcon.classList.add("fa-volume-mute");
            }
            this.saveVolumeConfig();
        }
    },
    saveVolumeConfig: function () {
        const volumeConfig = {
            isMuted: this.audio.muted,
            currentVolume: this.audio.volume
        }
        const configString = JSON.stringify(volumeConfig);
        // console.log(configString);
        localStorage.setItem(VOLUME_KEY, configString);
    },
    loadVolumeConfig: function () {
        const stored = localStorage.getItem("MP3_VOLUME_CONFIG");
        const config = stored ? JSON.parse(stored) : {};
        // console.log(`config: ${config.isMuted} ${config.currentVolume}`);

        if (config.hasOwnProperty("isMuted")) {
            this.audio.muted = config.isMuted;
            this.isMuted = config.isMuted;
        }

        if (config.hasOwnProperty("currentVolume")) {
            this.audio.volume = config.currentVolume;
            this.volumeInput.value = config.currentVolume * 100;
        }

        // Cập nhật icon
        if (this.audio.muted || this.audio.volume === 0) {
            this.volumeIcon.classList.remove("fa-volume-up");
            this.volumeIcon.classList.add("fa-volume-mute");
        } else {
            this.volumeIcon.classList.remove("fa-volume-mute");
            this.volumeIcon.classList.add("fa-volume-up");
        }
    },
    handleEvents: function () {
        this.playBtn.onclick = () => {
            this.isPlaying ? this.pauseSong() : this.playSong();
        }

        this.nextBtn.onclick = () => {
            this.isRandom ? this.playRandomSong() : this.nextSong();
        }

        this.prevBtn.onclick = () => {
            this.isRandom ? this.playRandomSong() : this.prevSong();
        }

        this.randomBtn.onclick = () => {
            this.toggleRandom();
        }

        this.repeatBtn.onclick = () => {
            this.toggleRepeat();
        }

        this.audio.ontimeupdate = () => {
            this.handleProgress();
            this.displayTimeInfo();
        }

        this.handleSeek();
        this.handleEnded();
        this.handlePlaylistClick();
        this.audio.onloadedmetadata = this.handleLoadedMetadata.bind(this);
        this.handleVolumeControl();
        const darkToggle = $(".darkmode-toggle");
        if (darkToggle) {
            this.darkToggleIcon = darkToggle.querySelector("i"); // <-- Gán icon vào biến
            darkToggle.onclick = () => {
                this.toggleDarkMode();
            }
        }
    },
    saveConfig: function () {
        const config = {
            isRandom: this.isRandom,
            isRepeat: this.isRepeat,
            currentIndex: this.currentIndex
        }
        const configString = JSON.stringify(config);
        console.log(config);
        localStorage.setItem(STORAGE_KEY, configString);
    },
    start: function () {
        this.loadConfig();
        this.defineProperties();
        this.render();
        this.loadCurrentSong();
        this.initTimeDisplayElements();
        this.initVolumeElements();
        this.loadVolumeConfig();
        this.handleEvents();
        this.loadDarkMode();
    }
}

app.start();