import React from 'react';
import {useState, useEffect} from 'react';
import './data.css';
import "../styles.css";
import { Chart } from "react-charts";
import useDate from "./useDate";
import {useMemo} from 'react';


function getRandom(){
    let rand = Math.floor(Math.random()*100) + 1;
    return rand;
}

function getTime(){
    const tt = new Date();
    const tCurrent = tt.getHours() + ":" + tt.getMinutes() + ":" + tt.getSeconds();
    //console.log(tCurrent);
    return tCurrent;
}


function Data() {

    const {time} = useDate();

    //const [temp, setTemp] = useState([]);


    getTime();
    
    const axes = useMemo(
        () => [
            {primary: true, type: "time", position: "bottom"},
            {type: "linear", position: "left", stacked: true}
        ],
        []
    );
    const series = useMemo(
        () => (
            {type: "area"}
        ),
        []
    );

    const modbus = useMemo(
        () => [
            {
                label: "Modbus 1",
                datums: [
                    {x: new Date("2020-03-18T11:00:00.000Z"), y: 60},
                    {x: new Date("2020-03-18T11:30:00.000Z"), y: 23}
                ]
            },
            {
                label: "Modbus 2",
                datums: [
                    {x: new Date("2020-03-18T11:00:00.000Z"), y: 41},
                    {x: new Date("2020-03-18T11:30:00.000Z"), y: 15}
                ]
            }
        ],
        []
    );

    const visualType = useMemo(
        () => (
            {type: "line"}
        ),
        []
    );
    

    const xlabels = [];
    const ylabels = [];

    useEffect(() => { 
        let i = 0;
        const intervalTime = setInterval(() => {
            console.log("Today Updated");
            
            //console.log(getTime());


            xlabels.push(getTime());
            ylabels.push(getRandom());

            //console.log("x array: ", xlabels);
            //console.log("y array: ",ylabels);
            
            
        }, 5000* 1000);

        return () => {
            
            clearInterval(intervalTime); // Return a funtion to clear the timer so that it will stop being called on unmount
        }
        
        }, []
    );

    //const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric', second: 'numeric'});
    //xlabels.push(today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric', second: 'numeric'}));
    //console.log(time);
   
    
    
    //xlabels.push({time});
    //console.log("x array: ", xlabels);





    

    
  

    return (

        <div>
            <div className='Data'>
                <div className='time'></div>
                    
                <div className='data-wrapper'>
                    <div class='data-element'>
                        <div className='element-name'>
                            Modbus

                            <div className='chart-container'>
                            <Chart data={modbus} series={series} axes={axes} tooltip />
                            </div>

                        </div>
                    </div>

                    <div className='data-element'>
                        <div className='element-name'>
                            Connection

                            <div className='chart-container' >
                    
                                <Chart 
                                    data = { useMemo(
                                        () => [
                                            {
                                                label: "AA",
                                                datums: {
                                                    x: xlabels, y : ylabels,
                                                }
                                            }
                                        ]
                                    )} 
                            
                                    series={visualType} 
                        
                                    axes = { React.useMemo(
                                        () => [
                                            {primary: true, type: "time", position: "bottom"},
                                            {type: "linear", position: "left", stacked: true}
                                        ],[]
                                    )} 
                                tooltip />

                        
                            </div>

                        </div>


                        
  
                

               
                    </div>


                    <div class='data-element'>
                        <div className='element-name'>
                            Past Data

                            <div className='chart-container'>
                            <Chart data={modbus} series={series} axes={axes} tooltip />
                            </div>

                        </div>
                    </div>







                </div>
                    

                



            </div>


        </div>

    )

}
export default Data