import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Auth/AuthSlice'
import { noteApi } from '../Redux/Note/NoteApi'
import { optionApi } from '../Redux/Option/OptionApi'
import { taskApi } from '../Redux/Task/TaskApi'
import { interviewApi } from '../Redux/Interview/InterviewApi'
import { mcqApi } from '../Redux/Mcq/McqApi'
import { documentApi } from '../Redux/Document/DocumentApi'
import { questionApi } from '../Redux/Question/QuestionApi'
import { commentApi } from '../Redux/Comment/CommentApi'
import { globalMcqApi } from '../Redux/GlobalMcq/GlobalMcqApi'
import { globalInterviewApi } from '../Redux/GlobalInterview/GlobalInterviewApi'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [taskApi.reducerPath]: taskApi.reducer,
        [noteApi.reducerPath]: noteApi.reducer,
        [interviewApi.reducerPath]: interviewApi.reducer,
        [optionApi.reducerPath]: optionApi.reducer,
        [mcqApi.reducerPath]: mcqApi.reducer,
        [documentApi.reducerPath]: documentApi.reducer,
        [questionApi.reducerPath]: questionApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
        [globalMcqApi.reducerPath]: globalMcqApi.reducer,
        [globalInterviewApi.reducerPath]: globalInterviewApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([noteApi.middleware, interviewApi.middleware, optionApi.middleware, taskApi.middleware, mcqApi.middleware, documentApi.middleware, questionApi.middleware, commentApi.middleware, globalMcqApi.middleware, globalInterviewApi.middleware]),
})