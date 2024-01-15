import { api } from '@/app/services/api'

type IUserResponse = {
   id: string
   name: string
   username: string
   email: string
}

type IUserLoingEmailPayload = {
   email: string
   password: string
}

type IUserLoingUsernamePayload = {
   username: string
   password: string
}

type IUserRegisterPayload = {
   username: string
   name: string
   email: string
   password: string
}

export const userApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getSelf: builder.query<IUserResponse, void>({
         query: () => '/self',
         providesTags: ['Self'],
      }),
      loginUsername: builder.mutation<IUserResponse, IUserLoingUsernamePayload>(
         {
            query: (body) => ({
               url: '/login',
               method: 'POST',
               body,
            }),
            invalidatesTags: ['User'],
         },
      ),
      loginEmail: builder.mutation<IUserResponse, IUserLoingEmailPayload>({
         query: (body) => ({
            url: '/login',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['User'],
      }),
      register: builder.mutation<IUserResponse, IUserRegisterPayload>({
         query: (body) => ({
            url: '/register',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['User'],
      }),
      logout: builder.mutation<void, void>({
         query: () => ({
            url: '/logout',
            method: 'POST',
         }),
         invalidatesTags: ['User'],
      }),
   }),
})

export const {
   useGetSelfQuery,
   useLoginUsernameMutation,
   useLoginEmailMutation,
   useRegisterMutation,
   useLogoutMutation,
} = userApi
