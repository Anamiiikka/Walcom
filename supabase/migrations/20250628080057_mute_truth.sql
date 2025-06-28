/*
  # Add INSERT policy for order_items table

  1. Security
    - Add policy for authenticated users to insert their own order items
    - Ensures users can only insert order items for orders they own

  This fixes the RLS violation error when placing orders.
*/

-- Create INSERT policy for order items
CREATE POLICY "Users can insert own order items" ON public.order_items 
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  )
);