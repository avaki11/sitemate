import express from 'express';

const app = express();
app.use(express.json());

const port = 3000;

//Issues can be hard-coded JSON objects with just 3 attributes: id, title + description.
// Need to Create an empty object to store this issues.

// Create an option to enable Create: accepts a JSON object & prints/logs the object
// Create a read option returns a static JSON object
// Update: accepts a JSON object & prints/logs the object
// Delete: prints/logs out the object or id to delete

const issues = {};

// Checks to see if an issue with the given id already exists.
const CheckIssue = (issues, id) => Object.keys(issues).includes(id)? issues[id] : null;

// Returns the issue with the given id.
const getIssue = (issues, id) => {
    const issue = CheckIssue(issues, id);
        if (issue) {
            return issue;
        } else {
            throw new Error(`Issue with id ${id} does not exist`);
        }
};

// Gets all issues within the Object Issues.
app.get('/issues/:id', (response, request) => {
    const id = request.params.id;
    if (!CheckIssue(issues, id)) {
        response.status(404).send(`Issue with id ${id}) does not exist`);
    }

    response.json(getIssue(issues, id));
});

app.get('/issues/', (response, request) => {
    const id = request.params.id;
    const IssuesList = Object.keys(issues).map(id => getIssue(issues, id));
    response.json(getIssue(issues, IssuesList));
});

app.post('/issues/', (response, request) => {
    const {id, title, description} = request.body;

    if(CheckIssue(issues, id)) {
        response.status(400).send(`Issue with id ${id} already exists`);
    }

    issues[id] = {
            title,
            description
        };
        response.status(200).send(`Issue with id ${id} created`);
});

app.put('/issues/', (response, request) => {
    const {id, title: newIssueTitle, description: newIssueDescription} = request.body;

    if(!CheckIssue(issues, id)) {
            response.status(404).send(`Issue with id ${id} does not exist`);
        }
        const issue = issues[id];
        issues[id] = {
            title: newIssueTitle ? newIssueTitle : issue.title,
            description:  newIssueDescription ? newIssueDescription : issue.description,
        };
        response.status(200).send(`Issue with id ${id} updated`);

});


app.delete('/issues/:id', (response, request) => {
    const id = request.params.id;

    if(!CheckIssue(issues, id)) {
            response.status(404).send(`Issue with id ${id} does not exist`);
        }

        delete issues[id];
        response.status(200).send(`Issue with id ${id} deleted`); 

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


