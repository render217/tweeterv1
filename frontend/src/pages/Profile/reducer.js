export const INITAL_STATE = {
  showEditProfile: false,
  showFollowers: false,
  showFollowing: false,
  showProfilePic: false,
};
export const MODAL_CONSTANT = {
  OPEN_EDIT_PROFILE: "openEditProfile",
  CLOSE_EDIT_PROFILE: "closeEditProfile",
  //
  SHOW_FOLLOWERS: "showFollowers",
  CLOSE_FOLLOWERS: "closeFollowers",
  //
  SHOW_FOLLOWING: "showFollowing",
  CLOSE_FOLLOWING: "closeFollowing",
  //
  SHOW_PROFILE_PIC: "ShowProfilePic",
  CLOSE_PROFILE_PIC: "closeProfilePic",
  //
  CLOSE_MODAL: "closeModal",
};
export function modal_reducer(state, action) {
  switch (action.type) {
    case MODAL_CONSTANT.OPEN_EDIT_PROFILE:
      return { ...state, showEditProfile: true };
    case MODAL_CONSTANT.CLOSE_EDIT_PROFILE:
      return { ...state, showEditProfile: false };
    //
    case MODAL_CONSTANT.SHOW_FOLLOWERS:
      return { ...state, showFollowers: true };
    case MODAL_CONSTANT.CLOSE_FOLLOWERS:
      return { ...state, showFollowers: false };
    //
    case MODAL_CONSTANT.SHOW_FOLLOWING:
      return { ...state, showFollowing: true };
    case MODAL_CONSTANT.CLOSE_FOLLOWING:
      return { ...state, showFollowing: false };
    //
    case MODAL_CONSTANT.SHOW_PROFILE_PIC:
      return { ...state, showProfilePic: true };
    case MODAL_CONSTANT.CLOSE_PROFILE_PIC:
      return { ...state, showProfilePic: false };
    //
    case MODAL_CONSTANT.CLOSE_MODAL:
      return { ...INITAL_STATE };
    default:
      return state;
  }
}

export const closeEditProfile = (dispatch) => {
  dispatch({ type: MODAL_CONSTANT.CLOSE_EDIT_PROFILE });
};
export const openEditProfile = (dispatch) => {
  dispatch({ type: MODAL_CONSTANT.OPEN_EDIT_PROFILE });
};
//
export const closeShowFollowers = (dispatch) => {
  dispatch({ type: MODAL_CONSTANT.CLOSE_FOLLOWERS });
};
export const openShowFollowers = (dispatch) => {
  dispatch({ type: MODAL_CONSTANT.SHOW_FOLLOWERS });
};
//
export const closeShowFollowing = (dispatch) => {
  dispatch({ type: MODAL_CONSTANT.CLOSE_FOLLOWING });
};
export const openShowFollowing = (dispatch) => {
  dispatch({ type: MODAL_CONSTANT.SHOW_FOLLOWING });
};
//
export const closeShowProfilePic = (dispatch) => {
  dispatch({ type: MODAL_CONSTANT.CLOSE_PROFILE_PIC });
};
export const openShowProfilePic = (dispatch) => {
  dispatch({ type: MODAL_CONSTANT.SHOW_PROFILE_PIC });
};

//
export const closeModal = (dispatch) => {
  dispatch({ type: MODAL_CONSTANT.CLOSE_MODAL });
};
