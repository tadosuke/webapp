/**
 * クリックすると値が増えていくボタン
 * 
 * ローカルストレージ保存機能を持ち、リロードしても値が保持されます。
 */
export default {
  name: "ClickCounter",
  data() {
    return {
      count: parseInt(localStorage.getItem('count') || '0', 10),  // ローカルストレージからカウントを読み込む
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
  watch: {
    count(newCount) {
      // count が変更されるたびにローカルストレージを更新
      localStorage.setItem('count', newCount);
    }
  },
  template: `
    <div>
      <button @click="count++" :style="buttonStyle">Count: {{ count }}</button>
    </div>
  `
}
