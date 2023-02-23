function Welcome({ session }) {
  return (
    <p>
      Hello <span className="text-[#f35815]">{session}</span>
      <br />
      Welcome to your dashboard!
    </p>
  );
}

export default Welcome;
