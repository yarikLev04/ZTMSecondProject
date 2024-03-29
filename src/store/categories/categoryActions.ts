import { Action, ActionWithPayload, createAction, withMatcher } from '../../utils/reducer/reducerUtils';
import { Category, CATEGORY_ACTION_TYPES } from './categoryTypes';

export type FetchCategoriesStart = Action<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;

export type FetchCategoriesFailed = ActionWithPayload<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>;

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => createAction(
	CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START
));

export const fetchCategoriesSuccess = withMatcher((categories: Category[]): FetchCategoriesSuccess => createAction(
	CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
	categories
));

export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFailed => createAction(
	CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
	error
));
