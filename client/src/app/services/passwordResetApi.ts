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
type IPasswordResetPayload = {
   email?: string
   username?: string
   resetToken: string
   newPassword: string
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
      resetPassword: builder.mutation<string, IPasswordResetPayload>({
         query: (body) => ({
            url: `/password-reset/reset`,
            method: 'PUT',
            body,
         }),
         invalidatesTags: ['PasswordReset'],
      }),
   }),
})

export const {
   useGetPasswordResetQuery,
   useCreatePasswordResetMutation,
   useDeletePasswordResetMutation,
   useResetPasswordMutation,
} = passwordResetApi
