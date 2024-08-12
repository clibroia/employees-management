const bcrypt = require("bcrypt")
const fs = require("fs")
const path = require("path")

// Define a function that hashes a string and saves back to passwordsMap.json
const hashAndSave = async (filename) => {
    try {
        const data = JSON.parse(fs.readFileSync(filename,"utf-8")).mappings
        const saltRounds = 10

        // Computed hash values are added as properties to the JSON object
        for(const entry of data) {
            if(entry.password) {
                entry.hash = await bcrypt.hash(entry.password, saltRounds)
            }
        }

        // The updated JSON object is saved back to passwordsMap.json
        const updatedData = JSON.stringify(data, null, 2)
        fs.writeFileSync(filename, updatedData, "utf-8")
        console.log("Passwords have been hashed and the JSON file updated")
    } catch(err) {
        console.error(err)
    }
}

// Calling the function
const filename = path.join(__dirname, "./passwordsMap.json")
hashAndSave(filename)

