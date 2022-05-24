import { deleteRequest, getRequests, getPlumbers, saveCompletion } from "./dataAccess.js"

export const Requests = () => {
    const requests = getRequests() 
    const plumbers = getPlumbers()

    const repairList = (request) => {
        return `<li class="list__items">
            ${request.description}

            <select class="plumbers" id="plumbers">
                <option value="">Choose</option>
                    ${plumbers.map(
                        plumber => {
                            return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`}
                        ).join("")
                    }
            </select>
            
            <button class="request__delete"
                id="request--${request.id}">
                Delete
             </button>
        </li>`
    }

    let html = `<ul>
        ${requests.map(repairList).join("")}
        </ul>`

    return html
}


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

// creating change event, it is waiting for the id tag plumbers to be clicked. when the name option is selected the completion object will be sent to completions 
mainContainer.addEventListener(
    "change", 
    (event) => {
        if (event.target.id === "plumbers") { 
            const [requestId, plumberId] = event.target.value.split("--")

            const completion = {
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_created: Date.now()
            }
            saveCompletion(completion)
        }
    }
)
