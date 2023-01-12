import React, { useEffect ,useContext } from 'react';
import FixContext from '../../context/fixContext/fixContext';
import IssueContext from '../../context/issueContext/issueContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { LineChart, Line} from 'recharts';
import Spinner from '../layout/Spinner';


const IssueStatistics = () => {
    const fixContext = useContext(FixContext);
    const issueContext = useContext(IssueContext);
    const {fixes, getFixes} = fixContext;
    const {issues, getAllIssues } = issueContext;
    const dataCategory = [];
    const dataDate = [];
    useEffect(() => {
        getFixes();
        getAllIssues();
    }, [])

    const categoryLookup = {}
    const dateLookup = {}
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
            for(const [key, value] of Object.entries(categoryLookup)) {
                dataCategory.push({
                    "name": key,
                    "total": value[0],
                    "solved": value[1],
                    "unsolved": value[2]
                })
            }

            for(let i= issues.length -1; i > 0; i--) {
                if(!(issues[i].date.split("T")[0] in dateLookup)) {
                    dateLookup[issues[i].date.split("T")[0]] = 1;
                }
                else{
                    dateLookup[issues[i].date.split("T")[0]] +=1;
                }
            }

                for(const [key, value] of Object.entries(dateLookup)) {
                    dataDate.push({
                        "name": key,
                        "amount": value,
                    })
                }

        return (
            <div
                style={{
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"center",
                    alignItems:"center",
                    gap:'5px'
                }}
            >
                <h2
                    style={{
                        fontWeight:"bold"
                    }}
                >
                    Issue Amount By Cateogry
                </h2>
                <BarChart
                    width={1300}
                    height={300}
                    data={dataCategory}
                    margin={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickCount={3} />
                    <Tooltip />
                    <Bar dataKey="total" fill="#8884d8" />
                    <Bar dataKey="solved" fill="#82ca9d" />
                    <Bar dataKey="unsolved" fill="#f53d3d" />
                    <br></br>
                </BarChart>
                <h2
                    style={{
                        fontWeight:"bold"
                    }}
                >
                    Issue Amount By Date
                </h2>
                <LineChart
                    width={1300}
                    height={250}
                    data={dataDate}
                    margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis  tickCount={3} />
                    <Tooltip />
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" />
                </LineChart>
            </div>
        )
    }
}

export default IssueStatistics;
