/**
 * ドット絵エディタ
 */
export default {
  name: "DotEditor",
  data() {
    return {
      canvasWidth: 320, // キャンバスの幅
      canvasHeight: 320, // キャンバスの高さ
      currentColor: "#000000", // 現在の描画色
      isDrawing: false, // 描画中かどうか
      ctx: null, // Canvasの2Dコンテキスト
      cellSize: 16, // ドットのサイズ
      canvasStyle: { border: '1px solid #000', cursor: 'crosshair' }, // キャンバスのスタイル
      controlsStyle: { margin: '10px' }, // コントロールパネルのスタイル
    };
  },
  mounted() {
    const canvas = this.$refs.canvas;
    this.ctx = canvas.getContext("2d"); // コンテキスト取得
    this.clearCanvas(); // キャンバス初期化
  },
  methods: {
    // 描画開始（マウスが押されたとき）
    startDrawing(event) {
      this.isDrawing = true;
      this.draw(event);
    },
    // 描画（マウスを動かすたびに）
    draw(event) {
      if (!this.isDrawing) return;
      const { left, top } = this.$refs.canvas.getBoundingClientRect(); // キャンバス位置
      const x = Math.floor((event.clientX - left) / this.cellSize) * this.cellSize;
      const y = Math.floor((event.clientY - top) / this.cellSize) * this.cellSize;
      this.ctx.fillStyle = this.currentColor;
      this.ctx.fillRect(x, y, this.cellSize, this.cellSize); // ドット描画
    },
    // 描画停止（マウスを離したとき）
    stopDrawing() {
      this.isDrawing = false;
    },
    // キャンバスをクリア
    clearCanvas() {
      this.ctx.fillStyle = "#FFFFFF";
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight); // 背景塗りつぶし
    },
    // キャンバスを画像として保存
    saveAsPng() {
      const link = document.createElement("a");
      link.download = "dot-art.png";
      link.href = this.$refs.canvas.toDataURL("image/png");
      link.click(); // ダウンロード開始
    },
  },
  template: `
    <div class="controls" :style="controlsStyle">
      <input type="color" v-model="currentColor"> <!-- 色選択 -->
      <button @click="clearCanvas">クリア</button> <!-- キャンバスクリア -->
      <button @click="saveAsPng">保存</button> <!-- 画像保存 -->
    </div>
    <canvas 
      ref="canvas" 
      :width="canvasWidth" 
      :height="canvasHeight"
      :style="canvasStyle"
      @mousedown="startDrawing" 
      @mousemove="draw" 
      @mouseup="stopDrawing" 
      @mouseleave="stopDrawing"
    ></canvas>
  `
}
