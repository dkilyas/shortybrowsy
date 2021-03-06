import './App.css';
import {Route, Switch,} from "react-router-dom";
import {createContext, useContext, useState} from "react";
import BookmarksList from "./collections/BookmarksList";

export enum Mode {
	OPEN = "Open",
	EDIT = "Edit",
	DELETE = "Delete"
}

interface AppContext {
	mode: Mode,

	updateMode(mode: Mode): void
}

const AppContext = createContext<AppContext>({
	mode: Mode.OPEN,
	updateMode(mode: Mode) {
	}
});

function App() {
	const value = useProvideAppContext();

	return (
		<AppContext.Provider value={value}>
			<Switch>
				<Route path="/:id?">
					<BookmarksList/>
				</Route>
			</Switch>
		</AppContext.Provider>
	);
}

export default App;

function useProvideAppContext(): AppContext {
	let [mode, setMode] = useState<Mode>(Mode.OPEN);

	return {
		mode,
		updateMode: (mode: Mode) => setMode(mode)
	}
}

export function useAppContext() {
	return useContext<AppContext>(AppContext);
}
