// components/Navbar.js
import Link from 'next/link';
import { useRouter } from 'next/router';

function Navbar() {
  const router = useRouter();

  return (
    <nav>
      <ul>
        {['tab1', 'tab2', 'tab3'].map((tab) => (
          <li key={tab} className={router.pathname === `/${tab}` ? 'active' : ''}>
            <Link href={`/${tab}`}>{`Tab ${tab.slice(-1)}`}</Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .active {
          color: blue; // Example active style
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
