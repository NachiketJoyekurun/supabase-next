import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center p-4">
      <p>
        Built with{' '}
        <Link href="https://nextjs.org/">
          <span className="footerLink">Nextjs</span>
        </Link>{' '}
        and{' '}
        <Link href="https://supabase.com/">
          <span className="footerLink">Supabase</span>
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
