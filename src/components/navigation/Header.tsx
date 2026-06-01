import { NETFLIX_LOGO_URL } from "../../utils/constant";

const Header = () => {
  return (
    <div className="absolute top-0 left-0 z-10 px-8 py-4">
      {/* LOGO */}
      <img src={NETFLIX_LOGO_URL} alt="Netflix Logo" className="w-42 h-auto" />
      {/* NAVIGATION */}
    </div>
  );
};

export default Header;
