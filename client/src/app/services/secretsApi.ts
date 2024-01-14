import { api } from './api'

type ISecretsResponse = {
   _id: string
   secret: string
   userId: string
}

type ISecretsPayload = {
   secret: string
}

export const secretsApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getAllSecrets: builder.query<ISecretsResponse[], void>({
         query: () => '/secrets',
         providesTags: ['Secrets'],
      }),
      addSecret: builder.mutation<ISecretsResponse, ISecretsPayload>({
         query: (body) => ({
            url: '/secrets',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['Secrets'],
      }),
      deleteSecret: builder.mutation<ISecretsResponse, string>({
         query: (id) => ({
            url: `/secrets/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Secrets'],
      }),
      updateSecret: builder.mutation<ISecretsResponse, ISecretsResponse>({
         query: ({ _id, ...body }) => ({
            url: `/secrets/${_id}`,
            method: 'PUT',
            body,
         }),
         invalidatesTags: ['Secrets'],
      }),
   }),
})

export const {
   useGetAllSecretsQuery,
   useAddSecretMutation,
   useDeleteSecretMutation,
   useUpdateSecretMutation,
} = secretsApi
