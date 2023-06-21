import { createFeature, createReducer, on } from '@ngrx/store';
import { BookActions } from './book.actions';
import { Book } from '../shared/book';

export const bookFeatureKey = 'book';

export interface State {
  books: Book[];
  loading: boolean;
  foo: string;
}

export const initialState: State = {
  books: [],
  loading: false,
  foo: ''
};

export const reducer = createReducer(
  initialState,
  on(BookActions.loadBooks, state => {
    return { ...state, loading: true };
  }),

  on(BookActions.loadBooksSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      books: action.data
    };
  }),

  on(BookActions.loadBooksFailure, (state, action) => {
    return { ...state, loading: false };
  }),
);

export const bookFeature = createFeature({
  name: bookFeatureKey,
  reducer,
});

