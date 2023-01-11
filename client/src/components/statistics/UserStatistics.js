import React, { useEffect ,useContext, Fragment } from 'react';
import FixContext from '../../context/fixContext/fixContext';
import IssueContext from '../../context/issueContext/issueContext';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Spinner from '../layout/Spinner';


const UserStatistics = () => {

    const fixContext = useContext(FixContext);
    const issueContext = useContext(IssueContext);
    const {getUserFixes, fixes} = fixContext;
    const {getUserIssues, issues} = issueContext;

    useEffect(() => {
        getUserFixes();
        getUserIssues();
    }, [])

    if(issues.length === 0) {
        return (
            <Spinner/>
        )
    } else {
        const issuesSubmitted = issues.length;
        const fixesSubmitted = fixes.length;
        const data = [
            { name: 'issues', value: issuesSubmitted },
            { name: 'Solutions', value: fixesSubmitted },
          ];
        return (
        <div>
            <PieChart width={500} height={500} style={{'marginLeft':"35.5%"}}>
            <Pie
                isAnimationActive={true}
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={180}
                label
            >
            <Cell key={`cell-0`} value={issuesSubmitted} fill="#acf48b" />
            <Cell key={`cell-1`} value={fixesSubmitted} fill="#4192a9" />
            </Pie>
            <Tooltip />
            <Legend/>
            </PieChart>
        </div>
        )

    }


}

export default UserStatistics
