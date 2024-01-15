import { api } from '@/app/services/api'

type IPasswordResetResponse = {
   message: string
   passwordReset: {
      _id: string
      resetToken: string
      userId: string
      timestamp: string
   }
}

export const passwordResetApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getPasswordReset: builder.query<IPasswordResetResponse, void>({
         query: () => '/password-reset',
         providesTags: ['PasswordReset'],
      }),
      createPasswordReset: builder.mutation<IPasswordResetResponse, void>({
         query: () => ({
            url: `/password-reset`,
            method: 'POST',
         }),
         invalidatesTags: ['PasswordReset'],
      }),
      deletePasswordReset: builder.mutation<IPasswordResetResponse, void>({
         query: () => ({
            url: `/password-reset`,
            method: 'DELETE',
         }),
         invalidatesTags: ['PasswordReset'],
      }),
   }),
})

export const {
   useGetPasswordResetQuery,
   useCreatePasswordResetMutation,
   useDeletePasswordResetMutation,
} = passwordResetApi
