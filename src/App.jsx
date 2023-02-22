import { BrowserRouter, Routes, Route } from "react-router-dom";
import Drive from "./components/Drive";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Drive />} />
				<Route path="/mydrive" element={<Drive />} />
				<Route path="/mydrive/folder/:folderId" element={<Drive />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
