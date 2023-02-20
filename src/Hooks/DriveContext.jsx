import React, { useContext, useState } from "react";

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

	const [directoryState, setDirectoryState] = useState(directory);

	const name = "abc";
	const activePath = "bcd";

	return (
		<DriveContext.Provider
			value={{ name, activePath, directoryState, setDirectoryState }}
		>
			{children}
		</DriveContext.Provider>
	);
}
