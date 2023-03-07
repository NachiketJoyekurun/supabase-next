import Link from 'next/link';

const NavigationLinks = ({ href, title }) => {
  return (
    <Link href={href}>
      <li className="navButton">{title}</li>
    </Link>
  );
};

export default NavigationLinks;
