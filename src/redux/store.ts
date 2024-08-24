import { createStore, Store } from 'redux';
import reducers, { RootState } from './Reducers/RootReducer';

// Create the store without middleware or persistence
const store: Store<RootState> = createStore(reducers);

export { store };
