import { canUseDOM } from '~/utils/dom';
import { supabaseKey } from '~/utils/misc.server';

export const SHYFT_API_URL = 'https://api.shyft.to';
export const SUPABASE_URL = 'https://puonyupeanorfbpjfvpu.supabase.co';
export const SUPABASE_KEY = canUseDOM ? window.ENV.SUPABASE_KEY : supabaseKey;
