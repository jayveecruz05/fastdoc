import type { DehydratedState, VueQueryPluginOptions, } from '@tanstack/vue-query';
import { VueQueryPlugin, QueryClient, hydrate, dehydrate, } from '@tanstack/vue-query';

export default defineNuxtPlugin((app) => {
  const vueQueryState = useState<DehydratedState | null>('vue-query');

  // Modify your Vue Query global settings here
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 5000, retry: 1 } }
  });
  const options: VueQueryPluginOptions = { queryClient };

  app.vueApp.use(VueQueryPlugin, options);

  if (import.meta.server) {
    app.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient);
    });
  }

  if (import.meta.client) {
    hydrate(queryClient, vueQueryState.value);
  }
});