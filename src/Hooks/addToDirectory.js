export default function addToDirectory(
	isFileSelected,
	parentFolderId,
	driveContext,
	newFilename
) {
	const ObjectToBeAdded = generateObject(
		isFileSelected,
		driveContext.updatedId,
		driveContext.setUpdatedId,
		newFilename
	);
	console.log("ObjectToBeAdded", ObjectToBeAdded);
	console.log(parentFolderId, driveContext.directoryState);
	const dummyDir = { ...driveContext.directoryState };
	console.log("inAddFn", dummyDir);
	const modDirectory = replaceChild(
		parentFolderId,
		dummyDir,
		isFileSelected,
		ObjectToBeAdded
	);
	console.log("replaced", modDirectory);
	const { setDirectoryState } = driveContext;
	setDirectoryState(modDirectory);
	localStorage.setItem("Drive", JSON.stringify(modDirectory));
}

function generateObject(isFileSelected, updatedId, setUpdatedId, newFilename) {
	let newObject = {};
	if (isFileSelected) {
		newObject = { name: `${newFilename}`, path: "/" };
	} else {
		newObject = {
			name: `${newFilename}`,
			id: `${updatedId}`,
			children: {},
			path: "/",
		};
		setUpdatedId((prev) => prev + 1);
		localStorage.setItem("id", updatedId + 1);
	}
	return newObject;
}

function replaceChild(id, state, isFileSelected, ObjectToBeAdded) {
	console.log("replacChild", state);
	if (!id) {
		const modifiedState = addChild(state, isFileSelected, ObjectToBeAdded);
		console.log(modifiedState);
		return modifiedState;
	} else {
		const modifiedState = iterateTree(
			id,
			state,
			isFileSelected,
			ObjectToBeAdded
		);
		console.log(modifiedState);
		return modifiedState;
	}
}

function addChild(state, isFileSelected, ObjectToBeAdded) {
	let modifiedState = {};
	if (isFileSelected) {
		if (Object.keys(state.children).length > 0 && state.children.files) {
			modifiedState = {
				...state,
				children: {
					...state.children,
					files: [...state.children.files, ObjectToBeAdded],
				},
			};
		} else {
			modifiedState = {
				...state,
				children: {
					...state.children,
					files: [ObjectToBeAdded],
				},
			};
		}
	} else {
		if (Object.keys(state.children).length > 0 && state.children.folders) {
			modifiedState = {
				...state,
				children: {
					...state.children,
					folders: [...state.children.folders, ObjectToBeAdded],
				},
			};
		} else {
			modifiedState = {
				...state,
				children: {
					...state.children,
					folders: [ObjectToBeAdded],
				},
			};
		}
	}
	return modifiedState;
}

function iterateTree(id, directory, isFileSelected, newObject) {
	console.log(directory);
	const modFolders = directory.children.folders;
	console.log(modFolders);
	for (let i = 0; i < modFolders.length; i++) {
		console.log(
			i,
			modFolders[i].id,
			modFolders[i].children,
			modFolders[i].children?.folders?.length
		);
		if (modFolders[i].id === id) {
			console.log("1", modFolders[i]);
			modFolders[i] = addChild(modFolders[i], isFileSelected, newObject);
			break;
		} else if (
			Object.keys(modFolders[i].children).length > 0 &&
			modFolders[i].children?.folders?.length > 0
		) {
			console.log("2", modFolders[i]);
			modFolders[i] = iterateTree(
				id,
				modFolders[i],
				isFileSelected,
				newObject
			);
		} else {
			console.log("3");
		}
	}
	console.log("after loop", modFolders);
	return {
		...directory,
		children: { ...directory.children, folders: modFolders },
	};
}
