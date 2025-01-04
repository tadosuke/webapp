/**
 * クリックするとカウントが増えるボタン
 */
export default {
  name: "ClickCounter",
  data() {
    return {
      count: 0,  // カウント
      buttonStyle: {
        backgroundColor: '#08c',  // 緑色の背景
        color: '#fff',  // 文字色
        border: 'none',  // ボーダーなし
        borderRadius: '5px',  // 角丸
        padding: '10px 20px',  // 内側の余白
        fontSize: '16px',  // フォントサイズ
        cursor: 'pointer',  // カーソルをポインターに
      },  
    };
  },
  template: `
    <div>
      <button @click="count++" :style="buttonStyle">Count: {{ count }}</button>
    </div>
  `
}
