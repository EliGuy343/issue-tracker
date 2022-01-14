import React, { useEffect ,useContext } from 'react';
import FixContext from '../../context/fixContext/fixContext';
import IssueContext from '../../context/issueContext/issueContext';
import { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Spinner from '../layout/Spinner';


const StatsByCategory = () => {
    const fixContext = useContext(FixContext);
    const issueContext = useContext(IssueContext); 
    const {fixes, getFixes, loading} = fixContext;
    const {issues, getAllIssues } = issueContext; 
    const data = []
    useEffect(() => {
        getFixes(); 
        getAllIssues(); 
    
    }, [])

    var categoryLookup = {}
    debugger;
    if(issues.length === 0) {
        return (
            <Spinner/>
        )
    }
    if(issues.length > 0) {

            for(let i= 0; i < issues.length; i++) {
        
                if(!(issues[i].category in categoryLookup)) {
                    categoryLookup[issues[i].category] = new Array(3).fill(0); 
                }
                categoryLookup[issues[i].category][0] +=1; 
                if(issues[i]._id in fixes ){
                    categoryLookup[issues[i].category][1] +=1;
                } else  {
                    categoryLookup[issues[i].category][2] +=1;
                }
                
                }
                debugger;
                for(const [key, value] of Object.entries(categoryLookup)) {
            
                    data.push({
                        "name": key,
                        "total": value[0],
                        "solved": value[1],
                        "unsolved": value[2]
                    })
            
                
                }
                debugger;
        

        return (
            <div>   
                <BarChart
                width={700}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" />
                <Bar dataKey="solved" fill="#82ca9d" />
                <Bar dataKey="unsolved" fill="#f53d3d" />
                </BarChart>
        </div>

        )
    }
}

export default StatsByCategory
