const path = require("path");
const exec = require("child_process").exec;

const messages = []
const userMessages = []

const skinCancer = async (req, res) => {
    console.log(req.file, req.body)
    const file = req.file;
    if (!file) {
        return res.status(400).json({message: 'No files were uploaded'});
    }

    try {
        // const output = await model._call(processor.preprocess(image, ))
        // const output = await classifier(image);
        const folderPath = path.join(__dirname, "..", "ml");
        const uploadsPath = path.join(__dirname, "..", "uploads");
        const filePath = path.join(uploadsPath, file.filename);

        const result = await cmd(folderPath, `python3 inference_vit.py ${filePath}`);
        const resultString = (result === 1) ? "malignant" : "benign";
        return res.json({code: 200, result: resultString});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

const queryModel = async (req, res) => {
    const {text} = req.body;
    if (!text) {
        return res.status(400).json({message: 'No text was provided'});
    }

    try {
        // const output = await model._call(processor.preprocess(image, ))
        // const output = await classifier(image);
        const folderPath = path.join(__dirname, "..", "ml");
        const schema = {
            "claims": ["ClaimProvider", "ClaimInsurance", "ClaimDate", "ClaimType", "ClaimItem", "ClaimUSD", "PatientUID", "id"],
            "patients": ["PatientUID", "NameFamily", "NameGiven", "DoB", "Gender"],
            "conditions": ["ConditionText", "ConditionOnsetDates", "PatientUID"],
            "encounters": ["EncountersText", "EncounterLocation", "EncounterProvider", "EncounterDates", "PatientUID"],
            "immunizations": ["Immunization", "ImmunizationDates", "PatientUID"],
            "medications": ["Medication", "MedicationDates", "PatientUID"],
            "procedures": ["Procedure", "ProcedureDates", "PatientUID"],
            "Observations": ["ObservationText", "ObservationValue", "ObservationUnit", "ObservationDate", "PatientUID"],
        }

        console.log(text, JSON.stringify(schema));
        const result = await cmd(folderPath, `python3 inference_query.py '${text}' ${btoa(JSON.stringify(schema))}`);
        return res.json({code: 200, text: result});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

const chatModel = async (req, res) => {
    const {text} = req.body;
    if (!text) {
        return res.status(400).json({message: 'No text was provided'});
    }

    const body = {
        "model": "doctor-test",
        "stream": false,
        // "prompt": text,
        "messages": messages
    }
    messages.push({ role: "User", content: text});
    // messages.push({ role: "AI", content: text});
    //
    // return res.json({code: 200, content: messages});

    try {
        const response = await fetch("http://127.0.0.1:11434/api/chat", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "no-cors", // no-cors, *cors, same-origin
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(body), // body data type must match "Content-Type" header
        });

        const resp = await response.json();

        messages.push(resp.message);
        return res.json({code: 200, content: messages}); // parses JSON response into native JavaScript objects
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }

    // try {
    //     const result = await cmd(__dirname, `"`);
    //     return res.json({code: 200, text: result});
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({message: 'Internal server error'});
    // }
}

async function cmd(workingDir, command) {
    let p = exec(command, {cwd: workingDir});

    let result = "";
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Timeout");
        }, 100000);

        p.stdout.on("data", (x) => {
            console.log(x.toString());
            result += x.toString();
            // resolve(x.toString());
        });
        p.stderr.on("data", (x) => {
            console.log(x.toString());
            // resolve(x.toString());
        });
        p.on("exit", (code) => {
            console.log(code.toString());
            resolve(result);
        });
        p.on("error", (err) => {
            console.log(err);
            reject(err);
        });
    });
}

module.exports = {skinCancer, queryModel, chatModel};