const API_KEY = "625a424f8db3eaeb4a4e2b020bcb5df9";
const CITY_NAME = "東京";
const API = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${API_KEY}&lang=ja&units=metric`;


//日時の表示
for (let i = 1; i < 6; i++) {
    const NOW_TIME = new Date();
    NOW_TIME.setDate(NOW_TIME.getDate() + i);
    const YEAR = NOW_TIME.getFullYear();
    const MONTH = add_0(NOW_TIME.getMonth() + 1);
    const DAY = NOW_TIME.getDate();
    document.getElementById("day" + i).innerHTML = `${YEAR}-${MONTH}-${DAY}`
}

//時刻のフォーマットを整形する
function add_0(time) {
    return String(time).padStart(2, '0')
}

//現在時刻を取得する
function get_time() {
    const NOW_TIME = new Date();
    const NOW_MONTH = add_0(1 + NOW_TIME.getMonth());
    const NOW_YEAR = add_0(NOW_TIME.getFullYear());
    const NOW_DAY = add_0(NOW_TIME.getDate());
    const NOW_HOUR = add_0(NOW_TIME.getHours());
    const NOW_MINUTE = add_0(NOW_TIME.getMinutes());
    const NOW_SECOND = add_0(NOW_TIME.getSeconds());
    document.getElementById('time').innerHTML = `${NOW_YEAR}/${NOW_MONTH}/${NOW_DAY} ${NOW_HOUR}:${NOW_MINUTE}:${NOW_SECOND}`;
}
setInterval(get_time, 1000);


//HTMLの文を取り出す
function get_id(day_str) {
    document.getElementById('day_view').innerHTML = day_str.innerHTML
    for (let i = 1; i < 6; i++) {
        let loop_str = "weather" + i
        document.getElementById(loop_str).innerHTML = get_weather(day_str.innerHTML);
    }
}

//日時をもとにAPIデータを取得
async function get_weather(select_time) {
    const API_RESPONSE = await fetch(API);
    const JSON = await API_RESPONSE.json();
    const JSON_LIST = JSON.list;
    console.log(JSON_LIST.length)
    let temp_array = [];
    select_time = select_time.innerHTML;
    for (let i = 0; i < JSON_LIST.length; i++) {
        if (JSON_LIST[i].dt_txt.startsWith(select_time)) {
            // console.log(JSON_LIST[i].dt_txt + "は" + JSON_LIST[i].main.temp + "℃ 天気は" + JSON_LIST[i].weather[0].description)
            temp_array.push(JSON_LIST[i].main.temp);
        }
    };
    console.log(temp_array)
    const MAX_TEMP =temp_array.reduce((a,b)=>a>b?a:b);
    const MIN_TEMP =temp_array.reduce((a,b)=>a<b?a:b);
    document.getElementById('day_view').innerHTML = select_time
    document.getElementById('weather1').innerHTML = `最高気温: ${MAX_TEMP}℃`
    document.getElementById('weather2').innerHTML = `最低気温: ${MIN_TEMP}℃`
};