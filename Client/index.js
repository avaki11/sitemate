//import axios from "axios";
const axios = require('axios');
const serverPort = 3000;

//In this client index file,
// I want to use the axios library to make a request to the server
// and return the response
// This will include the read create and update methods and delete method.

const actionIssues = async () => {
    console.log("What action would you like to do?");
    console.log("1 - Retrieve issues");
    console.log("2 - Create issue");
    console.log("3 - Update issue");
    console.log("4 - Delete issue");
    console.log("5 - Exit");

    const action = await getInput();

    switch (action) {
        case "1":
            await askReadAction();
            break;
        case "2":
            await createIssue();
            break;
        case "3":
            await updateIssue();
            break;
        case "4":
            await deleteIssue();
            break;
        case "5":
            process.exit();
        default:
            throw new Error('Invalid option!');
    }

    await actionIssues();
};

const askReadAction = async () => {
    console.log("What read action would you like to do?");
    console.log("1 - Read all issues");
    console.log("2 - Read single issue");

    const readAction = await getInput();

    switch (readAction) {
        case "1":
            await GetIssues();
            break;
        case "2":
            await GetIssue();
            break;
        default:
            throw new Error('Invalid option!')
    }
};

const GetIssues = async () => {
    try {
        const { data } = await axios.get(`http://localhost:${serverPort}/issues`);
        console.log("Here are all existing issues");
        console.log(data.issues);
    } catch (error) {
        console.log(error.response.data);
    }
};

const GetIssue = async () => {
    console.log("Please provide an id to the issue you want to fetch");
    const id = await getInput();

    try {
        const { data } = await axios.get(`http://localhost:${serverPort}/issues/${id}`);
        console.log(`Here is issue ${id}`);
        console.log(data);
    } catch (error) {
        console.log(error.response.data);
    }
};

const createIssue = async () => {
    console.log("Please provide an id for the issue, no negative id number allowed");
    const id = await getInput();

    console.log("Please provide a title for the issue");
    const title = await getInput();

    console.log("Please provide a description for the issue");
    const description = await getInput();

    try {
        await axios.post(`http://localhost:${serverPort}/issues`, { id, title, description });
        console.log(`Issue ${id} has been created`);
    } catch (error) {
        console.log(error.response.data);
    }
};

const updateIssue = async () => {
    console.log("Please provide an id for the issue, no negative id number allowed");
    const id = await getInput();

    console.log("Please provide a new title for the issue, if nothing is provided, it will remain the same");
    const title = await getInput();

    console.log("Please provide a new description for the issue, if nothing is provided, it will remain the same");
    const description = await getInput();

    try {
        const { data } = await axios.put(`http://localhost:${serverPort}/issues`, { id, title, description });
        console.log(`Issue ${id} has been updated to`);
        console.log(data);
    } catch (error) {
        console.log(error.response.data);
    }
};

const deleteIssue = async () => {
    console.log("Please provide an id to the issue you want to delete");
    const id = await getInput();

    try {
        const { data } = await axios.delete(`http://localhost:${serverPort}/issues/${id}`);
        console.log(`Here is issue ${id}`);
        console.log(data);
    } catch (error) {
        console.log(error.response.data);
    }
}

(async () => actionIssues());


