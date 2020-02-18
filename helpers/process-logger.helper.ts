export class ProcessLogger{

    printProcessStartTime(pizzaId,processName,starTime:Date){
        console.log(`Pizza: ${pizzaId} ====> ${processName} process start time:${starTime.getHours()}:${starTime.getMinutes()}:${starTime.getSeconds()}`)
    }

    printProcessFinishTime(pizzaId,processName,finishTime:Date){
        console.log(`Pizza: ${pizzaId} ====> ${processName} process end time at:${finishTime.getHours()}:${finishTime.getMinutes()}:${finishTime.getSeconds()}`)
    }
}