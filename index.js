const express = require('express')
const cors = require('cors');
const app = express()
const database = require('./database');
const issueModal = require('./modal');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));

app.post('/api/newissue', async (req, res) => {
    const { description, sevearity, assignedTo } = req.body;
    
    if (!description || !sevearity || !assignedTo) {
        return res.status(400).json({
            successfull: false,
            message: 'Inputs should not empty.'
        })
    }
    
    const addNewIssue = await issueModal.create({
        description, sevearity, assignedTo
    });

    if (addNewIssue) {
        return res.json({
            successfull: true,
            message: addNewIssue
        })
    }

})

app.get('/api/allissues', async (req, res) => {
    const allIssues = await issueModal.find({});
    return res.json({
        successfull: true,
        issues: allIssues
    })
})

app.delete('/api/delete/:id', async (req, res) => {

    const {id} = req.params;
    const allIssues = await issueModal.find({});

    const issueThere = allIssues.filter((issue) => {
        if (id === issue._id) {
            console.log(issue)
        }
    });
    console.log(issueThere);

    if (!issueThere) {
        return res.status(400).json({
            successfull: false,
            message: 'Issue dont exist'
        })
    }

    const issuesAfterDelete = await issueModal.findByIdAndDelete(id, {new: true});
    return res.json({
        successfull: true,
        message: "Deleted successfully"
    })
    
})


app.listen(8000, ()=>{
    database();
    console.log('listening on 8000')
});