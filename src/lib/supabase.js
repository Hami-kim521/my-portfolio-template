import { createClient } from '@supabase/supabase-js';

/** Supabase 클라이언트 (URL / anon 키는 .env 에서 읽어옴) */
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);
