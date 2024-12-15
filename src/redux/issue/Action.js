import api from "@/config/api";
import * as actionTypes from "./ActionTypes"
import { DELETE_COMMENT_SUCCESS } from "../comment/ActionTypes";

export const fetchIssues = (id) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_ISSUES_REQUEST })
        try {
            const response = await api.get(`/api/issues/project/${id}`);
            dispatch({ type: actionTypes.FETCH_ISSUES_SUCCESS, issues: response.data});
            //console.log("fetched issues = ", response.data);
        } catch (error) {
            console.log("error = ", error);
            dispatch({ type: actionTypes.FETCH_ISSUES_FAILURE, error: error.message });

        }
    }
}

export const fetchIssueById = (id) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_ISSUES_BY_ID_REQUEST })
        try {
            const response = await api.get(`/api/issues/${id}`);
            dispatch({ type: actionTypes.FETCH_ISSUES_BY_ID_SUCCESS, issues: response.data});
            console.log("fetch issue by id = ", response.data);
        } catch (error) {
            console.log("error = ", error);
            dispatch({ type: actionTypes.FETCH_ISSUES_BY_ID_FAILURE, error: error.message });

        }
    }
}

export const createIssue = (issueData) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_ISSUE_REQUEST })
    try {
        const { data } = await api.post("/api/issues", issueData)
        console.log("create issue ------ ", data);
        dispatch({ type: actionTypes.CREATE_ISSUE_SUCCESS, issue: data });
    } catch (error) {
        console.log("error = ", error);

    }
}

export const updateIssueStatus = ({id, status}) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.UPDATE_ISSUE_STATUS_REQUEST })
        try {
            const response = await api.put(`/api/issues/${id}/status/${status}`);
            dispatch({ type: actionTypes.UPDATE_ISSUE_STATUS_SUCCESS, issues: response.data});
            console.log("update issue status = ", response.data);
        } catch (error) {
            console.log("error = ", error);
            dispatch({ type: actionTypes.UPDATE_ISSUE_STATUS_FAILURE, error: error.message });

        }
    }
}

export const assignedUserToIssue = ({issueId, userId}) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.ASSIGNED_ISSUE_TO_USER_REQUEST })
        try {
            const response = await api.put(`/api/issues/${issueId}/assignee/${userId}`);
            dispatch({ type: actionTypes.ASSIGNED_ISSUE_TO_USER_SUCCESS, issue: response.data});
            console.log("assigned issue = ", response.data);
        } catch (error) {
            console.log("error = ", error);
            dispatch({ type: actionTypes.ASSIGNED_ISSUE_TO_USER_FAILURE, error: error.message });

        }
    }
}

export const deleteIssue = (issueId) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_ISSUE_REQUEST })
    try {
        const { data } = await api.delete("/api/issues/"+issueId)
        console.log("delete issue : ", data);
        dispatch({ type: actionTypes.DELETE_ISSUE_SUCCESS, issueId })
    } catch (error) {
        console.log("error = ", error);
        dispatch({ type: actionTypes.DELETE_ISSUE_FAILURE, error: error.message });
    }
}