const express = require("express")
const bodyParser = require("body-parser")
const fs = require("fs")

const app = express()
const PORT = 3000

const logFile = "log.txt"

app.use(bodyParser.json())
app.post("/sonarr", (req, res) => {
    let upgradedEpisode = req.body

    try {
        var episode_to_delete = upgradedEpisode["deletedFiles"][0].sceneName
        deleteFile(episode_to_delete)
    } catch (err) {
        console.log(err)
    }

    res.status(200).end()
})

app.listen(PORT, () => console.log("Server running on port", PORT))



function deleteFile(mediaTitle) {
    const filePath = "/media/downloading/"

    try {
        fs.unlinkSync(filePath + mediaTitle)
        console.log(mediaTitle + " was successfully removed")
        writeLog(mediaTitle)

        return true
    } catch (err) {
        console.log(err)

        return false
    }
}

function writeLog (mediaTitle) {
    let today = new Date(Date.now())
    let string = mediaTitle + "\t\t\t" + today.toUTCString() + "\n"

    fs.appendFile(logFile, string, function(err) {
        if(err) {
            return console.log(err)
        }
        console.log("The log was updated")
    })

    return;
}
