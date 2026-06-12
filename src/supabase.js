import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://airethuorptlkqyaydlp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_FJ4TV3JsqGnuHTQ2xnueZw_NkkJ20eq';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
