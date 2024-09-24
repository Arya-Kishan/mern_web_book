import React, { useState } from 'react'
import { Chart, defaults } from 'chart.js/auto'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import Toggle from '../../components/common/Toggle';

const ProfileChart = ({ tasks, notes, interview, mcq }) => {

    defaults.maintainAspectRatio = false;
    defaults.responsive = true;

    const [chart, setChart] = useState({ bar: true, doughnut: false, line: false, data: false })

    const handleChart = (word) => {
        let chart = { bar: false, doughnut: false, line: false, data: false };
        chart[word] = true;
        setChart(chart)
    }

    return (
        <div className='w-full flex flex-col gap-5'>

            <div className='w-full flex justify-end'><Toggle buttonsArr={["bar", "data", "doughnut", "line"]} onChange={handleChart} /> </div>

            <div className='h-[200px] md:h-[300px]'>
                {chart.bar && <Bar
                    data={{
                        labels: ["Task", "Notes", "Interview", "Mcq"],
                        datasets: [
                            {
                                label: "Collection",
                                data: [tasks.length, notes.length, interview.length, mcq.length]
                            }
                        ]
                    }}
                />}
                {chart.line && <Line
                    data={{
                        labels: ["Task", "Notes", "Interview", "Mcq"],
                        datasets: [
                            {
                                label: "Collection",
                                data: [tasks.length, notes.length, interview.length, mcq.length]
                            }
                        ]
                    }}
                />}
                {chart.doughnut && <Doughnut
                    data={{
                        labels: ["Task", "Notes", "Interview", "Mcq"],
                        datasets: [
                            {
                                label: "Collection",
                                data: [tasks.length, notes.length, interview.length, mcq.length]
                            }
                        ]
                    }}
                />}
                {chart.data && <div className='w-full h-full grid grid-cols-2 p-2'>
                    <div className='w-[90%] h-[90%] p-2 bg-bg-card rounded-lg'>
                        <p>Notes</p>
                        <p>{notes.length}</p>
                    </div>
                    <div className='w-[90%] h-[90%] p-2 bg-bg-card rounded-lg'>
                        <p>Tasks</p>
                        <p>{tasks.length}</p>
                    </div>
                    <div className='w-[90%] h-[90%] p-2 bg-bg-card rounded-lg'>
                        <p>Mcq</p>
                        <p>{mcq.length}</p>
                    </div>
                    <div className='w-[90%] h-[90%] p-2 bg-bg-card rounded-lg'>
                        <p>Interview</p>
                        <p>{interview.length}</p>
                    </div>
                </div>}
            </div>

        </div>
    )
}

export default ProfileChart