import axios from 'axios';
import React, {useState, useEffect} from 'react'


function Data3(){
    const [chartX, setChartX] = useState([]);
    const [chartY, setChartY] = useState([]);

    useEffect(() =>{
        axios.get('')
            .then(response => {
                setChartX({response})
                setChartY({response})
            })
            .catch((err)=> {
                console.log(err)
            });
    },[])

}
export default Data3