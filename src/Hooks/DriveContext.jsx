import React, { useContext, useState, useEffect } from "react";

const DriveContext = React.createContext();

export function useDriveContext() {
	return useContext(DriveContext);
}

export function DriveContextProvider({ children }) {
	const directory = {
		name: "root",
		id: null,
		children: {
			folders: [
				{
					name: "abc",
					id: "1",
					children: {
						folders: [
							{
								name: "mno",
								id: "3",
								children: {
									folders: [
										{
											name: "stu",
											id: "55",
											children: {},
											path: "/",
										},
									],
									files: [{ name: "vwx", path: "/" }],
								},
								path: "/",
							},
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

	// localStorage.setItem("Drive", JSON.stringify(directoryState));
	const DriveData = JSON.parse(localStorage.getItem("Drive"));
	const recentId = JSON.parse(localStorage.getItem("id"));

	const [directoryState, setDirectoryState] = useState(
		DriveData || directory
	);
	useEffect(() => {
		// console.log("DriveData changed", DriveData);
		// setDirectoryState(DriveData);
		if (DriveData) setDirectoryState(DriveData);
		if (recentId) setUpdatedId(recentId);
	}, []);

	const [updatedId, setUpdatedId] = useState(6);

	const name = "abc";
	const activePath = "bcd";
	const [isModalOpen, setModalOpen] = useState(false);

	return (
		<DriveContext.Provider
			value={{
				name,
				activePath,
				directoryState,
				setDirectoryState,
				updatedId,
				setUpdatedId,
				isModalOpen,
				setModalOpen,
			}}
		>
			{children}
		</DriveContext.Provider>
	);
}
