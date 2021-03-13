/* explore-page-urls */
export const get_all_groups = '/chatroom/';
export const get_movies_groups = '/chatroom/?creater=&created_at=&type=Movies';
export const get_coding_groups = '/chatroom/?creater=&created_at=&type=Coding';
export const get_study_groups = '/chatroom/?creater=&created_at=&type=Study';

/* user */
export const update_user = `/users/`;
export const login = '/rest-auth/login/';
export const registration = '/rest-auth/registration/';
export const googleLogin = "/rest-auth-social/google/";
export const facebookLogin = "/rest-auth-social/facebook/";
export const get_user = "/rest-auth/user/";

/* groups */
export const create_group = '/chatroom/';
export const get_user_groups = '/chatroom/userGroups/';
export const join_group = '/chatroom/';
export const update_group = '/chatroom/';
export const delete_msg = '/messages/';
export const create_user_bio = '/bio/';
export const update_bio = '/bio/'
export const get_bio = '/bio/?user=';
export const delete_group = '/chatroom/';
export const get_current_group = '/chatroom/';
export const create_new_message = '/messages/';