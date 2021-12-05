import React, {useState} from 'react';


const IssueForm = () => {

    const [issue, setIssue] = useState({
        name:'',
        userName:'',
        category:'',
        date:''
    }

    ); 

    const onChange = e => setIssue({...issue, [e.target.name]: e.target.value});

    return (
        <form>
            <h2 className="text-primary">Add Issue</h2>
            <input type="text" placeholder="issue" name="issue" value={issue.name} onChange={onChange} />
            <input type="text" placeholder="category" name="category" value={issue.category} onChange={onChange} />
            <input type="submit" value="Add an issue" className="btn btn-primary btn-block"/>
        </form>
    )
}

export default IssueForm;
