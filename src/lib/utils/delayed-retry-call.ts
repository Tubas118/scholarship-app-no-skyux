import { Observable, throwError, of } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

const MAX_DELAYED_RETRIES = 3;
const SLEEP_MS = 1000;

export function delayedRetryCall(src: Observable<any>) {
  let retries = MAX_DELAYED_RETRIES;
  return src.pipe(
    delay(SLEEP_MS),
    mergeMap(error => retries-- > 0 ? _of(error, retries) : throwError(error))
  );
}

export function _of(error: any, retriesLeft: number) {
  console.log(`errorOf: ${retriesLeft}`);
  return of(error);
}
