import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Login from "../components/Login/Login";
import Signup from "../components/SignUp/Signup";
import Profile from "../components/Profile/Profile";
import Landing from "../components/Landing/Landing";
import PostFeed from "../components/PostFeed/PostFeed";
import FollowingGroup from "../components/Following/Following";
import Donation from "../components/DonateBox/Donate";
import Credit from "../components/CreditCard/Credit";
import AddFunds from "../components/AddFunds/AddFunds";
import CreatePost from "../components/PostFeed/CreatePost/CreatePost";
const SwitchNavigator = createSwitchNavigator(
  {
    Landing: {
      screen: Landing,
    },
    Login: {
      screen: Login,
    },
    Signup: {
      screen: Signup,
    },
    Profile: {
      screen: Profile,
    },

    PostFeed: {
      screen: PostFeed,
    },

    CreatePost: {
      screen: CreatePost,
    },
    FollowingGroup: {
      screen: FollowingGroup,
    },
    Donation: {
      screen: Donation,
    },
    Credit: {
      screen: Credit,
    },
    AddFunds: {
      screen: AddFunds,
    },
  },
  {
    initialRouteName: "PostFeed",
  }
);

export default createAppContainer(SwitchNavigator);
