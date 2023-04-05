const header = document.querySelector(".heading")
const ticketDataSection = document.querySelector(".table-content")
const timerElement = document.querySelector("#timer")
const loadingScreen = document.querySelector("#loading-screen")
let timerSecond = 60;

const rowTemplate = (ticker, index) => {
    const template = `
        <br>
        <tr class="data">
            <td>${index}</td>
            <td>${ticker.name}</td>
            <td>₹ ${ticker.last}</td>
            <td>₹ ${ticker.buy} / ₹ ${ticker.sell}</td>
            <td>${ticker.volume}</td>
            <td>${ticker.base_unit}</td>
        </tr>
    `

    return template.trim()
}

const headRowNode = () => {
    const headRowNode = `
    <tr>
        <th>#</th>
        <th>name</th>
        <th>Last</th>
        <th>Buy / Sell Price</th>
        <th>volume</th>
        <th>base_unit</th>
    </tr>
    <br>
    `

    return headRowNode.trim()
}

const addZero = (number) => {
    if (number < 10) {
        return '0' + number
    }
    return number
}

const fetchNewData = async () => {
    loadingScreen.classList.remove('hidden')

    ticketDataSection.innerHTML = ''
    ticketDataSection.innerHTML += headRowNode()

    const response = await fetch(`http://localhost:3000/api/tickers`, {
        method: 'GET'
    })

    const tickerData = await response.json()

    loadingScreen.classList.add('hidden')

    tickerData.forEach((row, index) => {
        ticketDataSection.innerHTML += rowTemplate(row, index+1)
    });
}

async function connect() {
    await fetchNewData()

    setInterval(async () => {
        if (timerSecond == 0) {
            await fetchNewData()
            timerSecond = 60
        }

        timerSecond--;
        timerElement.innerHTML = addZero(timerSecond)
    }, 1000)
}

connect()