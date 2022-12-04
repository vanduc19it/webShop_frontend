import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
const   options={
    maintainAspectRatio: false ,
    plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Biểu đồ đánh giá',
        },
    }
}
const Chartpie = ({data1}) => {
    return <Pie  
            width={150}
            height={150} 
            data={data1}   
            options={options}
            
    />
}

export default Chartpie
