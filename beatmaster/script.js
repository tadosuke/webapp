var bpm = 120; // 初期BPM
var interval; // クリック音の間隔を制御するためのタイマー

var clickSound = createAudio('click_sound.mp3');
var backSound = createAudio('back_sound.mp3');

var isPlaying = false; // 再生中フラグ

// オーディオ要素の作成と設定
function createAudio(src) {
  var audio = new Audio(src);
  audio.preload = 'auto';
  return audio;
}

// 再生間隔を計算する
function calculateInterval() {
  var millisecondsPerBeat = (60 / bpm) * 1000; // BPMに基づいて1拍あたりのミリ秒数を計算
  return millisecondsPerBeat;
}

// 音の再生
function playSound(audio) {
  audio.currentTime = 0.05; // 再生する前に再生位置をリセット
  audio.play(); // 音を再生
}

// 再生開始
function startTimer() {
  if (isPlaying) {
    return;
  }
  var intervalDuration = calculateInterval(); // クリック音の間隔を計算
  interval = setInterval(function() {
    playSound(clickSound); // 表拍の音を再生
  }, intervalDuration); // クリック音を再生するタイマーを開始

  isPlaying = true;
}

// 再生停止
function stopTimer() {
  clearInterval(interval); // クリック音を再生するタイマーを停止
  interval = null; // 再生中でないことを示すためにintervalをnullに設定します。
  isPlaying = false; // 再生中フラグをクリアする
}

// スライダーの値に合わせて BPM を変更する
function updateBPM() {
  var slider = document.getElementById('bpmSlider');
  var display = document.getElementById('bpmDisplay');
  bpm = parseInt(slider.value);
  display.textContent = bpm;
  if (interval) {
    clearInterval(interval); // 再生中の場合、現在の再生を停止します。
    isPlaying = false;
    startTimer(); // 新しいBPMで再生を再開します。
  } else {
    startTimer(); // 再生中でない場合、再生を開始します。
  }
}

// 「裏」ボタン要素を取得し、クリックイベントを追加
var backButton = document.getElementById('backButton');
backButton.addEventListener('mousedown', function() {
    playSound(backSound); // 裏拍の音を再生
});

// スペースキーの押下イベントを処理する関数
function handleKeyPress(event) {
  if (event.keyCode === 32) { // スペースキーコード（32）をチェック
    playSound(backSound); // 裏拍の音を再生
  }
}

// キーボードのキー押下イベントを監視
document.addEventListener('keydown', handleKeyPress);
