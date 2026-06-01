import type { ReactNode } from "react";
import Header from "../../components/navigation/Header";
import { NETFLIX_BG_URL } from "../../utils/constant";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="relative min-h-screen bg-black">
      <img
        src={NETFLIX_BG_URL}
        alt="Netflix Background"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
