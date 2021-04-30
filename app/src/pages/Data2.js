import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';

function Data2 ({props})  {

    const [chartData, setChartData] = useState({});
    const [chartX, setChartX] = useState([]);
    const [chartY, setChartY] = useState([]);
    const [chartName, setChartName] = useState('');
    
    const chart = (props) => {
        let xData = [];
        let yData = [];

        /*
        for(const dataObj of props.data){
                    xData.push(parseInt(dataObj.time))
                    yData.push(parseInt(dataObj.output))
                }
        */
        axios.get("")
            .then(res=> {
                console.log(res);
                for(const dataObj of res.data.data){
                    setChartName(dataObj.id);
                    xData.push(parseInt(dataObj.time))
                    yData.push(parseInt(dataObj.output))
                }

                setChartData({
                    labels: xData,
                    datasets: [
                        {
                            label: 'level of thicness',
                            data: yData,
                            backgroundColor: [
                                'rgba(75, 192, 192, 0.6)'
                            ],
                            borderWidth: 4
                        }
                    ]
        
                });
            })
            .catch(err =>{
                console.log(err);
            });

    }

    useEffect(() =>{
        chart()
    }, [])



    return (
        <div className="data">

            <h1>Test Chart</h1>
            <div style= {{height: "500px", width: "500px"}}>
                <Line   data={chartData} 
                        options={
                            {
                                responsive: true,
                                title: {text: 'THICCNESSS SCALE', display: true},
                                scales: {
                                        yAxes: [
                                            {
                                                ticks: {
                                                    autoSkip: true,
                                                    maxTicksLimit: 10,
                                                    beginAtZero: true
                                                },
                                                gridLines: {
                                                    display: false
                                                }
                                            }
                                        ],
                                        xAxes: [
                                            {
                                                gridLines: {
                                                    display: false
                                                }
                                            }
                                        ]

                                }
                            }
                        }   
                />
            </div>



        </div>






    )




}export default Data2