import  { syncData } from '../ducks/UserManagement'
import { combineEpics } from 'redux-observable'
import { map, filter, mergeMap, withLatestFrom} from 'rxjs/operators'
import { pipe } from 'rxjs'

const logValue = (payload: any) => ({
    type: "LOG_VALUE",
    payload: payload
})

const displayError = (error: any) => ({
    type: "DISPLAY_ERROR",
    payload: error,
})


const syncTableWithCollection = (action$: any, state$: any) => action$.pipe(
    filter(({ type }: any) => type.includes('FULFILLED')),
    withLatestFrom(state$),
    map(() => syncData(state$.value.collection.data))
)

const handleRequestError = (action$: any, state$: any) => action$.pipe(
    filter(({ type }: any) => type.includes('REJECTED')),
    map(({ payload }: any) => displayError(payload))
)

export default combineEpics(syncTableWithCollection, handleRequestError)