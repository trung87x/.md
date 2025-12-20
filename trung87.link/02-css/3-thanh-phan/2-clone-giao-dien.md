## (Kỹ năng "Pixel Perfect")

Hãy thử clone một phần của Spotify Player Bar. Đây là bài tập giúp bạn rèn luyện kỹ năng định vị (Positioning) và làm chủ không gian hẹp.

```html
<style>
  .player-bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 90px;
    background: #181818;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
  }
  .track-info {
    display: flex;
    align-items: center;
    width: 30%;
  }
  .track-img {
    width: 56px;
    height: 56px;
    background: #555;
    margin-right: 15px;
  }
  .player-controls {
    width: 40%;
    text-align: center;
  }
  .progress-bar {
    width: 100%;
    height: 4px;
    background: #4f4f4f;
    border-radius: 2px;
    margin-top: 10px;
  }
  .progress-current {
    width: 45%;
    height: 100%;
    background: #1db954;
  }
</style>

<div class="player-bar">
  <div class="track-info">
    <div class="track-img"></div>
    <div><strong>Chạy Ngay Đi</strong><br /><small>Sơn Tùng M-TP</small></div>
  </div>
  <div class="player-controls">
    <div>⏮ ⏸ ⏭</div>
    <div class="progress-bar"><div class="progress-current"></div></div>
  </div>
  <div style="width: 30%; text-align: right;">🔊 ⚙️</div>
</div>
```
