import React, { useState } from 'react'
import { Chart, defaults } from 'chart.js/auto'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import Toggle from '../../components/common/Toggle';

import barGraphIcon from '../../assets/barGraph.svg'
import lineGraphIcon from '../../assets/lineGraph.svg'
import dataGraphIcon from '../../assets/dataGraph.svg'
import pieGraphIcon from '../../assets/pieGraph.svg'

import { useGetUserInterviewQuery } from '../../Redux/Interview/InterviewApi'
import { useGetUserNotesQuery } from '../../Redux/Note/NoteApi'
import { useGetUserMcqsQuery } from '../../Redux/Mcq/McqApi'
import { useGetUserTasksQuery } from '../../Redux/Task/TaskApi'
import Loader from '../../components/Loader';

const ProfileChart = ({ userId }) => {

    defaults.maintainAspectRatio = false;
    defaults.responsive = true;

    const [chart, setChart] = useState({ bar: true, doughnut: false, line: false, data: false })

    const { data: tasks, isLoading: tasksLoading, error: errortasks, isError: tasksError, isSuccess: tasksSuccess } = useGetUserTasksQuery(userId);
    const { data: notes, isLoading: notesLoading, error: errornotes, isError: notesError, isSuccess: notesSuccess } = useGetUserNotesQuery(userId);
    const { data: interview, isLoading: interviewLoading, error: errorinterview, isError: interviewError, isSuccess: interviewSuccess } = useGetUserInterviewQuery(userId);
    const { data: mcq, isLoading: mcqLoading, error: errormcq, isError: mcqError, isSuccess: mcqSuccess } = useGetUserMcqsQuery(userId);

    const handleChart = (word) => {
        let chart = { bar: false, doughnut: false, line: false, data: false };
        chart[word] = true;
        setChart(chart)
    }

    if (tasksError || notesError || mcqError || interviewError) {
        return <Error text='Erroc Occured' errorResponse={errortasks || errornotes || errormcq || errorinterview} />
    }

    return (

        tasksLoading || notesLoading || mcqLoading || interviewLoading
            ?
            <Loader />
            :
            <div className='w-full flex flex-col gap-5'>

                <div className='w-full flex justify-end'>
                    <div className='w-fit bg-bg-card flex items-center rounded-xl p-1'>
                        <Toggle buttonsArr={[{ text: "bar", pic: barGraphIcon }, { text: "data", pic: dataGraphIcon }, { text: "doughnut", pic: pieGraphIcon }, { text: "line", pic: lineGraphIcon }]} onChange={handleChart} />
                    </div>
                </div>

                <div className='h-full md:h-[300px]'>
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