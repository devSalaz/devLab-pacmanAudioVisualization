import RAF from "../../src/Utils/RAF";

class SoundReactor {
  constructor(audioUrl) {
    this.ctx = null;
    this.audio = null;
    this.audioSource = null;
    this.analyser = null;
    this.fdata = null;
    this.url = audioUrl;
    this.playFlag = false;
    this.isInitialized = false;
    this.toastCallbackSuccess = null;
    this.toastCallbackError = null;
    this.loadingContainer = null;
    this.bind();
  }

  init() {
    this.ctx = new AudioContext();
    this.audio = new Audio(this.url);
    this.audioSource = this.ctx.createMediaElementSource(this.audio);
    this.analyser = this.ctx.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.8;
    this.peak = 0;

    this.audioSource.connect(this.analyser);
    this.audioSource.connect(this.ctx.destination);
    //this.fdata = new Uint8Array(this.analyser.frequencyBinCount);
    this.fdata = new Uint8Array(256);
    this.audio.currentTime = 0;
    this.audio.loop = true;
    this.audio.volume = 0.3;
    this.isInitialized = true;
    this.audio.addEventListener("loadeddata", this.onAudioLoadedData);
    this.audio.addEventListener("error", this.onAudioError);
  }

  onAudioLoadedData() {
    this.audio.currentTime = 0;
    if (this.playFlag) {
      this.play();
    }
    this.toastCallbackSuccess();
    this.loadingContainer.classList.remove("active");
  }

  onAudioError() {
    this.toastCallbackError();
  }

  setLoadingContainer(loadingContainer) {
    this.loadingContainer = loadingContainer;
  }

  setToastCallBack(toastCallbackSuccess, toastCallbackError) {
    this.toastCallbackSuccess = toastCallbackSuccess;
    this.toastCallbackError = toastCallbackError;
  }

  changeAudioElement(url) {
    this.url = url;
    if (!this.isInitialized) {
      this.init();
    }
    this.audio.src = url;
  }

  play() {
    if (this.isInitialized) {
      this.audio.play();
      this.playFlag = true;
      RAF.subscribe("audioReactorUpdate", this.update);
    }
  }

  pause() {
    if (this.isInitialized) {
      this.audio.pause();
      this.playFlag = false;
      RAF.unsubscribe("audioReactorUpdate");
    }
  }

  update() {
    this.analyser.getByteFrequencyData(this.fdata);
  }

  bind() {
    this.update = this.update.bind(this);
    this.init = this.init.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.changeAudioElement = this.changeAudioElement.bind(this);
    this.setToastCallBack = this.setToastCallBack.bind(this);
    this.onAudioLoadedData = this.onAudioLoadedData.bind(this);
    this.onAudioError = this.onAudioError.bind(this);
    this.setLoadingContainer = this.setLoadingContainer.bind(this);
  }
}

const _instance = new SoundReactor("./music/kirbyTheme.mp3");
export default _instance;
