
import Link from 'next/link';
import {Button} from '@/components/ui/button';

export default function AuthHeader() {
  return (
    <header>
      <nav className="flex items-center justify-between gap-4 p-4 rounded-md shadow-md">
        <Link href={"/"} className="font-bold text-lg text-purple-700">
          Job Board
        </Link>
        <div className="flex items-center gap-4">
          <Link href={"/sign-in"}>
            <Button>Login</Button>
          </Link>
          <Link href="/create-account">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};