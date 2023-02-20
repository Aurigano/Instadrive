import { useReducer, useEffect } from "react";

function getFolderData(state, id) {
	console.log("inside", state, id);
	if (id === null) return state;
	else {
		const findObjById = (state, id) => {
			if (state.id === id) {
				console.log("1x");
				return state;
			} else if (
				state.children.folders &&
				state.children.folders.length > 0
			) {
				console.log("2x");
				for (let i = 0; i < state.children.folders.length; i++) {
					const obj2 = findObjById(state.children.folders[i], id);
					if (obj2) {
						return obj2;
						break;
					}
				}
				return null;
			} else {
				console.log("3x");
				return null;
			}
		};

		const obj = findObjById(state, id);
		return obj;
	}
}

const ACTIONS = {
	ADD_FOLDER: "add-folder",
	SELECT_FOLDER: "select-folder",
	UPDATE_FOLDER: "update-folder",
	SET_CHILD_FOLDERS: "set-child-folders",
	SET_CHILD_FILES: "set-child-files",
};

export const ROOT_FOLDER = { name: "Root", id: null, path: [] };

function reducer(state, action) {
	console.log("reducer", state, action);
	const { type, payload } = action;
	switch (type) {
		case ACTIONS.SELECT_FOLDER:
			console.log("result", getFolderData(state, payload.folderId));
			return getFolderData(state, payload.folderId);
		case ACTIONS.ADD_FOLDER:
			return {
				id: payload.folderId,
				name: payload.folder,
				children: { folders: [], files: [] },
			};
		case ACTIONS.UPDATE_FOLDER:
			return {
				...state,
				folder: payload.folder,
			};
		case ACTIONS.SET_CHILD_FOLDERS:
			return {
				...state,
				children: { ...state.children, folders: payload.childFolder },
			};
		case ACTIONS.SET_CHILD_FOLDERS:
			return {
				...state,
				children: { ...state.children, files: payload.childFile },
			};
		default:
			return state;
	}
}

export function useFolder(folderId = null, folder = null) {
	console.log("called");
	const initialState = {
		name: "root",
		id: null,
		children: {
			folders: [
				{
					name: "abc",
					id: "1",
					children: {
						folders: [
							{ name: "mno", id: "3", children: {}, path: "/" },
						],
						files: [{ name: "pqr", path: "/" }],
					},
					path: "/",
				},
				{ name: "def", id: "2", children: {}, path: "/" },
			],
			files: [
				{ name: "ghi", path: "/" },
				{ name: "jkl", path: "/" },
			],
		},
		path: "/",
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		console.log("here effect", folderId);

		dispatch({
			type: ACTIONS.SELECT_FOLDER,
			payload: { folderId, folder },
		});
	}, [folderId, folder]);

	return state;
}
