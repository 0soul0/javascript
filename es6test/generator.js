/**
 * generator function 可以在function設定中斷點
 * 寫法function *g()
 */
function* generatorTest() {
    createP('你好');
    yield '中斷1';
    createP('我很好');
    yield '中斷2';
    createP('我也過得不錯');
    createP('再見');
    return '完成';
}
/**呼叫 generatorTest()*/
const next = () => {
    //不能直接generatorTest()這樣呼叫要generatorTest().next()
    //每次呼叫就會延續從上次中斷點執行到下一個中斷點
    let g = generatorTest();
    createP(g.next().value); //你好 中斷1
    createP(g.next().value); //我很好 中斷2
    createP(g.next().value); //我也過得不錯 再見 完成

}
/** 動態新增標籤p */
const createP = (value) => {
    let p = document.createElement("p");
    p.textContent = value;
    document.body.append(p);
}