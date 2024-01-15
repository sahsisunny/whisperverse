import { api } from '@/app/services/api'

type ISecretsResponse = {
   _id: string
   message: string
   userId: string
   timestamp: string
}

type IAllSecretsResponse = {
   message: string
   secrets: {
      _id: string
      secret: string
      userId: string
      timestamp: string
   }[]
}

type ISecretsPayload = {
   userId?: string
   secret: string
}

export const secretsApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getAllSecrets: builder.query<IAllSecretsResponse, void>({
         query: () => '/secrets',
         providesTags: ['Secrets'],
      }),
      getSecret: builder.query<ISecretsResponse, string>({
         query: (userId) => `/secrets/${userId}`,
         providesTags: ['Secrets'],
      }),
      deleteSecret: builder.mutation<ISecretsResponse, string>({
         query: (userId) => ({
            url: `/secrets/${userId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Secrets'],
      }),
      addOrUpdateSecret: builder.mutation<ISecretsResponse, ISecretsPayload>({
         query: (body) => ({
            url: `/secrets`,
            method: 'POST',
            body,
         }),
         invalidatesTags: ['Secrets'],
      }),
   }),
})

export const {
   useGetAllSecretsQuery,
   useGetSecretQuery,
   useDeleteSecretMutation,
   useAddOrUpdateSecretMutation,
} = secretsApi
