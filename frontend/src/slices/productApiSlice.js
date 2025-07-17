import { apiSlice } from "./apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/api/product",
        method: "POST",
        body: data,
      }),
    }),

    getProduct: builder.query({
      query: ({ pageNumber, keyword } = {}) => ({
        url: "/api/product",
        params: { pageNumber, keyword },
      }),
    }),

    getProductById: builder.query({
      query: (id) => ({
        url: `/api/product/${id}`,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/api/product/${productId}`,
        method: "DELETE",
      }),
    }),
    createProductReview: builder.mutation({
      query: (data) => ({
        url: `/api/product/${data.productId}/review`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductByIdQuery,
  useGetProductQuery,
  useDeleteProductMutation,
  useCreateProductReviewMutation
} = productApiSlice;
