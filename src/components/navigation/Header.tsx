import { useSelector } from "react-redux";
import { AVATAR_URL, NETFLIX_LOGO_URL } from "../../utils/constant";
import type { RootState } from "../../store";
import { signOut } from "../../services/auth.service";

const Header = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const isLoggedIn = !!currentUser; // "!" -> !null -> true is a single flip and "!!" -> !!null -> false is double flip

  //
  const handleSignOut = async () => await signOut();

  return (
    <div className="absolute w-full top-0 left-0 z-10 px-8 py-4 bg-linear-to-b from-black/40">
      <div className="flex items-center justify-between">
        {/* LOGO */}
        <img
          src={NETFLIX_LOGO_URL}
          alt="Netflix Logo"
          className="w-42 h-auto"
        />
        {/* NAVIGATION */}
        {isLoggedIn && (
          <div className="flex items-center gap-3">
            <img
              src={currentUser?.photoURL || AVATAR_URL}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <button
              onClick={handleSignOut}
              className="text-white text-sm font-medium hover:text-gray-300 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
