import React, {useContext, useState} from 'react';
import IssueContext from '../../context/issueContext/issueContext';
import AuthContext from '../../context/authContext/authContext';
import AlertContext from '../../context/alertContext/alertContext';
const IssueForm = () => {

    const authcontext = useContext(AuthContext);
    const {user} = authcontext;
    const issueContext = useContext(IssueContext);
    const alertContext = useContext(AlertContext);
    const {setAlert} = alertContext;
    const [issue, setIssue] = useState({
        name:'',
        userName:'',
        category:'',
        date:''
    });

    const onChange = e => setIssue({...issue, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        issue.userName = user.name;
        if(issue.name === '') {
            setAlert('Please enter the issue before submitting', 'danger');

        }
        else if(issue.category === '') {
            setAlert('Please enter category', 'danger');
        }
        else {
            issueContext.addIssue(issue);
            setIssue({
                name:'',
                userName:'',
                category:'',
                date:''
            });
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">Add Issue</h2>
            <input type="text" placeholder="name" name="name" value={issue.name} onChange={onChange} />
            <input type="text" placeholder="category" name="category" value={issue.category} onChange={onChange} />
            <input type="submit" value="Add an issue" className="btn btn-primary btn-block"/>
        </form>
    )
}

export default IssueForm;
