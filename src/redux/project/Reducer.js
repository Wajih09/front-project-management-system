import { CREATE_PROJECT_REQUEST, FETCH_PROJECTS_SUCCESS, FETCH_PROJECT_BY_ID_REQUEST, DELETE_PROJECT_REQUEST, INVITE_TO_PROJECTS_REQUEST, SEARCH_PROJECTS_SUCCESS, FETCH_PROJECTS_REQUEST, CREATE_PROJECT_SUCCESS, FETCH_PROJECT_BY_ID_SUCCESS, DELETE_PROJECT_SUCCESS } from "./ActionTypes"

const initialState = {
    projects: [],
    loading: false,
    error: null,
    projectDetails: null,
    searchProjects: []
}

export const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROJECTS_REQUEST:
        case CREATE_PROJECT_REQUEST:
        case DELETE_PROJECT_REQUEST:
        case FETCH_PROJECT_BY_ID_REQUEST:
        case INVITE_TO_PROJECTS_REQUEST:
            //for any request we need to perform same task so we put all cases one after one withour same return 53min
            return { ...state, loading: true, error: null };

        case FETCH_PROJECTS_SUCCESS:
            return { ...state, loading: false, projects: action.projects, error: null }; //action.projects and not action.payload 1h53min

        case SEARCH_PROJECTS_SUCCESS:
            return { ...state, loading: false, searchProjects: action.projects, error: null };

        case CREATE_PROJECT_SUCCESS:
            return { ...state, loading: false, projects: [...state.projects, action.project], error: null };

        case FETCH_PROJECT_BY_ID_SUCCESS:
            return { ...state, loading: false, projectDetails: action.project, error: null };

        case DELETE_PROJECT_SUCCESS:
            return {
                ...state, loading: false, projects: state.projects.filter(project =>
                    project.id !== action.projectId), error: null
            };

        default:
            return state;
    }

}
