// 0 ~ 18
function getRandomTimeList(date) {
    const hour = Math.floor(date.getDate() / 10) * date.getDay()

    const availableTime = []

    if (hour) availableTime.push({
        0: hour >= 8 ? hour : hour + 6,
        1: 30 * (date.getDay() - 1 || date.getDay() + 1)
    })

    availableTime.push({
        0: hour >= 16 ? hour - 6 : hour + 8,
        1: 30 * (date.getDay() - 1 || date.getDay() + 1)
    })

    return {
        availableTime,
        bookedTime: [
            {
                0: availableTime[0][0] + 4,
                1: 30 * (Math.floor(date.getDay() / 2) || 1)
            }
        ]
    }
}

function getScheduleTime(count, hour, minute) {
    const date = new Date()

    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate() + count, hour, 0)
    const end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + count, hour, minute)

    return {
        start: start.toISOString(),
        end: end.toISOString()
    }
}

export function getCurrentData() {
    const data = {
        available: [],
        booked: []
    }

    Array(50)
        .fill(null)
        .map((n, index) => {
            const currentDate = new Date()
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + index)

            const {
                availableTime,
                bookedTime
            } = getRandomTimeList(date)

            const availableTimes = [
                getScheduleTime(index, availableTime[0][0], availableTime[0][1])
            ]

            if (availableTime[1]) availableTimes.push(getScheduleTime(index, availableTime[1][0], availableTime[1][1]))

            const bookedTimes = [
                getScheduleTime(index, bookedTime[0][0], bookedTime[0][1])
            ]

            data.available.push(...availableTimes)
            data.booked.push(...bookedTimes)
        })

    return data
}
