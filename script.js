document.addEventListener('DOMContentLoaded', () => {
    const currentTimeLine = document.getElementById('current-time-line');
    const timeline = document.querySelector('.timeline');

    // 当日の9:00からの時間を取得
    function getCurrentTimeInMinutes() {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);
        const diffInMs = now - startOfDay;
        return Math.floor(diffInMs / 60000);
    }

    // 線を時刻に合わせる
    function positionCurrentTimeLine() {
        const currentTimeInMinutes = getCurrentTimeInMinutes();
        currentTimeLine.style.left = `${(currentTimeInMinutes / 5)*12}px`
        console.log("updated position")
    }

    // スクロール位置を線に合わせる
    function scrollToCurrentTime() {
        const currentTimeInMinutes = getCurrentTimeInMinutes();
        const currentTimeColumn = Math.floor(currentTimeInMinutes / 5) + 1; // Adjust for 0-based index
        const scrollPosition = currentTimeColumn * 12 - (window.innerWidth / 2); // 12px per 5 minutes
        timeline.scrollLeft = scrollPosition;
        console.log("scroll successfully")
    }

    // 1時間ごとに縦線を表示させたいな
    function makeHourLine() {
        for (let n = 0; n < 10; n++) {
            const newHourLine = document.createElement("div");
            newHourLine.style.position = "absolute"
            newHourLine.style.width = "1.5px"
            newHourLine.style.backgroundColor = "gray"
            newHourLine.style.height = "100%"
            newHourLine.style.gridColumn = 12 * n + 1
            const current = document.getElementsByClassName("schedule")[0]
            current.appendChild(newHourLine);
        };
    };


    makeHourLine()

    // メインスレッドの処理完了後に~みたいな
    setTimeout(scrollToCurrentTime, 0);
    setTimeout(positionCurrentTimeLine, 0)

    setInterval(positionCurrentTimeLine,60000)

    // settimeout...
});
