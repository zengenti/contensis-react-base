import { injectRedux } from '~/redux/store/injectors';

export function* reduxInjectorSaga(
  injectorFn: () => Promise<{ key: string; reducer: any; saga: any }>
) {
  if (typeof injectorFn === 'function') {
    const { key, reducer, saga } = yield injectorFn();
    injectRedux({ key, reducer, saga });
  }
}
