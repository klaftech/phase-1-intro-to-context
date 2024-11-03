function createEmployeeRecord(employeeArray){
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(employeesArray){
    return employeesArray.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(empObj, stamp){
    const timeEvent = {
        type: "TimeIn",
        hour: parseInt(stamp.split(" ")[1]),
        date: stamp.split(" ")[0],
    }
    empObj.timeInEvents.push(timeEvent) 
    return empObj
}

function createTimeOutEvent(empObj, stamp){
    const timeEvent = {
        type: "TimeOut",
        hour: parseInt(stamp.split(" ")[1]),
        date: stamp.split(" ")[0],
    }
    empObj.timeOutEvents.push(timeEvent) 
    return empObj
}

function hoursWorkedOnDate(empObj, date){
    const punchIn = empObj.timeInEvents.find((punch) => punch.date === date)
    const punchOut = empObj.timeOutEvents.find((punch) => punch.date === date)
    return (punchOut.hour/100) - (punchIn.hour/100)
}

function wagesEarnedOnDate(empObj, date){
    return hoursWorkedOnDate(empObj,date) * empObj.payPerHour
}

function allWagesFor(empObj){
    let wagesTotal = 0;
    for(const clockIn in empObj.timeInEvents){
        //const reduce = empObj.timeInEvents.reduce((clockIn) => wagesEarnedOnDate(empObj,clockIn.date))
        const clockInObj = empObj.timeInEvents[clockIn]
        const clockOutObj = empObj.timeOutEvents[clockIn]
        const punchTotal = (clockOutObj.hour/100) - (clockInObj.hour/100)
        const clockTotal = punchTotal * empObj.payPerHour
        wagesTotal = wagesTotal + clockTotal
    }
    return wagesTotal
}

function calculatePayroll(employeesArray){
    const total = employeesArray.map((employeeObj) => allWagesFor(employeeObj))
    const calc = total.reduce((a, b) => a + b, 0)
    return calc
}