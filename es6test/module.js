import {
    sayHi,
    admin
} from './modulecore.js';

import * as core from './modulecore.js';



const moduleSample = () => {

    sayHi(admin.name);
    admin.name = "moduleSample";
    sayHi(admin.name);
}
document.getElementById("modelSample").addEventListener("click", moduleSample)

const moduleSample1 = () => {

    core.sayHi(core.admin.name);
    core.admin.name = "moduleSample1"
    core.sayHi(core.admin.name);
}
document.getElementById("modelSample1").addEventListener("click", moduleSample1)

async function moduleSample2() {
    let obj = await import('./modulecore.js');
    obj.sayHi(obj.admin.name);
    obj.admin.name = "moduleSample2"
    obj.sayHi(obj.admin.name);
}
document.getElementById("modelSample2").addEventListener("click", moduleSample2)