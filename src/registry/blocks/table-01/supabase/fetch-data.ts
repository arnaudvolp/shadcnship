"use server";

import { createClient } from "@/lib/supabase/server";

export interface FetchDataOptions {
  tableName: string;
  fields?: string[];
  page?: number;
  pageSize?: number;
  orderBy?: string;
  orderAsc?: boolean;
}

export interface FetchDataResult<T = Record<string, unknown>> {
  data: T[];
  fields: string[];
  pageCount: number;
  totalCount: number;
  error?: string;
}

export async function fetchTableData<T = Record<string, unknown>>({
  tableName,
  fields,
  page = 0,
  pageSize = 5,
  orderBy = "created_at",
  orderAsc = false,
}: FetchDataOptions): Promise<FetchDataResult<T>> {
  try {
    const supabase = await createClient();
    if (!supabase) throw new Error("Supabase client not initialized");

    const from = page * pageSize;
    const to = from + pageSize - 1;

    // Build select string: specific fields or all (*)
    const selectFields = fields && fields.length > 0 ? fields.join(", ") : "*";

    // Get total count
    const { count, error: countError } = await supabase
      .from(tableName)
      .select("*", { count: "exact", head: true });

    if (countError) throw countError;

    const totalCount = count || 0;
    const pageCount = Math.ceil(totalCount / pageSize);

    // Get paginated data
    const { data, error: fetchError } = await supabase
      .from(tableName)
      .select(selectFields)
      .order(orderBy, { ascending: orderAsc })
      .range(from, to);

    if (fetchError) throw fetchError;

    // Extract field names from the first row if no fields specified
    const detectedFields = fields && fields.length > 0
      ? fields
      : data && data.length > 0
        ? Object.keys(data[0])
        : [];

    return {
      data: (data as T[]) || [],
      fields: detectedFields,
      pageCount,
      totalCount,
    };
  } catch (error) {
    return {
      data: [],
      fields: [],
      pageCount: 0,
      totalCount: 0,
      error: error instanceof Error ? error.message : "Failed to fetch data",
    };
  }
}
