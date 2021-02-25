/** promise涵式測試 */

/** 
 * promise涵式用法測試 
 * 介紹:
 *      promise簡單來說就是callback，
 *      然而傳統callback容易形成巢狀型式
 *      不容易維護，因此使用promise代替
 */
const promiseTest = (timeout) => {
    alert("測試開始");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //成功
            resolve(`${timeout/1000}秒 成功`);
        }, timeout);

        if (timeout == 0) {
            //失敗
            reject(new Error('失敗'));
        }
    });
}

/** 
 * 簡單構思:promiseTest function會回傳兩個function，
 * 分別是resolve()和reject()，而利用then來接收resolve()，
 * 利用catch來接收reject()，而一般把resolve()定義為成功
 * reject()定義為失敗
 */
const promise1 = (timeout) => {
    promiseTest(timeout).then((response) => {
        alert(`執行成功 ${response}`);
    }).catch((error) => {
        alert(`錯誤 ${error}`);
    })
}

/**
 * promiseTest 串接 想比於無限巢狀容易觀看
 *  
 * 無限巢狀 EX:
 *   setTimeout(() => {
            //成功
            resolve(`${timeout/1000}秒 成功`);
            setTimeout(() => {
                //成功
                resolve(`${timeout/1000}秒 成功`);
            }, timeout);
        }, timeout);
 * 執行結果與下面相同
 * 
 */
const promiseChain = () => {
    promiseTest(1000).then((response) => {
        alert(`執行成功1 ${response}`);
        //回傳給下一個then接收
        return promiseTest(2000)
    }).then((response) => {
        alert(`執行成功2 ${response}`);
    }).catch((error) => {
        calert(`錯誤 ${error}`);
    })

}

/** 
 * Promise.all([...promises...]);  
 * 會等待Promise.all裡面的所有程式執行成功時才會輸出
 * 
 */

/** success */
const promiseSuccess = () => {
    Promise.all([
        new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
        new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
        new Promise(resolve => setTimeout(() => resolve(3), 1000)) // 3
    ]).then(alert); //1,2,3 等待6=1+2+3秒後輸出
}

/** catch error */
const promiseError = () => {
    Promise.all([
        new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
        new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)), // "Whoops"
        new Promise(resolve => setTimeout(() => resolve(3), 1000)) // 3
    ]).then(alert).catch(alert); //Whoops 等待6=1+2+3秒後輸出
}

/** sample Promise.all 讀取貼圖 */
const loadImage = () => {

    let names = ['377500711', '377500712', '377500713'];

    let requests = names.map(name => fetch(`https://stickershop.line-scdn.net/stickershop/v1/sticker/${name}/android/sticker.png;compress=true`));

    Promise.all(requests)
        .then(responses => {
            //全部連接成功
            for (let response of responses) {
                console.log(`${response.url}: ${response.status}`); // shows 200 for every url
                let img = document.createElement('img');
                img.src = response.url;
                document.body.append(img);
            }

            return responses;
        })
        .then(responses => Promise.all(responses.map(r => r.url.substr(57, 9))))
        // all JSON answers are parsed: "users" is the array of them
        .then(users => users.forEach(user => console.log(user.name)));

}