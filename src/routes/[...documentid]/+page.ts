import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  return {
    name: params.documentid
  }
}

export interface documents {
  name: string
}

