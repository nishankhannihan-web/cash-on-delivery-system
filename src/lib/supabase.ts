import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '../storeConfig';
import { OrderInsertPayload } from '../types';

/**
 * Initializes the Supabase client.
 * NOTE: For this COD store template, the application strictly performs INSERT operations into the "orders" table.
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

/**
 * Inserts a new order record into the "orders" table.
 * Uses INSERT ONLY without select/update/delete.
 */
export async function submitCodOrder(payload: OrderInsertPayload): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('orders')
      .insert([payload]);

    if (error) {
      console.error('Supabase order insert error:', error);
      return { success: false, error: error.message || 'Failed to submit order' };
    }

    return { success: true };
  } catch (err: unknown) {
    console.error('Unexpected error inserting order:', err);
    const message = err instanceof Error ? err.message : 'A network error occurred while submitting your order.';
    return { success: false, error: message };
  }
}
